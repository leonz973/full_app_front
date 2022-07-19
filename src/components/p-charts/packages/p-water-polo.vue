<!-- @format -->

<template>
    <l-echart ref="chart"></l-echart>
</template>

<script>
import { waterPolochart } from '../src/util/nomalChart';
import mixin from '../src/util/mixin';
// import '../../lime-echart/components/echarts-liquidfill/index.js'
import 'lime-echart/components/echarts-liquidfill/index.js';
export default {
	name: 'PWaterPolo',
    mixins: [mixin],
    props: {
        data: {
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
            return waterPolochart(obj);
        }
    }
};
</script>

<style scoped></style>
