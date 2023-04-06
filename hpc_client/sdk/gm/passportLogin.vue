<template>
	<view class="app-login">
		<cl-dialog title="提示" :visible.sync="visible">
			<cl-text :value="value"></cl-text>
		</cl-dialog>
		<tobar :title="title" >
			<text style="margin-right: 10px;" @click="changUrl">验证码登录&nbsp;</text>
		</tobar>
		<!-- 自定义导航 -->
		<!-- <cl-topbar :title="title" background-color="#FFFFFF" color="#282828" :border="false">
			<template #append>
				<text style="margin-right: 10px;" @click="changUrl">验证码登录&nbsp;</text>
			</template>
		</cl-topbar> -->

		<cl-tabs v-model="active" :gutter="90" :swipeable="false" un-color="#A7A7A7" color="#80A3FF">
			<cl-tab-pane v-for="(item, index) in list" :label="item.label" :refresher-enabled="false" :name="index"
				:key="index">

				<!-- 手机号登录页面 -->
				<view class="phone-content content" v-if="active===0">
					<cl-form ref="form" :model.sync="form" :rules="rulesPhone" label-width="30px">
						<cl-form-item prop="phone" label="号码">
							<cl-input v-model="form.phone" autocomplete="off" validate-on-value-change
								placeholder="请输入手机号">
							</cl-input>
						</cl-form-item>
						<cl-form-item prop="passport" label="密码">
							<cl-input v-model="form.passport" password autocomplete="off" placeholder="请输入"
								validate-on-value-change></cl-input>
						</cl-form-item>
					</cl-form>
					<cl-button :type="buttonType" @click="onSubmit_phone">手机号登录</cl-button>

					<view class="read">
						<text class="forget" @click="forgetPass">忘记密码？</text>
						<cl-checkbox v-model="check" label="1">我已阅读并同意XXX</cl-checkbox>
					</view>
					<view class="footer">
						<cl-divider>第三方登录</cl-divider>
						<view class="quan"></view>
					</view>
				</view>

				<!-- 账号密码登录页面 -->
				<view class="name-content content" v-if="active===1">
					<cl-form ref="form" :model.sync="nameForm" label-width="30px">
						<cl-form-item prop="name" label="账号">
							<cl-input v-model="nameForm.name" autocomplete="off" validate-on-value-change
								placeholder="请输入账号">
							</cl-input>
						</cl-form-item>
						<cl-form-item prop="passport" label="密码">
							<cl-input v-model="nameForm.passport" password autocomplete="off" placeholder="请输入"
								validate-on-value-change></cl-input>
						</cl-form-item>
					</cl-form>
					<cl-button :type="buttonTypeEmail" @click="onSubmit_name">账号登录</cl-button>

					<view class="read">
						<text class="forget" @click="forgetPass">忘记密码？</text>
						<cl-checkbox v-model="check" label="1">我已阅读并同意XXX</cl-checkbox>
					</view>
					<view class="footer">
						<cl-divider>第三方登录</cl-divider>
						<view class="quan"></view>
					</view>
				</view>


			</cl-tab-pane>
		</cl-tabs>



	</view>
</template>

<script>
	import {
		ref
	} from "vue";
	import {
		basePag,
		baseSdk,
		baseSev
	} from "@/components/comm/base";
	import {
		openAuthLogin
	} from "@/components/comm/login";
	import {
		login_cbk
	} from "@/tsjsFiles/sdk/gm/gm";
