<script lang="ts">
    import anime from "animejs";
    import type { ImageMetadata } from "astro";

    interface DiagonalCarouselProps {
        slides: (string | ImageMetadata)[];
        distance?: number | { x: number; y: number };
        navBtn?: boolean;
        classNameWH?: string;
        classNamePrin?: string;
    }

    let {
        slides,
        distance = 65,
        navBtn = false,
        classNameWH = "w-130 h-130",
        classNamePrin,
    }: DiagonalCarouselProps = $props();

    const arraySwitch = (arr: any[], sens: "down" | "up") => {
        const save = sens == "down" ? arr.pop() : arr.shift();
        sens == "down" ? arr.unshift(save) : arr.push(save);
        return arr;
    };

    const calcDistance = (
        dis: number | { x: number; y: number },
        arrLen: number,
    ) => {
        if (arrLen > 0) {
            if (typeof dis == "number") {
                return { x: dis / arrLen, y: dis / arrLen };
            } else return { x: dis.x / arrLen, y: dis.y / arrLen };
        } else return { x: 1, y: 1 };
    };

    let normalizeSlide = $derived(
        slides.map((elem) => (typeof elem == "string" ? elem : elem.src)),
    );

    let ecartSlide = $derived(calcDistance(distance, slides.length));

    let direction: "down" | "up" | null = $state(null);

    let phase: "idle" | "fading" = $state("idle");

    let locked = $state(false);

    let container: HTMLDivElement[] = $state([]);

    const navigateCarousel = (sens: "down" | "up") => {
        console.log("sens", sens);
        if (locked || phase != "idle") return;
        locked = true;

        phase = "fading";
        let isDown = sens == "down";
        const firstTarget = container[isDown ? container.length - 1 : 0];
        anime({
            targets: firstTarget,
            opacity: 0,
            duration: 700,
            easing: "easeInQuad",
            complete: () => {
                firstTarget.style.zIndex = isDown
                    ? String(0)
                    : String(container.length - 1);
                firstTarget.style.transform = isDown
                    ? "translateX(0px) translateY(0px)"
                    : `translateX(${(container.length - 1) * ecartSlide.x}px) translateY(${(container.length - 1) * ecartSlide.y}px)`;
                anime({
                    targets: firstTarget,
                    opacity: 1,
                    duration: 700,
                    easing: "easeInQuad",
                    complete: () => {
                        container = arraySwitch(container, sens);
                    },
                });
            },
        });
        const begin = isDown ? 0 : 1;
        for (
            let i = begin;
            i <= (isDown ? container.length - 2 : container.length - 1);
            i++
        ) {
            anime({
                targets: container[i],
                duration: 700,
                translateX: isDown
                    ? (i + 1) * ecartSlide.x
                    : (i - 1) * ecartSlide.x,
                translateY: isDown
                    ? (i + 1) * ecartSlide.y
                    : (i - 1) * ecartSlide.y,
                easing: "easeInQuad",
                complete: () => {
                    container[i].style.zIndex = String(isDown ? i + 1 : i - 1);
                },
            });
        }
        setTimeout(() => {
            phase = "idle";
            locked = false;
        }, 1400);
    };

    const onwheel = (e: WheelEvent) => {
        e.preventDefault();
        direction = e.deltaY > 0 ? "down" : "up";
        navigateCarousel(direction);
    };
</script>

<div
    {onwheel}
    class="relative flex items-center justify-center w-screen h-fit {classNamePrin}"
>
    {#if navBtn}
        <button
            onclick={() => navigateCarousel("up")}
            class="text-4xl text-blue-500">◄</button
        >
    {/if}
    <div class="relative {classNameWH}">
        {#each normalizeSlide as slide, i}
            <div
                id={String(i)}
                class="rounded-2xl absolute inset-0 bg-linear-to-br from-sky-500 to-cyan-800 p-1"
                style:transform="translateX({i * ecartSlide.x}px) translateY({i *
                    ecartSlide.y}px)"
                style:z-index={Number(i)}
                bind:this={container[i]}
            >
                <div
                    class="h-full w-full rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat"
                    style:background-image="url({slide})"
                ></div>
            </div>
        {/each}
    </div>
    {#if navBtn}
        <button
            onclick={() => navigateCarousel("down")}
            class="text-4xl text-blue-500"
            style:margin-left="{ecartSlide.x * 2}px">►</button
        >
    {/if}
</div>
