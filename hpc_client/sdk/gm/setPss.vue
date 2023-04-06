<template>
	<view class="app-login">
		<cl-dialog title="提示" :visible.sync="visible">
			<cl-text :value="value"></cl-text>
		</cl-dialog>

		<!-- 自定义导航 -->
		<cl-topbar :title="title" background-color="#FFFFFF" color="#282828" :border="false">
		</cl-topbar>
		<view class="content">
			<text class="title">设置密码</text>
			<cl-form ref="form" :model.sync="form" label-width="30px" tips="inner">
				<cl-form-item prop="passport" label="密码">
					<cl-input v-model="form.passport" password autocomplete="off" placeholder="请输入"
						validate-on-value-change></cl-input>
				</cl-form-item>
			</cl-form>
			<cl-button :type="buttonType" @click="onSubmit">确定</cl-button>
		</view>
	</view>
</template>

<script>
	import {
		ref
	} from "vue";

	export default {
		name: 'setPass',
		data() {
			return {
				visible: false,
				title: '',
				check: '',
				value: '请勾选同意xxx',
				form: {
					passport: ''
				},
				Toast: '',
				buttonType: 'info',
			}
		},
		watch: {
			'form.passport'(newVal, oldVal) {
				if (this.onSubmit(null, false)) {
					this.buttonType = 'primary'
				} else {
					this.buttonType = 'info'
				}
			}
		},
		methods: {
			onSubmit($event, visible = true) {
				if (!this.form.passport) {
					this.value = '请设置密码'
					this.visible = visible
					return
				} else {
					if (visible) {
						uni.switchTab({
							url: `/pages/index/my`
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
