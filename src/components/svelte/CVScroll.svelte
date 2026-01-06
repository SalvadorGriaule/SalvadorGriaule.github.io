<script lang="ts">
  import Ceppic from "@assets/logo-ceppic-white.svg";
  import Yzel from "@assets/logoRecadre.svg";
  import { breakPointAdd } from "@assets/ts/breakPoint";
  import anime from "animejs";
  import { onMount } from "svelte";
  import { watch } from "runed";

  type NameAndImg = { nom: string; image?: string };

  let { heightParent, scrollY }: { heightParent?: number; scrollY?: number } =
    $props();

  const entrer: { titre: string; centre: NameAndImg; stage: NameAndImg }[] = [
    {
      titre: "Formation développeur full-stack (niveau bac + 3)",
      centre: { nom: "Ceppic - isneauville", image: Ceppic.src },
      stage: { nom: "en recherche" },
    },
    {
      titre: "Formation développeur web et web mobile (niveau bac + 2)",
      centre: { nom: "Ceppic - isneauville", image: Ceppic.src },
      stage: { nom: "Yzel conseils", image: Yzel.src },
    },
    {
      titre: "Se préparer au métiers de l'informatique et du numérique",
      centre: { nom: "Ceppic - isneauville", image: Ceppic.src },
      stage: { nom: "Yzel conseils", image: Yzel.src },
    },
  ];

  let sectionCV: null | HTMLElement = $state(null);
  let offTopCV: null | number = $state(null);

  let cvPoint: null | HTMLElement[] = $state([]);
  let activPoint: boolean[] = $state([]);
  let indActive = $derived(activPoint.filter((elem) => elem == true).length);
  let hWhiteBar = $state(0);
  let progressHWB: null | HTMLElement = $state(null);

  const progress = (point: HTMLElement, reverse: boolean) => {
    const animePoint = {
      targets: point,
      borderColor: reverse ? '#fffff' : '#05df72',
    };
    const animeBar = {
      targets: progressHWB,
      height: indActive >= 2 ? (indActive - 1) * (hWhiteBar / 2) : 0,
    };
    let animeSense = reverse
      ? [animePoint, animeBar]
      : [animeBar, animePoint];
      console.log(animeSense);
    let tl = anime
      .timeline({
        easing: "easeOutQuint",
        duration:600
      })
      .add(animeSense[0])
      .add(animeSense[1], reverse ? "-=250" : "+=200");
  };

  const resizeHWB = () => {
    if (cvPoint.length < 2) hWhiteBar = 0;
    hWhiteBar = cvPoint[cvPoint.length - 1].offsetTop - cvPoint[0].offsetTop;
  };

  onMount(() => {
    activPoint = Array(cvPoint.length).fill(false);
    breakPointAdd(resizeHWB);
  });

  watch(
    () => scrollY,
    () => {
      if (sectionCV && heightParent) {
        offTopCV = sectionCV.offsetTop;
        for (let i = 0; i < cvPoint.length; i++) {
          const pre = activPoint[i];
          activPoint[i] =
            (i * heightParent) / 3.5 < offTopCV - 32 ? true : false;
          if (pre != activPoint[i]) progress(cvPoint[i], !activPoint[i]);
        }
      }
    },
  );
</script>

<section
  bind:this={sectionCV}
  class="w-full sticky top-16 flex justify-center mt-8"
>
  <div
    class="w-11/12 flex flex-col bg-linear-to-br from-neutral-300/30 to-neutral-500/30 rounded-2xl p-2"
  >
    <h2 class="text-3xl font-semibold mb-2">CV</h2>
    <div
      class="flex rounded-2xl bg-gradient-to-br from-sky-700 to-sky-800 p-2 lg:w-1/2 2xl:w-[38%]"
    >
      <div class="relative flex flex-col mt-2 ml-2">
        <div
          class="absolute w-1 left-1.5 bg-white"
          style:height={`${hWhiteBar}px`}
        >
          <div
            bind:this={progressHWB}
            class="bg-green-400 w-full duration-300"
          ></div>
        </div>
        {#each entrer as elem, i}
          <div
            bind:this={cvPoint[i]}
            class="border-white relative rounded-full border-2 bg-gradient-to-bl from-zinc-400 to-zinc-600 w-4 h-4"
          ></div>
          <div class="relative left-6 -top-6">
            <h2 class="font-semibold text-xl">
              {elem.titre}
            </h2>
            <div class="flex space-x-2">
              <div class="flex flex-col items-center">
                <h3 class="font-semibold">centre de formation</h3>
                <div
                  class="flex flex-col h-32 w-44 items-center bg-gradient-to-br from-zinc-500/80 to-zinc-700/80 rounded-2xl p-2"
                >
                  <h3 class="text-white">{elem.centre.nom}</h3>
                  <div class="w-24 h-24 flex justify-center items-center">
                    <img src={elem.centre.image} alt={elem.centre.nom} />
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-center">
                <h3 class="font-semibold">stage</h3>
                <div
                  class="flex flex-col h-32 w-44 items-center bg-gradient-to-br from-zinc-500/80 to-zinc-700/80 rounded-2xl p-2 {elem
                    .stage.image
                    ? ''
                    : 'justify-center'}"
                >
                  <div>
                    {#if elem.stage.image}
                      <h3 class="text-white">{elem.stage.nom}</h3>
                      <div class="w-24 h-24 flex justify-center items-center">
                        <img src={elem.stage.image} alt={elem.stage.nom} />
                      </div>
                    {:else}
                      <h3 class="text-white">{elem.stage.nom}</h3>
                    {/if}
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
