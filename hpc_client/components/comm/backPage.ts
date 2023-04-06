export default () => {
	if (getCurrentPages()?.length === 1 || !getCurrentPages()) {
		uni.switchTab({
			url: '/pages/index/index'
		})
	} else
		uni.navigateBack()
}