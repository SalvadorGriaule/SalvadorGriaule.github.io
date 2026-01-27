<script lang="ts">
    import type { entrerCV } from "./type";
    import { progress } from "@assets/ts/progresBar";

    let {
        nb,
        activeP,
        entrerCV,
    }: { nb: number; activeP: number; entrerCV?: entrerCV } = $props();

    let previousP = $state(0);
    let wBar = $state(0);
    let wProgBar: null | HTMLDivElement = $state(null);

    let fix = $derived(activeP == 0 ? 0 : activeP - 1);
    
    let ind = $derived(activeP <= 2 ? 0 : 1);
    let preInd = $state(0)
    
    let cvPoint: HTMLDivElement[] = $state([]);

    const progBar = (activePoint: number) => {
        if (wProgBar && previousP && previousP != preInd) {
            const animeBar = {
                targets: wProgBar,
                width: `${100 * (fix / (nb - 1))}%`
            }
            
            const reverse = previousP > activePoint;
            
            const point = {
                targets: cvPoint[reverse ? preInd : ind],
                borderColor: activePoint == 0 ? "#05df72" : reverse ? "#fffff" : "#05df72"
            }
            console.log(point,activeP);
            progress(point,animeBar,reverse);
            preInd = ind
        }
        previousP = activeP
    };


    $effect(() => {
        progBar(activeP);
    });
</script>

<div
    bind:clientWidth={wBar}
    class="flex relative justify-between bg-white w-full h-1.5 rounded-2xl"
>
    <div
        class="border-green-600 relative rounded-full border-2 bg-gradient-to-bl from-zinc-400 to-zinc-600 w-4 h-4"
    ></div>
    {#each { length: nb - 1 }, i}
        <div
            bind:this={cvPoint[i]}
            class="border-white relative rounded-full border-2 bg-gradient-to-bl from-zinc-400 to-zinc-600 w-4 h-4"
        ></div>
    {/each}
    <div bind:this={wProgBar} class="absolute bg-green-600 h-full"></div>
</div>
