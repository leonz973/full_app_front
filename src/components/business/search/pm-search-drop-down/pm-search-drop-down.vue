<!-- @format -->

<template>
    <div class="pm-search-drop-down">
        <div class="select">
            <!-- 日期选择 -->
            <div
                class="date-ipt"
                readonly
                style="margin-right: 50rpx"
                @click="visible = true"
                v-if="mData.childComponents.includes('date')"
            >
                {{ timeData }}
                <u-icon
                    name="arrow-down"
                    class="arrow-down"
                    size="26"
                    color="#C6C6C9"
                ></u-icon>
            </div>

            <!-- 下拉选择 -->
            <div
                class="drop-down-box"
                v-if="mData.childComponents.includes('drop')"
            >
                <u-dropdown @open="menuOpen">
                    <u-dropdown-item
                        v-for="(item, index) in mData.dropOption"
                        :key="index"
                        v-model="droped[index]"
                        :title="mData.title[index]"
                        :options="item"
                        @change="change"
                    ></u-dropdown-item>
                </u-dropdown>
            </div>

            <!-- 列选择器 -->
            <div
                class="select-box date-ipt"
                readonly
                style="margin-right: 50rpx"
                @click="selectShow = true"
                v-if="mData.childComponents.includes('select')"
            >
                {{ selectedLabel }}
                <u-icon
                    name="arrow-down"
                    class="arrow-down"
                    size="26"
                    color="#C6C6C9"
                ></u-icon>
            </div>

            <!-- 插槽 -->
            <div
                v-if="mData.childComponents.includes('custom')"
                class="custom-box"
            >
                <slot></slot>
            </div>
        </div>

        <!-- 日期选择框 -->
        <u-select
            v-model="visible"
            mode="mutil-column"
            :default-value="value"
            :list="dateList"
            @confirm="dateConfirm"
            @cancel="dateCancel"
        ></u-select>
        <!-- <div class="uni-picker-container" v-show="visible">
            <div class="uni-mask"></div>
            <div class="uni-picker uni-picker-toggle">
                <div class="uni-picker-header">
                    <div
                        @click="dateCancel"
                        class="uni-picker-action uni-picker-action-cancel"
                    >
                        取消
                    </div>
                    <div
                        @click="dateConfirm"
                        class="uni-picker-action uni-picker-action-confirm"
                    >
                        确定
                    </div>
                </div>

                <div class="uni-picker-content">
                    <picker-view
                        :indicator-style="indicatorStyle"
                        :value="value"
                        @change="bindChange"
                        class="picker-view"
                    >
                        <picker-view-column>
                            <view
                                class="p-mui-date-picker-item"
                                v-for="(item, index) in years"
                                :key="index"
                                >{{ item }}年</view
                            >
                        </picker-view-column>
                        <picker-view-column>
                            <view
                                class="p-mui-date-picker-item"
                                v-for="(item, index) in months"
                                :key="index"
                                >{{ item }}月</view
                            >
                        </picker-view-column>
                    </picker-view>
                </div>
            </div>
        </div> -->

        <!-- select选择框 -->
        <u-select
            v-model="selectShow"
            :default-value="selectedIndex"
            :list="mData.selectList"
            @confirm="selectConfirm"
            @cancel="selectCancel"
        ></u-select>
        <!-- <div class="uni-picker-container" v-show="selectShow">
            <div class="uni-mask"></div>
            <div class="uni-picker uni-picker-toggle">
                <div class="uni-picker-header">
                    <div
                        @click="selectCancel"
                        class="uni-picker-action uni-picker-action-cancel"
                    >
                        取消
                    </div>
                    <div
                        @click="selectConfirm"
                        class="uni-picker-action uni-picker-action-confirm"
                    >
                        确定
                    </div>
                </div>

                <div class="uni-picker-content">
                    <picker-view
                        :indicator-style="indicatorStyle"
                        :value="selectedIndex"
                        @change="selectBindChange"
                        class="picker-view"
                    >
                        <picker-view-column>
                            <view
                                class="p-mui-date-picker-item"
                                v-for="(item, index) in mData.selectList"
                                :key="index"
                                >{{ item.label }}</view
                            >
                        </picker-view-column>
                    </picker-view>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'pm-search-drop-down',
    props: {
        data: {
            title: [], //下拉框名称，或选中数据名称
            dropOption: [], //下拉框数据
            selectList: [], //列选择数据
            childComponents: ['date', 'select'] //显示哪些筛选方式 date:日期, drop:下拉, custom:插槽, select:列选择器
        },
        config: {
            isDefaultFirst: true //是否默认选中第一个选项
        }
    },
    data() {
        const date = new Date();
        const years = [];
        const year = date.getFullYear();
        const months = [];
        const month = date.getMonth() + 1;

        for (let i = 1990; i <= date.getFullYear(); i++) {
            years.push({ label: i + '年', value: i });
        }
        for (let i = 1; i <= 12; i++) {
            months.push({ label: i + '月', value: i });
        }
        return {
            timeData: '', //显示出的日期
            visible: false, //日期选择弹窗显示与隐藏
            indicatorStyle: `height: 50px;`,
            years,
            year,
            months,
            month,
            dateList: [years, months],
            value: [year, month - 1],
            droped: [], //选中数据
            isfirst: true, //判断是否是第一次数据变化
            selectShow: false, //用于控制组件的弹出与收起
            selectedIndex: [0],
            selectedLabel: '国控', //选中列数据名
            selectedNow: 1 //选中列数据值
        };
    },

    watch: {
        mData() {
            // 如果是第一次 根据条件判断是否 默认选中第一个选项
            if (this.isfirst) {
                if (this.mConfig.isDefaultFirst) {
                    if (this.mData.childComponents.includes('drop')) {
                        this.mData.dropOption.forEach((item, index) => {
                            this.index = index;
                            this.change(item[0].value);
                        });
                    }
                    if (this.mData.childComponents.includes('date')) {
                        this.dateConfirm([
                            this.dateList[0][this.years.length - 1],
                            this.dateList[1][this.month - 1]
                        ]);
                    }

                    if (this.mData.childComponents.includes('select')) {
                        console.log(this.mData.selectList[0]);
                        this.selectConfirm([this.mData.selectList[0]]);
                    }
                }
                this.isfirst = false;
            }
        }
    },

    computed: {
        mData() {
            return Object.assign(
                {
                    title: [], //下拉框名称
                    dropOption: [],
                    selectList: [], //列选择数据
                    childComponents: ['date', 'drop'] //显示那些筛选方式
                },
                this.data
            );
        },
        mConfig() {
            return Object.assign(
                {
                    isDefaultFirst: true //是否默认选中第一个选项
                },
                this.config
            );
        }
    },
    mounted() {},
    methods: {
        // 日期选择
        // bindChange: function (e) {
        //     console.log('eee', e);
        //     const val = e.detail.value;
        //     this.year = this.years[val[0]];
        //     this.month = this.months[val[1]];
        // },

        // 日期
        dateConfirm(e) {
            // console.log(e);

            this.visible = false;
            this.year = e[0].value;
            this.month = e[1].value;
            this.years.forEach((item, index) => {
                if (item.value === this.year) {
                    this.value[0] = index;
                }
            });
            this.value[1] = this.month - 1;

            let t = new Date(this.year, this.month - 1);
            let format = 'YYYY-MM-DD';
            let dateStr = this.$dayjs(t).format(format);

            this.timeData = this.year + '年' + this.month + '月';

            this.$emit('dateConfirm', {
                time: dateStr,
                year: this.year,
                month: this.month
            });
        },

        // uni
        // dateConfirm() {
        //     this.visible = false;
        //     let t = new Date(this.year, this.month - 1);
        //     let format = 'YYYY-MM-DD';
        //     let dateStr = this.$dayjs(t).format(format);

        //     this.timeData = this.year + '年' + this.month + '月';

        //     this.$emit('dateConfirm', {
        //         time: dateStr,
        //         year: this.year,
        //         month: this.month
        //     });
        // },

        // 日期
        dateCancel() {
            this.visible = false;
            // this.$emit('cancel');
        },

        // 日期转为时间戳
        getMillisecond(date) {
            return new Date(date).getTime();
        },

        // 下拉选择点击
        menuOpen(e) {
            this.index = e;
        },

        // 下拉选中变化
        change(value) {
            this.droped[this.index] = value;
            let dropTitle = '';
            this.mData.dropOption[this.index].forEach((item) => {
                if (item.value == value) {
                    dropTitle = item.label;
                }
            });

            this.$emit('dropChange', dropTitle, value, this.index);
        },

        // selectBindChange(e) {
        //     this.selectedIndex = e.detail.value;
        // },

        // 列选择器 uni
        // selectConfirm() {
        //     this.selectedLabel = '';
        //     this.selectedNow = null;
        //     this.mData.selectList.forEach((val, index) => {
        //         if (index == this.selectedIndex[0]) {
        //             this.selectedLabel = val.label;
        //             this.selectedNow = val.value;
        //         }
        //     });

        //     this.selectShow = false;
        //     this.$emit('selectedChange', this.selectedNow);
        // },

        // uview方法
        selectConfirm(e) {
            this.selectedLabel = '';
            this.selectedNow = null;
            e.map((val, index) => {
                this.selectedLabel +=
                    this.selectedLabel == '' ? val.label : '-' + val.label;
                this.selectedNow = val.value;
            });
            let idx = [];
            this.mData.selectList.forEach((val, index) => {
                if (val.value === this.selectedNow) {
                    idx[0] = index;
                }
            });

            this.selectedIndex = idx;

            this.$emit('selectedChange', this.selectedNow);
        },

        // 列选择器关闭
        selectCancel() {
            console.log('11');
            this.selectShow = false;
            // this.$emit('selectCancel');
        }
    }
};
</script>

