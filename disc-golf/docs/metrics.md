# Metrics

## Outcome Rates

- `win_rate`: wins divided by starts in the selected event set.
- `podium_rate`: top-three finishes divided by starts.
- `top5s` and `top10s`: count-based consistency measures.

## Finish Quality

- `average_finish`: average finishing position.
- `finish_percentile`: field-adjusted finish rank, where `1.0` is first and `0.0` is last in the selected field.

## Round Quality

- `average_round_rating`: mean round rating across available rounds.
- `rating_std_dev`: population standard deviation of available round ratings.
- `best_round_rating`: highest available round rating.

## Field-Adjusted Scoring

- `strokes_vs_seed_field`: player score to par minus the event-field average score to par.
- Negative values indicate strokes gained against the selected field.

## Final-Round Movement

- `places_gained_final_round`: position before the final round minus final position.
- Positive values indicate places gained on the final round.

## Current Validation Status

The checked-in data is a seed fixture used to validate the pipeline and frontend. Before publishing the final essay, replace the seed fixture with scraped PDGA/StatMando/DGPT data and rerun the same metrics.

