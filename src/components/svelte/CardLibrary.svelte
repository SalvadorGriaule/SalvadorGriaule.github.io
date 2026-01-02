<script lang="ts">
  import { testURL } from "@assets/ts/misc";
  import LogoLib from "./LogoLib.svelte";
  import { currentSelect } from "@assets/ts/nano";

  let {
    titre,
    logo,
    media,
    id,
  }: {
    titre: string;
    logo: ("svelte" | "vuejs" | "react")[];
    id: number;
    media: { type: "image" | "vidéo"; link: string; widthMedia?: number };
  } = $props();

  const clickLib = (num: number) => {
    currentSelect.get() == num
      ? currentSelect.set(null)
      : currentSelect.set(num);
    
    if (window && testURL(window.location.host)) {
      localStorage.setItem("HTLSelect", String(num));
      window.location.replace(`http://${window.location.host}/library`);
    }
  };
</script>

<button
  onclick={() => {
    clickLib(id);
  }}
  class="p-2 w-full bg-linear-to-br from-neutral-300/30 to-neutral-500/30 rounded-md m-2 backdrop-blur-md md:w-[45%] xl:w-[23.5%]"
>
  <div class="flex justify-between items-center">
    <h3 class="text-xl font-semibold truncate md:text-2xl">{titre}</h3>
    <div class="w-18 flex justify-end">
      {#each logo as elem}
        <LogoLib
          name={elem}
          mode="no-link"
          classL={"h-[1.75em] w-[2.5em] px-1"}
        />
      {/each}
    </div>
  </div>
  <div
    class="flex justify-center items-center h-48 my-2 bg-linear-to-br from-neutral-900/70 to-neutral-950/30 rounded-md p-2"
  >
    {#if media.type == "image"}
      <img class="w-[275px] h-fit" src={media.link} alt={titre} />
    {:else}
      <video
        style:width={`${media.widthMedia}rem`}
        src={media.link}
        autoplay
        loop
        muted
        disablepictureinpicture><track kind="captions" /></video
      >
    {/if}
  </div>
</button>
