<template>
	<view class="page-index" v-if="complateArticle&&complateTogether">
		<!-- 心灵导航 大家都在测  大家都在看 -->
		<view class="header">
			<!-- 自定义导航 -->
			<!-- <cl-topbar title="首页" background-color="rgba(0,0,0,0)" color="#FFFFFF" :border="false" :show-back="false">
			</cl-topbar> -->
			<!-- 搜索栏 -->
			<!-- <view class="search">
				<cl-search
					v-model="keyword"
					placeholder="请输入关键词"
					@search="onSearch"
				></cl-search>
			</view> -->

			<!-- 轮播图 -->
			<view class="banner">
				<comm-swiper v-model="selectIndex" :list="swiperList" height="348rpx" radius="0rpx" indicator-dots
					autoplay>
				</comm-swiper>
			</view>
		</view>
		<!-- 按钮 -->
		<!-- <view class="button-list">
			<cl-button type="primary" v-for="(item, index) in buttonList" :key="index" @click="buttonClick(item)">
				{{item.title}}
			</cl-button>

		</view> -->
		<!-- <view class="page-category">
			<view class="header-title" :style="{'margin-top': '30rpx'}">
				<view class="shu"></view>
				<cl-text value="心灵导航" :size="30" bold></cl-text>
			</view>
			<view class="list">
				<view class="classify" v-for="(item, index) in categoryList" :key="index" @click="buttonClick(item)">
					<image class="icon" :src="item.icon" mode="aspectFill"></image>
					<cl-text :size="28" :value="item.name" color="#3D3D3D" block></cl-text>
				</view>
			</view>
		</view> -->
		<view class="page-category">
			<view class="header-title" :style="{'margin-top': '40rpx','margin-bottom':'20rpx'}">
				<view class="shu"></view>
				<cl-text value="大家都在测" :size="30" bold></cl-text>
			</view>
			<view class="list">
				<view class="one" v-for="(item, index) in togetherTest" :key="index" @click="goToIntroduce(item)">
					<view class="one-image">
						<image class="icon"
							:src="(item&&item.introductionJson)?(item.introductionJson.banner||item.introductionJson.icon):''"
							mode="aspectFill"></image>
					</view>
					<view class="one-text">
						<cl-text class="text name" bold :size="24" :value="item.name" color="#3D3D3D"
							block :ellipsis="1">
						</cl-text>
						<cl-text class="text" :size="24" :value="item.testQty+' 人测过'" color="rgb(132 132 132)" block
							:ellipsis="1">
						</cl-text>
						<!-- <cl-button class="price"  @click="goToIntroduce(item)">￥{{item.price}}</cl-button> -->
						<cl-button class="price"  @click="goToIntroduce(item)">分享免费</cl-button>
					</view>


				</view>

			</view>
		</view>
		<view class="header-title" :style="{'margin-bottom': '40rpx'}">
			<view class="shu"></view>
			<cl-text value="大家都在看" :size="30" bold></cl-text>
		</view>
		<!-- 列表 -->
		<view class="content" v-if="acticleShow">
			<cl-tabs v-model="active" :labels="list" :border="false" :gutter="30" color="#5E8AFF" un-color="#747474"
				:swipeable="true" @tab-change="toChange" :sticky="true" stickyTop="0px;">
				<view class="list">
					<view v-if="courseList[active]">
						<view class="subject" v-for="(item, index) in courseList[active].content" :key="index"
							@click="clickArticle(item)">
							<view class="detail">
								<cl-text :size="28" :value="item.name||''" color="#303030" :ellipsis="2"></cl-text>
								<cl-text :size="24" :value="item.subTitle||''" color="rgb(132 132 132)"
									:margin="[8, 0, 0, 0]">
								</cl-text>
								<view>
									<cl-text :size="24" :value="'阅读'+item.look+'次'" color="#C5C5C5"
										:margin="[8, 0, 0, 0]">
									</cl-text>
									<!-- <cl-icon name="cl-icon-like" style="margin-left: 20rpx;margin-top: 4rpx;"></cl-icon> -->
								</view>

							</view>
							<image class="picture" :src="item.picture" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</cl-tabs>
		</view>
	</view>
	<index-skeleton v-else></index-skeleton>
</template>

<script>
	import {
		request
	} from '@/components/comm/request';
	
	import {
		store
	} from '@/tsjsFiles/vuex/store';
	import CommSwiper from "@/pages/commVue/swiper.vue"
	import {
		allCfg,
		ItemKind
	} from '@/components/comm/allCfg';
