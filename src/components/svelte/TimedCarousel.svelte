<script lang="ts">
    import { breakPointAdd } from "@assets/ts/breakPoint";
    import anime from "animejs";
    import type { ImageMetadata } from "astro";
    import { onMount } from "svelte";

    let { img, alt }: { img: (string | ImageMetadata)[]; alt?: string[] } =
        $props();

    let srcArr = $derived(
        img.map((elem) => (typeof elem == "string" ? elem : elem.src)),
    );

    let currentImg = $state(0);
    let btnCar: HTMLDivElement[] = $state([]);
    let carousel: null | HTMLDivElement = $state(null);

    const onclick = (num: number) => {
        if (carousel){
            carousel.scrollLeft = num * (carousel.children[0].offsetWidth)
            if(currentImg != num){
                anime.remove(btnCar[currentImg])
                btnCar[currentImg].style.width = "0%";
                currentImg = num;
                
            }

        }
    };

    onMount(() => {
        setInterval(() => {
            anime({
                targets: btnCar[currentImg],
                width: "100%",
                duration: 3400,
                easing: "linear",
                complete: function () {
                    currentImg++;
                    btnCar[currentImg - 1].style.width = "0%";
                    if (carousel && currentImg == srcArr.length) {
                        currentImg = 0;
                        carousel.scrollLeft = 0;
                    } else {
                        if (carousel)
                            carousel.scrollBy({
                                left: carousel.children[0].offsetWidth,
                                behavior: "smooth",
                            });
                    }
                },
            });
        }, 3410);
    });
</script>

<div
    class="w-4/5 lg:w-2/5 bg-[rgba(0,0,0,0.35)] backdrop-blur-md rounded-md p-2"
>
    <div
        bind:this={carousel}
        class="flex overflow-hidden scroll-smooth snap-mandatory snap-always snap-x"
    >
        {#each srcArr as elem, i}
            <img src={elem} alt={alt && alt[i] ? alt[i] : ""} />
        {/each}
    </div>
    <div class="flex h-3 w-full mt-2">
        {#each { length: img.length }, i}
            <button
                style:width={`${100 / img.length - 0.5}%`}
                class="h-3 ml-[0.5%] bg-[rgba(0,0,0,0.35)] backdrop-blur-md"
                onclick={() => onclick(i)}
                aria-label="change image"
            >
                <div
                    bind:this={btnCar[i]}
                    class="h-3 w-0 bg-[rgba(255,255,255,0.35)]"
                ></div>
            </button>
        {/each}
    </div>
</div>
