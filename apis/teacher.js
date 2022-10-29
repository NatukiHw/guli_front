import request from '~/utils/request'

export default {
	getList(page, limit) {
		return request({
			url: `/educms/front/teachers/?page=${page}&limit=${limit}`,
			method: "get"
		})
	},
	getDetail(id) {
		return request({
			url: `/educms/front/teachers/${id}`,
			method: "get"
		})
	}
}