<template>
  <div
    :class="['back-to-top-btn', { 'go-top': isTop }]"
    @click="scrollToTop()">
    <div><i class="fe fe-arrow-up fs-14 pr-10" /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "BackToTop",
  data () {
    return {
      isTop: false,
    }
  },
  mounted () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this

    window.addEventListener("scroll", () => {
      let scrollPos = window.scrollY

      if (scrollPos >= 100) {
        that.isTop = true
      } else {
        that.isTop = false
      }
    })
  },
  methods: {
    scrollToTop () {
      window.scrollTo(0, 0)
    },
  },
})
</script>

<style lang="scss" scoped>
.back-to-top-btn {
  position: fixed;
  cursor: pointer;
  bottom: -100px;
  right: 20px;
  color: #ffffff;
  background-color: #6259ca;
  z-index: 4;
  width: 2rem;
  text-align: center;
  height: 2rem;
  opacity: 0;
  visibility: hidden;
  border-radius: .188rem;
  bottom: 20px !important;
  inset-inline-end: 20px !important;
  font-size: 20px;
  transition: 0.6s;
  overflow: hidden;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);

  i {
    position: absolute;
    right: 0;
    left: 0;
    top: 45%;
    transform: translateY(-45%);
    text-align: center;
    font-size: 20px;
    margin-left: auto;
    margin-right: auto;
  }
  &.go-top {
    opacity: 1;
    visibility: visible;
    bottom: 50px;
    outline: 0;
  }
  &:hover {
    background-color: rgb(var(--primary-rgb));
    border: 1px solid rgb(var(--primary-rgb));
    color: #ffffff;
    transition: 0.6s;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    transform: translateY(-5px);
  }
}
</style>
