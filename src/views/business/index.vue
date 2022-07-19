<!-- @format -->

<template>
    <view class="main">
        <u-cell-group title="空气组件">
            <u-cell-item
                icon="actionSheet"
                title="实时空气质量"
                @click="jump('air/airCurrentQuality')"
            ></u-cell-item>
            <u-cell-item
                icon="actionSheet"
                title="空气质量预报"
                @click="jump('air/airQualityForecast')"
            ></u-cell-item>
            <u-cell-item
                icon="actionSheet"
                title="过去24小时变化趋势"
                @click="jump('air/airLastHoursChange')"
            ></u-cell-item>
            <u-cell-item
                icon="actionSheet"
                title="考核"
                @click="jump('air/airCheck')"
            ></u-cell-item>
            <!-- <u-cell-item icon="actionSheet" title="空气地图" @click="jump('airMap')"></u-cell-item>	 -->
            <u-cell-item
                icon="actionSheet"
                title="空气质量日历"
                @click="jump('air/airQualityCalendar')"
            ></u-cell-item>
        </u-cell-group>
        <u-cell-group title="水组件">
            <u-cell-item
                icon="actionSheet"
                title="城市河流水质及优良率对比"
                @click="jump('water/waterRiverQualityGood')"
            ></u-cell-item>
            <u-cell-item
                icon="actionSheet"
                title="城市河流水质"
                @click="jump('water/waterCityRiverQuality')"
            ></u-cell-item>
            <u-cell-item
                icon="actionSheet"
                title="断面水质类别"
                @click="jump('water/waterFractureSurface')"
            ></u-cell-item>
            <u-cell-item
                icon="actionSheet"
                title="城市水质排名"
                @click="jump('water/waterCityQualityRank')"
            ></u-cell-item>
        </u-cell-group>
        <u-cell-group title="搜索">
            <u-cell-item
                icon="actionSheet"
                title="当期、累计搜索"
                @click="jump('search/searchCurrentTotal')"
            ></u-cell-item>
            <u-cell-item
                icon="actionSheet"
                title="下拉搜索"
                @click="jump('search/dropDownSearch')"
            ></u-cell-item>
        </u-cell-group>
        <u-cell-group title="列表">
            <u-cell-item
                icon="actionSheet"
                title="卡片列表（例子）"
                @click="jump('list/listCard')"
            ></u-cell-item>
            <u-cell-item
                icon="actionSheet"
                title="表单列表（例子）"
                @click="jump('list/listFromCard')"
            ></u-cell-item>
        </u-cell-group>
    </view>
</template>

<script>
export default {
    name: 'index',
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
