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

  let refDiv: HTMLDivElement | null = $state(null);
  let supportDiv: HTMLDivElement | null = $state(null);
  let sense = $state(false);
  const sensePrevious = new Previous(() => sense);

  let activeRightR: entrerCV | null = $state(activeRight);
  let activeRightS: entrerCV | null = $state(activeRight);
  $effect(() => {
    if (
      previousActiv.current &&
      activeRight?.titre != previous.current?.titre
    ) {
      sense = previousActiv.current - currentActiv == 1;

      if (sense) {
        activeRightR = activeRight;
        activeRightS = previous.current;
      } else {
        activeRightS = activeRight;
        activeRightR = previous.current;
      }

      if (supportDiv && refDiv && sensePrevious.current != sense) {
        supportDiv.style.transform = `translateX(${!sense ? "-250" : "0"}px) scale(${!sense ? "0.8" : "1"}`;
        supportDiv.style.opacity = `${sense ? "1" : "0"}`;
        refDiv.style.transform = `translateX(${sense ? "250" : "0"}px) scale(${sense ? "0.8" : "1"})`;
        refDiv.style.opacity = `${!sense ? "1" : "0"}`;
      }
      anime({
        targets: supportDiv,
        translateX: sense ? "-250px" : "0px",
        opacity: sense ? 0 : 1,
        scale: sense ? 0.8 : 1,
        duration: 500,
        easing: "linear",
        delay: sense ? 0 : 320,
      });
      anime({
        targets: refDiv,
        translateX: sense ? "0px" : "250px",
        opacity: sense ? 1 : 0,
        scale: sense ? 1 : 0.8,
        duration: 500,
        easing: "linear",
        delay: sense ? 320 : 0,
      });
    }
  });
</script>

<div class="w-full h-full relative overflow-hidden">
  {#if activeRight}
    <div bind:this={refDiv} class="absolute w-full h-full">
      <EntrerCV activeRight={activeRightR} />
    </div>
  {/if}
  <div bind:this={supportDiv} class="absolute w-full h-full">
    <EntrerCV activeRight={activeRightS} />
  </div>
</div>
