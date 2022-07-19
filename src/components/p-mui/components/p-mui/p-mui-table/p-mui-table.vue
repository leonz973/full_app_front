<!-- @format -->

<template>
    <view class="p-mui-table">
        <view class="p-mui-table-main" :style="compluteHeight">
            <scroll-view
                class="p-mui-table-container"
                scroll-y
                scroll-x
                @scrolltolower="scrolltolower"
            >
                <view class="p-mui-table-pack">
                    <view class="p-mui-table-title">
                        <view
                            class="p-mui-table-title-item"
                            :class="{
                                'p-mui-table-stick-side':
                                    stickCols && index < stickCols
                            }"
                            :style="{
                                width: item.width
                                    ? item.width + 'rpx'
                                    : defaultColWidth + 'rpx',
                                left: getStickLeft(index)
                            }"
                            v-for="(item, index) in columns"
                            :key="index"
                            @click="sort(item.key, index)"
                        >
                            <view
                                v-if="
                                    showSelect && !singleSelect && index === 0
                                "
                                class="select-box"
                                :class="{ selected: selectAll }"
                                @click="doSelect(true)"
                            >
                                <!-- <view :class="['select-tip', {'selected': selectAll}]"></view> -->
                                <u-icon
                                    name="checkmark"
                                    v-show="selectAll"
                                ></u-icon>
                            </view>

                            <view
                                :class="[
                                    'p-mui-table-col-text',
                                    {
                                        'text-left':
                                            !item.align ||
                                            item.align === 'left',
                                        'text-center': item.align === 'center',
                                        'text-right': item.align === 'right'
                                    }
                                ]"
                            >
                                <view v-html="getTitleText(item.title)"></view>
                                <view
                                    v-if="
                                        item.hasOwnProperty('key') &&
                                        item.hasOwnProperty('sort') &&
                                        tableData_.length
                                    "
                                    class="sort"
                                >
                                    <view
                                        class="up-arrow"
                                        :class="{
                                            action:
                                                nowSortKey == item.key &&
                                                sortType == 'asc'
                                        }"
                                    ></view>
                                    <view
                                        class="down-arrow"
                                        :class="{
                                            action:
                                                nowSortKey == item.key &&
                                                sortType == 'desc'
                                        }"
                                    ></view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view
                        v-if="tableData_.length"
                        :class="[
                            'table-container-box',
                            { 'short-table': !longTable && showBottomSum }
                        ]"
                    >
                        <view
                            class="p-mui-table-container-row"
                            :class="{ 'p-mui-table-has-bottom': showBottomSum }"
                            v-for="(row, iIndex) in tableData_"
                            :key="iIndex"
                        >
                            <view
                                :class="[
                                    'p-mui-table-container-col',
                                    {
                                        'p-mui-table-stick-side':
                                            stickCols && jIndex < stickCols
                                    }
                                ]"
                                :style="{
                                    width: col.width
                                        ? col.width + 'rpx'
                                        : defaultColWidth + 'rpx',
                                    left: getStickLeft(jIndex)
                                }"
                                v-for="(col, jIndex) in columns"
                                :key="jIndex"
                                @click="itemClick($event, row, col)"
                            >
                                <view
                                    v-if="showSelect && jIndex === 0"
                                    class="select-box"
                                    :class="{
                                        selected: selectArr.includes(iIndex)
                                    }"
                                    @click="doSelect(false, iIndex)"
                                >
                                    <!-- <view :class="['select-tip', {'selected': selectArr.includes(iIndex)}]"></view> -->
                                    <u-icon
                                        name="checkmark"
                                        v-show="selectArr.includes(iIndex)"
                                    ></u-icon>
                                </view>

                                <view
                                    :class="[
                                        'p-mui-table-col-text',
                                        {
                                            'text-left':
                                                !col.align ||
                                                col.align === 'left',
                                            'text-center':
                                                col.align === 'center',
                                            'text-right': col.align === 'right'
                                        }
                                    ]"
                                >
                                    <view
                                        v-if="col.btns && col.btns.length > 0"
                                    >
                                        <span
                                            v-for="item in col.btns"
                                            v-html="item.template"
                                            @click="item.handleClick(row, col)"
                                        ></span>
                                    </view>
                                    <view
                                        v-else-if="!col.isLink"
                                        v-html="getRowContent(row, col)"
                                    ></view>

                                    <!-- <rich-text class="rich" v-else-if="!col.isLink" :nodes="getRowContent(row, col)"></rich-text> -->
                                    <!-- #ifdef H5 -->
                                    <router-link
                                        v-else-if="
                                            setUrl(row, col).indexOf('http') !=
                                            0
                                        "
                                        :to="setUrl(row, col)"
                                        v-html="getRowContent(row, col)"
                                    ></router-link>
                                    <a
                                        v-else-if="col.isLink"
                                        :href="setUrl(row, col)"
                                        v-html="getRowContent(row, col)"
                                    ></a>
                                    <!-- #endif -->
                                    <!-- #ifndef H5 -->
                                    <navigator
                                        v-else-if="col.isLink"
                                        :url="setUrl(row, col)"
                                        v-html="getRowContent(row, col)"
                                    ></navigator>
                                    <!-- #endif -->
                                </view>
                            </view>
                        </view>
                    </view>
                    <view
                        :class="[
                            'p-mui-table-bottom',
                            { 'long-table': longTable }
                        ]"
                        v-if="showBottomSum && tableData_.length"
                    >
                        <view
                            class="p-mui-table-bottom-col"
                            :class="{
                                'p-mui-table-stick-side':
                                    stickCols && sumIndex < stickCols
                            }"
                            :style="{
                                width: sumCol.width
                                    ? sumCol.width + 'rpx'
                                    : defaultColWidth + 'rpx',
                                left: getStickLeft(sumIndex)
                            }"
                            v-for="(sumCol, sumIndex) in columns"
                            :key="sumIndex"
                        >
                            <view class="p-mui-table-bottom-text">
                                <!-- <view v-if="sumIndex != 0" class="p-mui-table-bottom-text-title">{{ sumCol.title }}</view> -->
                                <text :class="{ sum: sumIndex == 0 }">{{
                                    sumIndex == 0 ? '总计' : dosum(sumCol)
                                }}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>

            <view v-if="showLoading" class="z-loading">
                <view class="z-loading-animate"></view>
            </view>

            <view
                v-else-if="tableData_ && tableData_.length == 0"
                class="table-empty"
            >
                {{ emptyText }}
            </view>
        </view>
    </view>
