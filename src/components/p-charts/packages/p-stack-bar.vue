<!-- @format -->

<!--堆叠图-->
<template>
    <l-echart ref="chart"></l-echart>
</template>

<script>
import { renderStackBar } from '../src/util/nomalChart';
import mixin from '../src/util/mixin';
export default {
	name: 'PStackBar',
    mixins: [mixin],
    methods: {
        initChart() {
            return renderStackBar(this.data, this.config);
        }
    }
};
</script>

<style scoped></style>
