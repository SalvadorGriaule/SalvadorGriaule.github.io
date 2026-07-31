<script lang="ts">
    import Chevrons from "./SvgComponants/Chevrons.svelte";
    import SvgPulser from "./SvgPulser.svelte";

    let {
        img,
        alt,
    }: {
        img: [string | ImageMetadata, string | ImageMetadata];
        alt?: [string, string];
    } = $props();

    interface ArrowVal {
        opa: number;
        display: "none" | "flex";
    }

    const img1 = $derived(typeof img[0] === "string" ? img[0] : img[0].src);
    const img2 = $derived(typeof img[1] === "string" ? img[1] : img[1].src);

    let refMo = $state(0);

    let widImg: null | HTMLDivElement = $state(null);
    let passiImg: null | HTMLDivElement = $state(null);
    let btnFocin: boolean = $state(false);
    let arrow: [ArrowVal, ArrowVal] = $state([
        { opa: 1, display: "flex" },
        { opa: 1, display: "flex" },
    ]);

    const onmousedown = (e: MouseEvent) => {
        refMo = e.clientX;
    };

    const onmousemove = (e: MouseEvent) => {
        if (widImg && passiImg && refMo != 0) {
            widImg.style.width = `${widImg.clientWidth + (e.clientX - refMo)}px`;
            refMo = e.clientX;
        }
    };

    const onmouseup = () => {
        refMo = 0;
    };

    const onfocus = () => {
        onmouseover();
    };

    const onmouseover = () => {
        arrow[0].opa = 0;
        arrow[1].opa = 0;
        setTimeout(() => {
            arrow[0].display = "none";
            arrow[1].display = "none";
        }, 700);
    };

    const onkeydown = (e: KeyboardEvent) => {
        if (widImg && btnFocin) {
            switch (e.key) {
                case "ArrowLeft":
                    widImg.style.width = `${widImg.clientWidth - 5}px`;
                    break;
                case "ArrowRight":
                    widImg.style.width = `${widImg.clientWidth + 5}px`;
                    break;
            }
        }
    };
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
    bind:this={passiImg}
    style:background-image={`url(${img2})`}
    class="flex bg-cover h-full ease-in items-center"
    {onmouseup}
    {onmousemove}
    role="main"
>
    <div
        class="w-1/2 h-full bg-cover flex justify-end items-center"
        bind:this={widImg}
        style:background-image={`url(${img1})`}
    >
        {widImg != null && widImg.style.backgroundImage
            ? ""
            : Array.isArray(alt) && alt[0]
              ? alt[0]
              : ""}
        <div
            style:opacity={arrow[0].opa}
            style:display={arrow[0].display}
            class="w-12 h-18 duration-700 bg-white/50 rounded-l-full justify-center items-center"
        >
            <div class="rotate-270 w-8 h-12">
                <SvgPulser Svg={Chevrons} />
            </div>
        </div>
    </div>
    <button
        bind:focused={btnFocin}
        title="resizer"
        {onmousedown}
        {onfocus}
        {onmouseover}
        {onkeydown}
        class="w-2 h-full bg-white cursor-col-resize"
    ></button>
    {#if !passiImg || !passiImg.style.backgroundImage}
        <p>{Array.isArray(alt) && alt[1] ? alt[1] : ""}</p>
    {:else}
        <div
            style:opacity={arrow[1].opa}
            style:display={arrow[1].display}
            class="w-12 h-18 duration-700 bg-white/50 rounded-r-full justify-center items-center"
        >
            <div class="rotate-90 w-8 h-12">
                <SvgPulser Svg={Chevrons} />
            </div>
        </div>
    {/if}
</div>
