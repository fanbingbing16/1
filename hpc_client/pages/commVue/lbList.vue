<template>
	<view class="lb_list" :style="{'margin': '0 '+marginRight.slice(0,marginRight.length-3)*(hanLength-1)+'rpx',width:'calc(100% - '+(marginRight.slice(0,marginRight.length-3)*(hanLength-1)*2)+'rpx'+')'}">

		<template v-if="listData">
			<view class="subject" v-for="(item, index) in listData.content" :key="index" @click="gotoTest(item)"
				:style="{width:subjectWidth,'margin-right':index%hanLength===hanLength-1?'0':marginRight}">
				<cl-text value="分享可免费测评"></cl-text>
				<image class="picture" :src="getUrl(item)" mode="aspectFill"
					:style="{height:pictureHeight,width:pictureWidth}"></image>
				<view class="detail" :style="{width:pictureWidth}">
					<cl-text :size="28"
						:value="(item.node&&item.node.introductionJson)?item.node.introductionJson.title:''"
						color="#303030" bold :ellipsis="1">
					</cl-text>
					<!-- 
					<cl-text :size="28" :value="(item.node)?item.node.name:''" color="rgb(132 132 132)"
						:margin="[8, 0, 0, 0]">
					</cl-text> -->
					<view class="price" v-if="item.product">
						<view class="one">
							<cl-text :size="24" color="#ff724e" :type="item.product.price===0?'text':'price'"
								:value="item.product.price===0?'免费':item.product.price">
							</cl-text>
							<cl-text color="#44444496" :value="item.product?item.product.showPrice:0" type="price"
								:line-through="true">
							</cl-text>
						</view>

						<cl-text :size="20" :value="(item.node&&item.node.suitmonthage)?item.node.suitmonthage:''"
							color="#44444496" bold block :margin="[8, 0, 0, 0]">
						</cl-text>
					</view>
				</view>
			</view>
		</template>
	</view>
</template>
<script>
	export default {
		name: "lbList",
		props: {
			hanLength: {
				default: 2,
				type: Number
			},
			marginRight: {
				default: '40rpx',
				type: String
			},
			subjectWidth: {
				default: 'calc(50% - calc(40rpx / 2))',
				type: String
			},
			pictureHeight: {
				default: '250rpx',
				type: String
			},
			pictureWidth: {
				default: '270rpx',
				type: String
			},
			listData: {
				default: () => {
					return {}
				},
				type: Object
			}
		},
		methods: {
			gotoTest(item) {
				uni.navigateTo({
					url: '/scale/test/introduce?id=' +
						item.node.id,
					fail: (resultNavigate) => {
						console.log(resultNavigate, 'navi err')
					}
				})
			},
			getUrl(item) {
				return item?.node?.introductionJson?.icon || item?.node?.introductionJson?.banner || ''
			}
		}
	}
</script>

<style lang="scss">
	.lb_list {
		display: flex;
		// flex-direction: column;
		// justify-content: center;
		flex-wrap: wrap;
		//width: 98%;
		overflow-x: hidden;
		// margin: 0 auto;
		//margin: 0 calc(calc(100% - 86% - 30rpx) / 2);
		// justify-content: center;

		.subject {
			display: flex;
			flex-direction: column;
			// justify-content: center;
			align-items: center;
			// height: 252rpx;
			padding-bottom: 20rpx;
			padding-top: 20rpx;
			margin: 16rpx 0;
			width: 46%;
			max-width: 400rpx;
			// border-bottom: 2rpx solid #f5f5f5;
			// box-shadow: 0rpx 16rpx 40rpx rgba(0, 0, 0, 0.06);
			border-radius: 32rpx;
			background-color: #fff;

			.picture {
				width: 280rpx;
				height: 250rpx;
				border-radius: 12rpx;
			}

			.detail {
				padding-top: 8rpx;
				width: 280rpx;
				// margin-left: 15rpx;
				// display: flex;
				// flex-direction: column;
				// justify-content: space-between;
			}
		}
	}
</style>