import { sdkTool } from '@/tsjsFiles/sdk/sdkTool';
import IndexSkeleton from "@/pages/index/indexSkeleton.vue" 
	export default {
		components: {
			
			CommSwiper,
			IndexSkeleton
		},
		onShareAppMessage() {
			return {
				title: allCfg.const.appName,
				path: '/pages/index/index',
				imageUrl: ""
			}
		},
		created() {
			this.getArticleData()
			this.findTogetherTest()
			
			sdkTool.staggingUserRecord()
			store.getSettings({
				key: 'swiperIndex'
			}).then((resultSettings) => {
				this.swiperList = resultSettings[0]?.node?.data
			})
			store.getSettings({
				key: 'articleShow'
			}).then((resultArticle) => {

				this.acticleShow = resultArticle?. [0]?.node?.data.show
				if (this.acticleShow) {
					this.categoryList = [{
							icon: require('@/static/icon/category/test.png'),
							name: "心理测评",
							tip: "父母必修亲子课",
							url: "/pages/index/category"
						},
						{
							icon: require('@/static/icon/category/education.png'),
							name: "亲子教育",
							tip: "父母必修亲子课",
						},
						{
							icon: require('@/static/icon/category/work.png'),
							name: "职场提升",
							tip: "吃出健康免疫力",
						},
						{
							icon: require('@/static/icon/category/feeling.png'),
							name: "两性情感",
							tip: "吃出健康免疫力",
						},
						{
							icon: require('@/static/icon/category/health.png'),
							name: "健康养生",
							tip: "吃出健康免疫力",
						},
					]
				}
			})
		},
		data() {
			return {
				complateTogether:false,
				complateArticle:false,
				togetherTest: [],
				acticleShow: false,
				buttonList: [{
					title: '心理测评',
					color: '',
					url: '/index/category',
				}],
				selectIndex: 0,

				swiperList: [],
				courseList: [],
				keyword: "",
				active: 0,
				list: [],
				categoryList: [{
						icon: require('@/static/icon/category/test.png'),
						name: "心理测评",
						tip: "父母必修亲子课",
						url: "/pages/index/category"
					},

				]

			};
		},
		methods: {
			goToIntroduce(item) {
				uni.navigateTo({
					url: '/scale/test/introduce?id=' + item.itemId
				})
			},
			findTogetherTest() {
				request({
					url: '/lbs/findTogetherTest',
					notHeader: true
				}).then(resultTest => {

					resultTest.data.map(result => {
						store.getLbProduct({
							kind: ItemKind.lbEver,
							lbid: result.id
						}).then(product => {
							this.togetherTest.push({
								...product?. [0]?.node,
								...result
							})
							if(this.togetherTest.length===resultTest.data?.length){
								this.complateTogether = true
							}
						})
					})

				}).catch(err=>{
					this.complateTogether = true
				})
			},
			getArticleData() {
				request({
					url: '/article',
					data: {
						offset: 0,
						limit: 1000,
						status_eq: 1
					},
					notHeader: true,
				}).then((resolve) => {

					let articleType = {}
					this.list = []
					resolve?.data?.edges?.map(article => {
						article?.node?.category?.map(category => {
							if (typeof articleType[category.name] !== 'number') {
								articleType[category.name] = Object.values(articleType)
									?.length
								this.list.push({
									label: category.name,
									name: this.list.length,
									weight: category.weight
								})

							}
							if (!this.courseList[articleType[category.name]]) {
								this.courseList[articleType[category.name]] = {
									title: category.name,
									content: []
								}
							}
							this.courseList[articleType[category.name]]?.content?.push({
								name: article?.node?.title,
								tip: article?.node?.author,
								picture: article?.node?.icon,
								content: article?.node?.content,
								id: article?.node?.id,
								subTitle: article?.node?.subTitle,
								look: article?.node?.look,
								zan: article?.node?.zan
							})
						})
					})
					this.list = this.list.sort((a, b) => {
						return b.weight - a.weight
					})
					this.complateArticle = true
					// this.courseList[0].content.push({
					// 	content: '<!DOCTYPE><a href="/#/family/family">111</a></!DOCTYPE>'
					// })
				}).catch(err=>{
					this.complateArticle = true
				})
			},
			clickArticle(article) {
				uni.navigateTo({
					url: '/article/article?id=' + article?.id
				})
			},
			navigate(e) {
				console.log(e)
			},
			toChange() {
				console.log(this.active);
			},
			onSearch() {
				console.log(this.keyword, 'key')
			},
			buttonClick(item) {

				// 跳转进行不同处理
				if (item.url?.indexOf('index') > -1) {
					uni.switchTab({
						url: item.url
					})
				} else {
					uni.navigateTo({
						url: item.url
					})
				}

			},
		},
	};
</script>

