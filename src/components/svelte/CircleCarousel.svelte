<script lang="ts">
    import anime from "animejs";

    let {
        urlArr,
        currentImg,
        key = 0,
    }: { urlArr: string[]; currentImg: number; key: number } = $props();

    let sizeSvg = $state({ width: 0, height: 0 });
    let radial = $state({ offset1: 100, offset2: 100 });
    let backImg = $state(0);
    let frontImg = $state(0);
    let sense: boolean = $state(false);
    let activ: boolean = $state(false);
    let wScreen = $state(0);

    const durationAnim = { minTime: 600, maxTime: 800 };

    $effect(() => {
        if (frontImg != currentImg && !activ) {
            activ = true;
            sense = frontImg < currentImg;
            sense ? (frontImg = currentImg) : (backImg = currentImg);
            radial.offset1 = sense ? 0 : 100;
            radial.offset2 = sense ? 0 : 100;
            anime({
                targets: radial,
                offset1: {
                    value: sense ? 100 : 0,
                    duration: sense
                        ? durationAnim.maxTime
                        : durationAnim.minTime,
                    easing: "easeInSine",
                },
                offset2: {
                    value: sense ? 100 : 0,
                    duration: sense
                        ? durationAnim.minTime
                        : durationAnim.maxTime,
                    easing: "easeInSine",
                },
                complete: function () {
                    !sense ? (frontImg = currentImg) : (backImg = currentImg);
                    sense = false;
                    activ = false;
                },
            });
        }
    });
</script>

<svelte:window bind:innerWidth={wScreen} />

<div
    class="relative w-[350px] h-[350px] justify-center items-center flex-none rounded-full outline-4 outline-white outline outline-offset-8 bg-white overflow-hidden lg:w-[770px] lg:h-[770px] lg:-mr-36 lg:mt-72 xl:flex"
>
    <svg class="absolute z-10 left-0 top-0 w-full h-full">
        <defs>
            <mask id="circle2{key}">
                <circle
                    r={wScreen < 1024
                        ? sizeSvg.height - 100
                        : sizeSvg.height - 387} 
                    cx={sizeSvg.width / 2}
                    cy={sizeSvg.height / 2}
                    fill="#ffffff"
                />
            </mask>
        </defs>
        <image
            width={wScreen < 1024 ? sizeSvg.width * 1.6 : sizeSvg.width * 1.2}
            height={wScreen < 1024 ? sizeSvg.width * 1.6 : sizeSvg.height * 1.2}
            x={wScreen < 1024 ? -90 : -150}
            y={wScreen < 1024 ? -90 : -150}
            href={urlArr[backImg]}
            mask="url(#circle2{key})"
        />
    </svg>
    <svg
        class="absolute z-20 left-0 top-0 w-full h-full"
        bind:clientWidth={sizeSvg.width}
        bind:clientHeight={sizeSvg.height}
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <radialGradient id="grad{key}" cx="50%" r="50%" fx="50%" fy="50%">
                <stop offset="{radial.offset1}%" stop-color="#ffffff" />
                <stop offset="{radial.offset2}%" stop-color="#000000" />
            </radialGradient>
            <mask id="circle{key}">
                <circle
                    r={wScreen < 1024
                        ? sizeSvg.height - 40
                        : sizeSvg.height - 387}
                    cx={sizeSvg.width / 2}
                    cy={sizeSvg.height / 2}
                    fill="url(#grad{key})"
                />
            </mask>
        </defs>
        <image
            width={wScreen < 1024 ? sizeSvg.width * 1.6 : sizeSvg.width * 1.2}
            height={wScreen < 1024 ? sizeSvg.width * 1.6 : sizeSvg.height * 1.2}
            x={wScreen < 1024 ? -90 : -150}
            y={wScreen < 1024 ? -90 : -150}
            href={urlArr[frontImg]}
            mask="url(#circle{key})"
        />
    </svg>
</div>
