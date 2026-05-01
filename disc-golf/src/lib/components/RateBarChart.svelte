<script lang="ts">
  import { scaleBand, scaleLinear } from 'd3';
  import type { PlayerSummary } from '$lib/types';

  export let players: PlayerSummary[] = [];
  export let metric: 'win_rate' | 'podium_rate' = 'podium_rate';

  const width = 760;
  const height = 360;
  const margin = { top: 24, right: 24, bottom: 96, left: 56 };

  const barX = (name: string) => x(name) ?? 0;

  $: sorted = [...players].sort((a, b) => b[metric] - a[metric]).slice(0, 8);
  $: x = scaleBand()
    .domain(sorted.map((player) => player.name))
    .range([margin.left, width - margin.right])
    .padding(0.28);
  $: y = scaleLinear()
    .domain([0, Math.max(0.5, ...sorted.map((player) => player[metric]))])
    .nice()
    .range([height - margin.bottom, margin.top]);
</script>

<svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Player rate comparison">
  <line
    x1={margin.left}
    x2={width - margin.right}
    y1={height - margin.bottom}
    y2={height - margin.bottom}
  />
  {#each y.ticks(5) as tick}
    <g class="axis-tick">
      <line x1={margin.left} x2={width - margin.right} y1={y(tick)} y2={y(tick)} />
      <text x={margin.left - 10} y={y(tick)}>{Math.round(tick * 100)}%</text>
    </g>
  {/each}
  {#each sorted as player}
    <g>
      <rect
        class:focus={player.name === 'Gannon Buhr'}
        x={barX(player.name)}
        y={y(player[metric])}
        width={x.bandwidth()}
        height={height - margin.bottom - y(player[metric])}
        rx="8"
      />
      <text class="bar-value" x={barX(player.name) + x.bandwidth() / 2} y={y(player[metric]) - 8}>
        {Math.round(player[metric] * 100)}%
      </text>
      <text
        class="x-label"
        x={barX(player.name) + x.bandwidth() / 2}
        y={height - margin.bottom + 20}
        transform={`rotate(35 ${barX(player.name) + x.bandwidth() / 2} ${height - margin.bottom + 20})`}
      >
        {player.name}
      </text>
    </g>
  {/each}
</svg>

