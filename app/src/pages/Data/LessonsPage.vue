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
import { pullFromCloud } from 'src/services/lessonService'

const $q = useQuasar()

const columns = ref([
  { name: 'title', field: 'title', label: 'Tiêu đề', required: true, align: 'center' },
  { name: 'content', field: 'content', label: 'Nội dung', align: 'center' }
])

async function onCloudPullClick() {
  const [ok, msg] = await pullFromCloud(true)
  $q.notify({
    type: ok ? 'positive' : 'warning',
    message: msg
  })
}

</script>
