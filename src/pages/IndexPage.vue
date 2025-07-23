<template>
  <q-page>
    <q-card class="q-ma-md">
      <q-card-section>
        <h1 class="text-h4 text-orange-9">Bé tập đọc Tiếng Việt</h1>
        <p>Nhập đoạn văn để bé tập học cách tách âm tiết!</p>

        <q-input v-model="inputText"
                 type="textarea"
                 placeholder="Nhập câu, ví dụ: Na rất thích Tiếng Việt."
                 outlined
                 class="input q-mb-md"
                 :rows="3" />

        <div class="row justify-between q-gutter-y-md">
          <div class="col-auto">
            <div class="items-center q-gutter-sm">
              <q-btn label="Câu ngẫu nhiên"
                     color="primary"
                     @click="onRandomSampleClick" />
              <q-btn label="Xóa đoạn văn"
                     @click="inputText = ''" />
            </div>
          </div>
          <div class="col-auto">
            <div class="row items-center q-gutter-sm">
              <q-btn label="-"
                     size="small"
                     @click="fontSize = Math.max(fontSize * 0.9, 1)" />
              <div class="text-caption">Kích thước chữ: {{ fontSize.toFixed(1) }}x</div>
              <q-btn label="+"
                     size="small"
                     @click="fontSize = Math.min(fontSize * 1.1, 3)" />
            </div>
          </div>
        </div>

        <q-card-section>
          <highlight-words :content="inputText"
                           :fontSize></highlight-words>
        </q-card-section>

        <q-card-section>
          <h3 class="text-h6">Câu mẫu (top 22):</h3>
          <div class="q-gutter-sm">
            <template v-for="sentence in sampleSentences"
                      :key="sentence">
              <q-btn style="text-transform: none;"
                     color="secondary"
                     rounded
                     :label="sentence"
                     @click="setSampleText(sentence)" />
            </template>
          </div>
        </q-card-section>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { QBtn } from 'quasar'
import db from 'src/db'
import HighlightWords from 'src/components/HighlightWords.vue'

const inputText = ref('')

const fontSize = ref(2)

function setSampleText(text: string = '') {
  inputText.value = text
}

const sampleSentences = ref<string[]>([])

async function onRandomSampleClick() {
  const count = await db.sentences.count()
  const randIdx = Math.random() * count
  const [randSentence] = await db.sentences
    .offset(Math.max(1, randIdx))
    .limit(1)
    .toArray()

  setSampleText(randSentence?.sentence)
}

async function loadSamples() {
  const topRows = await db.sentences.limit(22).toArray()
  sampleSentences.value = topRows?.map(r => r.sentence)
}

// const SaveBtn = (props: object) => {
//   const loading = ref(false)
//   const disable = computed(() => !inputText.value || loading.value)
//   const onClick = async () => {
//     const sentence = inputText.value?.trim()
//     if (sentence) {
//       try {
//         loading.value = true
//         await db.sentences.put({ sentence })
//       } finally {
//         loading.value = false
//       }
//     }
//   }
//   return h(QBtn, { ...props, disable: disable.value, onClick })
// }

onMounted(() => {
  void loadSamples()
})

</script>
