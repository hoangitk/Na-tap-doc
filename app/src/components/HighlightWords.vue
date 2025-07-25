<template>
  <div class="highlight-words q-mt-md"
       :class="{ 'highlight': highlight }"
       :style="{ '--font-size': `${fontSize}rem` }">
    <template v-if="words.length === 0">
      <p style="color: red">Vui lòng nhập đoạn văn!</p>
    </template>
    <template v-else>
      <template v-for="({ type, value, syllable }, index) in words"
                :key="index">

        <span v-if="'word' === type && syllable"
              class="vocabulary word">
          <span v-if="syllable[0]"
                class="initial-consonant">
            {{ syllable[0] }}
          </span>
          <span class="rhyme">
            {{ syllable[1] }}
          </span>
        </span>

        <span v-else-if="'number' === type"
              class="vocabulary number">{{ value }}</span>

        <span v-else-if="'punctuation' === type"
              class="punctuation">{{ value }}</span>

        <br v-else-if="'newline' === type"
            class="newline" />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">

const { content = '', fontSize = 2, highlight = true } = defineProps<{
  content?: string,
  fontSize?: number,
  highlight?: boolean
}>()

// Danh sách phụ âm đầu
const initialConsonants = [
  'ngh', // 3 ký tự
  'ch', 'gh', 'kh', 'nh', 'ng', 'ph', 'th', 'tr', 'qu', 'gi', // 2 ký tự
  'b', 'c', 'd', 'đ', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 's', 'r', 't', 'x', 'v' // 1 ký tự
]

const words = computed(() => processNPL(content))

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


<style lang="scss">
.highlight-words {
  font-size: var(--font-size, '2rem');

  .vocabulary {
    display: inline-block;
    transition: transform 0.2s ease-in-out;

    &:hover {
      outline: 1px blue solid;
      border: 0.2rem;
      border-radius: 0.2rem;
      transform: scale(1.1);
      padding: 0 .5rem;
    }

  }

  .vocabulary+.vocabulary {
    margin-left: .5em;
  }

  .punctuation+.vocabulary {
    margin-left: .5em;
  }

  &.highlight {

    .initial-consonant {
      color: blue;
      font-weight: bold;
      cursor: pointer;
    }

    .rhyme {
      color: red;
      cursor: pointer;
    }

  }
}
</style>
