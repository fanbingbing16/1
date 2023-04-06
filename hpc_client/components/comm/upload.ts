//上传文件
import { sdkTool } from "@/tsjsFiles/sdk/sdkTool"
import { baseSev } from "@/components/comm/base"
import { syncTool } from "./syncTool"
import { refreshLogin, request } from "./request"
// interface RequestSuccessCallbackResult {
// 	/**
// 	 * 开发者服务器返回的数据
// 	 */
// 	data: any;
// 	/**
// 	 * 开发者服务器返回的 HTTP 状态码
// 	 */
// 	statusCode: number;
// 	/**
// 	 * 开发者服务器返回的 HTTP Response Header
// 	 */
// 	header: any;
// 	/**
// 	 * 开发者服务器返回的 cookies，格式为字符串数组
// 	 */
// 	cookies: string[];
// }

//上传的文件名
//文件本地绝对地址
//返回 回调 远程URL 地址
export function upload(params: {
	cloudPath: string, //文件的绝对路径，包含文件名。例如 foo/bar.jpg、foo/bar/baz.jpg 等
	filePath: string,  //要上传的文件对象
	success?: (url: string) => void, //成功
	fail?: () => void, //失败
}) {
	console.log('开始上传图片')
	uni.getStorage({
		key: 'user',
		success: (resultUser) => {
			const header = resultUser.data.token ? {
				Authorization: `Bearer ${resultUser.data.token}`
			} : null
			uni.uploadFile({
				url: baseSev.domain + '/oss/upload',
				filePath: params.filePath,
				header,
				name: 'file',
				formData: {
					'user': 'test'
				},
				success: (result) => {
					console.log(result, 'resulr')
					if (params.success) {
						params.success(JSON.parse(result.data)?.url)
					}

				},
				fail: (err) => {
					console.log(err, 'err')
				}
			})
		},
		fail: (failUser) => {
			//失败，未登录,需要去登录
			refreshLogin()
		}
	})

	// uniCloud.uploadFile({
	// 	//上传服务端的文件地址
	// 	cloudPath: params.cloudPath, //文件的绝对路径，包含文件名。例如 foo/bar.jpg、foo/bar/baz.jpg 等
	// 	filePath: params.filePath, //要上传的文件对象
	// 	//上传进度回调
	// 	onUploadProgress: (result) => {
	// 		console.log('文件上传进度回调')
	// 		console.log(result)
	// 	},
	// 	//成功返回的回调函数
	// 	success: (result) => {
	// 		console.log('文件上传成功')
	// 		console.log(result)
	// 		if (params.success){
	// 			params.success(result.fileID)
	// 		}
	// 	},
	// 	//失败返回的回调函数
	// 	fail: (result) => {
	// 		console.log('文件上传失败')
	// 		console.log(result)
	// 		syncTool.showMsg('文件上传失败'+result.message.toString())
	// 		// if (params.fail){
	// 		// 	params.fail()
	// 		// }
	// 	},
	// 	//结束的回调函数（调用成功、失败都会执行
	// 	// complete: (result) => {
	// 	// 	console.log('文件上传结束')
	// 	// 	console.log(result)
	// 	// }
	// })
}

