

function getCity() {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'https://cool-uni.oss-cn-shanghai.aliyuncs.com/comm/city.json',
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})

}

export const city = getCity()