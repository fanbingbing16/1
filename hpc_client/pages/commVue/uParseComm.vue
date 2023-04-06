<template>
	<view>
		
		<!-- <u-parse :content="content" @navigate="navigate"></u-parse> -->
		
	</view>
</template>

<script>
	// import uParse from "@/components/feng-parse/parse.vue"

	export default {
		name: 'UParseComm',
		components: {
			// uParse,
		},
		props: {
			content: {
				default: '',
				type: String
			}
		},
		data() {
			return {

			}
		},
		methods: {
			navigate(e) {

				console.log(e, 'e')
				if (e?.indexOf) {
					if (e?.indexOf('http') > -1) {
						e = encodeURI(e)
						uni.navigateTo({
							url: '/article/webview?url=' + e
						})
					} else {
						if (e[1] === '#') {
							e = e.slice(2)
						}
						if (e[0] !== '/') {
							e = '/' + e
						}
						e = encodeURI(e)
						if (e?.indexOf('index') > -1) {
							uni.switchTab({
								url: e
							})
						} else {
							uni.navigateTo({
								url: e
							})
						}
					}
				}
				console.log('article e navigate', e, typeof e)
			}
		}
	}
</script>

<style>
	image {
		height: 100%;
	}
</style>
