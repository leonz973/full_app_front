### 滚动表格

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/table'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码

```html
<template>
    <view class="test-table  main">
        <p-mui-table @onClick="handleClick" :tableData="tableData" :showSelect="true" :stickCols="2" defaultColWidth="120"
        :columns="columns" :tableHeight="450" :formatFn="formatFn" @scrolltolower="getMore" >
        </p-mui-table>
    </view>
</template>

<script>
    export default {
        data() {
            let this_ = this

            function aqiFn(row, column, cellValue) {
                let color = cellValue > 100 ? '#f00' : ''
                return `<span class='test' style='color: ${color}'>${cellValue}</span>`
            }
            return {
                total: 20,
                pageIndex: 0,
                tableData: [],
                formatFn: function(row, column, cellValue) {
                    if (column.key === 'aqi') {
                        let color = cellValue > 100 ? '#f00' : ''
                        return `<span class='test' style='color: ${color}'>${cellValue}</span>`
                    }
                },
                columns: [
                    {
                        title: '序号',
                        key: 'xh',
                        align: 'center',
                    },
                    {
                        title: '名称',
                        key: 'name',
                        listenerClick: true,
                    },
                    {
                        title: '监测时间',
                        key: 'date',
                        width: 260,
                        align: 'center',
                    },
                    {
                        title: '编码',
                        key: 'code',
                    },
                    {
                        title: '等级',
                        key: 'level',
                        width: 200,
                        align: 'center',
                    },
                    {
                        title: 'AQI',
                        key: 'aqi',
                        sort: true,
                        align: 'right',
                        width: 100,
                        useformatFn: true,
                    },
                    {
                        title: '操作',
                        key: 'code',
                        align: 'center',
                        width: 200,
                        btns: [
                            {
                                template: '<span class="td-icon">查看</span>',
                                handleClick: this_.showDetail,
                                test: '111',
                            },
                            {
                                template: '<span class="td-icon">删除</span>',
                                handleClick: function(row, column) {
                                    uni.showModal({
                                        title: '提示',
                                        content: '是否确定删除此数据？',
                                        success: function(res) {
                                            if (res.confirm) {
                                                this_.delFn()
                                            } else if (res.cancel) {
                                                console.log('用户点击取消')
                                            }
                                        },
                                    })
                                },
                            },
                        ],
                    },
                ],
            }
        },
        mounted() {
            this.getMore()
        },
        methods: {
            getMore() {
                //加载更多
                if (this.tableData.length >= 20) {
                    uni.showToast({
                        title: '没有更多了',
                        icon: 'none',
                    })
                    return
                }
                uni.showLoading()
                this.pageIndex++
                setTimeout(() => {
                    uni.hideLoading()
                    this.tableData = this.tableData.concat([
                        {
                            xh: 1,
                            name: 'xxxxx',
                            date: '2020-01-01 12:05',
                            code: '001',
                            level: '轻度污染',
                            aqi: 120,
                        },
                        {
                            xh: 2,
                            name: 'xxxxy',
                            date: '2020-01-01 12:05',
                            code: '002',
                            level: '轻度污染',
                            aqi: 110,
                        },
                        {
                            xh: 3,
                            name: 'xxxxx',
                            date: '2020-01-01 12:05',
                            code: '001',
                            level: '轻度污染',
                            aqi: 120,
                        },
                        {
                            xh: 4,
                            name: 'xxxxy',
                            date: '2020-01-01 12:05',
                            code: '002',
                            level: '轻度污染',
                            aqi: 110,
                        },
                        {
                            xh: 5,
                            name: 'xxxxx',
                            date: '2020-01-01 12:05',
                            code: '001',
                            level: '良',
                            aqi: 80,
                        },
                        {
                            xh: 6,
                            name: 'xxxxy',
                            date: '2020-01-01 12:05',
                            code: '002',
                            level: '优',
                            aqi: 30,
                        },
                    ])
                }, 500)
            },
            handleClick({ row, col }) {
                //单元格点击事件
                console.log(row, col)
                if (col.title === '名称') {
                //
                }
            },
            showDetail(row, column) {
                //查看按钮
                console.log('查看')
            },
            delFn(row, column) {
                //删除按钮
                console.log('删除')
            }
        }
    }
</script>

<style lang="less">
    .test-table::v-deep .td-icon {
        margin-right: 10rpx;
        color: #1989fa;
    }
</style>

```