</template>

<script>
/* 此组件修改自https://github.com/zc897575/z-table.git */
/*
 * 表格使用
 * props: tableData [Array | Boolean] | 表格数据 如果为false则显示loading
 * 		 columns [Array | Boolean] | 数据映射表 如果为false则显示loading 每列params => title(表头文字可以是html字符串模版), width(每列宽度) align(对齐方式 left/center/right) [, key(对应tableData的字段名) || useformatFn(是否使用formatFn格式化函数), sort(是否要排序), isLink(是否显示为超链接Object)]
 * 										  isLink格式: {url: 链接地址, params: 地址带的参数Array[key|value, key|value, ...]每一项都是key和value以'|'链接,如果不带'|'默认键值同名
 * 										  listenerClick(是否监听点击事件Boolean)}
 *                                        btns 操作按钮 格式：{template: html内容, handleClick: 事件处理函数}
 *       defaultColWidth Number | 默认列宽度
 *       stickCols Number | 从左侧起，固定列数 默认为0
 * 		 showBottomSum Boolean | 是否显示底部统计 默认不显示
 * 		 showLoading Boolean | 是否首次加载首次加载不显示暂无数据内容
 * 		 emptyText String | 空数据显示的文字内容
 *		 tableHeight Number | 设置表格高度会滚动
 * 		 showSelect Boolean | 开启选择
 *		 singleSelect Boolean | 在开启选择的状态下是否开起单选
 * 		 formatFn | 格式化函数
 *
 * event: onSort | 排序事件 返回{key: 被排序列的字段名, type: 正序'asc'/倒序'desc'}
 *		  onSelect | 选中时触发 返回选择的行的下标
 * 		  onClick | 单元格点击事件 返回点击单元格所属行的数据
 *
 * function: resetSort | 调用后重置排序
 *
 * */
