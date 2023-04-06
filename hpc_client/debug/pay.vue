<template>
	<view class="introduce">
		<view class="back">
			<!-- 自定义导航 -->
			<cl-topbar title="订单支付展示" :border="false">
			</cl-topbar>
		</view>

		<view class="header" v-if="false">
			订单id: {{orderId}}<br />

			<!-- 订单查询中 -->
			<template v-if="orderData.status == -1">
				订单查询中...
			</template>

			<!-- 订单未完成 -->
			<template v-if="orderData.status == 0">
				订单未完成<br />
				<button v-if="providers.wxpay" @click="do_uni_wxpay">微信支付</button>
				<button @click="do_debug_pay">测试支付</button>
			</template>

			<!-- 订单已完成 -->
			<template v-if="orderData.status == 1">
				订单已完成
			</template>
			数量: {{orderData.count}}<br />
			CP订单id: {{orderData.cpOrderId}}<br />
			PT订单id: {{orderData.ptOrderId}}<br />
			状态: {{orderData.status}}<br />
			userId: {{orderData.userId}}<br />
			createdAt: {{orderData.createdAt}}<br />
			params: {{orderData.params}}<br />
			paymentAt: {{orderData.paymentAt}}<br />
			updatedAt: {{orderData.updatedAt}}<br />
			sdkId: {{orderData.sdkId}}<br />
			pcy: {{orderData.pcy}}<br />

		</view>
		<view class="content">
			<cl-card label="订单详情" :show-more="false">
				<cl-list-item type="success" justify="start" border>
					<view class="cs-block">
						<cl-avatar :size="120" shape="square" :src="orderData.product.icon">
						</cl-avatar>
					</view>
					<cl-text :margin="['20rpx']" :size="28" :value="orderData.product.name"></cl-text>

					<view class="append" slot="append">
						<cl-text :size="44" type="price" :value="orderData.price" bold></cl-text>
					</view>
				</cl-list-item>
				<cl-list-item label="订单编号" border>
					<cl-text :size="28" color="#ccc" :value="orderId"></cl-text>
				</cl-list-item>
				<cl-list-item label="下单数量" border>
					<cl-text :size="28" :value="orderData.count"></cl-text>
				</cl-list-item>
				<cl-list-item label="支付状态" border>
					<cl-text :size="28" :value="paymentStartusText[orderData.status]"></cl-text>
				</cl-list-item>
				<cl-list-item border>
					<cl-text :margin="['20rpx']" color="#ccc" :size="28" value="无可用优惠卷"></cl-text>
					<text slot="append" class="cl-icon-arrow-right"></text>
				</cl-list-item>
				<cl-list-item>
					<cl-button v-if="orderData.status == 0" @click="cancleOrder">取消订单</cl-button>
					<cl-button v-if="orderData.status == PaymenStatus.success&&getDateSize7" @click="refuneOrder">退款
					</cl-button>
					<cl-text :margin="['20rpx']" :size="34" value="合计"></cl-text>
					<cl-text slot="append" :size="44" type="price" :value="orderData.price" bold></cl-text>
				</cl-list-item>
			</cl-card>
			<cl-card label="选择支付方式" :showMore="false" v-if="orderData.status == 0">
				<cl-radio-group v-model="checkPay">

					<cl-list-item type="success" justify="start">
						<view class="cs-block">
							<cl-avatar :size="60" shape="square"
								src="http://companyoss01.oss-cn-hangzhou.aliyuncs.com/hpc_c/backEnd/be_2f4756bc-d517-4a44-a494-59ee8b698951.png">
							</cl-avatar>
						</view>
						<cl-text :margin="['20rpx']" color="#67c23a" :size="28" value="微信支付"></cl-text>

						<view class="append" slot="append">
							<cl-radio v-model="checkPay" label="1"></cl-radio>
						</view>
					</cl-list-item>

					<cl-list-item type="success" justify="start">
						<view class="cs-block">
							<cl-avatar :size="60" shape="square"
								src="http://companyoss01.oss-cn-hangzhou.aliyuncs.com/hpc_c/backEnd/be_9a15aded-b214-4a9e-b55c-c3badff748ac.png">
							</cl-avatar>
						</view>
						<cl-text :margin="['20rpx']" color="#009fe8" :size="28" value="测试支付"></cl-text>

						<view class="append" slot="append">
							<cl-radio v-model="checkPay" label="2"></cl-radio>
						</view>
					</cl-list-item>
				</cl-radio-group>
			</cl-card>
		</view>
		<cl-button class="pay_btn" type="success" @click="do_pay" v-if="orderData.status == 0">支付</cl-button>
	</view>
