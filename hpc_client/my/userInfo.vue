<template>
	<view class="userinfo">
		<cl-toast ref="toast"></cl-toast>
		<!-- 自定义导航 -->
		<cl-topbar title="填写用户信息" style="width: 100%;"></cl-topbar>
		<!-- 头像 -->

		<button v-if="baseSdk.ptype===Ptype.weixin" class="avatar-wrapper" @click="getHeaderUrl"
			open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
			<image class="avatar" :src="avatarUrl"></image>
		</button>

		<button v-if="baseSdk.ptype===Ptype.gm" class="avatar-wrapper" @click="getHeaderUrl"
			@chooseavatar="onChooseAvatar">
			<image class="avatar" :src="avatarUrl"></image>
		</button>

		<!-- 其他信息 -->
		<cl-form ref="form" :model.sync="form" label-width="120rpx" class="form">
			<cl-form-item prop="name" label="昵称">
				<input type="nickname" v-model="nickname" @focus="onFocus" :focus="focus" @input="onInput"
					class="weui-input" placeholder="请输入昵称" />
			</cl-form-item>
		</cl-form>
		<cl-button type="primary" @click="onSubmit" class="submit">提交</cl-button>

	</view>
</template>

<script>
	import {
		request
	} from '@/components/comm/request'
	import {
		syncTool
	} from '@/components/comm/syncTool'
	import {
		sdkTool
	} from '@/tsjsFiles/sdk/sdkTool'
	import {
		allCfg,
		Ptype
	} from '../components/comm/allCfg'
	import {
		basePag,
		baseSdk
	} from '../components/comm/base'
	import {
		selHeader_cbk
	} from '../tsjsFiles/sdk/wx/wx'
	export default {
		data() {
			return {
				defaultAvatarUrl: '/static/images/my/avatar.png',
				avatarUrl: '/static/images/my/avatar.png',
				nickname: '请输入',
				form: {
					nickname: '',
				},
				focus: false,
				baseSdk,
				Ptype
			}
		},
		watch: {
			focus(newVal) {

				if (newVal) {
					if (this.nickname) {
						this.focus = false
					}
				}
			}
		},
		onLoad() {
			//缓存获取用户信息
			const userSto = syncTool.getUserSto()


			if (userSto == null) {
				return
			}
			//设置名字
			if (userSto.user.name?.length > 0) {
				this.nickname = userSto.user.name
			}
			//设置头像
			if (userSto.user.hand?.length > 0) {
				this.avatarUrl = userSto.user.hand
			}
		},
		methods: {
			onChooseAvatar(e) {
				selHeader_cbk(e)

			},
			onInput($event) {
				this.nickname = $event.detail.value
				this.focus = false
				return $event.detail.value
			},
			onFocus(e) {

				this.nickname = e.detail.value
				this.focus = false
			},
			// onChooseAvatar(e) {
			// 	console.log(e, 'e onChooseAvatar')
			// 	this.avatarUrl = e.detail?.avatarUrl
			// },
			async onSubmit() {
				this.focus = true
				if (this.avatarUrl === this.defaultAvatarUrl) {
					this.$refs['toast']?.open({
						message: '请选择头像'
					})
				} else if (!this.nickname) {
					this.$refs['toast']?.open({
						message: '请输入昵称'
					})
				} else {
					//获取我的ID
					const userSto = syncTool.getUserSto()
					if (userSto == null) {
						//失败
						syncTool.showMsg('未登录')
						return;
					}
					//提交个人信息 保存接口
					request({
						url: '/user',
						method: 'PUT',
						data: {
							"id": userSto.user.id,
							"name": this.nickname,
							"hand": this.avatarUrl,
							"mobile": userSto.user.id.mobile ? userSto.user.id.mobile : '',

							"handWx": this.avatarUrl,
							"nameWx": this.nickname,
						}
					}).then((resolve) => {
						//保存成功
						uni.showToast({
							title: '保存成功'
						})
						//设置user缓存
						syncTool.setUser({
							name: this.nickname,
							hand: this.avatarUrl,
						})
						//跳转回MY页面
						uni.switchTab({
							url: '/pages/index/my'
						})
					}).catch(err => {
						syncTool.showMsg('保存失败')
					})
				}
			},
			//获取头像
			getHeaderUrl() {

				sdkTool.getHeadeUrl({
					success: (url) => {
						//成功
						console.log('获得链接地址')
						console.log(url)
						this.avatarUrl = url
					},
					fail: () => {
						//失败
					},
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.userinfo {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		button {
			margin-top: 60rpx;
			// border-radius: 100%;
			// height: 150rpx;
			border: 0;

			image {
				max-width: 150rpx;
				height: 150rpx;
				border-radius: 100%;
			}
		}

		button:after {
			border: 0;
		}

		.form {
			margin: 20px;
			width: 100%;

			/deep/ .cl-form-item__label {
				line-height: inherit;
			}
		}

		.submit {
			width: 200rpx;

			/deep/ button {
				width: 100%;
			}
		}
	}
</style>
