<script lang="ts">
  import { scaleLinear, scalePoint } from 'd3';
  import type { FieldAdjustedResult } from '$lib/types';

  export let results: FieldAdjustedResult[] = [];

  const width = 840;
  const height = 360;
  const margin = { top: 28, right: 36, bottom: 88, left: 64 };

  const pointX = (label: string) => x(label) ?? 0;

  $: sorted = [...results].sort((a, b) => a.season - b.season || a.event_name.localeCompare(b.event_name));
  $: labels = sorted.map((result) => `${result.season} ${result.event_name.replace(/^(\\d{4})\\s+/, '')}`);
  $: x = scalePoint().domain(labels).range([margin.left, width - margin.right]).padding(0.5);
  $: y = scaleLinear().domain([0, 1]).range([height - margin.bottom, margin.top]);
</script>

<svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Gannon Buhr event timeline">
  {#each y.ticks(5) as tick}
    <g class="axis-tick">
      <line x1={margin.left} x2={width - margin.right} y1={y(tick)} y2={y(tick)} />
      <text x={margin.left - 10} y={y(tick)}>{Math.round(tick * 100)}%</text>
    </g>
  {/each}
  {#each sorted as result, index}
    <g>
      <line
        class="stem"
        x1={pointX(labels[index])}
        x2={pointX(labels[index])}
        y1={height - margin.bottom}
        y2={y(result.finish_percentile)}
      />
      <circle
        class:major={result.is_major}
        cx={pointX(labels[index])}
        cy={y(result.finish_percentile)}
        r={result.place === 1 ? 11 : 8}
      />
      <text class="bar-value" x={pointX(labels[index])} y={y(result.finish_percentile) - 14}>
        {result.place === 1 ? 'W' : result.place}
      </text>
      <text
        class="x-label compact"
        x={pointX(labels[index])}
        y={height - margin.bottom + 20}
        transform={`rotate(35 ${pointX(labels[index])} ${height - margin.bottom + 20})`}
      >
        {labels[index]}
      </text>
    </g>
  {/each}
</svg>

