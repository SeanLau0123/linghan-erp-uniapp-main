<template>
	<view class="bg-white" >
		<cu-custom :bgColor="NavBarColor" :isBack="true" backRouterName="index" pageCur="openorder">
			<block slot="backText">返回</block>
			<block slot="content">零售出库</block>
		</cu-custom>
<!-- 		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view style="padding-left: 70px;"  >
				<text style="font-weight: bold;font-size: 14px;">零售出库列表，点击右侧进行筛选</text>  
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-blue shadow-blur round" @tap="openGoodsSearch">搜索</button>
			<uni-popup ref="popup" style="z-index: 20; margin: 0 auto;height: 800px;" type="right" >
					<view style="height: 800px; width: 100%;float: right;">
						<form style="height: 800px;">
							<view class="cu-form-group"  style="margin-top:60px;">
								<view class="title">单据编号</view>
								<input placeholder="请输入单据编号" v-model="queryParam.number" name="input" ></input>
							</view>
							<view class="cu-form-group" >
								<view class="title">商品信息</view>
								<input placeholder="条码/名称/规格/型号" v-model="queryParam.materialParam" name="input" ></input>
								<uni-icons type="scan" @tap="showScan" size="20"></uni-icons>
							</view>
							<view class="cu-form-group" style="padding-left: 0.1px;">
							  <my-date label="开始日期：" v-model="queryParam.beginTime" placeholder="请选择开始日期" required fields="day"></my-date>
							</view>
							<view class="cu-form-group" style="padding-left: 0.1px;">
							  <my-date label="结束日期：" v-model="queryParam.endTime" placeholder="请选择结束日期" required fields="day"></my-date>
							</view>
							<view class="cu-form-group" >
								<view class="title">会员卡号</view>
								<app-select v-model="queryParam.organId" placeholder="选择会员卡号" :dict="retailList" space ></app-select>
							</view>
							<view class="cu-form-group" >
								<view class="title">操作员</view>
								<app-select v-model="queryParam.creator" placeholder="选择操作员" :dict="userList" space ></app-select>
							</view>
							<view class="cu-form-group" :isBack="true" backRouterName="index">
							  <button style="background-image: linear-gradient(45deg, #848a90, #848a90);" class="cu-btn bg-gradual-blue shadow-blur round" @tap="close">返回</button>
							  <button class="cu-btn bg-gradual-blue shadow-blur round" @tap="reset">重置</button>
							  <button class="cu-btn bg-gradual-blue shadow-blur round" @tap="retailOutSearch">确定</button>
							</view>
						</form>
						
					</view>
				</uni-popup>
			</view>
		</view> -->
		<view class="container">
			 <mescroll-uni ref="mescrollRef" @init="mescrollInit" :top="top"  @down="downCallback"  @up="upCallback">
				<!-- 数据列表 -->
				<view class="al-list cu-list">
					<view class="message_text bg-white cu-item flex justify-around align-center solid-bottom margin-bottom-sm margin-top-sm" style="width: 100vw;" v-for="(item,index) in msgList" :key="index" @tap="goRetailOutDetail(item)" :class="modalName=='move-box-'+ index?'move-cur':''"
					   :data-target="'move-box-' + index">
						<view class="titlePad content" style="height: 11.5em;">
							<view class="flex justify-start text-cut text-lg" style="width:26em;color: #333;font-family: '黑体';">
								<!-- <view v-if="item.readFlag == '0'"  class="cu-tag light bg-blue">未读</view> -->
								<view  >
									<text class="cuIcon-title text-red padding-left-sm" style="margin-right: -0.8em;"></text>
								</view>
								<view style="display: flex;justify-content: space-between;width: 90vw;" class="padding-left">
									<text class="text-black"  >{{titleFilter(item.number,18)}} </text>
									<view >
									  <text v-if="item.status == '0'" style="color:green;">未审核</text>
									  <text v-if="item.status == '1'" style="color:orange;">已审核</text>
									</view>
								</view>
							</view>
							<view class="flex justify-between margin-top-xs" style="font-family: '黑体';color: #999;">
	
								<view style="padding-left: .8rem;display: flex;justify-content: space-between;width: 80vw;">
									<text  class="text-content text-cut" style="padding-left: .18rem;width: 12em;">会员：</text>
									<view class="text-content text-cut" v-if="item.organName && item.organName.length > 0" style="width:60em;"
									 v-html="titleFilter(item.organName,19)">
									</view>
								</view>
			 
							</view>
							<view class="flex justify-between margin-top-xs" style="font-family: '黑体';color: #999;">
					 
								<view style="padding-left: .8rem;display: flex;justify-content: space-between;width: 100vw;">
									<text  class="text-content text-cut" style="padding-left: .18rem;width: 12em;">商品：</text>
									<view class="text-content text-cut" v-if="item.materialsList && item.materialsList.length > 0" style="width:80em;"
									 v-html="titleFilter(item.materialsList,19)">
									</view>
								</view>
							</view>
							<view class="flex justify-between margin-top-xs" style="font-family: '黑体';color: #999;">
			 
								<view style="padding-left: .8rem;display: flex;justify-content: space-between;width: 100vw;">
									<text  class="text-content text-cut" style="padding-left: .18rem;width: 20em;">单据日期：</text>
									<view class="text-content text-cut" v-if="item.operTimeStr " style="width:80em;"
									 v-html="formatDate(item.operTimeStr,19)">
									</view>
								</view>
							</view>
							<view class="flex justify-between margin-top-xs" style="font-family: '黑体';color: #999;">
		 
								<view style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
									<text  class="text-content text-cut" style="padding-left: .18rem;width: 15em;">操作员：</text>
									<view class="text-content text-cut" v-if="item.userName && item.userName.length >= 0" style="width:30em;"
									 v-html="item.userName">
									</view>
								</view>
							 <view style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
							 	<text  class="text-content text-cut" style="padding-left: .18rem;width: 12em;">合计金额：</text>
							 	<view class="text-content text-cut" v-if="item.totalPrice >= 0" style="width:30em;"
							 	 v-html="item.totalPrice">
							 	</view>
							 </view>
							</view>
							<view class="flex justify-between margin-top-xs" style="font-family: '黑体';color: #999;">
				 
								<view style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
									<text  class="text-content text-cut" style="padding-left: .18rem;width: 22em;">收款金额：</text>
									<view class="text-content text-cut" v-if="item.getAmount  >= 0" style="width:30em;"
									 v-html="item.getAmount">
									</view>
								</view>
							 <view style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
							 	<text  class="text-content text-cut" style="padding-left: .18rem;width: 12em;">找零：</text>
							 	<view class="text-content text-cut" v-if="item.backAmount  >= 0" style="width:30em;"
							 	 v-html="item.backAmount">
							 	</view>
							 </view>
							</view>
						</view>
						<view class="action text-sm" style="color: #aaa;margin-top: -2em;margin-left: -13em;width: 10em;">
							<text >{{formatDate(item.sendTime,10)}}</text>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
