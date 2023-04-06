//gm SDK 对外提供的方法

import { request } from "../../../components/comm/request";
import { SdkBase } from "../sdkBase";
import { showLogin, doLogin, getPhone, selHeader } from "./wx";

class Sdk_wx implements SdkBase {
	//应用初始化登录
	applyinit(pram: {
		success?: () => void,
		fail?: () => void,
	} | null = null): void {
		console.log('微信初始化登录')
		doLogin(pram)
		return
	}
	//手动点击登录
	clickLogin(pram: {
		success?: () => void,
		fail?: () => void,
	} | null = null): void {
		console.log('微信手点登录')
		// showLogin()
		doLogin(pram)

		//登录完 要做什么
		//登录成功
		//登录失败

		return
	}

	//获取手机号
	getPhone(pram: {
		success?: () => void,
		fail?: () => void,
		cancel?: () => void
	}): void {
		//吧回调信息 暂存起来
		//XX
		//打开一个网页
		getPhone(pram)
	}

	//选择头像
	selHeader(pram: {
		success?: (url: string) => void, //成功
		fail?: () => void, //失败
	}): void {
		selHeader(pram)
	}
	refund(pram: {
		cpOrderId:string,
		success?: () => void,
		fail?: () => void
	}): void {
		request({
			url:'/wxpay/refundOrder/'+pram.cpOrderId,
			method:'PUT'
		}).then(res=>{
			console.log(res,'res refund')
		})
	}
}
export let sdk_wx: Sdk_wx = new Sdk_wx()