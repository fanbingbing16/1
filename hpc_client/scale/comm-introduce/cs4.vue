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
				<view style="background-color: #fff;padding: 50rpx 30rpx;">
					<view class="box-edit _135editor" v-for="(list,index) in detailJson.list" :key="index"
						style="display: flex;justify-content: flex-start;align-items: flex-start;">
						<view class="assistant"
							style="box-sizing:border-box;width:16rpx;height:16rpx;background-color: #f6ae09;border-radius: 50%;margin: 16rpx 16rpx 0 0;flex-shrink: 0;">
						</view>
						<view data-autoskip="1" class="135brush"
							style="text-align: justify;line-height:1.75em;letter-spacing: 1.5px;font-size:24rpx;color:#414c46;background: transparent;">
							<p style="vertical-align:inherit;">
								{{list.desc}}
							</p>
						</view>
					</view>

				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'Cs4',
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
