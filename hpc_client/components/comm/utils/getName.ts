export function getName(num: number) {
	//不能为0或者非整数
	if (num === 0 || Math.floor(num) !== num) return ''
	const unit = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
	if (unit[num]) {
		return (num === 1 ? '大' : unit[num]) + '宝'
	} else {
		if (num < 100) {
			return (Math.floor(num / 10)>=2 ? unit[Math.floor(num / 10)] : '') + '十' + unit[num % 10] + '宝'
		}
	}
}