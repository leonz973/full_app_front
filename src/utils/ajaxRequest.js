/** @format */

// import axios from '@/js_sdk/gangdiedao-uni-axios'
import axios from 'axios-miniprogram';
import store from '../store';

// 当第一次请求 显示loading  剩下的时候就不调用了
// 当都请求完毕后 隐藏loading
class AjaxRequest {
    // baseURL
    constructor() {
        // 请求的路径
        this.baseURL = '';
        this.timeout = 3000000; // 超时时间
        this.queue = {}; // 存放每次的请求 TODO 重复一样的请求会有问题 by 黄冠豪
    }
    merge(options) {
        return {
            ...options,
            baseURL: this.baseURL,
            timeout: this.timeout
        };
    }
    setInterceptor(instance, options) {
        //每次请求时 都会加一个loading效果
        // 更改请求头
        instance.interceptors.request.use((config) => {
            config.headers.common['Authorization'] =
                'Bearer ' + uni.getStorageSync('token');
            if (config.method === 'post') {
                config.headers['Content-Type'] =
                    'application/json;charset=UTF-8';
            }
            if (Object.keys(this.queue).length === 0 && options.showLoading) {
                store.commit('showLoading');
            }
            this.queue[options.url] = options.url;
            return config;
        });
        // 如果上一个promise 返回了一个常量 会作为下一个promise的输入
        instance.interceptors.response.use(
            (res) => {
                delete this.queue[options.url]; // 每次请求成功后 都删除队列里的路径
                if (Object.keys(this.queue).length === 0) {
                    store.commit('hideLoading');
                }

                // 状态码拦截器判断，如果是000的话，就返回
                if (
                    res.data.status == '000' ||
                    res.data.success ||
                    res.data.hasOwnProperty('rows') ||
                    res.data.hasOwnProperty('TYSHXYDM')
                ) {
                    return res.data;
                } else {
                    store.commit('errorMsg', {
                        msg:
                            res.data.message ||
                            res.data.msg ||
                            res.data.errMsg ||
                            '请求异常',
                        res
                    });
                    return Promise.reject(res.data);
                }
            },
            (error) => {
                delete this.queue[options.url]; // 每次请求成功后 都删除队列里的路径
                if (Object.keys(this.queue).length === 0) {
                    store.commit('hideLoading');
                }

                store.commit('errorMsg', {
                    msg: '请求异常',
                    error
                });
            }
        );
    }

    request(options) {
        options = Object.assign(
            {
                showLoading: true
            },
            options
        );
        // url,method
        let instance = axios.create(); // 通过axios库创建一个axios实例
        this.setInterceptor(instance, options);
        let config = this.merge(options);
        return instance(config); // axios执行后返回的是一个promise
    }
}
export default new AjaxRequest();
