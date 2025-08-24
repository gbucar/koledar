<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";
    import "../app.css";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <title>Koledar</title>
</svelte:head>

<div class="flex flex-col h-full gap-5 text-stone-900">
    {@render children?.()}
</div>
