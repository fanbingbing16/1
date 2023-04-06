<template>
	<view class="page-consultation">
		<view class="header">
			<view class="select" v-for="(headerSelect,index) in headerSelects" :key="index" @click="clickHeader(index)">
				<cl-select v-model="headerSelect.selectText" :options="headerSelect.list"
					v-if="headerSelect.type==='select'" @confirm="selectConfirm($event,headerSelect)" @cancel="cancel"
					:placeholder="headerSelect.text">
				</cl-select>
				<cl-text :value="headerSelect.text"
					:color="(headerSelect.isClick||headerSelect.hasSelect)?'#171d33':'#7d7e82'" v-else>
				</cl-text>
				<cl-icon name="cl-icon-caret-bottom" v-if="!headerSelect.isClick"
					:color="headerSelect.isClick?'#171d33':'#7d7e82'"
					:class="{'select-icon':headerSelect.type==='select'}">
				</cl-icon>
				<cl-icon name="cl-icon-caret-top" v-else :color="headerSelect.isClick?'#171d33':'#7d7e82'"
					:class="{'select-icon':headerSelect.type==='select'}"></cl-icon>
			</view>
			<!-- <image mode="aspectFill" src="/static/icon/consultation/upload.png" style="height: 32rpx;width: 32rpx;">
			</image> -->
		</view>
		<template v-for="(headerSelect,index) in headerSelects" class="select-mutile-one">

			<view class="select-mutile" :key="index" v-if="headerSelect.type==='mutileSelect'&&headerSelect.isClick">
				<view class="one-select" v-for="(select,indexSelect) in headerSelect.select" :key="indexSelect">
					<view class="title">
						{{select.title}}
						<cl-text v-if="select.smallTitle" :value="select.smallTitle" color="rgb(167 167 167)"></cl-text>
					</view>

					<view class="content-select">
						<template v-if="select.type==='date'">
							<view class="content-one-date" v-for="(selectOne,indexSelectOne) in select.select"
								:key="indexSelectOne" @click="clickSelect(selectOne,index,indexSelect,indexSelectOne)"
								:style="'background:'+(select.selected.indexOf(selectOne)>-1?'#151a2e;':'')">

								<cl-text :value="selectOne.split('-')[1]+'月'"
									:color="select.selected.indexOf(selectOne)>-1?'#fff':'rgb(167 167 167)'">
								</cl-text>
								<cl-text :value="selectOne.split('-')[2]" :size="30" bold
									:color="select.selected.indexOf(selectOne)>-1?'#fff':''"></cl-text>
								<cl-text :value="select.date[indexSelectOne]"
									:color="select.selected.indexOf(selectOne)>-1?'#fff':''"></cl-text>

							</view>
						</template>
						<template v-else>
							<view class="content-select-one" v-for="(selectOne,indexSelectOne) in select.select"
								:key="indexSelectOne" @click="clickSelect(selectOne,index,indexSelect,indexSelectOne)"
								:style="'background:'+(select.selected===selectOne?'#151a2e;':'')">
								<cl-text :value="selectOne" :color="select.selected===selectOne?'#fff':''"></cl-text>
							</view>
						</template>
					</view>

				</view>
				<view class="select-footer">
					<cl-button class="full" @click="reset">重置</cl-button>
					<cl-button class="full" type="primary" @click="confirmSelect">确定</cl-button>
				</view>
			</view>

		</template>
		<view v-for="(consultation,index) in consultations" :key="index" @click="goToDetail(consultation)">
			<view class="consultation">
				<view class="expert-item--container">
					<view class="expert-item-icon overflowVisible">
						<image mode="aspectFill" :src="consultation.image" alt="" class="avator" />

						<image src="https://jdxl-img.jdxlt.com/uploads/de7dda27f0984f4d81b4bfabaaae0748.png" alt=""
							class="annual-audit" />
					</view>
					<view class="expert-item-inner mobileStyle">
						<view class="expert-item-header">
							<view class="name-wrapper"><text class="expert-name">{{consultation.name}}</text>
								<image src="//jdxl-img.jdxlt.com/uploads/18b526eed1564f8e98c0c95032fb6fa2.png" alt=""
									class="tagimage">
							</view>

							<view class="expert-address">
								<text class="address-text">
									{{consultation.address}}
								</text>
							</view>
						</view>
						<view class="expert-item--info">
							<view class="experience">
								{{consultation.experience}}
							</view>
							<text class="expert-item-introduction j-text-width-scope-2">
								{{consultation.introduce}}
							</text>

						</view>
						<text class="expert-price">
							{{consultation.price}}
						</text>
					</view>
				</view>

			</view>

			<view class="bgFFF">
				<view class="geryLine"></view>
			</view>
		</view>
		<cl-button @click="test"></cl-button>
		<view class="bgc" v-if="hasClick"></view>
	</view>
