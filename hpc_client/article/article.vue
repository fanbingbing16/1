<template>
	<view class="article">
		<cl-loading-mask :loading="loading" text="加载中">
			<cl-topbar :title="appName||'文章'" :border="false"></cl-topbar>

			<view class="content">
				<!-- <u-parse-comm :content="content"></u-parse-comm> -->
				<!-- #ifdef APP-PLUS||H5 -->
				<web-view :src="aurl" style="margin-top: 88rpx;overflow-x: hidden;"></web-view>
				<!-- #endif -->
				<!-- #ifndef APP-PLUS||H5 -->
				<web-view :src="aurl"></web-view>
				<!-- #endif -->
			</view>
		</cl-loading-mask>
	</view>

</template>

<script>
	import {
		store
	} from '@/tsjsFiles/vuex/store'
	import {
		request
	} from "@/components/comm/request"
	import UParseComm from "@/pages/commVue/uParseComm.vue"
	import {
		allCfg
	} from '@/components/comm/allCfg'
	import {
		baseSev
	} from '@/components/comm/base'
	export default {
		onLoad: function(option) {
			this.option = option
			// request({
			// 	url: '/article/findOne/' + option.id,

			// 	notHeader: true
			// }).then(res => {
			// 
			this.aurl = baseSev.domain + '/article/' + option.id
			// #ifdef APP-PLUS||H5 
			this.$nextTick(() => {
				this.loading = false
			})
			// #endif
			
			// 	this.article = res.data
			// 	this.content = this.article?.content
			// })
		},
		created() {
			this.appName = allCfg.const.appName
		},
		
		components: {

			UParseComm
		},
		data() {
			return {
				show:false,
				loading: true,
				option: {},
				article: {},
				content: '',
				appName: '',
				aurl: ""
			}
		},
		methods: {},
		onShareAppMessage() {
			return {
				path: '/article/article?id=' + this.option.id,
				imageUrl: ""
			}
		}
	}
</script>

<style lang="scss" scoped>
	.article {
		height: 100%;

		.content {
			width: 100%;
			height: 100%;
			// padding: 20rpx;
		}

	}
</style>
