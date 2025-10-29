<script lang="ts">
  import { onMount } from "svelte";

  let { post }: { post: { content: string; date: string; titre: string } } =
    $props();

  let contentDiv: null | HTMLDivElement = $state(null);

  const date = new Date(post.date);
  const stylization = (
    targetElem: HTMLElement,
    tabRule: [string, string][]
  ) => {
    targetElem.style.setProperty(tabRule[0][0], tabRule[0][1]);

    if (tabRule.length > 1) return stylization(targetElem, tabRule.slice(1));
  };

  const stylizing = (
    targetElem: HTMLElement[],
    css: Record<string, string>
  ) => {
    if (targetElem[0]) stylization(targetElem[0], Object.entries(css));
    if (targetElem.length > 1) return stylizing(targetElem.slice(1), css);
  };

  onMount(() => {
    if (contentDiv) {
      const h3 = contentDiv.querySelectorAll("h3");
      const pImage = contentDiv.querySelectorAll("p:has(img)");

      const h3CSS = {
        "font-size": "2.15rem",
        "font-weight": "600",
      };
      stylizing(Array.from(h3), h3CSS);
    }
  });
</script>

<article>
  <h2 class="text-white text-5xl font-semibold p-2">
    {post.titre}
  </h2>
  <h4 class="text-white ps-2">{date.toLocaleDateString()}</h4>
  <div bind:this={contentDiv} id="postContent" class="">
    {@html post.content}
  </div>
</article>

<style>
  #postContent {
    padding: 10px;
    color: white;
  }
</style>
