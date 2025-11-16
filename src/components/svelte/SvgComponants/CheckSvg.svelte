<script lang="ts">
    import { fillSVG } from "@assets/ts/svgFunc";
    import { onMount } from "svelte";
    let { check, out = $bindable(false) }: { check: boolean; out: boolean } =
        $props();
    let svg: SVGElement;

    onMount(() => {
        fillSVG(svg, "#71717a");
    });

    $effect(() => {
        if (check) {
            fillSVG(svg, "#16a34a");
            out = true;
        } else {
            fillSVG(svg, "#71717a");
            out = false;
        }   
    });
</script>

<svg
    bind:this={svg}
    class="h-full w-full"
    viewBox="0 0 19.999999 19.999999"
    fill="none"
    version="1.1"
    id="svg1"
    sodipodi:docname="check.svg"
    inkscape:version="1.3.2 (091e20e, 2023-11-25, custom)"
    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg"
>
    <defs id="defs1" />
    <sodipodi:namedview
        id="namedview1"
        pagecolor="#ffffff"
        bordercolor="#000000"
        borderopacity="0.25"
        inkscape:showpageshadow="2"
        inkscape:pageopacity="0.0"
        inkscape:pagecheckerboard="0"
        inkscape:deskcolor="#d1d1d1"
        inkscape:export-bgcolor="#ffffff00"
        inkscape:zoom="0.60975004"
        inkscape:cx="367.36365"
        inkscape:cy="246.82245"
        inkscape:window-width="1920"
        inkscape:window-height="1009"
        inkscape:window-x="1912"
        inkscape:window-y="-8"
        inkscape:window-maximized="1"
        inkscape:current-layer="svg1"
    />
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M 8.2405323e-8,10.0492 C 8.2405323e-8,4.5263506 4.4771501,0.04920056 10.000001,0.04920056 c 5.5228,0 10,4.47715004 10,9.99999944 0,5.5228 -4.4772,10 -10,10 C 4.4771501,20.0492 8.2405323e-8,15.572 8.2405323e-8,10.0492 Z M 13.707101,7.3420906 c 0.3905,0.39053 0.3905,1.02371 0,1.41421 l -3.6828,3.6827994 c -0.5657005,0.5657 -1.4829005,0.5657 -2.0486205,0 L 6.2928901,10.7563 c -0.39052,-0.3905 -0.39052,-1.0236994 0,-1.4141994 0.39053,-0.3905 1.02369,-0.3905 1.41422,0 L 9.0000005,10.635 12.292901,7.3420906 c 0.3905,-0.39052 1.0237,-0.39052 1.4142,0 z"
        fill="#323232"
        id="path1"
    />
</svg>
