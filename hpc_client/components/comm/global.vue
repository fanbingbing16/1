<template>
	<model :visible="visible" :content="content"></model>
</template>
<script lang="ts">
	import Model from "@/components/comm/model.vue"
	import {
		userInfoInterface
	} from "@/components/comm/login"
	interface peopleInterface {
		"id": string | null,
			"userId": string | null,
			"name": string | null,
			"gender": string | null,
			"birthday": string | null,
			"height": string | null,
			"weight": string | null,
			"birthWeek": string | null,
			"birthDay": string | null,
			"birthHeight": string | null,
			"birthWeight": string | null,
			"birthHead": string | null,
			"head": string | null,
			"createdAt": string | null,
			"updatedAt": string | null,
			"deletedAt": string | null
	}
	let userInfo: userInfoInterface = {
		expired: '',
		refresh_token: '',
		token: '',
		user: {
			avatar: null,
			handWx: null,
			id: "",
			mobile: null,
			name: null,
			nameWx: null,
			roles: null,
			status: 0
		}
	}
	let people: peopleInterface = {
		"id": "",
		"userId": "",
		"name": "",
		"gender": "",
		"birthday": "",
		"height": "",
		"weight": "",
		"birthWeek": "",
		"birthDay": "",
		"birthHeight": "",
		"birthWeight": "",
		"birthHead": "",
		"head": "",
		"createdAt": "",
		"updatedAt": "",
		"deletedAt": null

	}

	function getUser() {
		return new Promise((resolve: (value ? : any) => void, reject: (reason ? : any) => void) => {
			uni.getStorage({
				key: 'user',
				success: (resultUser) => {
					userInfo = resultUser.data
					resolve(resultUser.data)
				},
				fail: () => {
					resolve(userInfo)
				}
			})
		})
	}

	function getPeopleInfo() {

		return new Promise((resolve: (value ? : any) => void) => {
			uni.getStorage({
				key: 'people',
				success: (resultPeople) => {
					people = resultPeople.data

					resolve(people)
				},
				fail: () => {
					resolve(people)
				}
			})
		})
	}
	export default {
		name: 'Global',
		components: {
			Model
		},
		created() {
			getUser()
		},
		data() {
			return {
				visible: false,
				content: ''
			}
		},
		methods: {
			setInfo(data: userInfoInterface) {
				if (!data?.token || !data?.user?.id) {} else {
					userInfo = data
					uni.setStorage({
						key: 'user',
						data
					})
				}

			},
			async getInfo() {
				if (!userInfo.token) {
					return await getUser()
				} else
					return {
						...userInfo
					}
			},
			setPeople(data: peopleInterface) {
				console.log(data, 'setPeople data')
				if (data?.id) {
					people = data
					uni.setStorage({
						key: 'people',
						data
					})
				}
			},
			clearUserInfo() {
				userInfo = {
					expired: '',
					refresh_token: '',
					token: '',
					user: {
						avatar: null,
						handWx: null,
						id: "",
						mobile: null,
						name: null,
						nameWx: null,
						roles: null,
						status: 0
					}
				}
			},
			clearPeople() {
				people = {
					"id": "",
					"userId": "",
					"name": "",
					"gender": "",
					"birthday": "",
					"height": "",
					"weight": "",
					"birthWeek": "",
					"birthDay": "",
					"birthHeight": "",
					"birthWeight": "",
					"birthHead": "",
					"head": "",
					"createdAt": "",
					"updatedAt": "",
					"deletedAt": null
				}

			},
			async getPeople() {
				console.log(people, 'getPeople')
				if (!people?.id || !(people as any)?.node?.id) {
					return await getPeopleInfo()
				} else {
					return {
						...people
					}
				}
			}
		}
	}
</script>
