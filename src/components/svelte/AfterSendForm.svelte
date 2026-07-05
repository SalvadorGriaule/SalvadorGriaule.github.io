<script lang="ts">
    let { succes = "", errorForm = "" }: { succes: string; errorForm: string } =
        $props();
</script>

{#if succes != ""}
    <div class="p-2 m-1 bg-green-600 rounded-lg text-white text-center">
        <p>{succes}</p>
    </div>
{/if}
{#if errorForm != ""}
    <div class="p-2 m-1 bg-red-600 rounded-lg text-white text-center">
        <p>{errorForm}</p>
    </div>
{/if}
