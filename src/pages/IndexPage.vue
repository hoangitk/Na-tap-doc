<template>
  <q-page class="q-pa-md">
    <q-card class="q-ma-md">
      <q-card-section>
        <h1 class="text-h4 text-orange-9">Bé tập đọc Tiếng Việt</h1>
        <p>Nhập đoạn văn để bé tập học cách tách âm tiết!</p>

        <q-input v-model="inputText"
                 type="textarea"
                 placeholder="Nhập câu, ví dụ: Na rất thích Tiếng Việt."
                 outlined
                 class="input q-mb-md"
                 :rows="3"
                 :input-style="{ fontSize: fontSizeRem, lineHeight: fontSize * 1.5 + 'rem' }" />

        <div class="row justify-between no-wrap">
          <div class="col-auto q-gutter-sm">
            <q-btn label="Câu ngẫu nhiên"
                   color="primary"
                   @click="setSampleText(randomSentence())" />
            <q-btn label="Xóa đoạn văn"
                   @click="inputText = ''" />
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
          <div class="output q-mt-md"
               :style="{ fontSize: fontSizeRem }">
            <template v-if="words.length === 0">
              <p style="color: red">Vui lòng nhập đoạn văn!</p>
            </template>
            <template v-else>
              <div class="q-gutter-md">
                <div class="q-gutter-sm">
                  <template v-for="({ type, value, syllable }, index) in words"
                            :key="index">
                    <template v-if="'word' === type">
                      <span class="syllable">
                        <span v-if="syllable[0]"
                              class="initial-consonant">
                          {{ syllable[0] }}
                        </span>
                        <span class="rhyme">
                          {{ syllable[1] }}
                        </span>
                      </span>
                    </template>
                    <br v-else-if="'newline' === type" />
                    <span v-else>{{ value }}</span>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </q-card-section>

        <q-card-section class="sample-sentences">
          <h3 class="text-h6">Câu mẫu:</h3>
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

<script setup>
import { ref, computed } from 'vue'

// Danh sách phụ âm đầu
const initialConsonants = [
  'ngh', // 3 ký tự
  'ch', 'gh', 'kh', 'nh', 'ng', 'ph', 'th', 'tr', 'qu', 'gi', // 2 ký tự
  'b', 'c', 'd', 'đ', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 's', 'r', 't', 'x', 'v' // 1 ký tự
]

const inputText = ref('')
const words = computed(() => processNPL(inputText.value))
const fontSize = ref(2)
const fontSizeRem = computed(() => `${fontSize.value}rem`)

function processNPL(sentence) {
  const regex = /(\r\n|\n)|(\p{L}+)|(\p{N}+)|([^\p{L}\p{N}\s])/gu
  const result = []

  let match
  while ((match = regex.exec(sentence)) !== null) {
    if (match[1]) {
      result.push({ type: 'newline', value: match[1] })
    } else if (match[2]) {
      result.push({ type: 'word', value: match[2], syllable: splitSyllable(match[2]) })
    } else if (match[3]) {
      result.push({ type: 'number', value: match[3] })
    } else if (match[4]) {
      result.push({ type: 'punctuation', value: match[4] })
    }
  }

  return result
}


// Tách âm tiết
function splitSyllable(syllable) {
  const syllableLower = syllable.toLowerCase()
  for (let cons of initialConsonants) {
    if (syllableLower.startsWith(cons)) {
      return [syllable.slice(0, cons.length), syllable.slice(cons.length)]
    }
  }
  return ['', syllable]
}


function setSampleText(text) {
  inputText.value = text
}


const sampleSentences = [
  "Na rất thích Tiếng Việt.",
  "Mẹ Na thật xinh đẹp.",
  "Bạn Na rất ngoan.",
  "Na rất yêu chị Mi.",
  "Bé đi học đúng giờ.",
  "Mẹ nấu cơm ngon lắm.",
  "Con mèo nằm ngủ.",
  "Bố mua bánh cho bé.",
  "Trời hôm nay rất mát.",
  "Em bé đang chơi bóng.",
  "Ông đọc sách mỗi tối.",
  "Chị tô màu con cá.",
  "Chó chạy quanh sân.",
  "Bé hát bài vui nhộn.",
  "Cây xanh mọc tốt.",
  "Mưa rơi tí tách.",
  "Bé thích ăn kem.",
  "Đèn sáng trong phòng.",
  "Chú chim bay cao.",
  "Hoa hồng thơm ngát.",
  "Cá bơi dưới nước.",
  "Bé vẽ mặt trời.",
  "Trăng tròn sáng quá."
]
const randomSentence = () => sampleSentences[Math.floor(Math.random() * sampleSentences.length)]

</script>

<style scoped>
.output {
  line-height: 1.6;
  text-align: left;
}

.initial-consonant {
  color: blue;
  font-weight: bold;
  cursor: pointer;
}

.rhyme {
  color: red;
  cursor: pointer;
}

.syllable {
  margin-right: 5px;
  display: inline-block;
}

.sound-icon {
  cursor: pointer;
  margin-left: 2px;
}

.sample-sentences {
  margin-top: 20px;
}
</style>
