<template>
	<view class="page-my">
		<!-- 头部 -->
		<view class="header">
			<!-- 背景 -->
			<image class="bg" src="@/static/images/my/header-bg.png" mode="aspectFill"></image>

			<!-- 个人信息 已登录 -->
			<view class="info" v-if="isLogin">
				<!-- 头像 -->
				<image class="avatar" :src="userHead" mode="aspectFill" @click="clickAvatar"></image>
				<view class="detail">
					<cl-text :size="36" :value="userName" color="#FFFFFF" block bold @click="clickAvatar"> </cl-text>
					<view class="tag" @click="logOut">退出登录</view>
				</view>
			</view>

			<!-- 个人信息 未登录 -->
			<view class="info" v-else @click="clickLogin">
				<!-- 头像 -->
				<image class="avatar" src="@/static/images/my/avatar.png" mode="aspectFill"></image>
				<view class="detail">
					<cl-text :size="36" value="未登录" color="#FFFFFF" block bold></cl-text>
					<view class="tag">未登录</view>
				</view>
			</view>
		</view>

		<view class="order">
			<!-- 订单标题 -->
			<view class="title">
				<view class="left">
					<cl-text :size="32" value="我的订单" color="#292929" bold></cl-text>
				</view>
				<view class="right" @tap="lookOrder(0)">
					<cl-text :size="24" value="查看全部" color="#8D8D8D" bold :margin="[-2, 0, 0, 0]"></cl-text>
					<cl-icon name="cl-icon-arrow-right"></cl-icon>
				</view>
			</view>
			<view class="type">
				<view class="item" v-for="(item, index) in orderList" :key="index">
					<image :src="item.icon" mode="aspectFill" @tap="lookOrder(item.name)"></image>
					<cl-text :size="24" :value="item.title" color="#585858" bold block></cl-text>
				</view>
			</view>
		</view>
		<!-- 其他服务 -->
		<view class="other">
			<view class="item" v-for="(item, index) in otherList" :key="index" @tap="toService(item.url)">
				<image class="mask" :src="item.icon" mode="aspectFill"></image>
				<view :class="index == otherList.length - 1 ? 'content active' : 'content'">
					<cl-text :size="32" :value="item.title" color="#373737" bold></cl-text>
					<cl-icon name="cl-icon-arrow-right"></cl-icon>
				</view>
			</view>
		</view>
		<view class="footer">
			<cl-text value="Image by pikisuperstar on Freepik" color="rgb(229,227,227)"></cl-text>
		</view>

	</view>
</template>

<script>
	import Model from "@/components/comm/model.vue"

	import {
		sdkTool
	} from "@/tsjsFiles/sdk/sdkTool"

	import {
		baseSdk
	} from "@/components/comm/base"
	import {
		Ptype
	} from "@/components/comm/allCfg"
	import {
		syncTool
	} from "@/components/comm/syncTool";

	export default {
		components: {
			Model,

		},
		created() {
			this.getUserInfo()
			const _this = this
			uni.addInterceptor('switchTab', { //监听返回
				success(e) {

					//刷新用户登录状态
					_this.getUserInfo()
				},
			})

		},
		data() {
			return {
				sdkTool,
				// visible: false,
				visibleTip: false,
				content: '',
				isLogin: false, //是否登录中
				userInfo: {},
				userName: '',
				userHead: "/static/images/my/avatar.png",
				backMoney: [{
						num: "0.00",
						title: "总收入",
					},
					{
						num: "0.00",
						title: "待结算",
					},
					{
						num: "0.00",
						title: "余额",
					},
				],
				orderList: [{
						name: 2,
						title: "待结算",
						icon: require("@/static/images/my/await.png"),
					},
					{
						name: 1,
						title: "已结算",
						icon: require("@/static/images/my/finish.png"),
					},
				],
				otherList: [
					// {
					// 	title: "帮助中心",
					// 	icon: require("@/static/images/my/help.png"),
					// },
				],
			};
		},
		methods: {
			//打开个人信息 编辑页面
			clickAvatar() {
				uni.navigateTo({
					url: '/my/userInfo'
				})
			},
			clickLogin() {
				sdkTool.clickLogin({
					success: () => {
						//跳转回去my页面
						uni.switchTab({
							url: '/pages/index/my'
						})
					}
				})
			},
			logOut() {
				sdkTool.logOut(this.getUserInfo.bind(this))
				this.getUserInfo()
			},
			getPhone() {
				sdkTool.getPhone({
					success: () => {
						console.log('获取电话成功 页面自定义回调')
						/*  */
						uni.switchTab({
							url: '/pages/index/index'
						})
					},
					fail: () => {
						console.log('获取电话失败 页面自定义回调')
					},
					cancel: () => {
						console.log('平台没有电话 回调')
					}
				})
			},
			//刷新用户信息
			getUserInfo() {
				console.log('---刷新用户信息---')

				//清空原来的信息
				this.userInfo = {}
				this.userName = ''
				this.userHead = "/static/images/my/avatar.png"

				//user缓存信息
				let userSto = syncTool.getUserSto()
				console.log('request userSto', userSto)
				if (userSto?.user?.roles?.indexOf('consultant') > -1) {
					this.otherList = [{
						title: "家庭成员",
						icon: require("@/static/images/my/member.png"),
						url: "/my/member"
					}, {
						title: "测评报告",
						icon: require("@/static/images/my/report.png"),
						url: "/my/report"
					}, {
						title: "申请记录",
						icon: require("@/static/images/my/report.png"),
						url: "/my/application",

					}, {
						title: "资料修改",
						icon: require("@/static/images/my/report.png"),
						url: "/consultation/inputMessage",

					}]
				} else {
					this.otherList = [{
						title: "家庭成员",
						icon: require("@/static/images/my/member.png"),
						url: "/my/member"
					}, {
						title: "测评报告",
						icon: require("@/static/images/my/report.png"),
						url: "/my/report"
					}, {
						title: "申请入驻",
						icon: require("@/static/images/my/report.png"),
						url: "/my/settled",

					}, {
						title: "申请记录",
						icon: require("@/static/images/my/report.png"),
						url: "/my/application",

					}, ]
				}
				//我有token 就发 没有就不发 //失败是服务器的事情 我不管
				if (userSto == null) {
					console.log('---未登录---')
					this.isLogin = false
					return
				} else {
					console.log('---已经登录---')
					this.userInfo = userSto.user
					this.isLogin = true
					console.log(this.userInfo)

					//名字
					if (this.userInfo.name) {
						this.userName = this.userInfo.name
					} else if (this.userInfo.mobile) {
						this.userName = this.userInfo.mobile
						this.userName = this.userName.slice(0, 3) + 'xxx' + this.userName.slice(7)
					} else {
						this.userName = '设置用户名及头像' //提示设置用户名头像

					}
					//头像
					if (this.userInfo.hand) {
						this.userHead = this.userInfo.hand
					} else {
						//展示默认灰头像
					}
				}
			},
			//跳转上传页面
			toUpload() {
				console.log('跳转上传页面')
				uni.navigateTo({
					url: "/debug/upload",
				});
			},
			//获取头像
			getHeaderUrl() {
				sdkTool.getHeadeUrl({
					success: (url) => {
						//成功
						console.log('获得链接地址')
						console.log(url)
					},
					fail: () => {
						//失败
					},
				})
			},
			//查看订单
			lookOrder(active) {
				uni.navigateTo({
					url: "/my/order?active=" + active,
				});
			},
			//去其他服务页
			toService(url) {
				uni.navigateTo({
					url: url,
				});
			}
		}

	};
