<template>
	<div id="aCoursesList" class="bg-fa of">
		<!-- 讲师列表 开始 -->
		<section class="container">
			<header class="comm-title all-teacher-title">
				<h2 class="fl tac">
					<span class="c-333">全部讲师</span>
				</h2>
				<section class="c-tab-title">
					<a id="subjectAll" title="全部" href="#">全部</a>
					<!-- <c:forEach var="subject" items="${subjectList }">
<a id="${subject.subjectId}"
title="${subject.subjectName }" href="javascript:void(0)"
onclick="submitForm(${subject.subjectId})">${subject.subjectName }</a>
</c:forEach>-->
				</section>
			</header>
			<section class="c-sort-box unBr">
				<div>
					<!-- /无数据提示 开始-->
					<section class="no-data-wrap" v-if="!teacherList || teacherList.length < 0">
						<em class="icon30 no-data-ico">&nbsp;</em>
						<span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
					</section>
					<!-- /无数据提示 结束-->
					<article class="i-teacher-list" v-if="teacherList && teacherList.length > 0">
						<ul class="of">
							<li v-for="item in teacherList" :key="item.id">
								<section class="i-teach-wrap">
									<div class="i-teach-pic">
										<a :href="`/teacher/${item.id}`" :title="item.name" target="_blank">
											<img :src="item.avatar" :alt="item.name">
										</a>
									</div>
									<div class="mt10 hLh30 txtOf tac">
										<a :href="`/teacher/${item.id}`" :title="item.name" target="_blank" class="fsize18 c-666">{{item.name}}</a>
									</div>
									<div class="hLh30 txtOf tac">
										<span class="fsize14 c-999">{{item.intro}}</span>
									</div>
									<div class="mt15 i-q-txt">
										<p class="c-999 f-fA">{{item.career}}</p>
									</div>
								</section>
							</li>
						</ul>
						<div class="clear"></div>
					</article>
				</div>
				<!-- 公共分页 开始 -->
				<div>
					<a-pagination v-model:current="page" :total="total" :pageSize="8" show-less-items @change="changePage"/>
				</div>
				<!-- 公共分页 结束 -->
			</section>
		</section>
		<!-- /讲师列表 结束 -->
	</div>
</template>
<script>
	import teacherApi from "~/apis/teacher"

	export default {
		asyncData({ query }) {
			let page = query.page? parseInt(query.page) : 1;
			return teacherApi.getList(page, 8).then(resp => {
				if(resp.success) {
					//console.log(resp.data);
					return {
						page: page,
						total: resp.data.total,
						teacherList: resp.data.rows
					}
				}
			})
		},
		methods: {
			changePage(page) {
				window.location.href = `/teacher?page=${page}`;
			}
		}
	};
</script>