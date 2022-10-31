<template>
	<div class="main">
		<div class="title">
			<a class="active" href="/login">登录</a>
			<span>·</span>
			<a href="/register">注册</a>
		</div>
		<div class="sign-up-container">
			<a-form :model="formData" name="formData" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" autocomplete="off">
				<a-form-item label="邮箱" name="username">
					<a-input v-model:value="formData.username" />
				</a-form-item>

				<a-form-item label="密码" name="password">
					<a-input-password v-model:value="formData.password" />
				</a-form-item>

				<a-form-item :wrapper-col="{span: 24}">
					<a-button type="primary" @click="loginMember" :disabled="loginBtnDisabled">{{loginBtnText}}</a-button>
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

	import memberApi from "~/apis/member"
	import { message } from 'ant-design-vue';

	import cookies from "js-cookie";

	export default {
		layout: "sign",
		data() {
			return {
				formData: {
					username: "reg@natuki.cc",
					password: "123456"
				},
				loginBtnDisabled: false
			}
		},
		methods: {
			loginMember() {
				this.loginBtnDisabled = true;
				memberApi.login(this.formData).then(resp => {
					if(resp.success && resp.data.token) {
						this.loginSuccess(resp.data.token);
					} else {
						message.error(resp.message);
						this.loginBtnDisabled = false;
					}
				}).catch(e => {
					this.loginBtnDisabled = false;
				})
			},
			loginSuccess(token) {
				cookies.set("guli_token", token);
				this.loadMemberProfile();
			},
			loadMemberProfile() {
				memberApi.getProfile().then(resp => {
					if(resp.success && resp.data.profile) {
						let profileJson = JSON.stringify(resp.data.profile);
						cookies.set("guli_user", profileJson);
						message.success("登录成功");
						window.location.href = "/";
					} else {
						message.error("获取用户信息失败");
					}
				}).catch(e => {
					console.log(e);
					message.error("获取用户信息失败");
				})
			}
		},
		computed: {
			loginBtnText() {
				if(this.loginBtnDisabled) return "正在登录";
				return "登录";
			}
		}
	}
</script>