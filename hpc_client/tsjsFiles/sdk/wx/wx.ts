import { basePag, baseSdk, baseSev } from "@/components/comm/base";
import { openAuthLogin } from "@/components/comm/login";
import { getUser, refreshLogin, request } from "@/components/comm/request";
import { syncTool } from "@/components/comm/syncTool";
import { upload } from "@/components/comm/upload";
import { sdkTool } from "../sdkTool";

//弹登录页面
export function showLogin() {
	uni.navigateTo({
		url: '/sdk/wx/login'
	})
}

//弹出获取电话需求
export function showPhonePag() {
	uni.navigateTo({
		url: '/sdk/wx/getPhoneNumber'
	})
}


//执行小程序登录
export function doLogin(pram: {
	success?: () => void,
	fail?: () => void,
} | null = null) {
	console.log('执行小程序登录')

	// #ifdef MP-WEIXIN
	//微信小程序登录
	// @ts-ignore //不提示下一句的警告
	wx.login({
		success: (loginresult: any) => {
			if (loginresult.code) {
				uni.showToast({
					title: '小程序登录成功',
					icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
					// duration: 2000    //持续时间为 2秒
				})
				//第三方登录验证
				openAuthLogin(basePag.loginSdk, [loginresult.code], () => {
					//登录成功
					if (pram?.success) {
						pram.success()
					}
					//关闭本页面
					uni.navigateBack()
				})
			}
		},
		fail: (result: any) => {
			console.log(result, 'err')
			//登录失败回调
			if (pram?.fail) {
				pram.fail()
			}
		},
		complate: () => {
			//console.log(complate)
		}
	})
	// #endif

	// #ifndef MP-WEIXIN
	uni.showToast({
		title: '不在微信小程序环境',
		icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
		// duration: 2000    //持续时间为 2秒
	})
	// #endif
}

//业务暂存的 获取手机号回调 
let getPhone_pram: {
	success?: () => void,
	fail?: () => void,
	cancel?: () => void
} = {}


//微信网页获取完手机号 回调这个方法
export async function getPhone_cbk(e: any) {
	console.log(e, 'e')
	console.log(e.detail.code)

	//是否得到了 "手机号权限code"
	if (!e.detail?.code) {
		//执行业务暂存的 失败回调
		if (getPhone_pram.fail) {
			getPhone_pram.fail()
		}
		return;
	}
	//发送电话请求
	request({
		url: '/openAuth/getWxMiniProPhone/' + e.detail.code
	}).then((resolve) => {
		//请求成功
		syncTool.setUser({
			mobile: resolve.data
		})
		if (getPhone_pram.success) {
			getPhone_pram.success()
		}
		// 关闭本页面 //返回?
		uni.navigateBack()
	}).catch(err => {
		//请求失败
		if (getPhone_pram.fail) {
			getPhone_pram.fail()
		}
	})

	// if (rdata != null) {
	// 	//请求成功
	// 	syncTool.setUser({
	// 		mobile:rdata
	// 	})
	// 	if (getPhone_pram.success) {
	// 		getPhone_pram.success()
	// 	}
	// 	// 关闭本页面 //返回?
	// 	uni.navigateBack()
	// } else {
	// 	//请求失败
	// 	if (getPhone_pram.fail) {
	// 		getPhone_pram.fail()
	// 	}
	// }


	// //发送电话请求
	// request({
	// 	url: "/openAuth/getWxMiniProPhone/",
	// 	method: 'GET',
	// 	data: e.detail.code
	// }).then((reqdata) => {
	// 	//获取电话成功 写入user
	// 	console.log(reqdata)


	// 	//更新user 信息 写回缓存
	// 	uni.getStorage({
	// 		key: 'user',
	// 		success: (resultUser) => {
	// 			console.log(resultUser, 'resultUser')
	// 			const userInfo = resultUser.data
	// 			userInfo.user.mobile = reqdata.data.data?.data
	// 			uni.setStorage({
	// 				key: 'user',
	// 				data: userInfo,
	// 				success: (
	// 					resultSetUser) => {
	// 					console.log(
	// 						resultSetUser,
	// 						'resultSetUser'
	// 					)
	// 				}
	// 			})
	// 		}
	// 	})
	// 	//调用回调
	// 	if (getPhone_pram.success) {
	// 		getPhone_pram.success()
	// 	}
	// //关闭本页面 //返回?
	// uni.navigateBack()
	// }, err => {
	// 	//获取电话失败
	// 	console.log(err)
	// 	//失败回调
	// 	if (getPhone_pram.fail) {
	// 		getPhone_pram.fail()
	// 	}
	// })
}

//获取电话号码
export function getPhone(pram: {
	success?: () => void,
	fail?: () => void,
	cancel?: () => void
}) {
	//暂存回调方法
	getPhone_pram = pram
	//弹出需求页面
	uni.navigateTo({
		url: '/sdk/wx/getPhoneNumber'
	})
}


//业务暂存的 获获取头像回调
let selHeadere_pram: {
	success?: (url: string) => void, //成功
	fail?: () => void, //失败
} = {}

//选择头像
export function selHeader(pram: {
	success?: (url: string) => void, //成功
	fail?: () => void, //失败
}): void {
	//暂存回调
	selHeadere_pram = pram
	//弹出需求页面 获取页面返回值?
	// let data: any = {}
	// uni.navigateTo({
	// 	url: '/sdk/wx/getHander',
	// 	events: data
	// })
}

//选择头像回调
export function selHeader_cbk(e: any) {
	let avatarUrl: any = e?.detail?.avatarUrl
	console.log(selHeadere_pram,'param')
	if (!avatarUrl) {
		//失败回调

		if (selHeadere_pram.fail) {
			selHeadere_pram.fail()
		}
		return
	}

	// 上传头像
	upload({
		cloudPath: 'header/weixin/1.jpg', //文件的绝对路径，包含文件名。例如 foo/bar.jpg、foo/bar/baz.jpg 等
		filePath: avatarUrl,  //要上传的文件对象
		success: (url: string) => {
			//成功
			console.log('上传头像成功')
			//成功
			if (selHeadere_pram.success) {
				selHeadere_pram.success(url)
			}
			sdkTool.getHeadeUrl({})
			//关闭本页面 //返回?
			// uni.navigateBack()
		},
		fail: () => {
			//失败
			console.log('上传头像失败')
			//失败回调
			if (selHeadere_pram.fail) {
				selHeadere_pram.fail()
			}
		}
	})



}