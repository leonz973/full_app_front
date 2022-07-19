<!-- @format -->

<template>
    <div class="bbox bbox-2 p-air-calendar">
        <div class="block block-2">
            <div class="ec-wrap">
                <table class="table-wx">
                    <tbody>
                        <tr class="head">
                            <td><span>日</span></td>
                            <td><span>一</span></td>
                            <td><span>二</span></td>
                            <td><span>三</span></td>
                            <td><span>四</span></td>
                            <td><span>五</span></td>
                            <td><span>六</span></td>
                        </tr>
                        <tr v-for="(item, i) in arrDate" :key="i">
                            <td
                                v-for="v in item"
                                :key="v.val"
                                style="position: relative"
                                class="cal-cell"
                                @click="aqiCalendarDetail(v.trClass, v.val, v)"
                                :class="{
                                    'is-light':
                                        pollutionId === 'AQI' && v.aqi <= 100
                                }"
                            >
                                <span
                                    :class="v.trClass"
                                    v-bind:style="{
                                        background: v.color,
                                        color: v.fontColor
                                    }"
                                >
                                    {{ v.val }}
                                    <i
                                        class="pollution"
                                        :class="{
                                            small: v.mainPollution.length > 5
                                        }"
                                        v-if="
                                            pollutionId == 'AQI' &&
                                            v.mainPollution
                                        "
                                        v-html="
                                            renderValue(
                                                v.itemObj,
                                                v.mainPollution
                                            )
                                        "
                                    ></i>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import calenderUtils from '../../utils/calendar_utils';
