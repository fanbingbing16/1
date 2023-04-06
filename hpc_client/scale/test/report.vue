<template>
	<view class="report" v-if="complate">
		<cl-dialog :visible.sync="visible" show-close-btn width="90%">
			<confirm :params="params"
				:image="(records.lb&&records.lb[0]&&records.lb[0].introductionJson)?(records.lb[0].introductionJson.banner||records.lb[0].introductionJson.icon):'https://cdn.weimigames.com/hpc_c/upload/lbIcon/icon/34.jpg'">
			</confirm>
		</cl-dialog>
		<tobar :title="params.name||'报告页'" :back="back"></tobar>
		<view v-if="records?records.payStatus===0:false" class="top">
			<view class="mask-top">
				<view class="text-one"><text>超过90%的用户对我们的测试和报告表示满意，已有数万名用户购买使用我们的报告。</text></view>
				<view class="text-one"><text>我们的量表报告基于科学的测量理论和方法，多维度、多指标的评估和分析，为你提供更加全面和准确的评估结果。</text></view>
				<view class="text-one">
					<text>需要注意的是，熊孩子自评测评结果只是参考，不能完全代表测评对象的各方面实际情况。测评对象的各方面实际情况受到多种因素的影响，包括基因、环境、生活经历等等，而这些因素都可能对测评结果产生影响。</text>
				</view>
				<view class="text-one"><text>影响，包括基因、环境、生活经历等等，而这些因素都可能对测评结果产生影响。</text></view>
				<view class="text-one"><text>1万+人以获取此报告</text></view>

			</view>
			<view class="button-list">

				<!-- <cl-button @click="order" class="button-one" v-if="!getMore" style="margin-right:20rpx;">付费解锁
				</cl-button> -->

				<view v-if="!getMore" style="display: flex;">
					<view v-for="(butt,index) in buttonText" :key="index" style="width: 100%;">
						<cl-button class="button-one full" v-if="!getMore" @click="order(butt)">{{butt.text}}
						</cl-button>
					</view>
				</view>

				<cl-button @click="shared" class="button-one full share" v-if="!getMore" type="primary">
					<!-- <image src="/static/images/weix.png" style="width: 30rpx;height:30rpx;"></image> -->
					分享解锁
				</cl-button>
				<cl-button @click="seeMore" class="button-one full" v-if="getMore" type="primary">

					查看更多</cl-button>
			</view>
		</view>
		<view class="content" v-if="!loading">
			<view class="small-title">
				<cl-text :value="handleDate" color="rgb(133 133 133)"></cl-text>
				<cl-text color="rgb(133 133 133)" :value="calculateAge"></cl-text>
			</view>

			<cl-text :value="(records&&records.lb&&records.lb[0])?records.lb[0].name:''" :size="40" :bold="true">
			</cl-text>
			<view class="score card">
				<view class="one">
					<view class="mask" v-if="records?records.payStatus===0:false">
						<view>
							<cl-text :value="scores" color="#fff" :size="50"></cl-text>
							<cl-text :value="'分'" color="#fff" :size="20"></cl-text>
						</view>

						<cl-text :value="(reportDataValue&&reportDataValue.advice)?reportDataValue.advice:''"
							color="#fff" :size="30"></cl-text>
					</view>

					<view v-else>
						<cl-text :value="scores" color="#fff" :size="50"
							v-if="reportDataValue&&!reportDataValue.notScoreTotal">
						</cl-text>
						<cl-text :value="'分'" color="#fff" :size="20"
							v-if="reportDataValue&&!reportDataValue.notScoreTotal"></cl-text>
					</view>
					<cl-text :value="(reportDataValue&&reportDataValue.advice)?reportDataValue.advice:''" color="#fff"
						:size="30" v-if="records?records.payStatus!==0:false"></cl-text>
				</view>
				<!-- <view class="echarts echarts-line"
					v-if="echartsOption2.series&&echartsOption2.series[0]&&echartsOption2.series[0].data.length>0">
					<echarts :chartData="echartsOption2" :opts="opts2"></echarts>
				</view> -->
				<view class="mask" v-if="records?records.payStatus===0:false">
					<view class="one-text">
						<cl-text :value="oneAdvice||'测试内容，你猜是啥你猜是啥你猜是啥你猜是啥你猜是啥'" color="#fff"></cl-text>
					</view>
				</view>
				<view class="one-text" v-else>
					<cl-text :value="(reportDataValue&&reportDataValue.oneAdvice)?reportDataValue.oneAdvice:''"
						color="#fff" :ellipsis="hasTen?(toolTip==='展开'?10:null):null" class="one-text-text"></cl-text>
					<!--  -->
					<cl-button type="primary" :icon="'cl-icon-arrow-'+(toolTip==='展开'?'bottom':'top')"
						@click="toolTip=(toolTip==='展开'?'收起':'展开')" class="open" style="margin-top: 8rpx;"
						v-if="hasTen">
						{{toolTip}}
					</cl-button>
				</view>
			</view>

			<view class="mask" v-if="records?records.payStatus===0:false">
				<view class="card">
					测试
					<view class="echarts">
						<echarts :chartData="echartsOptionTemp" :opts="opts"></echarts>
					</view>
				</view>
				<view class="card" v-if="listTypeScores.length>0">
					<cl-tabs v-model="active" :labels="listTypeScores">
						<view class="content-padd"
							v-if="listTypeScores&&listTypeScores[active]&&listTypeScores[active].score">
							<cl-text :value="(listTypeScores&&listTypeScores[active])?listTypeScores[active].score:0"
								:size="30">
							</cl-text>
							<cl-text value="分" :size="30"></cl-text>
						</view>
					</cl-tabs>
				</view>
				<view class="card" v-if="listTypeScores.length>0&&reportDataValue&&reportDataValue.adviceType">
					<cl-tabs v-model="active2" :labels="listTypeScores">
						<view class="content-padd">
							<cl-text
								:value="(listTypeScores&&listTypeScores[active2])?listTypeScores[active2].advice:''"
								:size="30">
							</cl-text>
						</view>
					</cl-tabs>
				</view>
			</view>
			<view v-else>

				<view class="card"
					v-if="echartsOption&&echartsOption.series&&echartsOption.series[0]&&echartsOption.series[0].data.length>0">
					<view class="echarts " v-if="!visible">
						<echarts :chartData="echartsOption" :opts="opts"></echarts>
					</view>
				</view>
				<card-one :id_one="params.id" :listTypeScores="listTypeScores" v-if="listTypeScores.length>0"
					:reportDataValue="reportDataValue">
				</card-one>
				<!-- <view class="card" v-if="listTypeScores.length>0">
					<view style="display: flex;justify-content: space-between;">
						<cl-button class="type" type="primary">解析概览</cl-button>
						<cl-button class="open" @click="">查看全部<cl-text suffixIcon="cl-icon-arrow-right"></cl-text></cl-button>
					</view>


					<view class="one-type" v-for="listTypeScore in listTypeScores" :key="listTypeScore.name">
						<view class="header" v-if="listTypeScore.label||listTypeScore.oneAdvice||listTypeScore.score">
							<view class="shu"></view>
							<cl-text :value="listTypeScore.label+'：'" bold block></cl-text>
							<cl-text :value="istTypeScore.oneAdvice" :color="listTypeScore.danger?'red':''"
								:bold="listTypeScore.danger"></cl-text>
							<cl-text v-if="listTypeScore.score" :value="' '+listTypeScore.score+'分'" color="#d5aab3">
							</cl-text>
						</view>
						<view class="advice">
							<cl-text :value="listTypeScore.advice" :ellipsis="1"></cl-text>
						</view>
						<view class="advice" v-if="listTypeScore.shouDo">
							建议：<cl-text :value="listTypeScore.shouDo" :ellipsis="1"></cl-text>
						</view>
					</view>
				 <view class="row">
						<view class="col" v-for="listTypeScore in listTypeScores" :key="listTypeScore.name"
							:style="{width:listTypeScores.length<6?((100/listTypeScores.length)+'%'):(100/6+'%'),'text-align':'center'}">
							<cl-text :value="listTypeScore.label"></cl-text>
							<cl-text :value="listTypeScore.score+'分'"></cl-text>
						</view>
					</view> 

				</view> -->
				<view class="card"
					:style="{'padding-bottom':(listData.content&&listData.content.length>0)?'20rpx':'calc(env(safe-area-inset-bottom) + 100rpx)'}">
					<view class="header">
						<cl-text value="专属成长指南" bold :size="28"></cl-text>
					</view>
					<cl-tabs v-model="active3">
						<cl-tab-pane :refresher-enabled="false" :label="data.type" :name="index1"
							v-for="(data,index1) in commDataFooter" :key="index1">
							<view class="comm">
								<cl-button class="type" type="primary" style="margin: 0;">建议概览</cl-button>
								<view class="text">
									<cl-text v-for="(content,index2) in commDataFooter[index1].content" :key="index2"
										:value="(index2+1)+'.'+content">
									</cl-text>
								</view>

							</view>
						</cl-tab-pane>
					</cl-tabs>
				</view>
				<!-- <view class="card" v-if="listTypeScores.length>0&&reportDataValue&&reportDataValue.adviceType">
					<cl-tabs v-model="active2" :labels="listTypeScores">
						<view class="content-padd">
							<cl-text
								:value="(listTypeScores&&listTypeScores[active2])?listTypeScores[active2].advice:''"
								:size="30">
							</cl-text>
						</view>
					</cl-tabs>
				</view> -->
				<!-- <cl-button type="primary" v-if="reportDataValue&&reportDataValue.butt" @click="clickButt">
					{{reportDataValue.butt.text}}
				</cl-button> -->

			</view>
			<view class="footer">
				<cl-button @click="pageTo('/pages/index/index')">回首页</cl-button>
				<cl-button @click="pageTo('/pages/index/category')">更多测试</cl-button>
				<cl-button @click="pageTo('/scale/test/introduce')">量表介绍</cl-button>
			</view>
		</view>
		<view style="padding-bottom: calc(env(safe-area-inset-bottom) + 40rpx);"
			v-if="listData.content&&listData.content.length>0&&records?records.payStatus!==0:false">
			<view style="display: flex;justify-content: flex-start;align-items: flex-end;margin-left: 30rpx;">
				<view style="font-size: 40rpx;letter-spacing: 1.5px;color: #e0afb2;display: flex;">
					<span
						style="display: inline-flex;flex-direction: column; justify-content: center;align-items: flex-start;">
						<view class="assistant"
							style="box-sizing:border-box;width: 0;height: 2rpx;border-bottom: 14rpx solid #e0afb2;border-right: 14rpx solid transparent;margin-top: 2rpx;">
						</view>
						<view class="assistant"
							style="box-sizing:border-box;width: 0;height: 2rpx;border-left: 14rpx solid #e0afb2;border-bottom: 14rpx solid transparent;">
						</view>
					</span> <strong class="135brush" data-brushtype="text" style="margin-left: 20rpx;">更多测评</strong>
				</view>
			</view>
			<lb-list :listData="listData" :subjectWidth="'calc(33.34% - 26.67rpx)'" :pictureHeight="'120rpx'"
				:pictureWidth="'170rpx'" :hanLength="3" marginRight="20rpx">
			</lb-list>
		</view>
	</view>
	<report-skeleton v-else></report-skeleton>
