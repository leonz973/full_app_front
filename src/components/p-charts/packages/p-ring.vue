<!-- @format -->

<template>
    <l-echart ref="chart"></l-echart>
</template>

<script>
import { ringchart } from '../src/util/nomalChart';
import mixin from '../src/util/mixin';
export default {
    mixins: [mixin],
	name: 'PRing',
    props: {
        data: {
            // type: Array,
            default: function() {
                return {};
            }
        }
    },
    methods: {
        initChart() {
            let obj = {
                data: this.data
            };
            Object.assign(obj, this.config);
            return ringchart(obj);
        }
    }
};
</script>

<style scoped></style>
