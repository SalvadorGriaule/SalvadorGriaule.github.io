<script lang="ts">
  import HeaderNav from "../HeaderNav.svelte";
  import LogoLib from "../LogoLib.svelte";
  import CircleCarousel from "../CircleCarousel.svelte";
  import { LinkType } from "../type";
  import ShowCardLibrary from "../ShowCardLibrary.svelte";
  import CardLibrary from "../CardLibrary.svelte";

  // import img
  import ImgHolder1 from "../../../../public/img/imgHolder.jpg";
  import ImgHolder2 from "../../../../public/img/imgHolder2.jpg";
  import ImgHolder3 from "../../../../public/img/imgHolder3.jpg";
  import CarouselGif from "../../../../public/img/CircleCarCut.webm";

  const imgHolder = [ImgHolder1, ImgHolder2, ImgHolder3];
  let currentImg = $state(0);
  const lib = [
    {
      titre: "Carousel en cercle",
      logo: ["svelte"],
      description:
        "Le composant gère automatiquement le passage d'une image à l'autre avec un effet de fondu circulaire, en ajustant les dimensions et la position des images.",
    },{
      titre: "Uploader en Drag and Drop",
      logo: ["svelte","vuejs"]
      
    }
  ];
  let currentSelect: number | null = $state(null);
  
  const onclickCircle = (num: number) => {
    currentImg = num;
  };
</script>

<div class="bg-linear-to-br from-slate-600 to-slate-900">
  <HeaderNav />
  <main class="mx-20 mt-10 flex flex-col">
    <section class="w-full flex justify-center">
      <div
        class="flex space-x-2 bg-linear-to-br from-neutral-300/30 to-neutral-500/30 rounded-md m-2 backdrop-blur-md"
      >
        <LogoLib name="svelte" mode="no-link" />
        <LogoLib name="vuejs" mode="no-link" />
      </div>
    </section>
    <section class="flex">
      <CardLibrary titre={lib[0].titre} logo={"svelte"} id={0} bind:currentSelect>
        <video
            class="w-44"
            src={CarouselGif}
            autoplay
            loop
            muted
            disablepictureinpicture><track kind="captions" /></video
          >
      </CardLibrary>
    </section>
    {#if currentSelect != null}
      <ShowCardLibrary
        titre={lib[0].titre}
        description={lib[0].description}
        fw={"svelte"}
        linkSlice={[
          {
            type: LinkType.GitHub,
            link: "https://github.com/SalvadorGriaule/CarouselCircle",
          },
        ]}
      >
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
      </ShowCardLibrary>
    {/if}
  </main>
</div>
