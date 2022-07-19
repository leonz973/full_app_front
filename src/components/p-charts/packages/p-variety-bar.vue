<!-- @format -->

<!--变化排名条纹图-->
<template>
    <l-echart ref="chart"></l-echart>
</template>

<script>
import { renderVarietyBar } from '../src/util/nomalChart';
import mixin from '../src/util/mixin';
export default {
	name: 'PVarietyBar',
    mixins: [mixin],
    methods: {
        initChart() {
            return renderVarietyBar(this.data, this.config);
        }
    }
};
</script>

<style scoped></style>
