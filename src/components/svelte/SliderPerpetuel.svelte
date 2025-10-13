<script lang="ts">
    import { onMount } from "svelte";
    import LogoLib from "./LogoLib.svelte";
    import anime from "animejs";
    import { breakPointAdd } from "../../assets/ts/breakPoint.ts";

    let slider: HTMLDivElement;
    let wSlide: number = $state.raw(0);
    let valueX: number;
    let i = 0;
    const { tabSrc }: { tabSrc: string[] } = $props();
    let tabSlider = $state(tabSrc);

    const incremTranslateX = () => {
        anime({
            targets: slider,
            translateX: -valueX - 16,
            duration: 1400,
            easing: "linear",
            complete: function () {
                tabSlider.push(tabSlider[i]);
                tabSlider.unshift();
                document.getElementById(`slide${i}`)?.remove();
                slider.style.transform = "";
                i++;
                incremTranslateX();
            },
        });
    };
    onMount(() => {
        const resize = () => {
            anime.remove(slider);
            slider.style.transform = "";
            valueX = wSlide;
            incremTranslateX();
        };
        breakPointAdd(resize);
    });
</script>

<div class="overflow-hidden">
    <div bind:this={slider} class="flex flex-nowrap w-screen my-4">
        {#each tabSlider as slide, i}
            <div
                bind:offsetWidth={wSlide}
                id={"slide" + i}
                class="w-32 min-w-32 h-32 mx-2 rounded-xl bg-zinc-500/20 flex justify-center items-center duration-150 md:w-84 md:min-w-84 md:h-84"
            >
                <LogoLib name={slide} classL="w-24 duration-150 md:w-46" mode="no-link" />
            </div>
        {/each}
    </div>
</div>
