<script lang="ts">
  export let label: string;
  export let value: string | number;
  export let detail = '';
</script>

<article class="stat-card">
  <p>{label}</p>
  <strong>{value}</strong>
  {#if detail}
    <span>{detail}</span>
  {/if}
</article>

