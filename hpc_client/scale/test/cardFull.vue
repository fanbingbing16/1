<template>
	<view class="page-card-full">
		<tobar :back="back" :title="''"></tobar>
		<card-one :listTypeScores="listTypeScores" :full="true"></card-one>
	</view>
</template>

<script>
	import CardOne from "@/scale/test/cardOne.vue"
	import Tobar from "@/pages/commVue/topbar.vue"
	let idOne = ''
	export default {
		name: 'CardFull',
		components: {
			CardOne,
			Tobar
		},
		// props:{
		// 	listTypeScores:{
		// 		default:()=>{
		// 			return[]
		// 		}
		// 	}
		// },
		data() {
			return {
				listTypeScores: [],
				idOne: ''
			}
		},
		onLoad: function(option) {
			this.listTypeScores = JSON.parse(option.listTypeScores || '[]')
			console.log(this.listTypeScores, 'list', option)
			idOne = option.id
			
		},
		methods: {
			back() {
				
				uni.redirectTo({
					url: '/scale/test/report?id=' + idOne
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-card-full {
		/deep/ .card {
			margin-top: 0;
		}
	}
</style>
