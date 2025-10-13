<script lang="ts">
  import HeaderNav from "../HeaderNav.svelte";
  import LogoLib from "../LogoLib.svelte";
  import CircleCarousel from "../CircleCarousel.svelte";

  // import img
  import ImgHolder1 from "../../../../public/img/imgHolder.jpg";
  import ImgHolder2 from "../../../../public/img/imgHolder2.jpg";
  import ImgHolder3 from "../../../../public/img/imgHolder3.jpg";

  const imgHolder = [ImgHolder1, ImgHolder2, ImgHolder3];
  let currentImg = $state(0);
  const lib = [{ titre: "Carousel en cercle", logo: ["svelte"] }];
  let selectLib: number | null = $state(null);
  const clickLib = (num: number) => {
    selectLib == num ? (selectLib = null) : (selectLib = num);
  };

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
      <button
        onclick={() => {
          clickLib(0);
        }}
        class="p-2 w-72 bg-linear-to-br from-neutral-300/30 to-neutral-500/30 rounded-md m-2 backdrop-blur-md"
      >
        <h3 class="text-2xl font-semibold">{lib[0].titre}</h3>
        <div class="w-20">
          <LogoLib name={lib[0].logo[0]} mode="no-link" />
        </div>
      </button>
    </section>
    {#if selectLib != null}
      <section
        class="h-fit bg-linear-to-br from-neutral-300/30 to-neutral-500/30 rounded-md m-2 p-2 backdrop-blur-md"
      >
        <h3 class="text-2xl font-semibold">{lib[selectLib].titre}</h3>
        <div class="flex justify-center items-center">
          <div>
            <CircleCarousel urlArr={imgHolder} {currentImg} dim={500} />
            <div class="flex space-x-2 justify-center">
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
          </div>
        </div>
        <div class="flex">
          <p>description</p>
          <div class="w-20">
            <LogoLib name={lib[selectLib].logo[0]} mode="no-link" />
          </div>
        </div>
      </section>
    {/if}
  </main>
</div>
