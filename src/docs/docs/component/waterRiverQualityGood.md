### WaterRiverQualityGood  城市河流水质及优良率对比

<div class="business-model">
    <iframe :src="$themeConfig.url+'/views/business/water/waterRiverQualityGood'" style="border:none;width:280px;height:100%"></iframe>
</div>

```html

<template>
  <view>
      <!-- 城市河流水质及优良率对比  src/components/business/water/pm-water-river-quality-good/pm-water-river-quality-good.vue -->
      <p-mui-wrapper :title="'城市河流水质及优良率对比'">
            <pm-water-river-quality-good
                :data="data"
            ></pm-water-river-quality-good>
        </p-mui-wrapper>
  </view>
</template>

<script>
export default {
  name: 'waterRiverQualityGood',
  data () {
    return {
        data:{
           riverQuality:[] // 河流水质及优良率数据
        }
    }
  },
  mounted () {
      this.getRiverData()
  },
  methods: {
    //   获取数据
      getRiverData(){
         let data=[
              {
                  areaName:'思明',//所属行政区
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
                  areaName:'湖里',//所属行政区
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
                  areaName:'集美',//所属行政区
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

           this.data.riverQuality=data
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

| 参数名       | 简介                 | 类型  | 备注           |
| ------------ | -------------------- | ----- | -------------- |
| riverQuality | 河流水质及优良率数据 | Array | 必传，默认为空 |
