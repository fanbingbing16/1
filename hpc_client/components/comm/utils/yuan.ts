/**
 * 转化成RMB元字符串
 *
 * @param digits 当数字类型时，允许指定小数点后数字的个数，默认2位小数
 */
export function yuan(value: number | string, digits: number = 2): string {
	if (typeof value === 'number') {
		value = value.toFixed(digits);
	}
	return `&yen ${value}`;
}


//计算实足年龄
export function chronologicalAge(date: string, testDate: string, pretermBirthDate: number): number {
	let age = calculateAge({ startDate: date, endDate: testDate })
	const year = +age.split('岁')[0]
	const month = +age.slice(age.indexOf('岁') + 1, age.indexOf('月'))
	const day = +age.slice(age.indexOf('月') + 1, age.indexOf('天'))
	let monthsAge = 0
	if (year < 2 && pretermBirthDate > 0)
		monthsAge = year * 12 + month + (day - pretermBirthDate) / 30
	else monthsAge = year * 12 + month + day / 30
	return monthsAge > 0 ? monthsAge : 0;
}
export const calculateAge = (params: { startDate: string, endDate?: string | Date, onlyYear?: boolean }): string => {
	// 没有开始日期
	if (!params.startDate) return '没有开始日期';

	// ios只支持/
	const start = new Date(params.startDate.replace(/-/g, "/")),
		end = params.endDate ? new Date(params.endDate) : new Date();
	// 两个日期的时间戳
	const startTime = start.getTime(),
		endTime = end.getTime();

	// 开始日期大于结束日期
	if (endTime < startTime) return '开始日期不能大于结束日期';

	// 开始日期的年月日
	const startY = start.getFullYear(),
		startM = start.getMonth() + 1,
		startD = start.getDate();

	// 结束日期的年月日
	const endY = end.getFullYear(),
		endM = end.getMonth() + 1,
		endD = end.getDate();

	// 相差的年数
	let yearSpace = endY - startY;

	// 两个日期之间相差的月数
	let monthSpace = endM - startM;
	// 开始日期的月份大于结束日期的月份,则年数要退1，即12个月
	if (startM > endM) {
		yearSpace -= 1;
		monthSpace += 12;
	}
	// 两个日期月份相等，开始日期大于结束日期
	if (startM === endM && startD > endD) {
		yearSpace -= 1;
		monthSpace += 12;
	}
	const startMonthDay = getMonthDays(startY, startM)
	const endMonthDay = getMonthDays(endY, endM)
	let daySpace = (startMonthDay - startD) + (endD - endMonthDay)
	if (daySpace < 0) {
		monthSpace -= 1
		daySpace = 30 + daySpace
	}
	// 开始日期大于结束日期，月数要减1
	// if (startD > endD) {
	// 	monthSpace -= 1;
	// }

	// 结束时期上一个月的天数
	// const pmd = getMonthDays(endY, endM - 1);
	// 开始日期不满一个月的天数（如果开始日期大于结束时期上一个月的天数，则算满月）
	// const startDays = startD > pmd ? 0 : pmd - startD;

	// 两日期相差天数（开始日期不满一个月的天数和结束日期的天数之和）
	// let daySpace = startDays + endD;
	// 相差天数大于等于上一个月天数则应该减去满月的天数
	// if (daySpace >= pmd) {
	// daySpace -= pmd;
	// }
	// 两个日期的日相同则相差天数为0
	// if (startD === endD) {
	// 	daySpace = 0;
	// }
	// if (params.onlyYear) {
	// 	if (yearSpace > 0)
	// 		return `${yearSpace}岁`
	// 	else if (monthSpace > 0)
	// 		return `${monthSpace}月`
	// 	else if (daySpace > 0)
	// 		return `${daySpace}天`
	// 	else return `今天出生`
	// }
	return `${yearSpace}岁${monthSpace}月${daySpace}天`;
	// return { yearSpace, monthSpace, daySpace }
}

/**
 * @description 是否闰年
 * @param {Number} year 年份
 * @return {Boolean} result
 */
const isLeapYear = (year: number): boolean => {
	return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}

/**
 * @description 获取某月有几天
 * @param {Number} year 年份
 * @param {Number} month 月份
 * @return {Number} 天数
 */
const getMonthDays = function(year: number, month: number): number {
	if (!month) {
		year -= 1;
		month = 12;
	}
	let aMonthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if (isLeapYear(year)) {
		aMonthDays[2] = 29;
	}
	return aMonthDays[month];
};




