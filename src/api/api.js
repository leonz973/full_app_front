/** @format */

import axios from '@/utils/ajaxRequest.js';

// let BASE_URL = 'http://localhost:3000';
let BASE_URL = 'http://13fcbcb6.r2.vip.cpolar.cn';

export const login = (data) => {
    return axios.request({
        method: 'post',
        url: BASE_URL + '/users/login',
        data: data
    });
};

export const register = (data) => {
    return axios.request({
        method: 'post',
        url: BASE_URL + '/users/register',
        data: data
    });
};

//获取列表
export const getCommentList = (data) => {
    return axios.request({
        method: 'post',
        url: BASE_URL + '/comment/list',
        data: data
    });
};
export const getUserInfo = (data) => {
    return axios.request({
        method: 'get',
        url: BASE_URL + '/users/getUserInfo',
        params: data
    });
};

export const updateUserInfo = (data) => {
    return axios.request({
        method: 'post',
        url: BASE_URL + '/users/updateUserInfo',
        data: data
    });
};

//新增
export const createComment = (data) => {
    return axios.request({
        method: 'post',
        url: BASE_URL + '/comment/create',
        data: data
    });
};
