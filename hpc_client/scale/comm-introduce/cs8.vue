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
						</span> <strong class="135brush" data-brushtype="text"
							style="margin-left: 20rpx;">{{detailJson.title}}</strong>
					</view>
				</view>
				<view>
					<view class="box-edit _135editor"
						style="background-color: #ffffff; box-sizing: border-box; transform: rotateZ(0deg);">
						<view style="display: flex;justify-content: flex-start;align-items: flex-start;">
							<view style="display: flex; justify-content: center;align-items: center;" class="">
								<view class="">
									<view class="_135editor" data-tools="135编辑器" data-id="119079">
										<view>
											<view style="background-color: #fff;" class="">
												<view style="display: flex;justify-content: space-between; align-items: center;" class=""
													v-for="(list,index) in detailJson.list" :key="index">
													<view
														style=" max-width: 30% !important;box-sizing:border-box;width: 30%;"
														data-width="30%" class="">
														<img style="max-width: 100% !important;box-sizing:border-box;vertical-align:inherit;width: 100%; display: block;"
															:src="list.img" data-width="100%" draggable="false" />
													</view>
													<view
														style="max-width: 67% !important;box-sizing:border-box;width: 67%;display: flex;justify-content: space-between;flex-direction: column;"
														data-width="67%" class="">
														<view data-autoskip="1" class="135brush"
															style="text-align: left;line-height:1.75em;letter-spacing: 3rpx;font-size:24rpx;color:#333333;background: transparent;">
															<p>
																<span
																	style="font-size: 24rpx; Microsoft YaHei;, sans-serif; font-weight: 400; letter-spacing: 3rpx; line-height: 48rpx; font-style: normal; color: #fe7806; text-decoration: none solid #fe7806;">{{list.desc}}</span>
															</p>
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
		name: 'Cs8',
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
		}
	}
</script>

<style>
</style>
