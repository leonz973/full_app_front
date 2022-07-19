<!-- @format -->

<!--条纹图-->
<template>
    <l-echart ref="chart"></l-echart>
</template>

<script>
import { renderStripeBar } from '../src/util/nomalChart';
import mixin from '../src/util/mixin';
export default {
	name: 'PStripeBar',
    mixins: [mixin],
    methods: {
        initChart() {
            return renderStripeBar(this.data, this.config);
        }
    }
};
</script>

<style scoped></style>
