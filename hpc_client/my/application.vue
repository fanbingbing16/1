<template>

	<list :title="title" :list="list" :tabars="tabars" :tabChangeComplete="true" @getActive="getUserOrder"
		@loadmore="getUserOrder" :clickTab="pageChange" :complate="complate" :activeNow="active"></list>

</template>

<script>
	import List from '@/components/comm/list.vue'
	import {
		request
	} from '@/components/comm/request';
	import {
		store
	} from '@/tsjsFiles/vuex/store';
	import {
		sdkTool
	} from '@/tsjsFiles/sdk/sdkTool';
	import {
		ConsultDoctorStatus,
		consultDoctorStatusText,
		consultDoctorStatusText2,
		PaymenStatus,
		paymentStartusText
	} from '@/components/comm/allCfg';
	export default {
		components: {
			List
		},
		onLoad: function(option) {
			this.list = [{
				title: "全部",
				content: [],
				finished: false,
				loading: false,
			}]
			// this.active = +(option.active)
			this.getUserOrder(this.active)
			console.log(this.active, 'active')
		},
		onShow: function() {

		},
		created() {
			// this.getUserOrder(0)
		},
		methods: {
			pageChange(tabar, index, item) {

				sdkTool.goPayPage(item.cpOrderId)
			},
			getUserOrder(tab) {

				if (this.list[tab]?.content?.length < this.tabarsTotal[tab] || !this.list[tab] || (this.list[tab]?.content
						?.length === 0 && tab === 0)) {
					this.tabChangeComplete = false
					console.log(tab, this.list[tab]?.content?.length, 'tab', this.list, this.list[0])
					const data = {
						offset: this.list[tab]?.content?.length || 0,
						limit: this.limit,
					}
					data.status_eq = consultDoctorStatusText[this.tabars[tab]]
					if (!consultDoctorStatusText[this.tabars[tab]]) delete data.status_eq

					const _this = this
					request({
						url: '/consultDoctor/findOneByUserId',
						data
					}).then(resolve => {
						if (!_this.list[tab]) {
							_this.list[tab] = {
								title: _this.tabars[tab],
								finished: false,
								loading: false,
								content: []
							}
						}
						const hasAudit = resolve?.data?.applyRecord?.some(record => record.consultApplyId ===
							resolve.data.id)
						if (!hasAudit) {
							resolve.data.applyRecord = (resolve?.data?.applyRecord || []).concat({
								createdAt: resolve.data.createdAt,
								consultApplyId: resolve.id,
								status: 0
							})
						}
						console.log(hasAudit, 'hasAudit')
						resolve?.data?.applyRecord?.map(record => {
							let content = {}
							content = {
								type: '申请记录',
								id: record.consultApplyId,
								status: consultDoctorStatusText2[record.status],
								statusColor: (record.status === ConsultDoctorStatus.DISABLED || record
										.status === ConsultDoctorStatus.REJECT) ? '#FF9A00' :
									'#00D1A6',
								texts: [{
									title: '申请时间',
									text: _this.moment(new Date(record
											?.createdAt))
										.format('YYYY/MM/DD,HH:mm:ss')
								}]
							}
							if (tab === 0 || record.status === data.status_eq)
								_this.list[tab].content.push(content)
							_this.tabarsTotal[tab] = resolve?.data?.pageInfo?.totalCount

							if (_this.list[tab]?.content?.length === _this.tabarsTotal[tab]) {
								_this.list[tab].finished = true
							}
						})
						console.log(_this.list, 'list s')
						_this.tabChangeComplete = true
						_this.complate = true
					}).catch(err => {
						console.log(err, 'err')
						_this.complate = true
					})
				}
			},

		},
		data() {
			return {
				active: 0,
				complate: false,
				tabChangeComplete: false,
				tabars: ['全部'].concat(Object.keys(consultDoctorStatusText)),
				title: "审核记录",
				limit: 10,
				tabarsTotal: [0, 0, 0],
				list: [{
					title: "全部",
					content: [],
					finished: false,
					loading: false,
				}]
			}
		}
	}
</script>

<style scoped lang="scss">

</style>
