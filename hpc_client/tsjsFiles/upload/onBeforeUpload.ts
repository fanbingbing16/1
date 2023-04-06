export default (file:any, index:any) => {
	if (file.size > 51200) {

		uni.showToast({
			title: '图片大小不能大于50K',
			icon: 'none'

		})
		return false;
	} else if (!file.type && file.path?.indexOf('png') === -1 && file.path?.indexOf(
		'jpg') === -1) {
		uni.showToast({
			title: '只能上传jpg、png图片',
			icon: 'none'

		})
		return false;
	} else if (file.type && file.type.indexOf('image') === -1) {
		uni.showToast({
			title: '只能上传jpg、png图片',
			icon: 'none'

		})
		return false;
	}
}