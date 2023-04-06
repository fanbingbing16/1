<template>
	<view class="confirm">
		<view class="header">
			<!-- <image class="mask" src="@/static/icon/invite/left.png" mode="aspectFill"></image> -->
			<!-- <cl-text :size="40" value="推广期间,限时分享免单" color="#FFE6B1" bold :margin="[0, 16, 0, 16]"></cl-text> -->
			<!-- <image class="mask" src="@/static/icon/invite/right.png" mode="aspectFill"></image> -->
			<cl-text :size="40" value="免费获取报告" color="#000" bold :margin="[0, 16, 0, 16]"></cl-text>
		</view>
		<view class="content">
			<view class="one">
				<cl-text value="点击下方分享按钮,分享给新用户,成功分享本次测评即可免费查看报告" color="#000" :size="30"></cl-text>
				<!-- <cl-text value="只要新用户点击了我的分享,即可" color="#fff" :size="30"></cl-text>
				<cl-text value="免单" color="rgb(255, 230, 177)" :size="30"></cl-text> -->
			</view>
			<view class="tip">
				<cl-text value="(隐私保护)测试内容不会被分享" color="rgb(175 175 175)"></cl-text>
			</view>

			<cl-textarea v-model="form.content" :auto-height="true"></cl-textarea>


			<button class="btn" @click="onShareMessage" open-type="share">
				<!-- <image src="@/static/images/invite/btn-bg.png" mode="aspectFill"></image> -->
				<view class="text">立即邀请好友</view>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Confirm',
		props: {
			params: {
				default: () => {
					return {
						id: ''
					}
				}
			},
			image: {
				default: 'https://cdn.weimigames.com/hpc_c/upload/lbIcon/icon/34.jpg'
			}
		},
		data() {
			return {
				form: {
					content: '我在做儿童心理测试,请帮我助力'
				}
			}
		},
		created() {
			console.log(this.params, 'params')
		},
		methods: {
			onShareMessage() {
				console.log('onShareMessage', wx.onAppRoute)
				let pages = getCurrentPages()
				let view = pages[pages.length - 1]
				console.log(view, 'view', this.params,view.onShareAppMessage)
				
				view.onShareAppMessage = () => {
					//分享配置
					return {
						title: this.form.content, // 子页面的title
						path: 'scale/shared/reception?recordId=' + this.params.id,
						imageUrl: this.image
					};
				}
				

			}
		}
	}
</script>

<style lang="scss" scoped>
	.confirm {
		// background: red;
		width: 100%;
		height: 100%;
		padding: 40rpx;
		box-sizing: border-box;
		background-color: #fff;

		.content {
			text-align: center;
			width: 100%;
			margin-top: 40rpx;

			/deep/ .cl-form-item__label {
				// color: #fff;
			}

			.one {
				display: flex;
				justify-content: center;
			}

			.tip {
				margin-bottom: 40rpx;
			}

			.btn {
				background-color: #06c160;
				color: #fff;
				margin-top: 20rpx;
				border-radius: 50rpx;
			}


			.btn:active {

				transform: translateY(4px);
			}
		}

		.header {

			display: flex;
			align-items: center;
			justify-content: center;

			.mask {
				width: 63rpx;
				height: 14rpx;
			}
		}
	}
</style>
