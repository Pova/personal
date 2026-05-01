from __future__ import annotations

import csv
from dataclasses import dataclass
from pathlib import Path

from .config import SEED_ROOT


@dataclass(frozen=True)
class ParsedDataset:
    players: list[dict[str, object]]
    events: list[dict[str, object]]
    results: list[dict[str, object]]
    rounds: list[dict[str, object]]


def _read_csv(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8", newline="") as file:
        return list(csv.DictReader(file))


def _as_int(value: str | None) -> int | None:
    if value is None or value == "":
        return None
    return int(value)


def _as_bool(value: str | None) -> bool:
    return str(value).strip().lower() in {"1", "true", "yes", "y"}


def parse_seed_dataset(seed_root: Path = SEED_ROOT) -> ParsedDataset:
    players = [
        {
            "pdga_number": _as_int(row["pdga_number"]),
            "name": row["name"],
            "country": row.get("country") or None,
            "handedness": row.get("handedness") or None,
        }
        for row in _read_csv(seed_root / "players.csv")
    ]

    events = [
        {
            "source_event_id": row["source_event_id"],
            "name": row["name"],
            "start_date": row["start_date"],
            "end_date": row["end_date"],
            "tier": row["tier"],
            "tour_category": row["tour_category"],
            "is_major": _as_bool(row["is_major"]),
            "location": row["location"],
            "source_url": row["source_url"],
        }
        for row in _read_csv(seed_root / "events.csv")
    ]

    results = [
        {
            "source_event_id": row["source_event_id"],
            "pdga_number": _as_int(row["pdga_number"]),
            "division": row["division"],
            "place": _as_int(row["place"]),
            "total_score": _as_int(row["total_score"]),
            "total_to_par": _as_int(row["total_to_par"]),
            "payout": float(row["payout"]) if row.get("payout") else None,
        }
        for row in _read_csv(seed_root / "event_results.csv")
    ]

    rounds = [
        {
            "source_event_id": row["source_event_id"],
            "pdga_number": _as_int(row["pdga_number"]),
            "round_number": _as_int(row["round_number"]),
            "score": _as_int(row["score"]),
            "to_par": _as_int(row["to_par"]),
            "round_rating": _as_int(row["round_rating"]),
        }
        for row in _read_csv(seed_root / "rounds.csv")
    ]

    return ParsedDataset(players=players, events=events, results=results, rounds=rounds)

