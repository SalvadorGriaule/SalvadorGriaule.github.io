<script lang="ts">
    // import componants local
    import Onglet from "./Onglet.svelte";
    import { currentKey } from "./Onglet.svelte";
    import LinkBox from "./LinkBox.svelte";
    import LogoLib from "./LogoLib.svelte";
    // import type
    import { type LinkSlice} from "./type.ts";
    // import Svelte
    import { onMount } from "svelte";
    // import componants flowbit-svelte
    import Laptop from "flowbite-svelte/Laptop.svelte";
    import DefaultMockup from "flowbite-svelte/DefaultMockup.svelte";

    let carousel: HTMLDivElement;

    let changingKey = (key: number, tabElem: HTMLCollection) => {
        if (currentKey.currentKey == 1) {
            tabElem[1].classList.remove("translate-x-180");
            tabElem[0].classList.add("-translate-x-180");
        } else {
            tabElem[1].classList.add("translate-x-180");
            tabElem[0].classList.remove("-translate-x-180");
        }
    };

    const {
        titre,
        desktopSrc,
        phoneSrc,
        lien,
        description,
        techUse,
    }: {
        titre: string;
        desktopSrc: string;
        phoneSrc: string;
        lien: LinkSlice[];
        description: string;
        techUse: string[];
    } = $props();

    onMount(() => {
        let elemCarousel = carousel.children;
        $effect(() => {
            changingKey(currentKey.currentKey, elemCarousel);
        });
    });
</script>

<div
    class="card w-11/12 p-2 bg-linear-to-br from-neutral-300/30 to-neutral-500/30 rounded-md m-2 backdrop-blur-md relative"
>
    <h2 class="text-5xl duration-150 mb-4 md:-mb-6">{titre}</h2>
    <ul
        class="px-[14px] flex relative space-x-8 ease-out duration-150 translate-y-0 z-10 md:translate-y-10"
    >
        <Onglet key={0} titre="Smartphone" />
        <Onglet key={1} titre="Laptop" />
    </ul>
    <div
        class="bg-slate-900 relative rounded-r-xl rounded-bl-xl overflow-hidden z-20"
    >
        <div
            bind:this={carousel}
            class="flex justify-center relative w-full h-[420px] xl:h-[480px] 2xl:h-[650px] duration-150"
        >
            <div
                class="z-20 absolute min-w-[180px] w-1/6 self-center duration-150 md:mr-[80%] md:mt-[5%] md:translate-x-0 md:self-start xl:w-2/13 2xl:mt-[4.2%]"
            >
                <DefaultMockup
                    slot="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-800"
                    div="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-full w-full"
                    top="h-1/7 w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[10%] rounded-l-lg"
                    leftTop="h-1/7 w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[27%] rounded-l-lg"
                    leftBot="h-1/7 w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[45%] rounded-l-lg"
                    right="h-1/7 w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[45%] rounded-r-lg"
                >
                    <img src={phoneSrc} alt="" />
                </DefaultMockup>
            </div>
            <div
                class="z-10 absolute self-center w-4/5 duration-150 translate-x-180 md:translate-x-0"
            >
                <Laptop
                    bot="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm  h-[21px] max-w-full"
                    inner="rounded-lg overflow-hidden h-full bg-white dark:bg-gray-800"
                    div="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-full max-w-7/8"
                >
                    <img src={desktopSrc} alt="" />
                </Laptop>
            </div>
        </div>
    </div>
    <div class="mt-3 flex flex-col lg:flex-row">
        <div class="p-2 lg:w-3/5">
            <LinkBox tabLink={lien} />
            <h3 class="text-3xl">Description</h3>
            <p class="mt-3">{description}</p>
        </div>
        <div class="p-2 lg:w-2/5 lg:border-l-2 border-black">
            <h3 class="text-3xl mb-2">Technologie utilisé</h3>
            <div
                class="flex justify-center flex-wrap space-x-2 space-y-2 lg:justify-start"
            >
                {#each techUse as tech}
                    <LogoLib name={tech} />
                {/each}
            </div>
        </div>
    </div>
</div>
