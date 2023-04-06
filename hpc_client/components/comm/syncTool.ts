// 封装request请求 
import { sdkTool } from "@/tsjsFiles/sdk/sdkTool"
import { basePag, baseSev } from "@/components/comm/base"

//后端返回 总外壳
export interface ResData {
	code: number,//1 表示业务正常 0 表示异常
	global: ResGlobal,//统一处理模块
	data: any,
	msg: string //提示信息
}


//统一处理模块
export interface ResGlobal {
	jwt: {
		token: string
	},
	user: ResUser
}

//user 缓存信息
export interface UserSto {
	user: ResUser,//用户信息
	token: string,//token
	expired: number
}
//下发的 user 信息
export interface ResUser {
	id: string,
	roles: string,
	name: string,
	// nameWx: string, //wx 字段暂时不用
	// handWx: string, //wx 字段暂时不用
	hand: string,
	mobile: string,
	status: number,
	createdAt: string,
	updatedAt: string,
	deletedAt: null
}

//订单
export interface ResOrderData {
	id:string,//订单流水ID 没用
	userId:string,//用户id
	sdkid:string,//sdkid
	cpOrderId:string,//开发商订单ID
	ptOrderId:string,//平台订单ID
	count:number,//购买数量
	pcy: string,//币种 CNY
	params: OrderDataParams,//币种 CNY //JSON 购买信息
	status: number,// 支付状态 1 未支付 2 已支付
}
//订单道具信息
export interface OrderDataParams {
	productId: string,
	disId?: string
}

//-----------分界线---------------------

//传输的 UserSto
export interface DtoUserSto {
	user?: ResUser,//用户信息
	token?: string,//token
	expired?: number
}
//传输的 User
export interface DtoUser {
	id?: string,
	roles?: string,
	name?: string,
	nameWx?: string,
	handWx?: string,
	hand?: string,
	mobile?: string,
	status?: number,
	createdAt?: string,
	updatedAt?: string,
	deletedAt?: null
}

/**
 * 封装的各种方法
 */
class SyncTool {
	//弹出一个信息提示框
	showMsg(msg: string) {
		uni.showToast({
			title: msg,
			icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
			// duration: 2000    //持续时间为 2秒
		})
	}

	//缓存获取用户信息
	getUserSto(): UserSto | null {
		let userSto: UserSto = uni.getStorageSync('user')
		if (userSto == null || userSto.token == null || userSto.user == null || userSto.user.id == null) {
			return null
		}
		return userSto
	}

	/**
	 * 缓存设置用户缓存信息
	 * @pram isclear 是否全清重新设置
	 */
	setUserSto(dtoUserSto: DtoUserSto, isclear: boolean = false): boolean {
		let userSto: DtoUserSto | null = null
		if (isclear == false) {
			//不清理 先取出原数据
			userSto = this.getUserSto()
		}
		if (userSto == null) {
			userSto = {}
		}
		//字段逐个设置
		for (const key in dtoUserSto) {
			(<any>userSto)[key] = (<any>dtoUserSto)[key]
		}
		//设置回去
		uni.setStorageSync('user', userSto)
		return true
	}

	/**
	 * 缓存更新user信息
	 * 只用来更新user 部分字段 不可用来初始化 user 缓存
	 * 初始化 user 缓存 用 setUserSto
	 */
	setUser(dtoUser: DtoUser): boolean {
		let userSto = this.getUserSto()
		if (userSto == null || userSto.user == null) {
			//必须哟原数据 没有的话 不调用本方法 调用 setUserSto
			//
			return false
		}
		//字段逐个设置
		for (const key in dtoUser) {
			(<any>userSto).user[key] = (<any>dtoUser)[key]
		}
		//设置回去
		uni.setStorageSync('user', userSto)
		return true
	}

	// //对后端发送请求
	// async request(url: string, method: 'POST' | 'GET' | 'DELETE' | 'PUT', data: any): Promise<any | null> {
	// 	return new Promise((resolve, reject) => {
	// 		let header: { Authorization: string } | null = null
			
	// 		//user缓存信息
	// 		let userSto = this.getUserSto()
	
	// 		//我有token 就发 没有就不发 //失败是服务器的事情 发送函数不管
	// 		if (userSto != null) {
	// 			header = {
	// 				Authorization: `Bearer ${userSto.token}`
	// 			}
	// 		}

	// 		if (method == 'GET') {
	// 			if (data != null && typeof data != 'string') {
	
	
	// 				return
	// 			}
	// 			url += data
	// 		}
	// 		console.log("url",url)

	// 		//发请求
	// 		uni.request({
	// 			url: baseSev.domain + url,
	// 			method: method,
	// 			data: data,
	// 			header: header,
	// 			success: (resultGet: any) => {
	// 				let resData: ResData = resultGet?.data?.data //剥离两个data 外壳
	// 				if (resData == null) {
	// 					//返回数据异常
	// 					resolve(null)
	// 					return
	// 				}
	// 				//如果有公共字段返回
	// 				if (resData.global != null) {
	// 					//遍历 global 返回字段
	// 					for (let gkey in resData.global) {
	// 						switch (gkey) {
	// 							case 'jwt': //更新token
	// 								this.setUserSto({
	// 									token: resData.global.jwt.token
	// 								})
	// 								break;
	// 							case 'user'://更新user
	// 								this.setUserSto({
	// 									user: resData.global.user
	// 								})
	// 								break;
	// 						}
	// 					}
	// 				}
	// 				console.log(resData)
	// 				switch (resData.code) {
	// 					case 1://业务成功
	// 						console.log('业务成功')
	// 						resolve(resData.data)
	// 						return
	// 					case 401://需要登录
	// 						this.showMsg('没有登录')
	// 						break;
	// 					default://其他错误 弹窗提示
	// 						this.showMsg(resData.msg)
	// 						break;
	// 				}
	// 				resolve(null)
	// 			},
	// 			fail: (resultFail) => {
	// 				this.showMsg('网络连接失败')
	// 				console.log(resultFail, 'get resultFail')
	// 				reject(null)
	// 			}
	// 		})
	// 	})
	// }
	
	//对后端发送请求 第三方模拟
	async request_other(url: string, method: 'POST' | 'GET' | 'DELETE' | 'PUT', data: any): Promise<any | null> {
		return new Promise((resolve, reject) => {
			if (method == 'GET') {
				if (data != null && typeof data != 'string') {
					console.error('get 请求 数据必须是个字符串', typeof data)
					console.error(url, data)
					return
				}
				url += data
			}
			console.log("url",url)
			
			//发请求
			uni.request({
				url: baseSev.domain + url,
				method: method,
				data: data,
				success: (resultGet: any) => {
					
					resolve(resultGet.data)
				},
				fail: (resultFail) => {
					this.showMsg('网络连接失败')
					console.log(resultFail, 'get resultFail')
					reject(null)
				}
			})
		})
	}
	
}

export let syncTool: SyncTool = new SyncTool()

