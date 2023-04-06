
//所有sdk 必须提供的方法
export interface SdkBase {
	//应用初始化登录
	applyinit(pram: {
		success?: () => void,
		fail?: () => void,
	} | null): void;
	//手动点击登录
	clickLogin(pram: {
		success?: () => void,
		fail?: () => void,
	} | null): void;
	//获取手机号
	getPhone(pram: {
		success?: () => void, //成功
		fail?: () => void, //失败
		cancel?: () => void //本平台不提供
	}): void;

	//用户选择头像
	selHeader(pram: {
		success?: (url: string) => void, //成功
		fail?: () => void, //失败
	}): void;
	//退款
	refund(pram: {
		cpOrderId:string,
		success?: () => void, //成功
		fail?: () => void, //失败
	}): void;
}
