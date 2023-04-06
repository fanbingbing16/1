<template>
	<view class="page-category" v-if="complate">
		<cl-toast ref="toast" position="middle"></cl-toast>
		<view class="bac">
			<!-- <cl-topbar title="测评" :background-color="'rgba(0,0,0,0)'" color="#FFFFFF" :border="false" :show-back="false">
			</cl-topbar> -->
			<!--搜索栏 -->

			<cl-card>
				<view class="content">
					<view class="header">
						<view class="header">
							<cl-text :value="people.type||(people.node?people.node.name:'')||people.name||value"
								:size="30">
							</cl-text>
							<image :src="getImage1" style="height:20px;width:20px;"></image>
						</view>
						<image mode="widthFix" :src="getImage2"></image>
					</view>
					<view class="header" style="margin-top:20rpx;">
						<cl-text :value="getAge" :size="26"></cl-text>
						<view class="button-list">
							<cl-button type="primary" plain v-if="value==='登录'" @click="refreshLogin">登录</cl-button>
							<cl-button type="primary" plain v-if="value==='修改'" @click="gotoFamily">修改</cl-button>
							<cl-button type="primary" plain v-if="value==='选择'" @click="gotoFamily">选择</cl-button>
							<cl-button type="primary" plain v-if="value==='修改'||value==='选择'" @click="gotoFamily(2)">新增
							</cl-button>
						</view>
					</view>
				</view>
			</cl-card>
		</view>
		<view class="search">
			<cl-search v-model="searchKeyword" placeholder="请输入关键词" @search="getLbsData"></cl-search>
		</view>
		<!-- <button-text v-if="forceRefresh"></button-text> -->
		<!-- 列表 -->
		<view class="content">
			<cl-tabs v-model="active" :labels="list" :border="false" :gutter="40" color="#5E8AFF" un-color="#747474"
				:swipeable="true" :sticky="true" stickyTop="0px;" :scrollView="false">
				<!-- <cl-tab-pane> -->
				<template>
					<cl-loading-mask :loading="loading" text="拼命加载中">
						<scroll-view @scrolltolower="scrolltolower">
							<LbList :listData="courseList[active]"></LbList>
						</scroll-view>
					</cl-loading-mask>
				</template>
				<!-- </cl-tab-pane> -->
			</cl-tabs>
			<!-- 				<view class="list">
					<view v-if="courseList[active]">
						<view class="subject" v-for="(item, index) in courseList[active].content" :key="index"
							@click="gotoTest(item)">
							<view class="detail">
								<cl-text :size="32"
									:value="(item.node&&item.node.introductionJson)?item.node.introductionJson.title:''"
									color="#303030" bold :ellipsis="2">
								</cl-text>

								<cl-text :size="28" :value="(item.node)?item.node.name:''" color="rgb(132 132 132)"
									:margin="[8, 0, 0, 0]">
								</cl-text>
								<view class="price" v-if="item.product">
									<view class="one">
										<cl-text :size="40" color="#ff724e"
											:type="item.product.price===0?'text':'price'"
											:value="item.product.price===0?'免费':item.product.price">
										</cl-text>
										<cl-text color="#44444496" :value="item.product?item.product.showPrice:0"
											type="price" :line-through="true">
										</cl-text>
									</view>

									<cl-text :size="20"
										:value="(item.node&&item.node.suitmonthage)?item.node.suitmonthage:''"
										color="#44444496" bold block :margin="[8, 0, 0, 0]">
									</cl-text>
								</view>
							</view>
							<image class="picture" :src="getUrl(item)" mode="aspectFill"></image>
						</view>
					</view>
				</view>
	 -->
		</view>

	</view>
	<category-skeleton v-else></category-skeleton>
</template>

