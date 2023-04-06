<template>
	<view class="reception">
		<!-- <cl-topbar ></cl-topbar> -->
		<view class="header">
			<cl-text :value="tipTitle" :size="50"></cl-text>
		</view>
		<view class="content">
			<cl-list-item :label="(scale&&scale.node&&scale.node.name)?scale.node.name:''"
				v-for="(scale,index) in scaleData" :key="index" style="margin: 20rpx;" @click="gotoLb(scale)">

			</cl-list-item>
		</view>
	</view>

</template>

<script>
	import {
		request
	} from '@/components/comm/request'
	export default {
		onLoad: function(option) {
			console.log(option, 'option')
			this.option = option
			this.referrerUser()

		},
		created() {
			this.getLbData()
		},
		data() {
			return {
				tipTitle: '',
				option: {},
				scaleData: [],
				isMe: false
			}
		},
		methods: {
			gotoLb(scale) {
				uni.redirectTo({
					url: '/scale/test/introduce?id=' + scale.node.id
				})
			},
			referrerUser() {
				request({
					url: '/user/referrerUser',
					method: 'PUT',
					data: {
						recordId: this.option.recordId
					},
					notTip: true
				}).then(result => {
					console.log(result, 'result')
					if (result.data === true) {
						this.tipTitle = '您已帮助好友助力成功'
					}
				}).catch(err => {
					console.log(err, 'err')

					try {
						this.tipTitle = 'Error:'+JSON.parse(err.data.data.msg || '{}')?.msg
						this.isMe = true
					} catch {
						this.tipTitle = err.data?.data?.msg
						this.isMe = false
					}
				})
			},
			getLbData() {
				request({
					url: '/lbs',
					data: {
						status_eq: 1,
						offset: 0,
						limit: 5
					},
					notHeader: true
				}).then(result => {
					this.scaleData = result.data?.edges
					console.log(result, 'result')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.reception {
		.header {
			margin-top: 20rpx;
			width: 100%;
			text-align: center;
		}
	}
</style>
