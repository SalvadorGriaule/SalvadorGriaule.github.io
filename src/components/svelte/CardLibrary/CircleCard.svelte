<script lang="ts">
  import CircleCarousel from "../CircleCarousel.svelte";
  import { linearColor } from "@assets/ts/nano";

  import ImgHolder1 from "@assets/imgHolder.jpg";
  import ImgHolder2 from "@assets/imgHolder2.jpg";
  import ImgHolder3 from "@assets/imgHolder3.jpg";

  const imgHolder = [ImgHolder1, ImgHolder2, ImgHolder3];
  let currentImg = $state(0);

  const onclickCircle = (num: number) => {
    currentImg = num;
  };
</script>

<div class="flex flex-col items-center">
  <CircleCarousel urlArr={imgHolder} {currentImg} dim={500} />
  <div class="mt-5 flex space-x-2 justify-center opacity-60">
    {#each imgHolder, i}
      <button
        onclick={() => onclickCircle(i)}
        class="p-2 rounded-2xl"
        style:background={`linear-gradient(to right in oklch,${linearColor[i]},${linearColor[i + 1]})`}
        >{i + 1}</button
      >
    {/each}
  </div>
</div>
