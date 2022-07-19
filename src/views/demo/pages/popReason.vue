<!-- @format -->

<template>
    <div class="pop-reason">
        <p-mui-pop-reason
            :data="data"
            @handleSubmit="handleSubmit"
        ></p-mui-pop-reason>
    </div>
</template>

<script>
export default {
    name: 'popReason',
    data() {
        return {
            reasonMsg: '', //输入的原因
            data: {
                reasonTitle: '反馈意见：误报', //弹框标题
                mainTitle: '误报原因', //原因标题
                placeholder: '请填写误报原因', //文本框提示文字
                isPopShow: true //弹框是否显示
            }
        };
    },
    created() {},
    methods: {
        handleSubmit(val) {
            this.reasonMsg = val;
            // 弹框关闭
            this.data.isPopShow = false;
        }
    }
};
</script>

<style lang="less" scoped>
.pop-reason {
}
</style>
