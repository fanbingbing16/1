import { basePag } from "@/components/comm/base"
import globalVue from "@/components/comm/global.vue"
import { openAuthLogin } from "@/components/comm/login"
import { request } from "@/components/comm/request"

//登录回调暂存
let pram_login: {
	success?: () => void,
	fail?: () => void,
} | null = null
//弹出登录页 让登录
export function showLogin(pram: {
	success?: () => void,
	fail?: () => void,
} | null) {
	//暂存登录回调
	pram_login = pram
	//弹出登录页面
	uni.navigateTo({
		url: '/sdk/gm/passportLogin'
	})
}
//登录结束回调
export function login_cbk(result: any) {
	console.log('gm  login_cbk')
	console.log(result)
	let data = result?.data
	if (!(data?.openkey)) {
		//登录失败
		if (pram_login?.fail) {
			pram_login.fail()
		}
		return
	}
	//写入平台信息
	uni.setStorage({
		key: 'loginInfo',
		data: data
	})
	//执行第三方登录
	console.log("执行第三方登录")
	console.log(data)

	openAuthLogin(basePag.loginSdk, [data.openid, data.openkey], () => {
		console.log(pram_login, 'pram_login')
		//登录成功
		if (pram_login?.success) {
			pram_login.success()
		} else {
			//没有回调 转回my 页面
			uni.switchTab({
				url: "/pages/index/my",
			});
		}
		console.log(123, '登录成功', getCurrentPages())
		
		globalVue.methods.getInfo().then((result) => {
			console.log('userInfo get',result,result.user?.selectChildren,'result.user?.selectChildren')
			if (result.user?.selectChildren) {
				request({ url: '/userChildren/findOne/' + result.user?.selectChildren }).then(result => {
					globalVue.methods.setPeople(result.data)
					console.log(result, 'result')
				})

			}

		})
		const page = getCurrentPages()
		if (page.length <= 1) {
			uni.redirectTo({
				url: '/pages/index/index'
			})
			return
		}
		const isBack = page?.some(page => {
			console.log(page, 'page')
			if ((page?.route?.indexOf('my') || -1) > -1) {
				uni.switchTab({
					url: '/pages/index/my'
				})
				return true

			} else if ((page?.route?.indexOf('category') || -1) > -1) {
				uni.switchTab({
					url: '/pages/index/category'
				})
				return true
			} else if ((page.route?.indexOf('introduce') || -1) > -1) {
				uni.navigateTo({
					url: '/scale/test/introduce?id=' + (page as any)['options']?.id
				})
				return true
			}
			return false

		})
		if (!isBack) {
			uni.navigateBack()
		}

		console.log(1233)
		// location.reload()
	})

}



//选择头像
export function selHeader(pram: {
	success?: (pram2: {
		fileName: string, //文件的绝对路径，包含文件名。例如 foo/bar.jpg、foo/bar/baz.jpg 等
		filePath: string,  //要上传的文件对象
	}) => void, //成功
	fail?: () => void, //失败
}): void {
	//通用本地选择图片
	uni.chooseImage({
		count: 1, //最多可以选择的图片张数，默认9
		sizeType: "original", //original 原图，compressed 压缩图，默认二者都有
		sourceType: ["album", "camera"], //album 从相册选图，camera 使用相机，默认二者都有
		// extension?: string []; //根据文件拓展名过滤，每一项都不能是空字符串。默认不过滤。
		// crop?: ChooseImageCropOptions; //图像裁剪参数，设置后 sizeType 失效。
		//成功则返回图片的本地文件路径列表 tempFilePaths
		success: (result: any) => {
			console.log(result, 'result,')
			//文件大小检查
			if (result.tempFiles[0].size > 100000) {
				uni.showToast({
					title: '文件太大了',
					icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
				})
				//业务错误回调
				if (pram.fail) {
					pram.fail()
				}
				return;
			}

			console.log('文件路径获取', result.tempFilePaths[0])   //成品就在这里了
			if (pram.success) {
				pram.success({
					fileName: 'header/gm/', //构建文件名
					filePath: result.tempFilePaths[0],
				})
			}

		},
		//接口调用失败的回调函数
		fail: (result: any) => {
			console.log("本地图片获取失败")
			console.log(result)
		},
		//接口调用结束的回调函数（调用成功、失败都会执行）
		complete: (result: any) => {
			console.log("本地图片获取结束")
			console.log(result)
		}

	})
}


//覆盖上个页面
