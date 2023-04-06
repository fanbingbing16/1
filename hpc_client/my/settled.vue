<template>
	<view class="page-settle">
		<cl-topbar title="阅读协议"></cl-topbar>
		<view class="content">
			<cl-text value="专家入驻须知" :size="46" bold class="center"></cl-text>
			<cl-text class="text"
				:value="appName+'自上线以来，一直致力于为广大来访者和心理咨询师打造中国最有价值的心理咨询服务平台。让每一个人都能享受到及时、专业的心理咨询服务，共同营造一个和谐、健康心理世界。'">
			</cl-text>
			<view class="two-title">
				<view class="line">
				</view>
				<cl-text value="专家入驻执行标准" :size="36" bold></cl-text>
				<view class="line">
				</view>
			</view>
			<cl-text value="1、拥有执业所在地法律要求的执业资格：" class="three-title" bold></cl-text>
			<cl-text class="text" value="（1）在中国大陆执业的服务专家：需持有国家二级心理咨询师、国家三级心理咨询师资质、心理治疗师、婚姻家庭咨询师等从业资格；"></cl-text>
			<cl-text class="text" value="（2）在港澳台地区及海外执业的专家：需持有当地法律认可的执业资格。"></cl-text>
			<cl-text value="2、专家入驻需要提供的资料：" class="three-title" bold></cl-text>
			<cl-text class="text" value="（1）执业所在地法律要求的执业资格证(必须)"></cl-text>
			<cl-text class="text" value="（2）身份证明/正反面（必须）"></cl-text>
			<cl-text class="text" value="（3）手持身份证照（必须）"></cl-text>
			<cl-text class="text" value="（4）一些必须的证明（必须）"></cl-text>
			<cl-text class="text"
				value="专家本人必须承诺提供给本平台的资料真实、准确、有效、合法。若有违反，由此引发一切后果，将由专家本人独立承担。在通过本平台审核后，才可以以专家身份在平台提供符合规定的服务。"></cl-text>
			<view class="two-title">
				<view class="line">
				</view>
				<cl-text value="接受入驻协议与管理制度" :size="36" bold></cl-text>
				<view class="line">
				</view>
			</view>
			<view>
				<cl-text class="text" value="（1）申请入驻的咨询师需要同意并接受"></cl-text>
				<cl-text class="text" value="《平台专家入驻协议》。" color="rgb(55 160 250)" @click="goToPage('/my/settle/agreement')"></cl-text>
			</view>
			<view style="margin-bottom:calc(20rpx + env(safe-area-inset-bottom)) ;">
				<cl-text class="text" :value="'（2）为更好保障平台咨询服务的质量，维护平台咨询师团队的健康发展，入驻'+appName+'的咨询师还需要同意并接受'"></cl-text>
				<cl-text class="text" value="《咨询师违规条例》。" color="rgb(55 160 250)" @click="goToPage('/my/settle/violations')"></cl-text>
			</view>

		</view>
		<cl-button @click="settle" class="full footer" type="primary">我已阅读，申请入驻</cl-button>
	</view>

</template>

<script>
	import {
		allCfg
	} from '@/components/comm/allCfg'

	export default {
		methods: {
			goToPage(url){
				uni.navigateTo({
					url
				})
			},
			settle() {
				uni.navigateTo({
					url: '/my/settle/inputMessage'
				})
			}
		},
		data() {
			return {
				appName: allCfg.const.appName
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/my/article.scss";
	.page-settle {
		
	}
</style>
