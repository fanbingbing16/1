<template>
	<view class="family">
		<cl-toast ref="toast" position="middle"></cl-toast>
		<cl-text v-if="parentTitle" :value="parentTitle" style="text-align: center;width: 100%;"></cl-text>
		<view class="back" v-if="!isOneLine">
			<!-- 自定义导航 -->
			<cl-topbar :title="title"></cl-topbar>
		</view>
		<view :class="isOneLine?'content no-header':'content'">
			<cl-card v-for="(people,index) in faimlyList" :key="index" :label="getCardLabel(people)" more-text="编辑"
				:show-more="!isOneLine" @more="clickEdit(people)">
				<view class="card-content" @click="clickContent(people)">
					<cl-text :value="getNameValue(people)" v-if="isOneLine">
					</cl-text>
					<cl-text :value="getGenderValue(people)" :color="getGenderColor(people)"
						:class="isOneLine?'leftTest':''">
					</cl-text>
					<cl-text :value="getAge(people)" class="leftTest">
					</cl-text>
					<cl-button type="primary" @click="deleteItem(people,index)" v-if="buttonText!=='确定'&&!isOneLine"
						class="del">
						删除
					</cl-button>
				</view>
			</cl-card>

			<cl-button type="primary" class="full" @click="add" v-if="!loading">{{buttonText}}</cl-button>
		</view>

	</view>


</template>

