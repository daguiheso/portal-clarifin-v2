<template>
    <VueApexCharts :width="width || '100%'" :ref="refs || 'apexchart'" :height="height" :type="type" :options="options"
        :series="series" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VueApexCharts from "vue3-apexcharts";

export default defineComponent({
    props: ['width', 'height', 'type', 'options', 'series', 'refs'],
    components: {
        VueApexCharts
    }
})
</script>