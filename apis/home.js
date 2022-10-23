import request from '~/utils/request'

export default {
	getBannerList() {
		return request({
			url: `/educms/front/index/banners`,
			method: "get"
		})
	},
	getRecommendList() {
		return request({
			url: `/educms/front/index/recommend`,
			method: "get"
		})
	}
}