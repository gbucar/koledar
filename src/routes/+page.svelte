<script lang="ts">
    import type { PageProps } from "./$types";

    const { data }: PageProps = $props();
    console.log("holidays:", data.holidays);
</script>
