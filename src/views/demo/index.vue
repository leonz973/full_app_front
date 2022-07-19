<!-- @format -->

<template>
    <view class="main">
        <u-cell-group title="基础组件">
            <u-cell-item
                icon="button"
                title="按钮"
                @click="jump('pages/button')"
            ></u-cell-item>
            <u-cell-item
                icon="icon"
                title="字体图标"
                @click="jump('pages/icon')"
            ></u-cell-item>
            <u-cell-item
                icon="Layout"
                title="Layout 布局"
                @click="jump('pages/layout')"
            ></u-cell-item>
            <u-cell-item
                icon="cell"
                title="Cell 单元格"
                @click="jump('pages/cell')"
            ></u-cell-item>
            <u-cell-item
                icon="badge"
                title="Badge 徽标数"
                @click="jump('pages/badge')"
            ></u-cell-item>
            <u-cell-item
                icon="tag"
                title="tag 标签"
                @click="jump('pages/tag')"
            ></u-cell-item>
            <u-cell-item
                icon="tag"
                title="搜索"
                @click="jump('pages/search')"
            ></u-cell-item>
            <u-cell-item
                title="wrapper"
                @click="jump('pages/wrapper')"
            ></u-cell-item>
            <u-cell-item
                icon="grid"
                title="底部导航栏"
                @click="jump('pages/tabBar')"
            ></u-cell-item>
        </u-cell-group>
        <u-cell-group title="表单组件">
            <u-cell-item
                icon="radio"
                title="Radio 单选框"
                @click="jump('pages/radio')"
            ></u-cell-item>
            <u-cell-item
                icon="checkbox"
                title="Checkbox 多选框"
                @click="jump('pages/checkbox')"
            ></u-cell-item>
            <u-cell-item
                icon="form"
                title="Input 输入框"
                @click="jump('pages/input')"
            ></u-cell-item>
            <u-cell-item
                icon="textarea"
                title="Textarea 输入框"
                @click="jump('pages/textarea')"
            ></u-cell-item>
            <u-cell-item
                icon="select"
                title="Select 列选择器"
                @click="jump('pages/select')"
            ></u-cell-item>
            <u-cell-item
                icon="switch"
                title="Switch 开关选择器"
                @click="jump('pages/switch')"
            ></u-cell-item>
            <u-cell-item
                icon="slider"
                title="Slider 滑动选择器"
                @click="jump('pages/slider')"
            ></u-cell-item>
            <u-cell-item
                icon="calendar1"
                title="Calendar 日历"
                @click="jump('pages/calendar')"
            ></u-cell-item>
            <u-cell-item
                icon="calendar1"
                title="时间选择"
                @click="jump('pages/datePicker')"
            ></u-cell-item>
            <u-cell-item
                icon="upload"
                title="Upload 上传"
                @click="jump('pages/upload')"
            ></u-cell-item>
            <u-cell-item
                icon="rate"
                title="Rate 评分"
                @click="jump('pages/rate')"
            ></u-cell-item>
            <u-cell-item
                icon="form"
                title="Form 表单"
                @click="jump('pages/form')"
            ></u-cell-item>
        </u-cell-group>
        <u-cell-group title="数据组件">
            <u-cell-item
                icon="order"
                title="列表"
                @click="jump('pages/card')"
            ></u-cell-item>
            <u-cell-item
                icon="list"
                title="表格"
                @click="jump('pages/utable')"
            ></u-cell-item>
            <u-cell-item
                icon="list"
                title="滚动表格"
                @click="jump('pages/table')"
            ></u-cell-item>
            <u-cell-item
                icon="coupon"
                title="树形"
                @click="jump('pages/tree')"
            ></u-cell-item>
        </u-cell-group>

        <u-cell-group title="反馈组件">
            <u-cell-item
                icon="actionSheet"
                title="ActionSheet 操作菜单"
                @click="jump('pages/actionsheet')"
            ></u-cell-item>
            <u-cell-item
                icon="modal"
                title="Modal 模态框"
                @click="jump('pages/modal')"
            ></u-cell-item>
        </u-cell-group>
        <u-cell-group title="无状态组件">
            <u-cell-item
                icon="actionSheet"
                title="暂无数据"
                @click="jump('pages/statelessNoMessage')"
            ></u-cell-item>
        </u-cell-group>
        <u-cell-group title="提示性组件">
            <u-cell-item
                icon="actionSheet"
                title="提交成功"
                @click="jump('pages/popCommit')"
            ></u-cell-item>
            <u-cell-item
                icon="actionSheet"
                title="填写意见"
                @click="jump('pages/popReason')"
            ></u-cell-item>
            <u-cell-item
                icon="actionSheet"
                title="确认"
                @click="jump('pages/popNotarize')"
            ></u-cell-item>
            <u-cell-item
                icon="actionSheet"
                title="说明"
                @click="jump('pages/popExplain')"
            ></u-cell-item>
        </u-cell-group>
    </view>
</template>

<script>
import { getBar } from '@/api/api.js';
export default {
    mounted() {
        // getBar().then(res=>{
        // 	console.log(res);
        // })
    },
    methods: {
        jump(url) {
            uni.navigateTo({
                url: url
            });
        }
    }
};
</script>

<style></style>
