import request from '~/utils/request'

export default {
	getList() {
		return request({
			url: `/educms/front/subjects/`,
			method: "get"
		})
	}
}