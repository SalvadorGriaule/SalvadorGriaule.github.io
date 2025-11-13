<script setup lang="ts">
import { ref, type Ref } from 'vue';
import FileUploader from '../FileUploader.vue';
import DefaultImg from '../../../assets/imgHolder.jpg'

let fileDz: Ref<File[] | null> = ref([]);
let defaultImage: Ref<boolean> = ref(false);

const onclick = () => {
    defaultImage.value = !defaultImage.value
}

</script>
<template>
    <div class="w-full flex flex-col items-center space-y-2">
        <button @click="onclick" class="p-2 rounded-2xl text-xl bg-gray-400">Mettre une image par default : <span
                class="font-bold" :class="[defaultImage ? 'text-green-700' : 'text-red-700']">{{ defaultImage ? "Oui" :
                "Non" }}</span></button>
        <div class="w-full h-[50vh] max-h-[50vh] flex justify-center overflow-scroll">
            <FileUploader @file-upload="(e) => { fileDz = e }" :default-val="defaultImage ? DefaultImg.src : null" />
        </div>
    </div>
</template>