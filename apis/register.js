import request from '~/utils/request'

export default {
	registerMember(formData) {
		return request({
			url: '/ucenter/members/register',
			method: "post",
			data: formData
		})
	},
	sendSmsCode(mobile) {
		return request({
			url: `/edusms/send/${mobile}`,
			method: "get"
		})
	}
}