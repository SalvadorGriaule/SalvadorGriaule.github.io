<script lang="ts">
  import anime from "animejs";

  let {
    urlArr,
    currentImg,
    dim,
    key = 0,
  }: {
    urlArr: { src: string; height: number; width: number }[];
    currentImg: number;
    dim: number;
    key?: number;
  } = $props();

  const calcWidth = (dimImg: { height: number; width: number }) => {
    const rapport = dimImg.width / dimImg.height;
    return { rapport, newWidth: dimImg.width / (dimImg.width / dim / rapport) };
  };

  let sizeSvg = $state({ width: 0, height: 0 });
  let radial = $state({ offset1: 100, offset2: 100 });
  let backImg = $state(0);
  let frontImg = $state(0);
  let sense: boolean = $state(false);
  let previouse: "back" | "front" | null = $state(null);
  let activ: boolean = $state(false);
  
  let { rapport, newWidth } = $derived(calcWidth(urlArr[currentImg]));

  let lastRapport = $state({ rapport, newWidth });

  const durationAnim = { minTime: 600, maxTime: 800 };

  $effect(() => {
    if (frontImg != currentImg && !activ) {
      activ = true;
      sense = frontImg < currentImg;
      previouse = !sense ? "front" : "back";
      sense ? (frontImg = currentImg) : (backImg = currentImg);
      radial.offset1 = sense ? 0 : 100;
      radial.offset2 = sense ? 0 : 100;
      anime({
        targets: radial,
        offset1: {
          value: sense ? 100 : 0,
          duration: sense ? durationAnim.maxTime : durationAnim.minTime,
          easing: "easeInSine",
        },
        offset2: {
          value: sense ? 100 : 0,
          duration: sense ? durationAnim.minTime : durationAnim.maxTime,
          easing: "easeInSine",
        },
        complete: function () {
          !sense ? (frontImg = currentImg) : (backImg = currentImg);
          sense = false;
          activ = false;
          previouse = null;
          lastRapport = { rapport, newWidth };
        },
      });
    }
  });
</script>

<div
  class="relative justify-center items-center flex-none rounded-full outline-4 outline-white outline-offset-8 bg-white overflow-hidden"
  style:width={dim + "px"}
  style:height={dim + "px"}
>
  <svg class="absolute z-10 left-0 top-0 w-full h-full">
    <defs>
      <mask id="circle2{key}">
        <circle
          r={sizeSvg.height}
          cx={sizeSvg.width / 2}
          cy={sizeSvg.height / 2}
          fill="#ffffff"
        />
      </mask>
    </defs>
    <image
      width={previouse == "back" ? lastRapport.newWidth : newWidth}
      height={dim}
      x={previouse == "back" ? -lastRapport.newWidth / 8 : -newWidth / 8}
      y={0}
      href={urlArr[backImg].src}
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
          r={sizeSvg.height}
          cx={sizeSvg.width / 2}
          cy={sizeSvg.height / 2}
          fill="url(#grad{key})"
        />
      </mask>
    </defs>
    <image
      width={previouse == "front" ? lastRapport.newWidth : newWidth}
      height={dim}
      x={previouse == "front" ? -lastRapport.newWidth / 8 : -newWidth / 8}
      y={0}
      href={urlArr[frontImg].src}
      mask="url(#circle{key})"
    />
  </svg>
</div>