import {
		request
	} from "@/components/comm/request";	
	import Tobar from "@/pages/commVue/topbar.vue"


	export default {
		name: 'AppLogin',
		components:{
			Tobar
		},
		data() {
			return {
				active: 1,
				list: [{
						label: '手机号登录'
					},
					{
						label: '账号登录'
					}
				],
				value: '请勾选同意xxx',
				visible: false,
				title: '',
				check: '',
				form: {
					phone: '',
					passport: ''
				},
				emailForm: {
					passport: '',
					email: ''
				},
				Toast: '',
				buttonType: 'info',
				buttonTypeEmail: 'info',
				rulesPhone: {
					phone: {
						require: true,
						message: "手机号不能为空",
						trigger: 'blur'
					},
				},

				//账号密码
				nameForm: {
					name: "",
					passport: ""
				},
				rulesName: {
					name: {
						required: true,
						message: "账号不能为空",
						trigger: 'blur'
					},
					passport: {
						required: true,
						message: "密码不能为空",
						trigger: 'blur'
					},

				},


			}
		},
		watch: {
			//按钮的类型
			'form.phone'(newVal, oldVal) {
				if (this.onSubmit_phone(null, false)) {
					this.buttonType = 'primary'
				} else {
					this.buttonType = 'info'
				}
			},
			'form.passport'(newVal, oldVal) {
				if (this.onSubmit_phone(null, false)) {
					this.buttonType = 'primary'
				} else {
					this.buttonType = 'info'
				}
			},
			'nameForm.name'(newVal, oldVal) {
				if (this.onSubmit_name(null, false)) {
					this.buttonTypeEmail = 'primary'
				} else {
					this.buttonTypeEmail = 'info'
				}
			},
			'nameForm.passport'(newVal, oldVal) {
				if (this.onSubmit_name(null, false)) {
					this.buttonTypeEmail = 'primary'
				} else {
					this.buttonTypeEmail = 'info'
				}
			},
			'check'(newVal, oldVal) {
				if (this.onSubmit_name(null, false)) {
					this.buttonTypeEmail = 'primary'
				} else {
					this.buttonTypeEmail = 'info'
				}

				if (this.onSubmit_phone(null, false)) {
					this.buttonType = 'primary'
				} else {
					this.buttonType = 'info'
				}
			}
		},
		methods: {
			//切换到验证码登录页面
			changUrl() {
				uni.navigateTo({
					url: '/passport/app/appLogin'
				})
			},
			//忘记密码
			forgetPass() {
				
				uni.navigateTo({
					url: `/passport/app/appLogin?isResetPassport=1`
				})
			},

			//手机号登录
			onSubmit_phone($event, visible = true) {
				if (!visible) {
					return false
				}
				alert('手机号登录还没做')
				return false
			},

			//账号登录
			onSubmit_name($event, visible = true) {
				if (!this.check) {
					this.value = '请勾选同意xxx'
					this.visible = visible
					return false
				}

				if (!this.nameForm.name) {
					this.value = '必须输入账号'
					this.visible = visible
				} else if (!this.nameForm.passport) {
					this.value = '必须输入密码'
					this.visible = visible
				} else {
					//success
					if (!visible) {
						return true
					}
					console.log('前端验证完成 success')
					this.sigin()
					return true
				}
				return false
			},
			//登录
			sigin() {
				
				request({
					url: '/gmLogin/signin',
					data: {
						account: this.nameForm.name,
						password: this.nameForm.passport
					},
					method: 'POST'
				}).then((resolve) => {
					console.log('登录成功 resolve')
					console.log(resolve)
					//登录成功回调
					login_cbk(resolve)
				}).catch(err => {
					console.log(err,'err')
					if (err.data?.data?.msg?.indexOf('密码不正确') > -1) {
						uni.showToast({
							title: '密码不正确',
							icon: 'none'
						})
					} else if (err.data.data?.msg !== 'ok') {
						//登录失败转注册
						console.log('登录失败转注册')
						this.signupSignin()
					} else {
						//网络错误  ?
						console.log('其他原因登录失败')
					}
					console.log('登录失败 catch')
					console.log(err)
				})
			},
			//注册
			signupSignin() {
				uni.request({
					url: baseSev.domain + '/gmLogin/signup',
					data: {
						account: this.active === 0 ? this.form.phone : this.nameForm.name,
						password: this.active === 0 ? this.form.passport : this.nameForm.passport,
						phone: this.active === 0 ? this.form.phone : ''
					},
					method: "POST",
					success: (resultSignup) => {
						console.log(resultSignup, 'resultSignup')
						this.sigin()
					},
					fail: (res) => {
						console.log(res, 'resultSignup fail')
						login_cbk(null)
					}
				})
			},

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
				display: flex;
				flex-direction: column;
				margin-top: 10px;
				text-align: center;
				color: #b9b9b9;

				.forget {
					margin-bottom: 20px;
				}
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
