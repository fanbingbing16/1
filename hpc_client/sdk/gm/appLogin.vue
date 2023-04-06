<template>
	<!--  -->
	<view class="app-login">
		<cl-dialog title="提示" :visible.sync="visible">
			<cl-text :value="value"></cl-text>
		</cl-dialog>

		<!-- 自定义导航 -->
		<cl-topbar :title="title" background-color="#FFFFFF" color="#282828" :border="false">
			<template #append>
				<text style="margin-right: 10px;" @click="changUrl" v-if="!isResetPassport">密码登录&nbsp;</text>
			</template>
		</cl-topbar>
		<view class="content">
			<view class="header-text">
				<text class="title" v-if="!isResetPassport">登录</text>
				<text class="small" v-if="!isResetPassport">未注册的手机号默认登录</text>
			</view>
 
			<cl-tabs v-model="active" :gutter="90" :swipeable="false" un-color="#A7A7A7" color="#80A3FF"
				v-if="isResetPassport">
				<cl-tab-pane v-for="(item, index) in topList" :label="item" :refresher-enabled="false" :name="index"
					:key="index">
				</cl-tab-pane>
			</cl-tabs>
			<cl-form ref="form" :model.sync="form" :rules="rules" label-width="30px" tips="inner">
				<cl-form-item prop="name" label="号码" label-width="30px"
					v-if="(isResetPassport&&active===0)||!isResetPassport">
					<cl-input v-model="form.name" validate-on-value-change placeholder="请输入手机号">
					</cl-input>
				</cl-form-item>
				<cl-form-item prop="email" label="邮箱" v-if="isResetPassport&&active===1">
					<cl-input v-model="form.email" autocomplete="off" validate-on-value-change
						placeholder="请输入xxx@xxx.xxx格式的邮箱">
					</cl-input>
				</cl-form-item>
			</cl-form>
			<cl-button :type="buttonType" @click="onSubmit">获取验证码</cl-button>
			<view class="read">
				<cl-checkbox v-model="check" label="1" v-if="!isResetPassport">我已阅读并同意XXX</cl-checkbox>
			</view>
			<view class="footer" v-if="!isResetPassport">
				<cl-divider>第三方登录</cl-divider>
				<view class="quan"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ref
	} from "vue";

	export default {
		name: 'AppLogin',
		onLoad: function(option) {
			//为1是找回密码
			this.isResetPassport = option.isResetPassport || ''
		},
		data() {
			return {
				active: 0,
				topList: ['找回手机密码', '找回邮箱密码'],
				visible: false,
				isResetPassport: '',
				title: '',
				check: '',
				value: '请勾选同意xxx',
				form: {
					name: '',
					email: ''
				},
				Toast: '',
				buttonType: 'info',
				rules: {
					name: [{
							require: true,
							message: "手机号不能为空",
							trigger: 'blur'
						},
						{
							min: 11,
							max: 11,
							message: '请输入11位手机号',
							trigger: "blur"
						}
					]
				}
			}
		},
		watch: {
			visible(newVal, oldVal) {
				console.log(newVal, oldVal, 'visible')
			},
			check(newVal, oldVal) {
				this.changeButtonType()
			},
			'form.name'(newVal, oldVal) {
				this.changeButtonType()
			},
			'form.email'(newVal, oldVal) {
				this.changeButtonType()
			}
		},
		methods: {
			changeButtonType() {
				if (this.onSubmit(null, false)) {
					this.buttonType = 'primary'
				} else {
					this.buttonType = 'info'
				}
			},
			changUrl() {
				uni.navigateTo({
					url: '/pages/passport/app/passportLogin'
				})
			},
			onSubmit($event, visible = true) {
				if (!this.isResetPassport && !this.check) {
					this.value = '请勾选同意xxx'
					this.visible = visible

					return
				} else if (((this.isResetPassport && this.active === 0) || !this.isResetPassport) && this.form.name
					?.length !== 11) {
					this.value = '必须输入十一位手机号'
					this.visible = visible

				} else if ((this.isResetPassport && this.active === 1) && !(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this
						.form.email))) {
					this.value = '邮箱格式不正确'
					this.visible = visible

				} else {
					if (visible) {
						uni.navigateTo({
							url: `/passport/app/captcha?isResetPassport=1&phone=${this.form.name||this.form.email}`,
							fail: (navigateFail) => {
								console.log(navigateFail,'fail navigateFail')
							}
						})
					}

					return true
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.app-login {
		height: 100%;
		width: 100%;

		.content {
			padding: 20px;
			background: #fff;
			height: 100%;
			width: 100%;

			.header-text {
				display: flex;
				flex-direction: column;

				.small {
					padding-top: 4rpx;
					font-size: 14rpx;
					color: #a8a8a8;
					margin-bottom: 20rpx;
				}
			}

			/deep/ .cl-form {
				width: 90%;
			}

			/deep/ .cl-button {
				width: 90%;
			}

			.title {
				font-size: 18px;
				font-weight: 600;
			}

			.read {
				margin-top: 10px;
				text-align: center;
				color: #b9b9b9;
			}

			.footer {
				margin-top: 100px;
				width: calc(100% - 40px);

				.quan {
					width: 50px;
					height: 50px;
					border-radius: 100%;
					background: #ddd;
					margin: auto;
				}
			}
		}
	}
</style>
