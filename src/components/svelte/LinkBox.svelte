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

    const { tabLink }: { tabLink: LinkSlice[] } = $props();
</script>

{#each tabLink as elem}
    <div class="flex space-x-2 items-center">
        <p>lien:</p>
        <div class="w-5 h-5"><img src={addSvg(elem.type)} alt="" /></div>
        <a href={elem.link} class="text-orange-700">{elem.link}</a>
    </div>
{/each}
