<script lang="ts">
  import anime from "animejs";
  import { breakPointAdd } from "@assets/ts/breakPoint";
  import { onMount } from "svelte";
  import { watch } from "runed";
  import type { entrerCV } from "./type";
  import { progress } from "@assets/ts/progresBar";

  import RightCVScroll from "./RightCVScroll.svelte";
  import HorizontalPoint from "./HorizontalPoint.svelte";
  import Ceppic from "@assets/logo-ceppic-white.svg";
  import Yzel from "@assets/logoRecadre.svg";

  // pdf
  import CV from "@public/pdf/CV.pdf";
  import RefPrépa from "@public/pdf/i0201-se-preparer-a-entrer-en-formation-dans-le-numerique_v2-1.pdf";
  import RefDevWeb from "@public/pdf/i5202-developpeur-web-web-mobile-1.pdf";
  import RefFullStack from "@public/pdf/i6201-concepteur-developpeur-web-full-stack.pdf";
  import PDFbtn from "./PDFbtn.svelte";

  let { heightParent, scrollY }: { heightParent?: number; scrollY?: number } =
    $props();

  const entrer: entrerCV[] = [
    {
      titre: "Formation développeur full-stack",
      centre: { nom: "Ceppic - isneauville", image: Ceppic.src },
      stage: { nom: "en recherche" },
      date: "2025 - 2026",
      niveau: 3,
      pdf: RefFullStack,
      taskStage: [],
    },
    {
      titre: "Formation développeur web et web mobile",
      centre: { nom: "Ceppic - isneauville", image: Ceppic.src },
      stage: { nom: "Yzel conseils", image: Yzel.src },
      date: "2024 - 2025",
      niveau: 2,
      duréeStage: "2 mois",
      pdf: RefDevWeb,
      taskStage: [
        "Gestion des inscriptions et des authentification",
        "Développement d’un service d’envoi de mail polyvalent",
        "Messagerie interne avec pièce joint",
        "Gestion dynamique de rendez-vous entre client et employer",
        "Page d’accueil dynamique au scroll",
        "Développement d’une partie administrateur",
      ],
    },
    {
      titre: "Se préparer au métiers de l'informatique et du numérique",
      centre: { nom: "Ceppic - isneauville", image: Ceppic.src },
      stage: { nom: "Yzel conseils", image: Yzel.src },
      date: "2023 - 2024",
      duréeStage: "2 semaines",
      niveau: 0,
      pdf: RefPrépa,
      taskStage: [
        "Élaboration du designe du site",
        "Création de la page d’accueil et du formualire de contact",
      ],
    },
  ];

  let sectionCV: null | HTMLElement = $state(null);
  let offTopCV: null | number = $state(null);

  let cvPoint: null | HTMLElement[] = $state([]);
  let activPoint: boolean[] = $state([]);
  let indActive = $derived(activPoint.filter((elem) => elem == true).length);
  let hWhiteBar = $state(0);
  let progressHWB: null | HTMLElement = $state(null);
  let activeRight: entrerCV = $state(entrer[0]);

  const progressBar = (point: HTMLElement, reverse: boolean) => {
    const animePoint = {
      targets: point,
      borderColor: indActive == 0 ? "#05df72" : reverse ? "#fffff" : "#05df72",
    };
    const animeBar = {
      targets: progressHWB,
      height: indActive >= 2 ? (indActive - 1) * (hWhiteBar / 2) : 0,
    };
    progress(animePoint, animeBar, reverse);
  };

  const resizeHWB = () => {
    if (cvPoint.length < 2) hWhiteBar = 0;
    hWhiteBar = cvPoint[cvPoint.length - 1].offsetTop - cvPoint[0].offsetTop;
    if (progressHWB)
      progressHWB.style.height =
        (indActive >= 2 ? (indActive - 1) * (hWhiteBar / 2) : 0) + "px";
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
          if (pre != activPoint[i]) {
            progressBar(cvPoint[i], !activPoint[i]);
            activeRight = indActive == 0 ? entrer[0] : entrer[indActive - 1];
          }
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
    <div class="w-full flex justify-between mx-1 my-2">
      <h2 class="text-3xl font-semibold mb-2">CV</h2>
      <PDFbtn link={CV} text="CV complet" />
    </div>
    <div class="flex flex-col h-[80vh] lg:flex-row lg:h-fit">
      <div class="block lg:hidden">
        <HorizontalPoint nb={entrer.length} activeP={indActive} />
      </div>
      <div
        class="hidden rounded-2xl bg-gradient-to-br from-sky-700 to-sky-800 p-2 lg:flex lg:w-1/2 2xl:w-[38%]"
      >
        <div class="relative flex flex-col mt-2 ml-2">
          <div
            class="absolute w-1 left-1.5 bg-white"
            style:height={`${hWhiteBar}px`}
          >
            <div bind:this={progressHWB} class="bg-green-400 w-full"></div>
          </div>
          {#each entrer as elem, i}
            <div
              bind:this={cvPoint[i]}
              class="border-white relative rounded-full border-2 bg-gradient-to-bl from-zinc-400 to-zinc-600 w-4 h-4"
            ></div>
            <div class="relative left-6 -top-[21px] lg:block">
              <h3 class="text-md -mb-1.5">{elem.date}</h3>
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
      <div class="ml-4 w-full h-full lg:w-1/2 2xl:w-[61%]">
        <RightCVScroll {activeRight} currentActiv={indActive} />
      </div>
    </div>
  </div>
</section>
