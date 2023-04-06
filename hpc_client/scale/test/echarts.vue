<template>
	<view class="echarts">
		<qiun-data-charts type="column" :opts="opts" :chartData="chartData" :canvas2d="true" />
	</view>
</template>

<script>
	export default {
		name: 'Echarts',
		components: {

		},
		props: {
			chartData: {
				default: {
					categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
					series: [{
							name: "目标值",
							data: [35, 36, 31, 33, 13, 34]
						},
						{
							name: "完成量",
							data: [18, 27, 21, 24, 6, 28]
						}
					]
				}
			},
			opts: {

				default: () => {
					return {}
				},
			}
		},
		data() {
			return {

			}
		},
		onReady() {},
		created() {
			console.log(this.opts, 'opts',this.chartData,'chat')
		},
		mounted() {},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.echarts {
		width: 100%;
		height: 100%;

		.charts_order {
			width: 100%;
			height: 100%;
		}
	}
</style>
