<script lang="ts">
  import CircleCarousel from "../CircleCarousel.svelte";

  import ImgHolder1 from "../../../assets/imgHolder.jpg";
  import ImgHolder2 from "../../../assets/imgHolder2.jpg";
  import ImgHolder3 from "../../../assets/imgHolder3.jpg";

  const imgHolder = [ImgHolder1, ImgHolder2, ImgHolder3];
  let currentImg = $state(0);

  const onclickCircle = (num: number) => {
    currentImg = num;
  };
</script>

<div class="flex flex-col items-center">
  <CircleCarousel urlArr={imgHolder} {currentImg} dim={500} />
  <div class="mt-5 flex space-x-2 justify-center">
    {#each imgHolder, i}
      <button
        onclick={() => onclickCircle(i)}
        class="p-2 bg-linear-to-l from-blue-{300 + i * 100}/30 to-blue-{400 + i * 100}/30 rounded-2xl"
        >{i + 1}</button
      >
    {/each}
  </div>
</div>
