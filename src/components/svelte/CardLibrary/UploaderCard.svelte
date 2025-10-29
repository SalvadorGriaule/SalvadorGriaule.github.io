<script lang="ts">
    import FileUploader from "../FileUploader.svelte";

    let fileDz:File[]|null = $state([]) 
</script>
<div class="w-full h-[50vh] max-h-[50vh] overflow-scroll">
    <FileUploader {fileDz} />
</div>