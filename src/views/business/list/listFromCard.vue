<!-- @format -->

<template>
    <div class="list-from-card">
        <u-form
            :model="model"
            :rules="rules"
            ref="uForm"
            :errorType="errorType"
            :border-bottom="false"
        >
            <p-mui-card>
                <view slot="title" class="from-title"> 委托企业 </view>
                <view slot="body">
                    <u-form-item
                        label-width="150"
                        label-position="left"
                        :border-bottom="false"
                        label="企业名称"
                        class="must-fill"
                        prop="name"
                    >
                        <u-input
                            placeholder="请录入"
                            v-model="model.name"
                            type="text"
                        ></u-input>
                    </u-form-item>
                    <u-form-item
                        label-width="230"
                        label-position="left"
                        :border-bottom="false"
                        label="工商营业执照号"
                        class="must-fill"
                        prop="yyzz"
                    >
                        <u-input
                            placeholder="请录入"
                            v-model="model.yyzz"
                            type="text"
                        ></u-input>
                    </u-form-item>
                    <u-form-item
                        label-width="260"
                        label-position="left"
                        :border-bottom="false"
                        label="统一社会信用代码"
                        class="must-fill"
                        prop="tyshxydm"
                    >
                        <u-input
                            placeholder="请录入"
                            v-model="model.tyshxydm"
                            type="text"
                        ></u-input>
                    </u-form-item>
                    <u-form-item
                        label-width="260"
                        label-position="left"
                        :border-bottom="false"
                        label="法定代表人"
                        class="must-fill"
                        prop="fddbr"
                    >
                        <u-input
                            placeholder="请录入"
                            v-model="model.fddbr"
                            type="text"
                        ></u-input>
                    </u-form-item>
                    <u-form-item
                        label-width="260"
                        label-position="left"
                        :border-bottom="false"
                        label="身份证号码"
                        class="must-fill"
                        prop="sfzhm"
                    >
                        <u-input
                            placeholder="请录入"
                            v-model="model.sfzhm"
                            type="text"
                        ></u-input>
                    </u-form-item>
                </view>
            </p-mui-card>

            <p-mui-card>
                <view slot="title" class="from-title">
                    收集企业（被委托企业）
                </view>
                <view slot="body">
                    <u-form-item
                        label-width="150"
                        label-position="left"
                        :border-bottom="false"
                        label="企业名称"
                        class="must-fill"
                        prop="sjqyName"
                    >
                        <u-input
                            placeholder="请录入"
                            v-model="model.sjqyName"
                            type="text"
                        ></u-input>
                    </u-form-item>
                    <u-form-item
                        label-width="230"
                        label-position="left"
                        :border-bottom="false"
                        label="工商营业执照号"
                        class="must-fill"
                        prop="sjqyYyzz"
                    >
                        <u-input
                            placeholder="请录入"
                            v-model="model.sjqyYyzz"
                            type="text"
                        ></u-input>
                    </u-form-item>
                    <u-form-item
                        label-width="260"
                        label-position="left"
                        :border-bottom="false"
                        label="统一社会信用代码"
                        class="must-fill"
                        prop="sjqyTyshxydm"
                    >
                        <u-input
                            placeholder="请录入"
                            v-model="model.sjqyTyshxydm"
                            type="text"
                        ></u-input>
                    </u-form-item>
                    <u-form-item
                        label-width="260"
                        label-position="left"
                        :border-bottom="false"
                        label="法定代表人"
                        class="must-fill"
                        prop="sjqyFddbr"
                    >
                        <u-input
                            placeholder="请录入"
                            v-model="model.sjqyFddbr"
                            type="text"
                        ></u-input>
                    </u-form-item>
                    <u-form-item
                        label-width="260"
                        label-position="left"
                        :border-bottom="false"
                        label="身份证号码"
                        class="must-fill"
                        prop="sjqySfzhm"
                    >
                        <u-input
                            placeholder="请录入"
                            v-model="model.sjqySfzhm"
                            type="text"
                        ></u-input>
                    </u-form-item>
                </view>
            </p-mui-card>

            <p-mui-card>
                <view slot="title" class="from-title"> 委托书 </view>
                <view slot="body">
                    <u-form-item
                        label-width="150"
                        label-position="top"
                        :border-bottom="false"
                        label="收集企业名称"
                        class="must-fill label-top"
                        prop="sjName"
                    >
                    </u-form-item>
                </view>
            </p-mui-card>
        </u-form>

        <div class="btns">
            <u-button @click="cancel">取消</u-button>
            <u-button type="primary" @click="submit">提交</u-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'listFromCard',
    data() {
        return {
            model: {
                name: '',
                yyzz: '',
                tyshxydm: '',
                fddbr: '',
                sfzhm: '',
                sjqyName: '',
                sjqyYyzz: '',
                sjqyTyshxydm: '',
                sjqyFddbr: '',
                sjqySfzhm: '',
                sjName: [],
                startTime: '',
                endTime: ''
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请录入企业名称',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        message: '企业名称长度须大于3个字符',
                        trigger: ['change', 'blur']
                    },
                    {
                        // 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
                        validator: (rule, value, callback) => {
                            // 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
                            return this.$u.test.chinese(value);
                        },
                        message: '企业名称必须为中文',
                        // 触发器可以同时用blur和change，二者之间用英文逗号隔开
                        trigger: ['change', 'blur']
                    }
                ],
                yyzz: [
                    {
                        required: true,
                        message: '请录入工商营业执照号',
                        trigger: 'change'
                    }
                ],
                tyshxydm: [
                    {
                        required: true,
                        message: '请录入统一社会信用代码',
                        trigger: 'change'
                    }
                ],
                fddbr: [
                    {
                        required: true,
                        message: '请录入法定代表人',
                        trigger: 'change'
                    }
                ],
                sfzhm: [
                    {
                        required: true,
                        message: '请录入身份证号码',
                        trigger: 'change'
                    }
                ],
                sjqyName: [
                    {
                        required: true,
                        message: '请录入企业名称',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        message: '企业名称长度须大于3个字符',
                        trigger: ['change', 'blur']
                    },
                    {
                        // 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
                        validator: (rule, value, callback) => {
                            // 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
                            return this.$u.test.chinese(value);
                        },
                        message: '企业名称必须为中文',
                        // 触发器可以同时用blur和change，二者之间用英文逗号隔开
                        trigger: ['change', 'blur']
                    }
                ],
                sjqyYyzz: [
                    {
                        required: true,
                        message: '请录入工商营业执照号',
                        trigger: 'change'
                    }
                ],
                sjqyTyshxydm: [
                    {
                        required: true,
                        message: '请录入统一社会信用代码',
                        trigger: 'change'
                    }
                ],
                sjqyFddbr: [
                    {
                        required: true,
                        message: '请录入法定代表人',
                        trigger: 'change'
                    }
                ],
                sjqySfzhm: [
                    {
                        required: true,
                        message: '请录入身份证号码',
                        trigger: 'change'
                    }
                ],
                sjName: [
                    {
                        required: true,
                        message: '请选择收集企业名称',
                        trigger: 'change'
                    }
                ]
            },
            errorType: ['message']
        };
    },
    created() {},
    onReady() {
        this.$refs.uForm.setRules(this.rules);
    },
    methods: {
        submit() {
            this.$refs.uForm.validate((valid) => {
                if (valid) {
                    console.log('验证通过');
                } else {
                    console.log('验证失败');
                }
            });
        },
        cancel() {}
    }
};
</script>

<style lang="less" scoped>
.list-from-card {
    /deep/ .p-mui-card .p-mui-card-title {
        border-bottom: none;
    }

    /deep/ .p-mui-card .p-mui-card-body {
        padding: 0;
    }

    .u-form {
        background-color: transparent;
        padding: 0;
    }

    .must-fill {
        padding: 10rpx 0;
        padding-left: 30rpx;
        position: relative;
        &::before {
            content: '*';
            position: absolute;
            top: 26rpx;
            left: 10rpx;
            color: red;
        }
        &.label-top {
            &::before {
                top: 0;
            }
        }
    }

    .u-input {
        text-align: right !important;
    }

    .btns {
        display: flex;
        justify-content: space-evenly;
        .u-btn {
            width: 30%;
            height: 80rpx;
        }
    }

    /deep/.u-form-item__message {
        text-align: right !important;
    }

    .from-title {
        position: relative;
        padding-left: 20rpx;
        &::before {
            position: absolute;
            content: '';
            left: 0;
            top: 40rpx;
            width: 12rpx;
            height: 12rpx;
            border-radius: 50%;
            background-color: #3cabff;
        }
    }

    .time-box {
        float: right;
    }
}
</style>
