<!-- @format -->

<!--桑基图-->
<template>
    <l-echart ref="chart"></l-echart>
</template>

<script>
import { renderSanKey } from '../src/util/nomalChart';
import mixin from '../src/util/mixin';
export default {
	name: 'PSankey',
    mixins: [mixin],
    methods: {
        initChart() {
            return renderSanKey(this.data, this.config);
        }
    }
};
</script>

<style scoped></style>
