<!-- @format -->
<template>
    <l-echart ref="chart"></l-echart>
</template>
<script>
import { airwrwchart } from '../src/util/nomalChart';
import mixin from '../src/util/mixin';
export default {
    name: 'PAirDb',
    mixins: [mixin],
    props: {
        data: {
            // type: Array,
            default: function () {
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
            return airwrwchart(obj);
        }
    }
};
</script>

<style scoped></style>
