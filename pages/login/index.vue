<template>
	<div class="main">
		<div class="title">
			<a class="active" href="/login">登录</a>
			<span>·</span>
			<a href="/register">注册</a>
		</div>
		<div class="sign-up-container">
			<a-form :model="formData" name="formData" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" autocomplete="off">
				<a-form-item label="邮箱" name="mobile">
					<a-input v-model:value="formData.mobile" />
				</a-form-item>

				<a-form-item label="密码" name="password">
					<a-input-password v-model:value="formData.password" />
				</a-form-item>

				<a-form-item :wrapper-col="{span: 24}">
					<a-button type="primary">登录</a-button>
				</a-form-item>
			</a-form>
			<!-- 更多登录方式 -->
			<div class="more-sign">
				<h6>社交帐号登录</h6>
				<ul>
					<li><a id="weixin" class="weixin" target="_blank" href="http://qy.free.idcfengye.com/api/ucenter/weixinLogin/login"><i class="iconfont icon-weixin" /></a></li>
					<li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq" /></a></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import "~/assets/css/sign.css";
	import "~/assets/css/iconfont.css";

	import { message } from 'ant-design-vue';

	export default {
		layout: "sign",
		data() {
			return {
				formData: {
					mobile: "",
					password: ""
				}
			}
		}
	}
</script>