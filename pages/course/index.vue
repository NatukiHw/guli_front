<template>
	<div id="aCoursesList" class="bg-fa of">
		<!-- /课程列表 开始 -->
		<section class="container">
			<header class="comm-title">
				<h2 class="fl tac">
					<span class="c-333">全部课程</span>
				</h2>
			</header>
			<section class="c-sort-box">
				<section class="c-s-dl">
					<dl>
						<dt>
							<span class="c-999 fsize14">课程类别</span>
						</dt>
						<dd class="c-s-dl-li">
							<ul class="clearfix">
								<li :class="{ current: selectedSubjectParentId == 0 }">
									<a  title="全部" href="#" @click="changeSubjectParent()">全部</a>
								</li>
								<li v-for="item in subjectList" :key="item.id" :class="{ current: selectedSubjectParentId == item.id }">
									<a :title="item.title" href="#" @click="changeSubjectParent(item)">{{item.title}}</a>
								</li>
							</ul>
						</dd>
					</dl>
					<dl>
						<dt>
							<span class="c-999 fsize14"></span>
						</dt>
						<dd class="c-s-dl-li">
							<ul class="clearfix">
								<li :class="{ current: selectedSubjectId == 0 }">
									<a title="全部" href="#" @click="changeSubject()">全部</a>
								</li>
								<li v-if="childSubjectList" v-for="item in childSubjectList" :key="item.id" :class="{ current: selectedSubjectId == item.id }">
									<a :title="item.title" href="#" @click="changeSubject(item)">{{item.title}}</a>
								</li>
							</ul>
						</dd>
					</dl>
					<div class="clear"></div>
				</section>
				<div class="js-wrap">
					<section class="fr">
						<span class="c-ccc">
							<i class="c-master f-fM">1</i>/
							<i class="c-666 f-fM">1</i>
						</span>
					</section>
					<section class="fl">
						<ol class="js-tap clearfix">
							<li>
								<a title="关注度" href="#">关注度</a>
							</li>
							<li>
								<a title="最新" href="#">最新</a>
							</li>
							<li class="current bg-orange">
								<a title="价格" href="#">价格&nbsp;
									<span>↓</span>
								</a>
							</li>
						</ol>
					</section>
				</div>
				<div class="mt40">
					<!-- /无数据提示 开始-->
					<section class="no-data-wrap" v-if="!courseList && courseList.length <= 0">
						<em class="icon30 no-data-ico">&nbsp;</em>
						<span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理
							中...</span>
					</section>
					<!-- /无数据提示 结束-->
					<article class="comm-course-list" v-if="courseList && courseList.length > 0">
						<ul class="of" id="bna">
							<li v-for="item in courseList" :key="item.id">
								<div class="cc-l-wrap">
									<section class="course-img">
										<img :src="item.cover" class="img-responsive" :alt="item.title">
										<div class="cc-mask">
											<a :href="`/course/${item.id}`" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
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
				</div>
				<!-- 公共分页 开始 -->
				<div>
					<a-pagination v-model:current="page" :total="total" :pageSize="LIMIT" show-less-items @change="changePage"/>
				</div>
				<!-- 公共分页 结束 -->
			</section>
		</section>
		<!-- /课程列表 结束 -->
	</div>
</template>

<script>
	import subjectApi from "~/apis/subject";
	import courseApi from "~/apis/course";

	export default {
		data() {
			return {
				subjectList: [],
				courseList: [],
				total: 0,
				page: 1,
				queryVo: {},
				selectedSubjectParentId: 0,
				selectedSubjectId: 0,
				childSubjectList: null,
				LIMIT: 8
			}
		},
		created() {
			this.loadSubjectList();
			this.loadCourseList();
		},
		methods: {
			loadSubjectList() {
				subjectApi.getList().then((res) => {
					if (res.success === true) {
						let subjectList = new Array();
						for (let i in res.data.subjects) {
							if (res.data.subjects[i].parentId == "0") {
								res.data.subjects[i].children = new Array();
								subjectList.push(res.data.subjects[i]);
							}
						}
						for (let i in res.data.subjects) {
							if (res.data.subjects[i].parentId != "0") {
								for (let j in res.data.subjects) {
									if (
										res.data.subjects[i].parentId ==
										res.data.subjects[j].id
									) {
										res.data.subjects[j].children.push(
											res.data.subjects[i]
										);
									}
								}
							}
						}
						this.subjectList = subjectList;
					}
				});
			},
			loadCourseList() {
				courseApi.getList(this.page, this.LIMIT, this.queryVo).then(resp => {
					if(resp.success) {
						this.total = resp.data.total;
						this.courseList = resp.data.rows;
					}
				})
			},
			changePage() {
				this.loadCourseList();
			},
			changeSubjectParent(item) {
				if(item == null) {
					this.selectedSubjectParentId = 0;
					this.selectedSubjectId = 0;
					this.childSubjectList = null;
					this.queryVo.subjectParentId = null;
					this.queryVo.subjectId = null;
				} else {
					this.selectedSubjectParentId = item.id;
					this.selectedSubjectId = 0;
					this.childSubjectList = item.children;
					this.queryVo.subjectParentId = item.id;
					this.queryVo.subjectId = null;
				}
				this.page = 1;
				this.loadCourseList();
			},
			changeSubject(item) {
				if(item == null) {
					this.selectedSubjectId = 0;
					this.queryVo.subjectId = null;
				} else {
					this.selectedSubjectId = item.id;
					this.queryVo.subjectId = item.id;
				}
				this.page = 1;
				this.loadCourseList();
			}
		},
	};
</script>