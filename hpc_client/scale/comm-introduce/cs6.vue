<template>
	<view class="_135editor" data-tools="135编辑器" data-id="106729">
		<view style="text-align: center; margin: 10px auto;">
			<view style="background-color: #f6f6f6;padding: 0 30rpx;">
				<view style="display: flex;justify-content: flex-start;align-items: flex-end;margin: 60rpx 0 30rpx;" v-if="detailJson.title">
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
				<view style="background-color: #fff;padding: 25px 15px;" v-if="detailJson.desc1">
					<view class="box-edit _135editor"
						style="display: flex;justify-content: flex-start;align-items: flex-start;">
						<view data-autoskip="1" class="135brush"
							style="text-align: justify;line-height:1.75em;letter-spacing: 1.5px;font-size:24rpx;color:#414c46;background: transparent;">
							<p style="vertical-align:inherit;text-indent: 2em;">
								{{detailJson.desc1}}
							</p>
						</view>
					</view>
				</view>
				<view style="background-color: #fe7a09b8;padding: 25px 15px;position: relative;" v-if="detailJson.desc2">
					<span style="display: inline-flex;justify-content: center;align-items: flex-start;transform: translate(0px,-7px);position: absolute;
	        top: 0;">
						<view class="assistant"
							style="box-sizing:border-box;width: 0;height: 1px;border-right: 7px solid #fe7a09b8;border-top: 7px solid transparent;">
						</view>
						<view class="assistant"
							style="box-sizing:border-box;width: 0;height: 1px;border-bottom: 7px solid #fe7a09b8;border-right: 7px solid transparent;">
						</view>
					</span>
					<view class="box-edit _135editor"
						style="display: flex;justify-content: flex-start;align-items: flex-start;">
						<view data-autoskip="1" class="135brush"
							style="text-align: justify;line-height:1.75em;letter-spacing: 1.5px;font-size:24rpx;color:#fff;background: transparent;">
							<p style="vertical-align:inherit;text-indent: 2em;">
								{{detailJson.desc2}}
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
		name: 'Cs6',
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
