import {
	request
} from '@/components/comm/request'
// 创建一个新的 store 实例
export class Store {
	private product: { node: { [key: string]: any } }[] = []
	private settings: any = []
	private errProduct: boolean = false
	private errSettings: boolean = false
	setSettings() {
		return new Promise((resolve) => {
			request({
				url: '/setting',
				data: {
					offset: 0,
					limit: 10000
				},
				notHeader: true
			}).then((resultsettings) => {
				console.log(resultsettings, 'resultsettings')
				this.settings = resultsettings?.data?.edges
				this.errSettings = false
				resolve(0)
			}).catch(err => {
				console.log(err, 'err')
				if (err.errMsg === 'request:fail') {
					this.errSettings = true
				} else {
					this.errSettings = false
				}
			})
		})
	}
	setProduct() {
		return new Promise((resolve) => {
			request({
				url: '/product',
				data: {
					offset: 0,
					limit: 10000
				},
				notHeader: true
			}).then((resultProduct) => {
				console.log(resultProduct, 'resultProduct')
				this.product = resultProduct?.data?.edges
				this.errProduct = false
				resolve(0)

			}).catch(err => {
				console.log(err, 'err setProduct')
				if (err.errMsg === 'request:fail') {
					this.errProduct = true
				} else {
					this.errProduct = false
				}
			})
		})
	}
	async getLbProduct(
		search: {
			lbid?: string,
			productId?: string,
			kind?: number
		}
	) {

		if (this.product.length === 0 && !this.errProduct) {
			await new Promise((resolve) => {
				const inter = setInterval(() => {
					if (this.product?.length > 0) {
						clearInterval(inter)
						resolve(0)
					}
				}, 500)
			})

		}
		search.lbid
		return this.product.filter((product) => {
			return (product.node.itemId === search.lbid || !search.lbid) &&
				(((product.node.kind === 1 || product.node.kind === 2 || product.node.kind === 3) && !search.kind) ||
					(product.node.kind === search.kind && search.kind)) &&
				(product.node.id === search.productId || !search.productId)
		})
	}
	async getSettings(
		search: {
			key?: string,
			
		},
		
	) {
		
		if (this.settings.length === 0 && !this.errSettings) {
			await await new Promise((resolve) => {
				const inter = setInterval(() => {
					if (this.settings?.length > 0) {
						clearInterval(inter)
						resolve(0)
					}
				}, 500)
			})
		}
		return this.settings.filter((setting: any) => {
			
			return (setting.node.key === search.key || !search.key)
		})
	}
}
export const store = new Store()
store.setProduct()
store.setSettings()
console.log('store')
