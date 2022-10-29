<template>
	<div>

		<link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.12.1/skins/default/aliplayer-min.css" />
		<script charset="utf-8" type="text/javascript"
			src="https://g.alicdn.com/de/prismplayer/2.12.1/aliplayer-h5-min.js"></script>

		<!-- 定义播放器dom -->
		<div id="J_prismPlayer" class="prism-player" />
	</div>
</template>
<script>
	import vodApi from "~/apis/video";

	export default {
		layout: "video", //应用video布局
		asyncData({ params }) {
			return vodApi.getDetail(params.vid).then((resp) => {
				if (resp.success) {
					return {
						video: resp.data.video,
						playAuth: null,
						videoId: params.vid,
					};
				}
			});
		},
		created() {
			this.loadPlayAuth();
		},
		methods: {
			loadPlayAuth() {
				vodApi.getPlayAuth(this.video.videoSourceId).then(resp => {
					if(resp.success) {
						this.playAuth = resp.data.playAuth;
						this.loadPlayer();
					}
				})
			},
			loadPlayer() {
				let self = this;
				new Aliplayer(
					{
						id: "J_prismPlayer",
						vid: self.video.videoSourceId,
						playauth: self.playAuth,
						encryptType: "1",
						width: "100%",
						height: "500px"
					},
					player => {
						console.log("播放器加载成功");
					}
				);
			},
		},
	};
</script>
