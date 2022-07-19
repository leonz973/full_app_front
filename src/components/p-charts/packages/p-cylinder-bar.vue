<!-- @format -->

<!--圆柱图-->
<template>
    <l-echart ref="chart"></l-echart>
</template>

<script>
import { renderCylinderBar } from '../src/util/nomalChart';
import mixin from '../src/util/mixin';
export default {
    mixins: [mixin],
	name: 'PCylinderBar',
    methods: {
        initChart() {
            return renderCylinderBar(this.data, this.config);
        }
    }
};
</script>

<style scoped></style>
