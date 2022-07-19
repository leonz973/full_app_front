import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        hasLogin: false,
        loginNum: 0, // 登录次数
        isShowLoading: false
    },
    mutations: {
        showLoading(state) {
            state.showLoading = true;
            uni.showLoading({
                title: '加载中',
                mask: true
            });
        },
        hideLoading(state) {
            state.showLoading = false;
            uni.hideLoading({
                title: '加载中'
            });
        }, // todo
        errorMsg(state, error) {
            uni.showToast({
                title: error.msg,
                icon: 'none',
                duration: 3000
            });
        },
        login(state) { // 登录
            state.hasLogin = true;
        },
        logout(state) { // 退出
            state.hasLogin = false;
        },
        resetLoginNum(state, value = 0) {
            state.loginNum = value;
        }
    }
})

export default store
