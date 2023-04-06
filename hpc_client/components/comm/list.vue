<template>
	<!--这是一个公用的组件，使用方法例如pages/my/order-->
	<view class="order">
		<!-- 自定义导航 -->
		<!-- <cl-topbar :title="title" background-color="#FFFFFF" color="#282828" :border="false"></cl-topbar>-->
		<tobar :title="title" :back="back"></tobar>
		<cl-loading-mask :loading="!complate" text="拼命加载中" style="height:calc(100% - 82rpx)">

			<cl-tabs v-model="active" :gutter="90" :swipeable="true" un-color="#A7A7A7" color="#80A3FF"
				@tab-change="tabChange" :style="'height:'+(screenHeight-45)+'px;'">
				<cl-tab-pane v-for="(tabar, index) in tabars" :label="tabar" :refresher-enabled="false" :name="index"
					:key="index" @pull-refresh="pullRefresh" @loadmore="loadMore" style="heaght:calc(100% - 80rpx)">
					<cl-scroller :ref="`scroller-${index}`" @end="end" @up="onUp" @down="onDown"
						:refresher-enabled="true" @pull-refresh="pullRefresh" @loadmore="loadMore">
						<view class="course" v-for="(item2, contentIndex) in getContent(index)" :key="contentIndex"
							@click="ClickTabPane(tabar,index,item2)">
							<!-- 标题 -->
							<view class="title">
								<view class="detail">
									<image class="icon" :src="item2.icon" mode="aspectFill" v-if="item2.icon"></image>
									<cl-text :size="32" :value="item2.type" color="#282828" bold
										:margin="[0, 0, 0, 16]">
									</cl-text>
								</view>
								<view class="status">
									<cl-text :size="28" :value="item2.status" :color="item2.statusColor" bold
										:margin="[0, 30, 0, 0]"></cl-text>
								</view>
							</view>
							<!-- 详情 -->
							<view class="msg">
								<cl-text :size="28" v-for="(text,textIndex) in item2.texts" :key="textIndex"
									:value="`${text.title}：${text.text}`" color="#979797" bold block></cl-text>
							</view>
							<!-- 底部 -->
							<view class="footer" v-if="item2.footer">
								<cl-text :size="28" :value="`${item2.footer.title}：${item2.footer.text}`"
									color="#2E2E2E" bold block :margin="[36, 0, 0, 0]"
									v-if="item2.footer.title&&item2.footer.text">
								</cl-text>
								<view class="button-list">
									<cl-button type="primary" v-for="(butt,buttIndex) in item2.footer.buttons"
										:key="buttIndex" class="button-footer"
										@click="butt.url?footerButtonClick(butt.url):footerButtonClickFun(butt,item2)">
										{{butt.title}}
									</cl-button>
								</view>
							</view>
						</view>
						<view v-if="lists&&lists[active]&&lists[active].content&&lists[active].content.length===0" class="empty">
							<image src="../../static/images/kon.png" mode="widthFix" style="width: 40%;"></image>
							<cl-text value="暂无数据" size="25"></cl-text>
						</view>
						<view class="add" v-if="title==='成员列表'">
							<cl-button type="primary" class="add-button" @click="add">新增成员</cl-button>
						</view>
						<!-- <cl-loadmore v-if="list[index]&&list[index].content&&list[index].content.length>=10"
							:loading="list[index].loading" :finish="list[index].finished" :divider="false"
							:refresher-enabled="true">
						</cl-loadmore> -->
					</cl-scroller>

				</cl-tab-pane>
			</cl-tabs>
		</cl-loading-mask>


	</view>
</template>

