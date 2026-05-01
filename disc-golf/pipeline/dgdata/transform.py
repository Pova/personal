from __future__ import annotations

from collections import defaultdict
from datetime import date
from statistics import mean, pstdev

from .parse import ParsedDataset


def _season(start_date: str) -> int:
    return date.fromisoformat(start_date).year


def _rank(values: list[tuple[int, int]]) -> dict[int, int]:
    sorted_values = sorted(values, key=lambda item: item[1])
    ranks: dict[int, int] = {}
    last_score: int | None = None
    last_rank = 0
    for index, (pdga_number, score) in enumerate(sorted_values, start=1):
        if score != last_score:
            last_rank = index
            last_score = score
        ranks[pdga_number] = last_rank
    return ranks


def build_analysis(dataset: ParsedDataset, focus_pdga_number: int = 75412) -> dict[str, object]:
    players = {player["pdga_number"]: player for player in dataset.players}
    events = {event["source_event_id"]: event for event in dataset.events}

    results_by_player: dict[int, list[dict[str, object]]] = defaultdict(list)
    results_by_event: dict[str, list[dict[str, object]]] = defaultdict(list)
    for result in dataset.results:
        result = dict(result)
        event = events[str(result["source_event_id"])]
        result["event_name"] = event["name"]
        result["season"] = _season(str(event["start_date"]))
        result["tour_category"] = event["tour_category"]
        result["is_major"] = event["is_major"]
        result["player_name"] = players[result["pdga_number"]]["name"]
        results_by_player[int(result["pdga_number"])].append(result)
        results_by_event[str(result["source_event_id"])].append(result)

    rounds_by_player: dict[int, list[dict[str, object]]] = defaultdict(list)
    rounds_by_event: dict[str, list[dict[str, object]]] = defaultdict(list)
    for round_row in dataset.rounds:
        round_row = dict(round_row)
        event = events[str(round_row["source_event_id"])]
        round_row["season"] = _season(str(event["start_date"]))
        round_row["event_name"] = event["name"]
        round_row["player_name"] = players[round_row["pdga_number"]]["name"]
        rounds_by_player[int(round_row["pdga_number"])].append(round_row)
        rounds_by_event[str(round_row["source_event_id"])].append(round_row)

    player_summaries = []
    for pdga_number, player_results in sorted(results_by_player.items()):
        places = [int(result["place"]) for result in player_results if result["place"] is not None]
        ratings = [
            int(round_row["round_rating"])
            for round_row in rounds_by_player[pdga_number]
            if round_row["round_rating"] is not None
        ]
        starts = len(player_results)
        player_summaries.append(
            {
                "pdga_number": pdga_number,
                "name": players[pdga_number]["name"],
                "starts": starts,
                "wins": sum(1 for place in places if place == 1),
                "podiums": sum(1 for place in places if place <= 3),
                "top5s": sum(1 for place in places if place <= 5),
                "top10s": sum(1 for place in places if place <= 10),
                "win_rate": round(sum(1 for place in places if place == 1) / starts, 3),
                "podium_rate": round(sum(1 for place in places if place <= 3) / starts, 3),
                "average_finish": round(mean(places), 2),
                "average_round_rating": round(mean(ratings), 1) if ratings else None,
                "rating_std_dev": round(pstdev(ratings), 1) if len(ratings) > 1 else 0,
                "best_round_rating": max(ratings) if ratings else None,
            }
        )

    field_adjusted_results = []
    for event_id, event_results in results_by_event.items():
        field_size = len(event_results)
        scores = [int(result["total_to_par"]) for result in event_results]
        field_average = mean(scores)
        for result in event_results:
            place = int(result["place"])
            finish_percentile = 1 - ((place - 1) / max(field_size - 1, 1))
            field_adjusted_results.append(
                {
                    "event_id": event_id,
                    "event_name": result["event_name"],
                    "season": result["season"],
                    "player_name": result["player_name"],
                    "pdga_number": result["pdga_number"],
                    "place": place,
                    "tour_category": result["tour_category"],
                    "is_major": result["is_major"],
                    "finish_percentile": round(finish_percentile, 3),
                    "strokes_vs_seed_field": round(float(result["total_to_par"]) - field_average, 2),
                }
            )

    final_round_movement = []
    for event_id, event_rounds in rounds_by_event.items():
        rounds_available = sorted({int(row["round_number"]) for row in event_rounds})
        if len(rounds_available) < 2:
            continue
        penultimate_round = rounds_available[-2]
        final_round = rounds_available[-1]
        cumulative_by_player: dict[int, int] = defaultdict(int)
        penultimate_scores: list[tuple[int, int]] = []
        final_scores: list[tuple[int, int]] = []

        for round_number in rounds_available:
            for row in [r for r in event_rounds if int(r["round_number"]) == round_number]:
                pdga_number = int(row["pdga_number"])
                cumulative_by_player[pdga_number] += int(row["score"])
            if round_number == penultimate_round:
                penultimate_scores = list(cumulative_by_player.items())
            if round_number == final_round:
                final_scores = list(cumulative_by_player.items())

        penultimate_ranks = _rank(penultimate_scores)
        final_ranks = _rank(final_scores)
        for pdga_number, final_rank in final_ranks.items():
            event = events[event_id]
            final_round_movement.append(
                {
                    "event_id": event_id,
                    "event_name": event["name"],
                    "season": _season(str(event["start_date"])),
                    "player_name": players[pdga_number]["name"],
                    "pdga_number": pdga_number,
                    "position_before_final": penultimate_ranks[pdga_number],
                    "final_position": final_rank,
                    "places_gained_final_round": penultimate_ranks[pdga_number] - final_rank,
                }
            )

    focus = next(item for item in player_summaries if item["pdga_number"] == focus_pdga_number)
    focus_results = [
        result for result in field_adjusted_results if result["pdga_number"] == focus_pdga_number
    ]
    focus_rounds = rounds_by_player[focus_pdga_number]

    return {
        "metadata": {
            "title": "What makes Gannon Buhr so good?",
            "focus_pdga_number": focus_pdga_number,
            "dataset_note": "Seed fixture for pipeline and visual development; replace with scraped source data before publishing claims.",
            "seasons": sorted({event["start_date"][:4] for event in dataset.events}),
        },
        "focus": focus,
        "players": player_summaries,
        "events": dataset.events,
        "field_adjusted_results": field_adjusted_results,
        "focus_results": focus_results,
        "focus_rounds": focus_rounds,
        "final_round_movement": final_round_movement,
    }

