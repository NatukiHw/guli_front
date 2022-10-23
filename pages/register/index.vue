<template>
	<div class="main">
		<div class="title">
			<a href="/login">登录</a>
			<span>·</span>
			<a class="active" href="/register">注册</a>
		</div>
		<div class="sign-up-container">
			<a-form :model="formData" name="formData" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" autocomplete="off">
				<a-form-item label="邮箱" name="mobile">
					<a-input v-model:value="formData.mobile" />
				</a-form-item>

				<a-form-item label="验证" name="code">
					<a-input-group compact>
						<a-input v-model:value="formData.code" style="width: calc(100% - 100px)" />
						<a-button type="primary" style="width: 100px;" :disabled="sendCodeDisable" @click="sendSmsCode">{{sendSmsCodeText}}</a-button>
					</a-input-group>
				</a-form-item>

				<a-form-item label="密码" name="password">
					<a-input-password v-model:value="formData.password" />
				</a-form-item>

				<a-form-item label="昵称" name="nickname">
					<a-input v-model:value="formData.nickname" />
				</a-form-item>
				
				<a-form-item :wrapper-col="{span: 24}">
					<a-button type="primary" @click="registerMember">注册</a-button>
				</a-form-item>
			</a-form>
			<!-- 更多注册方式 -->
			<div class="more-sign">
				<h6>社交帐号直接注册</h6>
				<ul>
					<li><a id="weixin" class="weixin" target="_blank"
							href="http://huaan.free.idcfengye.com/api/ucenter/wx/login"><i
								class="iconfont icon-weixin" /></a></li>
					<li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq" /></a></li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import "~/assets/css/sign.css";
	import "~/assets/css/iconfont.css";

	import registerApi from "~/apis/register"
	import { message } from 'ant-design-vue';

	export default {
		layout: "sign",
		data() {
			return {
				formData: {
					mobile: "",
					code: "",
					nickname: "",
					password: "",
				},
				sendCodeDisable: false,
				countDownSecond: 60,
				countDownTimer: null
			};
		},
		methods: {
			sendSmsCode() {
				this.sendCodeDisable = true;
				registerApi.sendSmsCode(this.formData.mobile).then(resp => {
					if(resp.success) {
						message.success("验证码发送成功");
						this.startSmsCodeTimer();
					} else {
						message.error(resp.message);
						this.sendCodeDisable = false;
					}
				}).catch(e =>{
					this.sendCodeDisable = false;
				});
			},
			registerMember() {
				registerApi.registerMember(this.formData).then(resp => {
					if(resp.success) {
						message.success("注册成功");
						this.$router.push("/login");
					} else {
						message.error(resp.message);
					}
				})
			},
			startSmsCodeTimer() {
				this.countDownSecond = 60;
				this.countDownTimer = setInterval(this.smsCodeTimerEvent,1000);
			},
			smsCodeTimerEvent() {
				console.log("running");
				if(this.countDownSecond <= 0) {
					this.sendCodeDisable = false;
					clearInterval(this.countDownTimer);
					this.countDownTimer = null;
					console.log("stop");
					return;
				}
				this.countDownSecond--;
			}
		},
		computed: {
			sendSmsCodeText() {
				if(this.countDownTimer) {
					return `${this.countDownSecond}s`
				}
				return "获取验证码"
			}
		}
	};
</script>