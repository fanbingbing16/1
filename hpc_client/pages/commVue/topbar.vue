<template>

	<view class="back" @click="backMy(1)" :style="{'padding-top':top}">
		<view class="title">
			<cl-icon name="cl-icon-arrow-left" :size="40" style="margin-left: 20rpx;position: absolute;"></cl-icon>
			<view style="text-align: center;width: 100%;">
				<cl-text :value="typeTitle()" :size="30"></cl-text>
			</view>
			<view class="right">
				<slot></slot>
			</view>

		</view>
	</view>
</template>

<script>
	import backPage from '@/components/comm/backPage'
	const {
		osName,
		statusBarHeight
	} = uni.getSystemInfoSync()
	export default {
		props: {
			title: '',
			back: {
				default: (code) => {
					if (code === 1)
						backPage()
				},
				type: Function
			}
		},
		name: 'Tobar',
		created() {},
		computed: {
			top() {
				return osName === "android" ? `${statusBarHeight}px` : "env(safe-area-inset-top)";
			},
		},
		data() {
			return {
				init: true
			}
		},
		methods: {
			typeTitle(){
				return typeof this.title==='string'?this.title:''
			},
			backMy(code) {
				this.back(code)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.back {


		.title {
			height: 44px;
			display: flex;
			align-items: center;
			position: relative;

			.right {
				right: 0;
				position: absolute;
			}
		}
	}
</style>
