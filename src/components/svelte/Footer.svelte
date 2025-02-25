<script lang="ts">
    //import lib
    import Bowser from "bowser";
    // import svelte
    import { onMount } from "svelte";

    let footer = $state<HTMLElement | null>(null);
    let y = $state<number>(0);
    let bowser = $state<Bowser.Parser.Parser | null>(null);

    onMount(() => {
        bowser = Bowser.getParser(window.navigator.userAgent);
        let behaviorBrowser: ScrollBehavior =
        bowser.getEngineName() == "Blink" ? "instant" : "smooth";
        
        document.addEventListener("wheel",(e) => {
            if(window.visualViewport?.height && footer?.getBoundingClientRect().bottom) {
                //e.preventDefault();
                //y = y + e.deltaY * window.visualViewport?.height / footer?.getBoundingClientRect().bottom
                if (0 > footer?.getBoundingClientRect().bottom - window.visualViewport?.height) e.preventDefault()
                console.log(e.deltaY * window.visualViewport?.height / footer?.getBoundingClientRect().bottom)
            }
        })
        window.addEventListener("scroll", () => {
            console.log(y);

            if (
                window.visualViewport?.height &&
                footer?.getBoundingClientRect().bottom &&
                0 >
                    footer?.getBoundingClientRect().bottom -
                        window.visualViewport?.height
            ) {
                window.scroll({
                    left: 0,
                    top:
                        y +
                        (footer?.getBoundingClientRect().bottom -
                            window.visualViewport.height),
                    behavior: behaviorBrowser,
                });
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
    <p>{bowser?.getEngineName()}</p>
</footer>
