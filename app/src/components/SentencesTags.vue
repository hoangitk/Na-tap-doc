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
import { useLiveQuery } from 'src/db'

const props = defineProps({
  top: Number
})
const emit = defineEmits(['tag-click'])

const top = computed(() => props.top || 20)

const sentences = useLiveQuery(async (db) => {
  const topRows = await db.sentences.limit(top.value).toArray()
  return topRows.map(r => r.sentence)
})

const count = useLiveQuery((db) => db.sentences.count())

function onTagClick(e: { originalEvent: Event, sentence: string }) {
  emit('tag-click', e)
}

</script>
