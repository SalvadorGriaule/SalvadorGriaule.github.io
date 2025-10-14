<script lang="ts">
  import LogoLib from "./LogoLib.svelte";
  import LinkBox from "./LinkBox.svelte";
  import type { LinkSlice } from "./type";

  let {
    titre,
    description,
    fw,
    linkSlice,
    children
  }: {
    titre: string;
    description: string;
    fw: "svelte" | "vuejs";
    linkSlice: LinkSlice[];
    children: any
  } = $props();

</script>

<section
  class="h-fit bg-linear-to-br from-neutral-300/30 to-neutral-500/30 rounded-md m-2 p-2 backdrop-blur-md"
>
  <h3 class="text-2xl font-semibold">{titre}</h3>
  <div
    class="flex justify-center items-center w-full bg-linear-to-br from-neutral-900/70 to-neutral-950/30 rounded-md p-10"
  >
    <div class="m-2">
        {@render children()}
    </div>
  </div>
  <div class="flex items-center">
    <p class="text-xl w-3/5">
      {description}
    </p>
    <div
      class="p-2 mt-2 w-2/5 flex flex-col items-start border-s-2 border-black"
    >
      <h5 class="text-2xl">Compatible avec</h5>
      <div class="flex items-center my-3">
        <LogoLib name={fw} mode="no-link" classL={"h-[2.5em] mx-2.5"} />
        <LinkBox tabLink={linkSlice} spanLink={false} />
      </div>
    </div>
  </div>
</section>
