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
                     @click="onRandomSampleClick()" />
              <q-btn label="Xóa đoạn văn"
                     @click="inputText = ''" />
              <q-btn-dropdown color="purple"
                              split
                              label="Bài học ngẫu nhiên"
                              @click="onRandomLessonClick()">
                <q-list>
                  <template v-for="({ id, title }) in lessonTitleList"
                            :key="id">
                    <q-item clickable
                            v-close-popup
                            @click="onLessonClick(id)">
                      <q-item-section>
                        <q-item-label>{{ title }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-btn-dropdown>
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
          <sentences-tags :top="20"
                          @tag-click="({ sentence }) => setSampleText(sentence)" />
        </q-card-section>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { QBtn } from 'quasar'
import db from 'src/db'
import HighlightWords from 'src/components/HighlightWords.vue'
import { useLessonTitleList } from 'src/services/lessonService'
import { pullFromCloud, randomLesson, lessonToText } from 'src/services/lessonService'
import { randomSentence } from 'src/services/sentenceService'
import SentencesTags from 'src/components/SentencesTags.vue'

const $q = useQuasar()

const inputText = ref('')
const fontSize = ref(2)

const lessonTitleList = useLessonTitleList()

async function onLessonClick(id: number) {
  const lesson = await db.lessons.get(id)
  if (lesson) {
    setSampleText(lessonToText(lesson))
  }
}

async function onRandomSampleClick() {
  const randSentence = await randomSentence()
  setSampleText(randSentence?.sentence)
}

async function onRandomLessonClick() {
  const randLesson = await randomLesson()
  setSampleText(lessonToText(randLesson!))
}

function setSampleText(text: string = '') {
  inputText.value = text
}

onMounted(() => {

  void pullFromCloud().then(([ok, msg]) => {
    if (ok) {
      $q.notify({
        type: 'positive',
        message: msg
      })
    }
  })

})

</script>