//核心，根据月份 返回一组数据，6*7 = 42 的日期
export default {
    name: 'pm-air-calendar',
    props: {
        pollutionId: {
            type: String,
            default: function () {
                return '';
            }
        },
        //数据
        dataArr: {
            type: Array,
            default: function () {
                return [];
            }
        },
        //初始日期yyyy-M 如 '2019-8'
        initDate: {
            type: String,
            default: function () {
                return '';
            }
        }
    },
    data() {
        return {
            selectedDay: 1,
            timeObj: {
                year: '',
                month: '',
                day: ''
            },
            arrDate: []
        };
    },
    watch: {
        initDate() {
            this.renderTime();
            this.renderNewData();
        },
        dataArr() {
            // this.renderTime();
            this.renderNewData();
        },
        pollutionId() {
            this.renderNewData();
        }
    },
    async mounted() {
        // debugger;
        // 渲染时间
        await this.renderTime();
        await this.renderNewData();
        await this.arrDate.forEach((item) => {
            item.forEach((ob) => {
                if (
                    ob.show !== undefined &&
                    ob.val == this.$dayjs().format('D')
                ) {
                    console.log('object', this.$dayjs().format('D'));
                    this.aqiCalendarDetail(ob.color, ob.val, ob);
                }
            });
        });
    },
    methods: {
        renderTime() {
            let y;
            let m = 0;
            if (this.initDate) {
                y = this.initDate.split('-')[0];
                m = this.initDate.split('-')[1] - 1;
            } else {
                //获取日期数组
                let t = new Date();
                y = t.getFullYear();
                m = t.getMonth();
            }
            this.timeObj = {
                year: y,
                month: Math.round(m),
                day: 1
            };
        },
        renderNewData() {
            let nowDayNum = this.getDayNum(this.timeObj);
            //获取前一个月多少天
            let prevMonthDayNum = this.getDayNum(
                this.getDateOther(this.timeObj, true)
            );
            //获取这个月星期几，然后往数组里面加上上个月的尾巴数字，后面加上42-这个月-上个月添加的
            let day = new Date(
                this.timeObj.year,
                this.timeObj.month,
                1
            ).getDay();

            this.getFullTimeArr(prevMonthDayNum, nowDayNum, day, this.dataArr);
        },
        changeMonth(date) {
            let y;
            let m = 0;
            if (date) {
                y = date.split('-')[0];
                m = date.split('-')[1] - 1;
            } else {
                //获取日期数组
                let t = new Date();
                y = t.getFullYear();
                m = t.getMonth();
            }
            this.timeObj = {
                year: y,
                month: Math.round(m),
                day: 1
            };
        },
        aqiCalendarDetail(color, day, itemObj) {
            console.log('0', color, '1', day, '11', itemObj);
            //当grep的时候，不发送请求
            if (color != 'grep') {
                let cityCode = this.citybm;
                if (day < 10) {
                    var date =
                        this.timeObj.year +
                        '-' +
                        (this.timeObj.month + 1) +
                        '-0' +
                        day;
                } else {
                    var date =
                        this.timeObj.year +
                        '-' +
                        (this.timeObj.month + 1) +
                        '-' +
                        day;
                }
                this.$emit('dateChange', itemObj);
                this.selectedDay = day;
            }
        },
        dateChange() {
            let dateStr = this.timeObj.year + '-' + (this.timeObj.month + 1);
            // this.$emit('dateChange', dateStr);
        },
        renderValue(item, pollutionName) {
            switch (pollutionName) {
                case 'O3_8H':
                case 'O3_8':
                case 'O3_8h':
                    pollutionName = 'O3';
                    break;
            }
            if (pollutionName) {
                let val = item[pollutionName] || '';
                return calenderUtils.replacePltLabel(pollutionName);
            } else {
                return '';
            }
        },
        //上一年，下一年
        prevYear(isPrev) {
            if (isPrev) {
                this.timeObj.year = parseInt(this.timeObj.year) - 1;
            } else {
                this.timeObj.year = parseInt(this.timeObj.year) + 1;
            }
            this.dateChange();
        },
        //上个月，下个月
        prevNext(isPrev) {
            let date = this.getDateOther(this.timeObj, isPrev);
            this.timeObj.year = date.year;
            this.timeObj.month = date.month;
            this.timeObj.day = date.day;
            this.dateChange();
        },
        //getFullTimeArr  返回日历的42个数组,(上个月天数，这个月天数，星期几, aqi的污染系数）
        getFullTimeArr(prevMonthDayNum, nowDayNum, day, aqiArr) {
            //当月选择最后一个数据时间 否则选中1号
            let m = this.initDate;
            let nowNonth = this.$dayjs().format('YYYY-MM');
            let selectDay = 1;
            if (nowNonth === this.initDate) {
                //最后一个数据时间
                let last = aqiArr.slice(-1)[0];
                if (last && last.monitorDate) {
                    selectDay = Number(last.monitorDate.split('-')[2]);
                }
            }

            let arrDate = [];
            //处理星期天的情况
            if (day == 0) {
                day = 7;
            }
            let num = day;
            let lastMonthNum = 42 - num - nowDayNum;
            //上个月数据
            while (num != 0) {
                let obj = {
                    val: prevMonthDayNum - num + 1,
                    trClass: 'grep',
                    fontColor: '',
                    color: '',
                    itemObj: {
                        bgColor: ''
                    }
                };
                num--;
                arrDate.push(obj);
            }

            //当月天数
            for (let i = 1; i <= nowDayNum; i++) {
                let aqiLevelColor = '';
                let mainPollution = '';
                let aqiVal = '';
                let itemObj = {};
                let d = i < 10 ? '0' + i : i;
                let tStr = this.initDate + '-' + d;

                for (let j = 0; j < aqiArr.length; j++) {
                    let item = aqiArr[j];

                    if (item.monitorDate === tStr) {
                        // 判断不同污染物的名称
                        switch (this.pollutionId) {
                            case 'AQI':
                                aqiLevelColor = calenderUtils.getLevelPollution(
                                    'AQI',
                                    item.aqi
                                ).color;
                                aqiVal = item.aqi;
                                item.nowVal = item.aqi;
                                item.level = calenderUtils.getLevelPollution(
                                    'AQI',
                                    item.aqi
                                ).txt;
                                break;
                            case 'CO':
                                aqiLevelColor = calenderUtils.getLevelPollution(
                                    'CO',
                                    item.co
                                ).color;
                                aqiVal = item.co;
                                item.nowVal = item.co;
                                item.level = calenderUtils.getLevelPollution(
                                    'CO',
                                    item.co
                                ).txt;
                                break;
                            case 'PM25':
                                aqiLevelColor = calenderUtils.getLevelPollution(
                                    'PM25',
                                    item.pm25
                                ).color;
                                aqiVal = item.pm25;
                                item.nowVal = item.pm25;
                                item.level = calenderUtils.getLevelPollution(
                                    'PM25',
                                    item.pm25
                                ).txt;
                                break;
                            case 'PM10':
                                aqiLevelColor = calenderUtils.getLevelPollution(
                                    'PM10',
                                    item.pm10
                                ).color;
                                aqiVal = item.pm10;
                                item.nowVal = item.pm10;
                                item.level = calenderUtils.getLevelPollution(
                                    'PM10',
                                    item.pm10
                                ).txt;
                                break;
                            case 'O3':
                                aqiLevelColor = calenderUtils.getLevelPollution(
                                    'O3',
                                    item.o3
                                ).color;
                                aqiVal = item.o3;
                                item.nowVal = item.o3;
                                item.level = calenderUtils.getLevelPollution(
                                    'O3',
                                    item.o3
                                ).txt;
                                break;
                            case 'NO2':
                                aqiLevelColor = calenderUtils.getLevelPollution(
                                    'NO2',
                                    item.no2
                                ).color;
                                aqiVal = item.no2;
                                item.nowVal = item.no2;
                                item.level = calenderUtils.getLevelPollution(
                                    'NO2',
                                    item.no2
                                ).txt;
                                break;
                            case 'SO2':
                                aqiLevelColor = calenderUtils.getLevelPollution(
                                    'SO2',
                                    item.so2
                                ).color;
                                item.level = calenderUtils.getLevelPollution(
                                    'SO2',
                                    item.so2
                                ).txt;
                                aqiVal = item.so2;
                                item.nowVal = item.so2;
                                break;
                        }

                        itemObj = item;
                        mainPollution = item.maxItem || '';
                        // item.mainPollution = mainPollution;
                        break;
                    }
                }

                if (aqiLevelColor) {
                    //环境判断
                    var obj = {
                        val: i,
                        trClass: '',
                        fontColor: 'white',
                        color: aqiLevelColor || '#ccc',
                        show: false,
                        aqi: aqiVal,
                        mainPollution: mainPollution || '',
                        itemObj: itemObj
                    };
                } else {
                    var obj = {
                        val: i,
                        trClass: '',
                        fontColor: 'white',
                        color: '#ccc',
                        show: false,
                        aqi: aqiVal,
                        mainPollution: mainPollution || '',
                        itemObj: itemObj
                    };
                }

                // 第一天的时候，替换
                // 这个月的替换

                if (i == selectDay) {
                    this.aqiCalendarDetail(obj.trClass, obj.val, obj);
                }
                arrDate.push(obj);
            }
            //下个月天数
            for (let i = 1; i <= lastMonthNum; i++) {
                let obj = {
                    val: i,
                    trClass: 'grep',
                    color: '',
                    show: false,
                    aqi: '',
                    itemObj: {
                        bgColor: ''
                    }
                };
                arrDate.push(obj);
            }

            //转换格式,一维数组转换为二维数组
            let newArrDate = new Array(Math.ceil(arrDate.length / 7));
            for (let i = 0; i < newArrDate.length; i++) {
                newArrDate[i] = [];
            }
            for (let j = 0; j < arrDate.length; j++) {
                newArrDate[parseInt(j / 7)][j % 7] = arrDate[j];
            }
            this.arrDate = newArrDate;
        },
        //获取一个月的时间
        getDayNum(date) {
            let dayCount = new Date(date.year, date.month + 1, 0).getDate();
            return dayCount;
        },
        //获取其他日期
        getDateOther(date, isPrev) {
            // isPrev:true:上一个月; false: 下一个月
            let year = date.year; // 获取当前日期的年份
            let month = isPrev
                ? parseInt(date.month) - 1
                : parseInt(date.month) + 1; // 前一个月
            let day = date.day; // 获取当前日期的日
            if (month === -1) {
                year = parseInt(year) - 1;
                month = 11;
            }
            if (month === 12) {
                year = parseInt(year) + 1;
                month = 0;
            }
            let days2 = new Date(year, month, 0).getDate(); // //获取上或者下个月天数
            if (day > days2) {
                day = days2;
            }
            return { year: year, month: month, day: day };
        }
    }
};
</script>

