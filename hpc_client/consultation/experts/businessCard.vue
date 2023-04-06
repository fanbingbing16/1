<template>
	<view class="experts-business-card">
		<view class="card">
			<cl-text value="杜家真" bold :size="40"></cl-text>
			<ul class="list-introduce">
				<li>
					<cl-text value="上海市" color="#b2aeae"></cl-text>
				</li>
				<li>
					<cl-text value="上海市" color="#b2aeae"></cl-text>
				</li>
				<li>
					<cl-text value="上海市" color="#b2aeae"></cl-text>
				</li>
			</ul>
			<view class="header-image">
				<image src="//jdxl-img.jdxlt.com/avatar/3b10d99a9daa47252242ddfc864dd93f.jpeg_w400" alt=""
					class="centerimage" mode="aspectFill">
			</view>

		</view>
		<view class="two-card">
			<view class="two-card-item" v-for="(con,index) in consultation" :key="index">
				<view class="line" :style="'width:100%;'">

				</view>
				<view class="title">
					<text>{{con.title}}</text>

				</view>

				<view class="text">
					<cl-text :value="con.text" color="rgb(116 116 116)"></cl-text>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'BusinessCard',
		data() {
			return {
				consultation: [{
					title: '擅长领域',
					text: '家庭困扰、亲子教育'
				}, {
					title: '咨询师说',
					text: '一起工作一起工作，工作工作工作，来工作工作'
				}],
				screenWidth: 0
			}
		},
		created() {
			const info = uni.getSystemInfoSync()
			console.log(info.screenWidth, info, 'info')
			this.screenWidth = info.screenWidth
		}
	}
</script>

<style lang="scss" scoped>
	.experts-business-card {
		text-align: left;
		width: 100%;
		border: 0.01px solid transparent; //只是为了不会随着子元素下移

		height: 100%;
		overflow: hidden;
		box-sizing: border-box;

		.card::before {
			transform: translateZ(-1px);

			content: ' ';
			position: absolute;
			background: #0000001c;
			padding: 20px;
			width: 50%;
			border-radius: 10px;
			top: -20px;
			z-index: 1;
		}

		.card {
			transform-style: preserve-3d;
			z-index: 2;
			position: relative;
			width: calc(100% - 160rpx);
			border: 1px solid #fff;
			padding: 40rpx;
			margin: auto;
			margin-top: 100rpx;
			border-radius: 10px;
			box-shadow: 0px 0px 4px #e2e2e2;
			background-image: linear-gradient(90deg, #fff, #fff, #c0cfee);

			.list-introduce {
				margin-top: 40rpx;
				margin-left: -40rpx;

			}

			.header-image {
				position: absolute;
				top: -70rpx;
				right: 40rpx;
				width: 45%;
				height: 288rpx;

				.centerimage {
					width: 100%;
					height: 100%;
					border-radius: 10px;
				}
			}

			::marker {
				color: #b2aeae;
			}



		}

		.two-card {
			margin-top: 40px;
			width: 100%;
			background: #00000012;
			height: 100vh;
			box-sizing: border-box;
			padding: 40rpx;

			.two-card-item {
				margin-bottom: 20rpx;
				position: relative;

				.line {
					height: 1px;
					background: #cdccd1;
					top: 10px;
					position: absolute;

				}

				.title {
					position: relative;
					background-image: linear-gradient(45deg, #6a7dc0, #4a85cb);
					border-radius: 10px;
					font-size: 12px;
					color: #fff;
					padding: 4rpx 20rpx;
					width: 48px;
					margin-bottom: 20rpx;


				}


			}
		}


	}
</style>
