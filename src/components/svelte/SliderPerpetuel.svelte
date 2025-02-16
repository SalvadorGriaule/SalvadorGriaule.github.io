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

    const incremTranslateX = () => {
        let sliding = anime({
            targets: slider,
            translateX: -valueX - 16,
            duration: 1400,
            easing: "linear",
            complete: function () {
                console.log(wSlide,tabSlider);
                tabSlider.push(tabSlider[i])
                tabSlider.unshift()
                document.getElementById(`slide${i}`)?.remove()
                slider.style.transform = ""
                i++;
                incremTranslateX();
            },
        });
    };
    onMount(() => {
        valueX = wSlide
        incremTranslateX();
    });
</script>

<div class="overflow-hidden">
    <div bind:this={slider} class="flex flex-nowrap w-screen my-4">
        {#each tabSlider as slide,i}
            <div
                bind:offsetWidth={wSlide} id={"slide"+i} class="w-84 min-w-84 h-84 mx-2 rounded-xl bg-zinc-500/20 flex justify-center items-center"
            >
                <LogoLib name={slide} classL="w-46" />
            </div>
        {/each}
    </div>
</div>
