<script>
	import {
		baseUrl,

	} from "@/components/comm/base.ts"
	export default {
		created() {


		},
		onLaunch: function() {
			console.log("App Launch");
		},
		onShow: function() {
			console.log("App Show");
		},
		onHide: function() {
			console.log("App Hide");
		},
		methods: {

		}
	};
</script>

<style lang="scss">
	@import "cl-uni/index.scss";
	// @import '/components/feng-parse/parse.css';

	// 因为微信中的组件存在组件样式隔离，所以写一个全局样式 
	.full {
		width: 100%;

		.cl-button {
			width: 100%;
		}
	}

	.test {
		.before {
			.cl-button {
				margin-top: 20px;
				border-radius: 100%;
				height: 100px;
				width: 100px;
				/* text-align: center; */
				border: 0;

				/deep/ .cl-button__text {
					font-size: 18px;
				}
			}

			.cl-button:after {
				width: 0;
				height: 0;
			}
		}
	}

	/*每个页面公共css */
	uni-page-body {
		height: 100%;
	}



	.order {
		.cl-tabs__container {
			height: calc(100% - 80rpx);
			background: #f5f5f5;
		}
		/deep/ .cl-loading-mask__wrap {
			height: calc(100% - 90rpx) !important;
		}
		// /deep/ .cl-tab-pane {
		// 	height: calc(100% - 82rpx);
		// }
	}

	.card {
		.type {
			background-color: #e0afb2;
			width: 30%;
			margin-top: -20rpx;
			margin-left: -20rpx;
			font-size: 16px;
			border-top-left-radius: 10px;
			border-bottom-right-radius: 10px;
			border-top-right-radius: 0;
			border-bottom-left-radius: 0;
		}

		/deep/ .cl-button.cl-button--primary {
			background-color: #e0afb2;
		}

		.open {

			/deep/ .cl-button::after {
				width: 0;
				height: 0;
			}
		}

		/deep/ .open::after {
			width: 0;
			height: 0;
		}

	}


	.cl-loading-mask__wrap {
		height: 100%;
	}

	// 全局的上方的返回框
	.back {
		background: #fff;
		color: #000;
		width: 100%;
	}

	/*这个加上解决点进去页面有时是白色有时是灰色的情况*/
	body.uni-body {
		background: #f5f5f5;
	}

	page {
		height: 100%;
		background: #f5f5f5;
	}

	.cl-text.is-bold {
		font-weight: 700;
	}
</style>
