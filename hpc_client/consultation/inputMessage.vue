<template>
	<view class="consultation-input-message">
		<cl-topbar title="填写信息"></cl-topbar>
		<view class="content">

			<cl-form ref="form" :model.sync="form" :rules="rules" label-width="120rpx">

				<cl-form-item prop="address" label="地址">
					<cl-select-region v-model="form.address"></cl-select-region>
				</cl-form-item>
				<view class="geryLine"></view>
				<cl-form-item prop="icon" label="头像">
					<con-upload v-model="form.icon" :action="acticon" :before-upload="onBeforeUpload"></con-upload>
					<cl-text value="只能上传图片" color="#999"></cl-text>
				</cl-form-item>
				<view class="geryLine"></view>
				<cl-form-item prop="bannerIsImage" label="是否上传图片" labelWidth="200rpx">
					<cl-switch v-model="form.bannerIsImage"></cl-switch>
				</cl-form-item>
				<cl-form-item prop="banner" label="详情页">
					<con-upload v-model="form.banner " :action="acticon"
						:before-upload="form.bannerIsImage?onBeforeUpload:onBeforeUploadBanner"
						:uploadType="form.bannerIsImage?'image':'video'">
					</con-upload>
					<cl-text value="可视频或图片,若是发现图片找不到请查看是否限制了文件格式" color="#999"></cl-text>
				</cl-form-item>


				<view class="geryLine"></view>
				<cl-form-item prop="employmentTime" label="从业经验">
					<cl-input-number v-model="form.employmentTime" :precision="2" :step="1" :input="true" :max="100"
						class="input-number"></cl-input-number>
					<cl-text value="单位年,请如实填写" color="#999"></cl-text>
				</cl-form-item>
				<view class="geryLine"></view>
				<cl-form-item prop="personalProfile" label="个人简介" labelWidth="160rpx">
					<cl-textarea v-model="form.personalProfile" placeholder="向用户简要介绍自己,记得分段" :count="true"
						:maxlength="500"></cl-textarea>
				</cl-form-item>
				<view class="geryLine"></view>
				<cl-form-item prop="beGoodAt" label="擅长方向" labelWidth="160rpx">
					<cl-checkbox-group v-model="form.beGoodAt">
						<cl-checkbox v-for="(listTypeOne,index) in listType" :key="index" :label="listTypeOne.value">
							{{listTypeOne.label}}
						</cl-checkbox>
					</cl-checkbox-group>
				</cl-form-item>
				<view class="geryLine"></view>
				<view v-for="(growthExperience,index) in form.growthExperience" :key="growthExperience.id">
					<cl-form-item :label="index===0?'职业经历':'经历'+(index+1)"
						:prop="'growthExperience'+growthExperience.id">
						<cl-input v-model="form.growthExperience[index].content" class="input-number"></cl-input>
					</cl-form-item>
					<cl-text value="例如:心理咨询与意向对话技术初级专业培训" color="#999"></cl-text>

					<cl-form-item label="开始时间" :prop="'growthExperienceStart'+growthExperience.id">
						<uni-calendar :ref="'calendarStart'+growthExperience.id" :date="growthExperience.startTime"
							:insert="false" @confirm="confirmTime($event,index,'startTime')"
							:endDate="getNowDateString()" @monthSwitch="monthSwitch($event,index,'startTime')" />
						<cl-button @click="openTime('calendarStart'+growthExperience.id)" class="input-number">选择日期
						</cl-button>
						<text class="birthdate">{{growthExperience.startTime}}</text>

					</cl-form-item>
					<cl-form-item label="结束时间" :prop="'growthExperienceStart'+growthExperience.id">
						<uni-calendar :ref="'calendarEnd'+growthExperience.id" :date="growthExperience.endTime"
							:insert="false" @confirm="confirmTime($event,index,'endTime')" :endDate="getNowDateString()"
							@monthSwitch="monthSwitch($event,index,'endTime')" />
						<cl-button @click="openTime('calendarEnd'+growthExperience.id)" class="input-number">选择日期
						</cl-button>
						<text class="birthdate">{{growthExperience.endTime}}</text>
						<cl-button type="primary" @click="addEmploy(index)">
							<cl-icon name="cl-icon-plus"></cl-icon>
						</cl-button>
						<cl-button v-if="index>0" @click="jianEmploy(index)">
							<cl-icon name="cl-icon-minus"></cl-icon>
						</cl-button>
					</cl-form-item>
					<view class="geryLine"></view>
				</view>
				<cl-form-item prop="appointPrice" label="咨询单价" labelWidth="160rpx">
					<cl-input-number v-model="form.appointPrice" :step="50" :input="true" :max="50000"
						class="input-number"></cl-input-number>
					<cl-text value="此填咨询每小时的价格" color="#999"></cl-text>
				</cl-form-item>
				<cl-form-item prop="serviceTime" label="咨询时间">
					<cl-input-number v-model="form.serviceTime" :precision="2" :step="0.5" :input="true" :max="100"
						class="input-number"></cl-input-number>
					<cl-text value="单位年,从业来咨询时间" color="#999"></cl-text>
				</cl-form-item>
				<view class="geryLine"></view>
				<view v-for="(specialColumn,index) in form.specialColumn" :key="specialColumn.id">
					<cl-form-item :label="index===0?'专栏':'专栏'+(index+1)" :prop="'specialColumn'+specialColumn.id">
						<cl-input v-model="specialColumn.title"></cl-input>
					</cl-form-item>
					<cl-text value="视频标题.例如:第一次咨询前需要做什么准备？" color="#999"></cl-text>
					<cl-form-item label="上传视频" :prop="'specialColumnVideo'+specialColumn.id">
						<con-upload v-model="specialColumn.video " :action="acticon"
							:before-upload="onBeforeUploadSpecial" uploadType="video">
						</con-upload>
						<cl-text value="只可以传小于3MB的视频" color="#999"></cl-text>
						<cl-button type="primary" @click="addSpecial(index)">
							<cl-icon name="cl-icon-plus"></cl-icon>
						</cl-button>
						<cl-button v-if="index>0" @click="jianSpecial(index)">
							<cl-icon name="cl-icon-minus"></cl-icon>
						</cl-button>
					</cl-form-item>
					<view class="geryLine"></view>
				</view>
				<cl-text value="问答" :size="40" style="margin-top: 20rpx;"></cl-text>
				<view v-for="(qa,index) in form.qa" :key="qa.id">
					<cl-form-item :label="index===0?'问题':'问题'+(index+1)" :prop="'qa'+qa.id">
						<cl-input v-model="qa.title"></cl-input>
					</cl-form-item>
					<cl-form-item label="答案" :prop="'qa'+qa.id">
						<cl-input v-model="qa.text"></cl-input>

					</cl-form-item>
					<cl-button type="primary" @click="addQa(index)">
						<cl-icon name="cl-icon-plus"></cl-icon>
					</cl-button>
					<cl-button v-if="index>0" @click="jianQa(index)">
						<cl-icon name="cl-icon-minus"></cl-icon>
					</cl-button>
				</view>
				<view class="geryLine" style="margin-top: 20rpx;"></view>
				<cl-form-item label="咨询过程与方式" prop="processAndMethod" label-width="200rpx">
					<cl-textarea v-model="form.processAndMethod" placeholder="填写咨询过程与方式,记得分段" :count="true"
						:maxlength="500"></cl-textarea>
				</cl-form-item>
				<view class="geryLine"></view>
				<cl-text value="咨询室环境" :size="40" style="margin-top: 20rpx;"></cl-text>
				<cl-form-item prop="consultRoomEnv" label="" labelWidth="0px" class="consultRoomEnv">
					<con-upload v-model="form.consultRoomEnv" :action="acticon" :before-upload="onBeforeUpload"
						:multiple="true" :limit="3"></con-upload>
				</cl-form-item>
				<view class="geryLine"></view>
				<cl-form-item label="咨询师寄语" prop="msgFromConsult" label-width="200rpx">
					<cl-textarea v-model="form.msgFromConsult" placeholder="填写咨询师寄语" :count="true" :maxlength="200">
					</cl-textarea>
				</cl-form-item>
			</cl-form>
			<input-consult :isSbmit="isSbmit" :form="constForm" :notPush="true" @successForm="successForm">
			</input-consult>
			<view style="width:100%;height:calc(100rpx + env(safe-area-inset-bottom));"></view>
			<view class="input-footer">
				<cl-button class="full" @click="goToExperts">预览</cl-button>
				<cl-button class="full" @click="pushData" type="primary">提交</cl-button>
			</view>

		</view>

	</view>