<style scoped lang="scss">
	page {
		background: #f5f5f5;
	}

	/deep/ .cl-search {
		background-color: rgba(0, 0, 0, 0);
	}

	/deep/ .cl-button.cl-button--primary {
		border-radius: 32rpx;
		background: linear-gradient(90deg, #8ebbff 0%, #618cfc 100%);
	}

	/deep/ .cl-search__input .cl-button {
		right: 12rpx;
		top: 8rpx;
		height: 64rpx;
	}

	/deep/ .cl-input {
		height: 80rpx;
	}

	/deep/ .cl-tabs__bar-item.is-active {
		// font-size: 32rpx;
		font-weight: 600;
	}

	// /deep/ .cl-tabs__bar-item {
	// 	padding: 0px 15rpx !important;
	// }
	// /deep/ .cl-tabs.is-border .cl-tabs__header {
	// 	border-bottom: none;
	// }
	.page-index {
		.header {
			padding-bottom: 16rpx;
			background: linear-gradient(180deg, #618cfc 0%, #f5f5f5 100%);

			.banner {
				// margin: 0 auto;
				// margin-top: 25rpx;
				// width: 90%;
				height: 426rpx;
			}
		}

		.button-list {
			padding-left: 16px;
		}

		.content {
			margin-top: 15rpx;
			background: #ffffff;
			// #ifdef H5
			padding-bottom: 80rpx;
			// #endif
			margin-left: 40rpx;
			margin-right: 40rpx;
			border-radius: 32rpx;

			/deep/ .cl-tabs__bar {
				border-radius: 28rpx;
			}

			.title {
				height: 78rpx;
			}

			.list {
				display: flex;
				flex-direction: column;

				.subject {
					margin: 0 auto;
					display: flex;
					justify-content: space-between;
					// align-items: center;
					// height: 252rpx;
					padding-bottom: 20rpx;
					padding-top: 20rpx;
					width: 100%;
					border-bottom: 1px solid #f5f5f5;

					.picture {
						max-width: 150rpx;
						height: 150rpx;
						border-radius: 12rpx;
						margin-right: 20rpx;
					}

					.detail {
						margin-left: 15rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
					}
				}
			}
		}
	}

	.header-title {
		display: flex;
		justify-content: flex-start;
		margin-left: 48rpx;


		// margin-bottom: 20rpx;
		.shu {
			width: 8rpx;
			height: 28rpx;
			background: linear-gradient(45deg, #618cfc, #618cfcbf);
			margin-right: 16rpx;
			margin-top: 8rpx;
			border-radius: 8rpx;
		}
	}

	.page-category {


		.list::-webkit-scrollbar {
			width: 0px
		}

		.list {
			/*隐藏滚动条，当IE下溢出，仍然可以滚动*/
			-ms-overflow-style: none;
			/*火狐下隐藏滚动条*/
			scrollbar-width: none;
			display: flex;
			// flex-wrap: wrap;
			// justify-content: space-around;
			padding: 20rpx;
			overflow-x: auto;

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

			.one {
				min-width: 212rpx;
				margin: 20rpx;
				height: 356rpx;
				background: #ffffff;
				box-shadow: 0rpx 4rpx 14rpx rgb(229, 229, 229);
				border-radius: 28rpx;
				text-align: center;
				padding: 20rpx 24rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-bottom: 0;

				.one-image {
					width: 100%;
					height: 100%;
					margin-top: -40rpx;

					.icon {
						width: 100%;
						height: 100%;
						border-radius: 20rpx;
						box-shadow: 0px 4px 8px #cdcdcd;
					}
				}

				.one-text {
					width: 100%;
					align-self: flex-start;
					// text-align: start;
					// margin-top: 8rpx;

					.text {
						margin-top: 16rpx;

						/deep/ .cl-text {
							margin-top: 16rpx;
						}
					}
					.name{
						/deep/ .cl-text {
							margin-top: 20rpx;
						}
					}

					.price {
						// #ifndef MP-WEIXIN
						background-color: #e02020;
						color: #fff;
						border-radius: 50px;
						// font-size: 16px;
						margin-top: 16rpx;
						box-shadow: 0px 1.1px 7px #e57272ad;
						height: 50rpx;


						//#endif
						/deep/ .cl-button {
							display: block;
							background-color: #e02020;
							color: #fff;
							border-radius: 50px !important;
							// font-size: 16px;
							margin-top: 16rpx;
							box-shadow: 0px 1.1px 7px #e57272ad;
							height: 48rpx;
							padding: 0 26rpx;
						}

						/deep/ .cl-button::after {
							width: 0;
							height: 0;
							content: '';
						}

						/deep/ .cl-button__text {
							color: #fff;
							// #ifdef MP-WEIXIN
							line-height: 34rpx;
							//#endif

						}
					}

					.price::after {
						width: 0;
						height: 0;
					}
				}

			}

			.classify {
				// margin-top: 40rpx;
				padding: 32rpx 40rpx;
				// box-sizing: border-box;
				// width: 326rpx;
				min-width: 116rpx;
				margin: 20rpx;
				height: 120rpx;
				background: #ffffff;
				box-shadow: 0rpx 16rpx 40rpx rgba(0, 0, 0, 0.03);
				border-radius: 28rpx;
				text-align: center;
				margin-bottom: 0;

			}
		}
	}
</style>
