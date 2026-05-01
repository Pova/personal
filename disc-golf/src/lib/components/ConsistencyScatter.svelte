<script lang="ts">
  import { scaleLinear } from 'd3';
  import type { PlayerSummary } from '$lib/types';

  export let players: PlayerSummary[] = [];

  const width = 760;
  const height = 400;
  const margin = { top: 28, right: 28, bottom: 64, left: 72 };

  $: plotted = players.filter((player) => player.average_round_rating !== null);
  $: x = scaleLinear()
    .domain([
      Math.min(...plotted.map((player) => player.rating_std_dev)) - 2,
      Math.max(...plotted.map((player) => player.rating_std_dev)) + 2
    ])
    .nice()
    .range([margin.left, width - margin.right]);
  $: y = scaleLinear()
    .domain([
      Math.min(...plotted.map((player) => player.average_round_rating ?? 0)) - 5,
      Math.max(...plotted.map((player) => player.average_round_rating ?? 0)) + 5
    ])
    .nice()
    .range([height - margin.bottom, margin.top]);
</script>

<svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Round rating ceiling and variance">
  {#each x.ticks(5) as tick}
    <g class="axis-tick">
      <line x1={x(tick)} x2={x(tick)} y1={margin.top} y2={height - margin.bottom} />
      <text x={x(tick)} y={height - margin.bottom + 28}>{tick}</text>
    </g>
  {/each}
  {#each y.ticks(5) as tick}
    <g class="axis-tick">
      <line x1={margin.left} x2={width - margin.right} y1={y(tick)} y2={y(tick)} />
      <text x={margin.left - 12} y={y(tick)}>{tick}</text>
    </g>
  {/each}
  <text class="axis-title" x={width / 2} y={height - 12}>Round rating volatility</text>
  <text class="axis-title vertical" x={-height / 2} y="20">Average round rating</text>

  {#each plotted as player}
    <g>
      <circle
        class:focus={player.name === 'Gannon Buhr'}
        cx={x(player.rating_std_dev)}
        cy={y(player.average_round_rating ?? 0)}
        r={player.name === 'Gannon Buhr' ? 11 : 8}
      />
      <text
        class="point-label"
        x={x(player.rating_std_dev) + 12}
        y={y(player.average_round_rating ?? 0) - 8}
      >
        {player.name}
      </text>
    </g>
  {/each}
</svg>

