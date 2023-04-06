export const validatePass =(rule:any, value:any, callback: any)=> {
	console.log(rule,'rule', value,'value', callback)
	if(!value){
		console.log(123)
		return callback(new Error('密码不能为空'))
	}
	callback()
}
