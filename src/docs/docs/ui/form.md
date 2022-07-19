### form (表单)

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/form'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码

```html
<template>
    <view class="wrap">
        <u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
            <u-form-item
                :leftIconStyle="{color: '#888', fontSize: '32rpx'}"
                left-icon="account"
                label-width="120"
                :label-position="labelPosition"
                label="姓名"
                prop="name"
            >
                <u-input
                :border="border"
                placeholder="请输入姓名"
                v-model="model.name"
                type="text"
                ></u-input>
            </u-form-item>
            <u-form-item :label-position="labelPosition" label="性别" prop="sex">
                <u-input
                :border="border"
                type="select"
                :select-open="actionSheetShow"
                v-model="model.sex"
                placeholder="请选择性别"
                @click="actionSheetShow = true"
                ></u-input>
            </u-form-item>
            <u-form-item :label-position="labelPosition" label="简介" prop="intro">
                <u-input
                type="textarea"
                :border="border"
                placeholder="请填写简介"
                v-model="model.intro"
                />
            </u-form-item>
            <u-form-item :label-position="labelPosition" label="密码" prop="password">
                <u-input
                :password-icon="true"
                :border="border"
                type="password"
                v-model="model.password"
                placeholder="请输入密码"
                ></u-input>
            </u-form-item>
            <u-form-item
                :label-position="labelPosition"
                label="确认密码"
                label-width="150"
                prop="rePassword"
            >
                <u-input
                :border="border"
                type="password"
                v-model="model.rePassword"
                placeholder="请确认密码"
                ></u-input>
            </u-form-item>
            <u-form-item
                class="items-label" 
                :label-position="labelPosition"
                label="水果品种"
                label-width="150"
                prop="likeFruit"
            >
                <u-checkbox-group
                @change="checkboxGroupChange"
                :width="radioCheckWidth"
                :wrap="radioCheckWrap"
                >
                <u-checkbox
                    v-model="item.checked"
                    v-for="(item, index) in checkboxList"
                    :key="index"
                    :name="item.name"
                    >{{ item.name }}</u-checkbox
                >
                </u-checkbox-group>
            </u-form-item>
            <u-form-item
                class="items-label" 
                :label-position="labelPosition"
                label="结算方式"
                prop="payType"
                label-width="150"
            >
                <u-radio-group
                v-model="radio"
                @change="radioGroupChange"
                :width="radioCheckWidth"
                :wrap="radioCheckWrap"
                >
                    <u-radio
                        shape="circle"
                        v-for="(item, index) in radioList"
                        :key="index"
                        :name="item.name"
                        >{{ item.name }}</u-radio
                    >
                </u-radio-group>
            </u-form-item>
            <u-form-item
                :label-position="labelPosition"
                label="所在地区"
                prop="region"
                label-width="150"
            >
                <u-input
                :border="border"
                type="select"
                :select-open="pickerShow"
                v-model="model.region"
                placeholder="请选择地区"
                @click="pickerShow = true"
                ></u-input>
            </u-form-item>
            <u-form-item
                :label-position="labelPosition"
                label="商品类型"
                prop="goodsType"
                label-width="150"
            >
                <u-input
                :border="border"
                type="select"
                :select-open="selectShow"
                v-model="model.goodsType"
                placeholder="请选择商品类型"
                @click="selectShow = true"
                ></u-input>
            </u-form-item>
            <u-form-item
                :rightIconStyle="{color: '#888', fontSize: '32rpx'}"
                right-icon="kefu-ermai"
                :label-position="labelPosition"
                label="手机号码"
                prop="phone"
                label-width="150"
            >
                <u-input
                :border="border"
                placeholder="请输入手机号"
                v-model="model.phone"
                type="number"
                ></u-input>
            </u-form-item>
            <u-form-item
                :label-position="labelPosition"
                label="验证码"
                prop="code"
                label-width="150"
            >
                <u-input
                :border="border"
                placeholder="请输入验证码"
                v-model="model.code"
                type="text"
                ></u-input>
                <u-button slot="right" type="success" size="mini" @click="getCode"
                >{{codeTips}}</u-button
                >
            </u-form-item>
            <!-- 此处switch的slot为right，如果不填写slot名，也即<u-switch v-model="model.remember"></u-switch>，将会左对齐 -->
            <u-form-item
                :label-position="labelPosition"
                label="记住密码"
                prop="remember"
                label-width="150"
            >
                <u-switch v-model="model.remember" slot="right"></u-switch>
            </u-form-item>
            <u-form-item
                :label-position="labelPosition"
                label="上传图片"
                prop="photo"
                label-width="150"
            >
                <u-upload width="160" height="160"></u-upload>
            </u-form-item>
        </u-form>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                model: {
                    name: '',//姓名
                    sex: '',//性别
                    likeFruit: '',//水果品种
                    intro: '',//简介
                    payType: '支付宝',//结算方式
                    region: '',//所在地区
                    goodsType: '',//商品类型
                    phone: '',//手机号码
                    code: '',//验证码
                    password: '',//密码
                    rePassword: '',//确认密码
                    remember: false,//记住密码
                    photo: '' //图片
                },
                selectList: [
                    {
                        value: '电子产品',
                        label: '电子产品',
                    },
                    {
                        value: '服装',
                        label: '服装',
                    },
                    {
                        value: '工艺品',
                        label: '工艺品',
                    },
                ],
                rules: {
                    name: [
                        {
                            required: true,
                            message: '请输入姓名',
                            trigger: 'blur',
                        },
                        {
                            min: 3,
                            max: 5,
                            message: '姓名长度在3到5个字符',
                            trigger: ['change', 'blur'],
                        },
                        {
                            // 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
                            validator: (rule, value, callback) => {
                                // 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
                                return this.$u.test.chinese(value)
                            },
                            message: '姓名必须为中文',
                            // 触发器可以同时用blur和change，二者之间用英文逗号隔开
                            trigger: ['change', 'blur'],
                        },
                        // 异步验证，用途：比如用户注册时输入完账号，后端检查账号是否已存在
                        // {
                        // 	trigger: ['blur'],
                        // 	// 异步验证需要通过调用callback()，并且在里面抛出new Error()
                        // 	// 抛出的内容为需要提示的信息，和其他方式的message属性的提示一样
                        // 	asyncValidator: (rule, value, callback) => {
                        // 		this.$u.post('/ebapi/public_api/index').then(res => {
                        // 			// 如果验证出错，需要在callback()抛出new Error('错误提示信息')
                        // 			if(res.error) {
                        // 				callback(new Error('姓名重复'));
                        // 			} else {
                        // 				// 如果没有错误，也要执行callback()回调
                        // 				callback();
                        // 			}
                        // 		})
                        // 	},
                        // }
                    ],
                    sex: [
                        {
                            required: true,
                            message: '请选择性别',
                            trigger: 'change',
                        },
                    ],
                    intro: [
                        {
                            required: true,
                            message: '请填写简介',
                        },
                        {
                            min: 5,
                            message: '简介不能少于5个字',
                            trigger: 'change',
                        },
                        // 正则校验示例，此处用正则校验是否中文，此处仅为示例，因为uView有this.$u.test.chinese可以判断是否中文
                        {
                            pattern: /^[\u4e00-\u9fa5]+$/gi,
                            message: '简介只能为中文',
                            trigger: 'change',
                        },
                    ],
                    likeFruit: [
                        {
                            required: true,
                            message: '请选择您喜欢的水果',
                            trigger: 'change',
                            type: 'array',
                        },
                    ],
                    payType: [
                        {
                            required: true,
                            message: '请选择任意一种支付方式',
                            trigger: 'change',
                        },
                    ],
                    region: [
                        {
                            required: true,
                            message: '请选择地区',
                            trigger: 'change',
                        },
                    ],
                    goodsType: [
                        {
                            required: true,
                            message: '请选择商品类型',
                            trigger: 'change',
                        },
                    ],
                    phone: [
                        {
                            required: true,
                            message: '请输入手机号',
                            trigger: ['change', 'blur'],
                        },
                        {
                            validator: (rule, value, callback) => {
                                // 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
                                return this.$u.test.mobile(value)
                            },
                            message: '手机号码不正确',
                            // 触发器可以同时用blur和change，二者之间用英文逗号隔开
                            trigger: ['change', 'blur'],
                        },
                    ],
                    code: [
                        {
                            required: true,
                            message: '请输入验证码',
                            trigger: ['change', 'blur'],
                        },
                        {
                            type: 'number',
                            message: '验证码只能为数字',
                            trigger: ['change', 'blur'],
                        },
                    ],
                    password: [
                        {
                            required: true,
                            message: '请输入密码',
                            trigger: ['change', 'blur'],
                        },
                        {
                            // 正则不能含有两边的引号
                            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
                            message: '需同时含有字母和数字，长度在6-12之间',
                            trigger: ['change', 'blur'],
                        },
                    ],
                    rePassword: [
                        {
                            required: true,
                            message: '请重新输入密码',
                            trigger: ['change', 'blur'],
                        },
                        {
                            validator: (rule, value, callback) => {
                                return value === this.model.password
                            },
                            message: '两次输入的密码不相等',
                            trigger: ['change', 'blur'],
                        },
                    ],
                },
                border: false,//input 是否显示边框, 默认false
                checkboxList: [
                    {
                        name: '荔枝',
                        checked: false,
                        disabled: false,
                    },
                    {
                        name: '香蕉',
                        checked: false,
                        disabled: false,
                    },
                    {
                        name: '橙子',
                        checked: false,
                        disabled: false,
                    },
                    {
                        name: '草莓',
                        checked: false,
                        disabled: false,
                    },
                ],
                radioList: [
                    {
                        name: '支付宝',
                        checked: true,
                        disabled: false,
                    },
                    {
                        name: '微信',
                        checked: false,
                        disabled: false,
                    },
                    {
                        name: '银联',
                        checked: false,
                        disabled: false,
                    },
                    {
                        name: '现金',
                        checked: false,
                        disabled: false,
                    },
                ],
                radio: '支付宝',
                actionSheetList: [
                    {
                        text: '男',
                    },
                    {
                        text: '女',
                    },
                    {
                        text: '保密',
                    },
                ],
                actionSheetShow: false,
                pickerShow: false,
                selectShow: false,
                radioCheckWidth: 'auto',//radio的宽度，需带单位，如50%，150rpx, 默认auto
                radioCheckWrap: false, //是否每个radio占一行, 默认false
                labelPosition: 'left',//表单域提示文字的位置，left-左侧，top-上方
                codeTips: '',//输入验证码
                errorType: ['message'],//错误的提示方式，数组形式, 可选值为：
                //  message：默认为输入框下方用文字进行提示
                // none：只要包含此值，将不会进行任何提示
                // border-bottom：配置作用域底部的下划线显示为红色
                // border：配置输入框的边框为红色进行提示 -- 如果有配置显示Input组件显示边框的话
                // toast：以"toast"提示的方式弹出错误信息，每次只弹出最前面的那个表单域的错误信息(1.3.5新增)
            }
        },
        methods: {
            // checkbox选择发生变化
            checkboxGroupChange(e) {
                this.model.likeFruit = e;
            },

            // radio选择发生变化
            radioGroupChange(e) {
                this.model.payType = e;
            },

            // 获取验证码
            getCode() {
                if(this.$refs.uCode.canGetCode) {
                    // 模拟向后端请求验证码
                    uni.showLoading({
                        title: '正在获取验证码',
                        mask: true
                    })
                    setTimeout(() => {
                        uni.hideLoading();
                        // 这里此提示会被this.start()方法中的提示覆盖
                        this.$u.toast('验证码已发送');
                        // 通知验证码组件内部开始倒计时
                        this.$refs.uCode.start();
                    }, 2000);
                } else {
                    this.$u.toast('倒计时结束后再发送');
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.wrap {
	padding: 30rpx;
}
</style>

<style scoped>
    /deep/ .items-label .u-form-item-info{
        padding-top: 8rpx;
        align-items: flex-start;
    }

    /deep/ .u-input__input {
        font-size: 32rpx;
    }

    /deep/ .u-checkbox {
        margin: 10rpx;
    }

    /deep/ .u-checkbox__label {
        font-size: 32rpx;
    }
</style>
```

[uview 官网文档传送门-form](https://www.uviewui.com/components/form.html)
