### radio 单选框

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/radio'" style="border:none;width:280px;height:100%"></iframe>
</div>


#### 例子代码

```html
<template>
    
    <view class="u-demo-area">
        <!-- 常用例子 -->
        <view class="">
            <u-radio-group v-model="value" @change="radioGroupChange">
                <u-radio 
                    @change="radioChange" 
                    v-for="(item, index) in list" :key="index" 
                    :name="item.name"
                    :disabled="item.disabled"
                >
                    {{item.name}}
                </u-radio>
            </u-radio-group>
        </view>

        <!-- 演示例子 -->
        <view class="">
            <u-radio-group :shape="shape" :size="size" :width="width" :wrap="wrap" v-model="value"
                @change="radioGroupChange" :activeColor="activeColor">
                <u-radio @change="radioChange" v-for="(item, index) in list" :disabled="item.disabled"
                    :key="index" :name="item.name">{{item.name}}</u-radio>
            </u-radio-group>
        </view>
        <view class="u-demo-result-line">
            {{value ? `选中了"${result}"` : '请选择'}}
        </view>
    </view>
</template>

<script>
    export default {
		data() {
			return {
				list: [{  // 列表数据
						name: '荔枝',
						checked: true,
						disabled: false
					},
					{
						name: '香蕉',
						checked: false,
						disabled: false
					},
					{
						name: '橙子',
						checked: false,
						disabled: false
					},
					{
						name: '草莓',
						checked: false,
						disabled: false
					}
				],
                value: '荔枝',
				disabled: false,  
				result: '荔枝',   // 选中结果
				shape: 'circle',  //可以通过设置shape为square或者circle，将单选框设置为方形或者圆形		
				activeColor: '#2979ff',  //此处所指的颜色，为radio选中时的背景颜色，参数为active-color
				size: 34,     // radio组件整体的大小，单位rpx
				wrap: false,  //是否每个radio占一行
				width: 'auto' //radio的宽度，需带单位，如50%，150rpx
			}
		},
        methods: {
           // 选中某个单选框时，由radio时触发
            radioChange(e) {
                // console.log(e);
            },
            // 选中任一radio时，由radio-group触发
            radioGroupChange(e) {
                this.result = e;
                // console.log(e);
            }
        }
    }
</script>
```