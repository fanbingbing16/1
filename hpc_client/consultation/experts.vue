<template>
	<view class="page-experts">
		<cl-topbar title="预约咨询师"></cl-topbar>
		<view class="card-people">
			<cl-dialog :visible.sync="cardVisible" :showCloseBtn="true" width="90%" close-on-click-modal>
				<bussiness-card></bussiness-card>
			</cl-dialog>
		</view>


		<view style="overflow-y: scroll;height: calc(100% - 190rpx);">
			<view loading-status="COMPLETE" class="baseInfo">
				<view class="banner">
					<view class="banner-child">
						<view class="swiper-container carousel swiper-initialized swiper-horizontal swiper-ios">
							<view class="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px);">
								<view class="recommand-carousel swiper-slide swiper-slide-active">
									<view class="carousel-item">
										<image
											src="//jdxl-img.jdxlt.com/avatar/3b10d99a9daa47252242ddfc864dd93f.jpeg_w400"
											alt="" class="centerimage" mode="aspectFill" />

									</view>
								</view>
							</view>
							<view
								class="swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal swiper-pagination-lock"
								style="bottom:15px;">
								<text class="swiper-pagination-bullet swiper-pagination-bullet-active"></text>
							</view>
							<text class="swiper-notification"></text>
						</view>

					</view>
				</view>
				<view class="top-content">
					<view class="content-wrapper">
						<view class="content-name-wrapper">
							<view class="name-left"><text class="i-am">我是</text>
								<text class="name">{{consultation.name}}</text>
							</view>
							<view class="content-card" @click="cardVisible = true">
								<!-- <image src="//jdxl-img.jdxlt.com/uploads/25ddab157e794455a6ddf0ed8f285dea.png" alt="" /> -->
								<text>名片</text>
							</view>
						</view>
					</view>
					<view class="identity-information">
						<!-- <image src="//jdxl-img.jdxlt.com/uploads/a94b31aceb484215b58f34349911ed56.png" alt=""
							class="identity-icon" /> -->
						<view class="identity-icon">成熟咨询师</view>
						<view class="price-wrapper">
							<text class="price-text">{{consultation.appointPrice }}</text>
							<text class="price-unit">/次</text>
						</view>
						<view class="identity-tips-view">
							<view class="identity-tips marginBottom4"><text>
									<image src="//jdxl-img.jdxlt.com/uploads/52995cc482e64c4cb4cd13e118122125.png"
										alt="" />9项胜任力评估
								</text>
								<text>
									<image src="//jdxl-img.jdxlt.com/uploads/52995cc482e64c4cb4cd13e118122125.png"
										alt="" />甄选Top1%师资
								</text>
								<text>
									<image src="//jdxl-img.jdxlt.com/uploads/52995cc482e64c4cb4cd13e118122125.png"
										alt="">服务80万+人次
								</text>
							</view>
							<view class="identity-tips"><text>
									<image src="//jdxl-img.jdxlt.com/uploads/52995cc482e64c4cb4cd13e118122125.png"
										alt="" />系统保障隐私
								</text>
								<text>
									<image src="//jdxl-img.jdxlt.com/uploads/52995cc482e64c4cb4cd13e118122125.png"
										alt="" />持续专业年审
								</text>
								<text>
									<image src="//jdxl-img.jdxlt.com/uploads/52995cc482e64c4cb4cd13e118122125.png"
										alt="" />执业保险保障
								</text>
							</view>
						</view>
						<view class="identity-tips-line"></view>
						<image src="//jdxl-img.jdxlt.com/uploads/8ae47dcb971444b49d7e6386f5360890.png" alt=""
							class="bg-icon">
							<view>
								<view class="consulting-information">
									<view class="text-wrapper"><text class="info"
											style="color:#E5B648;font-weight:bold;">{{consultation.serviceTime}}年</text>
										<text class="text">经验</text>
									</view>
									<view class="line"></view>
									<view class="text-wrapper"><text class="info year-margin"
											style="color:#E5B648;font-weight:bold;">{{consultation.employmentTime}}年</text>
										<text class="text">从业</text>
									</view>
								</view>
							</view>
					</view>
					<view class="bottom-line-wrapper">
						<view class="bottom-line-view">
							<!-- 	<image src="//jdxl-img.jdxlt.com/uploads/9d976a67e6df44bf94b9081bc0b4fd61.png"
								class="bpttom-line-icon" alt="" /> -->
							<view class="bottom-line-icon"></view>
						</view>
					</view>
					<view class="local-wrapper">
						<view class="local-info">
							<image src="//jdxl-img.jdxlt.com/uploads/95db867cb5f748e08f1e4c9d900fb257.png" alt=""
								class="local-icon" />
							<text class="local-text">{{consultation.address}}</text>
						</view>
						<view class="order-time-info">
							<view class="line"></view> <text class="order-time">查看可约时间</text>
							<image src="//jdxl-img.jdxlt.com/uploads/027c63da53114678b0028dd144219eeb.png" alt=""
								class="arrow" />
						</view>
					</view>
					<view class="gray-line"></view>
				</view>
			</view>
			<view class="card">
				<view class="card-title">
					个人简介
				</view>
				<view class="card-content">
					<text v-for="(personal,index) in consultation.personalProfile.split('/n')" :key="index">
						{{personal}}
					</text>
				</view>
			</view>
			<view class="card">
				<view class="card-title">
					我的擅长
				</view>
				<view class="card-content">
					<text>123当今国师缝合怪</text>
					<text>123当今国师缝合怪</text>
					<text>123当今国师缝合怪,dhsjfgsd金德开搞讽德诵功氪金获得复活的防护服的反馈还繁华，的接口很多废话电饭锅和。</text>
				</view>
			</view>
			<view class="card">
				<view class="card-title">
					我的专业受训
				</view>
				<view class="card-content">
					<text>123当今国师缝合怪</text>
					<text>123当今国师缝合怪</text>
					<text>123当今国师缝合怪,dhsjfgsd金德开搞讽德诵功氪金获得复活的防护服的反馈还繁华，的接口很多废话电饭锅和。</text>
				</view>
			</view>
			<view class="give-message">
				<view class="message-title">
					<image src="//jdxl-img.jdxlt.com/avatar/3b10d99a9daa47252242ddfc864dd93f.jpeg_w400" alt=""
						class="centerimage" mode="aspectFill" />
					<view class="title-line">
						<view class="line-one">
							<view class="message-line"></view>
						</view>

						<text class="line-text">咨询师寄语</text>
					</view>

				</view>
				<view class="message-content">
					<text>工作很好很好好女孩好女孩怀念和怀念和
						很好呵呵，基金会哈哈哈呵呵呵后悔当初的u互动活动，很简单赶时间的话获得丰厚，吉安市的即刻前往华人教会，却为何如今开个会是vi可否让刘文贵妃。</text>
				</view>
			</view>
		</view>

		<view class="p-expert-btns">
			<view class="reservation-status">
			</view>
			<view class="c-bottom-button">
				<view class="bottom-btns">
					<view>
						<text class="feedback">
							<cl-icon class="feedback-iconA" name="cl-icon-like-fill" :size="40" color="red"></cl-icon>
							<text class="feedback-text" style="color: rgb(23, 29, 51);">关注</text>
						</text>
					</view>
					<view class="bottom-button--item">
						<view class="bottom-button--item-child">
							<view class="btn-wrapper btn newStyle primary">
								<text class="text1">预约咨询</text>
								<text class="text2">视频咨询</text>
							</view>
						</view>
					</view>

				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import BussinessCard from "@/consultation/experts/businessCard.vue"
	import {
		beGoodAt
	} from "@/tsjsFiles/api/beGoodAt"
	import {
		city
	} from "@/tsjsFiles/api/city"
	export default {
		components: {
			BussinessCard
		},
		data() {
			return {
				beGoodAt,
				city: [],
				id: '',
				cardVisible: false,
				consultation: {},
			}
		},
		onLoad: function(option) {
			console.log(option, 'option')
			this.id = option.id
			city.then(res => {
				this.city = res.data
				console.log(res.data,'res',this.city)
				if (option.id === 'yulan') {
					console.log('yulan',this.city)
					uni.getStorage({
						key: 'consultation',
						success: (res) => {
							console.log(res.data, 'res data')
							this.consultation = res.data
							this.consultation.address = this.consultation.address.map(address => {
								console.log(address, 'address', this.city.filter(ci => {
									console.log(ci, 'ci');
									return ci.value === address
								}))
								return this.city.filter(ci => ci.value === address)?. [0]?.label
							})
							this.consultation.address = this.consultation.address.join(',')
						}
					})
				}
			})
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.page-experts {
		height: 100%;

		.card-people {
			/deep/ .cl-popup {
				height: 80%;
			}

			/deep/ .cl-dialog__container {
				padding: 0;
				height: 100%;
			}

			/deep/ .cl-dialog {
				height: 100%;
			}

			/deep/ .cl-dialog__message {
				height: 100%;
			}
		}

		.baseInfo {
			.banner {
				position: relative;
				margin-bottom: -16px;
				background-color: #000;
				background-size: contain;
				background-attachment: fixed;

				.banner-child {
					overflow: hidden;

					.carousel {
						position: relative;
						--swiper-theme-color: #fff;

						.swiper-wrapper {
							height: 56.25vw;

							.recommand-carousel {
								width: 100%;
								position: relative;
								overflow: hidden;

								.carousel-item {
									width: 100%;
									height: 100%;

									.centerimage {
										position: absolute;
										z-index: 3;
										left: 0;
										right: 0;
										margin: 0 auto;
										width: 100%;
										height: 100%;
										object-fit: contain;
									}

									.blur {
										width: 100%;
										height: 100%;
										filter: blur(20px);
										position: absolute;
										top: 0;
										left: 0;
									}
								}
							}
						}

						.swiper-slide {
							flex-shrink: 0;
							height: 100%;
							transition-property: transform;
						}
					}

					.swiper-pagination-horizontal {
						bottom: 30rpx;
						left: 0;
						width: 100%;

						.swiper-pagination-bullet-active {
							width: 40rpx;
							border-radius: 20px;
							opacity: 1;
						}

						.swiper-pagination-bullet {
							height: 14rpx;
							background-color: #fff;
						}
					}
				}
			}

			.top-content {
				position: relative;
				z-index: 10;
				border-radius: 20rpx 20rpx 0 0;
				background: #fff;

				.content-wrapper {
					display: flex;
					justify-content: space-between;
					width: 100%;
					border-radius: 16rpx 16rpx 0 0;
					overflow: hidden;
					position: relative;
					z-index: 5;
					padding: 33rpx 40rpx 0;
					box-sizing: border-box;

					.content-name-wrapper {
						display: flex;
						line-height: 1;
						align-items: flex-end;
						justify-content: space-between;
						width: 100%;

						.name-left {
							display: flex;
							align-items: center;

							.i-am {
								font-size: 16px;
								font-weight: 700;
								color: #19191a;
								align-self: flex-end;
								margin: 0 11rpx 0 0;
							}

							.name {
								font-size: 22px;
								font-weight: 700;
								color: #19191a;
							}

							.annual-review-icon {
								height: 32rpx;
								margin-left: 16rpx;
								background-color: #ebebeb;
								display: flex;
								justify-content: center;
								align-items: center;
								border-radius: 10px 4px 4px 10px;
								padding: 0 12rpx 0 50rpx;
								line-height: 1;
								position: relative;

								.badge {
									width: 42rpx;
									height: 42rpx;
									position: absolute;
									left: 0;
								}

								text {
									color: #19191a;
									font-size: 12px;
								}

								.more {
									width: 20rpx;
									height: 20rpx;
								}
							}
						}

						.content-card {
							display: flex;
							align-items: center;
							align-self: center;
							border: 2rpx solid #b0b0b3;
							padding: 0 6rpx;
							border-radius: 4px;

							image {
								width: 20rpx;
								height: 20rpx;
								margin-right: 4rpx;
							}

							text {
								color: #b0b0b3;
								font-size: 22rpx;
								margin-left: 2rpx;
								line-height: 32rpx;
							}
						}
					}
				}

				.identity-information {
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					position: relative;
					border-radius: 0 16rpx 16rpx 16rpx;
					margin: 76rpx 40rpx 0;
					box-shadow: 0 0 11px 0 rgba(0, 0, 0, .06);
					min-height: 200rpx;
					background: #fff;
					z-index: 11;

					.identity-icon {
						height: 58rpx;
						position: absolute;
						top: -58rpx;
						width: 200rpx;
						background-image: linear-gradient(45deg, #f6d891, #e5ba4d);
						border-top-left-radius: 10px;
						border-top-right-radius: 8px;
						border-bottom-right-radius: 10px;
						line-height: 58rpx;
						text-align: center;
						font-size: 28rpx;
					}

					.price-wrapper {
						display: flex;
						align-items: flex-end;
						line-height: 1;
						position: absolute;
						right: 0;
						top: -40rpx;

						.price-text {
							font-size: 32rpx;
							color: #c93d3d;
							font-weight: 700;
						}

						.price-unit {
							color: #c93d3d;
							font-size: 24rpx;
						}
					}

					.annual-review-view {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;
						margin-top: 32rpx;

						.left-tips {
							height: 32rpx;
							padding: 0 14rpx;
							display: flex;
							background: linear-gradient(228deg, #424875, #171d33);
							box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .04);
							border-radius: 2px 8px 8px 2px;
							opacity: .49;
							line-height: 32rpx;
							color: #fff;
							font-size: 20rpx;
							margin-left: 20rpx;
						}
					}

					.identity-tips-view {
						margin-top: 20rpx;

						.marginBottom4 {
							margin-bottom: 8rpx;
						}

						.identity-tips {
							display: flex;
							flex-direction: row;
							justify-content: flex-start;
							align-items: center;
							margin-top: 4rpx;
							padding-left: 4rpx;
							flex-wrap: wrap;

							text {
								margin-left: 16rpx;
								height: 28rpx;
								font-size: 20rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #7d7e80;
								line-height: 28rpx;
								display: inline-flex;
								align-items: center;

								image {
									width: 20rpx;
									height: 20rpx;
									margin-right: 4rpx;
								}
							}
						}
					}

					.identity-tips-line {
						height: 2rpx;
						background: rgba(0, 0, 0, .03);
						margin: 16rpx 20rpx 0;

					}

					.bg-icon {
						height: 100%;
						position: absolute;
						z-index: -1;
						right: 0;
						top: 0;
					}

					.consulting-information {
						height: 72rpx;
						display: flex;
						align-items: center;
						padding: 0 21rpx;
						line-height: 1;
						flex-wrap: wrap;

						.text-wrapper {
							display: flex;
							align-items: flex-end;

							.info {
								color: #e5b648;
								font-size: 24rpx;
								font-weight: 700;
							}

							.text {
								color: #19191a;
								font-size: 20rpx;
								font-weight: 400;
							}
						}

						.line {
							width: 1rpx;
							height: 25rpx;
							background-color: rgba(0, 0, 0, .07);
							margin: 0 14rpx;
						}
					}
				}

				.bottom-line-wrapper {
					margin: 0 20rpx;
					position: relative;
					z-index: 10;

					.bottom-line-view {
						position: absolute;
						width: calc(100% - 80rpx);
						height: 36rpx;
						border-radius: 32rpx;
						left: 40rpx;
						z-index: 0;
						bottom: -16rpx;

						.bottom-line-icon {

							width: 100%;
							height: 19px;
							background-image: linear-gradient(45deg, #f5dc9d, #e5b950);
							border-radius: 10px;
							box-shadow: 0px 4px 5px #f5dc9d61;
						}
					}
				}

				.local-wrapper {
					display: flex;
					padding: 48rpx 0 32rpx;
					margin: 0 40rpx;
					justify-content: space-between;
					position: relative;
					align-items: center;

					.local-info {
						display: flex;

						.local-icon {
							height: 32rpx;
							width: 32rpx;
						}

						.local-text {
							font-size: 24rpx;
							color: #19191a;
							margin-left: 2rpx;
						}
					}

					.order-time-info {
						display: flex;
						align-items: center;
						width: 200rpx;
						justify-content: flex-end;

						.line {
							width: 1rpx;
							height: 33rpx;
							background-color: rgba(0, 0, 0, .2);
						}

						.order-time {
							font-size: 24rpx;
							color: #7d7e82;
							margin-left: 16rpx;
						}

						.arrow {
							width: 20rpx;
							height: 20rpx;
							margin-left: 9rpx;
						}
					}
				}
			}
		}

		.card {
			margin-top: 20rpx;
			padding: 40rpx;
			background: #fff;

			.card-title {
				font-size: 18px;
				font-weight: 600;
			}

			.card-content {
				margin-top: 40rpx;
				font-size: 14px;
				color: #8e8e8e;
				display: flex;
				flex-direction: column;
			}
		}

		.give-message {
			padding: 60rpx;

			.message-title {
				display: flex;

				.title-line {
					width: calc(100% - 140rpx);
					margin-left: 20rpx;
					box-sizing: border-box;

					.line-text {
						margin-top: 20rpx;
						display: block;
						font-size: 18px;
						font-weight: 600;
					}

					.message-line {
						width: 100%;
						height: 1px;
						background: #ececec;
					}
				}
			}

			.message-content {
				background: #ebebeb;
				padding: 20rpx;
				margin-top: 20rpx;
				border-radius: 12rpx;
				font-size: 14px;
				color: #767676;
			}

			.centerimage {
				width: 140rpx;
				height: 140rpx;
				border-radius: 6px;
			}
		}

		.geryLayer {
			position: absolute;
			z-index: 1;
			left: 0;
			right: 0;
			margin: 0 auto;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, .1);
		}

		.p-expert-btns {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 100rpx;
			background: #fff;
			border-top: 2rpx solid #f7f8fc;
			padding: 0 0 0 42rpx;
			z-index: 10;

			.reservation-status {
				position: absolute;
				top: -52px;
				left: 0;
				display: block;
				width: 100%;
				background: #ebebeb;
				font-size: 12px;
				color: #b0b0b3;
				text-align: center;


			}

			.c-bottom-button {
				.bottom-btns {
					display: flex;
					display: -webkit-flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;

					.feedback {
						display: inline-block;
						vertical-align: middle;
						margin-right: 28rpx;
						min-width: 76rpx;

						.feedback-iconA {

							display: block;
							width: 48rpx;
							height: 48rpx;
							background-size: contain;
							margin: 0 auto;

						}
					}

					.bottom-button--item {
						display: flex;
						justify-content: space-between;
						align-items: center;
						flex-grow: 1;
						width: 100%;

						.bottom-button--item-child {
							flex: 1;

							.btn {
								position: relative;
								height: 100rpx;

								.text1 {
									display: block;
									margin: 0;
									font-size: 32rpx;
									line-height: 32rpx;
								}

								.text2 {
									margin-top: 8rpx;
									font-size: 20rpx;
									line-height: 20rpx;
									color: #f5f6fa;
									-webkit-transform: scale(.8);
								}
							}

							.btn-wrapper {
								height: 100rpx;
								display: flex;
								justify-content: center;
								align-items: center;
								font-size: 16px;
								font-weight: 700;
							}

							.primary {
								background-color: #171d33;
								color: #fff;
							}

							.newStyle {
								flex-direction: column;
							}
						}
					}
				}
			}
		}
	}
</style>
