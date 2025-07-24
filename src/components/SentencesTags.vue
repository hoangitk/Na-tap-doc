<template>
  <h3 class="text-h6">Câu mẫu (top {{ top }}) / {{ count }}:</h3>
  <div class="q-gutter-sm">
    <template v-for="sentence in sentences"
              :key="sentence">
      <q-btn style="text-transform: none;"
             color="secondary"
             rounded
             :label="sentence"
             @click="onTagClick({ originalEvent: $event, sentence })" />
    </template>
  </div>
</template>

<script setup lang="ts">
import db from 'src/db'

const props = defineProps({
  top: Number
})
const emit = defineEmits(['tag-click'])

const count = ref(0)
const sentences = ref<string[]>([])
const top = computed(() => props.top || 20)

function onTagClick(e: { originalEvent: Event, sentence: string }) {
  emit('tag-click', e)
}

onMounted(async () => {
  const topRows = await db.sentences.limit(top.value).toArray()
  sentences.value = topRows?.map(r => r.sentence)

  count.value = await db.sentences.count()
})
</script>
