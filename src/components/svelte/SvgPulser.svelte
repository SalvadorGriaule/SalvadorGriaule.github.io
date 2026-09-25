<script lang="ts">
    import { onMount, type Component } from "svelte";
    import anime from "animejs";
    let { Svg }: { Svg: Component } = $props();

    let pulsing: null | HTMLDivElement = $state(null);

    onMount(() => {
        anime({
            targets: pulsing.children[0],
            duration: 1200,
            easing: "linear",
            delay: 150,
            transform: "scale(1.95)",
            opacity: 0,
            loop: true,
            complete: () => {
                if (pulsing) {
                    pulsing.style.opacity = "1";
                    pulsing.style.transform = "scale(1)";
                }
            },
        });
    });
</script>

<div class="w-full h-full relative flex justify-center items-center">
    <Svg />
    <div
        bind:this={pulsing}
        class="z-10 absolute w-full h-full flex justify-center items-center"
    >
        <Svg />
    </div>
</div>
