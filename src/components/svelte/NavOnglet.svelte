<script lang="ts">
    import { onMount } from "svelte";
    import Onglet from "./Onglet.svelte";
    import type { OngletFunc } from "./type.ts";
    import { fillSVG } from "../../assets/ts/svgFunc.ts";

    const { tabOnglet }:{ tabOnglet:OngletFunc[]} = $props()
    let navbar:HTMLUListElement;
    let current = $state(0);
    
    const active = (tabElem:Element[],activ:number) => {
        if (tabElem[0] == navbar.children[activ]){
            fillSVG(tabElem[0].getElementsByTagName("svg")[0], "#162456");
        } else {
            fillSVG(tabElem[0].getElementsByTagName("svg")[0], "#2e4bb4");
        }
        if(tabElem.length != 1) return active(tabElem.slice(1),activ)
    }
    
    onMount(() => {
        $effect(() => {
            active(Array.from(navbar.children),current)
        })
    })
</script>

<ul bind:this={navbar} class=" flex relative space-x-8 ease-out duration-150 translate-y-0 z-10 md:translate-y-10">
    {#each tabOnglet as onglet,i}
        <Onglet bind:current={current} key={i} titre={onglet.titre} func={onglet.fn}/>
    {/each}
</ul>