import Vue from 'vue';

export default {
    data() {
        return {
            version: '1.1.3',
            nowSortKey: '',
            sortType: '', // asc/desc 升序/降序
            longTable: true,
            lineHeight: uni.upx2px(72),

            tableShow: true,
            selectAll: false,
            selectArr: [],
            tableData_: []
        };
    },
    // mixin: [tableRender],
    computed: {
        compluteHeight() {
            return this.tableHeight
                ? 'height: ' + uni.upx2px(this.tableHeight) + 'px'
                : '';
        }
    },
    props: {
        tableData: {
            type: [Array, Boolean],
            default() {
                return false;
            }
        },
        columns: {
            /*
             *
             * [{title: xxx, key: 当前列展示对象名, width: 列宽, formatter: function}]
             *
             * */
            type: [Array, Boolean],
            required: true
        },
        defaultColWidth: {
            type: [Number, String],
            default() {
                return 200;
            }
        },
        stickCols: {
            type: Number,
            default: 0
        },
        showBottomSum: {
            type: Boolean,
            default: false
        },
        showLoading: {
            type: Boolean,
            default: false
        },
        emptyText: {
            type: String,
            default: '暂无数据'
        },
        tableHeight: {
            type: [Number, Boolean],
            default: 0
        },
        showSelect: {
            type: Boolean,
            default: false
        },
        singleSelect: {
            type: Boolean,
            default: false
        },
        formatFn: {
            type: Function
        }
    },
    mounted() {
        this.init();
    },
    watch: {
        columns() {
            this.init();
        },
        tableData() {
            this.init();
        }
    },
    methods: {
        async init() {
            // 重置选择内容
            this.tableData_ = this.tableData.concat();
            this.selectAll = false;
            this.selectArr = [];
            this.tableShow = true;
            this.sortType = '';
            this.nowSortKey = '';

            let _this = this;
            let container = await _this.getPageSize('.p-mui-table-container'),
                pack = await _this.getPageSize('.p-mui-table-pack');
            _this.timer && clearTimeout(_this.timer);
            if (container && pack) {
                _this.$nextTick(function () {
                    if (_this.tableData && _this.tableData.length) {
                        _this.tableShow = false;
                    }
                });
                if (container.height != pack.height) {
                    _this.longTable = true;
                } else {
                    _this.longTable = false;
                }
            } else {
                _this.$nextTick(function () {
                    _this.tableShow = true;
                });
            }
        },
        getStickLeft(idx) {
            //固定列距离左侧距离
            if (
                this.stickCols &&
                idx < this.stickCols &&
                this.stickCols > 1 &&
                idx > 0
            ) {
                let preWidth = 0;
                for (let i = 0; i < idx; i++) {
                    let width = this.columns[i].width || this.defaultColWidth;
                    preWidth += Number(width);
                }
                return preWidth + 'rpx';
            } else {
                return '';
            }
        },
        getPageSize(selecter) {
            // 获取元素信息
            let query = uni.createSelectorQuery().in(this),
                _this = this;
            return new Promise((resolve, reject) => {
                query
                    .select(selecter)
                    .boundingClientRect((res) => {
                        resolve(res);
                    })
                    .exec();
            });
        },
        dosum({ key, noSum = false, formatNum = true }) {
            let sum = '-';
            if (noSum) return sum;
            if (this.tableData) {
                if (
                    this.tableData.every((item) => {
                        return !Number.isNaN(item[key] - 0);
                    })
                ) {
                    sum = 0;
                    this.tableData.map((item, index) => {
                        if (!key && index != 0) {
                            sum = '-';
                        } else {
                            let val = item[key] - 0;
                            if (Number.isNaN(val)) {
                                sum += 0;
                            } else {
                                sum += val;
                            }
                        }
                    });
                }
            }
            // sum = sum == 0 ? "-" : sum
            return formatNum ? this.numTransform(sum) : sum;
        },
        getRowContent(row, col) {
            // 表格值处理函数
            // 如果columns带了key则显示对应的key
            // 如果columns带的format则按规定返回format后的html
            // format规定: params names <Array> 对应tableData的键名,作为匹配template中两个#之间动态内容的名字
            //			   params template <String> html字符串模版

            let tempHTML = '';
            let rowKey = row[col.key];
            if ([null, ''].includes(rowKey)) {
                rowKey = '-';
            }
            let { formatNum = false } = col;

            if (col.useformatFn) {
                console.log(this.formatFn);
            }
            if (col.useformatFn) {
                tempHTML = this.formatFn(row, col, rowKey);
            } else if (rowKey || rowKey === 0) {
                tempHTML =
                    isNaN(rowKey - 0) || !formatNum
                        ? rowKey
                        : this.numTransform(rowKey - 0);
                // tempHTML = tempHTML == 0 ? "-" : tempHTML
            } /* else if (!!col.format) {
					let tempFormat = col.format.template
					col.format.names.map(item => {
						let regexp = new RegExp(`\#${item}\#`, 'mg')
						tempFormat = tempFormat.replace(regexp, row[item])
					})
					tempHTML = tempFormat
				} */ else if (!col.render) {
                let error = new Error('数据的key或formatter值至少一个不为空');
                throw error;
            }
            // console.log(tempHTML)
            return tempHTML.toString();
        },
        sort(key, index) {
            if (!key || !this.columns[index].sort) {
                return;
            }
            // 排序功能: 如果点击的排序按钮是原先的 那么更改排序类型
            //			如果点击的另一个排序按钮 那么选择当前排序并且排序类型改为降序(desc)
            if (key != this.nowSortKey) {
                this.nowSortKey = key;
                this.sortType = 'desc';
            } else {
                this.toggleSort();
            }

            this.selectAll = false;
            this.selectArr = [];
            let sortNum = this.sortType == 'asc' ? 1 : -1;
            this.tableData_.sort((a, b) => {
                return (a[key] - b[key]) * sortNum;
            });
            this.$emit('onSort', {
                key: this.nowSortKey,
                type: this.sortType
            });
        },
        toggleSort() {
            this.sortType = this.sortType == 'asc' ? 'desc' : 'asc';
        },
        numTransform(n) {
            if (Number.isNaN(n - 0)) {
                return n;
            }
            if (Math.abs(n) >= 100000000) {
                n = Number((n / 100000000).toFixed(1)) + '亿';
            } else if (Math.abs(n) >= 10000) {
                n = Number((n / 10000).toFixed(1)) + '万';
            }
            return n.toString();
        },
        resetSort() {
            // 重置排序状态
            this.nowSortKey = '';
            this.sortType = 'desc';
            this.tableData_ = this.tableData.concat();
        },
        setUrl(row, col) {
            if (!col.isLink) {
                return;
            }
            let urlParam = {};
            let {
                isLink: { url, params = [] }
            } = col;
            params.forEach((item) => {
                if (~item.indexOf('|')) {
                    let temp = item.split('|');
                    urlParam[temp[0]] = row[temp[1]];
                } else {
                    urlParam[item] = row[item];
                }
            });
            url = this.setUrlParams(url, urlParam);
            return url;
        },
        setUrlParams(url, params) {
            let tempUrl = url,
                keyArr = Object.keys(params);
            keyArr.forEach((item) => {
                tempUrl += `&${item}=${params[item]}`;
            });
            tempUrl = tempUrl.replace(/\&/, '?');
            return tempUrl;
        },
        itemClick(event, row, col) {
            if (col.listenerClick) {
                this.$emit('onClick', { row, col, event });
            }
        },
        doSelect(isAll = false, index) {
            let temp = new Set();
            if (isAll) {
                // 全选
                if (!this.selectAll) {
                    for (let i = 0; i < this.tableData.length; i++) {
                        temp.add(i);
                    }
                }
            } else {
                // if (!this.singleSelect) {
                // 	this.selectArr.forEach(item => {
                // 		temp.add(item)
                // 	})
                // }
                this.selectArr.forEach((item) => {
                    temp.add(item);
                });
                if (temp.has(index)) {
                    temp.delete(index);
                } else {
                    if (this.singleSelect) {
                        temp.clear();
                    }
                    temp.add(index);
                }
            }
            this.selectArr = Array.from(temp);
            // console.log(this.selectArr)
            if (this.selectArr.length == this.tableData.length) {
                this.selectAll = true;
            } else {
                this.selectAll = false;
            }

            this.$emit('onSelect', this.selectArr);
        },
        // 1.1.1
        getTitleText(title) {
            // 自定义表头
            let tempHTML = title;
            return tempHTML.toString();
        },
        scrolltolower(e) {
            //滑动触底
            if (e.detail.direction === 'bottom') {
                this.$emit('scrolltolower');
            }
        }
    }
};
</script>

