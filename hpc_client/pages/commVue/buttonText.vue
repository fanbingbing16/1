<!-- 这个页面是公共可使用的 按钮可变成登录/选择家庭成员 -->
<template>
	<view class="select" v-if="value">
		<view class="text-list" v-if="people&&value === '修改选中成员'">
			<text>{{people.type||(people.node?people.node.name:'')||people.name||''}}</text>
			<text>{{people.birthday||(people.node?people.node.birthday:'')}}</text>
		</view>

		<view class="button-one" :style="value === '修改选中成员'?'width:50%;':'width:100%;'">
			<cl-button type="primary" @click="onSubmit" class="full">{{value}}</cl-button>
		</view>
	</view>
</template>

<script>
	import {
		sdkTool
	} from '@/tsjsFiles/sdk/sdkTool'


	export default {
		name: 'ButtonText',
		components: {},
		onShow: function() {
			console.log('onShow buttonTexr')
			this.changeButtonText()
			sdkTool.goPayPage(cpOrderId)


		},
		created() {
			this.changeButtonText()
			const _this = this
		},

		data() {
			return {
				value: '登录',
				visible: false,
				people: {}
			}
		},
		methods: {
			changeButtonText() {
				uni.getStorage({
					key: 'user',
					success: (data) => {

						if (!data.data.token) {
							this.value = '登录'
						} else {
							uni.getStorage({
								key: 'people',
								success: (resultPeople) => {
									this.value = '修改选中成员'
									this.people = resultPeople.data
									this.$emit('peopleData', this.people)
								},
								fail: (resultFail) => {
									this.value = '选择家庭成员'
								}
							})

						}
					},
					fail: (err) => {
						console.log(err, 'fail user')
						this.value = '登录'
					}
				})
			},
			getVisible(value) {
				this.visible = value
				this.value = '选择家庭成员'
			},
			onSubmit() {
				
				if (this.value === '登录') {
					sdkTool.clickLogin()
				} else {
					uni.navigateTo({
						url: '/scale/family/family'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.select {
		margin-top: 10px;
		margin-left: 16px;
		width: calc(100% - 32px);
		display: flex;

		.text-list {
			width: 50%;
			display: flex;
			align-items: center;
			background: #fff;
			font-size: 12px;

			text {
				margin-right: 10rpx;
			}

			:first-child {
				padding-left: 10rpx;
			}

			:last-child {
				margin-right: 0;
			}
		}

		.cl-button {
			width: 100%;
		}
	}
</style>
