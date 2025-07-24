<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-tabs v-model="activeTab"
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator>
        <q-tab v-for="({ tableName }) in tables"
               :key="tableName"
               :name="tableName"
               :label="tableName" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab"
                    animated>
        <q-tab-panel v-for="({ tableName, columns, description }) in tables"
                     :key="tableName"
                     :name="tableName">
          <p v-if="description">{{ description }}</p>
          <DbTableEditor :tableName
                         :columns></DbTableEditor>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import DbTableEditor from 'src/components/DbTableEditor.vue'

const tables = ref([
  {
    tableName: 'sentences',
    description: 'Các mẫu câu ngắn gọn',
    columns: [
      { name: 'sentence', field: 'sentence', label: 'Câu mẫu', required: true, align: 'center' }
    ]
  },
  {
    tableName: 'lessons',
    description: 'Các bài tập đọc dài, khổ thơ, đoạn văn',
    columns: [
      { name: 'title', field: 'title', label: 'Tiêu đề', required: true, align: 'center' },
      { name: 'content', field: 'content', label: 'Nội dung', align: 'center' }
    ]
  }
])

const activeTab = ref('sentences')

</script>
