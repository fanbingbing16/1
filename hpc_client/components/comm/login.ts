import { baseSev } from "./base"
import Global from "@/components/comm/global.vue"
import { sdkTool } from "@/tsjsFiles/sdk/sdkTool";
import { syncTool } from "./syncTool";
import { request } from "./request";

export interface userInfoInterface {
	expired: string,
	refresh_token: string,
	token: string,
	user: {
		avatar: string | null,
		handWx: string | null,
		id: string,
		mobile: string | null,
		name: string | null,
		nameWx: string | null,
		roles: string | null,
		status: number
	}
}

//第三方登录验证 给SDK调用的 1
export async function openAuthLogin(sdkid: string, params: string[], cbk: (() => void) | null = null) {
	//遮罩 网站登录验证中

	if (!sdkid) {
		alert('sdkid null')
		return;
	}
	if (!params) {
		alert('params null')
		return;
	}
	//发送登录请求
	request({
		url: '/openAuth/openAuthLogin',
		data: {
			sdkid: sdkid,
			params: params
		},
		method: 'POST',
		notHeader: true
	}).then((result) => {
		let data: any = null
		if (result?.data) {
			data = result?.data
		}
		uni.setStorage({
			key: 'user',
			data: data,
			success: function() {
				
				Global.methods.setInfo(data)
			}
		});
		//登录完成回调 //靠这个来返回某页面
		if (cbk) {
			cbk()
		}
	}).catch(err => {
		//网络错误  //密码错误
		console.log('第三方登录验证 错误')
		console.log(err)
		//错误
	})

	// code === 1
	// msg == 'nok'  全局?

	// if (rdata != null) {
	// 	//请求成功
	// 	//登录验证成功 去除遮罩
	// 	console.log('第三方登录验证 完成')
	// 	console.log(rdata)
	// 	//设置本地缓存
	// 	syncTool.setUserSto(rdata, true)
	// 	console.log(cbk, 'cbk')

	// 	//登录完成回调 //靠这个来返回某页面
	// 	if (cbk) {
	// 		console.log(123, 'cbk')

	// 		cbk()
	// 	}

	// } else {
	// 	//请求失败
	// 	console.log('err login')

	// }


	// uni.request({
	// 	url: baseSev.domain + '/openAuth/openAuthLogin',
	// 	data: {
	// 		sdkid: sdkid,
	// 		params: params
	// 	},
	// 	method: 'POST',
	// 	success: (result) => {

	// 	},
	// 	fail: (err) => {
	// 		console.log(err, 'err login')
	// 	}
	// })
}