<template>
	<view class="swiper" @touchstart="handleTouchstart" @touchend="handleTouchend">
		<view class="img" @click="imgClick">
			<img v-for="(swiper,index) in list" :key="index" :src="(swiper)?swiper.img:''"
				:style="{display:index===active?'block':'none'}" alt="" srcset="">
		</view>
		<view class="quan">
			<view class="white" v-for="(swiper,index) in list" :key="index" @click="active=index"
				:style="{width:index===active?'16rpx':'10rpx'}"></view>
		</view>
	</view>
</template>

<script>
	import {
		store
	} from '@/tsjsFiles/vuex/store'
	export default {
		props: {
			list: Array,
		},
		name: "CommSwiper",
		data() {
			return {

				active: 0,
				// 刚触碰的时间
				startTime: 0,
				// 刚触碰的位置
				startPosition: 0,
				// 结束的位置
				endPosition: 0,
				setInter: null
			}
		},
		created() {
			this.changeActive()
		},
		watch: {
			active(val) {

				this.$emit("input", val);
				this.$emit("change", val);
			}
		},
		methods: {
			imgClick() {
				if (this.list[this.active].url?.indexOf('http') > -1) {
					uni.navigateTo({
						url: '/article/webview?url=' + this.list[this.active].url
					})
				} else {
					if (this.list[this.active].url?.indexOf('index') > -1) {
						uni.switchTab({
							url: this.list[this.active].url
						})
					} else {
						uni.navigateTo({
							url: this.list[this.active].url
						})
					}
				}
			},
			changeActive() {
				try {

					this.setInter = setInterval(() => {
						this.active++

						if (this.active > this.list?.length - 1) {
							this.active = 0
						} else if (this.active < 0) {
							this.active = this.list?.length - 1
						}

					}, 3000)
				} catch {
					clearInterval(this.setInter)
					this.changeActive()
				}
			},
			/*用户按下屏幕
			    1.记录用户按下屏幕的时间  Date.now() 时间戳 返回 1970-1-1到现在的毫秒数
			    2.记录用户按下屏幕的坐标x和y
			  */
			handleTouchstart(e) {
				// 获取初始时间
				this.startTime = Date.now()
				// 获取初始的位置
				this.startPosition = e.changedTouches[0].clientX

			},
			handleTouchend(event) {
				const endTime = Date.now()
				if (endTime - this.startTime > 5000) {
					// 如果手指滑动的距离超过2s 就默认不合法
					return;
				}
				// 判断其滑动的距离是否值得触发，给定一个10 的距离
				if (Math.abs(this.endPosition - this.startPosition) > 10) {
					this.endPosition = event.changedTouches[0].clientX
					var elePosition = this.endPosition - this.startPosition > 0 ? "right" : "left"

					if (elePosition === 'right') {
						this.active--
						if (this.active < 0) {
							this.active = this.list.length - 1
						}
					} else {
						this.active++
						if (this.active > this.list.length - 1) {
							this.active = 0
						}
					}
				} else {
					return;
				}


			},
		}
	}
</script>

<style scoped lang="scss">
	.swiper {
		width: 100%;
		position: relative;
		height: 100%;

		.img {
			width: 100%;
			height: 100%;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.quan {
			position: absolute;
			bottom: 30rpx;
			width: 100%;
			height: 40rpx;
			left: 0;
			display: flex;
			justify-content: center;

			.white {
				width: 10rpx;
				height: 10rpx;
				border-radius: 6rpx;
				box-shadow: 0px 0px 2px #d6d6d6;
				background: #fff;
				margin: 10rpx;

			}
		}
	}
</style>
