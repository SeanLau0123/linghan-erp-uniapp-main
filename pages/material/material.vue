<template name="material">
	<view>
		<cu-custom :bgColor="NavBarColor" :isBack="false" backRouterName="index">
			<block slot="content">资料</block>
		</cu-custom>
		<scroll-view>
			<!-- 常用服务 -->
			<view class="cu-bar bg-white solid-bottom" :style="[{animation: 'show 0.5s'}]">
				<view class="action">
					<text class='cuIcon-title text-blue'></text>基础资料
				</view>
			</view>

			<view class="cu-list grid col-4 text-sm">
				<view class="cu-item animation-slide-bottom" :style="[{animationDelay: (index + 1)*0.02 + 's'}]"
					v-for="(item,index) in usList" :key="index" @tap="goPage(item.page)">
					<view class="padding text-center">
						<image :src="item.icon" style="width:30px;height:30px;">
							<view class="cu-tag badge margin-top-sm" style="margin-left:1.2em"
								v-if="getTtemDotInfo(item)">
								<block v-if="getTtemDotInfo(item)">{{getTtemDotInfo(item)}}</block>
							</view>
						</image>
						<view class="margin-top-xs">{{item.title}}</view>
					</view>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom" :style="[{animation: 'show 0.5s'}]">
				<view class="action">
					<text class='cuIcon-title text-blue'></text>系统设置
				</view>
			</view>
			<view class="cu-list grid col-4 text-sm">
				<view class="cu-item animation-slide-bottom" :style="[{animationDelay: (index + 1)*0.02 + 's'}]"
					v-for="(item,index) in systemList" :key="index" @tap="goPage(item.page)">
					<view class="padding text-center">
						<image :src="item.icon" style="width:30px;height:30px;">
							<view class="cu-tag badge margin-top-sm" style="margin-left:1.2em"
								v-if="getTtemDotInfo(item)">
								<block v-if="getTtemDotInfo(item)">{{getTtemDotInfo(item)}}</block>
							</view>
						</image>
						<view class="margin-top-xs">{{item.title}}</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="cu-tabbar-height margin-top"></view>
	</view>
</template>

