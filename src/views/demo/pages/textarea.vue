<!-- @format -->

<template>
    <view class="u-demo">
        <u-input
            v-model="value"
            :type="type"
            :border="border"
            :height="height"
            :auto-height="autoHeight"
        />
    </view>
</template>

<script>
export default {
    data() {
        return {
            value: '',
            type: 'textarea',
            border: true,
            height: 100,
            autoHeight: true
        };
    }
};
</script>
