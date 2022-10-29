import request from '~/utils/request'

export default {
	getList(page, limit, queryVo) {
		return request({
			url: `/educms/front/courses/?page=${page}&limit=${limit}`,
			method: "post",
			data: queryVo
		})
	},
	getDetail(courseId) {
		return request({
			url: `/educms/front/courses/${courseId}`,
			method: "get"
		})
	},
	getChapterList(courseId) {
		return request({
			url: `/educms/front/courses/${courseId}/chapters`,
			method: "get"
		})
	}
}