
//应用初始化 登录检查

import { PaymenStatus, Ptype } from "@/components/comm/allCfg";
import { basePag, baseSdk } from "@/components/comm/base";
import { SdkBase } from "./sdkBase";

import { sdk_gm } from "./gm/sdk_gm";
import { sdk_wx } from "./wx/sdk_wx";
import { ResOrderData, syncTool } from "@/components/comm/syncTool";
import { request } from "@/components/comm/request";
import globalVue from "@/components/comm/global.vue";

//业务调用 sdk 接口
class SdkTool {
	private sdkinfo: SdkBase
	constructor() {
		switch (baseSdk.ptype) {
			case Ptype.weixin: //微信
				this.sdkinfo = sdk_wx
				break;
			default:
				//官方登录 
				this.sdkinfo = sdk_gm
				break;
		}
	}

	//应用初始化登录
	applyinit(pram: {
		success?: () => void,
		fail?: () => void,
	} | null = null) {

		this.sdkinfo.applyinit(pram)
	}

	//手动点击登录
	clickLogin(pram: {
		success?: () => void,
		fail?: () => void,
	} | null = null) {
		this.sdkinfo.clickLogin(pram)

	}

	//获取手机号
	getPhone(pram: {
		success?: () => void, //成功
		fail?: () => void, //失败
		cancel?: () => void //本平台不提供
	}) {
		console.log(this.sdkinfo, 'info')
		this.sdkinfo.getPhone(pram)
	}

	//获取头像链接
	getHeadeUrl(pram: {
		success?: (url: string) => void, //成功
		fail?: () => void, //失败
	}) {
		this.sdkinfo.selHeader(pram)
	}
	refund(pram: {
		cpOrderId: string,
		success?: () => void, //成功
		fail?: () => void, //失败
	}): void {
		this.sdkinfo.refund(pram)
	}
	//登出
	logOut(cbk: () => void) {
		console.log(`--tool---logOut-----`)
		globalVue.methods.clearUserInfo()
		globalVue.methods.clearPeople()
		uni.clearStorage()
	}

	//获取支付渠道 uniapp 版
	async getProvider(): Promise<string[]> {
		let pays: string[] = []
		return new Promise((resolve, reject) => {
			uni.getProvider({
				service: 'payment', //payment: 支付
				success: (result) => {
					for (var i = 0; i < result.provider.length; i++) {
						pays.push(result.provider[i])
					}
					resolve(pays)
				},
				fail: (result) => {
					reject([])
				}
			})
		})
	}

	//发起支付 微信小程序 wxpay
	do_uni_wxpay(params: { orderData: { cpOrderId: string } }) {

		// syncTool.showMsg('未完成')
		// #ifdef MP-WEIXIN
		//向后端请求 微信下单接口 transactions //获得prepay_id
		request({
			url: '/wxpay/jsApi',
			method: 'POST',
			data: {
				cpOrderId: params.orderData.cpOrderId
			}
		}).then(result => {
			console.log(result, 'result jsApi', result?.data?.package)
			// 根据 prepay_id 发起支付

			// @ts-ignore //忽略本行报错
			wx.requestPayment({
				// provider: 'wxpay', //微信小程序
				// orderInfo: '123', //订单数据
				// timeStamp: String(new Date().getTime()), //时间戳
				timeStamp: result?.data?.timeStamp,
				nonceStr: result.data?.nonceStr, //随机字符串，长度为32个字符以下，微信小程序独有 。
				package: result?.data?.package,//统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx，微信小程序独有
				signType: result?.data?.signType, //签名算法，暂支持 MD5 ，微信小程序独有
				paySign: result?.data?.paySign, //签名，具体签名方案参见小程序支付接口文档，微信小程序独有
				success: function(res: any) {
					console.log('success:', res);
					const page = getCurrentPages()
					if (page[page.length - 1].route == 'debug/pay') {
						uni.navigateBack()
					}
					console.log(page, 'page')
					// uni.navigateBack()
				},
				fail: function(err: any) {
					console.log('fail:', err);
					if (err.errMsg.indexOf('cancel') > -1) {
						uni.showToast({
							title: '您已取消'
						})
					}
				}
			})
		})
		// #endif
	}

