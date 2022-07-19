<!-- @format -->

<!--资产建设图-->
<template>
    <l-echart ref="chart"></l-echart>
</template>

<script>
import { renderAssetsBar } from '../src/util/nomalChart';
import mixin from '../src/util/mixin';
export default {
    mixins: [mixin],
	name: 'PAssetsBar',
    methods: {
        initChart() {
            return renderAssetsBar(this.data, this.config);
        }
    }
};
</script>

<style scoped></style>
