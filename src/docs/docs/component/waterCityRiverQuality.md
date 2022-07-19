### WaterCityRiverQuality  城市河流水质

<div class="business-model">
    <iframe :src="$themeConfig.url+'/views/business/water/WaterCityRiverQuality'" style="border:none;width:280px;height:100%"></iframe>
</div>

```html
<template>
    <view class='waterCityRiverQuality'>
        <!-- 城市河流水质  src/components/business/water/pm-water-city-river-quality/pm-water-city-river-quality.vue -->
        <p-mui-wrapper :title="'城市河流水质'">
            <pm-water-city-river-quality
                :data="data"
            ></pm-water-city-river-quality>
        </p-mui-wrapper>
    </view>
</template>

<script>
export default {
    name: 'waterCityRiverQuality',
    data () {
        return {
            data:{
                cityRiverQuality:[] // 河流水质及优良率数据
            }
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData(){
            let data=[
                {
                    areaName:'城市1',//所属行政区
                    oneTotal:'4',//一类个数
                    oneRate:'10',//一类比例
                    twoTotal:'5',//二类个数
                    twoRate:'13',//二类比例
                    threeTotal:'14',//三类个数
                    threeRate:'25',//三类比例
                    fourTotal:'4',//四类个数
                    fourRate:'10',//四类比例
                    fiveTotal:'15',//五类个数
                    fiveRate:'26',//五类比例
                    badFiveTotal:'3',//劣五类个数
                    badFiveRate:'8',//劣五类比例
                },
                {
                    areaName:'城市2',//所属行政区
                    oneTotal:'15',//一类个数
                    oneRate:'10',//一类比例
                    twoTotal:'10',//二类个数
                    twoRate:'5',//二类比例
                    threeTotal:'14',//三类个数
                    threeRate:'8',//三类比例
                    fourTotal:'7',//四类个数
                    fourRate:'4',//四类比例
                    fiveTotal:'16',//五类个数
                    fiveRate:'26',//五类比例
                    badFiveTotal:'2',//劣五类个数
                    badFiveRate:'1',//劣五类比例
                },
                {
                    areaName:'城市3',//所属行政区
                    oneTotal:'25',//一类个数
                    oneRate:'30',//一类比例
                    twoTotal:'20',//二类个数
                    twoRate:'27',//二类比例
                    threeTotal:'14',//三类个数
                    threeRate:'16',//三类比例
                    fourTotal:'8',//四类个数
                    fourRate:'10',//四类比例
                    fiveTotal:'16',//五类个数
                    fiveRate:'26',//五类比例
                    badFiveTotal:'2',//劣五类个数
                    badFiveRate:'1',//劣五类比例
                },
            ]

            this.data.cityRiverQuality=data
        }
    }
}
</script>

<style lang="less" scoped>
</style>

```

### props 参数
| 参数名 | 简介 | 类型   |
| ------ | ---- | ------ |
| data   | 数据 | Object |

#### data

| 参数名           | 简介         | 类型  | 备注           |
| ---------------- | ------------ | ----- | -------------- |
| cityRiverQuality | 城市河流水质 | Array | 必传，默认为空 |
