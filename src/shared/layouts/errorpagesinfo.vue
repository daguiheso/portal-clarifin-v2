<template>
  <customswitcher />
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue"
import customswitcher from "../components/customswitcher/customswitcher.vue"

onMounted(() => {
  document.body.classList.add("error-1")
})

onUnmounted(() => {
  document.body.classList.remove("error-1")
})
</script>

<style scoped></style>