<script>
	import {
		basePag
	} from '@/components/comm/base'
	import {
		request
	} from '@/components/comm/request'
	import {
		calculateAge
	} from '@/components/comm/utils/yuan'
	import {
		sdkTool
	} from '@/tsjsFiles/sdk/sdkTool'
	import backPage from "@/components/comm/backPage"
	export default {
		name: 'Family',
		props: {
			isOneLine: {
				default: false,
				type: Boolean
			},
			parentTitle: {
				default: '',
				type: String
			}
		},
		created() {
			console.log('button created')
			if (this.isOneLine)
				this.getButton()
		},
		onShow: function() {
			console.log('button onShow')
		},
		onLoad: function(option) {
			console.log(option, 'option', option)
			console.log('button onLoad')
			this.params = option || {}

			this.getButton()
		},
		data() {
			return {

				calculateAge,
				title: '选择人员',
				buttonText: '新增成员',
				faimlyList: [],
				loading: true,
				params: {},
				people: {}
			}
		},
		methods: {
			// 这几个get文件写在html中太长,写到这里
			getNameValue(people) {
				return people.type || (people.node ? people.node.name : '') || people.name || ''
			},
			getAge(people) {
				return this.calculateAge({
					startDate: (people.birthday || (people.node ? people.node.birthday : '')),
					onlyYear: true
				})
			},
			getCardLabel(people) {
				return this.isOneLine ? '' : (people.type || (people.node ? people.node.name : '') || people.name || '')
			},
			getGenderValue(people) {

				return people.status ? people.status : (people.node?.gender === '0' ? '女' : '男')
			},
			getGenderColor(people) {
				return people.status ? (people.status === '女' ? 'pink' : 'primary') :
					(people.node?.gender === '0' ? 'pink' : 'primary')

			},
			getButton() {

				if (!this.params.buttonText)
					this.getFailyList()
				else {
					uni.getStorage({
						key: 'people',
						success: (resultPeople) => {
							this.faimlyList = []
							this.faimlyList = [resultPeople.data]
							this.buttonText = '确定'
							this.title = '请确认您选择的成员信息是否正确'
							this.loading = false
						},
						fail: () => {
							this.loading = false
						}
					})
				}


			},
			deleteItem(people, notMy, _this) {
				return new Promise((resolve, reject) => {
					uni.showModal({
						title: '您确定删除吗？',
						success: (modelSuccess) => {

							if (modelSuccess?.confirm) {
								request({
									url: '/userChildren/' + (people?.id || people.node?.id),
									method: 'DELETE',
									notHeader: true
								}).then(result => {
									const thisTemp = _this || this
									if (result.data) {
										if (!notMy)
											this.getFailyList()
										resolve(resolve)
										//删除的是选中的家庭成员，清楚数据
										thisTemp.global.getPeople().then(result => {
											const globalId = result.id || result?.node
												?.id
											const deleteId = people?.id || people.node
												?.id
											if (globalId === deleteId) {
												uni.removeStorage({
													key: 'people'
												})
												thisTemp.global.clearPeople()
											}
										})

									}
								}).catch((err) => {
									reject(err)
									uni.showToast({
										title: '删除失败',
										icon: 'none'
									})
								})
							}
						},
						fail: (fail) => {
							reject(fail)
							console.log(fail, 'fail')
						}
					})
				})
			},
			async clickContent(people) {
				const _this = this
				if (!this.params.buttonText) {
					const userInfo = await this.global.getInfo()
					sdkTool.editSelectChildren({
						childrenId: people.id || people.node.id,
						userId: userInfo?.user?.id
					}).then(() => {
						uni.setStorage({
							key: 'people',
							data: {
								...people
							},
							success() {
								_this.global?.setPeople(people)
								_this.$refs['toast']?.open({
									message: `已选择${people?.type||people?.node?.name}`
								})
								if (!_this.isOneLine)
									backPage()
								else {
									_this.$emit('selectChange', people)
								}
							}
						})
					})

				}

			},
			clickEdit(people) {
				uni.navigateTo({
					url: '/scale/family/create?peopleId=' + (people?.id || people?.node?.id)
				})
			},
			add() {

				if (this.buttonText === '确定') {
					if (this.params.buttonText.indexOf('购买') > -1) {
						sdkTool.makeOrder({
							orderParm: {
								productId: this.params.productId
							}
						}).then((resolve) => {
							//免费单
							if (resolve) {
								this.postUserRecord(this.params.productId,
									String(this.faimlyList?. [0]?.node
										?.id || this.faimlyList?. [0]?.id))
							}
						})
					} else if (this.params.buttonText === '立即开始' || this.params.kind == 3) {
						this.postUserRecord(this.params.productId,
							String(this.faimlyList?. [0]?.node?.id || this.faimlyList?. [0]?.id)
						)
					} else if (this.params.buttonText === '重新开始') {
						this.goToTest(this.params.recordId,
							String(this.faimlyList?. [0]?.node?.id || this.faimlyList?. [0]?.id))
					} else {
						uni.navigateTo({
							url: '/scale/family/create'
						})
					}
				} else {
					if (this.isOneLine) {
						this.$emit('nonePeople', true)
					} else {
						uni.navigateTo({
							url: '/scale/family/create'
						})
					}

				}
			},
			goToTest(recordId) {
				let url = `/scale/test/test?scaleId=${this.params.scaleId}&scaleName=${this.params?.scaleName}`
				if (recordId) {
					url += '&recordId=' + recordId
				}
				if (this.params?.advanceSubmit) {
					url += `&advanceSubmit=${this.params?.advanceSubmit}`
				}
				uni.redirectTo({
					url,
				})

			},
			postUserRecord(productId, childrenId) {
				request({
					url: '/userRecord',
					data: {
						childrenId,
						productId
					},
					method: 'POST'
				}).then((resolve) => {

					this.goToTest(resolve.data?.id)
				}).catch(err => {
					this.$refs['toast']?.open({
						message: err.data?.message || err.data?.data?.msg
					})
				})
			},
			getFailyList() {
				this.loading = true
				this.faimlyList = []

				request({
					url: '/userChildren',
					// notHeader: this.isOneLine,
					// notTip:this.isOneLine
				}).then(resolve => {
					this.loading = false
					this.faimlyList = resolve.data?.edges
					if (this.faimlyList.length === 0) {
						this.$emit('nonePeople', true)
						if(!this.isOneLine){
							uni.redirectTo({
								url:'/scale/family/create'
							})
						}
					}
				}).catch(err => {
					console.log(err, 'err')
					this.$emit('nonePeople', false)
					this.loading = false
					this.$refs['toast']?.open({
						message: err.data?.message
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.family {
		.back {
			// margin-bottom: 20rpx;
		}


		.no-header {
			/deep/ .cl-card__header {
				display: none;
			}
		}

		/deep/ .cl-card {
			border: 1px solid #dedede;
		}

		cl-text {
			view {
				width: 100%;
			}
		}

		.content {
			width: calc(100% - 40rpx);
			margin: 20rpx;

			.card-content {
				.del {
					margin-left: 30rpx;
				}
			}

			.leftTest {
				margin-left: 10rpx;
			}
		}
	}
</style>
