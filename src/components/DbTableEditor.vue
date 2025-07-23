<template>
  <q-table v-if="tableName"
           :rows="rows ?? []"
           :columns
           :pagination="{ rowsPerPage: 10 }"
           separator="cell"
           row-key="id"
           flat
           dense>
    <template v-slot:body-cell="props">
      <q-td :props="props">
        <q-input v-model="props.row[props.col.name]"
                 dense
                 borderless
                 @blur="updateRow(props.row)" />
      </q-td>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props>
        <q-btn icon="delete"
               rounded
               @click="deleteRow(props.row)"></q-btn>
      </q-td>
    </template>
  </q-table>
  <div class="q-mt-md flex justify-end">
    <q-btn flat
           icon="add"
           label="Add Row"
           @click="addRow()" />
  </div>
</template>

<script setup>

import { liveQuery } from 'dexie'
import { useObservable } from '@vueuse/rxjs'
import db from 'src/db'

const { tableName, columns: defineColumns } = defineProps({
  tableName: { type: String, required: true },
  columns: { type: Array, require: true },
})

// const pagination = ref({
//   page: 1,
//   rowsPerPage: 20
// })
// const offset = computed(() => (pagination.value.page - 1) * pagination.value.rowsPerPage)
// const limit = computed(() => pagination.value.rowsPerPage)
// const rows = useObservable(liveQuery(() => db.table(table).offset(offset.value).limit(limit.value).toArray()))
const columns = computed(() => [
  ...defineColumns,
  {
    name: 'actions', classes: 'q-table--col-auto-width',
    headerClasses: 'q-table--col-auto-width'

  }
])
const rows = useObservable(liveQuery(() => db.table(tableName).reverse().toArray()))
/*
:pagination="{ rowsPerPage: 0 }"
 selection="multiple"
v-model:selected="selected"
const selected = ref()
*/
async function deleteRow(row) {
  await db.table(tableName).delete(toRaw(row).id)
}
async function updateRow(row) {
  await db.table(tableName).put(toRaw(row))
}

async function addRow() {
  const emptyRow = {}
  await db.table(tableName).add(emptyRow)
}

</script>
