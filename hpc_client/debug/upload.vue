<template>
	<view class="introduce">
		<view class="back">
			<!-- 自定义导航 -->
			<cl-topbar title="上传测试" :border="false">
			</cl-topbar>
		</view>

		<view class="header">
			<button size="mini" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">获取微信头像</button>
			<button size="mini" @click="selectPicture">获取本地头像</button>
			<button size="mini" @click="getHeaderUrl">通用头像</button>
			
			<image mode="top left" :src="imgsrc"></image>
			
			<button size="mini" @click="upPicture">上传图片OSS</button>
			
			<cl-text :value="urltext"></cl-text>
			
			<image mode="top left" :src="imgsrc2"></image>
			
		</view>
	</view>
</template>

<script>
import { sdkTool } from '@/tsjsFiles/sdk/sdkTool'
	export default {
		components: {
			// ButtonText
		},
		onLoad: function(option) {},
		data() {
			return {
				sdkTool,
				imgsrc: "", //本地图片
				imgsrc2: "", //上传后远端图片
				urltext :"还没上传",
				//是否测试过
				isTest: false,
			}
		},
		methods: {
			getHeaderUrl() {
				sdkTool.getHeadeUrl({
					success: (url) => {
						//成功
						console.log('获得链接地址')
						
						this.imgsrc2 = url
						this.urltext = url
					}, 
					fail: () => {
						//失败
					}, 
				})
			},
			//微信选择图片控件回调  
			onChooseAvatar(e) {
				console.log('头像获取完的回调 onChooseAvatar')
				console.log(e)
				this.imgsrc = e.detail.avatarUrl
				const {
					avatarUrl
				} = e.detail
				// this.setData({
				// 	avatarUrl,
				// })
			},
			//通用选择图片 
			selectPicture() {
				uni.chooseImage({
					count: 1, //最多可以选择的图片张数，默认9
					sizeType: "original", //original 原图，compressed 压缩图，默认二者都有
					sourceType: ["album", "camera"], //album 从相册选图，camera 使用相机，默认二者都有
					// extension?: string []; //根据文件拓展名过滤，每一项都不能是空字符串。默认不过滤。
					// crop?: ChooseImageCropOptions; //图像裁剪参数，设置后 sizeType 失效。
					//成功则返回图片的本地文件路径列表 tempFilePaths
					success: (result) => {
						console.log("成功则返回图片的本地文件路径列表")
						console.log(result)
						
						if  (result.tempFiles[0].size > 30000){
							uni.showToast({
								title: '文件大于3K',
								icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
							})
							// return;
						}
						//展示图片
						//this.src  =res.tempFilePaths[0]
						this.imgsrc = result.tempFiles[0].path
						
						
						// tempFilePaths
					},
					//接口调用失败的回调函数
					fail: (result) => {
						console.log("接口调用失败的回调函数")
						console.log(result)
					},
					//接口调用结束的回调函数（调用成功、失败都会执行）
					complete: (result) => {
						console.log("接口调用失败的回调函数")
						console.log(result)
					}
				})
			},

			//上传图片 吧已经选好的图片 上传到 云服务器
			upPicture() {
				console.log('开始上传图片')
				console.log(this.imgsrc)
				console.log('this.imgsrc.name: ',this.imgsrc.name)
				
				uniCloud.uploadFile({
					//上传服务端的文件地址
					cloudPath: 'test/1.jpg', //文件的绝对路径，包含文件名。例如 foo/bar.jpg、foo/bar/baz.jpg 等
					filePath: this.imgsrc, //要上传的文件对象
					//上传进度回调
					onUploadProgress: (result) => {
						console.log('进度回调')
						console.log(result)
					},
					//成功返回的回调函数
					success: (result) => {
						console.log('成功返回的回调函数')
						console.log(result)
						this.imgsrc2 = result.fileID
						this.urltext = result.fileID
					},
					//失败返回的回调函数
					fail: (result) => {
						console.log('失败返回的回调函数')
						console.log(result)
					},
					//结束的回调函数（调用成功、失败都会执行
					complete: (result) => {
						console.log('结束的回调函数')
						console.log(result)
					}
				})
			},
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