<script>
	import ButtonText from "@/pages/commVue/buttonText.vue"
	import {
		baseSev
	} from "@/components/comm/base";
	import {
		request
	} from "@/components/comm/request";
	import {
		store
	} from "@/tsjsFiles/vuex/store";
	import CommSwiper from "@/pages/commVue/swiper.vue"
	import LbList from "@/pages/commVue/lbList.vue"
	import {
		calculateAge
	} from "@/components/comm/utils/yuan";
	import {
		refreshLogin
	} from "@/components/comm/request"
	import {
		sdkTool
	} from "@/tsjsFiles/sdk/sdkTool"
	import CategorySkeleton from "@/pages/index/categorySkeleton.vue"
	import {
		ItemKind
	} from "../../components/comm/allCfg";
	export default {
		components: {
			ButtonText,
			CommSwiper,
			LbList,
			CategorySkeleton
		},
		onShow() {

			this.changeButtonText()
			//刷新子组件的状态
			this.forceRefresh = false;
			this.$nextTick(() => {
				this.forceRefresh = true;
			})

		},
		created() {

			this.getLbsData(true)
			// this.changeButtonText()

		},
		computed: {
			getTop() {
				return uni.getSystemInfoSync().statusBarHeight + 'px;'
			},
			getAge() {

				return calculateAge({
					startDate: (this.people.birthday || (this.people.node ? this.people.node.birthday : '')),
					onlyYear: true
				})
			},
			getImage1() {
				const gender = this.people.status ? this.people.status : (this.people.node?.gender === '0' ? '女' : '男')
				return '../../static/images/category/' + (gender === '女' ? 'girl-icon' : 'borl-icon') + '.png'
			},
			getImage2() {
				const gender = this.people.status ? this.people.status : (this.people.node?.gender === '0' ? '女' : '男')
				return '../../static/images/category/' + (gender === '女' ? 'girl' : 'borl') + '.png'
			},
		},
		methods: {

			gotoFamily(num) {

				if (num === 2) {
					uni.navigateTo({
						url: '/scale/family/create'
					})
				} else {
					uni.navigateTo({
						url: '/scale/family/family'
					})
				}

			},
			changeButtonText() {
				uni.getStorage({
					key: 'user',
					success: (data) => {
						if (!data.data.token) {
							this.value = '登录'
						} else {
							this.getPeople().then(() => {
								if (this.people?.id)
									this.value = '修改'
								else {
									this.value = '选择'
								}
							}).catch(err => {
								this.value = '选择'
							})
						}
					},
					fail: (err) => {

						this.value = '登录'
					}
				})
			},

			async getPeople() {
				this.people = await this.global.getPeople()
			},
			getLbsData(isOne = false) {
				this.active = 0
				request({
					url: '/lbs',
					data: {
						status_eq: 1,
						offset: 0,
						limit: 100000,
						title_contains: this.searchKeyword,
					},

					notHeader: true
				}).then(resolve => {

					this.list = [{
						name: 0,
						label: '全部',
						weight: 99999
					}]
					// this.courseList[0] = {
					// 	title: '全部',
					// 	content: []
					// }
					//使用一个临时变量，触发更新
					this.courseListAll = []
					const suitcrowd = {}
					this.courseListAll[0] = {
						title: '全部',
						content: []
					}
					resolve.data?.edges.map((lbs, index) => {
						console.log(lbs, index, 'lbs index')
						lbs?.node?.category?.map((category, categoryIndex) => {
							if (!suitcrowd[category?.name]) {
								this.list.push({
									name: index + 1,
									label: category?.name,
									weight: category.weight
								})
								suitcrowd[category?.name] = index + 1
							}
						})


						store.getLbProduct({
							lbid: lbs.node.id,
							kind: ItemKind.lbOne
						}).then(result => {
							this.loading = false
							// this.courseList[0].content.push({
							// 	...lbs,
							// 	product: result?. [0]?.node
							// })
							this.courseListAll[0].content.push({
								...lbs,
								product: result?. [0]?.node
							})
							console.log(this.courseListAll[0].content, ',this.courseListAll[0]',
								this.courseListAll[0].content[0], isOne)
							this.courseListAll[suitcrowd[lbs.node.category?. [0]?.name || '']] =
								this.courseListAll[
									suitcrowd[lbs.node.category?. [0]?.name || '']] || {
									title: lbs.node.category?. [0]?.name || '',
									content: []
								}
							// this.courseList[suitcrowd[lbs.node.category?. [0]?.name || '']] = this
							// 	.courseList[
							// 		suitcrowd[lbs.node.category?. [0]?.name || '']] || {
							// 		title: lbs.node.category?. [0]?.name || '',
							// 		content: []
							// 	}
							this.courseListAll[suitcrowd[lbs.node.category?. [0]?.name || '']]
								.content
								.push({
									...lbs,
									product: result?. [0]?.node
								})
							// this.courseList[suitcrowd[lbs.node.category?. [0]?.name || '']].content
							// 	.push({
							// 		...lbs,
							// 		product: result?. [0]?.node
							// 	})
							if (isOne === true) {
								this.courseListAll[0].content = this.courseListAll[0].content.sort(
									(a,
										b) => a.product?.price - b.product?.price)
							}
							this.courseList = this.courseListAll
							console.log(this.courseList, 'courseList')
							if (this.courseList[0].content.length === resolve.data.edges.length) {
								this.complate = true
							}
						})
					})

					this.list = this.list.sort((a, b) => {
						return b.weight - a.weight
					})

				}).catch(err => {
					this.complate = true
					this.loading = false
					this.$refs['toast']?.open({
						message: err.data?.message
					})
				})
			},
			gotoTest(item) {
				uni.navigateTo({
					url: '/scale/test/introduce?id=' +
						item.node.id,
					fail: (resultNavigate) => {

					}
				})
			},
			getUrl(item) {
				return item?.node?.introductionJson?.icon || ''
			}
		},
		data() {
			return {
				complate: false,
				refreshLogin,
				searchKeyword: '',
				forceRefresh: false,
				people: {},
				baseSev,
				url: '',
				value: '登录',
				loading: true,
				list: [],
				selectIndex: 0,

				active: 0,
				courseListAll: [],
				courseList: [],
				categoryList: []
			};
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background: #f5f5f5;
	}

	.page-category {
		/deep/ .cl-tabs__container {
			background: #f5f5f5;
		}

		background:#f5f5f5;

		/deep/ .cl-search {
			background-color: transparent;
			padding: 14rpx 40rpx;
		}


		.bac {
			overflow: hidden;
			padding-bottom: 8px;
			background: linear-gradient(180deg, #618cfc 0%, #f5f5f5 100%);
		}

		.card {
			width: 80%;
			margin: auto;
			box-shadow: 0px 0px 7px #d9d7d7;
			margin-bottom: 4px;
			padding: 10px;
		}

		.banner {
			width: 90%;
			margin: auto;
			height: 348rpx;
		}

		// .list {
		// 	display: flex;
		// 	// flex-direction: column;

		.content {
			padding-bottom: 80rpx;
			background: #f5f5f5;

		}

		/deep/ .cl-card__header {
			display: none;
		}

		/deep/ .cl-card {
			background-color: #fff;
			border-radius: 8px;
			width: calc(100% - 80rpx);
			margin: 40rpx;
			margin-top: 20rpx;
			box-sizing: border-box;
			margin-bottom: 20px;

			.cl-card__container {
				padding-left: 40rpx;
				padding-right: 40rpx;
			}

			.content {
				background-color: #fff;
				padding-bottom: 0;

				.header {
					display: flex;
					justify-content: space-between;
					align-items: center;

					image {
						width: 15%;
						border-radius: 100%;
					}

					.button-list .cl-button:after {
						border-width: 0 !important;
						border-color: #fff;
					}
				}

				.bo-bottom {
					border-bottom: 0.5px solid #f7f7f7;
				}
			}

		}

		// 		.picture {
		// 			max-width: 140rpx;
		// 			height: 140rpx;
		// 			border-radius: 12rpx;
		// 		}

		// 		.detail {
		// 			margin-left: 16rpx;
		// 			width: 100%;
		// 			margin-right: 20rpx;
		// 			// position: relative;

		// 			.price {
		// 				// position: absolute;
		// 				// bottom: 11px;
		// 				margin-top: 20rpx;
		// 				display: flex;
		// 				width: 100%;
		// 				justify-content: space-between;
		// 			}
		// 		}
		// 	}
		// }

		.list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			padding-bottom: 80rpx;

			.classify {
				margin-top: 40rpx;
				padding: 32rpx 40rpx;
				box-sizing: border-box;
				width: 326rpx;
				height: 326rpx;
				background: #ffffff;
				box-shadow: 0rpx 16rpx 40rpx rgba(0, 0, 0, 0.03);
				border-radius: 32rpx;

				.icon {
					width: 84rpx;
					height: 84rpx;
				}

				.btn {
					margin-top: 20rpx;
					width: 140rpx;
					height: 50rpx;
					font-size: 24rpx;
					text-align: center;
					line-height: 50rpx;
					color: #3d3d3d;
					background: #f1f2f5;
					border-radius: 25rpx;
				}
			}
		}
	}
</style>
