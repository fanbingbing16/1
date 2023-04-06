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
			this.active = +(option.active)
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
					if (this.tabars[tab] === '待结算') {
						data.status_eq = 0
					} else if (this.tabars[tab] === '已结算') {
						data.status_eq = 1
					}
					request({
						url: '/userOrder',
						data
					}).then(resolve => {
						if (!this.list[tab]) {
							this.list[tab] = {
								title: this.tabars[tab],
								finished: false,
								loading: false,
								content: []
							}
						}
						resolve?.data?.edges?.map(async order => {
							let content = {}
							let product = await store.getLbProduct({
								productId: order?.node?.params?.productId
							})
							content = {
								type: product?. [0]?.node?.name,
								cpOrderId: order?.node?.cpOrderId,
								status: paymentStartusText[order?.node?.status],
								statusColor: order?.node?.status === PaymenStatus.pengding ?
									'#FF9A00' : '#00D1A6',
								id: order?.node?.id,
								texts: [{
										title: '创建时间',
										text: this.moment(new Date(order?.node
												?.createdAt))
											.format('YYYY/MM/DD,HH:mm:ss')
									},
									{
										title: '订单编号',
										text: order?.node?.id
									}
								],
								footer: {
									title: '订单金额',
									type: 'money',
									text: '￥' + product?. [0]?.node?.price
								}
							}

							this.list[tab].content.push(content)
							this.tabarsTotal[tab] = resolve?.data?.pageInfo?.totalCount

							if (this.list[tab]?.content?.length === this.tabarsTotal[tab]) {

								this.list[tab].finished = true

							}
							setTimeout(() => {
								this.tabChangeComplete = true
							}, 2000)
						})
						this.complate = true


					}).catch(err => {
						this.complate = true
					})
				}
			},

		},
		data() {
			return {
				active: 0,
				complate: false,
				tabChangeComplete: false,
				tabars: ['全部', '已结算', '待结算'],
				title: "全部订单",
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
