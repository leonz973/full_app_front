### ActionSheet 操作菜单

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/actionsheet'" style="border:none;width:280px;height:100%"></iframe>
</div>

```html
<template>
    <view class="u-demo-area">
        <u-toast ref="uToast"></u-toast>
        <u-button @click="showAction">唤起ActionSheet</u-button>
        <!-- 基本用法 -->
        <u-action-sheet :list="list" v-model="show"></u-action-sheet>
         <!-- 例子用法 -->
        <u-action-sheet :cancel-btn="cancel" :mask-close-able="maskClick" :tips="tips" 
        @click="click" :list="list" v-model="show" :safe-area-inset-bottom="true"></u-action-sheet>
    </view> 
</template>

<script>
    export default {
		data() {
			return {
				list: [{
					text: '最是人间留不住',
				}, {
					text: '朱颜辞镜花辞树',
					disabled: true
				}, {
					text: '正是江南好风景',
					subText: '春江水暖鸭先知'
				}, {
					text: '落花时节又逢君'
				}],
				tips: {
					text: ''
				},
				show: false,
				cancel: true,
				maskClick: true
			}
		},
        methods: {
            showAction() {
				this.show = true;
			},
            click(index) {
				this.$refs.uToast.show({
					type: 'success',
					title: '点击了第' + (index + 1) + '项'
				})
			}
        }
    }
</script>
```