<style scoped>
.head {
    height: 80rpx;
}

.bx-tit {
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
    height: 20px;
    line-height: 20px;
    top: -10px;
}

.bx-tit b {
    position: relative;
    display: inline-block;
    font-size: 16px;
    color: #fff;
    padding: 0 35px;
}

.bx-tit b:before {
    content: '';
    display: block;
    width: 35px;
    height: 100%;
    /*background: url('../images/tit_bf.png') left center no-repeat;*/
    position: absolute;
    left: 0;
    top: 0;
}
.bx-tit b:after {
    content: '';
    display: block;
    width: 35px;
    height: 100%;
    /*background: url('../images/tit_af.png') right center no-repeat;*/
    position: absolute;
    right: 0;
    top: 0;
}

.wrap-1 {
    height: 45px;
    text-align: center;
    box-sizing: border-box;
    padding-top: 15px;
}
.sp-date-time {
    color: #b2ddff;
    font-size: 14px;
}
.block {
    /*background: rgba(0, 84, 146, 0.3);*/
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.2) inset; */
    background: white;
}
.ul-1 {
    text-align: center;
    padding-left: 6px;
}
.ul-1 > li {
    display: inline-block;
    width: 449px;
    height: 400px;
    vertical-align: top;
    margin: 0 4px;
}

