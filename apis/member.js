import request from '~/utils/request'

export default {
	login(formData) {
		return request({
			url: '/ucenter/members/login',
			method: "post",
			data: formData
		})
	},
	getProfile() {
		return request({
			url: '/ucenter/members/profile',
			method: "get"
		})
	}
}