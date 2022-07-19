<!-- @format -->

<!--雷达图-->
<template>
    <l-echart ref="chart"></l-echart>
</template>

<script>
import { renderRadar } from '../src/util/nomalChart';
import mixin from '../src/util/mixin';
export default {
	name: 'PRadar',
    mixins: [mixin],
    methods: {
        initChart() {
            return renderRadar(this.data, this.config);
        }
    }
};
</script>

<style scoped></style>
