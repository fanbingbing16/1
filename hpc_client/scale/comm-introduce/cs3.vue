<template>
	<view class="_135editor" data-tools="135编辑器" data-id="107466">
		<view style="text-align: center;margin: 20rpx auto;">
			<view style="background-color: #f7f7f7;padding: 0 30rpx;">
				<view style="display: inline-block;" v-if="detailJson.title">
					<view style="font-size: 32rpx;letter-spacing: 1.5px;color: #000;line-height: 40rpx;margin-top: 30rpx;">
						<strong class="135brush" data-brushtype="text">{{detailJson.title}}</strong>
					</view>
					<view style="display: flex;justify-content: center;margin: 12rpx 0 2rpx 0;">
						<view class="assistant"
							style="max-width: 96% !important;box-sizing:border-box;width: 96%;height: 2rpx;background-color: #333;"
							data-width="96%"></view>
					</view>
				</view>
				<view class="135brush" data-brushtype="text" v-if="detailJson.title2"
					style="font-size: 24rpx;letter-spacing: 5px;color: #fe7806;margin-left: 10rpx;">
					{{detailJson.title2}}
				</view>
				<view class="box-edit _135editor" v-for="(list,index) in detailJson.list" :key="index"
					style="background-color: #fff;padding: 16rpx 30rpx 50rpx 30rpx;margin-top: 40rpx;">
					<view style="display: flex;justify-content: flex-start;align-items: center;">
						<view style="display: inline-block;flex-shrink: 0;">
							<view style="font-size: 32rpx;letter-spacing: 0px;color: #000;display:flex;">
								
								<strong v-if="index+1<10">0</strong>
								<strong class="autonum" data-original-title=""
									title="">{{index+1}}</strong>
							</view>
							<view class="assistant"
								style="box-sizing:border-box;max-width: 100% !important;width: 100%;height: 6rpx;background-color: #ff7907;margin-top: -6rpx;"
								data-width="100%"></view>
						</view>
						<view data-autoskip="1" class="135brush"
							style="flex: 1;margin: 14rpx 0 0 20rpx;text-align: justify;line-height:1.7em;letter-spacing: 1.5px;font-size:24rpx;color:#fe7806;background: transparent;">
							<p style="vertical-align:inherit;">
								{{list.title}}
							</p>
						</view>
					</view>
					<view data-autoskip="1" class="135brush"
						style="margin-top: 20rpx;text-align: justify;line-height:1.7em;letter-spacing: 1.5px;font-size:24rpx;color:#000;background: transparent;">
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
		name: 'Cs3',
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
