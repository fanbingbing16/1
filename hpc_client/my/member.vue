<template>

	<list :title="title" :list="list" :tabars="tabars" @selectOne="selectOne" @clickEdit="clickEdit"
		@loadmore="tabChange" @getActive="tabChange" :activeNow="activeNow" :notComputeList="true"
		:tabChangeComplete="tabChangeComplete" @deleteMenber="deleteMenber" :complate="complate">
	</list>
</template>

<script>
	import List from '@/components/comm/list.vue'
	import {
		request
	} from '@/components/comm/request';
	import Family from "@/scale/family/family.vue"
	import {
		sdkTool
	} from '../tsjsFiles/sdk/sdkTool';
	export default {
		name: 'Member',
		components: {
			List
		},
		onShow: function() {
			this.list = []
			this.activeNow = 0
			this.tabChange(0)
			this.getPeople()
		},
		created() {
			// this.tabChange(0)
			// this.getPeople()
		},

		methods: {
			async getPeople() {
				this.people = await this.global.getPeople()
			},
			tabChange(tab) {
				this.activeNow = tab
				if (this.list[tab]?.content?.length < this.tabarsTotal[tab] || !this.list[tab] || (this.list[tab]
						?.content?.length === 0 && tab === 0)) {

					this.tabChangeComplete = false
					const data = {
						offset: this.list[tab]?.content?.length || 0,
						limit: this.limit,
					}
					if (tab !== 0) {
						data.gender_eq = this.tabars[tab] === '女' ? '0' : '1'
					}

					request({
						url: '/userChildren',
						data
					}).then(resultChildren => {

						if (!this.list[tab]) {
							this.list[tab] = {
								title: this.tabars[tab],
								loading: false,
								finished: false,
								content: []
							}
						}
						this.list[tab].content = this.list[tab].content.concat(
							resultChildren?.data?.edges?.map(child => {
								return this.getListContent(child, this.people)
							}))
						//通知父组件已经拿到新的数据了
						this.tabChangeComplete = true
						this.tabarsTotal[tab] = resultChildren?.data?.pageInfo?.totalCount
						if (this.list[tab].content.length === this.tabarsTotal[tab]) {
							this.list[tab].finished = true
							this.list[tab].loading = false
						}
						this.faimlyList = this.list[0]?.content
						setTimeout(() => {
							this.complate = true
						}, 300)

					}).catch(err => {
						this.complate = true
						console.log(err, 'err')
					})

				}

			},
			async selectOne(item) {
				const selectFaimly = this.faimlyList.filter(faimly => faimly.id === item.id)?. [0]
				const userInfo = await this.global.getInfo()
				if (selectFaimly) {
					sdkTool.editSelectChildren({
						childrenId: selectFaimly.id,
						userId: userInfo?.user?.id
					}).then(() => {
						// uni.setStorage({
						// 	key: 'people',
						// 	data: selectFaimly,
						// 	success: (resultPeople) => {
						this.global.setPeople(selectFaimly)
						this.people = selectFaimly
						uni.showToast({
							title: `您已选中${item.type}`,
							icon: 'none'
						})
						this.complate = false
						this.list = []
						this.tabChange(this.activeNow)

						// },
						// fail: () => {
						// 	uni.showToast({
						// 		title: '发生错误，请重试',
						// 		icon: 'none'
						// 	})
						// }
						// })
					})

				}


			},
			clickEdit(item) {
				uni.navigateTo({
					url: '/scale/family/create?peopleId=' + item.id
				})

			},
			deleteMenber(item) {

				Family.methods.deleteItem(item, true, this).then(() => {
					this.list = []
					console.log(123, 'deleteItem')
					this.activeNow = 0
					this.tabChange(0)
					this.getPeople()
				}).catch(err => {
					console.log(122, err)
				}).finally(() => {
					console.log(124)
				})
			},
			getListContent(faimly, people) {
				console.log(people, faimly, 'people faimly')
				const content = {
					type: faimly.node?.name || faimly.type,
					id: faimly?.node?.id || faimly?.id,
					birthDay: faimly?.node?.birthDay || faimly?.birthDay,
					birthWeek: faimly?.node?.birthWeek || faimly?.birthWeek,
					birthday: faimly?.node?.birthday || faimly?.birthday,
					status: (typeof faimly.node?.gender === 'string' ? (faimly.node?.gender === '0' ? '女' : '男') :
						faimly.status),
					statusColor: (typeof faimly.node?.gender === 'string' ? (faimly.node?.gender === '0' ? '#00D1A6' :
							'#FF9A00') :
						faimly.statusColor),
					texts: [{
							title: '是否选中',
							text: (people?.id || people?.node?.id) === (faimly?.node?.id || faimly.id) ? '是' : '否'
						},
						{
							title: '出生日期',
							text: faimly.node?.birthday || faimly?.birthday
						}
					],
					footer: {
						buttons: [{
								title: '选中',
								clickFuc: 'selectOne',
							},
							{
								title: '编辑',
								clickFuc: 'clickEdit',
							},
							{
								title: '删除',
								clickFuc: 'deleteMenber',
							}
						]
					}
				}
				if ((faimly.node?.birthDay || faimly.birthDay) && (faimly.node?.birthWeek || faimly.birthWeek)) {
					content.texts.push({
						title: '出生孕周',
						text: `${faimly.node?.birthWeek||faimly.birthWeek}周${faimly.node?.birthDay||faimly.birthDay}天`
					})
				}
				return content
			}
		},
		data() {
			return {
				complate: false,
				limit: 10,
				tabChangeComplete: false,
				people: {},
				activeNow: 0,
				title: '成员列表',
				tabars: ['全部成员', '男', '女'],
				tabarsTotal: [0, 0, 0],
				faimlyList: [],
				list: [{
					title: "全部成员",
					loading: false,
					finished: false,
					content: [],
				}],
			};
		},
	};
</script>

<style scoped lang="scss">
	page {
		background: #f5f5f5;
	}

	.order {
		/deep/ .cl-tabs__container {
			background-color: rgba(0, 0, 0, 0);
		}

		/deep/ .cl-tabs__bar-item.is-active {
			font-weight: bold;
		}

		padding-bottom: 50rpx;

		.person {
			margin-top: 26rpx;
			padding: 36rpx 30rpx;
			box-sizing: border-box;
			background: #ffffff;

			.title {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.detail {
					display: flex;
					align-items: center;

					.icon {
						width: 60rpx;
						height: 60rpx;
					}
				}
			}

			.msg {
				margin-top: 36rpx;
			}
		}
	}
</style>
