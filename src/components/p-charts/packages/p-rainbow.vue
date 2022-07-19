<!-- @format -->

<template>
    <l-echart ref="chart"></l-echart>
</template>

<script>
import { rainbowchart } from '../src/util/nomalChart';
import mixin from '../src/util/mixin';
export default {
    mixins: [mixin],
	name: 'PRainbow',
    props: {
        data: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    methods: {
        initChart() {
            let obj = {
                data: this.data
            };
            Object.assign(obj, this.config);
            return rainbowchart(obj);
        }
    }
};
</script>

<style scoped></style>
