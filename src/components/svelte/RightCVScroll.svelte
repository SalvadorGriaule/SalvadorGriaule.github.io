<script lang="ts">
  import type { entrerCV } from "./type";
  import anime from "animejs";
  import { Previous } from "runed";
  import EntrerCV from "./EntrerCV.svelte";

  let {
    activeRight,
    currentActiv,
  }: { activeRight: entrerCV | null; currentActiv: number } = $props();
  const previous = new Previous(() => activeRight);
  const previousActiv = new Previous(() => currentActiv);

  let leftDiv: HTMLDivElement | null = $state(null);
  let rightDiv: HTMLDivElement | null = $state(null);

  let activeRightL: entrerCV | null = $state(activeRight);
  let activeRightR: entrerCV | null = $state(activeRight);
  $effect(() => {
    if (previousActiv.current) {
      const sense = previousActiv.current - currentActiv == 1;
      sense ? activeRightL = activeRight : activeRightR = activeRight
      anime({
        targets: rightDiv,
        translateX: sense ? "-250px" : "0px",
        opacity: sense ? 0 : 1,
        duration: 500,
        easing: "linear",
        delay: sense ? 0 : 250
      });
      anime({
        targets: leftDiv,
        translateX: sense ? "0px" : "250px",
        opacity: sense ? 1 : 0,
        duration: 500,
        easing: "linear",
        delay: sense ? 250 : 0
      });
    }
  });
</script>

<div class="w-full h-full relative overflow-hidden">
  {#if activeRight}
    <div bind:this={leftDiv} class="absolute w-full h-full">
      <EntrerCV activeRight={activeRightL} />
    </div>
  {/if}
  <div bind:this={rightDiv} class="absolute w-full h-full">
    <EntrerCV activeRight={activeRightR} />
  </div>
</div>
