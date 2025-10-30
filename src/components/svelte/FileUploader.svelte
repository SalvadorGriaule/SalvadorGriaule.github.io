<script lang="ts">
  import { onMount } from "svelte";
  import DownloadSvg from "../../assets/download.svg";
  import { colorRandomizerByChildren } from "../../assets/ts/colorRandomizer";
  import Dropzone from "dropzone";

  type FileType = "image" | "audio" | "vidéo" | "text";

  let {
    type = "all",
    defaultVal,
    souple = true,
    maxFile = 1,
    fileDz = $bindable([]),
  }: {
    type?: "all" | FileType[];
    souple?: boolean;
    defaultVal?: string;
    maxFile?: number;
    fileDz: File[] | null;
  } = $props();

  let preview: HTMLDivElement;

  let standBy: HTMLDivElement;

  let fileDiv = $state();

  const testFile = (type: FileType[]) => {
    let res = "";
    for (let elem of type) {
      switch (elem) {
        case "image":
          res += "image/*";
          break;
        case "audio":
          res += res.length > 0 ? ",audio/*" : "audio/*";
          break;
        case "vidéo":
          res += res.length > 0 ? ",vidéo/*" : "vidéo/*";
          break;
        case "text":
          res +=
            res.length > 0
              ? ",.doc,.docx,.odt,.rtf,.txt,.pages"
              : ".doc,.docx,.odt,.rtf,.txt,.pages";
      }
    }
    return res;
  };

  const firstMaj = (str: string) => {
    return str.replace(str[0], str[0].toLocaleUpperCase());
  };

  const upload: Function = (form_data: FormData) => {
    if (fileDz != null && fileDz?.length > 0) {
      for (let i = 0; i < fileDz?.length; i++) {
        form_data.append(
          (Array.isArray(type) && type.length == 1
            ? firstMaj(type[0])
            : "File") + `${i}`,
          fileDz[i]
        );
      }
    }
  };

  let feedback: HTMLDivElement;
  let fullComponants: HTMLDivElement;

  let dOheigh = $state(0);
  let dOwidth = $state(0);
  let typeMode = "";

  const dragEvent = (bool: boolean) => {
    feedback.style.height = bool ? `${dOheigh}px` : "0px";
    feedback.style.width = bool ? `${dOwidth}px` : "0px";
  };

  onMount(() => {
    if (Array.isArray(type)) typeMode = testFile(type);

    const dropzone = new Dropzone("#dropImg", {
      maxFiles: maxFile,
      uploadMultiple: true,
      url: "http://127.0.0.1:8123/media/static/img/",
      autoProcessQueue: false,
      previewTemplate: preview.innerHTML,
      acceptedFiles: `${typeMode}`,
      clickable: ".clickab",
    });
    dropzone.on("addedfile", (file: File) => {
      standBy.classList.remove("flex");
      standBy.classList.add("hidden");
      fullComponants.classList.add("flex-col");
      Array.isArray(fileDz) ? fileDz.push(file) : (fileDz = [file]);
      fileDiv = fullComponants.querySelectorAll(".template")[1]?.clientHeight;
      // (
      //     fullComponants.parentElement,
      //     fullComponants.querySelectorAll(".template")[1],
      // );
      if (typeof fileDiv == "number" && fileDiv * fileDz.length > 144) {
        fullComponants.parentElement.parentElement.parentElement.style.height = `${fullComponants.parentElement.parentElement.parentElement.clientHeight + (fileDiv + 4)}px`;
        fullComponants.parentElement.parentElement.style.height = `${fileDiv * fileDz.length + 8}px`;
        fullComponants.parentElement.style.height = `${fileDiv * fileDz.length + 8}px`;
      }
      colorRandomizerByChildren(fullComponants.children);
    });
    dropzone.on("removedfile", (file: File) => {
      fileDz = fileDz.filter((elem) => elem.name != file.name);
      if (fileDz.length == 0) {
        dragEvent(false);
        standBy.classList.add("flex");
        standBy.classList.remove("hidden");
        fullComponants.classList.remove("flex-col");
      }
      if (typeof fileDiv == "number" && fileDiv * fileDz.length > 144) {
        fullComponants.parentElement.parentElement.parentElement.style.height = `${fullComponants.parentElement.parentElement.parentElement.clientHeight - (fileDiv + 4)}px`;
        fullComponants.parentElement.parentElement.style.height = `${fileDiv * fileDz.length}px`;
        fullComponants.parentElement.style.height = `${fileDiv * fileDz.length}px`;
      }
    });
    dropzone.on("dragenter", (e: DragEvent) => {
      if (fullComponants == e.target) dragEvent(true);
    });
    dropzone.on("dragleave", (e: DragEvent) => {
      if (feedback == e.target) dragEvent(false);
    });

    document.addEventListener("formdata", (e) => {
      if (fileDz != undefined) upload(e.formData);
    });
    $inspect(preview.children);
  });
</script>

<div
  class="{souple
    ? 'w-full'
    : 'w-11/12'} flex justify-center items-center rounded-lg overflow-hidden h-full"
  bind:clientWidth={dOwidth}
  bind:clientHeight={dOheigh}
>
  <div class="w-full h-full flex justify-center items-center">
    <div
      class="clickab relative flex justify-center items-center bg-gray-300 w-full h-full"
      id="dropImg"
      bind:this={fullComponants}
    >
      <div
        id="standBy"
        class="clickab flex-row flex justify-center items-center w-11/12 rounded-md p-2 border-blue-500 border-2 border-dashed h-11/12"
        bind:this={standBy}
      >
        <div class="flex justify-center items-center flex-col">
          <div
            class="w-1/3 clickab lg:w-1/6 {defaultVal != undefined
              ? 'hidden'
              : 'block'}"
          >
            <img src={DownloadSvg.src} alt="" />
          </div>
          <div
            class="w-1/4 clickab my-2 {defaultVal != undefined
              ? 'block'
              : 'hidden'}"
          >
            <img src="/image/prestation/{defaultVal}" alt="" />
          </div>
          <p class="text-blue-500 ms-4 text-xl lg:text-base lg:ms-0">
            insérer un fichier {type != "all" && type != undefined
              ? `${type}`
              : ""} ici
          </p>
        </div>
        <div
          bind:this={feedback}
          class="clickab absolute top-0 bg-gray-500/50"
        ></div>
      </div>
      <div
        bind:this={preview}
        class="dropzone-previews hidden flex-col"
        id="preview "
      >
        <div
          class="template flex justify-center items-center space-x-2 lg:w-3/5 p-2 rounded-xl"
        >
          <div class="w-1/6">
            <img class="w-full" alt="" data-dz-thumbnail />
          </div>
          <div class="flex flex-col items-start">
            <div class="flex space-x-1">
              <p data-dz-name></p>
              <p data-dz-size></p>
              <p data-dz-errormessage></p>
            </div>
            <div>
              <div
                class="progress progress-striped active"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="0"
              >
                <div
                  class="progress-bar progress-bar-success"
                  style="width:0%"
                ></div>
              </div>
            </div>
            <div class="flex justify-center space-x-2">
              <button
                class="bg-red-700 text-white rounded-md mt-1 py-1 px-2 cursor-pointer w-fit hover:bg-white hover:text-red-700"
                data-dz-remove>Delete</button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
