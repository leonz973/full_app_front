// 用户名字
export function getUserName() {
    return uni.getStorageSync('userName');
}

export function setUserName(userName) {
    return uni.setStorageSync('userName', userName);
}

// 用户id
export function getUserId() {
    return uni.getStorageSync('userId');
}

export function setUserId(userId) {
    return uni.setStorageSync('userId', userId);
}

export function getDeptId() {
    return getUserInfo().bmbh;
}


export function getOpenId() {
    return getUserInfo().openId;
}


export function isLeader() {
    return parseInt(getUserInfo().sfld, 10) === 1;
}

export function getUserAccount() {
    return getUserInfo().xtzh;
}

// 获取用户信息
export function getUserInfo() {
    return JSON.parse(uni.getStorageSync('userInfo') || '{}');
}

export function setUserInfo(info) {
    uni.setStorageSync('userInfo', JSON.stringify(info));
}
