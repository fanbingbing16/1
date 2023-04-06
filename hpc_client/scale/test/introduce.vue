<template>
	<view class="introduce" v-if="complate">
		<cl-toast ref="toast"></cl-toast>
		<cl-dialog :visible.sync="visible" show-close-btn width="90%" v-if="visible" :close-on-click-modal="false">
			<family :isOneLine="true" @selectChange="selectChange" :parentTitle="'请选择家庭成员'" @nonePeople="nonePeople"
				v-if="visible"></family>
		</cl-dialog>
		<cl-dialog :visible.sync="visibleCreate" show-close-btn width="90%" v-if="visibleCreate"
			:close-on-click-modal="false">
			<create @addComplate="addComplate" :noBack="true" v-if="visibleCreate"></create>
		</cl-dialog>
		<view class="back">
			<!-- 自定义导航 -->
			<cl-topbar :title="scaleData.name||''" :border="false">
			</cl-topbar>
		</view>
		<view class="scoll">
			<view class="banner">
				<image :src="(swiperList&&swiperList[0])?swiperList[0].url:''" mode="widthFix" alt="" srcset="">
			</view>
			<view class="card-introduce">
				<!-- <button-text @peopleData="getPeopleData" v-if="forceRefresh"></button-text> -->
				<cl-card :label="intrpductionJson?intrpductionJson.title:''" :show-more="false">
					<view class="content">
						<view class="one">
							<cl-text :value="intrpductionJson?intrpductionJson.title:''" :size="32"></cl-text>
							<view class="price" v-if="testTimes===0">
								<cl-text :size="30" color="red" :type="kind1Product.price===0?'text':'price'"
									:value="kind1Product.price===0?'免费':kind1Product.price"></cl-text>
								<cl-text :value="kind1Product.showPrice" type="price" :line-through="true"></cl-text>
							</view>

							<view v-else-if="testTimes===Infinity||!testTimes">
								<cl-text :size="26" value="还可无限次使用"></cl-text>
							</view>
							<view v-else>
								<cl-text :size="26" :value="'还可'+testTimes+'次使用'"></cl-text>
							</view>
							<!-- <cl-text :value="intrpductionJson?intrpductionJson.title2:''"></cl-text> -->
							<!-- <view class="family" @click="visible=true">
							<view v-if="(people&&people.node)?people.node.id:people.id">
								<text style="margin-right: 10rpx;">
									{{(people&&people.node)?people.node.name:(people.type||people.name)}}
								</text>
								<text>
							<text style="margin-left: 10rpx;">[修改]</text>
							</view>
							<cl-text v-else value="选家庭成员"></cl-text>
						</view> -->

						</view>
						<view class="one">
							<view class="one-item">
								<!-- <span class="anticon anticon-read">
									<svg style="color: rgb(169 169 169);" viewBox="64 64 896 896" focusable="false"
										fill="currentColor" width="1em" height="1em" data-icon="read"
										aria-hidden="true">
										<path
											d="M928 161H699.2c-49.1 0-97.1 14.1-138.4 40.7L512 233l-48.8-31.3A255.2 255.2 0 00324.8 161H96c-17.7 0-32 14.3-32 32v568c0 17.7 14.3 32 32 32h228.8c49.1 0 97.1 14.1 138.4 40.7l44.4 28.6c1.3.8 2.8 1.3 4.3 1.3s3-.4 4.3-1.3l44.4-28.6C602 807.1 650.1 793 699.2 793H928c17.7 0 32-14.3 32-32V193c0-17.7-14.3-32-32-32zM324.8 721H136V233h188.8c35.4 0 69.8 10.1 99.5 29.2l48.8 31.3 6.9 4.5v462c-47.6-25.6-100.8-39-155.2-39zm563.2 0H699.2c-54.4 0-107.6 13.4-155.2 39V298l6.9-4.5 48.8-31.3c29.7-19.1 64.1-29.2 99.5-29.2H888v488zM396.9 361H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm223.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c0-4.1-3.2-7.5-7.1-7.5H627.1c-3.9 0-7.1 3.4-7.1 7.5zM396.9 501H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm416 0H627.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5z">
										</path>
									</svg>
								</span> -->
								<image class="icon" src="../../static/images/introduce/firles.png"></image>

								<cl-text v-if="resultUserItem&&resultUserItem.data&&resultUserItem.data.testQty"
									:value="'已测:'+resultUserItem.data.testQty+'人'" color="rgb(169 169 169)">
								</cl-text>
							</view>
							<view class="one-item">
								<!-- <span class="anticon anticon-fire">
									<svg style="color: rgb(169 169 169);" viewBox="64 64 896 896" focusable="false"
										fill="currentColor" width="1em" height="1em" data-icon="fire"
										aria-hidden="true">
										<path
											d="M834.1 469.2A347.49 347.49 0 00751.2 354l-29.1-26.7a8.09 8.09 0 00-13 3.3l-13 37.3c-8.1 23.4-23 47.3-44.1 70.8-1.4 1.5-3 1.9-4.1 2-1.1.1-2.8-.1-4.3-1.5-1.4-1.2-2.1-3-2-4.8 3.7-60.2-14.3-128.1-53.7-202C555.3 171 510 123.1 453.4 89.7l-41.3-24.3c-5.4-3.2-12.3 1-12 7.3l2.2 48c1.5 32.8-2.3 61.8-11.3 85.9-11 29.5-26.8 56.9-47 81.5a295.64 295.64 0 01-47.5 46.1 352.6 352.6 0 00-100.3 121.5A347.75 347.75 0 00160 610c0 47.2 9.3 92.9 27.7 136a349.4 349.4 0 0075.5 110.9c32.4 32 70 57.2 111.9 74.7C418.5 949.8 464.5 959 512 959s93.5-9.2 136.9-27.3A348.6 348.6 0 00760.8 857c32.4-32 57.8-69.4 75.5-110.9a344.2 344.2 0 0027.7-136c0-48.8-10-96.2-29.9-140.9zM713 808.5c-53.7 53.2-125 82.4-201 82.4s-147.3-29.2-201-82.4c-53.5-53.1-83-123.5-83-198.4 0-43.5 9.8-85.2 29.1-124 18.8-37.9 46.8-71.8 80.8-97.9a349.6 349.6 0 0058.6-56.8c25-30.5 44.6-64.5 58.2-101a240 240 0 0012.1-46.5c24.1 22.2 44.3 49 61.2 80.4 33.4 62.6 48.8 118.3 45.8 165.7a74.01 74.01 0 0024.4 59.8 73.36 73.36 0 0053.4 18.8c19.7-1 37.8-9.7 51-24.4 13.3-14.9 24.8-30.1 34.4-45.6 14 17.9 25.7 37.4 35 58.4 15.9 35.8 24 73.9 24 113.1 0 74.9-29.5 145.4-83 198.4z">
										</path>
									</svg>
								</span> -->
								<image class="icon" src="../../static/images/introduce/read.png"></image>
								<cl-text v-if="resultUserItem&&resultUserItem.data&&resultUserItem.data.stNum"
									:value="'题目:'+resultUserItem.data.stNum" color="rgb(169 169 169)">
								</cl-text>
							</view>
							<view class="one-item">
								<!-- <span class="anticon anticon-field-time">
									<svg style="color: rgb(169 169 169);" viewBox="64 64 896 896" focusable="false"
										fill="currentColor" width="1em" height="1em" data-icon="field-time"
										aria-hidden="true">
										<path
											d="M945 412H689c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h256c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM811 548H689c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h122c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM477.3 322.5H434c-6.2 0-11.2 5-11.2 11.2v248c0 3.6 1.7 6.9 4.6 9l148.9 108.6c5 3.6 12 2.6 15.6-2.4l25.7-35.1v-.1c3.6-5 2.5-12-2.5-15.6l-126.7-91.6V333.7c.1-6.2-5-11.2-11.1-11.2z">
										</path>
										<path
											d="M804.8 673.9H747c-5.6 0-10.9 2.9-13.9 7.7a321 321 0 01-44.5 55.7 317.17 317.17 0 01-101.3 68.3c-39.3 16.6-81 25-124 25-43.1 0-84.8-8.4-124-25-37.9-16-72-39-101.3-68.3s-52.3-63.4-68.3-101.3c-16.6-39.2-25-80.9-25-124 0-43.1 8.4-84.7 25-124 16-37.9 39-72 68.3-101.3 29.3-29.3 63.4-52.3 101.3-68.3 39.2-16.6 81-25 124-25 43.1 0 84.8 8.4 124 25 37.9 16 72 39 101.3 68.3a321 321 0 0144.5 55.7c3 4.8 8.3 7.7 13.9 7.7h57.8c6.9 0 11.3-7.2 8.2-13.3-65.2-129.7-197.4-214-345-215.7-216.1-2.7-395.6 174.2-396 390.1C71.6 727.5 246.9 903 463.2 903c149.5 0 283.9-84.6 349.8-215.8a9.18 9.18 0 00-8.2-13.3z">
										</path>
									</svg>
								</span> -->
								<image class="icon" src="../../static/images/introduce/time.png"></image>
								<cl-text v-if="resultUserItem&&resultUserItem.data&&resultUserItem.data.usageTime"
									:value="'预计用时:'+resultUserItem.data.usageTime" color="rgb(169 169 169)">
								</cl-text>
							</view>

						</view>
						<view class="one" style="margin-top: 22rpx;">
							<!-- <cl-text value="成员:"></cl-text> -->
							<cl-button type="primary" @click="visible=true" class="full">
								<view v-if="(people&&people.node)?people.node.id:people.id">
									<text style="margin-right: 10rpx;">
										{{(people&&people.node)?people.node.name:(people.type||people.name)}}
									</text>
									<text>
										{{(people&&people.node)?calculateAge({startDate:people.node.birthday,onlyYear:true}):calculateAge({startDate:people.birthday,onlyYear:true})}}
									</text>
									<text style="margin-left: 10rpx;">[切换]</text>
								</view>
								<text v-else>选家庭成员</text>
							</cl-button>
						</view>

					</view>
				</cl-card>
			</view>

			<view class="about" v-if="resultUserItem&&resultUserItem.data&&resultUserItem.data.detailJson">
				<view class="header">
					<!-- <view class="three"></view> -->
					<!-- <cl-text value="关于测评" color="black" :bold="true"></cl-text> -->
				</view>

				<view v-for="(detailJson,index) in resultUserItem.data.detailJson" :key="index">
					<cs1 v-if="detailJson.style==='cs1'" :detailJson="detailJson.data">
					</cs1>
					<cs2 v-if="detailJson.style==='cs2'" :detailJson="detailJson.data">
					</cs2>
					<cs3 v-if="detailJson.style==='cs3'" :detailJson="detailJson.data">
					</cs3>
					<cs4 v-if="detailJson.style==='cs4'" :detailJson="detailJson.data">
					</cs4>
					<cs5 v-if="detailJson.style==='cs5'" :detailJson="detailJson.data">
					</cs5>
					<cs6 v-if="detailJson.style==='cs6'" :detailJson="detailJson.data">
					</cs6>
					<cs7 v-if="detailJson.style==='cs7'" :detailJson="detailJson.data">
					</cs7>
					<cs8 v-if="detailJson.style==='cs8'" :detailJson="detailJson.data">
					</cs8>
					<cs9 v-if="detailJson.style==='cs9'" :detailJson="detailJson.data">
					</cs9>

				</view>
				<!-- <view class="parse">
					<u-parse-comm :content="introductionRichText||''"></u-parse-comm>
					
				</view> -->
			</view>
		</view>
		<view class="footer" style="padding-bottom: env(safe-area-inset-bottom);">
			<view class="left" @click="backTest">
				<cl-icon name="cl-icon-calendar" :size="40"></cl-icon>
				<text>测评大厅</text>
			</view>
			<view class="right">
				<!-- <cl-button v-if="isTest" style="width:50%;height:100%;" class="full"
					@click="noMultipleClick(testAgain)">
					再测一次
					<text v-if="kind1Product&&kind1Product.price">
						({{kind1Product.price===0?'免费':'￥'+kind1Product.price}})
					</text>
				</cl-button> -->

				<cl-button v-for="(text,index) in buttonText" :type="index===0?'primary':''" :key="index"
					:disabled="text.disabled"
					:style="isTest?'width:50%;height:100%;':'width:'+100/buttonText.length+'%;height:100%;'"
					class="full" @click="noMultipleClick(goToTest,text)">
					{{text.text}}
				</cl-button>
			</view>
		</view>
	</view>
	<introduce-skeleton v-else></introduce-skeleton>
