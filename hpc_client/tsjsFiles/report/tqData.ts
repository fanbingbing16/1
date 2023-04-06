export const typeTimes: { [key: string]: { [key: string]: number } } = {
	'5-11个月婴儿气质量表': {
	},
	'1-4个月婴儿气质量表': {


	},
	'1~3岁幼儿气质量表': {


	},
	'3~7岁儿童气质量表': {
	}
}
export const typeStandas: { [key: string]: { min: number, max: number, value: { [key: string]: string } }[] } = {
	'5-11个月婴儿气质量表': [{
	}],
	'1-4个月婴儿气质量表': [
	],
	'1~3岁幼儿气质量表': [
	],
	'3~7岁儿童气质量表': [
	]
}
export const typeStand: { [key: string]: { min: number, max: number, value: { [key: string]: string } }[] } = {
	'5-11个月婴儿气质量表': [{
	}],
	'1-4个月婴儿气质量表': [
	],
	'1~3岁幼儿气质量表': [
	],
	'3~7岁儿童气质量表': [
	]
}
export const topicL = {
	1: [{ title: '分裂样', max: 5 }, { title: '抑郁', max: 9 }, { title: '交往不良', max: 5 },
	{ title: '强迫性', max: 8 }, { title: '躯体诉述', max: 6 }, { title: '社交退缩', max: 5 },
	{ title: '多动', max: 10 }, { title: '攻击性', max: 19 }, { title: '违纪', max: 7 }],
	2: [{ title: '抑郁', max: 13 }, { title: '社交退缩', max: 8 }, { title: '躯体诉述', max: 8 },
	{ title: '分裂强迫', max: 3 }, { title: '多动', max: 10 }, { title: '性问题', max: 3 },
	{ title: '违纪', max: 2 }, { title: '攻击性', max: 18 }, { title: '残忍', max: 3 }],
	3: [{ title: '躯体诉述', max: 10 }, { title: '分裂样', max: 7 }, { title: '交往不良', max: 14 },
	{ title: '不成熟', max: 5 }, { title: '强迫性', max: 5 }, { title: '敌意性', max: 10 },
	{ title: '违纪', max: 8 }, { title: '攻击性', max: 18 }, { title: '多动性', max: 9 }],
	4: [{ title: '焦虑强迫', max: 17 }, { title: '躯体诉述', max: 7 }, { title: '分裂样', max: 3 },
	{ title: '抑郁退缩', max: 12 }, { title: '不成熟', max: 11 }, { title: '违纪', max: 11 },
	{ title: '攻击性', max: 17 }, { title: '残忍', max: 4 }],
	5: [{ title: '活动能力', max: 3 }, { title: '社交情况', max: 3 }, { title: '学校情况', max: 2 }],
	6: [{ title: '活动能力', max: 2.5 }, { title: '社交情况', max: 3.5 }, { title: '学校情况', max: 3 }],
	7: [{ title: '活动能力', max: 3.5 }, { title: '社交情况', max: 3.5 }, { title: '学校情况', max: 2 }],
	8: [{ title: '活动能力', max: 3 }, { title: '社交情况', max: 3 }, { title: '学校情况', max: 3 }],

}
export const mChatAdvice = [
	{ title: '正常', text: '家长应定期观察孩子的发育情况，虽然没发现有孤独症风险，但是依旧建议每2个月重新检查一次。早发现和早干预对于儿童孤独症的症状至关重要。' },
	{ title: '筛查不通过', text: '有孤独症风险，建议家长尽快带孩子去区妇幼保健院进行进一步检查。如果暂时没有去医院检查，建议每个月对孩子进行重复测试，如果连续两个月测试结果都表示有风险，则一定要带孩子去医院接受进一步检查，早发现和早干预对于儿童孤独症至关重要。' },
	{ title: '存在孤独症或其他发育障碍风险', text: '有很大的孤独症风险，建议家长尽快带孩子去区妇幼保健院进行进一步检查。早发现和早干预对于儿童孤独症至关重要。' },

]
export const percScore = [
	{ sage: 0, eage: 7, sedge: 0, eedge: 22, perc: 3 }, { sage: 0, eage: 7, sedge: -1, eedge: 22, perc: 3 }, { sage: 0, eage: 7, sedge: 22, eedge: 30, perc: 9 },
	{ sage: 0, eage: 7, sedge: 30, eedge: 35, perc: 25 }, { sage: 0, eage: 7, sedge: 35, eedge: 40, perc: 50 }, { sage: 0, eage: 7, sedge: 40, eedge: 44, perc: 75 },
	{ sage: 0, eage: 7, sedge: 44, eedge: 47, perc: 91 }, { sage: 0, eage: 7, sedge: 47, eedge: 100, perc: 98 }, { sage: 8, eage: 8, sedge: 0, eedge: 25, perc: 3 },
	{ sage: 8, eage: 8, sedge: 25, eedge: 34, perc: 9 }, { sage: 8, eage: 8, sedge: 34, eedge: 39, perc: 25 }, { sage: 8, eage: 8, sedge: 39, eedge: 47, perc: 50 },
	{ sage: 8, eage: 8, sedge: 47, eedge: 48, perc: 75 }, { sage: 8, eage: 8, sedge: 48, eedge: 55, perc: 91 }, { sage: 8, eage: 8, sedge: 55, eedge: 100, perc: 98 },
	{ sage: 9, eage: 9, sedge: 0, eedge: 27, perc: 3 },
	{ sage: 9, eage: 9, sedge: 27, eedge: 38, perc: 9 }, { sage: 9, eage: 9, sedge: 38, eedge: 43, perc: 25 }, { sage: 9, eage: 9, sedge: 43, eedge: 49, perc: 50 },
	{ sage: 9, eage: 9, sedge: 49, eedge: 52, perc: 75 }, { sage: 9, eage: 9, sedge: 52, eedge: 54, perc: 91 }, { sage: 9, eage: 9, sedge: 54, eedge: 100, perc: 98 },
	{ sage: 10, eage: 11, sedge: 0, eedge: 29, perc: 3 },
	{ sage: 10, eage: 11, sedge: 29, eedge: 42, perc: 9 }, { sage: 10, eage: 11, sedge: 42, eedge: 47, perc: 25 }, { sage: 10, eage: 11, sedge: 47, eedge: 52, perc: 50 },
	{ sage: 10, eage: 11, sedge: 52, eedge: 56, perc: 75 }, { sage: 10, eage: 11, sedge: 56, eedge: 59, perc: 91 }, { sage: 10, eage: 11, sedge: 59, eedge: 100, perc: 98 },
	{ sage: 12, eage: 13, sedge: 0, eedge: 31, perc: 3 },
	{ sage: 12, eage: 13, sedge: 31, eedge: 46, perc: 9 }, { sage: 12, eage: 13, sedge: 46, eedge: 51, perc: 25 }, { sage: 12, eage: 13, sedge: 51, eedge: 56, perc: 50 },
	{ sage: 12, eage: 13, sedge: 56, eedge: 59, perc: 75 }, { sage: 12, eage: 13, sedge: 59, eedge: 62, perc: 91 }, { sage: 12, eage: 13, sedge: 62, eedge: 100, perc: 98 },
	{ sage: 14, eage: 15, sedge: 0, eedge: 33, perc: 3 },
	{ sage: 14, eage: 15, sedge: 33, eedge: 49, perc: 9 }, { sage: 14, eage: 15, sedge: 49, eedge: 54, perc: 25 }, { sage: 14, eage: 15, sedge: 54, eedge: 59, perc: 50 },
	{ sage: 14, eage: 15, sedge: 59, eedge: 63, perc: 75 }, { sage: 14, eage: 15, sedge: 63, eedge: 65, perc: 91 }, { sage: 14, eage: 15, sedge: 65, eedge: 100, perc: 98 },
	{ sage: 16, eage: 19, sedge: 0, eedge: 35, perc: 3 },
	{ sage: 16, eage: 19, sedge: 35, eedge: 51, perc: 9 }, { sage: 16, eage: 19, sedge: 51, eedge: 57, perc: 25 }, { sage: 16, eage: 19, sedge: 57, eedge: 62, perc: 50 },
	{ sage: 16, eage: 19, sedge: 62, eedge: 65, perc: 75 }, { sage: 16, eage: 19, sedge: 65, eedge: 67, perc: 91 }, { sage: 16, eage: 19, sedge: 67, eedge: 100, perc: 98 },
	{ sage: 20, eage: 24, sedge: 0, eedge: 41, perc: 3 },
	{ sage: 20, eage: 24, sedge: 41, eedge: 55, perc: 9 }, { sage: 20, eage: 24, sedge: 55, eedge: 61, perc: 25 }, { sage: 20, eage: 24, sedge: 61, eedge: 64, perc: 50 },
	{ sage: 20, eage: 24, sedge: 64, eedge: 67, perc: 75 }, { sage: 20, eage: 24, sedge: 67, eedge: 69, perc: 91 }, { sage: 20, eage: 24, sedge: 69, eedge: 100, perc: 98 },
	{ sage: 25, eage: 29, sedge: 0, eedge: 39, perc: 3 },
	{ sage: 25, eage: 29, sedge: 39, eedge: 53, perc: 9 }, { sage: 25, eage: 29, sedge: 53, eedge: 58, perc: 25 }, { sage: 25, eage: 29, sedge: 58, eedge: 63, perc: 50 },
	{ sage: 25, eage: 29, sedge: 63, eedge: 66, perc: 75 }, { sage: 25, eage: 29, sedge: 66, eedge: 69, perc: 91 }, { sage: 25, eage: 29, sedge: 69, eedge: 100, perc: 98 },
	{ sage: 30, eage: 34, sedge: 0, eedge: 28, perc: 3 },
	{ sage: 30, eage: 34, sedge: 28, eedge: 44, perc: 9 }, { sage: 30, eage: 34, sedge: 44, eedge: 53, perc: 25 }, { sage: 30, eage: 34, sedge: 53, eedge: 59, perc: 50 },
	{ sage: 30, eage: 34, sedge: 59, eedge: 63, perc: 75 }, { sage: 30, eage: 34, sedge: 63, eedge: 68, perc: 91 }, { sage: 30, eage: 34, sedge: 68, eedge: 100, perc: 98 },
	{ sage: 35, eage: 2000, sedge: 0, eedge: 28, perc: 3 },
	{ sage: 35, eage: 2000, sedge: 28, eedge: 44, perc: 9 }, { sage: 35, eage: 2000, sedge: 44, eedge: 53, perc: 25 }, { sage: 35, eage: 2000, sedge: 53, eedge: 59, perc: 50 },
	{ sage: 35, eage: 2000, sedge: 59, eedge: 63, perc: 75 }, { sage: 35, eage: 2000, sedge: 63, eedge: 68, perc: 91 }, { sage: 35, eage: 2000, sedge: 68, eedge: 100, perc: 98 },
]

