<template>
  <div>
    <customswitcher />
    <router-view />
    <Backtotop />
  </div>
</template>

<script>
import Backtotop from "../components/backtotop/backtotop.vue"
import customswitcher from "../components/customswitcher/customswitcher.vue"
export default {
  components: { Backtotop, customswitcher },
  beforeCreate () {
    document.body.classList.add("landing-body")
  },
  unmounted () {
    document.body.classList.remove("landing-body")
  },
}
</script>

<style scoped></style>
