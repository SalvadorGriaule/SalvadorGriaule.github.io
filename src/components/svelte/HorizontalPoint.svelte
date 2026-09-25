<script lang="ts">
    import type { entrerCV } from "./type";
    import { progress } from "@assets/ts/progresBar";
    import { watch } from "runed";
    let {
        nb,
        activeP,
        entrerCV,
    }: { nb: number; activeP: number; entrerCV?: entrerCV } = $props();

    let previousP = $state(0);
    let wBar = $state(0);
    let wProgBar: null | HTMLDivElement = $state(null);
    let sense = $derived(previousP > activeP)
    let fix = $derived(activeP == 0 ? 0 : activeP - 1);
    
    let ind = $derived(activeP <= 2 ? 0 : 1);
    let preInd = $state(0)
    
    let cvPoint: HTMLDivElement[] = $state([]);

    const progBar = (activePoint: number) => {
        if (wProgBar && previousP && activeP != 0) {
            const animeBar = {
                targets: wProgBar,
                width: `${100 * (fix / (nb - 1))}%`
            }
            
            const point = {
                targets: cvPoint[sense ? preInd : ind],
                borderColor: activePoint == 0 ? "#05df72" : sense ? "#fffff" : "#05df72"
            }

            progress(point,animeBar,sense);
            preInd = ind
        }
        previousP = activeP
    };
    
    watch(() => activeP, () => {
        progBar(activeP);
    })     
</script>

<div
    bind:clientWidth={wBar}
    class="flex relative items-center justify-between bg-white w-full h-1.5 rounded-2xl"
>
    <div
        class="border-green-500 z-30 relative rounded-full border-2 bg-gradient-to-bl from-zinc-400 to-zinc-600 w-4 h-4"
    ></div>
    {#each { length: nb - 1 }, i}
        <div
            bind:this={cvPoint[i]}
            class="border-white relative z-30 rounded-full border-2 bg-gradient-to-bl from-zinc-400 to-zinc-600 w-4 h-4"
        ></div>
    {/each}
    <div bind:this={wProgBar} class="absolute bg-green-500 h-full"></div>
</div>
