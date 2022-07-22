<!-- @format -->

<template>
    <div class="list-from-card">
        <u-form
            :model="model"
            :rules="rules"
            ref="uForm"
            :errorType="errorType"
            :border-bottom="false"
        >
            <p-mui-card>
                <view slot="title" class="from-title">创建留言</view>
                <view slot="body">
                    <u-form-item
                        label-width="150"
                        label-position="left"
                        :border-bottom="false"
                        label="内容"
                        class="must-fill"
                        prop="content"
                    >
                        <u-input
                            placeholder="请输入"
                            v-model="model.content"
                            type="textarea"
                        ></u-input>
                    </u-form-item>
                </view>
            </p-mui-card>
        </u-form>
        <p-mui-card>
            <view slot="title" class="from-title">添加图片</view>
            <view slot="body">
                <u-gap height="20" bgColor="#fff"></u-gap>
                <div class="btn-box">
                    <u-button
                        :plain="true"
                        text="选择图片"
                        @click="chooseImage()"
                        >选择图片</u-button
                    >
                </div>
                <u-gap height="20" bgColor="#fff"></u-gap>
                <uAlbum
                    v-if="showAlbum"
                    :urls="pics"
                    :deletable="true"
                    @deletePic="deletePic"
                ></uAlbum>
                <u-gap height="20" bgColor="#fff"></u-gap>
            </view>
        </p-mui-card>

        <div class="btns">
            <u-button @click="cancel">取消</u-button>
            <u-button type="primary" @click="submit">提交</u-button>
        </div>
    </div>
</template>

<script>
import { createComment, BASE_URL } from '@/api/api';
import uAlbum from '../components/u-album/u-album.vue';

export default {
    name: 'createMessage',
    components: {
        uAlbum
    },
    data() {
        return {
            pics: [],
            showAlbum: false,
            model: {
                content: ''
            },
            rules: {
                content: [
                    {
                        required: true,
                        message: '请输入内容',
                        trigger: ['change', 'blur']
                    }
                ]
            },
            errorType: ['message']
        };
    },
    created() {},
    watch: {
        pics: {
            handler() {
                this.showAlbum = false;
                let timer = setTimeout(() => {
                    this.showAlbum = true;
                    clearTimeout(timer);
                }, 100);
            }
        }
    },
    onReady() {
        this.$refs.uForm.setRules(this.rules);
    },
    methods: {
        //保存
        submit() {
            this.$refs.uForm.validate((valid) => {
                if (valid) {
                    console.log('验证通过');
                    createComment({
                        content: this.model.content,
                        pics: this.pics
                    }).then((res) => {
                        uni.showModal({
                            title: '提示',
                            content: '创建成功',
                            showCancel: false,
                            success: (r) => {
                                if (r.confirm) {
                                    uni.navigateBack();
                                }
                            }
                        });
                    });
                } else {
                    console.log('验证失败');
                }
            });
        },
        cancel() {
            uni.navigateBack();
        },
        //上传
        chooseImage() {
            if (this.pics.length >= 9) {
                uni.showToast({
                    title: '最多选择9张',
                    icon: 'none'
                });
                return;
            }
            uni.chooseImage({
                count: 1,
                success: (imageFile) => {
                    if (imageFile.tempFiles.length) {
                        // console.log(imageFile);
                        uni.showLoading({
                            title: '上传中'
                        });
                        uni.uploadFile({
                            url: BASE_URL + '/uploadImages',
                            filePath: imageFile.tempFilePaths[0],
                            name: 'file',
                            header: {
                                Authorization:
                                    'Bearer ' + uni.getStorageSync('token')
                            },
                            timeout: 30000,
                            formData: {},
                            success: (res) => {
                                // console.log(res);
                                uni.showToast({
                                    title: '上传成功'
                                });
                                if (res.statusCode === 200) {
                                    this.pics.push(
                                        JSON.parse(res.data).data.url
                                    );
                                }
                            },
                            fail: (err) => {
                                uni.showToast({
                                    title: '上传失败'
                                });
                            }
                        });
                    }
                }
            });
        },
        //删除图片
        deletePic(item) {
            uni.showModal({
                title: '提示',
                content: '确认删除吗？',
                success: (r) => {
                    if (r.confirm) {
                        this.pics.forEach((pic, index) => {
                            if (item === pic) {
                                this.pics.splice(index, 1);
                            }
                        });
                    }
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.list-from-card {
    padding-top: 20rpx;
    /deep/ .p-mui-card .p-mui-card-title {
        border-bottom: none;
    }

    /deep/ .p-mui-card .p-mui-card-body {
        padding: 0;
    }

    .u-form {
        background-color: transparent;
        padding: 0;
    }

    .must-fill {
        padding: 10rpx 0;
        padding-left: 30rpx;
        position: relative;
        &::before {
            content: '*';
            position: absolute;
            top: 26rpx;
            left: 10rpx;
            color: red;
        }
        &.label-top {
            &::before {
                top: 0;
            }
        }
    }

    .u-input {
        text-align: right !important;
    }

    .btns {
        display: flex;
        justify-content: space-evenly;
        .u-btn {
            width: 30%;
            height: 80rpx;
        }
    }

    /deep/.u-form-item__message {
        text-align: right !important;
    }

    .from-title {
        position: relative;
        padding-left: 20rpx;
        &::before {
            position: absolute;
            content: '';
            left: 0;
            top: 40rpx;
            width: 12rpx;
            height: 12rpx;
            border-radius: 50%;
            background-color: #3cabff;
        }
    }

    .time-box {
        float: right;
    }
}
.btn-box {
    width: 320rpx;
    .u-btn {
        width: 70%;
        height: 80rpx;
        line-height: 80rpx;
        font-size: 28rpx;
    }
}
</style>
