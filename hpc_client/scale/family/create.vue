<template>
	<view class="create">
		<cl-toast ref="toast" position="middle"></cl-toast>

		<view class="back" v-if="!noBack">
			<!-- 自定义导航 -->
			<cl-topbar :title="(params&&params.peopleId)?'编辑成员':'创建成员'"></cl-topbar>
		</view>
		<uni-calendar ref="calendar" :date="form.birthday" :insert="false" @confirm="confirm"
			:endDate="getNowDateString()" @monthSwitch="monthSwitch" />
		<view class="content">
			<cl-form ref="form" :model.sync="form" :rules="rules" label-width="140rpx">
				<cl-form-item prop="name" label="姓名">
					<cl-input clearable v-model="form.name" placeholder="请输入"></cl-input>

					<!--<cl-select v-model="form.name" :options="nameList" placeholder="请选择" :border="true"></cl-select>-->
				</cl-form-item>
				<view class="button-list">
					可选输入：
					<cl-button v-for="(name,index) in nameList" :key="index" @click="nameClick(name)"
						:type="form.name===name.value?'primary':''">{{name.label}}</cl-button>
				</view>
				<cl-form-item prop="gender" label="性别">
					<cl-radio v-model="form.gender" label="0">女</cl-radio>
					<cl-radio v-model="form.gender" label="1">男</cl-radio>
				</cl-form-item>
				<cl-form-item prop="birthday" label="出生日期">
					<cl-button @click="open">选择出生日期</cl-button>
					<text class="birthdate">&nbsp;{{form.birthday}}</text>

				</cl-form-item>
			</cl-form>
			<cl-button type="primary" class="full" @click="add">{{params.peopleId?'修改':'新增'}}</cl-button>
		</view>


	</view>
</template>

<script>
	import UniCalendar from "@/uni-calendar_1.4.9/components/uni-calendar/uni-calendar.vue"
	import backPage from "@/components/comm/backPage"
	import {
		request
	} from "@/components/comm/request"
	import {
		getName
	} from "@/components/comm/utils/getName"
	import {
		sdkTool
	} from "@/tsjsFiles/sdk/sdkTool"
	export default {
		components: {
			UniCalendar
		},
		props: {
			noBack: {
				default: false,
				type: Boolean
			}
		},
		name: 'Create',
		onLoad: function(option) {

			this.params = option
			if (this.params?.peopleId) {
				this.getPeopleInfo()
			}
		},
		created() {},
		data() {
			return {
				name: '0',
				nameList: [{
						label: "大宝",
						value: "大宝"
					},
					{
						label: "二宝",
						value: "二宝"
					},
					{
						label: "三宝",
						value: "三宝"
					}
				],
				params: {},
				form: {
					name: '大宝',
					gender: '',
					birthday: ''
				},
				rules: {
					name: {
						required: true,
						message: "姓名不能为空",
						trigger: 'blur'
					},
					gender: {
						required: true,
						message: "性别不能为空",
						trigger: 'blur'
					},
					birthday: {
						required: true,
						message: "出生日期不能为空",
						trigger: 'blur'
					}
				},
			}
		},
		methods: {
			monthSwitch(value) {
				this.form.birthday = `${value.year}-${value.month}-1`
			},
			getNowDateString() {
				const date = new Date()
				return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
			},
			nameClick(name) {
				this.form.name = name.value
			},
			getPeopleInfo() {

				request({
					url: '/userChildren/findOne/' + this.params?.peopleId
				}).then((resolve) => {

					this.form = {
						name: resolve?.data?.name,
						gender: resolve?.data?.gender,
						birthday: resolve?.data?.birthday,
					}
				})
			},
			confirm(value) {

				this.form.birthday = value.fulldate

			},
			open() {
				this.$refs.calendar.open();
			},
			add() {
				this.$refs["form"].validate(valid => {
					if (valid) {

						request({
							url: '/userChildren',
							data: {
								...this.form,
								id: this.params?.peopleId

							},
							method: this.params?.peopleId ? 'PUT' : 'POST'
						}).then(resolve => {

							// 新增家庭成员后设置选中的人为新增的这个人
							sdkTool.editSelectChildren({
								childrenId: resolve.data?.id || resolve.data?.node?.id || this
									.params?.peopleId
							}).then(() => {
								uni.setStorage({
									key: 'people',
									data: this.params?.peopleId ? {
										...this.form,
										id: this.params?.peopleId
									} : resolve.data,
									success: () => {
										this.global.setPeople(
											this.params?.peopleId ? {
												...this.form,
												id: this.params?.peopleId
											} : {
												...resolve.data
											}
										)
										this.$emit('addComplate',
											resolve.data
										)
										if (!this.noBack)
											uni.navigateBack()
										// this.people = resolve.data
										// this.getUserItem()
									}
								})
							})



						}).catch(err => {
							console.log(err, 'err')
							this.$refs['toast']?.open({
								message: err.data?.message
							})
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.create {
		.content {
			.button-list {
				font-size: 24rpx;

				/deep/ .cl-button {
					// height: 44rpx;
					// font-size: 12px;

					// padding: 0px 14rpx;
				}
			}

			width: calc(100% - 40rpx);
			margin: 20rpx;

			.birthdate {
				margin-left: 10rpx;
			}
		}
	}
</style>
