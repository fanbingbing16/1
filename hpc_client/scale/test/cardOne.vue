<template>
	<view class="card">
		<view style="display: flex;justify-content: space-between;">
			<cl-button class="type" type="primary">解析概览</cl-button>
			<cl-button class="open" @click="goToAll" v-if="!full">查看全部

			</cl-button>
		</view>
		<view class="one-type" v-for="listTypeScore in listTypeScores" :key="listTypeScore.name">
			<view class="header" v-if="listTypeScore.label||listTypeScore.oneAdvice||listTypeScore.score">
				<view class="shu"></view>
				<cl-text :value="listTypeScore.label+'：'" bold block></cl-text>
				<cl-text :value="listTypeScore.oneAdvice" :color="listTypeScore.danger?'red':''"
					:bold="listTypeScore.danger"></cl-text>
				<cl-text v-if="isNumber(listTypeScore.score)"
					:value="' '+listTypeScore.score+(reportDataValue&&!reportDataValue.notScore?'分':'')"
					color="#d5aab3">
				</cl-text>
			</view>
			<view class="advice">
				<cl-text :value="listTypeScore.advice" :ellipsis="full?null:2"></cl-text>
			</view>
			<view class="advice" v-if="listTypeScore.shouDo">
				<cl-text value="建议：" bold></cl-text>
				<cl-text :value="listTypeScore.shouDo" :ellipsis="full?null:2"></cl-text>
			</view>
		</view>
		<!-- <view class="row">
			<view class="col" v-for="listTypeScore in listTypeScores" :key="listTypeScore.name"
				:style="{width:listTypeScores.length<6?((100/listTypeScores.length)+'%'):(100/6+'%'),'text-align':'center'}">
				<cl-text :value="listTypeScore.label"></cl-text>
				<cl-text :value="listTypeScore.score+'分'"></cl-text>
			</view>
		</view> -->

	</view>
</template>

<script>
	export default {
		name: 'CardOne',
		props: {
			listTypeScores: {
				default: () => {
					return []
				}
			},
			reportDataValue: {
				default: () => {
					return {}
				}
			},
			id_one: {
				default: ''
			},
			full: {
				default: false
			}
		},
		options: {
			styleIsolation: 'shared'
		},
		methods: {
			isNumber(num){
				return !isNaN(+num)
			},
			goToAll() {
				uni.navigateTo({
					url: `/scale/test/cardFull?listTypeScores=${JSON.stringify(this.listTypeScores)}&id=${this.id_one}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/scale/test/comm.scss";
</style>
