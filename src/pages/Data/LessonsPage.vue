<template>
  <div class="q-gutter-md ">
    <DbTableEditor table-name="lessons"
                   :grid="true"
                   :columns>
      <template #footer>
        <q-btn flat
               icon="cloud"
               label="Cập nhập"
               @click="onCloudPullClick" />
      </template>
    </DbTableEditor>
  </div>
</template>

<script setup lang="ts">
import DbTableEditor from 'src/components/DbTableEditor.vue'
import { useQuasar } from 'quasar'
import db from 'src/db'
import type { LessonInsert } from 'src/db'

const $q = useQuasar()

const columns = ref([
  { name: 'title', field: 'title', label: 'Tiêu đề', required: true, align: 'center' },
  { name: 'content', field: 'content', label: 'Nội dung', align: 'center' }
])

async function onCloudPullClick() {
  try {
    const res = await fetch(`https://gist.githubusercontent.com/hoangitk/c2a121250ff54204a7e6df164e9260b2/raw/Na-tap-doc.md?v=${new Date().getMilliseconds()}`)
    const mdContent = await res.text()
    const lessons = mdContent
      .split(/^##\s+/gm)
      .filter(block => {
        return !!block && !block.startsWith('#')
      })
      .map(block => {
        const [rawTitle, ...restContent] = block.split('\n')
        return { title: rawTitle?.trim(), content: restContent.join('\n') }
      })
    await db.lessons.bulkPut(lessons as LessonInsert[])
  } catch (error) {
    console.log('Tải bài học', error)
    $q.notify({
      type: 'negative',
      message: 'Có lỗi khi tải bài học'
    })
  }

}

</script>
