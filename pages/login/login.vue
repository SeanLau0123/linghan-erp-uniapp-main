<template>
	<view class="zai-box">
		<scroll-view scroll-y class="page">
			<view class="text-center" :style="[{animation: 'show ' + 0.4+ 's 1'}]">
				<image src="/static/erplogo.png" mode='aspectFit' class="zai-logo"></image>
			</view>
			<view class="box padding-lr-xl login-paddingtop" :style="[{animation: 'show ' + 0.6+ 's 1'}]">
				<block v-if="loginWay==1">
					<view class="cu-form-group margin-top  shadow-warp" :class="[shape=='round'?'round':'']">
						<view class="title"><text class="cuIcon-people margin-right-xs"></text>账号:</view>
						<input placeholder="请输入账号" name="input" v-model="loginName"></input>
					</view>
					<view class="cu-form-group margin-top shadow-warp" :class="[shape=='round'?'round':'']">
						<view class="title"><text class="cuIcon-lock margin-right-xs"></text>密码:</view>
						<input class="uni-input" placeholder="请输入密码" :password="!showPassword" v-model="password" />
						<view class="action text-lg">
							<text :class="[showPassword ? 'cuIcon-attention' : 'cuIcon-attentionforbid']"
								@click="changePassword"></text>
						</view>
					</view>
					<view class="cu-form-group margin-top shadow-warp" :class="[shape=='round'?'round':'']">
						<view class="title"><text class="cuIcon-lock margin-right-xs"></text>验证码:</view>
						<input class="uni-input" placeholder="请输入验证码" v-model="code" @confirm="onLogin" />
						<view>
							<image class="zai-randomImage" style="margin-top: 2px;" :src="base64Data" alt="Base64 Image"
								@click="onRandomImage" />
							<text v-model="uuid"></text>
						</view>
					</view>

					<view class="padding text-center margin-top">
						<button class="cu-btn bg-blue lg margin-right shadow" :loading="loading"
							:class="[shape=='round'?'round':'']" @tap="onLogin"><text
								space="emsp">{{loading ? "登录中...":" 登录 "}}</text>
						</button>
						<!-- 	<button class="cu-btn line-blue lg margin-left shadow" :loading="loading"
  							:class="[shape=='round'?'round':'']" @tap="loginWay=3-loginWay">短信登录
  						</button> -->
					</view>
				</block>
				<!-- 	<view class="cu-form-group margin-top  shadow-warp" :class="[shape=='round'?'round':'']">
  						<view class="title">序列号:</view>
  						<input placeholder="请输入序列号" name="input" v-model="serial"></input>
  					</view> -->

				<!-- #ifdef APP-PLUS -->
				<view class="padding flex flex-direction  text-center">
					当前版本:{{version}}
				</view>
				<!-- #endif -->

			</view>
		</scroll-view>
		<!-- 登录加载弹窗 -->
		<view class="cu-load load-modal" v-if="loading">
			<!-- <view class="cuIcon-emojifill text-orange"></view> -->
			<image src="https://linghanshop.cn/uploads/attach/2025/04/20250403/53a601dafc2ad6602648623cd3564526.png"
				mode="aspectFit" class="round">
			</image>
			<view class="gray-text">登录中...</view>
		</view>
	</view>

</template>

