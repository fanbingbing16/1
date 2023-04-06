<template>
	<cl-form ref="form-comm" :model.sync="form" :rules="rules" label-width="120rpx">
		<cl-form-item prop="name" label="姓名">
			<cl-input v-model="form.name"></cl-input>
		</cl-form-item>
		<view class="geryLine"></view>
		<cl-form-item prop="mobile" label="手机号" labelWidth="110rpx">
			<cl-input v-model="form.mobile"></cl-input>
		</cl-form-item>

		<view class="geryLine"></view>
		<cl-form-item prop="gender" label="性别">
			<cl-radio-group v-model="form.gender">
				<cl-radio label="0">女</cl-radio>
				<cl-radio label="1">男</cl-radio>
			</cl-radio-group>
		</cl-form-item>
		<view class="geryLine"></view>
		<cl-form-item prop="birthday" label="出生日期" labelWidth="136rpx">
			<uni-calendar ref="calendar" :date="form.birthday" :insert="false" @confirm="confirm"
				:endDate="getNowDateString()" @monthSwitch="monthSwitch" />
			<cl-button @click="open">选择出生日期</cl-button>
			<text class="birthdate">&nbsp;{{form.birthday}}</text>
		</cl-form-item>
		<view class="geryLine" style="margin-bottom: 20rpx;"></view>
		<view class="one-text">
			<cl-text value="*" color="#dd524d" :size="30" style="margin-right: 10rpx;"></cl-text>
			<cl-text value="身份证" :size="30"></cl-text>
		</view>

		<cl-form-item prop="identityCard" class="noneLabel">
			<con-upload v-model="form.identityCard" :multiple="true" :limit="3" :action="acticon"
				:before-upload="onBeforeUpload">
			</con-upload>
		</cl-form-item>
		<cl-text value="上传身份证正反面,以及手拿身份证照片,请保证手拿身份证的照片中,头和身份证都是清晰没有被挡住的" color="#999"></cl-text>
		<view class="geryLine" style="margin-top: 20rpx;margin-bottom: 20rpx;"></view>
		<view class="one-text">
			<cl-text value="*" color="#dd524d" :size="30" style="margin-right: 10rpx;"></cl-text>
			<cl-text value="证书" :size="30"></cl-text>
		</view>
		<cl-form-item prop="certificate" class="noneLabel">
			<con-upload v-model="form.certificate" :multiple="true" :limit="3" :action="acticon"
				:before-upload="onBeforeUpload">
			</con-upload>
		</cl-form-item>
		<cl-text value="请上传真实有效的证书" color="#999"></cl-text>
		<view class="geryLine" style="margin-top: 20rpx;margin-bottom: 20rpx;"></view>
		<view class="none-han">
			<view class="one-text one" style="margin-bottom: 10rpx;">
				<view class="one-text">
					<cl-text value="*" color="#dd524d" :size="30" style="margin-right: 10rpx;"></cl-text>
					<cl-text value="需提交下方所述证明:" :size="30"></cl-text>
				</view>
			</view>
			<view class="one-text one">
				<cl-text value="(1)个案咨询时长证明" color="#999"></cl-text>
				<cl-text value="下载模板" color="rgb(55 160 250)" @click="upload(1)"></cl-text>
				<cl-text :value="form.applyFile&&form.applyFile[1]?'修改上传':'上传word'" color="rgb(55 160 250)"
					@click="chooseFile(1)">
				</cl-text>

			</view>
			<view class="one-text one">
				<cl-text value="(2)个人体验证明" color="#999"></cl-text>
				<cl-text value="下载模板" color="rgb(55 160 250)" @click="upload(2)"></cl-text>
				<cl-text :value="form.applyFile&&form.applyFile[2]?'修改上传':'上传word'" color="rgb(55 160 250)"
					@click="chooseFile(2)">
				</cl-text>
			</view>
			<view class="one-text one">
				<cl-text value="(3)接受督导证明" color="#999"></cl-text>
				<cl-text value="下载模板" color="rgb(55 160 250)" @click="upload(3)"></cl-text>
				<cl-text :value="form.applyFile&&form.applyFile[3]?'修改上传':'上传word'" color="rgb(55 160 250)"
					@click="chooseFile(3)">
				</cl-text>
			</view>

			<view class="one-text one">
				<cl-text value="(4)咨询证明材料审核申请表" color="#999"></cl-text>
				<cl-text value="下载模板" color="rgb(55 160 250)" @click="upload(4)"></cl-text>
				<cl-text :value="form.applyFile&&form.applyFile[4]?'修改上传':'上传word'" color="rgb(55 160 250)"
					@click="chooseFile(4)">
				</cl-text>
			</view>
			<view class="one-text one" style="margin-bottom: 20rpx;">
				<cl-text value="(5)开通咨询服务申请模板" color="#999"></cl-text>
				<cl-text value="下载模板" color="rgb(55 160 250)" @click="upload(5)"></cl-text>

			</view>
		</view>
	</cl-form>
