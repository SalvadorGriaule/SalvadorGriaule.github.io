<script setup lang="ts">
import { ref, type Ref } from 'vue';
import FileUploader from '../FileUploader.vue';

let fileDz: Ref<File[] | null> = ref([])
</script>
<template>
    <div class="w-full h-[50vh] max-h-[50vh] overflow-scroll">
        <FileUploader @file-upload="(e) => {fileDz = e}"/>
    </div>
</template>