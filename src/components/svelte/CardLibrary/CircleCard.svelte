<script lang="ts">
  import CircleCarousel from "../CircleCarousel.svelte";

  import ImgHolder1 from "../../../../public/img/imgHolder.jpg";
  import ImgHolder2 from "../../../../public/img/imgHolder2.jpg";
  import ImgHolder3 from "../../../../public/img/imgHolder3.jpg";

  const imgHolder = [ImgHolder1, ImgHolder2, ImgHolder3];

  let currentImg = $state(0);

  const onclickCircle = (num:number) => {
    currentImg = num
  }
</script>

<CircleCarousel urlArr={imgHolder} {currentImg} dim={500} />
<div class="mt-4 flex space-x-2 justify-center">
  <button
    onclick={() => onclickCircle(0)}
    class="p-2 bg-linear-to-l from-blue-300/30 to-blue-400/30 rounded-2xl"
    >1</button
  ><button
    onclick={() => onclickCircle(1)}
    class="p-2 bg-linear-to-l from-blue-400/30 to-blue-500/30 rounded-2xl"
    >2</button
  >
  <button
    onclick={() => onclickCircle(2)}
    class="p-2 bg-linear-to-l from-blue-500/30 to-blue-600/30 rounded-2xl"
    >3</button
  >
</div>
