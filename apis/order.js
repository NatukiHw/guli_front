import request from '~/utils/request'

export default {
	createOrder(courseId) {
		return request({
			url: `/payment/orders/${courseId}`,
			method: "post"
		})
	},
	getOrder(orderNo) {
		return request({
			url: `/payment/orders/${orderNo}`,
			method: "get"
		})
	}
}