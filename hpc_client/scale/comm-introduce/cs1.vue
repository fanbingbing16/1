<template>
	<view class="_135editor" data-tools="135编辑器" data-id="107447" style="padding: 0px; background-color: #f4f8f9;">
		<view style="text-align: center;margin: 20rpx auto;">
			<view style="background-color: #f6f6f6;padding: 0 32rpx">
				<view style="display: flex;justify-content: flex-start;align-items: flex-end;margin: 60rpx 0 30rpx;" v-if="detailJson.title">
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
				<!-- <view class="assistant" style="box-sizing:border-box;max-width: 100% !important;width: 100%;height: 2rpx;background-color: #333;margin: 4px 0 40rpx 0;" data-width="100%"></view> -->
				<view class="box-edit _135editor" style="background-color: #fff;padding: 40rpx;margin-top: 20rpx;"
					v-for="(list,index) in detailJson.list" :key="index">
					<view style="display: flex;justify-content: flex-start;align-items: flex-end;">
						<view style="font-size: 32rpx;letter-spacing: 1.5px;color: #fe7a09;line-height: 40rpx;display: flex;">
							<strong v-if="index+1<10">0</strong><strong class="autonum" data-original-title=""
								title="">{{index+1}}</strong>
						</view>
						<view style="font-size: 14px;letter-spacing: 1.5px;color: #000;margin-left: 14rpx;">
							<strong class="135brush" data-brushtype="text">{{list.title}}</strong>
						</view>
					</view>
					<view data-autoskip="1" class="135brush"
						style="margin-top: 20rpx;text-align: justify;line-height:1.75em;letter-spacing: 1.5px;font-size:24rpx;color:#000;background: transparent;">
						<p style="vertical-align:inherit;">
							{{list.desc}}
						</p>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Cs1',
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
