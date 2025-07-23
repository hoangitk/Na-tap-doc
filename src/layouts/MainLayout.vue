<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title> 👧🏻 📢 Na iu tập đọc Tiếng Việt </q-toolbar-title>

        <q-space />

        <q-btn round
               dense
               flat
               icon="home"
               to="/">
          <q-tooltip>Bé tập đọc</q-tooltip>
        </q-btn>

        <q-btn round
               dense
               flat
               icon="storage"
               to="/db">
          <q-tooltip>Dữ liệu</q-tooltip>
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">

</script>
