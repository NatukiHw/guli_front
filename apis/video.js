import request from '~/utils/request'

export default {
	getDetail(videoId) {
		return request({
			url: `/educms/front/videos/${videoId}`,
			method: "get"
		})
	},
	getPlayAuth(videoSourceId) {
		return request({
			url: `/eduvod/videos/${videoSourceId}`,
			method: "get"
		})
	}
}