	//测试支付
	async do_debug_pay(oederData: ResOrderData) {
		//请求后端 假支付接口 完成流程 //支付回调
		//发请求

		let rdata = await syncTool.request_other("/local/pay", "GET", `?cpOrderId=${oederData.cpOrderId}`)
		if (rdata == 'SUCCESS') {
			//支付成功
			//关闭本页面
			// syncTool.showMsg("支付成功")
			uni.navigateBack()
		} else {
			//支付失败
			syncTool.showMsg("支付失败")
		}
	}

	//下单 创建订单
	async makeOrder(params: {
		orderParm: {
			productId: '1',
			disId?: "",
		},

	}): Promise<any | null> {
		// 新建订单
		let order_param = {
			sdkId: basePag.loginSdk, //本字段无用 考虑去除
			count: 1,
			params: {
				productId: params.orderParm.productId,
				disId: params.orderParm.disId,
			}
		}

		console.log("doBuy 0", order_param)
		//请求后端 生成一个 订单
		//后端返回订单信息 包括价格
		let rdata: any
		try {
			rdata = await request({ url: '/userOrder', method: 'POST', data: order_param })
		} catch (e) {
			//TODO handle the exception
			console.log(e, 'e')
			//下单失败
			console.log("下单失败")
			let user = await globalVue.methods.getInfo()
			// 未支付订单
			request({ url: '/userOrder', data: { userId_eq: user.user?.id, status_eq: PaymenStatus.pengding } }).then(res => {
				const par = res.data.edges?.filter((resData: any) => resData.node.params.productId === params.orderParm.productId)
				this.goPayPage(par?.[0]?.node.cpOrderId)
			})
			return null
		}
		//取data
		rdata = rdata.data

		console.log("doBuy 1", rdata)

		//返回两个结果
		//1 创建订单成功 跳转订单页面
		//2 免费单 直接刷新本页面 或者直接进入测评
		if (rdata.status == 0) {
			console.log("doBuy 2")
			this.goPayPage(rdata.cpOrderId)

		} else if (rdata.status == 1) {
			//免费单 直接回调支付完成
			console.log("免费单")
			//2 免费单 直接刷新本页面 或者直接进入测评
			return true
		} else {
			//订单状态错误
			syncTool.showMsg(`订单状态错误:${rdata.status}`)
			return false
		}
	}

	//跳转到支付页面
	goPayPage(cpOrderId: string) {
		//打开订单  待支付页面 传入订单 ID
		let url = '/debug/pay?orderId=' + cpOrderId

		uni.navigateTo({
			url
		})
		// this.do_uni_wxpay({ orderData: { cpOrderId } })
	}
	//修改选中儿童
	async editSelectChildren(param: {
		userId: string,
		childrenId: string
		success?: (result: any) => void, //成功
		fail?: (err: any) => void, //失败
	}): Promise<unknown> {
		if (!param.userId) {
			const userInfo = await globalVue.methods.getInfo()
			param.userId = userInfo.user.id
		}
		return new Promise((resolve, reject) => {
			request({
				url: '/user', method: 'PUT', data: {
					id: param.userId, selectChildren: param.childrenId
				}
			}).then((result: any) => {
				resolve(result)
				if (param.success) {
					param.success(result)
				}
			}).catch((reject: any) => {
				reject(reject)
				if (param.fail) {
					param.fail(reject)
				}
			})
		})

	};
	staggingUserRecord() {
		uni.getStorage({
			key: 'userRecord',
			success: (result) => {
				request({
					url: '/userRecord/stagingUserRecord',
					data: {
						...result.data
					},
					method: 'POST',
					notTip: true
				}).then(res => {

					uni.removeStorage({
						key: 'userRecord'
					})

				}).catch(err => {
					uni.removeStorage({
						key: 'userRecord'
					})
				})
			}
		})
	}
}

export let sdkTool: SdkTool = new SdkTool()