<script>
	import Tobar from "@/pages/commVue/topbar.vue"
	export default {
		name: "List",
		components: {
			Tobar
		},
		props: {
			'title': '',
			'list': {},
			'tabars': {},
			'notComputeList': {
				default: false
			},
			'activeNow': {
				default: 0
			},
			'tabChangeComplete': {
				default: false
			},
			clickTab: {
				default: (tabar, index) => {},
				type: Function
			},
			complate: {
				default: false,
				type: Boolean
			}
		},
		watch: {

			list(newVal) {

				this.changeList()
			},
			tabChangeComplete(newVal) {

				if (newVal) {
					this.lists = []
					this.lists = this.list
				}
			},
			activeNow(newVal) {
				this.active = this.activeNow || 0

			}
		},
		created() {
			const info = uni.getSystemInfoSync()
			this.screenHeight = info.screenHeight
			this.changeList()
			this.active = this.activeNow || 0
		},
		data() {
			return {
				screenHeight: 0,
				active: 0,
				lists: [],
				init: true,
				
			};
		},
		methods: {
			
			end() {
				console.log('end')
			},
			onDown() {
				console.log('on down')
				this.changeList()
				console.log(this.$refs["scroller-" + this.active], 'this.$refs["scroller-"+this.active]')
				setTimeout(() => {
					this.$refs["scroller-" + this.active]?. [0]?.end()
				}, 1000)

			},
			onUp() {
				this.$emit('loadmore', this.active)
				if(this.lists[this.active].finished){
					uni.showToast({
						title:'没有更多数据了',
						icon:'none'
					})
				}
				console.log('on up')
			},
			back() {
				uni.switchTab({
					url: '/pages/index/my'
				})
			},
			ClickTabPane(tabar, index, item) {

				this.clickTab(tabar, index, item)
				this.init = false
			},
			add() {
				uni.navigateTo({
					url: '/scale/family/create'
				})
			},
			loadMore() {
				console.log('loadMore')
				this.$emit('loadmore', this.active)
			},
			//下拉刷新
			pullRefresh(done) {
				console.log(done, 'deone')
			},
			tabChange(active) {
				this.$emit('getActive', active)
				this.changeList()
				// this.lists = this.list
			},
			changeList() {

				if (!this.notComputeList) {
					// 有的组件自己排好了，不用去计算list的其他值
					const setInter = setInterval(() => {
						this.lists = [...this.list]

						if (this.lists?. [0]?.content?.length > 0 || this.complate) {

							clearInterval(setInter)
							this.tabars.map((tabar, index) => {
								if (index > 0) {
									this.list[0]?.content?.map(content => {
										if (content.status === tabar) {

											this.lists[index] = this.lists?. [index] || {}
											this.lists[index].title = content.status
											this.lists[index].content = this.lists?. [index]
												?.content || []
											this.lists[index].content.push(content)

										}
									})
								}
							})
							for (let key in this.lists) {
								let contentSet = new Set()
								if (this.lists[key]?.content) {
									this.lists[key].content = this.lists[key]?.content?.filter(content => {
										if (!contentSet.has(content.id)) {

											contentSet.add(content?.id)
											return content
										}

									})
								}

							}
						}
						console.log(this.lists, 'lists')
					}, 500)

				} else {
					this.lists = this.list
				}
				console.log(this.lists, 'lists')
			},
			footerButtonClickFun(butt, item2) {
				if (butt.clickFuc)
					this.$emit(butt.clickFuc, item2)
			},
			getContent(index) {
				return this.lists[index] ? this.lists[index].content : []
			},

			footerButtonClick(url) {
				uni.navigateTo({
					url,
				});
			}

		}
	};
</script>

<style scoped lang="scss">
	page {
		background: #f5f5f5;


	}


	.order {
		.empty {
			display: flex;
			flex-direction: column;
			width: 100%;
			justify-content: center;
			align-items: center;
			margin-top: 20rpx;
		}


		/deep/ .cl-loading-mask__wrap {
			height: calc(100% - 90rpx);
		}

		height: 100%;
		// overflow: hidden;
		// padding-bottom: 50rpx;

		/deep/ .cl-scroller__wrap {
			// padding-bottom: 120rpx;
		}

		/deep/ .cl-tabs__container {
			background-color: transparent !important;
			// overflow-y: scroll;
			height: calc(100% - 82rpx);
		}

		/deep/ .cl-tabs__bar-item.is-active {
			font-weight: bold;
		}

		/deep/ .cl-tabs {
			height: calc(100% - 80rpx);
		}

		.add {
			text-align: center;
			width: 100%;
			margin-top: 20rpx;
		}

		.course {
			margin-top: 26rpx;
			padding: 36rpx 30rpx;
			box-sizing: border-box;
			background: #ffffff;

			.title {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.detail {
					width: 70%;
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
				padding-bottom: 36rpx;
				border-bottom: 2rpx solid #f2f2f2;
			}

			.footer {
				display: flex;
				justify-content: space-between;

				.button-list {
					margin-top: 11px;
				}
			}
		}
	}
</style>
