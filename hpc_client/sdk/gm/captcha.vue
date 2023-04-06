<template>
	<view class="captcha">
		<!-- 自定义导航 -->
		<cl-topbar title="" background-color="#FFFFFF" color="#282828" :border="false" @click="back">
			<template #append>
				<text style="margin-right: 10px;"></text>
			</template>
		</cl-topbar>
		<view class="content">
			<view class="text">
				<text class="title">输入验证码</text>
				<text class="small">验证码已发送至 {{phone}}</text>
			</view>
			<cl-captcha @done="captchaDone"></cl-captcha>
			<text class="captcha-text" :style="'color:'+(timer>0?'#a8a8a8;':'#000;')" @click="captchaClick">重新发送
				<text v-if="timer>0">({{timer}})</text>
			</text>
		</view>
	</view>
</template>

<script>
	import {
		baseUrl
	} from "@/components/comm/base.ts"
	export default {
		onLoad: function(option) {
			console.log(option, 'optuo')
			this.phone = option?.phone || option.email
			this.isResetPassport = option.isResetPassport || ''
		},
		created() {
			this.captchaClick()
			this.sendMobileCaptcha()
		},
		data() {
			return {
				timer: 0,
				phone: '',
				isResetPassport: '',
			}
		},
		methods: {
			sendMobileCaptcha() {
				uni.request({
					url: '/api/auth/auth/sendMobileCaptcha',
					data: {
						phone: this.phone
					},
					method: 'POST',
					success: (result) => {
						console.log(result, 'result')
					},
					fail: (result) => {
						console.log(result, 'result err')
					}
				})
			},
			back() {
				uni.navigateTo({
					url: '/passport/app/appLogin'
				})
			},
			captchaClick() {
				//倒计时不为0的时候不可以点击
				if (this.timer === 0) {
					this.sendMobileCaptcha()
					this.timer = 30
					const inter = setInterval(() => {
						if (this.timer > 1) {
							this.timer--
						} else {
							this.timer = 0
							clearInterval((inter))
						}
					}, 1000)
				}

			},
			//验证码输入完成
			captchaDone(value) {
				console.log(value, 'value')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.captcha {
		width: 100%;
		height: 100%;
		background: #fff;

		.content {
			padding: 20px;
			background: #fff;
			height: 100%;
			width: 100%;

			/deep/ .cl-captcha {

				width: calc(100% - 40px);
				margin-top: 20px;
			}

			.captcha-text {
				margin-top: 20px;
				text-align: center;
				display: block;
				width: calc(100% - 40px);
			}

			.text {
				display: flex;
				flex-direction: column;

				.small {
					padding-top: 4px;
					font-size: 14px;
					color: #a8a8a8;
				}

				.title {
					font-size: 18px;
					font-weight: 600;
				}
			}

		}
	}
</style>