<uni-fab ref="fab" :pattern="pattern"  horizontal="right" 
			direction="horizontal"  @fabClick="fabClick" />
	</view>
</template>

<script>
 
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import appSelect from '@/components/my-componets/appSelect.vue'
	import tkiTree from "@/components/tki-tree/tki-tree.vue"
	import myDate from '@/components/my-componets/my-date.vue'
	export default {
	    mixins: [MescrollMixin], // 使用mixin
		components:{
		    appSelect ,tkiTree,myDate,
		 },
		onLoad() {
			this.loadRetailListData()
			this.loadUserListData()
		},
		data() {
			return {
				// 查询条件
				queryParam: {
				  number: "",
				  materialParam: "",
				  type: "出库",
				  subType: "零售",
				  roleType: uni.getStorageSync("roleType"),
				  organId: "",
				  depotId: "",
				  creator: "",
				  accountId: "",
				  status: "",
				  remark: "",
				  column:'createTime',
				  order : 'desc',
				  beginTime:'',
				  endTime:'',
				},

				retailList:[],
				userList:[],
				pattern: {
								color: 'gray',
								backgroundColor: '#FFFFFF',
								selectedColor: '#007AFF',
								buttonColor:'blue'
							},
				direction:"right",
				multiple: false,
				selectParent: true,
				flod: false,
				categoryId_type:[],
				TabCur: 0,
				scrollLeft: 0,
				NavBarColor:this.NavBarColor,
				upOption:{
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量
					},
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 暂无数据 ~', // 提示
						
					},
					loading:'',
					text:'全部',
					isShowNoMore:false,
					textNoMore:'我是有底线的 >_<'
				},
				msgList: [], //列表数据
			    read: "all",
				announcement1:[],
				msg1Count:"",
				msg1Title:"",
				announcement2:[],
				msg2Count:"",
				msg2Title:"",
				url:"/material/list",
				delUrl:'/sys/sysAnnouncementSend/delete',
				listTouchStart: 0,
			    modalName: null,
			    listTouchDirection: null,
				organName:"",
				number:"",
				materialsList:"",
				operTimeStr:"",
				userName:"",
				totalPrice:"",
				getAmount:"",
				backAmount:"",
				status:"", 
			};
		},
		onShow() {
			if(this.mescroll){
				this.mescroll.resetUpScroll()
			}
		},
		computed:{
			top() {
				return this.CustomBar * 2 + 95
			},
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				return style
			},
		},

		methods: {
			 loadUserListData(){
			   let that = this;
			   this.userList = []
			   let params = {};
			   that.$http.get("/user/getUserList",{params}).then(res=>{
				 if(res.statusCode == '200'){
				  for(let annItem of res.data){
					  let row = {};
					  row.text = annItem.userName;
					  row.value = annItem.id+""
					 that.userList.push(row)							
				  }	
				 } 
				}).catch(()=>{
					//加载失败, 结束
			   })
			 },
			 loadRetailListData(){
			   let that = this;
			   this.retailList = []
			   let params = {};
			   that.$http.post("/supplier/findBySelect_retail",{params}).then(res=>{
			 				 if(res.statusCode == '200'){
			 				  for(let annItem of res.data){
			 					  let row = {};
			 					  row.text = annItem.supplier;
			 					  row.value = annItem.id+""
			 					 that.retailList.push(row)							
			 				  }	
			 				 } 
			 				}).catch(()=>{
			 					//加载失败, 结束
			   })
			 },
			upCallback(page) {
				let params={currentPage: page.num, pageSize:page.size}
			    params.search = this.queryParam
				//联网加载数据
					this.$http.get("/depotHead/list",{params:params}).then(res=>{
						//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
						this.announcement1 = res.data.data.rows
						this.mescroll.endSuccess(res.data.data.total);
						//console.log("url", res)
						//设置列表数据
						  if (res.data.code == "200") {
							 console.log("res",res.data)
							 this.msg1Count = res.data.data.total
							 for(let annItem of this.announcement1){
								 annItem.getAmount = annItem.changeAmount + annItem.backAmount
									 this.msgList.push(annItem)							
							 }							 
												
						 }
						if(page.num == 1){
							this.msgList = []; //如果是第一页需手动制空列表
							this.msgList = this.msgList.concat(res.data.data.rows); //追加新数据
						}
						
					}).catch(()=>{
						//联网失败, 结束加载
						this.mescroll.endErr();
					})
			},
		
			goRetailOutDetail(item){
				this.mescroll.resetUpScroll() 
					uni.navigateTo({
						url: '/pages/openorder/retailOut/retailOutModel?item='+ encodeURIComponent(JSON.stringify(item))+'&action=edit'
					});
			},
			fabClick(){
				uni.navigateTo({ url: '/pages/openorder/retailOut/retailOutModel?action=add'				});
			},
			isEmail(item){
				if(item.openType=="component" &&item.openPage.indexOf('email')>=0){
				  return true;
				}else{
				  return false;
				}
		    },
			goEmailDetailPage(item){
				console.log("go",item.anntId)
				console.log("item",item)
				 if(item.readFlag == '0'){
					//item.readFlag = '1'
					this.mescroll.resetUpScroll() 
					let readUrl = '/sys/sysAnnouncementSend/editByAnntIdAndUserId';
					this.$http.put(readUrl,{anntId:item.anntId})					
				}
				// console.log("goe",item.busId)
				
				uni.navigateTo({
					url: '/pages/mail/mailDetail?id='+item.busId
				});
				
			},
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			deleteAnnotation(item) {
				this.$http.delete(this.delUrl+'?id='+item.id).then(res => {
					console.log("结果数据9", res)
					if (res.data.success) {
						this.mescroll.resetUpScroll() 
					}
				}).catch(e => {
					console.log("al delUrl请求错误2", e)
					this.mescroll.endErr();
				})
			},
			formatDate(text,len){
				if(!text || text.length==0){
					return ''
				}
				if(text.length<len){
					return text;
				}
				return text.substr(0,len)
			},
			titleFilter(text,len){
				if(!text || text.length==0){
					return ''
				}
				if(text.length<len){
					return text;
				}
				return text.substr(0,len)+"..."
			},
			openGoodsSearch(){
				this.$refs.popup.open()
			},
			// 确定回调事件
			treeConfirm(e) {
						 this.categoryName = e[0].name  
						 this.categoryId = e[0].id 
			},
			// 取消回调事件
			treeCancel(e) {
						console.log(e)
			},
			// 显示树形选择器
			showTree() {
						this.$refs.tkitree._show();
			},
			loadCategoryIdTreeData(){
			     let that = this;
			     let params = {};
			     params.id='';
			     that.$http.get("/materialCategory/getMaterialCategoryTree",{params}).then(res=>{
			       if(res){
			      that.categoryId_type = [];
			      for(let annItem of res.data){
			       let row = {};
			       let p = [];
			       row.name = annItem.title;
			       row.id = annItem.id
			       if( annItem.children.length > 0){
			        for(let c of annItem.children){
			         let cc = {}
			        cc.name = c.title;
			        cc.id = c.id
			        p.push(cc);
			         }
			       }
			       row.children = p
			        that.categoryId_type.push(row);    
			      } 
			       }else{
			       this.mescroll.endErr();
			        }
			      }).catch(()=>{
			       //加载失败, 结束
			       this.mescroll.endErr();
			     })
			 },
			 
			close() {
				this.$refs.popup.close()
			},
			retailOutSearch(){
			this.msgList = [];
			let params={ currentPage:1, pageSize:10}
			params.search = this.queryParam
			//联网加载数据
				this.$http.get("/depotHead/list",{params:params}).then(res=>{
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.announcement1 = res.data.data.rows
					this.mescroll.endSuccess(res.data.data.total);
					//console.log("url", res)
					//设置列表数据
					  if (res.data.code == "200") {
						 console.log("res",res.data)
						 this.msg1Count = res.data.data.total
						 for(let annItem of this.announcement1){
								 this.msgList.push(annItem)							
						 }							 
											
					 }
					if(page.num == 1){
						this.msgList = []; //如果是第一页需手动制空列表
						this.msgList = this.msgList.concat(res.data.data.rows); //追加新数据
					}
					
				}).catch(()=>{
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},reset(){
				this.queryParam = {}
				this.queryParam.type = "出库";
				this.queryParam.subType= "零售";
				this.queryParam.roleType = uni.getStorageSync("roleType")
				this.queryParam.column = 'createTime';
				this.queryParam.order = 'desc';
				this.retailOutSearch()
			},			
			showScan(){
				// 允许从相机和相册扫码
				let code ;
				let that = this;
				uni.scanCode({
					success: function (res) {
						that.queryParam.materialParam = res.result
					}
				});
					
			},	
		}
	}
</script>

<style scoped>
	.e-btn{margin-bottom: 1rem;}

	.titlePad{margin-top:0.6rem;}
	.cu-list>.move-cur{
		transform: translateX(-150rpx);
		
	}
	.nav .cu-item.cur {
		position: flex;
		z-index: 9;
		border-bottom: 4upx solid;
	}
</style>
