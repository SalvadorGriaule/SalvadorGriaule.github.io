<script lang="ts">
    import type { entrerCV } from "./type";
    import anime from "animejs";
    let {
        nb,
        activeP,
        entrerCV,
    }: { nb: number; activeP: number; entrerCV?: entrerCV } = $props();

    let wBar = $state(0);
    let wProgBar: null | HTMLDivElement = $state(null);
    let cvPoint: HTMLDivElement[] = $state([]);

    const progBar = (activePoint: number) => {
        if (wProgBar) {
            anime({
                targets: wProgBar,
                width: `${100 * (activePoint / (nb - 1))}%`,
                easing: "easeOutQuint",
                duration: 600,
            });
        }
    };

    $effect(() => {
        progBar(activeP);
    });
</script>

<div
    bind:clientWidth={wBar}
    class="flex relative justify-between bg-white w-full h-1.5 rounded-2xl"
>
    {#each { length: nb }, i}
        <div
            bind:this={cvPoint[i]}
            class="border-white relative rounded-full border-2 bg-gradient-to-bl from-zinc-400 to-zinc-600 w-4 h-4"
        ></div>
    {/each}
    <div bind:this={wProgBar} class="absolute bg-green-600 h-full"></div>
</div>
