import Vue from 'vue'
import Vuex from 'vuex'
import api from "@/api/api"
import MinCache from'@/common/util/MinCache.js'
import { ACCESS_TOKEN,USER_NAME,USER_INFO } from "@/common/util/constants"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userid:'',
    username: '',
    realname: '',
    welcome: '',
    avatar: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { username, realname, welcome }) => {
      state.username = username
      state.realname = realname
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    }
  },
  actions: {
    // 登录
    mLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
       api.mlogin(userInfo).then(response => {
          if(response.data.code ==200&&response.data.data.msgTip == 'user can login'){ 
            const result = response.data.data
            const userInfo = result.user
			uni.setStorageSync(ACCESS_TOKEN,result.token);
			uni.setStorageSync(USER_INFO,userInfo);
            commit('SET_TOKEN', result.token)
            commit('SET_AVATAR', userInfo.username)
            commit('SET_NAME', { username: userInfo.loginName,realname: userInfo.username})
          uni.setStorageSync('winBtnStrList', result.userBtn);
          uni.setStorageSync('roleType', result.roleType);
			resolve(response)
          }else{
			resolve(response)
          }
        }).catch(error => {
			console.log("catch===>response",response)
          reject(error)
        })
      })
    },
	departConfirm(res, loginName){
	        if(res.code==200){
	          let err = {};
	          if(res.data.msgTip == 'user can login'){
	            // Vue.ls.set('winBtnStrList', res.data.userBtn, 7 * 24 * 60 * 60 * 1000);
	            // Vue.ls.set('roleType', res.data.roleType, 7 * 24 * 60 * 60 * 1000);
	            this.$tip.success('登录成功!')
	            this.$Router.replaceAll({
	            	name: 'index'
	            })
	          } else if(res.data.msgTip == 'user is not exist'){
	            err.message = '用户不存在';
	            this.$tip.toast(err.message);
	          } else if(res.data.msgTip == 'user password error'){
	            err.message = '用户密码不正确';
	            this.$tip.toast(err.message);
	          } else if(res.data.msgTip == 'user is black'){
	            err.message = '用户被禁用';
	            this.$tip.toast(err.message);
	          } else if(res.data.msgTip == 'tenant is black'){
	            if(loginName === 'jsh') {
	              err.message = 'jsh用户已停用，请注册租户进行体验！';
	            } else {
	              err.message = '用户所属的租户被禁用';
	            }
	            this.$tip.toast(err.message);
	          } else if(res.data.msgTip == 'tenant is expire'){
	            err.message = '试用期已结束，请联系客服续费';
	            this.$tip.toast(err.message);
	          } else if(res.data.msgTip == 'access service error'){
	            err.message = '查询服务异常';
	            this.$tip.toast(err.message);
	          }
	        }else{
			let msg = err.data || "请求出现错误，请稍后再试"
			this.loading = false;
			this.$tip.toast(msg);
	        }
	      },
    //手机号登录
    PhoneLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        api.phoneNoLogin(userInfo).then(response => {
          if(response.data.code ==200){
            const result = response.data.result
            const userInfo = result.userInfo
			uni.setStorageSync(ACCESS_TOKEN,result.token);
			uni.setStorageSync(USER_INFO,userInfo);
            commit('SET_TOKEN', result.token)
            commit('SET_NAME', { username: userInfo.username,realname: userInfo.realname})
            commit('SET_AVATAR', userInfo.avatar)
            resolve(response)
          }else{
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        let logoutToken = state.token;
        commit('SET_TOKEN', '')
        uni.removeStorageSync(ACCESS_TOKEN)
		uni.removeStorageSync("permissionList")
        api.logout(logoutToken).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    },

  },
  getters:{
    token: state => state.token,
	username: state => {state.userid=uni.getStorageSync(USER_INFO).username; return state.username},
	nickname: state => {state.userid=uni.getStorageSync(USER_INFO).realname; return state.user.realname},
	avatar: state => {state.userid=uni.getStorageSync(USER_INFO).avatar; return state.user.avatar},
	userid:state => {state.userid=uni.getStorageSync(USER_INFO).id; return state.userid},
  }
})