</template>

<script>
	import InputConsult from "@/pages/commVue/inputConsult.vue"
	import {beGoodAt} from "@/tsjsFiles/api/beGoodAt"
	import {
		baseSev
	} from "@/components/comm/base"
	import conUpload from "@/components/comm/upload.vue"
	import UniCalendar from "@/uni-calendar_1.4.9/components/uni-calendar/uni-calendar.vue"
	import onBeforeuUpload from "@/tsjsFiles/upload/onBeforeUpload"
	import {
		request
	} from "@/components/comm/request"
	export default {
		name: 'InputMessage',
		components: {
			conUpload,
			UniCalendar,
			InputConsult
		},
		data() {
			return {
				isSbmit: false,
				acticon: baseSev.domain + '/oss/upload',
				constForm: {},
				isConstForm: false,
				form: {
					bannerIsImage: true,
					msgFromConsult: '',
					processAndMethod: '',

					address: [],
					icon: '',
					appointPrice: 0,
					serviceTime: 1.5,
					employmentTime: 0,
					growthExperience: [{
						startTime: '',
						endTime: '',
						content: '',
						id: 0
					}],
					consultRoomEnv: [],
					specialColumn: [{
						title: '',
						video: '',
						id: new Date().getTime()
					}],
					qa: [{
						title: '哪一刻决定成为一个心理咨询师？',
						text: '',
						id: Math.floor(new Date().getTime() / 1000)
					}, {
						title: '从学习到从事咨询印象深刻的一件事？',
						text: '',
						id: Math.floor(new Date().getTime() / 1000) + 1
					}, {
						title: '在咨询过程中的关注或思路是什么？',
						text: '',
						id: Math.floor(new Date().getTime() / 1000) + 2
					}],
					beGoodAt: [],
					personalProfile: '',
					certificate: [],
					identityCard: [],
					applyFile: ['', '', '', '', ''],
					name: '',
					mobile: '',
					gender: '0',
					birthday: ''

				},
				listType: beGoodAt,
				rules: {
					address: {
						required: true,
						message: "地址不能为空"
					},
					icon: {
						required: true,
						message: "头像不能为空"
					},
					banner: {
						required: true,
						message: "详情页不能为空"
					},
					appointPrice: {
						required: true,
						message: "预约价格不能为空"
					},
					personalProfile: {
						required: true,
						message: "个人简介不能为空"
					},
					beGoodAt: {
						required: true,
						message: "擅长不能为空"
					},
					specialColumn: {
						required: true,
						message: "专栏不能为空"
					},
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
				}
			}
		},
		created() {
			
			console.log(this, 'this 1')
			request({
				url: '/consultDoctor/findOneByUserId',

			}).then(res => {
				delete res.data.applyRecord
				for (const key in res.data) {
					if (res.data[key]) {
						this.form[key] = res.data[key]
						this.$set(this.constForm, key, res.data[key])
					}
				}


			})
		},
		methods: {
			goToExperts() {
				uni.setStorage({
					key: 'consultation',
					data: {
						...this.form,
						...this.constForm
					},
					success: () => {
						uni.navigateTo({
							url: '/consultation/experts?id=yulan'
						})
					}
				})
			},
			successForm(value) {
				this.isConstForm = value
			},
			monthSwitch(value, index, text) {
				this.form.growthExperience[index][text] = `${value.year}-${value.month}-1`
			},
			confirmTime(value, index, text) {
				this.form.growthExperience[index][text] = value.fulldate
			},
			getNowDateString() {
				const date = new Date()
				return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
			},
			openTime(refText) {
				this.$refs[refText][0].open();
			},
			addQa(index) {
				this.form.qa.splice(index + 1, 0, {
					text: '',
					title: '',
					id: this.form.qa.slice(-1)[0].id + 1
				})
			},
			jianQa(index) {
				this.form.qa.splice(index, 1)
			},
			addSpecial(index) {
				this.form.specialColumn.splice(index + 1, 0, {
					title: '',
					video: '',
					id: this.form.specialColumn.slice(-1)[0].id + 1
				})
			},
			jianSpecial(index) {
				this.form.specialColumn.splice(index, 1)
			},
			addEmploy(index) {
				this.form.growthExperience.splice(index + 1, 0, {
					startTime: '',
					endTime: '',
					content: '',
					id: this.form.growthExperience.slice(-1)[0].id + 1
				})
			},
			jianEmploy(index) {
				this.form.growthExperience.splice(index, 1)
			},
			pushData() {
				console.log(this.form, 'form', this.constForm)
				const _this = this
				this.isSbmit = true
				setTimeout(() => {
					this.isSbmit = false
				})
				let time = 0
				const inter = setInterval(() => {

					time++
					if (time > 10) {
						clearInterval(inter)
					}
					if (this.isConstForm) {
						clearInterval(inter)
						this.$refs["form"].validate(valid => {
							if (valid) {

								const isSpecial = _this.form.specialColumn.some(special => {
									return !special.title || !special.video
								})
								const isQa = _this.form.qa.some(qa => {
									return !qa.text || !qa.title
								})
								if (isSpecial) {
									uni.showToast({
										icon: 'none',
										title: '专栏必填'
									})
								} else if (isQa) {
									uni.showToast({
										icon: 'none',
										title: '问答必填'
									})
								} else {
									console.log("success 124");

									request({
										url: '/consultDoctor',
										method: 'PUT',
										data: {
											..._this.form,
											..._this.constForm,
											bannerIsImage: undefined
										}
									}).then(res => {
										console.log(res, 'res')
										uni.showToast({
											icon: 'none',
											title: '提交成功，请等待审核结果'
										})
										uni.requestSubscribeMessage({
											tmplIds: [
												'zN84IiGEZ7saVpqmzGTO0o2amGVyNWo9cryPt-ZUEuQ'
											],
											success: (res) => {
												console.log(res,
													'res requestSubscribeMessage')
											},
											fail: (err) => {
												console.log(err, 'err')
											}

										})
									})
								}
							}
						});
					}
				}, 500)


			},
			onBeforeUploadSpecial(file, index) {
				if (file.size > 3145728) {

					uni.showToast({
						title: '视频大小不能大于3MB',
						icon: 'none'

					})
					return false;
					//  #ifdef H5
				} else if (file.type.indexOf('video') === -1) {
					uni.showToast({
						title: '只能上传mp4视频',
						icon: 'none'

					})
					return false;
				}

				// #endif
				//#ifdef MP-WEIXIN
			} else if (file.tempFilePath.indexOf('mp4') === -1) {
				uni.showToast({
					title: '只能上传mp4视频',
					icon: 'none'

				})
				return false;
			}
			//#endif
		},
		onBeforeUploadBanner(file, index) {
			console.log(file, index, 'file,index')

			//  #ifdef H5
			if (file.type.indexOf('video') > -1) {
				if (file.size > 3145728) {
					uni.showToast({
						title: '视频大小不能大于3MB',
						icon: 'none'

					})
					return false
				}
			}
			//#endif
			//#ifdef MP-WEIXIN
			if (file.tempFilePath.indexOf('mp4') > -1) {
				if (file.size > 3145728) {
					uni.showToast({
						title: '视频大小不能大于3MB',
						icon: 'none'

					})
					return false
				}
			}
			//#endif
			else {
				uni.showToast({
					title: '只能上传mp4视频或者jpg、png图片',
					icon: 'none'

				})
				return false
			}
		},
		onBeforeUpload(file, index) {
			if (onBeforeuUpload(file, index) === false) return false
		},
	}
	}
</script>

<style scoped lang="scss">
	.consultation-input-message {
		background-color: #fff;
		width: 100%;

		.content {
			padding: 0 40rpx;
			width: 100%;
			box-sizing: border-box;
			.input-footer {
				background-color: #fff;
				display: flex;
				position: fixed;
				bottom: env(safe-area-inset-bottom);
				width: calc(100% - 80rpx);

			}

			.consultRoomEnv {
				/deep/ .cl-form-item__container:first-child {
					padding-left: 0;
				}
			}

			.input-number {
				margin-right: 20rpx;
			}

			.geryLine {
				margin: 0 0 0 40rpx;
				height: 2rpx;
				background-color: #f1f1f1;
			}
		}
	}
</style>
