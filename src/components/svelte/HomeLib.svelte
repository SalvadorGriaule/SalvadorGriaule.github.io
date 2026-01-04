<script lang="ts">
    import { lib } from "@assets/ts/nano";
    import CardLibrary from "./CardLibrary.svelte";

    const lastAdd = [...lib.values()]
</script>

<section class="w-full flex justify-center">
    <div class="bg-linear-to-br flex flex-col items-center from-neutral-300/30 to-neutral-500/30 py-2 px-4 w-11/12 rounded-2xl">
        <h4 class="text-3xl font-semibold pb-2 w-full ">Dernier componants disponible</h4>
        <div class="bg-linear-to-br from-neutral-900/70 to-neutral-950/30 rounded-2xl w-full">
            <div class="w-full flex flex-wrap justify-center space-x-1.5 lg:flex-nowrap">
                {#each lastAdd.slice(lib.size - 3) as elem,i}
                <CardLibrary 
                titre={elem.titre}
                logo={elem.logo}
                id={elem.id}
                media={elem.media}
                />
                {/each}
            </div>
        </div>
    </div>
</section>