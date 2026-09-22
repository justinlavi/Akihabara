<script lang="ts">
    import { createEventDispatcher } from "svelte";
    export let title: string;
    export let score: number | null = null;
    let active = false;
    $: label = `${title}: ${score ?? "unrated"}`;
    const dispatch = createEventDispatcher<{ select: string }>();
</script>

<article class:active on:click={() => dispatch("select", title)}>
    <h2>{label}</h2>
    {#if score !== null}
        <meter min="0" max="10" value={score}>{score}</meter>
    {:else}
        <em>Not rated</em>
    {/if}
</article>

<style>
    article.active { border-color: #7757ba; }
</style>
