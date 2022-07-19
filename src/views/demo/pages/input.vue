<!-- @format -->

<template>
    <view class="u-demo">
        <u-input
            placeholder="账号"
            v-model="value"
            :type="type"
            :border="border"
        />
        <u-input
            placeholder="密码"
            v-model="value"
            type="password"
            :border="border"
        />
    </view>
</template>

<script>
export default {
    data() {
        return {
            value: '',
            type: 'text',
            border: true
        };
    }
};
</script>
