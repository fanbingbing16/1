<template>
	<view class="_135editor" data-tools="135编辑器" data-id="106729">
		<view style="text-align: center; margin: 20rpx auto;">
			<view style="background-color: #f6f6f6;padding: 0 30rpx;">
				<view style="display: flex;justify-content: flex-start;align-items: flex-end;margin: 60rpx 0 30rpx;"
					v-if="detailJson.title">
					<view style="font-size: 32rpx;letter-spacing: 1.5px;color: #fe7a09;display: flex; align-items: center;">
						<span>
							<view class="assistant"
								style="box-sizing:border-box;width: 0;height: 2rpx;border-bottom: 14rpx solid rgb(254, 122, 9);border-right: 14rpx solid transparent;margin-top: 2rpx;">
							</view>
							<view class="assistant"
								style="box-sizing:border-box;width: 0;height: 2rpx;border-left: 14rpx solid rgb(254, 122, 9);border-bottom: 14rpx solid transparent;">
							</view>
						</span>
						<strong class="135brush" data-brushtype="text"
							style="margin-left: 20rpx;">{{detailJson.title}}</strong>
					</view>
				</view>
				<view>
					<view class="box-edit _135editor"
						style="background-color: #ffffff; box-sizing: border-box; transform: rotateZ(0deg);">
						<view>
							<view class="">
								<view class="">
									<view class="_135editor" data-tools="135编辑器" data-id="119080">
										<view style="margin: 10px auto;">
											<view style="background-color: #f8f8f8;">
												<view class="box-edit" v-for="(list,index) in detailJson.list"
													:key="index"
													style="border-style: none; border-width: 0px; border-color: #ff0000;margin-top: 10rpx;" @click="handleClickScale(list.url)">
													<view
														style="background-color: #ffffff;display: flex;justify-content: space-between;align-items: center;padding: 16rpx 10rpx;border-radius: 7px;"
														class="">
														<view
															style="box-sizing:border-box;max-width: 100% !important;width: 100%;"
															data-width="100%">
															<view data-autoskip="1" class="135brush"
																style="text-align: justify;line-height:2em;letter-spacing: 1.5px;font-size:28rpx;color:#333333;background: transparent;">
																<p style="text-indent: 1em;">
																	{{list.desc}}
																</p>
															</view>
														</view>
														<view style="box-sizing:border-box;width: 35px;">
															<svg t="1677825735401" class="icon" viewBox="0 0 1024 1024"
																version="1.1" xmlns="http://www.w3.org/2000/svg"
																p-id="4190" width="20" height="20" >
																<path
																	d="M697.642444 511.796212L242.609085 56.576745A33.220227 33.220227 0 0 1 289.415175 9.770655L767.898106 488.253586c13.02754 13.02754 13.02754 33.964658 0 46.899144L289.601282 1013.728715a33.127173 33.127173 0 0 1-46.899143-46.899144l455.033359-455.033359z"
																	fill="#FF7712" p-id="4191"></path>
															</svg>
														</view>
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Cs9',
		props: {
			detailJson: {
				default: () => {
					return {

					}
				},
				type: Object
			}
		},
		watch: {
			detailJson(newVal) {
				console.log(newVal, 'detailJson')
			}
		},
		methods: {
			handleClickScale(url) {
				uni.navigateTo({
					url, 
					// '/scale/test/introduce?id=' +item.node.id,
					fail: (resultNavigate) => {
						console.log(resultNavigate, 'navi err')
					}
				})
			}
		}
	}
</script>

<style>
</style>