<script>
	import {
		ACCESS_TOKEN,
		USER_NAME,
		USER_INFO
	} from "@/common/util/constants";
	import md5 from 'md5';
	import appUpdate from 'common/util/zlUpdate/appUpdate.js';
	import {mapActions} from "vuex";
	import configService from '@/common/service/config.service.js';
	export default {
		data() {
			return {
				base64Data: '', // 这里存储你的Base64数据
				uuid: '', // 这里存储你的Base64数据对应唯一码
				code: '',

				shape: '', //round 圆形
				loading: false,
				loginName: '',
				password: '',
				phoneNo: '',
				serial: '',
				smsCode: '',
				showPassword: false, //是否显示明文
				loginWay: 1, //1: 账密，2：验证码
				smsCountDown: 0,
				smsCountInterval: null,
				toggleDelay: false,
				version: '',
				//第三方登录相关信息
				thirdType: "",
				thirdLoginInfo: "",
				thirdLoginState: false,
				bindingPhoneModal: false,
				thirdUserUuid: '',
				url: {
					bindingThirdPhone: '/sys/thirdLogin/bindingThirdPhone'
				}
			};
		},

		onLoad: function() {
			// #ifdef APP-PLUS
			appUpdate()
			var that = this
			plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
				that.version = wgtinfo.version
			});
			// #endif
			this.onRandomImage();
		},
		computed: {
			isSendSMSEnable() {
				return this.smsCountDown <= 0 && this.phoneNo.length > 4;
			},
			getSendBtnText() {
				if (this.smsCountDown > 0) {
					return this.smsCountDown + '秒后发送';
				} else {
					return '发送验证码';
				}
			},
			canSMSLogin() {
				return this.loginName.length > 4 && this.smsCode.length > 4;
			},
			canPwdLogin() {
				return this.loginName.length > 4 && this.password.length > 4;
			},
		},
		methods: {
			...mapActions(["mLogin", "PhoneLogin", "ThirdLogin"]),
			onLogin: function() {
				if (!this.loginName || this.loginName.length == 0) {
					this.$tip.toast('请填写账号');
					return;
				}
				if (!this.password || this.password.length == 0) {
					this.$tip.toast('请填写密码');
					return;
				}
				if (!this.code || this.code.length == 0) {
					this.$tip.toast('请填写验证码');
					return;
				} // } else {
				// 	this.$tip.error(res.data.message);
				// }
				let loginParams = {
					loginName: this.loginName,
					password: md5(this.password),
					code: this.code,
					uuid: this.uuid
				}
				this.loading = true;
				this.mLogin(loginParams).then((res) => {
					this.loading = false;
					if (res.data.code == "200") {
						this.departConfirm(res.data, this.loginName)
					}
				}).catch((err) => {
					let msg = err.data || "请求出现错误，请稍后再试"
					this.loading = false;
					this.$tip.toast(msg);
				}).finally(() => {
					this.loading = false;
				})
			},
			departConfirm(res, loginName) {
				if (res.code == 200) {
					let err = {};
					if (res.data.msgTip == 'user can login') {
						this.getPermissionList()
						this.$tip.success('登录成功!')
						this.$Router.replaceAll({name: 'index'})
					} else if (res.data.msgTip == 'user is not exist') {
						err.message = '用户不存在';
						this.$tip.toast(err.message);
					} else if (res.data.msgTip == 'user password error') {
						err.message = '用户密码不正确';
						this.$tip.toast(err.message);
					} else if (res.data.msgTip == 'user is black') {
						err.message = '用户被禁用';
						this.$tip.toast(err.message);
					} else if (res.data.msgTip == 'tenant is black') {
						if (loginName === 'jsh') {
							err.message = 'jsh用户已停用，请注册租户进行体验！';
						} else {
							err.message = '用户所属的租户被禁用';
						}
						this.$tip.toast(err.message);
					} else if (res.data.msgTip == 'tenant is expire') {
						err.message = '试用期已结束，请联系客服续费';
						this.$tip.toast(err.message);
					} else if (res.data.msgTip == 'access service error') {
						err.message = '查询服务异常';
						this.$tip.toast(err.message);
					}
				} else {
					let msg = err.data || "请求出现错误，请稍后再试"
					this.loading = false;
					this.$tip.toast(msg);
				}
				this.onRandomImage()
				this.code = '';
			},
			onRandomImage() {
				this.$http.get("/user/randomImage").then(res => {
					if (res.data.code === 200) {
						this.base64Data = res.data.data.base64;
						this.uuid = res.data.data.uuid;
					}
				})
			},
			saveClientId() {
				var info = plus.push.getClientInfo();
				var cid = info.clientid;
				this.$http.get("/sys/user/saveClientId", {
					params: {
						clientId: cid
					}
				}).then(res => {
					console.log("res::saveClientId>", res)
					this.$tip.success('登录成功!')
					this.$Router.replaceAll({
						name: 'index'
					})
				})
			},
			getPermissionList() {
				let userInfo = uni.getStorageSync(USER_INFO);
				let params = {
					pNumber: 0,
					userId: userInfo.id
				};
				this.$http.post("/function/findMenuByPNumber", params).then(res => {
					const menuData = res.data;
					uni.setStorageSync('permissionList', menuData);
				})
			},
			changePassword() {
				this.showPassword = !this.showPassword;
			},
			//获取密码加密规则
			getEncrypte() {
				var encryptedString = Vue.ls.get(ENCRYPTED_STRING);
				if (encryptedString == null) {
					getEncryptedString().then((data) => {
						this.encryptedString = data
					});
				} else {
					this.encryptedString = encryptedString;
				}
			},
			onSMSSend() {
				let smsParams = {};
				smsParams.mobile = this.phoneNo;
				smsParams.smsmode = "0";
				let checkPhone = new RegExp(/^[1]([3-9])[0-9]{9}$/);
				if (!smsParams.mobile || smsParams.mobile.length == 0) {
					this.$tip.toast('请输入手机号');
					return false
				}
				if (!checkPhone.test(smsParams.mobile)) {
					this.$tip.toast('请输入正确的手机号');
					return false
				}
				this.$http.post("/sys/sms", smsParams).then(res => {
					if (res.data.success) {
						this.smsCountDown = 60;
						this.startSMSTimer();
					} else {
						this.smsCountDown = 0;
						this.$tip.toast(res.data.message);
					}
				});
			},
			startSMSTimer() {
				this.smsCountInterval = setInterval(() => {
					this.smsCountDown--;
					if (this.smsCountDown <= 0) {
						clearInterval(this.smsCountInterval);
					}
				}, 1000);
			},
			onSMSLogin() {
				let checkPhone = new RegExp(/^[1]([3-9])[0-9]{9}$/);

				if (!this.phoneNo || this.phoneNo.length == 0) {
					this.$tip.toast('请填写手机号');
					return;
				}
				if (!checkPhone.test(this.phoneNo)) {
					this.$tip.toast('请输入正确的手机号');
					return false
				}
				if (!this.smsCode || this.smsCode.length == 0) {
					this.$tip.toast('请填短信验证码');
					return;
				}
				let loginParams = {
					mobile: this.phoneNo,
					captcha: this.smsCode
				};
				this.PhoneLogin(loginParams).then((res) => {
					console.log("res====》", res)
					if (res.data.success) {
						this.$tip.success('登录成功!')
						this.$Router.replaceAll({
							name: 'index'
						})
					} else {
						this.$tip.error(res.data.message);
					}
				}).catch((err) => {
					let msg = ((err.response || {}).data || {}).message || err.data.message || "请求出现错误，请稍后再试"
					this.$tip.error(msg);
				});
			},
			loginSuccess() {
				// 登陆成功，重定向到主页
				this.$Router.replace({
					name: 'index'
				})
			},
			requestFailed(err) {
				this.$message.warning("登录失败")
			},
		},
		beforeDestroy() {
			if (this.smsCountInterval) {
				clearInterval(this.smsCountInterval);
			}
		},
	}
</script>

<style>
	.login-paddingtop {
		padding-top: 100upx;
	}

	.zai-box {
		padding: 0 20upx;
		padding-top: 300upx;
		position: relative;
	}

	.zai-logo {
		width: 200upx;
		height: 150upx;
	}

	.zai-title {
		font-size: 58upx;
		color: #aa5500;
		text-align: center;
	}

	.input-placeholder,
	.zai-input {
		color: #94afce;
	}

	.zai-label {
		padding: 60upx 0;
		text-align: center;
		font-size: 30upx;
		color: #0000ff;
	}

	.zai-randomImage {
		width: 85px;
		height: 30px;
		background: #94afce;
	}
</style>