<script>
	import {
		material,
		os
	} from '@/common/util/work.js'
	import socket from '@/common/js-sdk/socket/socket.js'
	export default {
		name: 'material',
		props: {
			cur: String,
		},
		watch: {
			cur: {
				immediate: true,
				handler: function(val, oldVal) {
					console.log('cur', val, oldVal)
					this.initMaterialList()
				},
			},
		},
		data() {
			return {
				systemList: [],
				usList: [],
				msgCount: 0,
				dot: {
					mailHome: false
				}
			}
		},
		methods: {
			initMaterialList() {
				let permissionList = uni.getStorageSync("permissionList");
				let data = []
				let sysdata = []
				let materialList = []
				let o1 = {}
				o1.url = "/material/material"
				o1.page = "goods"
				o1.title = "商品信息"
				o1.icon = "/static/home/128/goods.png"
				materialList.push(o1)
				let o2 = {}
				o2.url = "/material/material_category"
				o2.page = "categorys"
				o2.title = "商品类别"
				o2.icon = "/static/home/128/categorys.png"
				materialList.push(o2)
				let o3 = {}
				o3.url = "/system/unit"
				o3.page = "unites"
				o3.title = "多单位	"
				o3.icon = "/static/home/128/unites.png"
				materialList.push(o3)
				let o4 = {}
				o4.url = "/material/material_attribute"
				o4.page = "multiAttribute"
				o4.title = "多属性"
				o4.icon = "/static/home/128/multiAttribute.png"
				materialList.push(o4)
				let o5 = {}
				o5.url = "/system/vendor"
				o5.page = "vendors"
				o5.title = "供应商信息"
				o5.icon = "/static/home/128/vendors.png"
				materialList.push(o5)
				let o6 = {}
				o6.url = "/system/customer"
				o6.page = "customers"
				o6.title = "客户信息"
				o6.icon = "/static/home/128/customers.png"
				materialList.push(o6)
				let o7 = {}
				o7.url = "/system/member"
				o7.page = "members"
				o7.title = "会员信息"
				o7.icon = "/static/home/128/members.png"
				materialList.push(o7)
				let o8 = {}
				o8.url = "/system/depot"
				o8.page = "depot"
				o8.title = "仓库信息"
				o8.icon = "/static/home/128/depot.png"
				materialList.push(o8)
				let o9 = {}
				o9.url = "/system/in_out_item"
				o9.page = "inOutItemList"
				o9.title = "收支项目"
				o9.icon = "/static/home/128/inOutItemList.png"
				materialList.push(o9)
				let o10 = {}
				o10.url = "/system/account"
				o10.page = "accounts"
				o10.title = "账户管理"
				o10.icon = "/static/home/128/accounts.png"
				materialList.push(o10)
				let o11 = {}
				o11.url = "/system/person"
				o11.page = "person"
				o11.title = "经手人管理"
				o11.icon = "/static/home/128/person.png"
				materialList.push(o11)
				let o12 = {}
				o12.url = "/system/role"
				o12.page = "role"
				o12.title = "角色管理"
				o12.type='system'
				o12.icon = "/static/home/128/role.png"
				materialList.push(o12)
				let o13 = {}
				o13.url = "/system/log"
				o13.page = "log"
				o13.title = "日志管理"
				o13.type='system'
				o13.icon = "/static/home/128/logs.png"
				materialList.push(o13)
				let o14 = {}
				o14.url = "/system/user"
				o14.page = "user"
				o14.title = "用户管理"
				o14.type='system'
				o14.icon = "/static/home/128/user.png"
				materialList.push(o14)
				if (permissionList && permissionList.length > 0) {
					for (var i = 0; i < permissionList.length; i++) {
						if (permissionList[i].children && permissionList[i].children.length > 0) {
							for (var k = 0; k < permissionList[i].children.length; k++) {
								for (var j = 0; j < materialList.length; j++) {
									if (permissionList[i].children[k].url == materialList[j].url) {
										let m = {}
										m.title = materialList[j].title
										if (materialList[j].icon) {
											m.icon = materialList[j].icon
										} else {
											m.icon = "/static/home/128/wendang.png"
										}
										m.description = materialList[j].title
										m.useCount = 1000,
										m.page = materialList[j].page
										
										if (materialList[j].type=='system') {
											sysdata.push(m);
										} else {
											data.push(m);
										}
									}
								}
							}
						}
					}
				}
				this.usList = data;
				this.systemList=sysdata;
			},
			initMenu() {
				console.log("-----------home------------")
				// this.onSocketOpen()
				// this.onSocketReceive()
				this.loadCount(0);
			},
			goPage(page) {
				if (!page) {
					return false;
				}
				if (page === 'annotationList') {
					this.msgCount = 0
				}
				this.dot[page] = false
				this.$Router.push({
					name: page
				})
			},
			// 启动webSocket
			onSocketOpen() {
				socket.init('websocket');
			},
			onSocketReceive() {
				var _this = this
				socket.acceptMessage = function(res) {
					// console.log("页面收到的消息", res);
					if (res.cmd == "topic") {
						//系统通知
						_this.loadCount('1')
					} else if (res.cmd == "user") {
						//用户消息
						_this.loadCount('2')
					} else if (res.cmd == 'email') {
						//邮件消息
						_this.loadEmailCount()
					}
				}
			},
			loadCount(flag) {
				console.log("loadCount::flag", flag)
				let url = '/sys/annountCement/listByUser';
				this.$http.get(url).then(res => {
					console.log("res::", res)
					if (res.data.success) {
						let msg1Count = res.data.result.anntMsgTotal;
						let msg2Count = res.data.result.sysMsgTotal;
						this.msgCount = msg1Count + msg2Count
						console.log("this.msgCount", this.msgCount)
					}
				})
			},
			loadEmailCount() {
				this.dot.mailHome = true
			},
			getTtemDotInfo(item) {
				if (item.page === 'annotationList' && this.msgCount > 0) {
					return this.msgCount
				}
				return '';
			}
		}
	}
</script>

<style scoped>
	.cu-list.grid>.cu-item {
		padding: 0px 0px;
	}

	.line2-icon {
		width: 60px;
		height: 60px;
	}
</style>