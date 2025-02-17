<script lang="ts">
    import { onMount } from "svelte";
    let footer = $state<HTMLElement | null>(null);
    let y = $state<number>(0);

    onMount(() => {
        window.addEventListener("scroll", (e) => {
            console.log(y);

            if (
                window.visualViewport?.height &&
                footer?.getBoundingClientRect().bottom &&
                0 >
                    footer?.getBoundingClientRect().bottom -
                        window.visualViewport?.height
            ) {
                e.preventDefault();
                window.scroll({ left: 0, top: y + (footer?.getBoundingClientRect().bottom - window.visualViewport.height), behavior: "smooth" });
            }
        });
    });
</script>

<svelte:window bind:scrollY={y} />
<footer
    bind:this={footer}
    class="h-24 w-full bg-slate-900 border-t-1 border-zinc-500 text-white"
    style="transform: translateY({-1.1 * y}px)"
>
    <p>test</p>
</footer>
