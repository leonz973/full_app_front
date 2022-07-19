<!-- @format -->

<template>
    <view>
        <ul class="pd-ultbs4" v-if="!userType">
            <li
                :class="{ on: dateType === 'HOUR' }"
                @click="
                    dateType = 'HOUR';
                    reset();
                "
            >
                实时
            </li>
            <li
                :class="{ on: dateType === 'DAY' }"
                @click="
                    dateType = 'DAY';
                    reset();
                "
            >
                日
            </li>
            <li
                :class="{ on: dateType === 'MONTH' }"
                @click="
                    dateType = 'MONTH';
                    reset();
                "
            >
                月
            </li>
            <li
                :class="{ on: dateType === 'YEAR' }"
                @click="
                    dateType = 'YEAR';
                    reset();
                "
            >
                年
            </li>
        </ul>
        <div class="pd-datebx1">
            <timeSelector
                :showType="showType"
                @btnConfirm="getDate"
                :hideMins="true"
                ><input
                    type="text"
                    v-model="time1"
                    @click="pickerType = '1'"
                    disabled
            /></timeSelector>
            <i></i>
            <timeSelector
                :showType="showType"
                @btnConfirm="getDate"
                :hideMins="true"
                ><input
                    type="text"
                    v-model="time2"
                    @click="pickerType = '2'"
                    disabled
            /></timeSelector>
            <!-- <button size="mini" type="primary">确定</button> -->
        </div>

        <!-- 时间选择 -->

        <!-- <DatePicker @confirm="getDate" @cancel="pickerType = ''" :dateType="dateType" :visible="pickerType"></DatePicker> -->
    </view>
</template>

<script>
// import DatePicker from './DatePicker.vue';
import timeSelector from './wing-time-selector/wing-time-selector.vue';
export default {
    components: {
        // DatePicker,
        timeSelector
    },
    props: {
        userType: {
            //指定的单个时间类型 此时不显示选择时间类型
            default: ''
        },
        start: {
            //默认开始时间
            default: ''
        },
        end: {
            //默认结束时间
            default: ''
        },
        autoFill: {
            //自动填充时间
            default: true
        }
    },
    computed: {
        showType() {
            let type = this.dateType;
            let obj = {
                HOUR: 'yearToMinute',
                DAY: 'date',
                MONTH: 'yearToMonth',
                YEAR: 'year'
            };
            return obj[type] || 'date';
        }
    },
    data() {
        return {
            dateType: 'HOUR',
            time1: '',
            time2: '',
            pickerType: ''
        };
    },
    watch: {
        userType(v) {
            this.dateType = v || 'HOUR';
            if (this.autoFill) {
                this.reset();
            }
        },
        start: 'reset',
        end: 'reset'
    },
    mounted() {
        this.dateType = this.userType || 'HOUR';
        if (this.autoFill) {
            this.reset();
        }
    },
    methods: {
        reset() {
            let t = this.end || new Date();
            switch (this.dateType) {
                case 'HOUR': {
                    this.time2 = this.$dayjs(t).format('YYYY-MM-DD HH');
                    this.time1 =
                        this.start ||
                        this.$dayjs(t)
                            .subtract(1, 'day')
                            .format('YYYY-MM-DD HH');
                    break;
                }
                case 'DAY': {
                    this.time2 = this.$dayjs(t).format('YYYY-MM-DD');
                    this.time1 =
                        this.start ||
                        this.$dayjs(t).subtract(29, 'day').format('YYYY-MM-DD');
                    break;
                }
                case 'MONTH': {
                    this.time2 = this.$dayjs(t).format('YYYY-MM');
                    this.time1 =
                        this.start ||
                        this.$dayjs(t).subtract(12, 'month').format('YYYY-MM');
                    break;
                }
                case 'YEAR': {
                    this.time2 = this.$dayjs(t).format('YYYY');
                    this.time1 =
                        this.start ||
                        this.$dayjs(t).subtract(3, 'year').format('YYYY');
                    break;
                }
                default: {
                    this.time1 = '';
                    this.time2 = '';
                }
            }
            if (this.autoFill) {
                this.setData();
            }
        },
        validDate(t1, t2) {
            this.time1 = t1;
            this.time2 = t2;
            if (t1 && t2 && this.$dayjs(t1).isAfter(this.$dayjs(t2))) {
                uni.showToast({
                    title: '结束时间不能早于开始时间，请重新选择。',
                    icon: 'none',
                    duration: 2500
                });
                return false;
            }

            return true;
        },
        getDate(obj) {
            // console.log(obj)
            let t = obj.key;
            if (this.dateType === 'HOUR') {
                t = t.slice(0, 13);
            }

            let valid = true;
            if (this.pickerType === '1') {
                valid = this.validDate(t, this.time2);
            } else {
                valid = this.validDate(this.time1, t);
            }

            this.pickerType = '';

            if (valid) {
                this.setData();
            }
        },
        setData() {
            if (!(this.time1 && this.time2)) {
                return;
            }
            this.$emit('change', {
                dateType: this.dateType,
                start: this.$dayjs(this.time1).format('YYYY-MM-DD HH') + ':00',
                end: this.$dayjs(this.time2).format('YYYY-MM-DD HH') + ':00'
            });
        }
    }
};
</script>

<style></style>
