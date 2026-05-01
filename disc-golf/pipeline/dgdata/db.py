from __future__ import annotations

import os
from pathlib import Path
from typing import Iterable

from .config import SCHEMA_PATH
from .parse import ParsedDataset


def _require_psycopg():
    try:
        import psycopg
    except ImportError as exc:
        raise RuntimeError(
            "Install pipeline dependencies before loading Postgres: "
            "python -m pip install -e ."
        ) from exc
    return psycopg


def apply_schema(database_url: str | None = None, schema_path: Path = SCHEMA_PATH) -> None:
    psycopg = _require_psycopg()
    dsn = database_url or os.environ["DATABASE_URL"]
    with psycopg.connect(dsn) as connection:
        with connection.cursor() as cursor:
            cursor.execute(schema_path.read_text(encoding="utf-8"))
        connection.commit()


def _execute_many(cursor, query: str, rows: Iterable[tuple[object, ...]]) -> None:
    for row in rows:
        cursor.execute(query, row)


def load_dataset(dataset: ParsedDataset, database_url: str | None = None) -> None:
    psycopg = _require_psycopg()
    dsn = database_url or os.environ["DATABASE_URL"]
    with psycopg.connect(dsn) as connection:
        with connection.cursor() as cursor:
            cursor.execute(SCHEMA_PATH.read_text(encoding="utf-8"))

            _execute_many(
                cursor,
                """
                insert into players (pdga_number, name, country, handedness)
                values (%s, %s, %s, %s)
                on conflict (pdga_number) do update
                set name = excluded.name,
                    country = excluded.country,
                    handedness = excluded.handedness
                """,
                (
                    (
                        player["pdga_number"],
                        player["name"],
                        player["country"],
                        player["handedness"],
                    )
                    for player in dataset.players
                ),
            )

            _execute_many(
                cursor,
                """
                insert into events (
                    source_event_id, name, start_date, end_date, tier,
                    tour_category, is_major, source_url
                )
                values (%s, %s, %s, %s, %s, %s, %s, %s)
                on conflict (source_event_id, name, start_date) do update
                set end_date = excluded.end_date,
                    tier = excluded.tier,
                    tour_category = excluded.tour_category,
                    is_major = excluded.is_major,
                    source_url = excluded.source_url
                """,
                (
                    (
                        event["source_event_id"],
                        event["name"],
                        event["start_date"],
                        event["end_date"],
                        event["tier"],
                        event["tour_category"],
                        event["is_major"],
                        event["source_url"],
                    )
                    for event in dataset.events
                ),
            )

            for result in dataset.results:
                cursor.execute(
                    """
                    insert into event_results (
                        event_id, player_id, division, place,
                        total_score, total_to_par, payout
                    )
                    select e.id, p.id, %s, %s, %s, %s, %s
                    from events e
                    join players p on p.pdga_number = %s
                    where e.source_event_id = %s
                    on conflict (event_id, player_id, division) do update
                    set place = excluded.place,
                        total_score = excluded.total_score,
                        total_to_par = excluded.total_to_par,
                        payout = excluded.payout
                    """,
                    (
                        result["division"],
                        result["place"],
                        result["total_score"],
                        result["total_to_par"],
                        result["payout"],
                        result["pdga_number"],
                        result["source_event_id"],
                    ),
                )

            for round_row in dataset.rounds:
                cursor.execute(
                    """
                    insert into rounds (
                        event_id, player_id, round_number, score, to_par, round_rating
                    )
                    select e.id, p.id, %s, %s, %s, %s
                    from events e
                    join players p on p.pdga_number = %s
                    where e.source_event_id = %s
                    on conflict (event_id, player_id, round_number) do update
                    set score = excluded.score,
                        to_par = excluded.to_par,
                        round_rating = excluded.round_rating
                    """,
                    (
                        round_row["round_number"],
                        round_row["score"],
                        round_row["to_par"],
                        round_row["round_rating"],
                        round_row["pdga_number"],
                        round_row["source_event_id"],
                    ),
                )

        connection.commit()

