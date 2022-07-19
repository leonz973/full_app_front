<!-- @format -->

<template>
    <div class="zwsj-class">
        <img class="zwsj" :src="imgSrc" />
    </div>
</template>

<script>
import { URL_DATA } from '../utils/config.js';
export default {
    data() {
        return {
            imgSrc: URL_DATA + '/resources/business/mobile/images/nodata.png'
        };
    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style></style>
