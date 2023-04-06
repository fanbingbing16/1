import {
	gtTypeAdvice,
	mChatAdvice,
	percScore,
	topicL,
	typeStand,
	typeStandas,
	typeTimes
} from "@/tsjsFiles/report/tqData"
import {
	ItemKind,
	RecordStatus
} from "@/components/comm/allCfg"
import {
	adviceBigSCl,
	topicTimes,
	yingzi,
	GADAdvice
} from "@/tsjsFiles/report/scl90Data"

export default function reportData(
	checkScaleItem = {},
	advData = {},
	gsData = {},
	commonData = {},
	scores = 0,
	sznl = 0,
	moduleName = "",
	age = 0,
	sex = "",
	lbReportType = 0,
	xxEvatypeScores = {},
	stEvatypeScores = {},
	anstype = {},
	collectJson = {}
) {

	const moduleStr = `report${lbReportType}`
	if (new GetReport()[moduleStr]) {

		return new GetReport()?. [moduleStr](
			checkScaleItem, advData,
			gsData, commonData, scores, sznl,
			moduleName, age, sex, lbReportType,
			xxEvatypeScores, stEvatypeScores, anstype, collectJson)
	}

}
export class GetReport {
	report5(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {},
		collectJson = {}
	) {
		let noPassArr = []
		for (const page in checkScaleItem) {
			if (+page <= 23) {
				if (checkScaleItem[page].score === 3 || checkScaleItem[page].content === '否') {
					noPassArr.push(page)
				}
			} else {
				if (checkScaleItem[page].score > 0) {
					noPassArr.push(page)
				}
			}
		}
		let advice = ''
		let oneAdvice = ''
		if (noPassArr.length === 4 && noPassArr.every(val => [11, 18, 20, 22].includes(val))) {
			oneAdvic = mChatAdvice[1].text
			eadvice = mChatAdvice[1].title
		} else if (noPassArr.length === 6 && noPassArr.every(val => [2, 7, 9, 13, 14, 15].includes(val))) {
			oneAdvic = mChatAdvice[2].text
			eadvice = mChatAdvice[2].title

		} else if (scores >= 17) {
			oneAdvice = mChatAdvice[1].text
			advice = mChatAdvice[1].title

		} else {
			oneAdvice = mChatAdvice[0].text
			advice = mChatAdvice[0].title
		}
		let status

		if (noPassArr.length > 0) {
			status = RecordStatus.ERROR
			oneAdvice = `测评题:${noPassArr.join(' ')}不通过` + oneAdvice
		}
		return {
			advice,
			oneAdvice,
			status,
			listTypeScores: []
		}
	}
	report6(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {},
		collectJson = {}
	) {
		let oneAdvice = ''
		let status
		let butt
		if (moduleName === '父母育儿技能评估表') {
			scores = Math.floor(scores / 8 * 100) / 100
		}
		const adviceMore = this.gsDataGetDesc(gsData, scores)

		sznl = Math.floor(sznl)
		let listTypeScores = []
		if (moduleName === '中国儿童注意力水平测评量表') {
			if (adviceMore.advice.indexOf('有待提高') > -1 || adviceMore.oneAdvice.indexOf('有待提高') > -1) {

				status = RecordStatus.ERROR
			}
		} else if (moduleName === '儿童焦虑性情绪障碍筛查表(SCARED)') {
			if (adviceMore.advice !== '正常') {
				status = RecordStatus.ERROR
			}
		} else if (moduleName === '儿童抑郁障碍自评量表') {
			butt = {
				text: '建议前往儿童焦虑性情绪障碍筛查表(SCARED)进行进一步测试',
				page: '/scale/test/introduce?id=106'
			}
			if (adviceMore.advice !== '正常') {
				status = RecordStatus.ERROR
			}
		} else if (moduleName === 'PHQ-9自评量表') {
			butt = {
				text: '建议前往SCL90自评量表进行进一步测试',
				page: '/scale/test/introduce?id=25'
			}
			if (adviceMore.advice !== '正常') {
				status = RecordStatus.ERROR
			}
		} else if (moduleName === 'GAD-7') {


			listTypeScores.push({
				danger: false,
				oneAdvice: '',
				score: '',
				label: '',
				name: listTypeScores.length,
				advice: GADAdvice[adviceMore.advice].advice,
				shouDo: GADAdvice[adviceMore.advice].shouDo
			})
			if (sznl >= 16) {
				butt = {
					text: '建议前往SCL90自评量表进行进一步测试',
					page: '/scale/test/introduce?id=25'
				}
			} else {
				butt = {
					text: '建议前往儿童焦虑性情绪障碍筛查表(SCARED)进行进一步测试',
					page: '/scale/test/introduce?id=106'
				}
			}
			if (adviceMore.advice !== '正常') {
				status = RecordStatus.ERROR
			}

		} else if (moduleName === '社会交往问卷-Lifttime(SCQ)') {
			if (adviceMore.advice.indexOf('非') === -1) {
				status = RecordStatus.ERROR
			}
		} else if (moduleName === '父母育儿技能评估表') {
			listTypeScores = null
			adviceMore.oneAdvice = this.gsDataGetAdvScores(advData, sznl).oneAdvice

			adviceMore.scores = scores



		} else if (moduleName === '考试焦虑量表') {
			if (adviceMore.oneAdvice.indexOf('低') === -1) {
				status = RecordStatus.ERROR
			}
		}
		return {
			listTypeScores,
			...adviceMore,
			status,
			butt
		}
	}
	report8(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {
		let oneAdvice = ''
		let listTypeScores = []
		let echartsOption = {
			categories: [],
			series: [{
					name: '得分',
					data: []
				},
				{
					name: '标准值最低值',
					data: []
				},
				{
					name: '标准值最高值',
					data: []
				}
			]
		}
		gsData.edges.map((gs) => {
			for (let key in stEvatypeScores) {
				if (gs.node.name === '正常' && echartsOption.categories.length < 2 && key !== '对立违抗') {
					echartsOption.categories.push(key)
					echartsOption.series[0].data.push(stEvatypeScores[key])
					echartsOption.series[1].data.push(+gs.node.sedge === -1 ? 0 : +gs.node.sedge)
					echartsOption.series[2].data.push(+gs.node.eedge)
				}

				if (key !== '对立违抗' && gs.node.addition1 === '0' && (stEvatypeScores[key] >=
						+gs.node.sedge || gs.node.sedge === '-1.00') &&
					(stEvatypeScores[key] <= +gs.node.eedge || gs.node.eedge === '-1.00')) {
					listTypeScores.push({
						danger: gs.node.name !== '正常',
						oneAdvice: gs.node.name,
						score: stEvatypeScores[key],
						label: key,
						name: listTypeScores.length,
						advice: '',
						shouDo: ''

					})
					if (gs.node.name !== '正常' && !oneAdvice) {
						oneAdvice += '很有可能患有ADHD-HI(多动/冲动为主)'
					}

				}

			}
		})
		let temp = []
		commonData.edges?.map(comm => {
			if (comm.node.type === '对立违抗') {
				temp.push(comm)
			}
			if ((stEvatypeScores[comm.node.type] >= +comm.node.sedge || +comm.node.sedge === -1) && (
					stEvatypeScores[comm.node.type] <= +comm.node.eedge || +comm.node.eedge === -1) &&
				comm.node.type !== '对立违抗') {
				listTypeScores = listTypeScores.map(item => {
					if (item.label === comm.node.type) {
						item.advice = comm.node.remark
						item.shouDo = comm.node.remark2
					}
					return item
				})
			}
		})
		let scoreMin2Time = 0
		for (const page in checkScaleItem) {
			if (checkScaleItem[page].stEvatype === "对立违抗") {
				if (+(checkScaleItem[page].score) >= 2) {
					scoreMin2Time++

				}
			}
		}
		let comm = scoreMin2Time >= 4 ? temp.filter(item => {
			if (item.node.sedge === '1') {
				return item
			}
		})?. [0] : temp.filter(item => {
			if (item.node.sedge === '0') {
				return item
			}
		})?. [0]
		listTypeScores.push({
			danger: scoreMin2Time >= 4,
			oneAdvice: scoreMin2Time >= 4 ? '异常' : '正常',
			score: stEvatypeScores['对立违抗'],
			label: '对立违抗',
			name: listTypeScores.length,
			advice: `${scoreMin2Time}项对立违抗大于2分，` + comm.node.remark,
			shouDo: comm.node.remark2
		})
		scoreMin2Time >= 4 ? oneAdvice += '，有对立违抗症状。' : ''
		let advice = listTypeScores.some(item => item.danger) ? '异常' : '正常'
		let status
		if (advice === '异常') {
			status = RecordStatus.ERROR
		}

		return {
			listTypeScores,
			echartsOption,
			oneAdvice,
			advice,
			status
		}
	}
	report9(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {
		if (!isNaN(+sex))
			sex = sex === '0' ? '女' : '男'
		sznl = Math.floor(sznl / 12)
		const rScore = {
			'品行问题': 0.84,
			'学习问题': 0.73,
			'心身问题': 0.65,
			'冲动-多动': 0.59,
			'焦虑': 0.43,
			'多动指数': 0.80
		}
		let bScore = {}
		let pjia = {}
		let hasYic = false
		let hasKey = false
		let echartsOption = {
			categories: [],
			series: [{
					name: 'z值',
					data: []
				},
				{
					name: '标准值最低值',
					data: []
				},
				{
					name: 'z标准值最高值',
					data: []
				}
			]
		}
		let opts = {
			yAxis: {
				data: [{
					min: 0
				}]

			},
			extra: {
				column: {
					categoryGap: 4
				}
			}

		}
		commonData.edges.map(comm => {
			if (sex === comm.node.remark) {
				if ((sznl >= +comm.node.sedge || +comm.node.sedge === -1) && (sznl <= +comm.node.eedge || +
						comm.node.eedge)) {
					if (sex === comm.node.remark)
						bScore[comm.node.type] =
						`${Math.round((+comm.node.sage - +comm.node.eage) * 100) / 100}-${Math.round((+comm.node.sage + +comm.node.eage) * 100) / 100}`
				}
			}
		})
		for (const key in anstype) {
			if (stEvatypeScores[key]) {
				stEvatypeScores[key] = stEvatypeScores[key] + anstype[key]
			} else {
				stEvatypeScores[key] = anstype[key]
			}
		}
		const zScore = {
			'品行问题': (stEvatypeScores['品行问题'] / 12).toFixed(2),
			'学习问题': (stEvatypeScores['学习问题'] / 4).toFixed(2),
			'心身问题': (stEvatypeScores['心身问题'] / 5).toFixed(2),
			'冲动-多动': (stEvatypeScores['冲动-多动'] / 4).toFixed(2),
			'焦虑': (stEvatypeScores['焦虑'] / 4).toFixed(2),
			'多动指数': (stEvatypeScores['多动指数'] / 10).toFixed(2),
		}
		let listTypeScores = []
		for (const kind in rScore) {
			const s = /([-]{0,1}[0-9]*[.]{0,1}[0-9]*)[-]([0-9]*[.]{0,1}[0-9])/
			const bScoreTemp = s.exec(bScore[kind])

			const tempScore = +zScore[kind]
			if (tempScore < +bScoreTemp?. [1] || (tempScore > +bScoreTemp?. [2] && tempScore < 1.5)) {
				pjia[kind] = '可疑'
				hasKey = true
			} else if (tempScore > +bScoreTemp?. [2] && tempScore >= 1.5) {
				pjia[kind] = '异常'
				hasYic = true
			} else {
				pjia[kind] = '正常'
			}
			echartsOption.categories.push(kind)
			echartsOption.series[0].data.push(tempScore)
			echartsOption.series[1].data.push(bScoreTemp[1])
			echartsOption.series[2].data.push(bScoreTemp[2])
			opts.yAxis.data[0].min = Math.min(bScoreTemp[1] - 0.1, opts.yAxis.data[0].min)
			opts.yAxis.data[0].min = Math.min(tempScore - 0.1, opts.yAxis.data[0].min)
			opts.yAxis.data[0].min = Math.min(bScoreTemp[2] - 0.1, opts.yAxis.data[0].min)
			listTypeScores.push({
				danger: pjia[kind] !== '正常',
				oneAdvice: pjia[kind],
				score: tempScore,
				label: kind,
				name: listTypeScores.length,
				advice: `标准值：${bScore[kind]}`,
				shouDo: ''
			})
		}
		let advice = ''
		if (hasYic)
			advice = `您的测评结果显示为多动`
		else if (hasKey) {
			advice = `您的测评结果显示为可疑`
		} else {
			advice = `您的测评结果显示为正常`
		}
		let oneAdvice = ''
		advData.edges.map(item => {
			oneAdvice += item.node.adv
			oneAdvice = oneAdvice.replace(/<br\/>/g, '\n')
		})
		return {
			listTypeScores,
			advice,
			oneAdvice,
			echartsOption,
			opts
		}
	}
	report10(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {

		if (!isNaN(+sex)) {
			sex = sex === '0' ? '女' : '男'
		}
		let tempTopicL = {
			...topicL
		}
		sznl = Math.floor(sznl / 12)
		if (sex === '女' && sznl >= 6 && sznl <= 11) {
			tempTopicL[1] = tempTopicL[2]
			tempTopicL[5] = tempTopicL[6]
		} else if (sex === '女' && sznl >= 11 && sznl <= 16) {
			tempTopicL[1] = tempTopicL[4]
			tempTopicL[5] = tempTopicL[8]

		} else if (sex === '男' && sznl >= 6 && sznl <= 11) {
			tempTopicL[1] = tempTopicL[1]
			tempTopicL[5] = tempTopicL[5]

		} else if (sex === '男' && sznl >= 11 && sznl <= 16) {
			tempTopicL[1] = tempTopicL[3]
			tempTopicL[5] = tempTopicL[7]

		}
		let opts = {
			xAxis: {
				rotateLabel: true,
				rotateAngle: 45,
				marginTop: 4
			},
			extra: {
				column: {
					categoryGap: 4
				}
			}
		}
		let typeScore = {}
		let listTypeScores = []
		let status
		for (const page in checkScaleItem) {
			if (checkScaleItem[page].stEvatype) {

				const temp = tempTopicL[5].filter(top => top.title === checkScaleItem[page].stEvatype)?. [0]

				if (temp) {
					typeScore[checkScaleItem[page].stEvatype] = typeScore[checkScaleItem[page].stEvatype] || 0
					typeScore[checkScaleItem[page].stEvatype] += +checkScaleItem[page].score

				}

			}
			const types = checkScaleItem[page].stdetail.split(',')

			types.map(item => {
				const tempS = item.split('_')

				if (sex === tempS[1]?. [0]) {

					const age = tempS[1].slice(1).split('-')

					if (sznl >= +age[0] && sznl <= +age[1]) {

						typeScore[tempS[0]] = typeScore[tempS[0]] || 0
						typeScore[tempS[0]] += +checkScaleItem[page].score

					}
				}

			})
		}

		for (const key in typeScore) {
			const temp = tempTopicL[5].filter(top => top.title === key)?. [0]
			const temp2 = tempTopicL[1].filter(top => top.title === key)?. [0]
			if (temp) {
				if (typeScore[key] <= temp.max) {
					status = RecordStatus.ERROR
				}
				listTypeScores.push({
					danger: typeScore[key] <= temp.max,
					oneAdvice: typeScore[key] > temp.max ? '正常' : '异常',
					score: typeScore[key],
					label: key,
					name: listTypeScores.length,
					advice: ``,
					shouDo: ''
				})
			}
			if (temp2) {
				if (typeScore[key] <= temp2.max) {
					status = RecordStatus.ERROR
				}
				listTypeScores.push({
					danger: typeScore[key] <= temp2.max,
					oneAdvice: typeScore[key] > temp2.max ? '正常' : '异常',
					score: typeScore[key],
					label: key,
					name: listTypeScores.length,
					advice: ``,
					shouDo: ''
				})
			}
		}
		commonData.edges.map(comm => {
			listTypeScores.some((typeScore, index) => {
				if (typeScore['label'] === comm.node.type && typeScore['oneAdvice'] === comm.node
					.tscore) {
					listTypeScores[index].advice = comm.node.remark
					listTypeScores[index].shouDo = comm.node.remark2
					return true
				}
			})
		})
		let advice = ''
		let oneAdvice = ''
		if (status === RecordStatus.ERROR) {
			advice = '异常'

		} else {
			advice = '正常'
		}
		advData?.edges?.map(adv => {
			if (adv.node.nengqu === advice)
				oneAdvice = adv.node.adv
		})
		return {
			oneAdvice,
			advice,
			opts,
			listTypeScores,
			status
		}
	}
	report11(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {
		let oneAdvice = ''
		let advice = '标准分:49'
		if (moduleName === '高功能自闭症儿童自测表') {
			advice = '标准分:19'
			if (scores >= 19) {
				oneAdvice =
					`分数高于标准分，有自闭症的可能。自闭症是一种神经发育障碍，目前尚无特效药物治疗方法。但是，通过早期干预和综合治疗，可以显著改善自闭症患者的症状和行为表现。以下是一些可能有助于改善自闭症的方法。行为疗法可以帮助自闭症患者学习和掌握一些基本的生活技能，如交际技巧、日常生活技能、情绪管理等。行为疗法可以通过正反馈、模仿等方式来帮助自闭症患者改善行为表现。自闭症患者常常存在社交障碍，因此社交技能训练是非常重要的。社交技能训练可以帮助自闭症患者学习和掌握一些社交技能，如眼神交流、语言表达、情感表达等。药物治疗可以缓解一些自闭症患者的症状，如焦虑、注意力缺陷、强迫行为等。但需要注意的是，药物治疗只是一种辅助治疗手段，必须在医生的指导下使用。以上是一些可能有助于改善自闭症的方法，但需要注意的是，治疗方案应该根据自闭症患者的症状和表现制定，需要专业医生或心理学家进行评估和诊断，并制定个性化的治疗方案。`
			} else {
				oneAdvice = '该儿童分数属于正常范围,但儿童也可能存在一些异常的行为，需要家长注意。建议您在家庭和社交环境中创造一个温暖、和谐、支持和理解的氛围，这有助于促进个体的健康和良好的行为表现。'
			}

		} else {
			if (scores >= 49)
				oneAdvice =
				'分数高于标准分，有阿斯伯格综合症的可能。需要了解阿斯伯格综合征的症状和特征，以便更好地理解您或您的孩子的表现。了解有关阿斯伯格综合征的信息也有助于您更好地管理和支持您或您的孩子的日常生活。通过加入支持小组或寻求心理辅导等方式，寻求支持和帮助。这些资源可以为您提供支持和指导，帮助您更好地了解和管理阿斯伯格综合征。如果您或您的孩子被诊断出患有阿斯伯格综合征，您可以寻求适当的支持和治疗，以改善症状和提高生活质量。治疗方法包括药物治疗、行为疗法、语言疗法和社交技能训练等。针对阿斯伯格综合征的症状，您可以为自己或您的孩子提供适当的社交技能训练，帮助他们更好地理解和处理社交互动。这些技能包括情绪识别、交流技巧、社交技巧和人际交往等。'
			else {
				oneAdvice =
					'该儿童分数属于正常范围，但是，有时候阿斯伯格综合征的症状可能不太明显或存在于较轻的程度，因此建议您仍然保持警惕，并注意以下建议。建议您在家庭和社交环境中创造一个温暖、和谐、支持和理解的氛围，这有助于促进个体的健康和良好的行为表现。建议您在家庭和社交环境中创造一个温暖、和谐、支持和理解的氛围，这有助于促进个体的健康和良好的行为表现。'
			}
		}
		return {
			oneAdvice,
			advice
		}
	}
	report12(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {
		let adviceType = {}
		let echartsOption = {
			categories: [],
			series: [{
					name: '得分',
					data: []
				},
				{
					name: '标准值最低值',
					data: []
				},
				{
					name: '标准值最高值',
					data: []
				}
			]
		}

		stEvatypeScores['反应阈'] = stEvatypeScores['反应阀']
		let listTypeScores = []
		let opts = {
			dataLabel: false,
			xAxis: {
				marginTop: 4,
				fontSize: 13,
				rotateLabel: true,
				rotateAngle: 45

			},
			extra: {

				column: {
					categoryGap: 4
				}
			}
		}
		let typeSimple = {
			'情绪本质': '情绪',
			'活动水平': '活动',
			'反应强度': '反应强度',
			'反应阈': '反应阈',
			'坚持性': '坚持',
			'趋避性': '趋避',
			'适应性': '适应',
			'节律性': '节律',
			'注意分散度': '注意分散'
		}
		let status
		let typeMaxMin = {}
		let ATimes = 0
		let maxTimes = 0
		let times1 = 0
		let times2 = 0
		gsData?.edges.map(gs => {
			const kindScore = Math.round(stEvatypeScores[gs.node.addition2] / (typeTimes[moduleName]
				[gs.node.addition2]) * 100) / 100

			if ((kindScore >= +gs.node.sedge || +gs.node.sedge === -1) && (kindScore < +gs.node.eedge || +gs
					.node.eedge === -1) && gs.node.addition1 === "1") {
				let stants = []
				typeStand[moduleName].some(item => {
					if (sznl >= item.min && sznl <= item.max) {
						stants[1] = item.value[gs.node.addition2]
						return true
					}
					return false
				})
				typeStandas[moduleName].some(item => {
					if (sznl >= item.min && sznl <= item.max) {
						stants[0] = item.value[gs.node.addition2]
						return true
					}
					return false
				})

				listTypeScores.push({
					danger: gs.node.name !== '适中',
					oneAdvice: gs.node.name,
					score: kindScore,
					label: gs.node.addition2,
					name: listTypeScores.length,
					advice: `该儿童${gs.node.addition2}的状态为${gs.node.name},其适中的标准值区间为${stants[0]},标准值中位数为${stants[1]}\n${gs.node.name!=='适中'?('建议:'+gs.node.desc):''}`

				})

				if (kindScore > +(stants[0].split('-')[1])) {
					typeMaxMin[gs.node.addition2] = 'max'
					maxTimes++
				} else if (kindScore < +(stants[0].split('-')[0])) {
					typeMaxMin[gs.node.addition2] = 'min'
				}
				if (kindScore > stants[1]) {
					ATimes++
					typeMaxMin[gs.node.addition2] = (typeMaxMin[gs.node.addition2] || '') + 'A'
				}
				if (kindScore <= (+(stants[0].split('-')[1]) / 2)) {
					typeMaxMin[gs.node.addition2] = (typeMaxMin[gs.node.addition2] || '') + '2'
					times2++
				} else if (kindScore >= (+(stants[0].split('-')[1]) / 2)) {
					typeMaxMin[gs.node.addition2] = (typeMaxMin[gs.node.addition2] || '') + '1'
					times1++
				}
				if (gs.node.name !== '适中') {
					status = RecordStatus.ERROR
				}
				echartsOption.categories.push(typeSimple[gs.node.addition2])
				echartsOption.series[0]?.data.push(kindScore)
				echartsOption.series[1]?.data.push(stants[0]?.split('-')[0])
				echartsOption.series[2]?.data.push(stants[0]?.split('-')[1])
				adviceType[gs.node.addition2] =
					`该儿童${gs.node.addition2}的状态为${gs.node.name},其适中的标准值区间为${stants[0]},标准值中位数为${stants[1]}`


			}
		})
		adviceType['反应阀'] = adviceType['反应阈']
		delete stEvatypeScores['反应阈']
		delete adviceType['反应阈']
		let oneAdvice = '中间偏差难养型'
		let advice = '中间偏差难养型'

		// 难养型：4或5个维度得分大于平均值，必须包括反应强度；两个维度得分大于一个标准差。

		// 发动缓慢型：主要点同难养型，但若趋避性或适应性大于一个标准差，则活动水平不高出1/2标准差，情绪本质不低于1/2个标准差。

		// 中间型：所有其它。4或5个维度高于平均值，同时一个维度大于一个标准差；或，2或3大于一个平均值，同时2-3个维度大于一个标准差。
		if (typeMaxMin['反应强度'].indexOf('A') > -1 && ATimes >= 4) {
			if ((typeMaxMin['趋避性'].indexOf('max') > -1 ||
					typeMaxMin['适应性'].indexOf('max') > -1) && typeMaxMin['活动水平'].indexOf('2') > -1 && typeMaxMin[
					'情绪本质']
				.indexOf('1') > -1) {
				advice = '发动缓慢型'
				oneAdvice =
					'发动缓慢型儿童是指在大脑发育过程中出现了运动技能发展缓慢的情况，这可能会导致孩子在日常生活中的活动能力受到限制。建议是：需要给孩子感受到家人的支持和鼓励，为孩子提供安全的环境，提供合适的治疗和康复环境，适当的体育运动，提供适当的心理支持和帮助。'
			} else {
				advice = '难养型'
				oneAdvice = '需要家长给儿童创造安静的环境，提供稳定的日常生活，提供适当的刺激。'
			}
		} else if (maxTimes >= 2) {
			if ((typeMaxMin['趋避性'].indexOf('max') > -1 ||
					typeMaxMin['适应性'].indexOf('max') > -1) && typeMaxMin['活动水平'].indexOf('2') > -1 && typeMaxMin[
					'情绪本质']
				.indexOf('1') > -1) {
				advice = '发动缓慢型'
				oneAdvice =
					'发动缓慢型儿童是指在大脑发育过程中出现了运动技能发展缓慢的情况，这可能会导致孩子在日常生活中的活动能力受到限制。建议是：需要给孩子感受到家人的支持和鼓励，为孩子提供安全的环境，提供合适的治疗和康复环境，适当的体育运动，提供适当的心理支持和帮助。'

			} else {
				advice = '难养型'
				oneAdvice = '需要家长给儿童创造安静的环境，提供稳定的日常生活，提供适当的刺激。'
			}

		} else if (ATimes >= 4 && maxTimes === 0) {
			advice === '中间型'
			oneAdvice =
				'需要家长给儿童提供多样化的活动，儿童需要家长的支持和鼓励，以促进其自信心和积极性，同时也有助于提高其生活质量。儿童需要养成良好的日常生活习惯，包括饮食、睡眠等，以保持健康的身体和心理状态。培养儿童的社交能力，鼓励孩子自主学习，提供适当的挑战。'
		} else if (ATimes === 2 || ATimes === 3) {
			if (maxTimes === 2 || maxTimes === 3) {
				advice === '中间型'
				oneAdvice =
					'需要家长给儿童提供多样化的活动，儿童需要家长的支持和鼓励，以促进其自信心和积极性，同时也有助于提高其生活质量。儿童需要养成良好的日常生活习惯，包括饮食、睡眠等，以保持健康的身体和心理状态。培养儿童的社交能力，鼓励孩子自主学习，提供适当的挑战。'

			}
		} else {
			advice = '易养型'
			oneAdvice =
				'该儿童容易养育，但是家长也不可以完全放任儿童。儿童需要适当的挑战来促进其发展，包括参加比赛、学习新技能等，以激发其发展潜力。需要给儿童培养自信心，提供多样化的活动，鼓励孩子自主学习等。'
		}

		return {
			advice,
			oneAdvice,
			listTypeScores,
			adviceType,
			echartsOption,
			opts,
			status
		}
	}
	report13(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {
		stEvatypeScores['其他'] = stEvatypeScores['睡眠及饮食'] || stEvatypeScores['其他']
		delete stEvatypeScores['睡眠及饮食']
		let maxScore = []
		let listTypeScores = []
		let kind = 0
		let average = 0
		let status
		let echartsOption = {
			categories: [],
			series: []
		}
		for (const key in stEvatypeScores) {
			kind++
			const score = Math.round(stEvatypeScores[key] / topicTimes[key] * 100) / 100

			listTypeScores.push({
				danger: false,
				oneAdvice: '',
				score,
				label: key,
				name: listTypeScores.length,
				advice: adviceBigSCl.filter(big => big.title === key)?. [0]?.text || '',
				shouDo: ''
			})
			average = average + score
			if (score > 2) {

				if (maxScore.length === 0) {
					maxScore.push(key)
				} else {
					if (score > Math.round(stEvatypeScores[maxScore[0]] / topicTimes[maxScore[0]] * 100) / 100) {
						maxScore = [key]
					} else if (score === Math.round(stEvatypeScores[maxScore[0]] / topicTimes[maxScore[0]] * 100) /
						100) {
						maxScore.push(key)
					}
				}
			}
		}
		maxScore.map(max => {
			if (yingzi[max]) {
				listTypeScores = listTypeScores.map(item => {
					if (item.label === max) {
						status = RecordStatus.ERROR

						item.danger = true
						item.advice = item.advice + '该因子是最高的，' + yingzi[max]
					}
					return item
				})
			}

		})
		let min2Topic = 0
		for (const key in checkScaleItem) {
			if (checkScaleItem[key].score > 1) {
				min2Topic++
			}

		}
		average = Math.round(average / kind * 100) / 100
		listTypeScores.push({
			danger: false,
			oneAdvice: '',
			score: '',
			label: '阴性项目数',
			name: listTypeScores.length,
			advice: min2Topic,
			shouDo: ''
		})
		listTypeScores.push({
			danger: false,
			oneAdvice: '',
			score: '',
			label: '阴性症状均分',
			name: listTypeScores.length,
			advice: average,
			shouDo: ''
		})
		const adviceMore = this.gsDataGetDesc(gsData, scores)
		return {
			status,
			listTypeScores,
			...adviceMore,
			echartsOption
		}
	}
	report14(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {
		const kindTimes = {
			"家庭": 10,
			"学习和学校": 10,
			"生活技能": 10,
			"自我管理": 3,
			"社会活动": 7,
			"冒险活动": 10
		}
		let listTypeScores = []
		let status
		let advice = ''
		let oneAdvice = ''

		advData.edges?.map(adv => {
			const average = Math.round(stEvatypeScores[adv.node.nengqu] / kindTimes[adv.node.nengqu] *
				100) / 100
			if (adv.node.id === '1036') {
				oneAdvice = adv.node.adv
			}
			if ((average >= adv.node.smonth || +adv.node.smonth === -1) && (average <= adv.node.emonth || +
					adv.node.emonth === -1)) {
				listTypeScores.push({
					danger: average > 1.5,
					oneAdvice: average > 1.5 ? '异常' : '正常',
					score: average,
					label: adv.node.nengqu,
					name: listTypeScores.length,
					advice: adv.node.adv,
					shouDo: ''
				})
			}
		})
		const totalAverage = Math.round(scores / 50 * 100) / 100
		if (totalAverage > 1.5) {
			advice = '异常'
			status = RecordStatus.ERROR
		} else {
			advice = '正常'
		}

		return {
			listTypeScores,
			status,
			advice,
			oneAdvice,
			scores: totalAverage
		}
	}
	report15(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {
		sznl = Math.floor(sznl)
		let oneAdvice = ''
		let advice = ''

		let echartsOption = {
			categories: [
				"社会交流",
				"言语",
				"象征行为",
				"总分"
			],
			series: [{
					name: '得分',
					data: [stEvatypeScores["社会交流"], stEvatypeScores["言语"], stEvatypeScores["象征行为"], scores]
				},
				{
					name: '正常最低分',
					data: []
				},
				{
					name: '正常最高分',
					data: []
				}
			]
		}
		let echartsOption2 = {
			categories: [],
			series: [{
					name: '',
					data: [
						[],
						[],
						[],

					]
				},
				{
					name: "竖线",
					data: [
						[30, 0],
						[30, 80]
					]
				},
				{
					name: "竖线2",
					data: [
						[30, 0],
						[30, 80]
					]
				},
			]
		}
		let listTypeScores = []
		let opts2 = {
			color: ['#1890ff', '#ffffff0E', '#ffffff0E'],
			fontColor: '#fff',
			type: 'line',
			dataLabel: false,
			dataPointShape: true,
			// enableMarkLine: true,

			legend: {
				show: false
			},
			xAxis: {

				max: 100,
				min: 0,
				disabled: true,

			},
			yAxis: {
				disableGrid: true,
				disabled: true,

			},
			extra: {
				line: {
					type: 'curve',
					activeType: "hollow"

				},
				// markLine: {
				// 	data: [{
				// 		value: 45,
				// 		showLabel: true
				// 	}]
				// }
			}
		}
		const categories = {
			"社会交流": 0,
			"言语": 1,
			"象征行为": 2,
			"总分": 3
		}
		let status
		commonData?.edges?.map(comm => {

			if ((sznl >= +(comm.node.sage) || +(comm.node.sage) === -1) && (sznl <= +(comm.node.eage) || +(
					comm.node.eage) === -1)) {
				if (comm.node.remark === '正常') {
					echartsOption.series[1].data[categories[comm.node.type]] = +(comm.node.sedge)
					echartsOption.series[2].data[categories[comm.node.type]] = +(comm.node.eedge)
					if (comm.node.type === '总分') {
						opts2.xAxis.max = +(comm.node.eedge) + 5
						echartsOption2.series[0].data[0][0] = 0
						echartsOption2.series[0].data[0][1] = 0
						echartsOption2.series[0].data[1][0] = scores - 7
						echartsOption2.series[0].data[1][1] = scores
						echartsOption2.series[0].data[2][0] = +(comm.node.eedge) - 5
						echartsOption2.series[0].data[2][1] = +(comm.node.eedge)
						echartsOption2.series[1].data[0][0] = scores
						echartsOption2.series[1].data[1][0] = scores
						echartsOption2.series[1].data[1][1] = +(comm.node.eedge)
						echartsOption2.series[2].data[0][0] = +(comm.node.sedge)
						echartsOption2.series[2].data[1][0] = +(comm.node.sedge)
						echartsOption2.series[2].data[1][1] = +(comm.node.eedge)
					}

				}
				if (comm.node.type === '总分') {
					if ((scores >= +(comm.node.sedge) || +(comm.node.sedge) === -1) && (scores <= +(comm
							.node.eedge) || +(comm.node.eedge) === -1)) {
						advice = comm.node.remark
						oneAdvice = comm.node.remark2
					}
				} else if ((stEvatypeScores[comm.node.type] >= +(comm.node.sedge)) && (stEvatypeScores[comm
						.node.type] <= +(comm.node.eedge))) {

					listTypeScores.push({
						danger: comm.node.remark !== '正常',
						oneAdvice: comm.node.remark,
						score: stEvatypeScores[comm.node.type],
						label: comm.node.type,
						name: listTypeScores.length,
						advice: comm.node.remark2,
						shouDo: ''
					})
					if (comm.node.remark !== '正常') {
						status = RecordStatus.ERROR
					}
				}
			}

		})
		return {
			advice,
			oneAdvice,
			listTypeScores,
			echartsOption,
			echartsOption2,
			status,
			opts2
		}
	}
	report16(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {
		let opts = {

			xAxis: {
				fontSize: 13
			}
		}
		let oneAdvice = advData.edges[0]?.node?.adv
		let listTypeScores = []
		let status
		let tempTypeScores = {}
		commonData.edges?.map(comm => {
			if ((stEvatypeScores[comm.node.type] >= +comm.node.sedge || +comm.node.sedge === -1) && (
					stEvatypeScores[comm.node.type] <= +comm.node.eedge || +comm.node.eedge === -1)) {
				if (comm.node.type === '工作和职业') {
					tempTypeScores = {
						danger: comm.node.remark !== '正常',
						oneAdvice: '',
						score: stEvatypeScores[comm.node.type],
						label: comm.node.type,
						name: listTypeScores.length,
						advice: comm.node.remark,
						shouDo: ''
					}
				} else {
					listTypeScores.push({
						danger: comm.node.remark !== '正常',
						oneAdvice: '',
						score: stEvatypeScores[comm.node.type],
						label: comm.node.type,
						name: listTypeScores.length,
						advice: comm.node.remark,
						shouDo: ''
					})
				}

				if (comm.node.remark !== '正常') {
					status = RecordStatus.ERROR
				}
			}
		})
		listTypeScores.push(tempTypeScores)
		return {
			opts,
			oneAdvice,
			listTypeScores,
			status
		}
	}
	report18(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {
		let selectItem = {}
		for (const page in checkScaleItem) {
			switch (checkScaleItem[page]['stEvatype']) {
				case '词汇':
					switch (checkScaleItem[page]['score']) {
						case '2':
							selectItem['会说词汇数'] = selectItem['会说词汇数'] || 0
							selectItem['会说词汇数']++
							break;
						case '1':
							selectItem['理解词汇数'] = selectItem['理解词汇数'] || 0
							selectItem['理解词汇数']++
							selectItem['会说词汇数'] = selectItem['会说词汇数'] || 0
							selectItem['会说词汇数']++
							break;

					}
					break;
				case '手势':
					break;
				case '短语':

					if (checkScaleItem[page]['score'] === '1') {
						selectItem['理解短语数'] = selectItem['理解短语数'] || 0
						selectItem['理解短语数']++
					}
					break;
			}

		}
		selectItem['沟通性手势'] = stEvatypeScores['手势']
		selectItem['会说句子数'] = stEvatypeScores['句子']
		if (moduleName.indexOf('词汇及句子') > -1) {
			selectItem['会说词汇数'] = selectItem['会说词汇数'] || 0
			selectItem['会说句子数'] = selectItem['会说句子数'] || 0
		} else {
			selectItem['理解短语数'] = selectItem['理解短语数'] || 0
			selectItem['理解词汇数'] = selectItem['理解词汇数'] || 0
			selectItem['会说词汇数'] = selectItem['会说词汇数'] || 0
			selectItem['沟通性手势'] = selectItem['沟通性手势'] || 0
		}
		let advice = ''
		let oneAdvice = ''
		let listTypeScores = []
		sznl = Math.floor(sznl)

		advData.edges.map(data => {
			if ((sznl >= +data.node.smonth || +data.node.smonth === -1) && (sznl <= +data.node.emonth || +
					data.node.emonth === -1)) {

				oneAdvice += `${data.node.adv}\n`
			}
		})
		let typeNumber = {}
		commonData.edges.map(comm => {
			if (((sznl >= +comm.node.sage || +comm.node.sage === -1) && (sznl <= +comm.node.eage || +comm
					.node.eage === -1))) {
				typeNumber[comm.node.type] = typeNumber[comm.node.type] || []
				typeNumber[comm.node.type].push({})
				if ((selectItem[comm.node.type] >= +comm.node.sedge || +comm.node.sedge === -1) && (
						selectItem[comm.node.type] <= +comm.node.eedge || +comm.node.eedge === -1)) {
					if (comm.node.type === '理解短语数' || comm.node.type === '沟通性手势' || comm.node.type ===
						'会说句子数') {
						let remark = comm.node.remark.split('~')
						if (remark.length === 1) remark = comm.node.remark.split('～')
						const notError = selectItem[comm.node.type] >= +remark[0]

						listTypeScores.push({
							danger: !notError,
							oneAdvice: !notError ? '异常' : '正常',
							score: selectItem[comm.node.type],
							label: comm.node.type,
							name: listTypeScores.length,
							advice: `${sznl}月参考数值${comm.node.remark},该儿童${notError&&selectItem[comm.node.type] <= +remark[1] ?'在':'不在'}参考数值内`,
							shouDo: ''
						})

					} else {
						typeNumber[comm.node.type][typeNumber[comm.node.type].length - 1] = {
							is: true
						}
						listTypeScores.push({
							bai: true,
							danger: false,
							oneAdvice: '',
							score: selectItem[comm.node.type],
							label: comm.node.type,
							name: listTypeScores.length,
							advice: '',
							shouDo: ''
						})
					}
				}
			}
		})

		const baiAdvice = [{
			min: 0,
			max: 10,
			text: '下'
		}, {
			min: 10,
			max: 30,
			text: '中下'
		}, {
			min: 30,
			max: 70,
			text: '中'
		}, {
			min: 70,
			max: 90,
			text: '中上'
		}, {
			min: 90,
			max: 101,
			text: '上'
		}, ]
		listTypeScores = listTypeScores.map(list => {
			if (list.bai) {
				const bai = Math.floor(100 / typeNumber[list.label].length * 100) / 100

				typeNumber[list.label].map((type, index) => {
					if (type.is) {
						list.advice =
							`所处的百分位为${Math.floor(bai*(1+index))}%,处于${baiAdvice.filter(item=>Math.floor(bai*(1+index))>=item.min&&Math.floor(bai*(1+index))<item.max)?.[0]?.text}水平` +
							list.advice
					}
				})
			}
			return list
		})
		return {
			advice,
			listTypeScores,
			oneAdvice,
			notScore: true
		}
	}
	report20(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {
		let listTypeScores = []
		sznl = Math.floor(sznl)
		const sleepTime = [{
			min: 0,
			max: 3,
			sleep: '13-18小时'
		}, {
			min: 4,
			max: 11,
			sleep: '12-16小时'
		}, {
			min: 12,
			max: 35,
			sleep: '11-14小时'
		}, {
			min: 36,
			max: 60,
			sleep: '10-13小时'
		}, ]
		let sleepHour = +checkScaleItem[3].number[0] + +checkScaleItem[4].number[0]
		let sleepMinute = 0
		if ((+checkScaleItem[3].number[1] + +checkScaleItem[4].number[1]) >= 60) {
			sleepHour += Math.floor((+checkScaleItem[3].number[1] + +checkScaleItem[4].number[1]) / 60)
			sleepMinute += (+checkScaleItem[3].number[1] + +checkScaleItem[4].number[1]) % 60
		} else {
			sleepMinute += (+checkScaleItem[3].number[1] + +checkScaleItem[4].number[1])
		}
		let oneAdvice =
			'若婴儿脾胃功能弱，应该帮助儿童养成定时定点定量饮食习惯，每餐7分饱，合理搭配菜肉比例（大约2：1），必要时，采用中医方式干预。请给儿童一个良好的睡眠环境，空气清新，温度适宜，可在卧室开盏小灯，睡后应熄灯。不宜在卧室放置电脑、电话、电视、游戏机等设备。'
		listTypeScores.push({
			danger: false,
			oneAdvice: `${sleepHour}小时${sleepMinute}分钟`,
			score: '',
			label: '儿童全天睡眠时间',
			name: listTypeScores.length,
			advice: `推荐睡眠时间${sleepTime.filter(sleep=>sznl>=sleep.min&&sznl<=sleep.max)?.[0]?.sleep}`,
			shouDo: '婴儿如果睡眠时间不够，应固定就寝时间，晚上19:30~20:30就寝较合适，别超过21:00，但也不提倡过早上床，晚上入睡前应保持4小时以上清醒时间，准时上床，准时起床。'
		})
		listTypeScores.push({
			danger: false,
			oneAdvice: `${checkScaleItem[2].option}`,
			score: '',
			label: '儿童睡床方式',
			name: listTypeScores.length,
			advice: `婴儿宜睡在自己的婴儿床内，与父母同一房间。幼儿期有条件的家庭宜让儿童单独一个房间睡眠。1岁之前宜仰卧位睡眠，不宜俯卧位睡眠，直至婴幼儿可以自行变换睡眠姿势。`,
			shouDo: ''
		})
		listTypeScores.push({
			danger: false,
			oneAdvice: `${checkScaleItem[8].option}`,
			score: '',
			label: '儿童入睡方式',
			name: listTypeScores.length,
			advice: `良好的入睡方式是很重要的，学会“自我平静”是婴幼儿情感发育的必要过程 —在醒着或瞌睡但未睡着时放置小床睡眠，不宜摇睡、搂睡 —减少交流和互动，降低灯光、声音等环境刺激。不要依赖拍背或摇晃等安抚方式让婴儿入睡，不要让儿童在喂奶后才能入睡。将喂奶或进食与睡眠分开，至少在幼儿睡前1小时喂奶，允许幼儿抱安慰物入睡。`,
			shouDo: ''
		})
		listTypeScores.push({
			danger: false,
			oneAdvice: `${checkScaleItem[5].number[0]}次`,
			score: '',
			label: '夜醒次数',
			name: listTypeScores.length,
			advice: `家长应该帮助儿童建立睡眠昼夜节律。帮助婴儿学习识别白天和黑夜的差异，促进内在生物钟与外界环境同步，白天和晚上在固定的时间上床睡觉。`,
			shouDo: ''
		})
		return {
			oneAdvice,
			echartsOption: {},
			listTypeScores,
			notScore: true,
			notScoreTotal: true
		}
	}
	report22(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {
		let advice = ''
		let oneAdvice = ''
		let perc
		const typeAdvice = {
			'知觉辨别能力': '知觉辨别能力是指人类对于外部刺激的敏感度和识别能力。这种能力包括了我们对于感官信息的接收、处理和识别，例如视觉、听觉、触觉和嗅觉等。知觉辨别能力是人类智力的一个重要组成部分，也是人类能够适应和应对复杂环境的关键能力之一。',
			'类同比较能力': '类同比较能力是指人类将两个或多个事物进行比较和对比的能力。这种能力包括了我们对于事物的共性和差异的理解和分析，从而能够更好地认识和理解事物的本质和特征。类同比较能力是人类智力的一个重要组成部分，也是人类能够进行抽象思维和判断的关键能力之一。',
			'比较推理能力': '比较推理能力是指在比较两个或多个事物、概念、现象时，通过发现其相似和不同之处，从而得出结论的能力。比较推理能力是人类智力的一种关键组成部分，也是解决问题的重要能力之一。',
			'系列关系能力': '系列关系能力是指在一系列物品、数字、字母或图形中，通过捕捉它们之间的规律和趋势，从而推断并预测下一个物品、数字、字母或图形的能力。这种能力常常被用于智力测验和逻辑推理题中。系列关系能力是人类智力的一种重要组成部分，也是解决问题和应对复杂环境的关键能力之一。',
			'抽象推理能力': '抽象推理能力是指在没有明确的信息和规则下，通过发现潜在的模式和关联，从而进行推断、判断和解决问题的能力。这种能力通常需要人们运用逻辑思维、创造性思维和推理能力等多种智力能力进行综合运用。抽象推理能力是人类智力的重要组成部分之一，也是解决问题和应对复杂环境的关键能力之一。',
		}

		let listTypeScores = []
		sznl = Math.floor(sznl / 12)
		// IQ=100+15Z=100+15(X-M)/S
		percScore.map(item => {
			if (sznl >= item.sage && sznl <= item.eage) {

				if (scores >= item.sedge && scores < item.eedge) {
					perc = item.perc
					advice = '百分位:' + item.perc + '%,标准分:' + item.perc + ',IQ:' + (100 + (15 * (item.perc /
						100)))

				}
			}
		})

		gsData.edges.map(gs => {

			if ((perc >= +gs.node.sedge || +gs.node.sedge === -1) && (perc <= +gs.node.eedge || +gs.node
					.eedge === -1)) {
				oneAdvice = `${gs.node.name},${gs.node.desc}`
			}
		})
		advData.edges.map(data => {
			if (data.node.mrange.indexOf(oneAdvice.slice(0, 2)) > -1) {
				oneAdvice = oneAdvice + ',' + data.node.adv

			}
		})
		for (const type in stEvatypeScores) {
			listTypeScores.push({
				danger: false,
				oneAdvice: '',
				score: stEvatypeScores[type],
				label: type,
				name: listTypeScores.length,
				advice: typeAdvice[type],
				shouDo: ''
			})
		}

		return {

			advice,
			oneAdvice,
			listTypeScores
		}
	}
	report24(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {

		let advice = ''
		let adviceType = {}
		let listTypeScores = []
		let oneAdvice = ''
		let status
		let pjia = {
			'低风险': '婴儿过敏低风险需要采取一些预防措施，包括多饮水，保持婴儿肌肤的湿润:做好婴儿喂养管理，避免多食，选择诱气性好的衣物，注意婴儿体温的控制，避免过热或过冷，及早发现过敏症状，及时就医;定期进行体检，及早发现和积极治疗过敏性疾病等。',
			'中度风险': '婴儿过敏中度风险需要采取一些预防措施，包括使用温和的清洁产品;避免接触可能产生过敏反应的食物和物质，孕妈妈应多吃新鲜的蔬菜和水果，补充营养，定期进行体检，及早发现和积极治疗过敏性疾病;及时就医，及时服用抗过敏药物;定期进行室外活动，促进婴儿肺部发育等。',
			'高风险': '婴儿过敏高风险需要采取一些预防措施，包括饮食控制，避免接触可能产生过敏反应的食物，如花生、芝麻等;孕妇应避免吸烟和服用不良药物;避免接触可能产生过敏的物质如家具清洁剂等;多进行室外活动，促进婴儿肺部发育;定期进行体检，及早发现和积极治疗过敏性疾病等。'
		}
		if (scores / 4 <= 2) {
			advice = '低风险'

		} else if (scores / 4 >= 3 && scores / 4 <= 5) {
			advice = '中度风险'
			status = RecordStatus.ERROR
		} else {
			advice = '高风险'
			status = RecordStatus.ERROR
		}
		oneAdvice = pjia[advice]
		const typeAdvicePjia = {
			'遗传因素': '婴儿遗传因素导致过敏风险的原因主要有：一是遗传因素，如母亲有过敏性疾病史；二是室内环境因素，如室内温度、湿度、空气质量等；三是细菌、病毒、真菌等外界环境因素，它们可以直接或间接影响婴儿的免疫系统；四是激素、营养素等营养因素，如摄入不足的营养素会影响婴儿的免疫力；五是其他外界因素，如有毒物质、烟雾等。',
			'分娩及喂养方式': '婴儿分娩及喂养方式导致过敏风险的原因主要有：一是分娩方式，如早产、剖宫产等婴儿暴露在外界环境的时间较长，会影响婴儿的免疫力；二是喂养方式，如母乳喂养不足会影响婴儿的免疫力，母乳中的抗原物质可以提高婴儿的抗过敏能力；三是混合喂养，混合喂养容易引起肠道菌群紊乱，会影响婴儿的免疫力；四是婴儿喝水，如果出生后较迟喝水，会影响婴儿肠道菌群的发育，从而影响婴儿的免疫力。',
			'孕期用药': '婴儿孕期用药导致过敏风险的原因主要有：一是用药不当，如抗生素过多或过长使用，可引起婴儿免疫力降低；二是抗生素过敏，孕妈妈服用抗生素会传递给婴儿，可能会引起婴儿过敏反应；三是激素类药物，如激素类药物过量使用，可能会引起婴儿过敏反应；四是抗病毒类药物，如抗病毒类药物过量使用，也会引起婴儿过敏反应。',
			'环境因素': '婴儿环境因素导致过敏风险的原因主要有：一是室内环境因素，如室内温度、湿度、空气质量等；二是室外环境因素，如雾霾、烟尘等；三是重金属、有毒物质等环境污染物，它们可以直接或间接影响婴儿的免疫系统；四是植物尘螨等，它们也可以通过婴儿的呼吸道传播；五是花粉等，它们也会通过呼吸道影响婴儿的免疫力。'

		}
		let echartsOption = {
			categories: [],
			series: [{
					name: '得分',
					data: []
				},
				{
					name: '低风险最高分',
					data: []
				}
			]
		}
		for (const key in xxEvatypeScores) {
			if (xxEvatypeScores[key] <= 2) {
				adviceType[key] = '低风险'
			} else if (xxEvatypeScores[key] <= 5 && xxEvatypeScores[key] >= 3) {
				adviceType[key] = '中度风险'
			} else {
				adviceType[key] = '高风险'
			}
			echartsOption.categories.push(key)
			echartsOption.series[0].data.push(xxEvatypeScores[key])

			echartsOption.series[1].data.push(2)
			listTypeScores.push({
				danger: adviceType[key] !== '低风险',
				oneAdvice: adviceType[key],
				score: xxEvatypeScores[key],
				label: key,
				name: listTypeScores.length,
				advice: typeAdvicePjia[key],
				shouDo: ''
			})
		}

		return {
			status,
			advice,
			oneAdvice,
			listTypeScores,
			echartsOption
		}
	}

	report25(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {
		let oneAdvice = '测评题：'
		let listTypeScores = []
		for (const key in checkScaleItem) {
			if (checkScaleItem[key].score > 0) {
				oneAdvice = oneAdvice + key + ' '
			}
		}
		let status
		const s = /.*[0-9]+.*/
		// 是否包含数字
		if (s.test(oneAdvice)) {
			oneAdvice += '不通过,'

		} else {
			oneAdvice = ''
		}
		const adviceMore = this.gsDataGetDesc(gsData, scores)
		adviceMore.advice.indexOf('正常') > -1 ? status = RecordStatus.ERROR : ''
		oneAdvice += adviceMore.oneAdvice
		return {
			oneAdvice,
			advice: adviceMore.advice,
			listTypeScores,
			echartsOption: {},
			status,
		}
	}
	report26(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {
		let status
		const adviceMore = this.gsDataGetAdvScores(advData, scores)
		if (adviceMore.advice.indexOf('正常') === -1 && adviceMore.oneAdvice.indexOf('正常') === -1) {
			status = RecordStatus.ERROR
		}
		let oneAdvice = ''
		let listTypeScores = []
		const averageType = {
			'总分': {
				one: 42.1,
				top: 12.5
			},
			'清晨/上学前': {
				one: 8.54,
				top: 3.16
			},
			'学校': {
				one: 6.99,
				top: 2.39
			},
			'放学后': {
				one: 7.01,
				top: 2.41
			},
			'晚上': {
				one: 9.08,
				top: 3.11
			},
			'夜晚': {
				one: 6.25,
				top: 2.57
			},
			'总体行为': {
				one: 4.14,
				top: 1.80
			},
		}

		commonData.edges.map(comm => {
			if ((stEvatypeScores[comm.node.type] >= comm.node.sedge || +comm.node.sedge === -1) && (
					stEvatypeScores[comm.node.type] <= comm.node.eedge || +comm.node.eedge === -1)) {
				listTypeScores.push({
					danger: +comm.node.sedge === -1 || +comm.node.eedge === -1,
					oneAdvice: +comm.node.sedge != -1 && +comm.node.eedge !== -1 ? '正常' : '异常',
					score: stEvatypeScores[comm.node.type],
					label: comm.node.type,
					name: listTypeScores.length,
					advice: `该类型均值为${averageType[comm.node.type].one}±${averageType[comm.node.type].top},${comm.node.remark}`,
					shouDo: ''
				})
			}
		})

		return {
			...adviceMore,
			listTypeScores,
			status
		}
	}
	report27(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {
		if (moduleName === '中国中学生心理健康量表（MSSMHS）') {
			for (const type in stEvatypeScores) {
				stEvatypeScores[type] = Math.floor(stEvatypeScores[type] / 6 * 100) / 100
			}
			scores = Math.floor(scores / 60 * 100) / 100
		}
		const adviceMore = this.gsDataGetDesc2(gsData, {
			...stEvatypeScores,
			'总分': scores
		})

		return {
			...adviceMore
		}
	}
	report28(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {
		if (!isNaN(+sex)) {
			sex = sex === '0' ? '女' : '男'
		}

		sznl = Math.floor(sznl)
		let listTypeScores = []

		for (let key in checkScaleItem) {
			if (checkScaleItem[key].score === '0') { //在最后一个通过的前面选择了未通过 减分
				if (+key <= collectJson.lastPass) {
					scores -= 1
				}
			} else {
				if (+key > collectJson.lastPass) {
					scores += 1
				}
			}

		}
		const tscore = this.commDataGetTscore(commonData, sznl, scores)
		const adviceMore = this.gsDataGetDesc(gsData, tscore)
		let oneAdvice = ''
		advData.edges.some(adv => {
			if ((+tscore >= +adv.node.smonth || +adv.node.smonth === -1) && (+tscore <= +adv.node.emonth ||
					+adv.node.emonth === -1)) {
				oneAdvice = adv.node.adv
			}
			for (const type in stEvatypeScores) {
				if (adv.node.adv.indexOf(type) > -1) {
					listTypeScores.push({
						danger: false,
						oneAdvice: '',
						score: stEvatypeScores[type],
						label: type,
						name: listTypeScores.length,
						advice: adv.node.adv.slice(1),
						shouDo: ''
					})
				}
			}


		})

		return {
			scores,
			...adviceMore,
			oneAdvice: '标准分:' + tscore + ',' + oneAdvice,
			listTypeScores

		}
	}
	report29(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {
		let advice = ''
		// switch (typeof scores === 'number') {
		// 	case scores*2 >= 130:
		// 		advice = '极高智力水平'
		// 		break
		// 	case scores*2 >= 120:
		// 		advice = '很高智力水平'
		// 		break
		// 	case scores*2 >= 110:
		// 		advice = '高智力水平'
		// 		break
		// 	case scores*2 >= 90:
		// 		advice = '正常智力水平'
		// 		break
		// 	case scores*2 >= 80:
		// 		advice = '低智力水平'
		// 		break
		// 	case scores*2 >= 70:
		// 		advice = '很低智力水平'
		// 		break
		// 	case scores*2 <= 69:
		// 		advice = '极低智力水平'
		// 		break
		// }
		return {
			advice
		}
	}
	report30(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {
		const adviceMore = this.gsDataGetDesc(gsData, scores)
		let oneAdvice = this.gsDataGetAdvScores(advData, scores).oneAdvice
		let opts = {
			type: 'bar',
			extra: {
				bar: {
					type: 'stack',
					categoryGap: 3
				}
			}
		}
		return {
			...adviceMore,
			echartsOption: null,
			oneAdvice,
			opts
		}
	}
	report31(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {
		const tscore = this.commDataTypeGetTscore(commonData, Math.floor(sznl), stEvatypeScores)
		let listTypeScores = []
		let average = 0
		let echartsOption = {
			categories: [],
			series: [{
					name: '得分',
					data: []
				},
				{
					name: '正常最低分',
					data: []
				},
				{
					name: '正常最高分',
					data: []
				}
			]
		}
		for (const type in tscore) {
			average += +tscore[type]
			const adv = advData.edges?.filter(item => {
				if (item.node.mrange === '正常') {
					echartsOption.categories.push(type)
					echartsOption.series[0]?.data.push(tscore[type])
					echartsOption.series[1].data.push(+item.node.smonth === -1 ? 0 : +item.node.smonth)
					echartsOption.series[2].data.push(+item.node.emonth === -1 ? 100 : +item.node.emonth)
				}
				if ((tscore[type] >= +item.node.smonth ||
						+item.node.smonth === -1) &&
					(tscore[type] <= +item.node.emonth || +item.node.emonth === -1)) {

					return true
				}
			})?. [0]

			listTypeScores.push({
				danger: adv.node.mrange !== '正常',
				oneAdvice: adv.node.mrange,
				score: tscore[type],
				label: type,
				name: listTypeScores.length,
				advice: gtTypeAdvice.filter(ad => ad.type === type && ad.oneAdvice === adv.node.mrange)?. [
					0
				]?.advice,
				shouDo: ''
			})
		}
		average = average / Object.keys(tscore).length

		const totalAdv = advData.edges?.filter(item => (average >= +item.node.smonth ||
				+item.node.smonth === -1) &&
			(average <= +item.node.emonth || +item.node.emonth === -1))?. [0]

		return {
			listTypeScores,
			advice: totalAdv?.node.mrange,
			oneAdvice: totalAdv.node.adv,
			echartsOption
		}
	}
	
	report32(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {

		for (const type in stEvatypeScores) {
			if (xxEvatypeScores[type]) {
				xxEvatypeScores[type] += stEvatypeScores[type]

				delete stEvatypeScores[type]
			}
		}
		sznl = Math.floor(sznl / 12)
		if (!isNaN(+sex))
			sex = sex === '0' ? '女' : '男'
		const adviceMore = this.commDataHandle(commonData, xxEvatypeScores, sznl, sex, '优秀',
			'commDateTypeAgeGetRemark', scores)
		return {
			...adviceMore
		}
	}
	report33(
		checkScaleItem = {},
		advData = {},
		gsData = {},
		commonData = {},
		scores = 0,
		sznl = 0,
		moduleName = "",
		age = 0,
		sex = "",
		lbReportType = 0,
		xxEvatypeScores = {},
		stEvatypeScores = {},
		anstype = {}, collectJson = {}
	) {
		const adviceMore = this.commDataHandle(commonData, JSON.stringify(xxEvatypeScores) === '{}' ?
			stEvatypeScores : xxEvatypeScores)
		console.log(adviceMore, 'adviceMore', xxEvatypeScores, 'xx')
		return {
			...adviceMore
		}
	}
	gsDataGetAdvScores(advData, scores) {
		let oneAdvice = ''
		let advice = ''

		advData.edges.map(adv => {
			if ((scores >= adv.node.smonth || +adv.node.smonth === -1) && (scores <= adv.node.emonth || +adv
					.node.emonth === -1)) {

				oneAdvice = oneAdvice + adv.node.adv
				oneAdvice = oneAdvice.replace(/<br\/>/g, '\n')
				advice = adv.node.mrange
			}
		})

		return {
			advice,
			oneAdvice,

		}
	}
	commDataHandle(commData, typeScore, age, sex,
		statusTest = '优秀', handleFun = 'commDataTypeGetRemark', scores = 0) {
		let listTypeScores = []
		let advice = ''
		let oneAdvice = ''
		let opts = {
			extra: {
				column: {
					categoryGap: 4
				}
			},
			xAxis: {
				fontSize: 13
			}
		}
		let echartsOption = {
			categories: [],
			series: [{
					name: '得分',
					data: []
				},
				{
					name: statusTest + '最低分',
					data: []
				},
				{
					name: statusTest + '最高分',
					data: []
				}
			]
		}
		let status
		let labelLength = 0
		commData.edges?.map(comm => {

			const statusCom = this[handleFun](comm, typeScore, age, sex, statusTest, echartsOption,
				listTypeScores.length, labelLength, scores)
			console.log(statusCom, 'statusCom', handleFun)
			if (statusCom?.listTypeScores)
				listTypeScores.push(statusCom?.listTypeScores)
			if (statusCom?.status) status = statusCom.status
			if (statusCom?.echartsOption) echartsOption = statusCom.echartsOption
			if (statusCom?.labelLength) labelLength = statusCom.labelLength
			if (statusCom?.advice) advice = statusCom.advice
			if (statusCom?.oneAdvice) oneAdvice = statusCom.oneAdvice
			// if (statusCom?.com) {

			// 	listTypeScores.push({
			// 		danger: comm.node.tscore.indexOf(statusTest) === -1 && comm.node.tscore
			// 			.indexOf(
			// 				'中') === -1,
			// 		oneAdvice: comm.node.tscore,
			// 		score: typeScore[comm.node.type],
			// 		label: comm.node.type,
			// 		name: listTypeScores.length,
			// 		advice: comm.node.remark,
			// 		shouDo: ''
			// 	})
			// }
		})

		if (labelLength > 24) {
			opts.type = 'bar'
			delete opts.extra.column
			opts.yAxis = {
				data: [{
					fontSize: 11,
					type: 'categories'
				}, ],
			}

			opts.extra.bar = {
				type: "group",
				categoryGap: 4
			}
			opts.xAxis.disabled = true
			opts.xAxis.min = 0
		} else if (labelLength > 21) {
			opts.xAxis.fontSize = 11
		} else {
			opts.xAxis.fontSize = 13
		}

		return {
			advice,
			oneAdvice,
			listTypeScores,
			echartsOption,
			status,
			opts
		}
	}
	commDateTypeAgeGetRemark(comm, typeScore, age, sex, statusTest = '优秀', echartsOption, Llength, labelLength,
		scores) {

		let status
		if ((age >= +comm.node.sage || +comm.node.sage === -1) && (age <= +comm.node.eage || +comm.node.eage === -
				1)) {

			if (sex === comm.node.remark) {
				if (comm.node.tscore.indexOf(statusTest) > -1 && comm.node.type.indexOf('总') === -1) {


					echartsOption.categories.push(comm.node.type)
					echartsOption.series[0].data.push(typeScore[comm.node.type] || scores)
					echartsOption.series[1].data.push(+comm.node.sedge === -1 ? 0 : +comm.node.sedge)
					echartsOption.series[2].data.push(+comm.node.eedge === -1 ? 100 : +comm.node.eedge)

				}
				if (comm.node.type.indexOf('总') > -1) {
					if ((scores >= +comm.node.sedge || +comm.node.sedge === -1) && (scores <= +comm.node.eedge || +
							comm.node.eedge === -1)) {
						if (comm.node.tscore.indexOf(statusTest) === -1 && comm.node.tscore.indexOf(
								'中') === -1) {
							status = RecordStatus.ERROR

						}

						return {
							labelLength,
							echartsOption,
							advice: comm.node.tscore,
							oneAdvice: comm.node.remark2,
							com: true,
							status
						}
					}
				} else if ((typeScore[comm.node.type] >= +comm.node.sedge || +comm.node.sedge === -1) && (typeScore[
						comm.node.type] <= +comm.node.eedge || +comm.node.eedge === -1)) {
					if (comm.node.tscore.indexOf(statusTest) === -1 && comm.node.tscore.indexOf(
							'中') === -1) {
						status = RecordStatus.ERROR

					}
					labelLength += comm.node.type.length

					return {
						labelLength,
						echartsOption,
						listTypeScores: {

							danger: comm.node.tscore.indexOf(statusTest) === -1 && comm.node.tscore
								.indexOf(
									'中') === -1,
							oneAdvice: comm.node.tscore,
							score: typeScore[comm.node.type],
							label: comm.node.type,
							name: Llength,
							advice: comm.node.remark2,
							shouDo: ''
						},
						com: true,
						status
					}

				}
			}

		}



	}
	commDataTypeGetRemark(comm, typeScore, age, sex,
		statusTest = '优秀', echartsOption, Llength, labelLength, scores

	) {
		console.log(1, comm, typeScore, age, sex, statusTest = '优秀', echartsOption, Llength, labelLength, scores)
		let status
		if (comm.node.tscore.indexOf(statusTest) > -1) {
			echartsOption.categories.push(comm.node.type)
			echartsOption.series[0].data.push(typeScore[comm.node.type])
			echartsOption.series[1].data.push(+comm.node.sedge === -1 ? 0 : +comm.node.sedge)
			echartsOption.series[2].data.push(+comm.node.eedge === -1 ? 100 : +comm.node.eedge)
		}
		if ((typeScore[comm.node.type] >= +comm.node.sedge || +comm.node.sedge === -1) && (typeScore[
				comm.node.type] <= +comm.node.eedge || +comm.node.eedge === -1)) {
			if (comm.node.tscore.indexOf(statusTest) === -1 && comm.node.tscore.indexOf(
					'中') === -1) {
				status = RecordStatus.ERROR

			} {
				console.log(111)
				labelLength += comm.node.type.length
				return {
					labelLength,
					echartsOption,
					listTypeScores: {

						danger: comm.node.tscore.indexOf(statusTest) === -1 && comm.node.tscore
							.indexOf(
								'中') === -1,
						oneAdvice: comm.node.tscore,
						score: typeScore[comm.node.type],
						label: comm.node.type,
						name: Llength,
						advice: comm.node.remark,
						shouDo: ''
					},
					com: true,
					status
				}

			}
		}
	}
	commDataTypeGetTscore(commData, age, typeScore) {
		let tscore = {}
		commData.edges?.map(comm => {
			if ((age >= +comm.node.sage || +comm.node.sage) && (age <= +comm.node.eage || +comm.node
					.eage)) {
				if ((typeScore[comm.node.type] >= +comm.node.sedge || +comm.node.sedge === -1) && (
						typeScore[comm.node.type] <= +comm.node.eedge || +comm.node.eedge === -1)) {
					tscore[comm.node.type] = comm.node.tscore
				}
			}
		})
		return tscore
	}
	commDataGetTscore(commData, age, score) {
		let tscore
		commData.edges?.map(comm => {
			if ((age >= +comm.node.sage || +comm.node.sage) && (age <= +comm.node.eage || +comm.node
					.eage)) {
				if ((score >= +comm.node.sedge || +comm.node.sedge) && (score <= +comm.node.eedge ||
						+comm
						.node.eedge)) {
					tscore = comm.node.tscore
				}
			}
		})
		return tscore
	}
	gsDataGetDesc2(gsData, typeScore, statusText = '正常') {

		let status
		let listTypeScores = []
		let advice = ''
		let oneAdvice = ''
		let echartsOption = {
			categories: [],
			series: [{
					name: '得分',
					data: []
				},
				{
					name: '正常最低分',
					data: []
				},
				{
					name: '正常最高分',
					data: []
				}
			]
		}
		let opts = {

			xAxis: {
				fontSize: Object.keys(typeScore).join('').length > 21 ? 11 : 13
			},
			extra: {

				column: {
					categoryGap: 4
				}
			}
		}

		gsData?.edges?.map(gs => {
			if (gs.node.desc.indexOf(statusText) > -1) {
				echartsOption.categories.push(gs.node.name)
				echartsOption.series[0].data.push(typeScore[gs.node.name])
				echartsOption.series[1].data.push(+(gs.node.sedge))
				echartsOption.series[2].data.push(+(gs.node.eedge))
			}
			if ((typeScore[gs.node.name] >= +(gs.node.sedge) || +(gs.node.sedge) === -1) &&
				(typeScore[gs.node.name] <= +(gs.node.eedge) || +(gs.node.eedge) === -1)) {
				if (gs.node.desc.indexOf(statusText) === -1) {
					status = RecordStatus.ERROR
				}
				if (gs.node.name.indexOf('总') > -1) {
					advice = gs.node.desc
					oneAdvice = gs.node.addition2
				} else {
					listTypeScores.push({
						danger: gs.node.desc.indexOf(statusText) === -1,
						oneAdvice: gs.node.desc,
						score: typeScore[gs.node.name],
						label: gs.node.name,
						name: listTypeScores.length,
						advice: gs.node.addition2||gs.node.addition1,
						shouDo: ''
					})
				}


			}
		})
		if (Object.keys(typeScore).join('').length > 24) {
			opts.type = 'bar'
			delete opts.extra.column
			opts.yAxis = {
				data: [{
					fontSize: 11,
					type: 'categories'
				}, ],
			}

			opts.extra.bar = {
				type: "group",
				categoryGap: 4
			}
			opts.xAxis.disabled = true
			opts.xAxis.min = 0

		} else if (Object.keys(typeScore).join('').length > 21) {
			opts.xAxis.fontSize = 11
		} else {
			opts.xAxis.fontSize = 13
		}
		return {
			listTypeScores,
			status,
			advice,
			oneAdvice,
			echartsOption,
			opts
		}
	}
	gsDataGetDesc(gsData, scores) {
		let oneAdvice = ''
		let advice = ''
		let echartsOption = {
			categories: [],
			series: [{
					name: '最低分',
					data: []
				},
				{
					name: '最高分',
					data: []
				}
			]
		}
		let opts = {
			xAxis: {

			},
			extra: {
				column: {
					categoryGap: 4
				}
			}

		}
		let labelLength = 0
		let label = new Set()
		gsData?.edges?.map(gs => {
			if (!label.has(gs.node.name)) {
				labelLength += gs.node.name.length
			}
			label.add(gs.node.name)
			echartsOption.categories.push(gs.node.name)
			echartsOption.series[0].data.push(+gs.node.sedge === -1 ? 0 : +gs.node.sedge)
			echartsOption.series[1].data.push(+gs.node.eedge === -1 ? (+gs.node.sedge > 100 ? (+gs
				.node
				.sedge > 200 ? 300 : 200) : 100) : +gs.node.eedge)

			if ((scores >= +(gs.node.sedge) || +(gs.node.sedge) === -1) && (scores <= +(gs.node
					.eedge) || +(
					gs.node.eedge) === -1)) {

				advice = gs.node.name
				oneAdvice = gs.node.desc
			}
		})
		if (labelLength > 31) {
			opts.xAxis.fontSize = 8
		} else if (labelLength > 29) {
			opts.xAxis.fontSize = 10
		} else if (labelLength > 21) {
			opts.xAxis.fontSize = 11
		} else {
			opts.xAxis.fontSize = 13
		}

		return {
			oneAdvice,
			advice,
			echartsOption,
			opts
		}
	}
}
