<!-- @format -->

<template>
    <div class="waterFractureSurface">
        <!-- 断面水质类别  src/components/business/water/pm-water-fracture-surface/pm-water-fracture-surface.vue -->
        <p-mui-wrapper :title="'断面水质类别'">
            <pm-water-fracture-surface :data="data"></pm-water-fracture-surface>
        </p-mui-wrapper>
    </div>
</template>

<script>
export default {
    name: 'waterFractureSurface',
    data() {
        return {
            data: {
                surfaceData: [] //断面水质类别数据
            }
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            let datas = [
                {
                    basinName: '流域1', //所属流域
                    riverSystemName: '', //所属水系
                    areaCode: '', //行政区代码
                    areaName: '', //所属行政区
                    oneTotal: '4', //一类个数
                    oneRate: '20', //一类比例
                    twoTotal: '16', //二类个数
                    twoRate: '46', //二类比例
                    threeTotal: '', //三类个数
                    threeRate: '', //三类比例
                    fourTotal: '', //四类个数
                    fourRate: '', //四类比例
                    fiveTotal: '', //五类个数
                    fiveRate: '', //五类比例
                    badFiveTotal: '3', //劣五类个数
                    badFiveRate: '8', //劣五类比例
                    level: '优' //水质优良
                },
                {
                    basinName: '流域2', //所属流域
                    riverSystemName: '', //所属水系
                    areaCode: '', //行政区代码
                    areaName: '', //所属行政区
                    oneTotal: '21', //一类个数
                    oneRate: '37', //一类比例
                    twoTotal: '35', //二类个数
                    twoRate: '46', //二类比例
                    threeTotal: '', //三类个数
                    threeRate: '', //三类比例
                    fourTotal: '', //四类个数
                    fourRate: '', //四类比例
                    fiveTotal: '', //五类个数
                    fiveRate: '', //五类比例
                    badFiveTotal: '3', //劣五类个数
                    badFiveRate: '8', //劣五类比例
                    level: '良好' //水质优良
                },
                {
                    basinName: '流域3', //所属流域
                    riverSystemName: '', //所属水系
                    areaCode: '', //行政区代码
                    areaName: '', //所属行政区
                    oneTotal: '21', //一类个数
                    oneRate: '37', //一类比例
                    twoTotal: '35', //二类个数
                    twoRate: '46', //二类比例
                    threeTotal: '', //三类个数
                    threeRate: '', //三类比例
                    fourTotal: '', //四类个数
                    fourRate: '', //四类比例
                    fiveTotal: '', //五类个数
                    fiveRate: '', //五类比例
                    badFiveTotal: '3', //劣五类个数
                    badFiveRate: '8', //劣五类比例
                    level: '优' //水质优良
                }
            ];

            this.data.surfaceData = datas;
        }
    }
};
</script>

<style lang="less" scoped></style>
