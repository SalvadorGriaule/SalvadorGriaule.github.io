<script lang="ts">
    import Diff2Img from "@svelte/Diff2Img.svelte";
    import ImgHolder1 from "@assets/imgHolder.jpg";
    import ImgHolder2 from "@assets/imgHolder2.jpg";
</script>

<div class="flex justify-center items-center w-full h-[50vh]">
    <div class="overflow-hidden w-190 h-full rounded-2xl">
        <Diff2Img img={[ImgHolder1, ImgHolder2]} alt={["test1", "test2"]} />
    </div>
</div>
