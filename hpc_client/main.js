import Vue from "vue";
import {
	noMultipleClicks
} from '@/components/comm/noManyClicks.js'

import App from "./App";
import Page from "./components/page";
import ClUni from "cl-uni";
import Global from "@/components/comm/global"
import store from "@/tsjsFiles/vuex/store.ts"
import moment from "moment"
import {
	sdkTool
} from "@/tsjsFiles/sdk/sdkTool"
import {
	request
} from "./components/comm/request";

//使用  cl-uni 组件库 https://docs.cool-js.com/uni/

Vue.use(ClUni, {
	homePage: "/pages/index/index"
});

//一个自定义页面加载中 组件
Vue.component("page", Page);
//启动时的提示信息 false 关闭
Vue.config.productionTip = false;
Vue.prototype.global = Global.methods
Vue.prototype.moment = moment
Vue.prototype.noMultipleClicks = noMultipleClicks
moment.locale('zh-cn')
App.mpType = "app";
//前端硬盘获取 user 信息
uni.getStorage({
	key: 'user',
	success: (data) => {
		console.log(data, 'data')
		//如果没有token 就尝试登录
		if (!data.data.token) {
			sdkTool.applyinit()
		}
	},
	fail: (err) => {
		console.log(err, 'fail user')
		sdkTool.applyinit()
	}
})


const app = new Vue({
	store,
	...App,
});

app.$mount();