</template>

<script>
	import conUpload from "@/components/comm/upload.vue"
	import UniCalendar from "@/uni-calendar_1.4.9/components/uni-calendar/uni-calendar.vue"
	import {
		baseSev
	} from "@/components/comm/base"
	import onBeforeuUpload from "@/tsjsFiles/upload/onBeforeUpload"
	import {
		request
	} from "@/components/comm/request"
	export default {
		components: {
			conUpload,
			UniCalendar
		},
		name: 'InputConsult',
		props: {
			isSbmit: {
				default: false,
				type: Boolean
			},
			form: {
				default: () => {
					return {
						certificate: [],
						identityCard: [],
						applyFile: ['', '', '', '', ''],
						name: '',
						mobile: '',
						gender: '0',
						birthday: ''
					}
				}
			},
			notPush: {
				default: false,
				type: Boolean
			}
		},
		watch: {
			isSbmit(newVal) {
				if (newVal) {
					this.onSubmit()
				}
			}
		},
		data() {
			return {
				acticon: baseSev.domain + '/oss/upload',
				rules: {
					name: {
						required: true,
						message: "名称不能为空"
					},
					gender: {
						required: true,
						message: "性别不能为空"
					},
					birthday: {
						required: true,
						message: "出生日期不能为空"
					},
					mobile: {
						required: true,
						message: "手机号不能为空"
					}
				},
				// form: {
				// 	certificate: [],
				// 	identityCard: [],
				// 	applyFile: ['', '', '', '', ''],
				// 	name: '',
				// 	mobile: '',
				// 	gender: '0',
				// 	birthday: ''
				// }
			}
		},
		methods: {
			chooseFile(num) {
				const _this = this
				// #ifdef H5
				uni.chooseFile({
					success(res) {
						const typeArr = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document',
							'application/msword'
						]
						if (typeArr.indexOf(res.tempFiles[0]?.type) === -1) {
							uni.showToast({
								icon: 'none',
								title: '只能上传doc、docx文件'
							})
						} else if (res.tempFiles[0]?.size > 51200) {
							uni.showToast({
								icon: 'none',
								title: '文件不能大于50k'
							})
						} else {
							uni.uploadFile({
								url: baseSev.domain + '/oss/upload',
								filePath: res.tempFilePaths[0],
								name: 'file',
								success: (result) => {
									console.log(result, 'resulr', num)
									uni.showToast({
										title: '上传成功'
									})
									_this.$set(_this.form.applyFile, num, JSON.parse(result.data)?.url)
								},
								fail: (err) => {
									console.log(err, 'err')
								}
							})
						}
						console.log(res, 'res')

					}
				})
				// #endif
				//#ifdef MP-WEIXIN
				wx.chooseMessageFile({
					type: 'file',
					success: (res) => {
						console.log(res, 'res')
						if (res.tempFiles[0]?.path.indexOf('doc') === -1 && res.tempFiles[0]?.path.indexOf(
								'docx') === -1) {
							uni.showToast({
								title: '只能上传doc、docx文件',
								icon: 'none'
							})
						} else if (res.tempFiles[0]?.size > 51200) {
							uni.showToast({
								icon: 'none',
								title: '上传文件不能大于50k'
							})
						} else {
							uni.uploadFile({
								url: baseSev.domain + '/oss/upload',
								filePath: res.tempFiles[0]?.path,
								name: 'file',
								success: (result) => {
									console.log(result, 'resulr', num)
									uni.showToast({
										title: '上传成功'
									})
									_this.$set(_this.form.applyFile, num, JSON.parse(result.data)
										?.url)
								},
								fail: (err) => {
									console.log(err, 'err')
								}
							})
						}
					}
				})
				//#endif
			},
			upload(num) {
				const numA = {
					1: '%E4%B8%AA%E6%A1%88%E5%92%A8%E8%AF%A2%E6%97%B6%E9%95%BF%E8%AF%81%E6%98%8E.docx',
					2: '%E4%B8%AA%E4%BA%BA%E4%BD%93%E9%AA%8C%E8%AF%81%E6%98%8E.docx',
					3: '%E6%8E%A5%E5%8F%97%E7%9D%A3%E5%AF%BC%E8%AF%81%E6%98%8E.docx',
					5: '%E5%BC%80%E9%80%9A%E5%92%A8%E8%AF%A2%E6%9C%8D%E5%8A%A1%E7%94%B3%E8%AF%B7%E6%A8%A1%E7%89%88.docx',
					4: '%E5%92%A8%E8%AF%A2%E8%AF%81%E6%98%8E%E6%9D%90%E6%96%99%E5%AE%A1%E6%A0%B8%E7%94%B3%E8%AF%B7%E8%A1%A8.docx'
				}
				const downloadTask = uni.downloadFile({
					url: baseSev.cdn + '/fontEnd/' + numA[num],
					success: (res) => {
						console.log(res, 'res')
						// #ifdef MP-WEIXIN
						uni.getFileSystemManager().saveFile({
							tempFilePath: res.tempFilePath,
							success(resSave) {
								console.log(resSave, 'resSave')
								uni.openDocument({
									showMenu: true, //关键点,可以转发到微信

									filePath: resSave.savedFilePath
								})
							}
						})
						// #endif

						uni.showToast({
							icon: 'none',
							title: '下载成功'
						})
					}
				})
				downloadTask.onProgressUpdate(res => {
					if (res.progress < 100) {
						uni.showToast({
							title: '下载进度' + res.progress + '%',
							icon: 'none'
						})
					}
					console.log('下载进度' + res.progress);
					console.log('已经下载的数据长度' + res.totalBytesWritten);
					console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
				})

			},
			open() {
				this.$refs.calendar.open();
			},
			monthSwitch(value) {
				this.form.birthday = `${value.year}-${value.month}-1`
			},
			getNowDateString() {
				const date = new Date()
				return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
			},
			confirm(value) {

				this.form.birthday = value.fulldate

			},
			test() {
				uni.downloadFile({
					url: ''
				})
			},
			onBeforeUpload(file, index) {

				if (onBeforeuUpload(file, index) === false) return false
			},
			onSubmit() {
				console.log(this.form, 'form')
				const _this = this
				this.$emit('formValue', this.form)
				this.$refs["form-comm"].validate(valid => {
					if (valid) {
						if (!_this.form.identityCard[0] || !_this.form.identityCard[1] || !_this.form.identityCard[
								2]) {
							uni.showToast({
								title: '身份证照片必须上传',
								icon: 'none'
							})
							this.$emit('successForm',false)
						} else if (!_this.form.certificate[0]) {
							uni.showToast({
								title: '证书至少传一张',
								icon: 'none'
							})
							this.$emit('successForm',false)
						} else if (!_this.form.applyFile[1]) {
							uni.showToast({
								title: '个案咨询时长证明必须上传',
								icon: 'none'
							})
							this.$emit('successForm',false)
						} else if (!_this.form.applyFile[2]) {
							uni.showToast({
								title: '个人体验证明必须上传',
								icon: 'none'
							})
							this.$emit('successForm',false)
						} else if (!_this.form.applyFile[3]) {
							uni.showToast({
								title: '接受督导证明必须上传',
								icon: 'none'
							})
							this.$emit('successForm',false)
						} else if (!_this.form.applyFile[4]) {
							uni.showToast({
								title: '咨询证明材料审核申请表证明必须上传',
								icon: 'none'
							})
							this.$emit('successForm',false)
						} else {
							if(!this.notPush){
								request({
								url: '/consultDoctor',
								method: 'POST',
								data: {
									..._this.form
								}
							}).then(res => {
								console.log(res, 'res')
								uni.showToast({
									icon: 'none',
									title: '提交成功，请等待审核结果'
								})
								uni.requestSubscribeMessage({
									tmplIds: ['zN84IiGEZ7saVpqmzGTO0o2amGVyNWo9cryPt-ZUEuQ'],
									success: (res) => {
										console.log(res, 'res requestSubscribeMessage')
									},
									fail: (err) => {
										console.log(err, 'err')
									}

								})
							})
							}else{
								this.$emit('successForm',true)
							}
							
							console.log("success");
						}
					}else{
						this.$emit('successForm',false)
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.noneLabel {
		/deep/ .cl-form-item__container {
			padding-left: 0;
		}
	}

	.one-text {
		display: flex;
	}

	.none-han {
		display: flex;
		flex-direction: column;

		.one {
			justify-content: space-between;
			margin-bottom: 8rpx;
		}
	}

	.geryLine {
		height: 2rpx;
		background-color: #f1f1f1;
	}
</style>