</script>

<style scoped lang="scss">
	.page-my {
		padding-bottom: 50rpx;

		.footer {
			width: 100%;
			margin: auto;
			text-align: center;
			margin-top: 10px;
			position: fixed;
			bottom: 70px;
		}

		.header {
			position: relative;
			height: 120px;

			.bg {
				width: 100%;
				height: 100%;
			}

			.info {
				position: absolute;
				display: flex;
				align-items: center;
				left: 0;
				top: 50px;
				padding: 0 32rpx;

				.avatar {
					width: 116rpx;
					height: 117rpx;
					border-radius: 100%;
				}

				.detail {
					margin-left: 18rpx;

					.tag {
						margin-top: 18rpx;
						display: inline-block;
						position: relative;
						padding: 6rpx 18rpx;
						color: #ffffff;
						font-size: 28rpx;
						background: rgba(255, 255, 255, 0.3);
						border-radius: 26rpx;
					}
				}
			}
		}

		.money {
			position: relative;
			padding: 40rpx 30rpx;
			box-sizing: border-box;
			margin: -120rpx auto 0 auto;
			width: 690rpx;
			background: #ffffff;
			border-radius: 16rpx;

			.title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-bottom: 30rpx;
				border-bottom: 1px solid #f5f5f5;

				.right {
					display: flex;
					padding: 4rpx 16rpx 4rpx 20rpx;
					align-items: center;
					background: #80a3ff;
					font-size: 28rpx;
					color: #ffffff;
					border-radius: 25rpx;
				}
			}

			.msg {
				display: flex;

				.item {
					margin-top: 50rpx;
					flex: 1;
					text-align: center;
				}
			}
		}

		.advice {
			margin: 0 auto;
			text-align: center;
			margin-top: 24rpx;
			width: 90%;
			height: 180rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.order {
			margin: 0 auto;
			margin-top: 24rpx;
			padding: 40rpx 30rpx;
			box-sizing: border-box;
			width: 90%;
			background: #ffffff;
			border-radius: 16rpx;

			.title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-bottom: 30rpx;
				border-bottom: 1px solid #f5f5f5;

				.right {
					display: flex;
					align-items: center;
					font-size: 24rpx;
					color: #8d8d8d;
				}
			}

			.type {
				display: flex;
				margin-top: 60rpx;
				padding: 0 25rpx;

				.item {
					text-align: center;
					margin-right: 80rpx;

					image {
						width: 54rpx;
						height: 66rpx;
					}
				}
			}
		}

		.other {
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			margin-top: 24rpx;
			width: 90%;
			background: #ffffff;
			border-radius: 16rpx;

			.item {
				display: flex;
				padding: 40rpx 30rpx 0 30rpx;
				box-sizing: border-box;

				.mask {
					width: 44rpx;
					height: 44rpx;
				}

				.content {
					margin-left: 8rpx;
					display: flex;
					width: 100%;
					align-items: center;
					padding-bottom: 31rpx;
					justify-content: space-between;
					border-bottom: 1px solid #f5f5f5;
				}

				.active {
					border-bottom: none;
				}
			}
		}
	}
</style>
