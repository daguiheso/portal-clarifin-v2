<template>
  <VueApexCharts
    :ref="refs || 'apexchart'"
    :width="width || '100%'"
    :height="height"
    :type="type"
    :options="options"
    :series="series" />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import VueApexCharts from "vue3-apexcharts"

export default defineComponent({
  components: {
    VueApexCharts
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ["width", "height", "type", "options", "series", "refs"]
})
</script>