// export const yue =
// 	[[6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24],
// 	['正常', '可疑', '正常', '可疑', '正常', '可疑', '正常', '可疑', '正常', '可疑', '正常', '可疑', '正常', '可疑', '正常', '可疑', '正常', '可疑', '正常', '可疑', '正常', '可疑', '正常', '可疑', '正常', '可疑', '正常', '可疑', '正常', '可疑', '正常', '可疑', '正常', '可疑', '正常', '可疑', '正常', '可疑',],
// 	['8-26', '0-7', '8-26', '0-7', '8-26', '0-7', '8-26', '0-8', '9-26', '0-11', '13-26', '0-12', '14-26', '0-13', '15-26', '0-14', '16-26', '0-15', '18-26', '0-17', '18-26', '0-17', '18-26', '0-17', '18-26', '0-17', '18-26', '0-17', '19-26', '0-18', '19-26', '0-18', '19-26', '0-18', '19-26', '0-18', '19-26', '0-18',],
// 	['2-14', '0-1', '2-14', '0-1', '4-14', '0-1', '4-14', '0-3', '5-14', '0-4', '5-14', '0-4', '6-14', '0-5', '7-14', '0-6', '7-14', '0-6', '7-14', '0-6', '7-14', '0-6', '8-14', '0-7', '8-14', '0-7', '8-14', '0-7', '9-14', '0-8', '9-14', '0-8', '9-14', '0-8', '10-14', '0-9',],
// 	['6-14', '0-5', '3-17', '0-2', '3-17', '0-2', '4-17', '0-2', '4-17', '0-3', '5-17', '0-4', '6-17', '0-5', '7-17', '0-6', '8-17', '0-7', '9-17', '0-8', '10-17', '0-9', '11-17', '0-10', '11-17', '0-10', '11-17', '0-10', '11-17', '0-10', '12-17', '0-11', '12-17', '0-11', '12-17', '0-11', '13-17', '0-12', '13-17', '0-12',],
// 	['13-57', '0-12', '14-57', '0-13', '16-57', '0-13', '18-57', '0-17', '23-57', '0-22', '25-57', '0-24', '28-57', '0-27', '29-57', '0-28', '33-57', '0-33', '35-57', '0-34', '0-35', '37-57', '0-36', '38-57', '0-37', '38-57', '0-37', '39-57', '0-38', '40-57', '0-39', '40-57', '0-39', '42-57', '0-41', '42-57', '0-41',]]

