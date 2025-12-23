<template name="openorder">
	<view>
		<cu-custom :bgColor="NavBarColor" :isBack="false" backRouterName="index">
			<block slot="content">开单</block>
		</cu-custom>
		<scroll-view>
			<!-- 常用服务 -->
			<view class="cu-bar bg-white solid-bottom" :style="[{animation: 'show 0.5s 1'}]">
				<view class="action">
					<text class='cuIcon-title text-blue'></text>开单
				</view>
			</view>
				
			<view class="cu-list grid col-4 text-sm">
				<view class="cu-item animation-slide-bottom" :style="[{animationDelay: (index + 1)*0.05 + 's'}]" v-for="(item,index) in usList" :key="index" @tap="goPage(item.page)">
					<view class="padding text-center">
						<image :src="item.icon" style="width:28px;height:28px;">
							<view class="cu-tag badge margin-top-sm" style="margin-left:1.2em" v-if="getTtemDotInfo(item)">
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
	import { openorder,os } from '@/common/util/work.js'
	import socket from '@/common/js-sdk/socket/socket.js'
	export default {
		name: 'openorder',
		props:{
			cur:String,
		},
		watch: {
			cur: {
				immediate: true,
				handler:function(val,oldVal){
					console.log('cur',val,oldVal)
				    this.initOpenorderList()
				},
			},
		},
		data() {
			return {
			 swiperList: [
				  {id:1,type: 'image',url: '/static/banner/banner1.png', link: ''},
				  {id:2,type: 'image',url: '/static/banner/banner2.jpg', link: ''},
				  {id:3,type: 'image',url: '/static/banner/banner3.jpg', link: ''},
				  {id:4,type: 'image',url: '/static/banner/banner4.jpg', link: ''},
				],
				middleApps: [
				  {icon: 'line2_icon1.png', title: '审批', 'text': '个人审批'},
				  {icon: 'line2_icon2.png', title: '审批稿', 'text': '审批草稿箱'},
				],
				usList:[],
				msgCount:0,
				dot:{
				  mailHome:false
				}
			}
		},
		methods: {
			initOpenorderList(){
				let permissionList=uni.getStorageSync("permissionList");
				let data=[]
				let operOrderList=[]
				let o1 = {}
				o1.url = "/bill/retail_out"
				o1.page = "retailOut"
				o1.title = "零售管理"
				operOrderList.push(o1)
				let o2 = {}
				o2.url = "/bill/retail_back"
				o2.page = "retailBackOut"
				o2.title = "零售退货"
				operOrderList.push(o2)
				let o3 = {}
				o3.url = "/bill/purchase_order"
				o3.page = "purchaseOrder"
				o3.title = "采购订单"
				operOrderList.push(o3)
				let o4 = {}
				o4.url = "/bill/purchase_in"
				o4.page = "purchaseIn"
				o4.title = "采购入库"
				operOrderList.push(o4)
				let o5 = {}
				o5.url = "/bill/purchase_back"
				o5.page = "purchaseInBack"
				o5.title = "采购退货"
				operOrderList.push(o5)
				let o6 = {}
				o6.url = "/bill/sale_order"
				o6.page = "saleOrder"
				o6.title = "销售订单"
				operOrderList.push(o6)
				let o7 = {}
				o7.url = "/bill/sale_out"
				o7.page = "saleOut"
				o7.title = "销售出库"
				operOrderList.push(o7)
				let o8 = {}
				o8.url = "/bill/sale_back"
				o8.page = "saleBack"
				o8.title = "销售退货"
				operOrderList.push(o8)
				let o9 = {}
				o9.url = "/bill/other_in"
				o9.page = "otherIn"
				o9.title = "其它入库"
				operOrderList.push(o9)
				let o10 = {}
				o10.url = "/bill/other_out"
				o10.page = "otherOut"
				o10.title = "其它出库"
				operOrderList.push(o10)
				let o11 = {}
				o11.url = "/bill/allocation_out"
				o11.page = "allocationOut"
				o11.title = "调拨订单"
				operOrderList.push(o11)
				let o12 = {}
				o12.url = "/financial/item_in"
				o12.page = "itemIn"
				o12.title = "收入单"
				operOrderList.push(o12)
				let o13 = {}
				o13.url = "/financial/item_out"
				o13.page = "itemOut"
				o13.title = "支出单"
				operOrderList.push(o13)
				let o14 = {}
				o14.url = "/financial/money_in"
				o14.page = "moneyIn"
				o14.title = "收款单"
				operOrderList.push(o14)
				let o15 = {}
				o15.url = "/financial/money_out"
				o15.page = "moneyOut"
				o15.title = "付款单"
				operOrderList.push(o15)
				let o16 = {}
				o16.url = "/financial/giro"
				o16.page = "giro"
				o16.title = "转账单"
				operOrderList.push(o16)
				let o17 = {}
				o17.url = "/financial/advance_in"
				o17.page = "advanceIn"
				o17.title = "收预付款"
				operOrderList.push(o17)
				 
				if(permissionList && permissionList.length > 0){
				     for(var i = 0; i < permissionList.length; i++) {
						 if(permissionList[i].children && permissionList[i].children.length > 0){
							 for(var k = 0; k < permissionList[i].children.length; k++) {
								 for(var j = 0; j < operOrderList.length; j++) {
								  if(permissionList[i].children[k].url == operOrderList[j].url) {
								   let m ={}
								   m.title=operOrderList[j].title
								   m.icon ="/static/home/128/wendang.png"
								   m.description =operOrderList[j].title
								   m.useCount =1000,
								   m.page =operOrderList[j].page
								   data.push(m);
								  }
								 }
								 }
						 }
				     }
				    }
				this.usList = data;
			},
			initMenu(){
				console.log("-----------home------------")
			    // this.onSocketOpen()
			    // this.onSocketReceive()
			    this.loadCount(0);
			},
			goPage(page){
				if(!page){
					return false;
				}
				if(page==='annotationList'){
				  this.msgCount = 0
				}
				this.dot[page]=false
				this.$Router.push({name: page})
			},
			// 启动webSocket
			onSocketOpen() {
				socket.init('websocket');
			},
			onSocketReceive() {
				var _this=this
				socket.acceptMessage = function(res){
					// console.log("页面收到的消息", res);
					if(res.cmd == "topic"){
					  //系统通知
					  _this.loadCount('1')
					}else if(res.cmd == "user"){
					  //用户消息
					  _this.loadCount('2')
					} else if(res.cmd == 'email'){
					 //邮件消息
					  _this.loadEmailCount()
					}
				}
			},
			loadCount(flag){
				console.log("loadCount::flag",flag)
				let url = '/sys/annountCement/listByUser';
				this.$http.get(url).then(res=>{
					console.log("res::",res)
				  if(res.data.success){
					let msg1Count = res.data.result.anntMsgTotal;
					let msg2Count = res.data.result.sysMsgTotal;
					this.msgCount = msg1Count + msg2Count
					console.log("this.msgCount",this.msgCount)
				  }
				})
			},
			loadEmailCount(){
				this.dot.mailHome = true
			},
			getTtemDotInfo(item){
				if(item.page==='annotationList' && this.msgCount>0){
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