</template>

<script>
	import {
		ConsultDoctorStatus
	} from '@/components/comm/allCfg'
	import {
		request
	} from '@/components/comm/request'
	import {
		city
	} from '@/tsjsFiles/api/city'
	export default {
		data() {
			return {
				search: {},
				hasClick: false,
				headerSelects: [{
					text: '城市',
					isClick: false,
					selectText: '城市',
					clickFun: '',
					type: 'select',
					hasSelect: false,
					list: [],
					id: 0
				}, {
					text: '困扰',
					isClick: false,
					selectText: '困扰',
					hasSelect: false,
					clickFun: '',
					id: 1
				}, {
					text: '价格',
					isClick: false,
					selectText: '价格',
					hasSelect: false,
					clickFun: '',
					type: 'select',
					id: 2,
					list: [{
							label: '由大到小',
							value: 'DESC'
						},
						{
							label: '由小到大',
							value: '1'
						}
					]
				}, {
					text: '更多',
					id: 3,
					isClick: false,
					selectText: '更多',
					hasSelect: false,
					type: 'mutileSelect',
					select: [{
							title: '咨询师性别',
							selected: '不限',
							select: ['不限', '男咨询师', '女咨询师'],
							default: '不限'
						},
						// {
						// 	title: '咨询时段',
						// 	smallTitle: '(可多选)',
						// 	type: 'date',
						// 	date: [],
						// 	selected: [],
						// 	select: ['', '', ''],
						// 	default: []

						// },
						// {
						// 	title: '可选时间',
						// 	selected: '全天',
						// 	select: ['全天', '上午', '下午'],
						// 	default: '全天'
						// }
					],
					clickFun: ''
				}],
				consultations: [{
					id: 1,
					image: 'https://consultation-1251943848.jiandanxinli.com/avatar/6051eb99-c107-4aaf-b095-3ce9378f12fc.png?imageMogr2/thumbnail/400x',
					name: '小小',
					experience: '1000+小时经验',
					price: '100元/次',
					introduce: '我是一个很有经验的咨询师，都来找我吧，我会帮助年迈解决问题的',
					address: '厦门市 思明区',
					tag: '新手'
				}, {
					id: 2,
					image: 'https://consultation-1251943848.jiandanxinli.com/avatar/6051eb99-c107-4aaf-b095-3ce9378f12fc.png?imageMogr2/thumbnail/400x',
					name: '小小',
					experience: '1000+小时经验',
					price: '100元/次',
					introduce: '我是一个很有经验的咨询师，都来找我吧，我会帮助年迈解决问题的',
					address: '厦门市 思明区',
					tag: '新手'
				}, {
					id: 3,
					image: 'https://consultation-1251943848.jiandanxinli.com/avatar/6051eb99-c107-4aaf-b095-3ce9378f12fc.png?imageMogr2/thumbnail/400x',
					name: '小小',
					experience: '1000+小时经验',
					price: '500元/次',
					introduce: '我是一个很有经验的咨询师，都来找我吧，我会帮助年迈解决问题的.快来快啦哦，快来预约我哦，快点来吧，快点来哦，赶紧来哦，来来来啊来啊来来来来来来来来',
					address: '厦门市 思明区',
					tag: '新手'
				}]
			}
		},
		created() {
			city.then(res => {
				this.headerSelects[0].list = res.data
			})
			console.log(this.moment(new Date()).format('YYYY-MM-DD'), 'YYYY/MM/DD', this.moment().add(1, 'days').format(
				'YYYY-MM-DD'))

			// this.headerSelects[3].select[1].select = [
			// 	this.moment(new Date()).format('YYYY-MM-DD'),
			// 	this.moment().add(1, 'days').format('YYYY-MM-DD'),
			// 	this.moment().add(2, 'days').format('YYYY-MM-DD'),
			// 	this.moment().add(3, 'days').format('YYYY-MM-DD'),
			// 	this.moment().add(4, 'days').format('YYYY-MM-DD'),
			// 	this.moment().add(5, 'days').format('YYYY-MM-DD'),
			// 	this.moment().add(6, 'days').format('YYYY-MM-DD')
			// ]
			// this.headerSelects[3].select[1].date = [
			// 	this.moment().format('ddd'),
			// 	this.moment().add(1, 'days').format('ddd'),
			// 	this.moment().add(2, 'days').format('ddd'),
			// 	this.moment().add(3, 'days').format('ddd'),
			// 	this.moment().add(4, 'days').format('ddd'),
			// 	this.moment().add(5, 'days').format('ddd'),
			// 	this.moment().add(6, 'days').format('ddd')
			// ]
			console.log(this.headerSelects, 'header selecy')
			this.searchDoctor()
		},
		methods: {

			searchDoctor() {
				request({
					url: '/consultDoctor',
					notHeader: true,
					data: {
						status_eq: ConsultDoctorStatus.ACTIVE,
						limit: 10,
						offset: 999,
						...this.search
					}
				}).then(res => {
					console.log(res, 'res')
				})
			},
			reset() {
				const clickSelect = this.headerSelects.filter(head => head.isClick)?. [0]
				this.headerSelects[clickSelect.id].select = this.headerSelects[clickSelect.id].select.map(sele => {
					sele.selected = sele.default;
					return sele
				})
			},
			clickSelect(selectOne, index, indexSelect, indexSelectOne) {
				if (typeof this.headerSelects[index].select[indexSelect].selected === 'string')
					this.headerSelects[index].select[indexSelect].selected = selectOne
				else {
					if (this.headerSelects[index].select[indexSelect].selected.indexOf(selectOne) > -1) {
						this.headerSelects[index].select[indexSelect].selected = this.headerSelects[index].select[
							indexSelect].selected.filter(sele => sele !== selectOne)
					} else {
						let selectedSet = new Set()
						this.headerSelects[index].select[indexSelect].selected.map(sele => {
							selectedSet.add(sele)
						})
						selectedSet.add(selectOne)
						this.headerSelects[index].select[indexSelect].selected = Array.from(selectedSet)
					}


				}
			},
			confirmSelect() {
				const clickSelect = this.headerSelects.filter(head => head.isClick)?. [0]
				this.headerSelects[clickSelect.id].isClick = false
				this.hasClick = false
				const hasSelect = this.headerSelects[clickSelect.id].select.some(sele => {
					if (typeof sele.selected === 'string' && sele.selected !== sele.default) {
						return true
					} else if (typeof sele.selected === 'object' && sele.selected.length > 0) {
						return true
					}
				})
				this.headerSelects[clickSelect.id].hasSelect = hasSelect

			},
			cancel() {
				console.log('cancel')
				this.headerSelects = this.headerSelects.map(item => {
					item.isClick = false;
					return item
				})
				this.hasClick = false
			},
			selectConfirm(event, headerSelect) {
				this.headerSelects[headerSelect.id].isClick = false
				this.hasClick = false
				this.headerSelects[headerSelect.id].hasSelect = true
				this.search
			},
			goToDetail(consultation) {
				uni.navigateTo({
					url: '/consultation/experts?id=' + consultation.id,
					fail(err) {
						console.log(err, 'err')
					}
				})
			},
			test() {
				uni.navigateTo({
					url: '/consultation/inputMessage'
				})
			},
			clickHeader(index) {
				console.log(this.headerSelects[index].isClick, 'this.headerSelects[index].isClick')
				if (this.headerSelects[index].isClick === true) {
					this.headerSelects[index].isClick = false
					this.hasClick = false
				} else {
					this.headerSelects = this.headerSelects.map(item => {
						item.isClick = false;
						return item
					})
					this.headerSelects[index].isClick = true
					this.hasClick = true
				}
				console.log(this.headerSelects[index].isClick, 'this.headerSelects[index].isClick after')
			}
		}
	}
