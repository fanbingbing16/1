<template>
	<view class="page-settle-input">
		<cl-topbar title="申请入驻"></cl-topbar>
		<view class="content">
			<input-consult :isSbmit="isSbmit" :form="form"></input-consult>
			<cl-button type="primary" @tap="onSubmit" class="full">提交申请</cl-button>
		</view>

	</view>
</template>

<script>
	import InputConsult from "@/pages/commVue/inputConsult.vue"
	import conUpload from "@/components/comm/upload.vue"
	import UniCalendar from "@/uni-calendar_1.4.9/components/uni-calendar/uni-calendar.vue"
	import {
		baseSev
	} from "@/components/comm/base"
	import onBeforeuUpload from "@/tsjsFiles/upload/onBeforeUpload"
	import {
		request
	} from "@/components/comm/request"
	export default {
		components: {
			conUpload,
			UniCalendar,
			InputConsult
		},
		data() {
			return {
				isSbmit: false,
				form:{
					certificate: [],
					identityCard: [],
					applyFile: ['', '', '', '', ''],
					name: '',
					mobile: '',
					gender: '0',
					birthday: ''
				}
			}
		},
		created(){
			request({
				url: '/consultDoctor/findOneByUserId',
			
			}).then(res => {
				delete res.data.applyRecord
				for (const key in res.data) {
					if (res.data[key]) {
						this.form[key] = res.data[key]
						
					}
				}
				
			
			})
		},
		methods: {

			onSubmit() {
				this.isSbmit = true
				setTimeout(() => {
					this.isSbmit = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-settle-input {

		.content {
			background: #fff;
			padding: 40rpx;
			width: 100%;
			box-sizing: border-box;

			.noneLabel {
				/deep/ .cl-form-item__container {
					padding-left: 0;
				}
			}

			.one-text {
				display: flex;
			}

			.none-han {
				display: flex;
				flex-direction: column;

				.one {
					justify-content: space-between;
					margin-bottom: 8rpx;
				}
			}

			.geryLine {
				height: 2rpx;
				background-color: #f1f1f1;
			}
		}
	}
</style>
