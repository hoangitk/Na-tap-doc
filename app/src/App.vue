<template>
  <router-view />
</template>

<script setup lang="ts">
import { initSampleSentences } from './services/sentenceService'

onMounted(() => {
  void initSampleSentences()

})

</script>
