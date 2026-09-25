<script lang="ts">
    import EyeSvg from "./SvgComponants/EyeSvg.svelte";
    import ClosedEyeSvg from "./SvgComponants/ClosedEyeSvg.svelte";

    let { etat }: { etat: boolean } = $props();
</script>

{#if etat}
    <EyeSvg />
{:else}
    <ClosedEyeSvg />
{/if}
