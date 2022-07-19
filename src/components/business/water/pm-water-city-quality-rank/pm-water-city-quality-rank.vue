<!-- @format -->

<!-- 城市水质排名 -->
<template>
    <div class="pm-water-city-quality-rank">
        <div
            class="table-wrap"
            :class="{ blue: mConfig.isBlue, normal: !mConfig.isBlue }"
        >
            <div class="table-wrap-box">
                <u-table class="zy-table1" :border-color="'transparent'">
                    <u-tr class="table-hd">
                        <u-th
                            v-for="(item, index) in mData.columns"
                            :key="index"
                        >
                            <p
                                v-if="!item.isRank"
                                :style="{
                                    width: item.width
                                        ? item.width + 'rpx'
                                        : defaultWidth + 'rpx'
                                }"
                            >
                                {{ item.title }}
                            </p>
                            <p
                                v-else
                                class="paixu"
                                :style="{
                                    width: item.width
                                        ? item.width + 'rpx'
                                        : defaultWidth + 'rpx'
                                }"
                                :class="{
                                    zheng: sortState[item.key + 'Flag'] === 1,
                                    dao: sortState[item.key + 'Flag'] === 2
                                }"
                                @tap="
                                    sortFn(
                                        item.key,
                                        sortState[item.key + 'Flag']
                                    )
                                "
                            >
                                {{ item.title }}
                            </p>
                        </u-th>
                    </u-tr>
                </u-table>
            </div>
            <div v-if="mData.tableData.length !== 0">
                <u-table class="zy-table1" :border-color="'transparent'">
                    <u-tr
                        class="table-bd"
                        v-for="(tr, index) in mData.tableData"
                        :key="index"
                    >
                        <u-td
                            v-for="(td, _index) in mData.columns"
                            :key="_index"
                        >
                            <!-- 插槽 -->
                            <!--  #ifndef MP-WEIXIN   -->
                            <!-- 除了小程序都显示 -->
                            <slot
                                v-if="td.isSlot"
                                :name="td.slotName"
                                :data="{ key: tr[td.key], td, tr }"
                            ></slot>
                            <!--  #endif -->

                            <!--  #ifndef APP-PLUS || H5  -->
                            <!-- 只有小程序都显示 -->
                            <slot
                                name="slot"
                                :data="{ key: tr[td.key], td }"
                                v-if="td.isSlot"
                            ></slot>
                            <!--  #endif -->

                            <div v-if="!td.isSlot">
                                <p
                                    v-if="!td.isRank"
                                    :style="{
                                        width: td.width
                                            ? td.width + 'rpx'
                                            : defaultWidth + 'rpx'
                                    }"
                                >
                                    {{ tr[td.key] }}{{ td.unit ? td.unit : '' }}
                                </p>
                                <p
                                    v-else
                                    :style="{
                                        width: td.width
                                            ? td.width + 'rpx'
                                            : defaultWidth + 'rpx'
                                    }"
                                    :class="{
                                        add: tr[td.key] > 0 && td.isColor,
                                        reduce: tr[td.key] < 0 && td.isColor
                                    }"
                                >
                                    {{ tr[td.key] }}{{ td.unit ? td.unit : '' }}
                                </p>
                            </div>
                        </u-td>
                    </u-tr>
                </u-table>
            </div>

            <!-- 无数据显示 -->
            <div v-else class="empty">
                <p-mui-stateless-no-message
                    :data="dataImg"
                ></p-mui-stateless-no-message>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pm-water-city-quality-rank',
    props: {
        data: {
            type: Object,
            default: () => {
                return {
                    tableData: [], //表格数据
                    columns: [] //表头配置
                };
            }
        },
        config: {
            type: Object,
            default: () => {
                return {
                    isBlue: false //表格换肤：true是蓝色
                };
            }
        }
    },
    data() {
        return {
            sortState: {
                //排序状态  1为升序 2为降序
            },
            defaultWidth: '80',
            dataImg: {
                imgSrc: require('../../images/empty.png')
            },
            originalData: {}
        };
    },
    mounted() {
        this.init();
    },
    computed: {
        mData() {
            return Object.assign(
                {
                    tableData: [], //表格数据
                    columns: [] //表头配置
                },
                this.originalData
            );
        },
        mConfig() {
            return Object.assign(
                {
                    isBlue: false //表格换肤：true是蓝色
                },
                this.config
            );
        }
    },
    methods: {
        init() {
            this.originalData = JSON.parse(JSON.stringify(this.data));
            this.mData.columns.forEach((item) => {
                let obj = {
                    [item.key + 'Flag']: 0
                };
                this.sortState = Object.assign(this.sortState, obj);
            });
            this.originalData.tableData = this.originalData.tableData.map(
                (item, index) => {
                    item.rankNum = index + 1;
                    return item;
                }
            );
        },
        //排序
        sortFn(t, n) {
            for (let i in this.sortState) {
                this.sortState[i] = 0;
            }

            let f =
                n == 0
                    ? (this.sortState[t + 'Flag'] = 1)
                    : n == 1
                    ? (this.sortState[t + 'Flag'] = 2)
                    : (this.sortState[t + 'Flag'] = 0);
            let point = f ? t : 'rankNum';
            this.mData.tableData = this.mData.tableData.sort((a, b) => {
                let x = n ? Number(b[point]) : Number(a[point]);
                let y = n ? Number(a[point]) : Number(b[point]);
                return x < y
                    ? f == 0
                        ? 1
                        : -1
                    : x > y
                    ? f == 0
                        ? -1
                        : 1
                    : 0;
            });
        }
    }
};
</script>

