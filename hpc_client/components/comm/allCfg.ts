// //平台类型
// export enum Platform {
//   android = "android", //安卓
//   ios = "ios", //IOS
//   web = "web", //网页
//   other = "other", //其他
// }

//渠道枚举
export enum Ptype {
	gm = "gm", //官方平台
	weixin = "weixin", //微信小程序
}
//咨询师状态

export enum ConsultDoctorStatus {
	NOTACTIVE = 0, // 审核申请中
	APPROVE = 1, // 通过申请审核，等待上传详细资料
	REJECT = 2, // 驳回申请审核
	ACTIVE = 3, // 通过资料验证
	DISABLED = 4, // 驳回资料验证,
	DOCPENGDING = 5, // 资料上传等待审核
}
export const consultDoctorStatusText2 = {
	'0': '待审核',
	'2': '审核失败',
	'3': '通过资料验证',
	'4': '驳回申请审核', 
	'5': '资料审核中',
	'1': '通过申请审核，须上传详细资料',
}
export const consultDoctorStatusText = {
	'待审核': '0',
	'审核失败': '2',
	'通过资料验证': '3',
	'驳回申请审核': '4',
	'资料审核中':'5',
	'通过申请审核，须上传详细资料': '1',

}
//订单状态
export enum PaymenStatus {
	cancel = -1, // 取消订单
	pengding = 0, // 等待支付
	success = 1, // 支付成功
	pengdingRefund = 2, // 退款中
	refund = 3, // 已退款
}
export const paymentStartusText = {
	'-1': '已取消',
	'0': '待结算',
	'1': '已结算',
	'2': '退款中',
	'3': '已退款'
}
//道具类型
export enum ItemKind {
	lbEver = 1, //永久量表
	lbOne = 2, //单个量表
	lbOneFst = 3, //单个量表 先做后付
}
// 报告status
export enum RecordStatus { //状态-0未完成1暂存2完成 -1异常
	PENGDING = 0,
	STAGING = 1,
	SUCCESS = 2,
	ERROR = -1,
}
interface AllCfg {
	//平台信息
	sdk: {
		info: {
			//平台物料表
			[sdkId: string]: {
				ptype: Ptype;
				phoneId: string;
				param: { [key: string]: string };
				secret: { [key: string]: string };
			};
		};
		pack: {
			//打包信息
			[pid: string]: {
				name: string;
				sevId: string; //服务器ID
				loginSdk: string; //登录sdkId
				phoneId: string; //手机号分组
				//其他配置
			};
		};
		sev: {
			//服务器配置
			[sevId: string]: {
				name: string; //服务器名字
				domain: string; //访问地址
				callBack: string; //回调地址
				admin: string; //后台域名
				cdn: string; //素材服务器
			};
		};
	};
	//业务配置
	const: {
		appName: string;//应用名称
		sonMax: number; //允许的家属上限
	};
}

export const allCfg: AllCfg = {
	sdk: {
		info: {
			//平台信息配置
			"1": {
				ptype: Ptype.gm,
				phoneId: "1",
				param: { appid: "1" },
				secret: {},
			},
			"2": {
				ptype: Ptype.weixin,
				phoneId: "1",
				param: { appid: "wx02e3c4186652fb69", secret: '--' },
				secret: {},
			},
		},
		pack: {
			//前端打包配置
			"1001": {
				name: "星韩本地官方",
				sevId: "1", //服务器ID
				loginSdk: "1", //登录sdkId
				phoneId: "1", //手机号分组
			},
			"1002": {
				name: "星韩本地微信小程序",
				sevId: "1", //服务器ID
				loginSdk: "2", //登录sdkId
				phoneId: "1", //手机号分组
			},
			"2001": {
				name: "黄牛本地官方",
				sevId: "2", //服务器ID
				loginSdk: "1", //登录sdkId
				phoneId: "1", //手机号分组
			},
			"2002": {
				name: "黄牛本地微信小程序",
				sevId: "2", //服务器ID
				loginSdk: "2", //登录sdkId
				phoneId: "1", //手机号分组
			},
			"3001": {
				name: "测试服官方",
				sevId: "3", //服务器ID
				loginSdk: "1", //登录sdkId
				phoneId: "1", //手机号分组
			},
			"3002": {
				name: "测试服微信小程序",
				sevId: "3", //服务器ID
				loginSdk: "2", //登录sdkId
				phoneId: "1", //手机号分组
			},

			"4001": {
				name: "正式服官方",
				sevId: "4", //服务器ID
				loginSdk: "1", //登录sdkId
				phoneId: "1", //手机号分组
			},
			"4002": {
				name: "正式服微信小程序",
				sevId: "4", //服务器ID
				loginSdk: "2", //登录sdkId
				phoneId: "1", //手机号分组
			},
			"5001": {
				name: "测试服内网官方",
				sevId: "5", //服务器ID
				loginSdk: "1", //登录sdkId
				phoneId: "1", //手机号分组
			},
			"5002": {
				name: "测试服内网微信小程序",
				sevId: "5", //服务器ID
				loginSdk: "2", //登录sdkId
				phoneId: "1", //手机号分组
			},
		},
		sev: {
			//服务器配置
			"1": {
				name: "星韩本地测试",
				domain: "http://192.168.1.39:3000",
				callBack: "http://192.168.1.39:3000",
				admin: "http://192.168.1.39:3000",
				cdn: "https://cdn.weimigames.com/hpc_c",
			},
			"2": {
				name: "黄牛本地测试",
				domain: "http://192.168.1.156:3000",
				callBack: "http://192.168.1.156:3000",
				admin: "http://192.168.1.156:3000",
				cdn: "https://cdn.weimigames.com/hpc_c",
			},
			"3": {
				name: "测试机",
				domain: "https://hpc.weimigames.com:8080",
				callBack: "https://hpc.weimigames.com:8080",
				admin: "https://hpc.weimigames.com:8080",
				cdn: "https://cdn.weimigames.com/hpc_c",
			},
			"4": {
				name: "正式服",
				domain: "https://hpc.weimigames.com",
				callBack: "https://hpc.weimigames.com",
				admin: "https://hpc.weimigames.com",
				cdn: "https://cdn.weimigames.com/hpc_c",
			},
			"5": {
				name: "测试服内网",
				domain: "http://192.168.1.180:3000",
				callBack: "http://192.168.1.180:3000",
				admin: "http://192.168.1.180:3000",
				cdn: "https://cdn.weimigames.com/hpc_c",
			},
		},
	},
	//业务常量配置
	const: {
		appName: '熊孩子自评',
		sonMax: 10, //允许的家属上限
	},
};
