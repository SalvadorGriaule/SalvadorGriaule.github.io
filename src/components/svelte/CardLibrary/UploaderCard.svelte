<script lang="ts">
  import FileUploader from "../FileUploader.svelte";
  import DefaultImg from "../../../assets/imgHolder.jpg";

  let fileDz: File[] | null = $state([]);
  let defaultImage = $state(false);

  const onclick = () => {
    defaultImage = !defaultImage;
  };

</script>

<div class="w-full flex flex-col items-center space-y-2">
  <button class="p-2 rounded-2xl text-xl bg-gray-400" {onclick}> 
    Mettre une image par default : <span class="{defaultImage ? 'text-green-700' : "text-red-700"} font-bold">{defaultImage ? "Oui" : "Non"}</span>
  </button>
  <div class="w-full h-[50vh] max-h-[50vh] overflow-scroll">
    <FileUploader {fileDz} defaultVal={defaultImage ? DefaultImg.src : undefined}/>
  </div>
</div>