<style lang="less" scoped>
.pm-water-city-quality-rank {
    // background-color: #fff;
    .table-wrap {
        // padding: 0 24.1545rpx;

        /*  #ifdef  MP-WEIXIN  */
        /* 仅在微信显示 */
        // & > view:first-child {
        //     padding-bottom: 0;
        // }

        // & > view {
        //     padding: 0 24rpx 40rpx;
        // }
        /*  #endif  */

        /*  #ifdef  APP-PLUS || H5   */
        /* 仅在app平台显示 */
        & > div:last-child .zy-table1 {
            padding-bottom: 40rpx;
        }
        /*  #endif  */

        .zy-table1 {
            width: 100%;

            .u-th {
                // height: 72.4638rpx;
                font-size: 28rpx;
                color: #333;
                font-weight: 700;
                box-sizing: border-box;
                p {
                    font-weight: 700;
                    display: inline-block;
                    // padding-right: 24.1545rpx;
                    line-height: 72.4638rpx;
                    font-size: 28rpx;
                    color: #333;
                    margin: auto;
                }
            }

            .u-td {
                // height: 72.4638rpx;
                font-size: 28rpx;
                color: #333;
                text-align: center;
                p {
                    display: inline-block;
                    // line-height: 72.4638rpx;
                    font-size: 28rpx;
                    color: #333;
                    margin: auto;
                    // padding-right: 24rpx;
                    &.add {
                        color: #e64d4a;
                    }
                    &.reduce {
                        // color: #24af35;
                        color: #333;
                    }
                }
            }
        }
    }
}

/*  #ifdef  APP-PLUS || H5   */
/* 仅在app平台显示 */

/* 默认 */
.table-wrap.normal {
    .table-bd {
        &:nth-of-type(2n-1) {
            .u-td {
                background-color: #f7f7f7 !important;
            }
        }
    }

    .u-tr {
        margin: 0 24rpx;
    }
}

/* 蓝色 */
.table-wrap.blue {
    .table-bd {
        &:nth-of-type(2n-1) {
            .u-td {
                background-color: transparent;
            }
        }
    }
    // 表头
    .table-wrap-box {
        .zy-table1 {
            border-bottom: 2rpx solid #ededed;
            .table-hd {
                .u-th {
                    background-color: #f0f9ff;
                }
            }
        }
    }
    // 身体
    .zy-table1 {
        .table-bd {
            border-bottom: 2rpx dashed #e0e0e0;
        }
    }
}

/*  #endif  */

/*  #ifdef  MP-WEIXIN  */
/* 仅在微信显示 */

/* 默认 */
.table-wrap.normal {
    & > view:first-child {
        padding-bottom: 0;
    }

    & > view {
        padding: 0 24rpx 40rpx;
    }
}

/* 蓝色 */
.table-wrap.blue {
    & > view:first-child {
        padding-bottom: 0;
    }

    & > view {
        padding: 0 0 40rpx;
    }
}

/*  #endif  */
</style>

<style>
/*  #ifdef  MP-WEIXIN  */
/* 仅在微信显示 */
/* 默认 */
.table-wrap.normal .zy-table1 u-tr.table-bd:nth-of-type(2n-1) u-td {
    background-color: #f7f7f7 !important;
}

/* 蓝色 */
.table-wrap.blue .zy-table1 u-tr.table-bd u-td {
    background-color: transparent;
    border-bottom: 2rpx dashed #e0e0e0;
}

.table-wrap.blue .zy-table1 u-tr u-th {
    background-color: #f0f9ff;
    border-bottom: 2rpx solid #ededed;
}

.table-wrap.blue .zy-table1 u-tr u-th view,
.table-wrap.blue .zy-table1 u-tr u-td view {
    margin: auto;
}
/*  #endif  */

/*  #ifdef  MP-WEIXIN  */
/* 仅在微信显示 */
.zy-table1 u-td > view .add {
    color: #e64d4a;
}

.zy-table1 u-td > view .reduce {
    color: #333;
}
/*  #endif  */

.paixu {
    background: url(./image/paixu1.png) right center no-repeat;
    background-size: 15.7005rpx;
}
.paixu.zheng {
    background-image: url(./image/paixu2.png);
}
.paixu.dao {
    background-image: url(./image/paixu3.png);
}

.empty {
    background-color: #f4f5f6;
}
</style>
