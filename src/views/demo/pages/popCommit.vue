<!-- @format -->

<template>
    <div class="pop-commit">
        <p-mui-pop-commit :data="data">
            <!-- 插槽 -->
            <div slot="des">
                <div class="des-box">
                    <p>提交成功!</p>
                    <u-button type="primary" @click="handleClick" size="medium"
                        >确定</u-button
                    >
                </div>
            </div>
        </p-mui-pop-commit>
    </div>
</template>

<script>
export default {
    name: 'popCommit',
    data() {
        return {
            data: {
                isShow: true
            }
        };
    },
    created() {},
    methods: {
        handleClick() {
            this.data.isShow = false;
        }
    }
};
</script>

<style lang="less" scoped>
.pop-commit {
    .des-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
            font-size: 32rpx;
            color: #333;
            font-weight: 700;
            margin-bottom: 20rpx;
        }
    }
}
</style>