<style lang="less" scoped>
.pm-search-drop-down {
    background-color: #fff;
    padding: 12rpx 30rpx;
    border-bottom: 1px solid #dedede;

    .select {
        overflow: hidden;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        .date-ipt {
            position: relative;
            display: inline-block;
            color: #333;
            font-size: 32rpx;
            line-height: 60rpx;
            .arrow-down {
                position: absolute;
                right: -30rpx;
                top: 20rpx;
            }
        }
        .drop-down-box {
            flex: 1;
            display: inline-block;
        }

        .select-box {
            width: auto;
            height: 60rpx;
        }
    }

    // .uni-picker-container {
    //     display: block;
    //     &[hidden] {
    //         display: none;
    //     }
    //     .uni-mask {
    //         z-index: 9;
    //         position: absolute;
    //         top: 0;
    //         left: 0;
    //         bottom: 0;
    //         width: 100%;
    //         background: rgba(0, 0, 0, 0.1);
    //     }

    //     .uni-picker-header {
    //         display: block;
    //         position: relative;
    //         text-align: center;
    //         width: 100%;
    //         height: 90rpx;
    //         background-color: #fff;
    //         border-bottom: 1px solid #e5e5e5;
    //     }
    //     .uni-picker-action {
    //         display: block;
    //         max-width: 50%;
    //         top: 0;
    //         height: 100%;
    //         box-sizing: border-box;
    //         padding: 0 28rpx;
    //         font-size: 34rpx;
    //         line-height: 90rpx;
    //         overflow: hidden;
    //         cursor: pointer;
    //     }
    //     .uni-picker-action-cancel {
    //         float: left;
    //         color: #888;
    //     }
    //     .uni-picker-action-confirm {
    //         float: right;
    //         color: #007aff;
    //     }

    //     .uni-picker {
    //         position: absolute;
    //         bottom: 0;
    //         left: 0;
    //         z-index: 99;
    //         background: #fff;
    //     }

    //     .picker-view {
    //         width: 750rpx;
    //         height: 600rpx;
    //         margin-top: 20rpx;

    //         .p-mui-date-picker-item {
    //             align-items: center;
    //             justify-content: center;
    //             text-align: center;
    //             display: flex;
    //         }
    //     }
    // }
}
</style>

<style>
.pm-search-drop-down /deep/ .u-dropdown__menu__item__text {
    font-size: 32rpx !important;
    color: #333 !important;
}

.pm-search-drop-down /deep/ .u-dropdown__content {
    position: fixed;
    top: 200rpx !important;
    left: 0;
    right: 0;
    z-index: 999;
}
</style>
