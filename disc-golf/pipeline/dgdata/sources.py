from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class SourceDefinition:
    name: str
    base_url: str
    useful_fields: tuple[str, ...]
    v1_decision: str
    caveat: str


SOURCES: tuple[SourceDefinition, ...] = (
    SourceDefinition(
        name="PDGA player pages",
        base_url="https://www.pdga.com/player/{pdga_number}",
        useful_fields=("pdga_number", "name", "rating", "event_history"),
        v1_decision="canonical_player_lookup",
        caveat="HTML parser should be covered by fixture tests before broad crawling.",
    ),
    SourceDefinition(
        name="PDGA event pages",
        base_url="https://www.pdga.com/tour/event/{event_id}",
        useful_fields=("event", "division", "place", "scores", "round_ratings"),
        v1_decision="canonical_results",
        caveat="Round detail availability can vary by event and year.",
    ),
    SourceDefinition(
        name="StatMando",
        base_url="https://statmando.com/player/{slug}/profile",
        useful_fields=("wins", "podiums", "rankings", "event_context"),
        v1_decision="validation_and_enrichment",
        caveat="Some pages may be rendered dynamically.",
    ),
    SourceDefinition(
        name="DGPT scores and stats",
        base_url="https://www.dgpt.com/scores/",
        useful_fields=("current_scores", "season_stats", "tour_context"),
        v1_decision="opportunistic_current_stats",
        caveat="Platform changed after UDisc Live; endpoints need per-season validation.",
    ),
)


COMPARISON_COHORT: tuple[dict[str, str | int], ...] = (
    {"name": "Gannon Buhr", "pdga_number": 75412, "slug": "gannon-buhr"},
    {"name": "Isaac Robinson", "pdga_number": 50670, "slug": "isaac-robinson"},
    {"name": "Calvin Heimburg", "pdga_number": 45971, "slug": "calvin-heimburg"},
    {"name": "Ricky Wysocki", "pdga_number": 38008, "slug": "ricky-wysocki"},
    {"name": "Eagle McMahon", "pdga_number": 37817, "slug": "eagle-mcmahon"},
    {"name": "Paul McBeth", "pdga_number": 27523, "slug": "paul-mcbeth"},
    {"name": "Anthony Barela", "pdga_number": 44382, "slug": "anthony-barela"},
    {"name": "Kyle Klein", "pdga_number": 85132, "slug": "kyle-klein"},
)