.ec-wrap {
    text-align: center;
    padding-top: 10px;
}

table {
    color: white;
    width: 100%;
    height: 630rpx;
    margin: auto;
}
.grep {
    color: #6c859d;
}
.head td span {
    color: #666;
    /*color: #d6f026;*/
}
.red {
    background: red;
    color: black;
}

.blue {
    background: blue;
    color: white;
}

tr td.cal-cell {
    margin: 9rpx 5rpx;
    overflow: hidden;
}
.head td {
    height: 50rpx;
}

tr td.on {
    box-shadow: 0 0 5px 1px #ddd inset;
}
tr td span {
    display: inline-block;
    width: 85rpx;
    height: 85rpx;
    line-height: 26rpx;
    box-sizing: border-box;
    text-align: center;
    border-radius: 12rpx;
    font-size: 28rpx;
    padding: 15rpx 8rpx;
}
tr td i.pollution {
    font-size: 24rpx;
}
tr td i.pollution.small {
    font-size: 16rpx;
}
.hover-item {
    display: inline-block;
    position: absolute;
    background: #27474e;
    width: auto;
    min-width: 180px;
    height: auto;
    border-radius: 5px;
    top: -11px;
    left: 51px;
    opacity: 0.85;
    line-height: 24px;
    z-index: 1000;
    text-align: left;
    padding: 10px;
}
.hover-item-a {
    display: inline-block;
    border-radius: 10px;
    width: 10px;
    height: 10px;
}

.mon-result {
    position: relative;
    /*background: #004b8c;*/
    border-radius: 3px;
    width: 140px;
    height: 28px;
    line-height: 28px;
    margin: 0 auto;
    text-align: center;
    color: #666;
    font-size: 14px;
}

.mon-result i {
    position: absolute;
    top: 0;
    display: block;
    width: 18px;
    height: 100%;
    cursor: pointer;
}
.mon-result i:hover {
    opacity: 0.75;
}
.mon-result > i {
    height: 28px;
    line-height: 28px;
}
.ic-prev-y {
    left: 0;
}
.ic-next-y {
    right: 0;
}
.ic-prev-m {
    left: 18px;
}
.ic-next-m {
    right: 18px;
}
.pollution {
    display: block;
    margin-top: 10rpx;
}
.table-wx thead tr,
.table-wx tbody tr {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.table-wx thead tr th,
.table-wx tbody tr td {
    flex: 1;
    /* line-height: 72.4638rpx; */
    text-align: center;
}
tr td i.pollution.small {
    white-space: nowrap;
    overflow: hidden;
}

/* tr td.is-light i.pollution, tr td.is-light span{
	color: #333!important;
} */
tr td i.pollution {
    white-space: nowrap;
}

/deep/ sub {
    font-size: 16rpx;
    vertical-align: sub !important;
    display: inline-block;
    transform: scale(0.8);
}
</style>
