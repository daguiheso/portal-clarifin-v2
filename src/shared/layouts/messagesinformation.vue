<template>
  <customswitcher />
  <router-view />
</template>

<script>

import customswitcher from '../components/customswitcher/customswitcher.vue';
export default {
  mounted() {
    document.body.classList.add("error-1");
  },
  components: { customswitcher },
  unmounted() {
    document.body.classList.remove("error-1");
  }
};
</script>

<style scoped></style>
