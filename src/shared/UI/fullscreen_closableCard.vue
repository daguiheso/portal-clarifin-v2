<template>
  <div
    v-if="showCard"
    class="card custom-card"
    :class="customCardClass">
    <div
      class="card-header justify-content-between"
      :class="customCardHeaderClass">
      <div
        class="card-title"
        v-html="title" />
      <a
        v-if="hasClose"
        href="javascript:void(0);"
        @click="closeCard">
        <i class="ri-close-line fs-18" />
      </a>
      <a
        v-if="hasFullScreen"
        href="javascript:void(0);"
        @click="toggleFullscreen">
        <i class="ri-fullscreen-line" />
      </a>
    </div>
    <div
      class="card-body"
      :class="customCardBodyClass">
      <slot />
    </div>
    <div
      v-if="$slots.footer || closeCard"
      class="card-footer"
      :class="customCardFooterClass">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: String,
    showCardVal: Boolean,
    customCardClass: String,
    customCardHeaderClass: String,
    customCardBodyClass: String,
    customCardFooterClass: String,
    hasClose: Boolean,
    hasFullScreen: Boolean,
  },
  data () {
    return {
      showCard: true
    }
  },
  mounted () {
    this.showCard = this.showCardVal
  },
  methods: {
    closeCard () {
      this.showCard = !this.showCard
    },
    toggleFullscreen (event) {
      let $this = event.currentTarget
      let card = $this.closest(".card")

      card?.classList.toggle("card-fullscreen")
      card?.classList.remove("card-collapsed")
      event.preventDefault()

      return false
    }
  },
}
</script>