</template>

<script>
	import IntroduceSkeleton from "@/scale/test/introduceSkeleton.vue"
	import ButtonText from "@/pages/commVue/buttonText.vue"
	import {
		store,
		dispatch
	} from "@/tsjsFiles/vuex/store.ts"
	import {
		request
	} from "@/components/comm/request"
	import {
		basePag,
		baseSdk,
		baseSev
	} from "@/components/comm/base"
	import UParseComm from "@/pages/commVue/uParseComm.vue"
	import Family from "@/scale/family/family.vue"
	import {
		sdkTool
	} from "@/tsjsFiles/sdk/sdkTool"
	import {
		ItemKind,
		RecordStatus
	} from "@/components/comm/allCfg"
	import {
		calculateAge,
		chronologicalAge
	} from "@/components/comm/utils/yuan"
	import Create from "@/scale/family/create.vue"
	import Cs1 from "@/scale/comm-introduce/cs1.vue"
	import Cs2 from "@/scale/comm-introduce/cs2.vue"
	import Cs3 from "@/scale/comm-introduce/cs3.vue"
	import Cs4 from "@/scale/comm-introduce/cs4.vue"
	import Cs5 from "@/scale/comm-introduce/cs5.vue"
	import Cs6 from "@/scale/comm-introduce/cs6.vue"
	import Cs7 from "@/scale/comm-introduce/cs7.vue"
	import Cs8 from "@/scale/comm-introduce/cs8.vue"
	import Cs9 from "@/scale/comm-introduce/cs9.vue"
	export default {
		components: {
			ButtonText,
			UParseComm,
			Family,
			Create,
			Cs1,
			Cs2,
			Cs3,
			Cs4,
			Cs5,
			Cs6,
			Cs7,
			Cs8,
			Cs9,
			IntroduceSkeleton
		},
		onLoad: function(option) {

			this.scaleData.id = option.id || ''
			// this.getPeopleData()
			// this.getUserItem()

		},
		onShow: function() {
			sdkTool.staggingUserRecord()
			this.visible = false
			this.buttonText = []
			this.$nextTick(() => {

				this.getPeopleData()
			})

		},
		onShareAppMessage() {
			return {
				title: this.scaleData.name || '',
				imageUrl: this.swiperList?. [0]?.url || '',
				path: '/scale/test/introduce?id=' + this.scaleData.id
			}
		},
		onShareTimeline() {
			return {
				title: this.scaleData.name || '',
				imageUrl: this.swiperList?. [0]?.url || ''
			}
		},
		watch: {
			visible(newVal) {
				this.getPeopleData()
			}
		},
		created() {

		},
		computed: {
			bottomHeight() {
				const {
					screenHeight,
					windowHeight,
					statusBarHeight,

				} = uni.getSystemInfoSync()
				return {
					bottom: windowHeight === screenHeight ? 0 : screenHeight - windowHeight - statusBarHeight + 'px'
				}
			}
		},
		data() {
			return {
				testTimes: 0,
				complate: false,
				src: '',
				noClick: true,
				calculateAge,
				resultUserItem: [],
				visibleCreate: false,
				visible: false,
				kind1Product: {},
				intrpductionJson: {},
				introductionRichText: "",
				product: [],
				//未完成的测评的信息
				userRecord: {},
				userInfo: {},
				people: {},
				scaleData: {},
				buttonText: [],
				//是否测试过
				isTest: false,
				selectIndex: 0,
				swiperList: [],
			}
		},
		methods: {
			nonePeople(none) {
				if (none === true) {
					this.visible = false
					this.visibleCreate = true
				} else {
					this.visibleCreate = false
					this.visible = false
				}
			},
			noMultipleClick(method, params) {
				this.noMultipleClicks(method, params)
			},
			async addComplate(people) {
				this.visibleCreate = false
				this.visible = false
				console.log(this.people, await this.global.getPeople())
				this.getPeopleData()
			},
			selectChange(people) {
				setTimeout(() => {
					this.visible = false
					this.getPeopleData()
				}, 0)
			},
			testAgain() {
				if (this.resultUserItem?.data?.userItem?.length === 0) {
					if (!this.canDoTest()) {
						uni.showModal({
							title: `该量表适用人群是${this.resultUserItem.data.suitmonthage},您确定购买吗？`,
							success: (res) => {
								if (res.confirm) {
									sdkTool.makeOrder({
										orderParm: {
											productId: this.kind1Product.id || this.product.filter(
												pro => pro.node
												.kind === ItemKind.lbOne)?. [0]?.node?.id
										}
									}).then((resolve) => {
										this.getUserItem()
									})
								} else if (res.cancel) {
									uni.showToast({
										title: '您已取消购买'
									})
								}
							}
						})
					} else {
						sdkTool.makeOrder({
							orderParm: {
								productId: this.kind1Product.id || this.product.filter(pro => pro.node
									.kind === ItemKind.lbOne)?. [0]?.node?.id
							}
						}).then((resolve) => {
							this.getUserItem()
						})
					}

				} else {
					this.goToTest({

						text: '立即开始',
						productId: this.resultUserItem?.data?.userItem?.slice(-1)[0]?.productId
					})
				}
			},
			async getPeopleData() {

				this.people = await this.global.getPeople()
				this.getUserItem()
			},
			async getUserItem() {

				this.userInfo = await this.global.getInfo()
				let data = {
					id: this.scaleData.id,
				}
				if (this.userInfo.user?.id) {
					data.userId = this.userInfo.user?.id
				}
				if (this.people?.id || this.people?.node?.id) {
					data.childrenId = this.people?.id || this.people?.node?.id
				}
				this.src = baseSev.domain + '/lb/' + this.scaleData.id
				request({
					url: '/lbs/getDetail',
					data,
					notHeader: true,
				}).then(resultUserItem => {
					this.resultUserItem = resultUserItem
					console.log(this.resultUserItem)
					this.swiperList = [{
						url: this.resultUserItem?.data?.introductionJson?.banner
					}]
					this.intrpductionJson = this.resultUserItem?.data?.introductionJson
					this.introductionRichText = this.resultUserItem?.data?.introductionRichText
					this.scaleData.name = this.resultUserItem?.data?.name

					store.getLbProduct({
						lbid: this.scaleData.id
					}).then((resolve) => {

						this.product = resolve

						let productIds = {}
						this.product.map(pro => {
							productIds[pro?.node?.id || ''] = pro.node.kind

							if (pro?.node?.kind === ItemKind.lbOne)
								this.kind1Product = pro.node
						})
						this.testTimes = 0
						//筛选出是这个量表的道具
						this.resultUserItem.data.userItem = this.resultUserItem?.data?.userItem
							?.filter(
								userItem => {
									if (productIds[userItem.productId] && userItem.count > 0) {
										if (productIds[userItem.productId] === ItemKind.lbEver) {
											this.testTimes = Infinity
										} else if (productIds[userItem.productId] === ItemKind.lbOne) {
											if (this.testTimes !== Infinity)
												this.testTimes++
										}

									}
									return productIds[userItem.productId] && userItem.count > 0
								})
						console.log(this, this.testTimes === Infinity, this.testTimes, 'testTimes',
							this.resultUserItem.data.userItem,
							productIds)
						//还没有购买
						if (this.resultUserItem.data.userItem?.length === 0 && this.resultUserItem.data
							.userRecord?.length === 0) {

							this.isTest = false
							if (this.canDoTest()) {
								this.product.some(pro => {
									if (pro?.node.kind === ItemKind.lbOneFst) {
										this.buttonText = [{
											text: '立即开始',
											productId: pro.node.id,
											kind: ItemKind.lbOneFst
										}]
										return true
									}
								})
							} else {
								this.buttonText = [{
									text: '年龄不符',
									disabled: true,
									// productId: userItem.productId
								}]
							}


							// const buttonTextKind = {}
							// this.product.map(pro => {
							// 	let text = ''
							// 	if (pro?.node.kind === ItemKind.lbEver) {
							// 		if (pro?.node.price === 0) {
							// 			text = '免费解锁'
							// 		} else {
							// 			text = '永久解锁￥' + pro?.node.price
							// 		}
							// 	} else if (pro?.node.kind === ItemKind.lbOne) {
							// 		if (pro.node.price === 0) {
							// 			text = '免费领取'
							// 		} else {
							// 			text = '立即购买￥' + pro?.node.price
							// 		}
							// 	} else if (pro?.node.kind === ItemKind.lbOneFst) {
							// 		text = '先做后买'
							// 	}
							// 	buttonTextKind[pro.node.kind] = {
							// 		text,
							// 		productId: pro?.node.id,
							// 		kind: pro.node.kind
							// 	}
							// })
							// this.buttonText = []
							// this.buttonText = this.buttonText.concat(buttonTextKind[ItemKind.lbOne] ||
							// 	[])
							// this.buttonText = this.buttonText.concat(buttonTextKind[ItemKind.lbEver] ||
							// 	[])
							// this.buttonText = this.buttonText.concat(buttonTextKind[ItemKind
							// 	.lbOneFst] || [])
						} else if (this.resultUserItem.data.userRecord?.length > 0) {
							const currentProductIds = new Set() //userRecord拥有的productid
							// 是否有未完成的
							const hasNoComplete = this.resultUserItem.data.userRecord?.some(
								userRecord => {
									currentProductIds.add(userRecord.productId)
									if (userRecord.status === RecordStatus.PENGDING || userRecord
										.status === RecordStatus.STAGING) {
										this.userRecord = userRecord
										return true
									}
									return false
								})
							if (hasNoComplete) {
								this.isTest = false
								this.buttonText = [{
									text: '重新开始',
									productId: ''
								}]
							} else {

								if (this.resultUserItem.data.userItem.length > this.resultUserItem.data
									.userRecord
									?.length) {
									this.resultUserItem.data.userItem?.some(userItem => {

										if (userItem.count > 0) {
											// 购买了还没有开始做
											this.isTest = false

											if (this.canDoTest()) {
												this.buttonText = [{
													text: '立即开始',
													productId: userItem.productId
												}]
											} else {
												this.buttonText = [{
													text: '年龄不符',
													disabled: true,
													productId: userItem.productId
												}]
											}
											return true
										}
										return false
									})

								} else {
									const hasNoDo = this.resultUserItem.data.userItem.some(
										userItem => {
											if (userItem.count > 0) {
												// 购买了还没有开始做
												this.isTest = false

												if (this.canDoTest()) {
													this.buttonText = [{
														text: '立即开始',
														productId: userItem.productId
													}, {
														text: '查看报告',
														productId: '',
														recordId: this.resultUserItem.data
															.userRecord
															?.slice(-1)[0]?.id
													}]
												} else {
													this.buttonText = [{
														text: '年龄不符',
														disabled: true,
														productId: userItem.productId
													}, {
														text: '查看报告',
														productId: '',
														recordId: this.resultUserItem.data
															.userRecord
															?.slice(-1)[0]?.id
													}]
												}
												return true
											}
											return false
										})
									if (!hasNoDo) {
										this.isTest = true
										//新加
										if (this.canDoTest()) {
											this.product.some(pro => {
												if (pro?.node.kind === ItemKind.lbOneFst) {
													this.buttonText = [{
														text: '立即开始',
														
														productId: pro.node.id,
														kind: ItemKind.lbOneFst
													}]
													return true
												}
											})
										} else {
											this.buttonText = [{
												text: '年龄不符',
												productId:this.resultUserItem.data.userRecord
												?.slice(-1)[0]?.id,
												disabled: true,
												kind: ItemKind.lbOneFst
											}]
										}

										this.buttonText.push({
											text: '查看报告',
											productId: '',
											recordId: this.resultUserItem.data.userRecord
												?.slice(-1)[0]?.id
										})
										//结束
										// this.buttonText = [{
										// 	text: '查看报告',
										// 	productId: '',
										// 	recordId: this.resultUserItem.data.userRecord
										// 		?.slice(-1)[0]?.id
										// }]
									}

								}

							}
						}
						//userItem>0 userRecord===0 购买了还没有开始做
						else if (this.resultUserItem.data.userRecord?.length === 0) {
							this.isTest = false
							if (this.canDoTest()) {
								this.buttonText = [{
									text: '立即开始',
									productId: this.resultUserItem.data?.userItem?. [0]
										?.productId
								}]
							} else {
								this.buttonText = [{
									text: '年龄不符',
									disabled: true,
									productId: this.resultUserItem.data?.userItem?. [0]
										?.productId
								}]
							}

						} else {
							this.buttonText = []
						}
						this.complate = true
						console.log(this.buttonText, 'buttomText')
					})

				}).catch(err => {
					this.complate = true

					this.$refs['toast']?.open({
						message: err?.data?.message || err?.data?.data?.msg
					})
				})
			},
			canDoTest() {
				const sznl = chronologicalAge(this.people?.birthday || this.people?.node?.birthday)
				if ((!this.resultUserItem.data.smonth || sznl >= this.resultUserItem.data.smonth) && (!this.resultUserItem
						.data.emonth || sznl <= this.resultUserItem.data.emonth)) {
					return true
				}
				return false
			},
			backTest() {
				uni.switchTab({
					url: '/pages/index/category'
				})
			},
			goToTest(text) {
				if (text.text === '查看报告') {
					uni.navigateTo({
						url: '/scale/test/report?id=' + text.recordId
					})
					return
				}
				console.log('text.text', text.text.indexOf('立即开始') > -1, !this.canDoTest(), text.testAgain)

				let showToast = true
				// 是0元类型的 量表没有年龄限制的  不提示
				if (text.text.indexOf('免费') > -1 || (!(this.scaleData.emonth && this.scaleData.smonth) && (
						text.text.indexOf('解锁') > -1 || text.text.indexOf('购买') > -1))) {
					showToast = false
				}
				if (!this.people?.id && !this.people?.node?.id && showToast) {
					this.visible = true
					return
				}
				console.log(text.kind, ItemKind.lbOneFst, 'lb')
				if (text.kind === ItemKind.lbOneFst) {

				}
				//点购买的时候 不需要再确认一次成员
				else if (text.text.indexOf('免费') > -1 || text.text.indexOf('解锁') > -1 || text.text.indexOf('购买') > -1) {

					if (text.text.indexOf('免费') === -1 && !this.canDoTest()) {
						uni.showModal({
							title: `该量表适用人群是${this.resultUserItem.data.suitmonthage},您确定购买吗？`,
							success: (res) => {
								if (res.confirm) {
									sdkTool.makeOrder({
										orderParm: {
											productId: text.productId
										}
									}).then((resolve) => {
										this.getUserItem()
									})
								} else if (res.cancel) {
									uni.showToast({
										title: '您已取消购买'
									})
								}
							}
						})
					} else {
						sdkTool.makeOrder({
							orderParm: {
								productId: text.productId
							}
						}).then((resolve) => {
							this.getUserItem()
						})
					}

					return
				}

				let url =
					`/scale/family/family?buttonText=${text.text}&scaleId=${this.scaleData.id}&scaleName=${this.scaleData.name}`

				if (text.text === '重新开始') {
					url += `&recordId=${this.userRecord?.id}`

				} else if (text.productId) {
					url += `&productId=${text.productId}`
				}
				if (text.kind) {
					url += `&kind=${text.kind}`
				}
				if (this.resultUserItem.data.advanceSubmit === 0) {
					url += `&advanceSubmit=${0}`
				}
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
	}

	.introduce {
		height: 100%;

		// 页面结构复杂，css样式太多的情况，使用 image 可能导致样式生效较慢，
		// 出现 “闪一下” 的情况，此时设置 image{will-change: transform} ,可优化此问题。
		image {
			will-change: transform
		}

		/deep/ .cl-popup__wrapper.is-open .cl-popup {
			transform: none;
		}

		.full /deep/ .cl-button {
			width: 100%;
			height: 100%;
		}

		/deep/ .cl-popup__wrapper--center .cl-popup {
			transform: none;
		}


		.scoll {
			height: calc(100% - 180rpx);
			overflow-y: scroll !important;

			/deep/ .cl-card__header {
				display: none;
			}

			.card-introduce {
				box-shadow: 0px 0px 12px #d7d7d7;
				margin: 0 15px;
				position: relative;
				margin-top: -20px;
				border-radius: 16rpx;
			}
		}

		.content {
			display: flex;
			flex-direction: column;

			.one {
				display: flex;
				justify-content: space-between;
				align-items: center;

				/deep/ .cl-button {
					width: 100%;
					height: 66rpx;
					border-radius: 40rpx;
					background-color: rgba(254, 122, 9, 0.72);
				}

				.one-item {
					display: flex;
					align-items: center;
					margin-top: 20rpx;

					.anticon {
						display: block;
						margin-right: 4px;
						height: 8px;
					}
				}


				.icon {
					width: 28rpx;
					height: 28rpx;
					margin-right: 8rpx;
					opacity: 0.4;

				}

			}

			.price {
				// margin-top: 20rpx;
			}
		}

		.banner {
			width: 100%;
			margin: auto;

			image {
				width: 100%;
			}

			uni-image {
				width: 100%;
			}
		}

		.about {
			padding-bottom: calc(80rpx + env(safe-area-inset-bottom));

			.parse {
				// padding: 20rpx;
				background-color: white;
			}

			.header {
				display: flex;

				.three {
					height: 0;
					width: 0;
					border: 14rpx solid orange;
					border-top-color: transparent;
					border-bottom-color: transparent;
					border-right-color: transparent;
					margin-left: 20rpx;
					margin-top: 4rpx;

				}
			}
		}

		.footer {
			position: fixed;
			bottom: 0;
			width: 100%;
			background-color: #fff;
			display: flex;
			border-top: 1px solid #e3e3e3;

			.left {
				display: flex;
				flex-direction: column;
				width: 20%;
				align-items: center;
				margin-top: 10rpx;
				margin-bottom: 10rpx;

				text {
					font-size: 14px;
				}
			}

			.right {
				width: 80%;
				margin-top: 10rpx;
				margin-bottom: 10rpx;
				display: flex;
				margin-right: 10rpx;
			}


		}
	}
</style>
