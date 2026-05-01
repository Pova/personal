# Data Dictionary

## `source_snapshots`

Raw source metadata. Every scraped page or API response should be cached and linked to parsed records when possible.

## `players`

Canonical player records keyed by PDGA number when available.

## `player_rating_snapshots`

Historical rating observations. These are separate from `players` because ratings change over time.

## `courses`

Course/location records used by events. V1 does not require complete course metadata.

## `events`

Tournament records, including tour category and major flags.

## `event_results`

One row per player per event/division. This powers finish-rate and field-adjusted metrics.

## `rounds`

One row per player per event round. This powers round-rating distributions, final-round movement, and consistency metrics.

## `derived_metrics`

Computed metrics for the website and validation checks. Keeping these materialized makes the frontend simple and fast.

