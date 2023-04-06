<template>
	<view >
		<!-- 自定义导航 -->
		<cl-topbar :title="title" background-color="#FFFFFF" color="#282828" :border="false">
			<template #append>
				<text>加个头部用来返回</text>
			</template>
		</cl-topbar>
			
		<view class='header'>
			<image src='@/static/images/weix.png'></image>
		</view>
		<cl-toast ref="toast" position="middle"></cl-toast>

		<view class='content'>
			<view>申请获取以下权限：</view>
			<text>获得你的手机号码</text>
		</view>
		<button class='bottom' type='primary' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信授权</button>
	</view>

</template>

<script>
	import {
		Ptype
	} from '@/components/comm/allCfg'
	import {
		baseSdk,
		baseSev
	} from '@/components/comm/base'
	import { getPhone_cbk } from '@/tsjsFiles/sdk/wx/wx'


	export default {
		name: 'GetPhoneNumber',
		data() {
			return {
				baseSdk,
				Ptype,

			}
		},
		methods: {
			getPhoneNumber(e) { //获取完微信手机号的回调
				getPhone_cbk(e)
			}
		}
	}
</script>

<style scoped>
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 180rpx;
		height: 180rpx;

	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
