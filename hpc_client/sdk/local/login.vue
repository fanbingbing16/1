<template>
	<view>
		<Model :visible="visibleTip" :content="content"></Model>

		<view class="login" v-if="baseSdk.ptype===Ptype.gm">
			<cl-form ref="form" :model.sync="form" :rules="rules" label-width="120rpx">
				<cl-form-item prop="name" label="账号">
					<cl-input v-model="form.name" autocomplete="off" validate-on-value-change placeholder="请输入">
					</cl-input>
				</cl-form-item>
				<cl-form-item prop="passport" label="密码">
					<cl-input v-model="form.passport" password autocomplete="off" placeholder="请输入"
						validate-on-value-change></cl-input>
				</cl-form-item>
			</cl-form>
			<view class="button-list">
				<cl-button type="success" @tap="onSubmit('/gmLogin/signin')">登录</cl-button>
				<cl-button type="primary" @tap="onSubmit('/gmLogin/signup')">注册</cl-button>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		validatePass
	} from "./validatePass"
	import Model from "@/components/comm/model.vue"
	import {
		baseSev,
		baseSdk
	} from "@/components/comm/base";
	import {
		Ptype
	} from "@/components/comm/allCfg";
	export default {
		name: 'Login',
		components: {
			Model
		},
		data() {

			return {
				baseSdk,
				Ptype,
				visibleTip: false,
				content: '',
				form: {
					name: "",
					passport: ""
				},
				rules: {
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
		methods: {
			onSubmit(url) {
				this.$refs["form"].validate(valid => {
					if (valid) {
						console.log("baseSev", baseSev);
						uni.request({
							url: baseSev.domain + url,
							// url,
							data: {
								account: this.form.name,
								password: this.form.passport
							},
							method: 'POST',
							success: (result) => {
								console.log(result, 'result')
								if (result.data?.data?.data) {
									uni.setStorage({
										key: 'loginInfo',
										data: result.data.data.data
									})
									
									uni.request({
										url: baseSev.domain + '/openAuth/openAuthLogin',
										data: {
											sdkid: '1',
											params: [
												result.data.data.data?.openid,
												result.data.data.data?.openkey,
											]
										},
										method: 'POST',
										success: (result) => {
											console.log(result)
											this.$emit('getVisible', false)
											uni.setStorage({
												key: 'user',
												data: result?.data?.data?.data,
												success: function() {
													console.log('success');
												}
											});
										},
										fail: (err) => {
											console.log(err, 'err login')
											this.content = ''
											this.visibleTip = true

										}
									})
								} else {
									this.content = result.data?.message || result.data.data?.msg
									this.visibleTip = true
								}

							},
							fail: (result) => {
								console.log(result, 'result err')
								this.content = result
								this.visibleTip = true
							}
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.button-list {
		display: flex;
		justify-content: center;
	}
</style>
