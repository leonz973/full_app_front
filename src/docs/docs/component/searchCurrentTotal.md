### SearchCurrentTotal  当期、累计搜索

<div class="business-model">
    <iframe :src="$themeConfig.url+'/views/business/search/searchCurrentTotal'" style="border:none;width:280px;height:100%"></iframe>
</div>

```html
<template>
  <view>
    <!-- 当期、累计搜索  src/components/business/search/pm-search-current-total/pm-search-current-total.vue -->
    <pm-search-current-total  @confirm="monthConfirm" @typeChange="typeChange">

    </pm-search-current-total>
  </view>
</template>

<script>
export default {
  name: 'searchCurrentTotal',
  data() {
    return {
      date: '', //日期
      year: '', //年
      month: '', //月
      type: '', //当期、累计
    }
  },
  created() {},
  methods: {

    // 当期、累计切换
    typeChange(val) {
      this.type = val
    },

    // 日期选择
    monthConfirm(obj) {
        this.date = obj.time
        this.year = obj.year
        this.month = obj.month
    },
  },
}
</script>

<style lang="less" scoped></style>


```