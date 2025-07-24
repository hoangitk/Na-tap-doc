<template>
  <div class="q-mt-md"
       :style="{ fontSize: `${fontSize}rem` }">
    <template v-if="words.length === 0">
      <p style="color: red">Vui lòng nhập đoạn văn!</p>
    </template>
    <template v-else>
      <div class="q-gutter-sm">
        <template v-for="({ type, value, syllable }, index) in words"
                  :key="index">
          <template v-if="'word' === type && syllable">
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
    </template>
  </div>
</template>

<script setup lang="ts">

export interface HighlightWordsProps {
  content: string,
  fontSize: number
}

const props = defineProps<HighlightWordsProps>()

// Danh sách phụ âm đầu
const initialConsonants = [
  'ngh', // 3 ký tự
  'ch', 'gh', 'kh', 'nh', 'ng', 'ph', 'th', 'tr', 'qu', 'gi', // 2 ký tự
  'b', 'c', 'd', 'đ', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 's', 'r', 't', 'x', 'v' // 1 ký tự
]

const words = computed(() => processNPL(props.content))
const fontSize = computed(() => props.fontSize ?? 2)

function processNPL(sentence: string) {
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
function splitSyllable(syllable: string) {
  const syllableLower = syllable.toLowerCase()
  for (const cons of initialConsonants) {
    if (syllableLower.startsWith(cons)) {
      return [syllable.slice(0, cons.length), syllable.slice(cons.length)]
    }
  }
  return ['', syllable]
}
</script>


<style lang="scss" scoped>
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
  display: inline-block;
  margin-right: .5rem;
}
</style>
