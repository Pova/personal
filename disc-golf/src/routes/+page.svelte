<script lang="ts">
  import ConsistencyScatter from '$lib/components/ConsistencyScatter.svelte';
  import RateBarChart from '$lib/components/RateBarChart.svelte';
  import StatCard from '$lib/components/StatCard.svelte';
  import TimelineChart from '$lib/components/TimelineChart.svelte';
  import type { AnalysisPayload } from '$lib/types';

  export let data: { analysis: AnalysisPayload };

  $: analysis = data.analysis;
  $: focus = analysis.focus;
  $: averageStrokesVsField =
    analysis.focus_results.reduce((sum, result) => sum + result.strokes_vs_seed_field, 0) /
    analysis.focus_results.length;
  $: finalRoundNet = analysis.final_round_movement
    .filter((row) => row.pdga_number === analysis.metadata.focus_pdga_number)
    .reduce((sum, row) => sum + row.places_gained_final_round, 0);
</script>

<svelte:head>
  <title>Disc Golf Data | Gannon Buhr</title>
</svelte:head>

<main>
  <section class="hero">
    <p class="eyebrow">Disc Golf Data Project</p>
    <h1>{analysis.metadata.title}</h1>
    <p class="lede">
      A reusable data pipeline and responsive data story for comparing Gannon Buhr's scoring
      profile against elite MPO players.
    </p>
    <div class="hero-grid">
      <StatCard label="Wins in seed set" value={focus.wins} detail={`${focus.starts} elite starts`} />
      <StatCard label="Podium rate" value={`${Math.round(focus.podium_rate * 100)}%`} detail="Selected events" />
      <StatCard label="Average round rating" value={focus.average_round_rating ?? 'n/a'} detail={`Best: ${focus.best_round_rating ?? 'n/a'}`} />
      <StatCard label="Avg strokes vs field" value={averageStrokesVsField.toFixed(1)} detail="Negative is better" />
    </div>
  </section>

  <section class="notice">
    <strong>Data status:</strong> {analysis.metadata.dataset_note}
  </section>

  <section class="story-section">
    <div>
      <p class="eyebrow">Result Profile</p>
      <h2>He combines winning equity with a very high floor.</h2>
      <p>
        The first lens is deliberately simple: how often does each player turn elite starts into
        podiums? This is the safest claim to make from public result data before richer shot-level
        sources are confirmed.
      </p>
    </div>
    <div class="chart-card">
      <RateBarChart players={analysis.players} metric="podium_rate" />
    </div>
  </section>

  <section class="story-section">
    <div>
      <p class="eyebrow">Consistency vs Ceiling</p>
      <h2>The next question is whether the edge is ceiling, stability, or both.</h2>
      <p>
        Round ratings give a reusable proxy for round quality. The chart places average rating
        against volatility so later scraped data can test whether Gannon's advantage is high-end
        scoring, lower variance, or a rare mix of both.
      </p>
    </div>
    <div class="chart-card">
      <ConsistencyScatter players={analysis.players} />
    </div>
  </section>

  <section class="story-section">
    <div>
      <p class="eyebrow">Timeline</p>
      <h2>Event-by-event finish quality shows the shape of dominance.</h2>
      <p>
        Finish percentile makes different field sizes comparable. Wins are marked with larger
        points, while major events use the alternate point style.
      </p>
    </div>
    <div class="chart-card">
      <TimelineChart results={analysis.focus_results} />
    </div>
  </section>

  <section class="methodology">
    <div>
      <p class="eyebrow">Methodology</p>
      <h2>Built as a pipeline first, then a story.</h2>
      <p>
        The Python pipeline extracts source snapshots, parses normalized player/event/result/round
        tables, loads Postgres, computes derived metrics, and exports compact JSON for SvelteKit.
      </p>
    </div>
    <ul>
      <li>Current final-round net movement in the seed data: {finalRoundNet} places.</li>
      <li>Primary V1 sources: PDGA, StatMando, and DGPT public pages.</li>
      <li>Unavailable V1 claims: putting, fairway hits, OB rate, and shot-level skill splits.</li>
    </ul>
  </section>
</main>

