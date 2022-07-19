import {
    getUserStatus
} from '@/api/app/index.js';
import {
    setUserInfo,
    setUserId,
    setUserName
} from '@/utils/common.js';
export default new class User {
    isLogin() {
        uni.login({
            provider: 'weixin',
            success: function (loginRes) {
                let code = loginRes.code;
                console.log(code);
                getUserStatus({
                    code: code
                }).then(res => {
                    console.log(res);
                    if (res.status == '000') {
                        let status = res.data.userStatus || res.data.USERSTATUS;
                        switch (status) {
                            case 0:
                            case '0':
                                break;
                            case 1:
                            case '1':
                                // 审核中
                                uni.reLaunch({
                                    url: '/views/app/check'
                                })
                                break;
                            case 2:
                            case '2':
                                uni.setStorageSync('password', res.data.yhmm);
                                uni.setStorageSync('account', res.data.xtzh);
                                // 成功
                                uni.reLaunch({
                                    url: '/views/app/success'
                                })
                                break;
                            case 3:
                            case '3':
                                // 审核不通过
                                uni.reLaunch({
                                    url: '/views/app/error'
                                })
                                break;
                            case 4:
                            case '4':
                                // 保存用户信息
                                uni.setStorageSync('login', true);
                                setUserId(res.data.yhid);
                                setUserName(res.data.name);
                                setUserInfo(res.data);
                                // todo 保存各种数据
                                uni.reLaunch({ //信息更新成功后跳转到小程序首页
                                    url: '/views/air/Layout'
                                });
                                break;
                        }
                    } else {
                        uni.showToast({
                            icon: 'none',
                            title: res.msg || '系统异常'
                        });
                    }
                })
            }
        });
    }
}();