</script>

<style scoped lang="scss">
	.page-consultation {
		height: 100%;
		width: 100%;

		image {
			max-width: 100%;
			vertical-align: middle;
		}

		.header {
			display: flex;
			background: #fff;
			justify-content: space-between;
			align-items: center;
			padding: 0 40rpx;
			border-bottom: 1px solid #ebebeb;



			.select {
				position: relative;
				display: flex;
				justify-content: left;
				flex-direction: row;
				font-size: 13px;
				color: #6b707f;
				text-align: center;
				padding: 20rpx 0;

				/deep/ .cl-select__icon {
					display: none;
				}

				/deep/ .cl-select {
					padding-right: 0rpx;
				}

				/deep/ .select-icon {
					line-height: 60rpx;
				}
			}
		}

		.select-mutile {
			box-sizing: border-box;
			position: fixed;
			background: #fff;
			z-index: 1000;
			width: 100%;
			padding: 40rpx;

			.select-footer {
				display: flex;
			}

			.one-select:last-child {
				margin-bottom: 0;
			}

			.one-select {
				margin-bottom: 40rpx;

				.title {
					margin-bottom: 20rpx;
				}

				.content-select {
					display: flex;

					.content-one-date {

						margin-right: 20rpx;
						border-radius: 4px;
						display: flex;
						flex-direction: column;
						align-items: center;
						// padding: 8rpx;
						width: calc(14.28% - 17rpx);
						padding-top: 8rpx;
						padding-bottom: 10rpx;
					}

					.content-one-date:last-child {
						margin-right: 0;
					}

					.content-select-one {
						margin-right: 40rpx;
						background: #fafafa;
						padding: 0 12rpx;
						border-radius: 4px;
						padding-bottom: 8rpx;
					}
				}
			}
		}

		.consultation {
			padding: 40rpx;
			display: block;
			background: #fff;

			.overflowVisible {
				overflow: visible;
			}

			.expert-item--container {
				overflow: visible;

				.expert-item-icon {
					width: 140rpx;
					height: 140rpx;
					border-radius: 50%;
					border: none !important;
					display: block;
					float: left;
					background: #eee;
					position: relative;

					.avator {
						width: 140rpx;
						height: 140rpx;
						border-radius: 50%;
					}

					.annual-audit {
						display: block;
						margin: -38rpx auto 0;
						width: 128rpx;
						height: 40rpx;
					}
				}

				.mobileStyle {
					position: relative;

					.methods {
						font-size: 10px;
						font-weight: 700;
						color: #5372a1;
						padding: 0 8rpx;
						background-color: rgba(131, 160, 203, .1);
						border-radius: 4rpx;
						line-height: 1;
						margin-left: 10rpx;
						height: 32rpx;
					}
				}

				.expert-item-inner {
					padding-left: 160rpx;

					.expert-item-header {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.expert-address {
							line-height: 48rpx;
							font-size: 12px;
							position: absolute;
							bottom: -4rpx;
							right: 0;
							display: flex;
							justify-content: flex-end;

							.address-text {
								height: 48rpx;
								font-size: 12px;
								color: #141515;
								vertical-align: middle;
								text-overflow: ellipsis;
								overflow: hidden;
								white-space: nowrap;

								span {
									display: block;
									margin: 0 0 4rpx;
									width: 100%;
									line-height: 52rpx;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;

								}
							}
						}

						.name-wrapper {
							display: flex;
							align-items: center;

							.expert-name {
								font-size: 32rpx;
								font-weight: 700;
							}

							.tagimage {
								display: block;
								margin: 0 0 0 8rpx;
								height: 26rpx;
								width: 48rpx;

							}
						}
					}

					.expert-item--info {
						font-size: 20rpx;
						color: #717373;
						line-height: 36rpx;
						max-height: 144rpx;
						overflow: hidden;

						.annual-review-div {
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							align-items: center;

							.experience {
								height: 80rpx;
								font-size: 24px;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #19191a;
								line-height: 40rpx;

								span {
									color: #7d7e80;
									font-size: 12px;
								}

							}
						}

						.expert-item-introduction {
							margin-top: 6rpx;
							font-size: 24rpx;

						}

						.j-text-width-scope-2 {
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							line-clamp: 2;
							-webkit-line-clamp: 2;
							word-break: break-all;
						}
					}

					.expert-price {
						font-size: 12px;
						color: #e64d4d;
						display: block;
						font-weight: 700;
						margin-top: 10rpx;
					}
				}

			}


		}

		.bgFFF {
			background-color: #fff;

			.geryLine {
				margin: 0 0 0 40rpx;
				height: 2rpx;
				background-color: #f1f1f1;
			}
		}

		.bgc {
			background: #0000004d;
			position: fixed;
			z-index: 999;
			width: 100%;

			height: calc(100% - 300rpx);
			top: 200rpx;
		}
	}
</style>
