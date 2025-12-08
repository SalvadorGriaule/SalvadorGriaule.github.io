<script lang="ts">
  import GitHubSvg from "../../assets/github.svg";
  import PlaySvg from "../../assets/controller.svg";
  import { LinkType, type LinkSlice } from "./type.ts";

  const addSvg = (type: LinkType): string => {
    switch (type) {
      case LinkType.GitHub:
        return GitHubSvg.src;
      case LinkType.PlayIt:
        return PlaySvg.src;
    }
  };

  const {
    tabLink,
    spanLink = true,
  }: { tabLink: LinkSlice[]; spanLink?: boolean } = $props();
</script>


<div class="flex items-start space-x-2">
  {#if spanLink}
    <span class="pt-1.5">Lien:</span>
  {/if}
  <div class="bg-blue-950 p-2 space-y-1.5 rounded-lg">
    {#each tabLink as elem}
      <div class="flex space-x-2 items-center">
        <div class="w-5 h-5">
          <img src={addSvg(elem.type)} alt="" />
        </div>
        <a href={elem.link} class="text-white">{elem.type == LinkType.PlayIt ? "Play it" : elem.link}</a>
      </div>
    {/each}
  </div>
</div>
