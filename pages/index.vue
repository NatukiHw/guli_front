<template>
	<div>
		<!-- 幻灯片 开始 -->
		<a-carousel style="background: #040B1B;">
			<div v-for="item in bannerList" :key="item.id">
				<a :href="item.linkUrl">
					<img :src="item.imageUrl" :alt="item.title">
				</a>
			</div>
		</a-carousel>
		<!-- 幻灯片 结束 -->
		<div id="aCoursesList">
			<!-- 网校课程 开始 -->
			<div>
				<section class="container">
					<header class="comm-title">
						<h2 class="tac">
							<span class="c-333">热门课程</span>
						</h2>
					</header>
					<div>
						<article class="comm-course-list">
							<ul class="of" id="bna">
								<li v-for="item in courseList" :key="item.id">
									<div class="cc-l-wrap">
										<section class="course-img">
											<img :src="item.cover" class="img-responsive"
												:alt="item.title">
											<div class="cc-mask">
												<a href="#" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
											</div>
										</section>
										<h3 class="hLh30 txtOf mt10">
											<a href="#" :title="item.title" class="course-title fsize18 c-333">{{item.title}}</a>
										</h3>
										<section class="mt10 hLh20 of">
											<span class="fr jgTag bg-green" v-if="item.price <= 0">
												<i class="c-fff fsize12 f-fA">免费</i>
											</span>
											<span class="fl jgAttr c-ccc f-fA">
												<i class="c-999 f-fA">9634人学习</i>|<i class="c-999 f-fA">9634评论</i>
											</span>
										</section>
									</div>
								</li>
							</ul>
							<div class="clear"></div>
						</article>
						<section class="tac pt20">
							<a href="#" title="全部课程" class="comm-btn c-btn-2">全部课程</a>
						</section>
					</div>
				</section>
			</div>
			<!-- /网校课程 结束 -->
			<!-- 网校名师 开始 -->
			<div>
				<section class="container">
					<header class="comm-title">
						<h2 class="tac">
							<span class="c-333">名师大咖</span>
						</h2>
					</header>
					<div>
						<article class="i-teacher-list">
							<ul class="of">
								<li v-for="item in teacherList" :key="item.id">
									<section class="i-teach-wrap">
										<div class="i-teach-pic">
											<a :href="`/teacher/${item.id}`" :title="item.name">
												<img :alt="item.name" :src="item.avatar">
											</a>
										</div>
										<div class="mt10 hLh30 txtOf tac">
											<a :href="`/teacher/${item.id}`" :title="item.name" class="fsize18 c-666">{{item.name}}</a>
										</div>
										<div class="hLh30 txtOf tac">
											<span class="fsize14 c-999">{{item.career}}</span>
										</div>
										<div class="mt15 i-q-txt">
											<p class="c-999 f-fA">{{item.intro}}</p>
										</div>
									</section>
								</li>
							</ul>
							<div class="clear"></div>
						</article>
						<section class="tac pt20">
							<a href="#" title="全部讲师" class="comm-btn c-btn-2">全部讲师</a>
						</section>
					</div>
				</section>
			</div>
			<!-- /网校名师 结束 -->
		</div>
	</div>
</template>

<script>
	import homeApis from "~/apis/home";

	export default {
		data() {
			return {
				bannerList: [],
				teacherList: [],
				courseList: []
			};
		},
		created() {
			this.loadBannerList();
			this.loadRecommendContent();
		},
		methods: {
			loadBannerList() {
				homeApis.getBannerList().then(resp => {
					if (resp.success && resp.data.rows) {
						this.bannerList = resp.data.rows;
					}
				});
			},
			loadRecommendContent() {
				homeApis.getRecommendList().then(
					resp => {
						if(resp.success && resp.data) {
							if(resp.data.teacherList) {
								this.teacherList = resp.data.teacherList;
							}
							if(resp.data.courseList) {
								this.courseList = resp.data.courseList;
							}
						}
					}
				)
			}
		},
	};
</script>

<style scoped>
	/* For demo */
	.ant-carousel img {
		width: 100%;
	}
	.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
		width: 25px;
		height: 25px;
		font-size: 25px;
		color: #fff;
		background-color: rgba(31, 45, 61, 0.11);
		opacity: 0.3;
	}
	.ant-carousel :deep(.custom-slick-arrow:before) {
		display: none;
	}
	.ant-carousel :deep(.custom-slick-arrow:hover) {
		opacity: 0.5;
	}
</style>