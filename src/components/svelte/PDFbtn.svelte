<script lang="ts">
    let { link, text }: { link: string | undefined; text?: string } = $props();
    import PDFFile from "@assets/Pdf-file.svg";
</script>

<a class="text-white font-semibold bg-red-600 p-1 rounded-4xl" href={link}
    ><div class="flex">
        {#if link}
            <div class="w-8 p-1 bg-white rounded-full">
                <img src={PDFFile.src} alt="" />
            </div>
        {:else}
            <p>Link missing</p>
        {/if}
        <p class="mx-1 font-bold">{text ? text : "PDF"}</p>
    </div>
</a>
