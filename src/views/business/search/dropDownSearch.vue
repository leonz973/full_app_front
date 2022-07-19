<!-- @format -->

<template>
    <div class="dropDownSearch">
        <view>
            <!-- 下拉搜索  src/components/business/search/pm-search-drop-down/pm-search-drop-down.vue -->
            <pm-search-drop-down
                :data="data"
                :config="config"
                @dropChange="dropChange"
                @dateConfirm="dateConfirm"
                @selectedChange="selectedChange"
            >
                <div class="custom">
                    <div
                        class="buttons"
                        :class="{ on: type == 'DQ' }"
                        @click="handleType('DQ')"
                    >
                        当期
                    </div>
                    <div
                        class="buttons"
                        :class="{ on: type == 'LJ' }"
                        @click="handleType('LJ')"
                    >
                        累计
                    </div>
                    <!-- <u-button
                        type="primary"
                        size="medium"
                        :class="{ on: type == 'DQ' }"
                        @click="handleType('DQ')"
                        >当期</u-button
                    >

                    <u-button
                        type="primary"
                        size="medium"
                        :class="{ on: type == 'LJ' }"
                        @click="handleType('LJ')"
                        >累计</u-button
                    >-->
                </div>
            </pm-search-drop-down>

            <p-mui-wrapper :title="'城市河流水质及优良率对比'">
                <pm-water-river-quality-good
                    :data="dataWater"
                ></pm-water-river-quality-good>
            </p-mui-wrapper>
        </view>
    </div>
</template>

<script>
export default {
    name: 'dropDownSearch',
    data() {
        return {
            dataWater: {
                riverQuality: [] // 河流水质及优良率数据
            },
            data: {
                title: [], //下拉框名称，或选中数据名称,可传空
                dropOption: [], //下拉框数据
                selectList: [],
                childComponents: ['date', 'select', 'custom'] //显示哪些筛选方式
            },
            config: {
                isDefaultFirst: true //是否默认选中第一个选项
            },
            date: '', //日期
            year: '', //年
            month: '', //月
            type: 'DQ', //插槽中的按钮选中值
            dropVal: [], //drop选中值
            selectedVal: null //列选择器选中值
        };
    },
    mounted() {
        this.searchData();
    },
    methods: {
        // 搜索下拉框数据
        searchData() {
            let options1 = [
                {
                    label: '默认排序',
                    value: 1
                },
                {
                    label: '距离优先',
                    value: 2
                },
                {
                    label: '价格优先',
                    value: 3
                }
            ];
            let options2 = [
                {
                    label: '去冰',
                    value: 1
                },
                {
                    label: '加冰',
                    value: 2
                }
            ];

            // //下拉框名称，或选中数据名称，可传空
            this.data.title = ['距离', '温度'];
            // 下拉框数据
            this.data.dropOption = [options1, options2];
            // 列选择数据
            this.data.selectList = [
                {
                    value: '1',
                    label: '国控'
                },
                {
                    value: '2',
                    label: '省控'
                },
                {
                    value: '3',
                    label: '市控'
                }
            ];
        },

        // 下拉选中变化
        dropChange(titles, value, index) {
            // 如果要把选中项展示出来就进行这一步
            this.data.title[index] = titles;

            // 选中值
            this.dropVal[index] = value;
        },

        // 日期选择
        dateConfirm(obj) {
            this.date = obj.time;
            this.year = obj.year;
            this.month = obj.month;
        },

        // select 列选择器选中值变化
        selectedChange(e) {
            this.selectedVal = e;
        },

        // 按钮当期、累计
        handleType(v) {
            this.type = v;
        }
    }
};
</script>

<style lang="less" scoped>
.custom {
    display: flex;
    float: right;
    .buttons {
        padding: 10rpx 40rpx;
        border: 1px solid #dddddd;
        border-radius: 50rpx;
        color: #666666;
        &:first-child {
            margin-right: 18rpx;
        }
        &.on {
            border-color: #167cf1;
            background-color: #167cf1;
            color: #fff;
        }
    }
}
</style>

<style>
.dropDownSearch /deep/ .custom-box {
    flex: 1;
}
</style>