</template>

<script>
	import {
		sdkTool
	} from '@/tsjsFiles/sdk/sdkTool'
	import {
		request
	} from '@/components/comm/request'
	import {
		syncTool
	} from '@/components/comm/syncTool'
	import {
		PaymenStatus,
		paymentStartusText
	} from '@/components/comm/allCfg'
	export default {
		components: {
			// ButtonText
		},
		onLoad: function(param) {

			//保存订单ID
			this.orderId = param.orderId

			// 请求订单信息
			this.selorde()
			// XX
		},
		data() {
			return {
				PaymenStatus,
				paymentStartusText,
				checkPay: "1",
				orderId: "", //本地图片
				orderData: { //订单信息
					count: 0,
					cpOrderId: "",
					createdAt: "",
					id: "7028678827932913664",
					params: {
						disId: "",
						productId: "1"
					},
					paymentAt: "",
					pcy: "1",
					ptOrderId: "",
					sdkId: "",
					status: -1, //当前页面状态 -1 订单查询中 , 0 订单未完成 , 1,订单已完成
					updatedAt: "",
					userId: "",
					price: 0,
					product: {}
				},
				providers: { //可用支付渠道
					wxpay: false
				}
			}
		},
		computed: {
			getDateSize7() {

				// 七天内可退款
				return new Date(this.orderData.updatedAt).getTime() - new Date() < 604800000
			}
		},
		methods: {
			refuneOrder() {
				console.log('refuneOrder')
				uni.showModal({
					title: '您确定要退款吗？',
					success(res) {
						if (res.confirm) {
							sdkTool.refund({
								cpOrderId: this.orderData.cpOrderId
							})
						}
					}
				})

			},
			cancleOrder() {
				console.log('refuneOrder')
				uni.showModal({
					title: '您确定要取消订单吗？',
					success(res) {
						if (res.confirm) {
							request({
								url: '/userOrder/cancelOrder/' + this.orderData.cpOrderId,
								method: 'PUT'
							}).then(res => {
								console.log(res, 'res')
								uni.showToast({
									title: '取消成功！'
								})
								setTimeout(() => {
									uni.redirectTo({
										url: '/my/order'
									})
								}, 500)
							})
						}
					}

				})

			},
			async selorde() {
				//查询订单信息
				request({
					url: '/userOrder/findOne/' + this.orderId
				}).then(async (resolve) => {
					this.orderData = resolve.data
					console.log(this.orderData, 'order')
					//未支付 展示支付渠道
					if (this.orderData.status == 0) {
						//展示支付渠道
						let rdata = await sdkTool.getProvider() //["wxpay"]
						console.log('展示支付渠道')
						console.log(rdata)
						for (var i = 0; i < rdata.length; i++) {
							//展示该支付渠道按钮
							this.providers[rdata[i]] = true
						}
					}
				})
			},
			//测试支付
			do_debug_pay() {
				sdkTool.do_debug_pay(this.orderData)
			},
			//uni 微信支付
			do_uni_wxpay() {
				sdkTool.do_uni_wxpay({
					orderData: this.orderData
				})
			},
			// 支付
			do_pay() {
				if (this.checkPay === "1") {
					this.do_uni_wxpay()
				} else {
					this.do_debug_pay()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.introduce {
		height: 100%;

		.banner {
			width: 90%;
			margin: auto;
		}

		.content {
			padding: 40rpx;

			/deep/ .cl-radio.is-checked .cl-radio__input {
				background-color: #67c23a;
				border-color: #67c23a;
			}
		}

		.pay_btn {
			width: 100%;
			position: fixed;
			height: 60px;
			bottom: 0;
			border-radius: unset;

			/deep/ .cl-button {
				width: 100%;
				border-radius: unset;
				position: absolute;
				bottom: 0;
				height: 100%;
			}
		}

		.footer {
			position: fixed;
			bottom: 0;
			width: 100%;
			background-color: #fff;
			display: flex;

			.left {
				display: flex;
				flex-direction: column;
				width: 20%;
				align-items: center;
				margin-top: 10rpx;
				margin-bottom: 10rpx;

				text {
					font-size: 14px;
				}
			}

			.right {
				width: 80%;
				margin-top: 10rpx;
				margin-bottom: 10rpx;
				display: flex;
				margin-right: 10rpx;
			}


		}
	}
</style>
