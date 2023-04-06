//gm SDK 对外提供的方法

import { SdkBase } from "@/tsjsFiles/sdk/sdkBase";
import { showLogin, selHeader } from "@/tsjsFiles/sdk/gm/gm";
import { upload } from "@/components/comm/upload";

class Sdk_gm implements SdkBase {
	//应用初始化登录
	applyinit(pram: {
		success?: () => void,
		fail?: () => void,
	} | null = null): void {
		// showLogin(pram)
		return
	}
	//手动点击登录
	clickLogin(pram: {
		success?: () => void,
		fail?: () => void,
	} | null = null): void {
		showLogin(pram)
		return
	}

	//获取手机号
	getPhone(pram: {
		success?: () => void,
		fail?: () => void,
		cancel?: () => void
	}): void {
		//本平台不提供电话号码
		uni.showToast({
			title: '本平台不提供电话',
			icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
			// duration: 2000    //持续时间为 2秒
		})

		if (pram.cancel) {
			pram.cancel()
		}
	}
	//选择头像
	selHeader(pram: {
		success?: (url: string) => void, //成功
		fail?: () => void, //失败
	}): void {
		//调用SDK 的获取头像方法
		selHeader({
			success: (pram2: {
				// fileName: string, //文件的绝对路径，包含文件名。例如 foo/bar.jpg、foo/bar/baz.jpg 等
				filePath: string,  //要上传的文件对象
			}) => {
				//图片获取成功 上传图片
				//需要给文件取名
				upload({
					cloudPath: 'header/weixin/1.jpg', //文件的绝对路径，包含文件名。例如 foo/bar.jpg、foo/bar/baz.jpg 等
					filePath: pram2.filePath,  //要上传的文件对象
					success: (url: string) => {
						//成功
						console.log('上传头像成功')
						if (pram.success) {
							pram.success(url)
						}
					},
					fail: () => {
						//失败
						console.log('上传头像失败')
						if (pram.fail) {
							pram.fail()
						}
					}
				})
			},
			fail: () => {
				console.log('获取头像失败')
				if (pram.fail) {
					pram.fail()
				}
			}
		});
	}
	refund(pram: {
		cpOrderId: string,
		success?: () => void,
		fail?: () => void
	}): void {
	}

}
export let sdk_gm: Sdk_gm = new Sdk_gm()