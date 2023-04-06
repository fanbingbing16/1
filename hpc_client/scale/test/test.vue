<template>
	<view class="test">
		<cl-toast ref="toast" position="middle"></cl-toast>
		<!-- <cl-topbar :title="title" background-color="#FFFFFF" color="#282828" :border="false">
		</cl-topbar> -->
		<Tapbar :title="title" :back="back"></Tapbar>
		<cl-dialog title="故事" :visible.sync="visible"
			v-if="topic[currentPage-1]&&topic[currentPage-1].node.stAction&&topic[currentPage-1].node.stAction.tale">
			<text>{{topic[currentPage-1].node.stAction.tale}}</text>
		</cl-dialog>
		<view class="content">
			<view class="header">
				<!-- <cl-tag>{{currentPage}}/{{total}}</cl-tag> -->
				<view class="tag">
					<cl-text :value="currentPage<=9?('0'+currentPage):currentPage" color="black" bold :size="60">
					</cl-text>
					<cl-text :value="'/'+total" color="#b3b3b3"></cl-text>
				</view>
				<cl-button
					v-if="topic[currentPage-1]&&topic[currentPage-1].node.stAction&&topic[currentPage-1].node.stAction.tale"
					@click="visible=true">故事</cl-button>
			</view>

			<cl-progress :value="Math.floor(currentPage/total*100)" color="linear-gradient(270deg,#83a0cb,#d9e2ef)">
			</cl-progress>
			<text class="title" v-if="topic[currentPage-1]?topic[currentPage-1].node.stname.indexOf('images')===-1:''"
				:animation="animationData">{{topic[currentPage-1]?topic[currentPage-1].node.stname:''}}</text>
			<view v-if="testTip&&testTip[title]" :animation="animationData">
				<view v-for="(tip,index) in testTip[title]" :key="index">
					<cl-text :value="tip.tip||''" v-if="currentPage>=tip.min&&currentPage<=tip.max"></cl-text>
				</view>
			</view>

			<image class="title title-image"
				v-if="topic[currentPage-1]?topic[currentPage-1].node.stname.indexOf('images')>-1:''"
				:src="getUrl(currentPage-1,false)" mode="widthFix" :animation="animationData"></image>
			<image class="title title-image" v-if="topic[currentPage-1]&&topic[currentPage-1].node.stImg"
				:src="topic[currentPage-1].node.stImg" mode="widthFix" :animation="animationData"></image>
			<view class="options" :animation="animationData"
				v-if="getStidOption().length>0?(getStidOption()[0].node.content.indexOf('images')===-1):true">
				<view :class="{option:true,optionBac:!getNumberInput(item.node.content)}"
					v-for="(item,index) in getStidOption()" :key="index" @click="optionClick(item)"
					:style="{border:!getNumberInput(item.node.content)?(checkScaleItem[currentPage]&&checkScaleItem[currentPage].optionId===item.node.id?'2px solid  #b5c6e0':'2px solid  #fff'):''}">
					<text v-if="!getNumberInput(item.node.content)">{{item.node.content}}</text>

					<view v-for="(numberInput,indexNumber) in getNumberInput(item.node.content)" :key="indexNumber">

						<cl-input type="number" v-model="checkScaleItem[currentPage]['number'][indexNumber]"
							@input="inputChange($event,indexNumber)"></cl-input>
						<cl-text :value="numberInput.text" :ellipsis="1"></cl-text>
					</view>

				</view>
			</view>
			<view class="options-image" v-else :animation="animationData">
				<view class="option-image" v-for="(item,index) in getStidOption()" :key="index"
					@click="optionClick(item)"
					:style="checkScaleItem[currentPage]&&(checkScaleItem[currentPage].optionId===item.node.id)?'border: 2px solid #ddd;':''">
					<text>{{english[index]}}、</text>
					<!-- <image mode="widthFix" :src="baseSev.cdn + '/lb/st/images/'+(currentPage-1)+'_'+index+'.png'">
					</image> -->
					<image mode="widthFix" :src="getUrl(currentPage-1,true,item.node.snum)">
					</image>
				</view>
			</view>
			<view class="footer-button">
				<cl-button class="before" shadow @click="changePage(currentPage - 1)" v-if="currentPage>1">上一题
				</cl-button>
				<cl-button class="before" shadow @click="changePage(currentPage + 1)"
					v-if="(!lbItemData.advanceSubmit?currentPage!==total:false)&&!lbItemData.advanceSubmit">
					下一题
				</cl-button>
				<cl-button class="before" shadow @click="onSubmit"
					v-if="(getCheckScaleItemLength()===total&&(!lbItemData.advanceSubmit?currentPage===total:true))||(currentPage!==1&&lbItemData.advanceSubmit)">
					提交
				</cl-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		request
	} from '@/components/comm/request'
	import {
		baseSev
	} from '@/components/comm/base'
	import Tapbar from "@/pages/commVue/topbar.vue"
	import testTip from "@/tsjsFiles/report/testTip"
	import imgUrl from '../../tsjsFiles/report/imgUrl'
	export default {
		onLoad: function(option) {
			this.lbItemData = option
			this.title = this.lbItemData.scaleName
			this.getUserRecord()

		},
		components: {
			Tapbar
		},
		created() {


		},
		data() {
			return {
				testTip,
				visible: false,
				english: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
				baseSev,
				title: '某量表',
				loading: true,
				lbItemData: {},
				currentPage: 1,
				total: 3,
				listData: [],
				//总分数
				scores: 0,
				topic: [],
				options: [],
				stidOptions: {},
				complate: false,
				checkScaleItem: {},
				animationData: {},
				animation: null,
			}
		},
		onShareAppMessage() {
			return {
				imageUrl: ""
			}
		},
		onShareTimeline() {
			return {
				imageUrl: ''
			}
		},
		methods: {
			inputChange(e, index) {
				this.checkScaleItem[this.currentPage]['number'][index] = e
				this.checkScaleItem[this.currentPage].optionId = ''
				this.checkScaleItem[this.currentPage].score = '0'
			},
			getNumberInput(str) {
				const reg = /(.*)[【][$][^【】].*[】](.*)/

				if (!reg.test(str)) {
					return false
				} else {
					if (this.checkScaleItem[this.currentPage])
						this.checkScaleItem[this.currentPage]['number'] = this.checkScaleItem[this.currentPage][
							'number'
						] || ['', '']
					else {
						this.$set(this.checkScaleItem, this.currentPage, {})
						this.$set(this.checkScaleItem[this.currentPage], 'number', ['', ''])
					}
					if (reg.test(reg.exec(str)?. [1])) {

						return [{
								text: reg.exec(reg.exec(str)?. [1])?. [2],
								id: new Date().getTime() + 1
							},
							{
								text: reg.exec(str)?. [2],
								id: new Date().getTime() + 2
							}
						]
					} else {
						return [{
							text: reg.exec(str)?. [2],
							id: new Date().getTime()
						}]
					}
				}
			},
			back() {
				uni.showModal({
					title: '确定离开当前页面吗？',
					success: (res) => {
						if (res.confirm) {
							const pages = getCurrentPages()
							if (pages.length > 1) {
								uni.navigateBack()
							} else {
								uni.switchTab({
									url: '/pages/index/index'
								})
							}

						}
					}
				})
			},
			getUrl(page, notTitle, sunm) {
				console.log(sunm, 'sunm')
				return baseSev.cdn + '/lb/st/' +
					imgUrl[this.title] +
					'/' + (this.currentPage - 1) + (notTitle ? ('_' + (+sunm - 1)) : '') +
					'.png'
			},
			getStidOption() {

				return this.stidOptions[this.topic?. [this.currentPage - 1]?.node?.id] || []
			},
			getCheckScaleItemLength() {
				return Object.keys(this.checkScaleItem).length
			},
			getUserRecord() {
				request({
					url: '/userRecord/findOne/' + this.lbItemData.recordId,
				}).then(userRecord => {
					this.checkScaleItem = userRecord?.data?.collectJson?.checkScaleItem || {}
					Object.keys(this.checkScaleItem).map(page => {
						this.currentPage = Math.max(this.currentPage, +page)
					})

					this.getTopList()
				}).catch(err => {
					console.log(err, 'err')
					this.getTopList()
				})
			},
			getTopList() {

				request({
					url: '/lbst',
					data: {
						lbid_eq: this.lbItemData.scaleId
					}
				}).then(resolve => {

					this.topic = resolve?.data?.edges || []
					this.total = resolve?.data?.aggregate?.count
					this.topic = this.topic.sort((a, b) => {
						return a.node.sernum - b.node.sernum
					})
					if (this.title === 'CBCL儿童行为量表') {
						this.total = this.topic.length
					}

					this.getXXList()

				}).catch(err => {
					console.log(err, 'err')
					this.$refs['toast']?.open({
						message: err.data?.message
					})
				})
			},
			getXXList() {
				request({
					url: '/lbXx',
					data: {
						lbid_eq: this.lbItemData.scaleId,
					}
				}).then(resolve => {
					this.stidOptions = {}
					this.options = resolve.data?.edges
					const optionsFu = this.options.filter(option => {
						return option
					})
					this.options.map(option => {
						this.stidOptions[option.node.stid] = this.stidOptions[option.node.stid] || []
						this.stidOptions[option.node.stid].push(option)
						// if (option.node.snum) {
						// 	this.stidOptions[option.node.stid] = this.stidOptions[option.node.stid].sort((
						// 		a, b) => +a.node.snum - +b.node.snum)
						// }
					})
					if (this.stidOptions[-1]) {
						this.topic.map(top => {

							if (!this.stidOptions[top.node.id]) {
								this.stidOptions[top.node.id] = []
								this.stidOptions[-1].map(fu => {

									if (fu.node.evatype === top.node.anstype || fu.node.evatype ===
										top.node.evatype) {
										this.stidOptions[top.node.id].push(fu)
									} else if (!fu.node.evatype) {
										this.stidOptions[top.node.id].push(fu)
									}
								})
							}
						})
					}

					this.getStidOption()
				}).catch(err => {
					console.log(err, 'err')
				})
			},
			xxList() {
				return stidOptions
			},
			changePage(page) {
				console.log(page, 'page')
				if (!this.animation) {
					this.animation = uni.createAnimation({
						timingFunction: 'linear',
						duration: 300
					})
				}
				let startDate = new Date()
				if (this.currentPage < this.total && page !== 1) {

					// 动画：左出右进
					this.animation.translateX('-100%').step({
							duration: 40
						})
						.opacity(0).step({
							duration: 40
						})
						.translateX('100%').step({
							duration: 40
						})
						.translateX(0).opacity(1).step()
					// 为避免uniapp动画只有第一次生效，必须延迟删除动画实例数据
					this.animationData = this.animation.export()
				}
				setTimeout(() => {

					this.animationData = {}
				}, 350)

				this.currentPage = page
				if (this.currentPage > this.total)
					this.currentPage = this.total
				else if (this.currentPage < 1)
					this.currentPage = 1;

			},
			optionClick(item) {
				console.log(this.checkScaleItem, 'che')
				if (this.getNumberInput(item.node.content)) {
					return
				}

				const onlyXXEvatype = ['婴儿过敏风险评估表（最终版）'].indexOf(this.title) > -1
				const onlyStEvatype = ['长处与困难问卷(SDQ)', '3~7岁儿童气质量表', '多发性抽动症综合量表(TSGS)', '功能缺陷量表(WFIRS-P)', '汉语沟通发展量表（短表）']
					.indexOf(this
						.title) > -1
				const noneType = ['克氏孤独症行为量表', , '考试焦虑量表'].indexOf(this.title) > -1
				const onlyStdetail = ['CBCL儿童行为量表'].indexOf(this.title) > -1
				const hasContent = ['改良婴幼儿孤独症量表中文修订（M-CHAT）'].indexOf(this.title) > -1
				if (this.checkScaleItem[this.currentPage]) {
					this.checkScaleItem[this.currentPage] = {
						stid: this.stidOptions?. [0]?.node.stid,
						optionId: item.node.id,
						score: item.node.score,
						option: item.node.content,
					}

				} else {
					this.$set(this.checkScaleItem, this.currentPage, {
						stid: this.stidOptions?. [0]?.node.stid,
						optionId: item.node.id,
						score: item.node.score,
						option: item.node.content
					})
				}
				if (hasContent) {
					this.checkScaleItem[this.currentPage].content = item.node.content
				}
				if (noneType) {} else if (onlyStdetail) {
					this.checkScaleItem[this.currentPage].stdetail = this.topic[this.currentPage - 1].node.stdetail
					this.checkScaleItem[this.currentPage].stEvatype = this.topic[this.currentPage - 1].node.evatype
				} else if (onlyStEvatype) {
					this.checkScaleItem[this.currentPage].stEvatype = this.topic[this.currentPage - 1].node.evatype
				} else if (onlyXXEvatype) {
					this.checkScaleItem[this.currentPage].xxEvatype = item.node.evatype
				} else {
					if (this.topic[this.currentPage - 1].node.evatype)
						this.checkScaleItem[this.currentPage].stEvatype = this.topic[this.currentPage - 1].node.evatype
					if (item.node.evatype)
						this.checkScaleItem[this.currentPage].xxEvatype = item.node.evatype
					if (this.topic[this.currentPage - 1].node.anstype)
						this.checkScaleItem[this.currentPage].anstype = this.topic[this.currentPage - 1].node.anstype
				}
				uni.setStorage({
					key: 'userRecord',
					data: {
						collectJson: JSON.stringify({
							checkScaleItem: this.checkScaleItem,
							testDate: new Date()
						}),
						id: this.lbItemData.recordId,
					}
				})
				if (this.currentPage % 5 === 0) {
					request({
						url: '/userRecord/stagingUserRecord',
						data: {
							collectJson: JSON.stringify({
								checkScaleItem: this.checkScaleItem,
								testDate: new Date(),
							}),
							id: this.lbItemData.recordId,
						},

						method: 'POST'
					}).then(res => {
						console.log(res, 'res stagingUserRecord')
					})
				}
				if (this.lbItemData.scaleName === '社会交往问卷-Lifttime(SCQ)' && this.currentPage === 1 && this.checkScaleItem[
						1]?.optionId === '7056') {
					this.checkScaleItem[2] = {
						optionId: '',
						score: 0
					}
					this.checkScaleItem[3] = {
						optionId: '',
						score: 0
					}
					this.checkScaleItem[4] = {
						optionId: '',
						score: 0
					}
					this.checkScaleItem[5] = {
						optionId: '',
						score: 0
					}
					this.checkScaleItem[6] = {
						optionId: '',
						score: 0
					}
					this.checkScaleItem[7] = {
						optionId: '',
						score: 0
					}
					this.currentPage = 7
				}
				setTimeout(() => {
					if (this.checkScaleItem[this.currentPage]) {
						this.changePage(this.currentPage + 1)
					}
				}, 500)


			},
			onSubmit() {
				let lastPass
				if (this.title === '婴儿-初中学生社会生活能力量表') {
					let lastIndex
					let noData = []
					let passData = []
					let err = false

					for (const page in this.checkScaleItem) {
						if (lastIndex && lastIndex !== +page - 1) {
							err = true
							this.$refs['toast']?.open({
								message: `在${lastIndex}和${page}中间有未选择的题目`
							})
						}

						if (this.checkScaleItem[page].score === '0' && (noData.length === 0 || noData.slice(-1)[0].page ===
								lastIndex)) {

							noData.push({
								...this.checkScaleItem[page],
								page: +page
							})
						} else if (this.checkScaleItem[page].score === '0' && noData.slice(-1)[0].page !== lastIndex &&
							noData.length < 10) {
							noData = []
							noData.push({
								...this.checkScaleItem[page],
								page: +page
							})
						} else if (this.checkScaleItem[page].score === '1' && (passData.length === 0 || passData.slice(-1)[
								0].page === lastIndex)) {
							lastPass = +page
							passData.push({
								...this.checkScaleItem[page],
								page: +page
							})
						} else if (this.checkScaleItem[page].score === '1' && passData.slice(-1)[0].page !== lastIndex &&
							passData.length < 10) {
							lastPass = +page
							passData = []
							passData.push({
								...this.checkScaleItem[page],
								page: +page
							})
						}
						lastIndex = +page
					}

					if (lastIndex < this.total - 10) {
						if (noData.length < 10) {
							err = true
							this.$refs['toast']?.open({
								message: `需要有连续十个未通过的项目`
							})
						} else if (passData.length < 10) {
							err = true
							this.$refs['toast']?.open({
								message: `需要有连续十个通过的项目`
							})
						}
					}

					if (err) {
						return
					}
				}
				if (!this.checkScaleItem[this.total] && !this.lbItemData.advanceSubmit) {
					this.$refs['toast']?.open({
						message: `第${this.total}题未填写`
					})
				}
				request({
					url: '/userRecord/submitUserRecord',
					method: 'POST',
					data: {
						id: this.lbItemData.recordId,
						collectJson: JSON.stringify({
							checkScaleItem: this.checkScaleItem,
							testDate: new Date(),
							lastPass
						})
					}
				}).then((resolve) => {

					this.$refs['toast']?.open({
						message: '正在生成报告'
					})
					setTimeout(() => {
						uni.redirectTo({
							url: '/scale/test/report?id=' + this.lbItemData.recordId
						})
					}, 1000)

				}).catch((err) => {
					this.$refs['toast']?.open({
						message: err.data?.message || err.data?.data?.msg
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.test {
		width: 100%;
		height: 100%;

		.content {
			width: calc(100% - 40px);
			margin: 20px;

			/deep/.cl-progress-bar__inner {
				background: linear-gradient(270deg, #83a0cb, #d9e2ef);
			}

			.header {
				display: flex;
				justify-content: space-between;
			}

			.footer-button {
				width: 100%;
				text-align: center;

				.before {
					width: 160rpx;
					height: 160rpx;
					// #ifndef MP-WEIXIN
					background: hsla(0, 0%, 100%, 0.5);
					// #endif
					box-shadow: 0 0 60rpx 0 rgba(0, 0, 0, 0.04);
					border: 4rpx solid #eee;
					margin: 60rpx auto 0;
					text-align: center;

					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;

					line-height: 160rpx;
					border-radius: 50%;

					/deep/ .cl-button {
						width: 160rpx;
						height: 160rpx;
						background: hsla(0, 0%, 100%, 0.5);
						box-shadow: 0 0 60rpx 0 rgba(0, 0, 0, 0.04);
						border: 4rpx solid #eee;
						margin: 60rpx auto 0;
						text-align: center;

						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;

						line-height: 160rpx;
						border-radius: 50%;
					}

					/deep/ .cl-button__text {

						font-size: 14px;
						color: #7d7e80;
					}
				}

				.before:after {
					width: 0;
					height: 0;
				}
			}

			.options-image {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				margin-top: 20px;
				justify-content: space-between;

				.option-image {
					width: 30%;
					display: flex;
					margin-top: 10px;
				}
			}

			.options {
				width: 100%;
				display: flex;
				flex-direction: column;

				.optionBac {
					background: hsla(0, 0%, 100%, .2);
					box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.04);
				}

				.option {
					width: 100%;
					min-height: 88rpx;
					margin-top: 40rpx;
					text-align: center;
					display: flex;
					border-radius: 12rpx;
					// background: hsla(0, 0%, 100%, .2);
					// box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.04);
					align-items: center;
					justify-content: center;
					box-sizing: border-box;

					text {
						font-size: 14px;
						color: #7d7e80;
					}
				}
			}

			/deep/ .cl-progress {
				margin-top: 20rpx;
			}

			.title {

				font-size: 18px;
				display: block;
				font-weight: 600;
				margin: 40rpx 0;
			}

			.title-image {
				width: 60%;
				margin: auto;
			}
		}
	}
</style>
