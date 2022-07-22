/** @format */

import { appVue } from './common/powerapp/js/index.js';
import App from './App';

// 组件，框架常用组件
// import pageHead from './components/page-head'
// import pageFoot from './components/page-foot'

import dayjs from './components/dayjs/dayjs.min.js';
import isSameOrAfter from './components/dayjs/plugin/isSameOrAfter/index';
dayjs.extend(isSameOrAfter);
appVue.prototype.$dayjs = dayjs;

// 引入全局uView
import uView1 from 'p-mui';
// import uView from './components/p-mui';
appVue.use(uView1);

import uView from 'uview-ui';
appVue.use(uView);

import uText from 'uview-ui/components/u-text/u-text.vue';
appVue.component(uText);

// echarts图
/* import pChart from './components/p-charts/src/index.js';
appVue.use(pChart); */

import store from './store';
appVue.config.productionTip = false;

appVue.prototype.$store = store;
appVue.prototype.$backgroundAudioData = {
    playing: false,
    playTime: 0,
    formatedPlayTime: '00:00:00'
};

// console.log(appVue.prototype)
// appVue.component('page-head', pageHead)
// appVue.component('page-foot', pageFoot)

App.mpType = 'app';

const app = new appVue({
    store,
    ...App
});
app.$mount();

appVue.prototype.$closeWebView = function () {
    plus.webview.close('h5App');
    // var h5App = plus.webview.getWebviewById("h5App");
    // if(h5App){
    //      h5App.hide();
    // }
};

// window.onload = function() {
//     window.hasPop = false; //当前是否有弹框

//     //后退键监听
//     plus.key.addEventListener("backbutton", function() {
//         var h5App = plus.webview.getWebviewById("h5App");
//         if (h5App) {
//             var hash = window.location.hash;
//             if (window.hasPop && window.closePop) { //当前有弹框时关闭弹框
//                 window.hasPop = false;
//                 window.closePop();
//             } else if (hash.indexOf('/tab') > -1 || hash.indexOf('/manage/manage') > -1) {
//                 //h5App.hide();
//                 plus.webview.close('h5App');
//             } else {
//                 uni.navigateBack();
//             }
//         }
//     });
// }
