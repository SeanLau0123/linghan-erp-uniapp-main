<template name="report">
	<view>
		<cu-custom :bgColor="NavBarColor" :isBack="false" backRouterName="index">
			<block slot="content">报表</block>
		</cu-custom>
		<scroll-view>
			<!-- 常用服务 -->
			<view class="cu-bar bg-white solid-bottom" :style="[{animation: 'show 0.5s 1'}]">
				<view class="action">
					<text class='cuIcon-title text-blue'></text>报表
				</view>
			</view>

			<view class="cu-list grid col-4 text-sm">
				<view class="cu-item animation-slide-bottom" :style="[{animationDelay: (index + 1)*0.02 + 's'}]"
					v-for="(item,index) in usList" :key="index" @tap="goPage(item.page)">
					<view class="padding text-center">
						<image :src="item.icon" style="width:28px;height:28px;">
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
		report,
		os
	} from '@/common/util/work.js'
	import socket from '@/common/js-sdk/socket/socket.js'
	export default {
		name: 'report',
		props: {
			cur: String,
		},
		watch: {
			cur: {
				immediate: true,
				handler: function(val, oldVal) {
					console.log('cur', val, oldVal)
					this.initReportList()
				},
			},
		},
		data() {
			return {
				swiperList: [{
						id: 1,
						type: 'image',
						url: '/static/banner/banner1.png',
						link: ''
					},
					{
						id: 2,
						type: 'image',
						url: '/static/banner/banner2.jpg',
						link: ''
					},
					{
						id: 3,
						type: 'image',
						url: '/static/banner/banner3.jpg',
						link: ''
					},
					{
						id: 4,
						type: 'image',
						url: '/static/banner/banner4.jpg',
						link: ''
					},
				],
				middleApps: [{
						icon: 'line2_icon1.png',
						title: '审批',
						'text': '个人审批'
					},
					{
						icon: 'line2_icon2.png',
						title: '审批稿',
						'text': '审批草稿箱'
					},
				],
				usList: [],
				msgCount: 0,
				dot: {
					mailHome: false
				}
			}
		},
		methods: {
			initReportList() {
				let permissionList = uni.getStorageSync("permissionList");
				let data = [];
				let reportList = [];
				let o1 = {}
				o1.url = "/report/material_stock"
				o1.page = "material_stock"
				o1.icon = "/static/home/128/material_stock.png"
				o1.title = "商品库存"
				reportList.push(o1);
				let o2 = {}
				o2.url = "/report/buy_in_report"
				o2.page = "buyin"
				o2.icon = "/static/home/128/warehouseReceipt.png"
				o2.title = "采购统计"
				reportList.push(o2)
				let o3 = {}
				o3.url = "/report/account_report"
				o3.page = "account"
				o3.icon = "/static/home/128/account.png"
				o3.title = "账户统计"
				reportList.push(o3)
				let o4 = {}
				o4.url = "/report/sale_out_report"
				o4.page = "saleout"
				o4.icon = "/static/home/128/salesOutbound.png"
				o4.title = "销售统计"
				reportList.push(o4)
				let o5 = {}
				o5.url = "/report/in_detail"
				o5.page = "indetail"
				o5.icon = "/static/home/128/indetail.png"
				o5.title = "入库明细"
				reportList.push(o5)
				let o6 = {}
				o6.url = "/report/out_detail"
				o6.page = "outdetail"
				o6.icon = "/static/home/128/outdetail.png"
				o6.title = "出库明细"
				reportList.push(o6)
				let o7 = {}
				o7.url = "/report/allocation_detail"
				o7.page = "allocationdetail"
				o7.icon = "/static/home/128/allocationdetail.png"
				o7.title = "调拨明细"
				reportList.push(o7)
				let o8 = {}
				o8.url = "/report/in_material_count"
				o8.page = "inmaterialcount"
				o8.icon = "/static/home/128/inmaterialcount.png"
				o8.title = "入库汇总"
				reportList.push(o8)
				let o9 = {}
				o9.url = "/report/out_material_count"
				o9.page = "outmaterialcount"
				o9.icon = "/static/home/128/outmaterialcount.png"
				o9.title = "出库汇总"
				reportList.push(o9)
				let o10 = {}
				o10.url = "/report/in_out_stock_report"
				o10.page = "inoutstockreport"
				o10.icon = "/static/home/128/inoutstockreport.png"
				o10.title = "进销存统计"
				reportList.push(o10)
				let o11 = {}
				o11.url = "/report/customer_account"
				o11.page = "customeraccount"
				o11.icon = "/static/home/128/customeraccount.png"
				o11.title = "客户对账"
				reportList.push(o11)
				let o12 = {}
				o12.url = "/report/vendor_account"
				o12.page = "vendoraccount"
				o12.icon = "/static/home/128/vendoraccount.png"
				o12.title = "供应商对账"
				reportList.push(o12)
				let o13 = {}
				o13.url = "/report/stock_warning_report"
				o13.page = "stockwarningreport"
				o13.icon = "/static/home/128/stockwarningreport.png"
				o13.title = "库存预警"
				reportList.push(o13)
				let o14 = {}
				o14.url = "/report/retail_out_report"
				o14.page = "retailout"
				o14.icon = "/static/home/128/retailout.png"
				o14.title = "零售统计"
				reportList.push(o14)

				if (permissionList && permissionList.length > 0) {
					for (var i = 0; i < permissionList.length; i++) {
						if (permissionList[i].children && permissionList[i].children.length > 0) {
							for (var k = 0; k < permissionList[i].children.length; k++) {
								for (var j = 0; j < reportList.length; j++) {
									if (permissionList[i].children[k].url == reportList[j].url) {
										let m = {}
										m.title = reportList[j].title
										if (reportList[j].icon) {
											m.icon = reportList[j].icon
										} else {
											m.icon = "/static/home/128/wendang.png"
										}
										m.description = reportList[j].title
										m.useCount = 1000,
											m.page = reportList[j].page
										data.push(m);
									}
								}
							}
						}
					}
				}
				this.usList = data;
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