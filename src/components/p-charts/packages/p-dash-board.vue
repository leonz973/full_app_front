<!-- @format -->

<template>
    <l-echart ref="chart"></l-echart>
</template>

<script>
import { dashboardchart } from '../src/util/nomalChart';
import mixin from '../src/util/mixin';
export default {
    mixins: [mixin],
	name: 'PDashBoard',
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
            return dashboardchart(obj);
        }
    }
};
</script>

<style scoped></style>
