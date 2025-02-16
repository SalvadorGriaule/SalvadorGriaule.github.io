<script lang="ts">
    import { onMount } from "svelte";
    import LogoLib from "./LogoLib.svelte";
    import anime from "animejs";

    let slider: HTMLDivElement;
    let wSlide:number;
    let valueX: number;
    let i = 0
    const { tabSrc }: { tabSrc: string[] } = $props();
    let tabSlider = $state(tabSrc)

    const incremTranslateX = (value: number) => {
        let sliding = anime({
            targets: slider,
            translateX: -value,
            duration: 1400,
            easing: "linear",
            complete: function () {
                console.log(sliding);
                sliding.remove(slider);
                console.log("post",sliding);
                valueX += wSlide;
                tabSlider.push(tabSlider[i])
                i++
                incremTranslateX(valueX);
            },
        });
    };
    onMount(() => {
        valueX = wSlide
        incremTranslateX(valueX);
    });
</script>

<div class="overflow-hidden">
    <div bind:this={slider} class="flex flex-nowrap w-screen space-x-4 my-4">
        {#each tabSlider as slide,i}
            <div
                bind:offsetWidth={wSlide} id={"slide"+i} class="w-84 min-w-84 h-84 rounded-xl bg-zinc-500/20 flex justify-center items-center"
            >
                <LogoLib name={slide} classL="w-46" />
            </div>
        {/each}
    </div>
</div>
