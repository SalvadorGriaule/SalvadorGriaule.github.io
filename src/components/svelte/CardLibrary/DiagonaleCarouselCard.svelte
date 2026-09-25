<script lang="ts">
    import DiagonalCarousel from "@svelte/DiagonalCarousel.svelte";

    import ImgHolder1 from "@assets/imgHolder.jpg";
    import ImgHolder2 from "@assets/imgHolder2.jpg";
    import ImgHolder3 from "@assets/imgHolder3.jpg";

    const imgHolder = [ImgHolder1, ImgHolder2, ImgHolder3];
</script>

<div class="flex justify-center items-center flex-col">
    <DiagonalCarousel slides={imgHolder} />
</div>
