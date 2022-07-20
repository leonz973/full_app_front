/** @format */

import axios from '@/utils/ajaxRequest.js';

// let BASE_URL = 'http://localhost:3000';
let BASE_URL = 'http://4ce2dddf.vip.cpolar.cn';

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

//修改密码
export const changePassword = (data) => {
    return axios.request({
        method: 'post',
        url: BASE_URL + '/users/changePassword',
        data: data
    });
};

//修改用户资料
export const updateUserInfo = (data) => {
    return axios.request({
        method: 'post',
        url: BASE_URL + '/users/updateUserInfo',
        data: data
    });
};

//新增留言
export const createComment = (data) => {
    return axios.request({
        method: 'post',
        url: BASE_URL + '/comment/create',
        data: data
    });
};

//删除留言
export const deleteMessage = (data) => {
    return axios.request({
        method: 'post',
        url: BASE_URL + '/comment/del',
        data: data
    });
};

//编辑留言
export const updateComment = (data) => {
    return axios.request({
        method: 'post',
        url: BASE_URL + '/comment/update',
        data: data
    });
};

//获取留言详情
export const getCommentInfo = (data) => {
    return axios.request({
        method: 'post',
        url: BASE_URL + '/comment/getCommentInfo',
        data: data
    });
};
