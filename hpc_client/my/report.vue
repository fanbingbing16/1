<template>
	<list :title="title" :list="list" :tabars="tabars" @seeReport="seeReport" @testAgain="testAgain"
		:complate="complate"></list>
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
		RecordStatus
	} from '@/components/comm/allCfg';
	import {
		sdkTool
	} from '@/tsjsFiles/sdk/sdkTool';
	export default {
		components: {
			List
		},
		created() {

			
			this.getList()
		},
		onShow() {
			sdkTool.staggingUserRecord()
		},
		methods: {
			testAgain(item) {

				uni.navigateTo({
					url: `/scale/test/test?recordId=${item.id}&scaleId=${item.lbid}&scaleName=${item.type}`
				})
			},
			seeReport(item) {

				uni.navigateTo({
					url: '/scale/test/report?id=' + item.id,
					fail: (err) => {
						coonsole.log(err)
					}
				})
			},
			getList() {
				request({
					url: '/userRecord',
					data: {
						offset: 0,
						limit: 9999
					}
				}).then((resolve) => {

					const statusText = {
						[RecordStatus.PENGDING]: '未完成',
						[RecordStatus.SUCCESS]: '已完成',
						[RecordStatus.ERROR]: '异常',
						[RecordStatus.STAGING]: '暂存'
					}
					const statusColor = {
						[RecordStatus.PENGDING]: '#FF9A00',
						[RecordStatus.SUCCESS]: '#00D1A6',
						[RecordStatus.ERROR]: '#FF9A00',
						[RecordStatus.STAGING]: '#FF9A00'
					}
					const content = []
					resolve?.data?.edges?.forEach(record => {

						content.push({
							type: record?.node?.lb?. [0]?.name,
							id: record.node.id,
							lbid: record.node.lbid,
							status: statusText?. [record?.node?.status],
							statusColor: statusColor?. [record?.node?.status],
							texts: [{
									title: record.node?.collectJson?.testDate ?
										'测评时间' : '创建时间',
									text: record.node?.collectJson?.testDate ? (this.moment(
										new Date(
											record.node?.collectJson
											?.testDate || null)).format(
										'yyyy-MM-DD HH:mm')) : (this
										.moment(new Date(record.node?.createdAt || null))
										.format('yyyy-mm-DD HH:mm'))
								},
								{
									title: '所属类别',
									text: record.node.lb[0]?.unifiedInfo
								},
								{
									title: '测评成员',
									text: record.node?.collectJson?.childName || ''
								}
							],
							footer: {
								buttons: [{
									title: (record.node?.status === RecordStatus.ERROR ||
											record.node?.status === RecordStatus.SUCCESS) ?
										'查看报告' : '继续测评',
									clickFuc: (record.node?.status === RecordStatus
											.ERROR || record.node?.status === RecordStatus
											.SUCCESS) ?
										'seeReport' : 'testAgain',
								}],
							}
						})
						if (!record.node?.collectJson?.childName) {
							content.slice(-1)[0].texts.pop()

						}

					})

					this.list = []
					this.list[0] = {
						title: '全部',
						content
					}
					console.log(111)
					this.complate = true
				}).catch(reject => {
					this.complate = true
					console.log(reject, 'reject')
				})
			}
		},
		data() {
			return {
				complate: false,
				tabars: ['全部', '已完成', '未完成', '异常', '暂存'],
				title: "测评报告",
				list: [{
					title: "全部",
					content: []
				}],
			};
		},
	};
</script>

<style scoped lang="scss">

</style>
