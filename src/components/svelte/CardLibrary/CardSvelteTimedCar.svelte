<script lang="ts">
    import TimedCarousel from "@svelte/TimedCarousel.svelte";
    import imgHolder1 from "@assets/imgHolder.jpg";
    import imgHolder2 from "@assets/imgHolder2.jpg";
    import imgHolder3 from "@assets/imgHolder3.jpg";
</script>

<div class="h-full w-full flex justify-center items-center">
    <TimedCarousel
        img={[imgHolder1, imgHolder2, imgHolder3]}
        alt={["Img1", "Img2", "Img3"]}
    />
</div>
