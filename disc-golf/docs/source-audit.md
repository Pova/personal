# Source Audit

This project starts with official scoring outcomes and only adds granular skill claims when a source can support them reliably.

## Sources

| Source | Useful fields | Stability | V1 decision |
| --- | --- | --- | --- |
| PDGA player pages | Player profile, ratings, event history, official results links | Stable public pages, but HTML parsing needs tests | Use for canonical player IDs and event/result discovery |
| PDGA event pages | Event dates, divisions, placements, scores, round ratings when present | Stable enough for cached scraping | Use for event results and round-level scoring where available |
| StatMando | Rankings, player summaries, wins, podiums, elite-field context | Public pages, but likely a rendered app in places | Use for comparison and validation where HTML/JSON is accessible |
| DGPT scores/stats | Current tour scores and stats powered by PDGA Live/StatMando | Current platform may change and may be dynamic | Use only after endpoint audit per event/year |
| UDisc Live archive | Historic hole-by-hole and pro stats | Public historic access appears limited after DGPT platform changes | Do not depend on for V1 |

## V1 Available Fields

The first release should assume these fields are available:

- Player: PDGA number, name, country/home town if exposed, current rating snapshot.
- Event: name, date, tier, tour category, location, source URL.
- Result: division, place, total score, payout when available.
- Round: round number, score, round rating where available.

The first release should not assume these fields are available:

- Putting percentages.
- Fairway hits.
- OB rate.
- Circle 1 / Circle 2 percentages.
- Shot-by-shot or hole-by-hole historical data.

## Scraping Rules

- Cache all raw source responses before parsing.
- Keep a source URL and fetched timestamp for every parsed record.
- Use conservative request rates and a clear user agent.
- Prefer source-specific parsers over broad one-off string matching.
- Treat missing granular stats as a product caveat, not a blocker.

