<script lang="ts">
  import GitHubSvg from "@assets/github.svg";
  import PlaySvg from "@assets/controller.svg";
  import Gear from "@assets/gear.svg";
  import { LinkType, type LinkSlice } from "./type.ts";

  const addSvg = (type: LinkType): string => {
    switch (type) {
      case LinkType.GitHub:
        return GitHubSvg.src;
      case LinkType.PlayIt:
        return PlaySvg.src;
      case LinkType.Soon:
        return Gear.src;
    }
  };

  const textLink = (ls: LinkSlice): { text: string; link: string } => {
    switch (ls.type) {
      case LinkType.PlayIt:
        return { text: "Play it", link: ls.link };
      case LinkType.Soon:
        return { text: "Bientôt disponible", link: "" };
      case LinkType.GitHub:
        return { text: ls.link, link: ls.link };
    }
  };

  const formatTabLink = (tabLink: LinkSlice[]) => {
    let res = [];
    for (let elem of tabLink) {
      res.push({ svg: addSvg(elem.type), link: textLink(elem) });
    }
    return res;
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
    {#each formatTabLink(tabLink) as elem}
      <div class="flex space-x-2 items-center">
        <div class="w-5 h-5">
          <img src={elem.svg} alt="" />
        </div>
        {#if elem.link.link == ""}
          <p class="text-white">{elem.link.text}</p>
        {:else}
          <a href={elem.link.link} class="text-white">{elem.link.text}</a>
        {/if}
      </div>
    {/each}
  </div>
</div>