<style lang="scss">
.navigator-hover {
    background: transparent;
    opacity: 1;
}

@mixin ellipsis($num: 1) {
    overflow: hidden;
    text-overflow: ellipsis;

    @if $num==1 {
        white-space: nowrap;
    } @else {
        display: -webkit-box;
        -webkit-line-clamp: $num;
        /* autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
    }
}

// 三角形
%triangle-basic {
    content: '';
    height: 0;
    width: 0;
    overflow: hidden;
}

@mixin triangle($direction, $size, $borderColor) {
    @extend %triangle-basic;

    @if $direction==top {
        border-bottom: $size solid $borderColor;
        border-left: $size dashed transparent;
        border-right: $size dashed transparent;
        border-top: 0;
    } @else if $direction==right {
        border-left: $size solid $borderColor;
        border-top: $size dashed transparent;
        border-bottom: $size dashed transparent;
        border-right: 0;
    } @else if $direction==bottom {
        border-top: $size solid $borderColor;
        border-left: $size dashed transparent;
        border-right: $size dashed transparent;
        border-bottom: 0;
    } @else if $direction==left {
        border-right: $size solid $borderColor;
        border-top: $size dashed transparent;
        border-bottom: $size dashed transparent;
        border-left: 0;
    }
}

a {
    text-decoration: none;
}

.p-mui-table {
    position: relative;
    display: inline-block;
    min-height: 130rpx;
    width: 100%;
    background: #fff;
    // border: solid 2rpx #ccc;
    font-size: $uni-font-size-sm;
    box-sizing: border-box;
    transform: translateZ(0);

    .p-mui-table-main {
        height: 100%;
        box-sizing: border-box;
    }

    .p-mui-table-container {
        height: 100%;
        overflow: scroll;
        box-sizing: border-box;
    }

    .p-mui-table-pack {
        position: relative;
        // height: 100%;
        width: fit-content;
        min-width: 100%;
    }

    .p-mui-table-title {
        position: sticky;
        top: 0;
        height: 96rpx;
        z-index: 1;

        .p-mui-table-title-item {
            background: #ffff;
            // border-bottom: solid 1rpx #dbdbdb;
            // background: #f7f7f7;
        }

        .p-mui-table-stick-side {
            position: sticky;
            top: 0;
            left: 0;
            // border-right: solid 1rpx #dbdbdb;
            box-sizing: border-box;
        }
    }

    .table-container-box.short-table {
        padding-bottom: 48rpx;
    }

    .table-container-box {
        .p-mui-table-col-text {
            view {
                font-size: 30rpx;
            }
        }
    }

    .p-mui-table-title,
    .p-mui-table-container-row {
        display: flex;
        width: fit-content;
        min-width: 100%;
        white-space: nowrap;
        box-sizing: border-box;
        height: 96rpx;

        .p-mui-table-title-item,
        .p-mui-table-container-col {
            @include ellipsis();
            display: inline-flex;
            padding: 0 16rpx;
            height: 96rpx;
            align-items: center;
            line-height: 96rpx;
            box-sizing: border-box;
            flex: auto;

            rich-text {
                display: inline-block;
            }
        }

        .p-mui-table-stick-side {
            flex: none;
        }
    }

    .p-mui-table-container-row {
        z-index: 0;
        border-bottom: solid 1rpx #f4f4f4;
        box-sizing: border-box;
    }

    .p-mui-table-container-row:nth-child(odd),
    .p-mui-table-container-row:nth-child(odd) .p-mui-table-stick-side {
        background: #f7f7f7;
    }

    .p-mui-table-stick-side {
        position: sticky;
        left: 0;
        background-color: #ffff;
        // background: #f7f9ff;
        // border-right: solid 1rpx #dbdbdb;
        box-sizing: border-box;
    }

    .p-mui-table-bottom {
        position: absolute;
        bottom: 0;
        z-index: 9;
        display: flex;
        justify-items: center;
        width: fit-content;
        background: #0379f5 !important;
        color: #fff !important;
        white-space: nowrap;
        box-sizing: border-box;

        &.long-table {
            position: sticky;
        }

        .p-mui-table-stick-side {
            background: #0379f5 !important;
            box-sizing: border-box;
        }

        .p-mui-table-bottom-col {
            display: inline-flex;
            align-items: center;
            text-align: center;
            padding: 16rpx;
            box-sizing: border-box;
        }

        .p-mui-table-bottom-text {
            line-height: 100%;
            box-sizing: border-box;
        }

        .p-mui-table-bottom-text-title {
            margin-bottom: 10rpx;
            font-size: 22rpx;
            color: #aad0ff;
            box-sizing: border-box;
        }

        .sum {
            margin-left: 14rpx;
            font-size: 28rpx;
            box-sizing: border-box;
        }
    }

    .table-empty {
        position: absolute;
        top: 72rpx;
        height: 72rpx;
        line-height: 72rpx;
        width: 100%;
        text-align: center;
    }

    .sort {
        display: flex;
        padding: 5rpx;
        flex-direction: column;
        justify-content: center;

        .up-arrow {
            @include triangle(top, 10rpx, #ccc);
            display: block;
            margin-bottom: 5rpx;

            &.action {
                @include triangle(top, 10rpx, #0379f5);
            }
        }

        .down-arrow {
            @include triangle(bottom, 10rpx, #ccc);
            display: block;

            &.action {
                @include triangle(bottom, 10rpx, #0379f5);
            }
        }
    }

    // 1.0.5
    .z-loading {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 72rpx;
        width: 100%;
        background: #fff;
        transition: all 0.3s;

        .z-loading-animate {
            position: relative;
            display: inline-block;
            width: 30rpx;
            height: 30rpx;
            margin-right: 20rpx;
            border-radius: 100%;
            border: solid 6rpx #ccc;
            vertical-align: middle;
            animation: rotate 1s ease-in-out infinite;

            &::after {
                content: '';
                display: block;
                position: absolute;
                top: -10rpx;
                z-index: 1;
                background: #fff;
                width: 20rpx;
                height: 20rpx;
                border-radius: 10rpx;
            }
        }

        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }
        }
    }

    // 1.1.0
    .select-box {
        display: inline-block;
        width: 32rpx;
        height: 32rpx;
        line-height: 14rpx;
        margin-right: 15rpx;
        border: solid 2rpx #0379f5;
        border-radius: 4rpx;
        background: #fff;
        text-align: center;
        flex: none;
        overflow: hidden;

        &.selected {
            background-color: #227cfa;
            color: #fff;
            font-size: 16rpx;
        }
    }

    // 1.1.1
    .p-mui-table-col-text {
        display: flex;
        width: 100%;
        flex: 1;
        justify-content: flex-start;
        align-content: center;

        view {
            font-size: 32rpx;
        }

        &.text-center {
            justify-content: center;
        }

        &.text-right {
            justify-content: flex-end;
        }
    }
}
</style>