export const gtTypeAdvice = [
	{ type: '学习能力', oneAdvice: '正常', advice: '孩子在此方面是正常的，请平时多关注孩子的情况，若有异常需要警觉' },
	{
		type: '学习能力', oneAdvice: '重度失调', advice: '你可以寻求专业的学习指导，比如学习障碍治疗师或学习教育专家，他们可以提供一些针对性的学习方法和技巧，帮助你提高学习能力。'
	}, {
		type: '学习能力', oneAdvice: '轻度失调', advice: '学习时要保持专注，避免分心。可以采取一些让自己保持专注的方法，比如将手机等电子产品放在一边，关注学习内容，避免被外界干扰。'
	}, {
		type: '学习能力', oneAdvice: '中度失调', advice: '制定一个固定的学习计划，每天按时完成学习任务，让自己养成良好的学习习惯和规律。可以将学习计划写下来，每天勾选完成的任务，以激励自己。'
	}, { type: '触觉防御', oneAdvice: '正常', advice: '孩子在此方面是正常的，请平时多关注孩子的情况，若有异常需要警觉' }, {
		type: '触觉防御', oneAdvice: '重度失调', advice: '儿童触觉防御重度失常又称为儿童触觉过敏，是一种常见的儿童神经发育障碍。家长可以带孩子去儿童神经科或者儿童心理科进行专业的治疗，医生会根据孩子的具体情况制定相应的治疗方案，包括物理治疗、行为治疗、药物治疗等。家长需要配合医生完成治疗计划。'
	}, {
		type: '触觉防御', oneAdvice: '轻度失调', advice: '儿童触觉防御轻度失常是指孩子在接受外界刺激时出现一定的过敏反应，包括过度反应或者回避反应等。家长可以逐步引导孩子适应不同的刺激，比如触碰、贴纸、绑带等，让孩子逐渐适应这些刺激，减轻孩子的过敏反应。'
	}, {
		type: '触觉防御', oneAdvice: '中度失调', advice: '儿童触觉防御中度失常是指孩子在接受外界刺激时出现较为明显的过敏反应，甚至可能会导致孩子的日常生活和学习受到一定的影响。家长可以帮助孩子学习自我调节的方法，比如深呼吸、放松训练等，让孩子学会如何自我缓解过敏症状。'
	}, { type: '本体感', oneAdvice: '正常', advice: '孩子在此方面是正常的，请平时多关注孩子的情况，若有异常需要警觉' }, {
		type: '本体感', oneAdvice: '重度失调', advice: '本体感（Proprioception）是指人体内部的感觉系统，包括肌肉、关节、韧带、皮肤等器官，通过反馈机制向大脑提供身体位置、运动方向、肌肉张力等信息，从而使人能够感知身体的位置、姿势和运动状态。家长可以给孩子提供适当的运动机会，比如爬行、跳跃、游泳、跳舞等，这些运动可以帮助孩子加强肌肉协调性和平衡感，有利于增强本体感。'
	}, {
		type: '本体感', oneAdvice: '轻度失调', advice: '本体感（Proprioception）是指人体内部的感觉系统，包括肌肉、关节、韧带、皮肤等器官，通过反馈机制向大脑提供身体位置、运动方向、肌肉张力等信息，从而使人能够感知身体的位置、姿势和运动状态。家长可以选择一些适合孩子的游戏，比如捉迷藏、跳绳、平衡球等，这些游戏可以帮助孩子锻炼身体，增强本体感觉。'
	}, {
		type: '本体感', oneAdvice: '中度失调', advice: '本体感（Proprioception）是指人体内部的感觉系统，包括肌肉、关节、韧带、皮肤等器官，通过反馈机制向大脑提供身体位置、运动方向、肌肉张力等信息，从而使人能够感知身体的位置、姿势和运动状态。家长可以帮助孩子学习一些自我调节的方法，比如深呼吸、放松训练等，让孩子学会如何自我缓解焦虑和不安情绪。'
	}, { type: '大肌肉及平衡感', oneAdvice: '正常', advice: '孩子在此方面是正常的，请平时多关注孩子的情况，若有异常需要警觉' }, {
		type: '大肌肉及平衡感', oneAdvice: '重度失调', advice: '大肌肉及平衡感重度失常可能是由于神经系统或肌肉骨骼系统的问题导致的，需要寻求专业的医生和治疗师进行诊断和治疗。'
	}, {
		type: '大肌肉及平衡感', oneAdvice: '轻度失调', advice: '家长可以鼓励孩子多参加一些运动活动，比如跳绳、跑步、骑车等，这些运动可以帮助孩子增强肌肉协调性和平衡感，有助于改善大肌肉和平衡感失常的问题。'
	}, {
		type: '大肌肉及平衡感', oneAdvice: '中度失调', advice: '对于大肌肉及平衡感中度失常的孩子，建议家长及时寻求专业的医生和治疗师进行评估和治疗，以便及时缓解孩子的症状。'
	}]