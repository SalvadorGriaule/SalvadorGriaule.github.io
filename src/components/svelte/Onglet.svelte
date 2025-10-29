<script lang="ts">
   import { onMount } from "svelte";
   import { fillSVG } from "../../assets/ts/svgFunc.ts";
   import type { MouseEventHandler } from "svelte/elements";
   let svgOnglet: SVGElement;

   let {
      current = $bindable(),
      key,
      func,
      titre,
   }: {
      current: number;
      key: number;
      func: Function;
      titre: string;
   } = $props();

   const click: MouseEventHandler<EventTarget> = (e) => {
      current = key;
      func()
   };

   onMount(() => {
      if (key == 0) {
         fillSVG(svgOnglet, "#162456");
      } else {
         fillSVG(svgOnglet, "#314158");
      }
   });
</script>

<li class="onglet relative flex justify-center items-center">
   <svg
      width="29.728474mm"
      height="8.1771822mm"
      class="scale-x-125"
      viewBox="0 0 29.728474 8.1771822"
      version="1.1"
      id="svg1"
      bind:this={svgOnglet}
      xmlns="http://www.w3.org/2000/svg"
   >
      <sodipodi:namedview
         id="namedview1"
         pagecolor="#ffffff"
         bordercolor="#000000"
         borderopacity="0.25"
         inkscape:showpageshadow="2"
         inkscape:pageopacity="0.0"
         inkscape:pagecheckerboard="0"
         inkscape:deskcolor="#d1d1d1"
         inkscape:document-units="mm"
         inkscape:zoom="10.504938"
         inkscape:cx="398.71724"
         inkscape:cy="161.2099"
         inkscape:window-width="1920"
         inkscape:window-height="935"
         inkscape:window-x="0"
         inkscape:window-y="32"
         inkscape:window-maximized="1"
         inkscape:current-layer="layer1"
      />
      <defs id="defs1">
         <inkscape:path-effect
            effect="fillet_chamfer"
            id="path-effect4"
            is_visible="true"
            lpeversion="1"
            nodesatellites_param="F,0,0,1,0,0,0,1 @ F,0,0,1,0,0,0,1 @ F,0,0,1,0,1.8143619,0,1 @ F,0,0,1,0,1.8143619,0,1"
            radius="0"
            unit="px"
            method="auto"
            mode="F"
            chamfer_steps="1"
            flexible="false"
            use_knot_distance="true"
            apply_no_radius="true"
            apply_with_radius="true"
            hide_knots="false"
         />
      </defs>
      <g id="layer1" transform="translate(-91.502932,-41.120578)">
         <path
            onclick={click}
            id="path2"
            class="duration-150"
            style="fill:#616161;stroke:none;stroke-width:0.0525229;stroke-linecap:round;stroke-linejoin:round"
            d="m 121.23141,49.297758 -29.72848,-0.0025 2.52961,-6.484572 a 2.6549976,2.6549976 145.65836 0 1 2.473744,-1.690109 l 19.739596,0.0021 a 2.6502171,2.6502171 34.402014 0 1 2.47054,1.691743 z"
         />
      </g>
   </svg>

   <p onclick={click} class="absolute text-white">{titre}</p>
</li>
