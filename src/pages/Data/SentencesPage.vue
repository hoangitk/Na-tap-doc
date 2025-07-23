<template>
  <div>
    <DbTableEditor table-name="sentences"
                   :columns />
  </div>
</template>

<script setup lang="ts">
import DbTableEditor from 'src/components/DbTableEditor.vue'

const columns = ref([
  { name: 'sentence', field: 'sentence', label: 'Câu mẫu', required: true, align: 'center' }
])

</script>
