<!-- @format -->

<script>
export default {
    onLaunch: function () {
        // 判断有没有绑定过用户
    },
    onShow: function () {
        console.log('App Show');
    },
    onHide: function () {
        console.log('App Hide');
    }
};
</script>
<style lang="scss">
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
// @import './common/uni.css';
// @import './common/powerapp/css/wx.scss';
// @import  './common/powerapp/css/srcConfig.less';

// uView样式
// @import './components/p-mui/index.scss';

// @import 'p-mui/index.scss';

// @import './static/demo/demo.scss';

//app样式
@import './static/app/css/type4.css';
@import './static/app/css/reset.css';
.index-body {
    height: 100%;
}
/* 以下样式用于 hello uni-app 演示所需 */
page {
    background-color: #f4f5f6;
    height: 100%;
    font-size: 28upx;
    line-height: 1.8;
}

.uni-header-logo {
    padding: 30upx;
    text-align: center;
    margin-top: 10upx;
}

.uni-header-logo image {
    width: 140upx;
    height: 140upx;
}

.uni-hello-text {
    color: #7a7e83;
}

.uni-hello-addfile {
    text-align: center;
    line-height: 300upx;
    background: #fff;
    padding: 50upx;
    margin-top: 10px;
    font-size: 38upx;
    color: #808080;
}

.main {
    padding-top: 20rpx;
    box-sizing: border-box;
}
</style>
