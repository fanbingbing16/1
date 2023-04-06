// 封装request请求 
import { sdkTool } from "@/tsjsFiles/sdk/sdkTool"
import { baseSev } from "@/components/comm/base"

import globalVue from "@/components/comm/global.vue"
interface RequestSuccessCallbackResult {
	/**
	 * 开发者服务器返回的数据
	 */
	data: any;
	/**
	 * 开发者服务器返回的 HTTP 状态码
	 */
	statusCode: number;
	/**
	 * 开发者服务器返回的 HTTP Response Header
	 */
	header: any;
	/**
	 * 开发者服务器返回的 cookies，格式为字符串数组
	 */
	cookies: string[];
}
interface AnyObject {
	[key: string]: string
}
// notHeader 是否不需要头部
export function request(params: {
	url: string,
	method?: 'POST' | 'GET' | 'DELETE' | 'PUT',
	data?: any,
	notHeader?: boolean,
	notTip?: boolean
},) {
	return new Promise((resolve: (value?: any) => void, reject: (reason?: any) => void) => {
		let header: { Authorization: string } | null = null
console.log(params,'params')
		getUser(/.*(gmLogin)|('openAuth').*/.test(params
			.url) || params.notHeader).then(resultUser => {
				if (resultUser?.data?.token || /.*(gmLogin)|('openAuth').*/.test(params
					.url) || params.notHeader) {
					header = resultUser.data.token ? {
						Authorization: `Bearer ${resultUser.data.token}`
					} : null
					uni.request({
						url: baseSev.domain + params.url,
						method: params.method || 'GET',
						data: params.data,
						header,
						success: (resultGet: RequestSuccessCallbackResult) => {
							
							if (resultGet.data?.data?.msg === 'ok') {
								resolve(resultGet.data.data)
								if (resultGet.data.data?.global?.jwt) {
									setToken(resultGet.data.data?.global?.jwt?.token)
								}

							} else if (resultGet.data.msg === 'ok') {
								resolve(resultGet.data)
								if (resultGet.data?.global?.jwt) {
									setToken(resultGet.data?.global?.jwt?.token)
								}

							}
							else {
								console.log(resultGet, 'fail get ')
								reject(resultGet)
								if (resultGet.data?.message === 'Token not valid' || (resultGet as any)?.message === 'Authorization header not found') {
									console.log(params.notHeader, 'params.notHeader')
									if (!params.notHeader) {
										//token 过期
										refreshLogin()
									}


								} else {
									if (!params.notTip) {
										uni.showToast({
											title: resultGet.data?.message || resultGet.data?.msg || resultGet?.data?.data?.msg,
											icon: 'none'
										})
									}

									reject(resultGet)
								}

							}
						},
						fail: (resultFail) => {
							console.log(resultFail, 'get resultFail')
							if (!params.notTip) {
								uni.showToast({
									title: (resultFail as any)?.data?.message || '网络请求失败',
									icon: 'none'
								})
							}

							if ((resultFail as any)?.data?.message === 'Token not valid' || (resultFail as any)?.message === 'Authorization header not found') {
								if (!params.notHeader) {
									reject(resultFail)
									//token 过期
									refreshLogin()
								}


							} else
								reject(resultFail)
						}
					})


				} else {
					console.log('not header')
					reject(null)
					if (resultUser)
						//按照未登录处理
						refreshLogin()
					return
				}

			})
	})
}
export function refreshLogin() {
	uni.showModal({
		title: '登录过期，请重新登录',
		success: (resultModal) => {

			if (resultModal.confirm) {
				uni.clearStorage()
				globalVue.methods.clearPeople()
				globalVue.methods.clearUserInfo()
				sdkTool.clickLogin()
			} else if (resultModal.cancel) {
				uni.showToast({
					title: '您已取消',
					icon: 'none'
				})
			}
		},
		fail: (failModal) => {

			uni.showToast({
				title: '您已取消',
				icon: 'none'
			})
		}
	})
}
function setToken(token: string) {
	uni.getStorage({
		key: 'user',
		success: (resultUser) => {
			uni.setStorage({
				key: 'user',
				data: {
					token,
					user: resultUser.data?.user
				}
			})
		}
	})
}
export function getUser(shouUser: boolean = false) {
	return new Promise((resolve: (value?: any) => void, reject: (reason?: any) => void) => {
		uni.getStorage({
			key: 'user',
			success: (resultUser) => {
				resolve(resultUser)
			},
			fail: (failUser) => {
				if (shouUser) {
					resolve({ data: {} })
				} else {
					resolve(null)
					//失败，未登录,需要去登录
					refreshLogin()
				}

			}
		})

	})
}

