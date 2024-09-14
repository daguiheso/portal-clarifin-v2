<template>
    <canvas :class="className" :type="type" :width="width || '100%'" :ref="refs || 'chatJs'" :id="id" :height="height"
        :options="options" :series="series"></canvas>
</template>
<script>
import Chart from "chart.js/auto";
export default {
    props: ['width', 'className', 'height', 'type', 'options', 'series', 'refs', 'id'],

    mounted() {
        const canvasElement = document.getElementById(this.id);
        if (canvasElement) {
            canvasElement.width = this.width; // Set the desired width
            canvasElement.height = this.height; // Set the desired height
            const ctx = canvasElement.getContext("2d");
            let chart = new Chart(ctx, {
                type: this.type || 'line',
                data: this.series,
                options: this.options
            });
        } else {
            console.error('Element with id ' + this.id + ' not found.');
        }
    },
}
</script>