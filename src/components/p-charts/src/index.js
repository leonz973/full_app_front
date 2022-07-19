/**
 * ***************************************************************************
 * Copyright (C) 2019 ShenZhen Powerdata Information Technology Co.,Ltd
 * All Rights Reserved.
 * 本软件为深圳博安达开发研制。未经本公司正式书面同意，其他任何个人、团体不得使用、
 * 复制、修改或发布本软件.
 * frontal2.0
 * 時間: 2019 11 下午 17:12
 * 作者：Caijw
 * ***************************************************************************
 *
 * @format
 */
import PChart from '../packages/p-chart';
import PPie from '../packages/p-pie';
import PStackBar from '../packages/p-stack-bar';
import PStripeBar from '../packages/p-stripe-bar';
import PCylinderBar from '../packages/p-cylinder-bar';
import RainBow from '../packages/p-rainbow';
import Ring from '../packages/p-ring';
import DashBoard from '../packages/p-dash-board';
import AirDb from '../packages/p-air-db';
import PHeatmap from '../packages/p-heatmap';
import WaterPolo from '../packages/p-water-polo';
import PLine from '../packages/p-line';
import PBar from '../packages/p-bar';
import PRadar from '../packages/p-radar';
import PSankey from '../packages/p-sankey';
import PVarietyBar from '../packages/p-variety-bar';
import PAssetsBar from '../packages/p-assets-bar';

import { setChartConfig } from './util/nomalChart';

// let echarts = require('echarts');
import * as echarts from '../../lime-echart/components/lime-echart/echarts'

const components = [
    PChart,
    PPie,
    PStackBar,
    PStripeBar,
    PCylinderBar,
    RainBow,
    Ring, //环形图
    PHeatmap,
    DashBoard, //仪表盘
    AirDb, //空气污染物仪表盘
    WaterPolo, //水球图
    PLine,
    PBar,
    PRadar,
    PSankey,
    PVarietyBar,
    PAssetsBar
];

const install = function(Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
    Vue.prototype.$pChart = {
        setChartConfig
    };
	Vue.prototype.$echarts = echarts;
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default install;
