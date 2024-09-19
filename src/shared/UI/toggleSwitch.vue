<template>
  <div
    class="toggle"
    :class="[customClass, { 'on': isActive }]"
    @click="toggleState">
    <span />
  </div>
</template>
  
<script>
export default {
  props: {
    customClass: {
      type: String,
      default: "",
    },
    isOn: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      isActive: this.isOn,
    }
  },
  methods: {
    toggleState () {
      this.isActive = !this.isActive
    }
  },
}
</script>
  
<style scoped></style>
  