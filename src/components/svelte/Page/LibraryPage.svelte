<script lang="ts">
  import HeaderNav from "../HeaderNav.svelte";
  import LogoLib from "../LogoLib.svelte"; 
  import CardLibrary from "../CardLibrary.svelte";
  // import module
  import { LinkType, type LibInfo } from "../type";
  import { setSelect } from "../../../assets/ts/nano";
  // import img
  import CarouselGif from "../../../../public/img/CircleCarCut.webm";


  
  let currentSelect: number | null = $state(null);

  let { lib }: { lib: LibInfo[] } = $props();

  const onclickCircle = (num: number) => {
    setSelect(num)
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
      <CardLibrary
        titre={lib[0].titre}
        logo={["svelte","react"]}
        id={0}
        bind:currentSelect
      >
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
  </main>
</div>