</template>

<script>
	import Echarts from "@/scale/test/echarts.vue"
	import {
		request
	} from "@/components/comm/request"
	import reportData from "@/tsjsFiles/report/report.js"
	import Tobar from "@/pages/commVue/topbar.vue"
	import Confirm from "@/scale/shared/confirm.vue"
	import {
		store
	} from "@/tsjsFiles/vuex/store"
	import {
		ItemKind,
		RecordStatus
	} from "@/components/comm/allCfg"
	import {
		sdkTool
	} from "@/tsjsFiles/sdk/sdkTool"
	import {
		calculateAge,
		chronologicalAge
	} from "@/components/comm/utils/yuan"
	import LbList from "@/pages/commVue/lbList.vue"
	import CardOne from "@/scale/test/cardOne.vue"
	import ReportSkeleton from "@/scale/test/reportSkeleton.vue"
	export default {
		components: {
			Echarts,
			Tobar,
			Confirm,
			LbList,
			CardOne,
			ReportSkeleton
		},
		onLoad: function(option) {
			this.params = option

		},
		onShow() {
			uni.removeStorage({
				key: 'userRecord'
			})
			this.getUserRecord()
		},
		onShareAppMessage() {
			if (!this.getMore) {
				return {
					path: '/scale/test/report?id=' + this.params.id,
					imageUrl: ""
				}
			}

		},
		data() {

			return {
				hasTen: false,
				complate: false,
				oneAdvice: '',
				buttonText: [],
				toolTip: '展开',
				commDataFooter: [],
				listData: {},
				visible: false,
				active: 0,
				active2: 0,
				active3: 0,
				getMore: false,
				listTypeScores: [],
				params: {},
				records: {},
				scores: 0,
				children: {},
				reportDataValue: {},
				xxEvatypeScores: {},
				stEvatypeScores: {},
				anstype: {},
				complateAdv: false,
				complateComm: false,
				complateGs: false,
				loading: true,
				gs: [],
				adv: [],
				comm: [],
				opts2: {
					color: ['#1890ff', '#ffffff0E', '#ffffff0E'],
					fontColor: '#fff',
					type: 'line',
					dataLabel: false,
					dataPointShape: true,
					enableMarkLine: true,
					legend: {
						show: false
					},
					xAxis: {
						max: 100,
						disabled: true
					},
					yAxis: {
						disableGrid: true,
						disabled: true,

					},
					extra: {
						line: {
							type: 'curve',
							activeType: "hollow"

						}
					}
				},
				echartsOptionTemp: {},
				echartsOption2: {
					categories: [],
					series: []
				},
				opts: {

					extra: {
						column: {
							categoryGap: 4
						}
					}

				},
				echartsOption: {
					categories: [],
					series: [{
						name: "",
						textColor: "",
						data: []
					}]
				}
			}
		},
		created() {

			this.listData = {
				title: '123',
				content: []
			}
		},
		watch: {
			children() {
				if (this.complateAdv && this.complateComm && this.complateGs && this.children?.id) {
					this.getReportData()

				}
			},
			complateAdv(newVal) {
				if (this.complateAdv && this.complateComm && this.complateGs && this.children?.id) {
					this.getReportData()
				}
			},

			complateComm(newVal) {
				if (this.complateAdv && this.complateComm && this.complateGs && this.children?.id) {
					this.getReportData()
				}
			},
			complateGs(newVal) {
				if (this.complateAdv && this.complateComm && this.complateGs && this.children?.id) {
					this.getReportData()
				}
			},
		},
		computed: {
			handleDate() {
				return '测评时间' + ':' + this.moment(new Date(this.records?.collectJson?.testDate)).format('yyyy-MM-DD HH:mm')
			},
			calculateAge() {
				return '测评年龄' + ':' + calculateAge({
					startDate: (this.children) ? this.children.birthday : ''
				})
			}
		},

		methods: {
			getHeight() {
				setTimeout(() => {
					const query = this.createSelectorQuery();

					query.select('.one-text-text').boundingClientRect(data => {
						console.log("得到布局位置信息" + JSON.stringify(data));
						if (data?.height > 170) {
							this.hasTen = true
						}
					}).exec();
				}, 100)

			},
			pageTo(url) {
				if (url.indexOf('index') > -1) {
					uni.switchTab({
						url
					})
				} else {
					uni.navigateTo({
						url: url + '?id=' + this.records.lbid
					})
				}
			},
			clickButt() {
				uni.navigateTo({
					url: this.reportDataValue.butt?.page
				})
			},
			// 取整
			getNumber(num) {
				return Math.floor(num)
			},
			seeMore() {
				request({
					url: '/userRecord/getReportMore',
					data: {
						id: this.records?.id
					},
					method: 'PUT'
				}).then(resultGetMore => {

					if (resultGetMore.data === true) {
						this.records.payStatus = 1
					}
				})
			},
			order(butt) {

				// store.getLbProduct({
				// 	lbid: this.records?.lbid,
				// 	kind: ItemKind.lbOneFst
				// }).then(product => {

				// 	sdkTool.makeOrder({
				// 		orderParm: {
				// 			productId: product?. [0]?.node?.id
				// 		},

				// 	}).then(result => {


				// 	})
				// })

				sdkTool.makeOrder({
					orderParm: {
						productId: butt.productId
					}
				}).then(result => {

					if (result)
						this.getMore = true

				})

			},
			shared() {
				this.visible = true

			},
			back() {
				const page = getCurrentPages()
				console.log(page, 'page')
				if (page?. [0]?.route === 'scale/test/report' && page.length === 1) {
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else if (page?. [1]?.route === 'my/report') {
					uni.redirectTo({
						url: '/my/report'
					})
				} else {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
			},
			getObjValues(obj) {
				return Object.values(obj)
			},
			getReportData() {

				this.reportDataValue =
					reportData(
						this.records.collectJson?.checkScaleItem,
						this.adv,
						this.gs,
						this.comm,
						this.scores,
						chronologicalAge(this.children.birthday, new Date(), 0),
						this.records.lb[0].name,
						1,
						this.children?.gender,
						this.records.lb[0].lbReportType,
						this.xxEvatypeScores,
						this.stEvatypeScores,
						this.anstype,
						this.records.collectJson
					)
				this.echartsOption = {
					categories: [],
					series: [{
						name: '得分',
						data: []
					}]
				}
				let labelLength = 0
				if (!this.reportDataValue?.listTypeScores) {
					this.listTypeScores = this.listTypeScores.map(item => {

						item.advice = this.reportDataValue?.adviceType?. [item.label]
						if (!this.reportDataValue?.echartsOption) {
							this.echartsOption.categories.push(item.label)
							this.echartsOption.series[0]?.data.push(item.score)
							labelLength += item.label.length
						}
						return item
					})
					if (this.reportDataValue?.echartsOption) {
						this.echartsOption = this.reportDataValue.echartsOption
					}
				} else {
					this.listTypeScores = this.reportDataValue.listTypeScores
					if (!this.reportDataValue?.echartsOption) {
						this.listTypeScores.map(item => {
							this.echartsOption.categories.push(item.label)
							labelLength += item.label.length
							this.echartsOption.series[0]?.data.push(item.score)


						})
					} else {
						this.echartsOption = this.reportDataValue?.echartsOption
					}

				}

				this.opts.xAxis = {}

				if (labelLength > 24) {
					this.opts.type = 'bar'
					delete this.opts.extra.column
					this.opts.yAxis = {
						data: [{
							fontSize: 11,
							type: 'categories'
						}, ],
					}
				
					this.opts.extra.bar = {
						type: "group",
						categoryGap: 4
					}
					this.opts.xAxis.disabled = true
				this.opts.xAxis.min=0
				} else if (labelLength > 21) {
					this.opts.xAxis.fontSize = 11
				} else {
					this.opts.xAxis.fontSize = 13
				}
				
				this.reportDataValue?.scores ? this.scores = this.reportDataValue?.scores : ''
				this.reportDataValue?.opts ? this.opts = this.reportDataValue?.opts : ''

				this.reportDataValue?.opts2 ? this.opts2 = this.reportDataValue?.opts2 : ''
				this.reportDataValue?.echartsOption2 ? this.echartsOption2 = this.reportDataValue?.echartsOption2 : ''

				console.log(this.echartsOption, 'echar', this.opts, this
					.listTypeScores, 'listTypeScores')
				if (!this.reportDataValue?.notScoreTotal) {
					!this.reportDataValue ? this.reportDataValue = {} : ''
					this.reportDataValue.notScoreTotal = false
				}
				if ((this.reportDataValue?.status === RecordStatus.ERROR && this.records.status !== RecordStatus.ERROR) ||
					!this.records.collectJson.childName) {
					request({
						url: '/userRecord/submitUserRecord',
						method: 'POST',
						data: {
							collectJson: {
								...this.records.collectJson,
								childName: this.children.name
							},
							id: this.params.id,
							status: this.reportDataValue?.status,
						}


					}).then(result => {
						this.complate = true

					}).catch(err => {
						this.complate = true
					})
				} else {
					this.complate = true
				}
				if (this.records.payStatus === 0) {
					//假数据
					this.echartsOptionTemp = {
						categories: ['类别1', '类别2', '类别2'],
						series: [{
								name: '得分',
								data: [11, 12, 12]
							},
							{
								name: '测试',
								data: [11, 55, 33]
							}
						]
					}
					this.oneAdvice = '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试'
				}
				this.getHeight()
			},
			getGsAdvComm(type) {
				request({
					url: '/lb' + type[0].toLocaleUpperCase() + type.slice(1),
					data: {
						lbid_eq: this.records.lbid
					}
				}).then(result => {
					this[type] = result.data
					this['complate' + type[0].toLocaleUpperCase() + type.slice(1)] = true

				})

			},

			getChildren(childrenId) {
				request({
					url: '/userChildren/findOne/' + childrenId
				}).then(result => {

					this.children = result.data
					if (!result.data) {
						this.children = {
							id: '1'
						}
					}
					request({
						url: '/lbs/recommend/' + this.records.lbid
					}).then(result => {


						this.listData.content =
							result.data?.map(item => {

								let tempItem = {
									node: {
										introductionJson: {
											title: item.introductionJson.title,
											icon: item.introductionJson.icon || item
												.introductionJson.banner
										},
										id: item.id
									}
								}
								return tempItem
							})
					})
				})
			},
			getUserRecord() {
				request({
					url: '/userRecord/findOne/' + this.params.id
				}).then(result => {

					this.records = result.data
					if (this.records.payStatus === 0) {
						store.getLbProduct({
							lbid: this.records.lbid,
						}).then(product => {

							let tempPro = {}
							this.buttonText = []
							product.map(pro => {
								if (pro.node.kind === ItemKind.lbEver || pro.node.kind === ItemKind
									.lbOne) {
									this.buttonText.push({
										text: pro.node.kind === ItemKind.lbEver ?
											`永久版(无限次数) ￥${pro.node.price}` :
											`体验版(单次) ￥${pro.node.price}`,
										kind: pro.node.kind,
										productId: pro.node.id
									})
								}
							})



						})
					}
					store.getSettings({
						key: 'unifiedInfo'
					}).then(resultInfo => {

						this.commDataFooter = resultInfo?. [0]?.node?.data[this.records.lb?. [0]
							?.unifiedInfo]

					})


					this.getChildren(this.records.childrenId)
					store.getLbProduct({
						lbid: this.records.lbid,
						// kind: 3
					}).then(product => {
						let temoPro = {}

						product.map(pro => {
							if (pro.node.kind === ItemKind.lbEver || pro.node.kind === ItemKind
								.lbOne)
								temoPro[pro.node.id] = 1
						})
						this.records.userItem?.some(userItem => {
							if (temoPro[userItem.productId] && userItem.count > 0) {

								this.getMore = true
								return true

							}
						})
						this.loading = false
					})


					this.scores = 0
					this.xxEvatypeScores = {}
					this.stEvatypeScores = {}
					this.anstype = {}
					const checkScaleItem = this.records.collectJson?.checkScaleItem
					this.listTypeScores = []
					const typeS = new Set()
					for (const page in checkScaleItem) {
						const score = +checkScaleItem[page].score
						this.scores += score
						if (checkScaleItem[page].xxEvatype) {
							typeS.add(checkScaleItem[page].xxEvatype)
							this.xxEvatypeScores[checkScaleItem[page].xxEvatype] =
								this.xxEvatypeScores[checkScaleItem[page].xxEvatype] || 0
							this.xxEvatypeScores[checkScaleItem[page].xxEvatype] += score
						}
						if (checkScaleItem[page].stEvatype) {
							typeS.add(checkScaleItem[page].stEvatype)
							this.stEvatypeScores[checkScaleItem[page].stEvatype] =
								this.stEvatypeScores[checkScaleItem[page].stEvatype] || 0
							this.stEvatypeScores[checkScaleItem[page].stEvatype] += score
						}
						if (checkScaleItem[page].anstype) {
							typeS.add(checkScaleItem[page].anstype)
							this.anstype[checkScaleItem[page].anstype] =
								this.anstype[checkScaleItem[page].anstype] || 0
							this.anstype[checkScaleItem[page].anstype] += score
						}
					}
					for (const key in this.xxEvatypeScores) {
						this.listTypeScores.push({
							name: this.listTypeScores.length,
							label: key,
							score: this.xxEvatypeScores[key]
						})
					}
					for (const key in this.stEvatypeScores) {
						this.listTypeScores.push({
							name: this.listTypeScores.length,
							label: key,
							score: this.stEvatypeScores[key]
						})
					}
					for (const key in this.anstype) {
						this.listTypeScores.push({
							name: this.listTypeScores.length,
							label: key,
							score: this.anstype[key]
						})
					}
					if (this.records.lb?. [0]?.name === '多发性抽动症综合量表(TSGS)') {
						this.scores =
							Math.floor(((this.stEvatypeScores['SM'] + this.stEvatypeScores['CM']) / 2 + (this
									.stEvatypeScores['SP'] + this.stEvatypeScores['CP']) / 2 + (this
									.stEvatypeScores['行为'] + this.stEvatypeScores['运动不宁'] + this
									.stEvatypeScores['学校和学习'] || this.stEvatypeScores['工作和职业']) * (2 / 3)) *
								100) / 100

					}
					this.getGsAdvComm('gs')
					this.getGsAdvComm('adv')
					this.getGsAdvComm('comm')
				})

			}

		}
	}
</script>

<style lang="scss" scoped>
	@import "@/scale/test/comm.scss";

	.report {
		width: 100%;
		height: 100%;

		/deep/ .lb_list {
			padding-bottom: 40rpx;
		}

		.footer {
			position: fixed;
			background: white;
			bottom: 0;
			padding-bottom: env(safe-area-inset-bottom);
			display: flex;
			width: 100%;
			justify-content: center;
			align-items: center;
			height: 100rpx;
			left: 0;
			border-top: 1px solid #e4e4e4;
			z-index: 2;
		}

		.top {
			position: fixed;
			bottom: calc(env(safe-area-inset-bottom) + 120rpx);
			z-index: 100;

			.button-list {
				// display: flex;

				width: 100%;
				margin: auto;

				.share {
					// #ifndef MP-WEIXIN
					background-color: #06c160;
					border-color: #06c160;

					// #endif
					/deep/ .cl-button {
						background-color: #06c160;
						border-color: #06c160;
					}
				}

				/deep/ .cl-button {

					margin: 20rpx;
					text-align: center;
					width: calc(100% - 40rpx);
					border-radius: 128rpx;

				}

				/deep/ .cl-button::after {
					border-radius: 128rpx;
				}
			}

			.mask-top {
				padding: 40rpx;

				width: calc(100% - 80rpx);

				.text-one {
					color: black;
					text-indent: 2em;
					margin-bottom: 10px;
					line-height: 22px;
				}


			}
		}



		.mask {
			filter: blur(9px);
			user-select: none;
			width: 100%;
			z-index: 99;
			height: 100%;

		}

		.mask::after {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			content: '';
			display: block;
			background: rgba(255, 253, 253, 0.2);
		}

		/deep/ .cl-popup__wrapper .cl-popup {
			background-color: transparent !important;
		}

		/deep/ .cl-popup__wrapper {
			z-index: 9999;
		}

		.content {
			padding: 20rpx;
			display: flex;
			flex-direction: column;

			.small-title {
				display: flex;
				justify-content: space-between;
			}

			.card:last-child {
				// padding-bottom: calc(env(safe-area-inset-bottom) + 100rpx);
			}

			.score {
				background: #acbdcd;
				box-shadow: 0px 0px 7px #afafaf;

				.one {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.one-text {
					display: flex;
					flex-direction: column;


					/deep/ .cl-button {
						background-color: rgba(0, 0, 0, 0) !important;
					}

				}
			}
		}

		.echarts {
			width: 100%;
			height: 100%;
		}

		.echarts-line {
			height: 100rpx;
		}
	}
</style>
