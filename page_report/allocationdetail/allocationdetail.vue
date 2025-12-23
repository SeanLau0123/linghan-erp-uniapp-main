<template>
	<view class="bg-white" >
		<cu-custom :bgColor="NavBarColor" :isBack="true" backRouterName="/pages/index/index" pageCur="report">
			<block slot="backText">返回</block>
			<block slot="content">调拨明细</block>
		</cu-custom>
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			 <view style="padding-left: 40px;"  >
			       <uni-easyinput prefixIcon="search" v-model="materialParam" placeholder="条码/名称/规格/型号" @input="searchChange">
			       </uni-easyinput>
			      </view>
			      <view>
			      <uni-icons type="scan" style="color: blue;" @tap="showScanSearch" size="35"></uni-icons>
			      </view>
			      <view class="action" style="padding-left: 10px;">
			       <uni-icons type="search" style="color: blue;" @tap="openSearch" size="37"></uni-icons>
		</view>
		<view style="padding-left: 7px; " >
			    <uni-popup ref="popup" style="z-index: 20; margin: 0 auto;height: 800px;" type="right" >
					<view style="height: 800px; width: 100%;float: right;">
						<form style="height: 800px;">
							<view class="cu-form-group" style="margin-top:40px;" >
								<view class="title">单据编号</view>
								<input placeholder="请输入单据编号" v-model="number" name="input" ></input>
							</view>
							<view class="cu-form-group">
								<view class="title">商品信息</view>
								<input placeholder="请输入条码/名称/规格/型号" v-model="materialParam" name="input" ></input>
								<uni-icons type="scan" style="color: blue;" @tap="showScan" size="20"></uni-icons>
							</view>
							<view class="cu-form-group" style="padding-left: 0.1px;">
							  <my-date label="开始时间：" v-model="beginTime" placeholder="请选择开始时间" required fields="day"></my-date>
							</view>
							<view class="cu-form-group" style="padding-left: 0.1px;">
							  <my-date label="结束时间：" v-model="endTime" placeholder="请选择开始时间" required fields="day"></my-date>
							</view>
							<view class="cu-form-group">
							    <view class="title"  >调出仓库</view>
							    <app-select v-model="depotIdF" placeholder="请选择调出仓库" :dict="depotList" space ></app-select>
								
							</view>
							<view class="cu-form-group">
							    <view class="title"  >调入仓库</view>
							    <app-select v-model="depotId" placeholder="请选择调入仓库" :dict="depotList" space ></app-select>
								
							</view>
							<view class="cu-form-group">
								<view class="title">备注</view>
								<input placeholder="请输入备注" v-model="remark" name="input" ></input>
							</view>
							<view class="cu-form-group" :isBack="true" >
							  <button style="background-image: linear-gradient(45deg, #848a90, #848a90);" class="cu-btn bg-gradual-blue shadow-blur round" @tap="close">返回</button>
							  <button class="cu-btn bg-gradual-blue shadow-blur round" @tap="reset">重置</button>
							  <button class="cu-btn bg-gradual-blue shadow-blur round" @tap="stockSearch(0)">确定</button>
							</view>
						</form>
						
					</view>
					
					<!-- <view  style="padding: 10upx;">
					<form>
						<view class="cu-form-group">
							<view class="title">姓名</view>
							<input placeholder="请输入姓名" name="input" ></input>
						</view>
						<view class="cu-form-group">
							<view class="title">姓名</view>
							<input placeholder="请输入姓名" name="input" ></input>
						</view>
					</form>
					</view> -->
				</uni-popup>
			</view>
		</view>
		<view class="container">
			 <mescroll-uni ref="mescrollRef" @init="mescrollInit" :top="top"  @down="downCallback"  @up="upCallback">
				<!-- 数据列表 -->
				<view class="al-list cu-list">
					<view class="message_text bg-white cu-item flex justify-around align-center solid-bottom margin-bottom-sm margin-top-sm" style="width: 100vw;" v-for="(item,index) in msgList" :key="index"  :class="modalName=='move-box-'+ index?'move-cur':''"
					   :data-target="'move-box-' + index">
						<view class="titlePad content" style="height: 11.5em;">
							<view class="flex justify-start text-cut text-lg" style="width:26em;color: #333;font-family: '黑体';">
								<view  >
									<text class="cuIcon-title text-red padding-left-sm" style="margin-right: -0.8em;"></text>
								</view>
								<view style="display: flex;justify-content: space-between;width: 90vw;" class="padding-left">
									<text class="text-black"  >{{titleFilter(item.mname,14)}}({{titleFilter(item.barCode,14)}}) </text>
								</view>
							</view>
							
							<view class="flex justify-between margin-top-xs" style="font-family: '黑体';color: #999;">
							
								<view style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
									<text  class="text-content text-cut" style="padding-left: .18rem;width: 100%;">单号：{{titleFilter(item.number,19)}}</text>
								</view>
							 <view style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
							 	<text  class="text-content text-cut" style="padding-left: .18rem;width: 100%;">规格：{{titleFilter(item.standard,9)}}</text>
							 </view>
							</view>
							
							
							<view class="flex justify-between margin-top-xs" style="font-family: '黑体';color: #999;">
							
								<view style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
									<text  class="text-content text-cut" style="padding-left: .18rem;width: 100%;">型号：{{titleFilter(item.model,19)}}</text>
								</view>
							 <view style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
							 	<text  class="text-content text-cut" style="padding-left: .18rem;width: 100%;">单位：{{titleFilter(item.mUnit,9)}}</text>
							 </view>
							</view>
							
							
							<view class="flex justify-between margin-top-xs" style="font-family: '黑体';color: #999;">
							
								<view style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
									<text  class="text-content text-cut" style="padding-left: .18rem;width: 100%;">调出仓库：{{titleFilter(item.dname,19)}}</text>
								</view>
							 <view style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
							 	<text  class="text-content text-cut" style="padding-left: .18rem;width: 100%;">调入仓库：{{item.sname}}</text>
							 </view>
							</view>
							
							
							
							<view class="flex justify-between margin-top-xs" style="font-family: '黑体';color: #999;">
							
								<view style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
									<text  class="text-content text-cut" style="padding-left: .18rem;width: 100%;">调拨日期：{{titleFilter(item.operTime,19)}}</text>
								</view>
							 <view style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
							 	<text  class="text-content text-cut" style="padding-left: .18rem;width: 100%;">备注：{{titleFilter(item.newRemark,9)}}</text>
							 </view>
							</view>
							
							<view class="flex margin-top-xs" style="font-family: '黑体';color: #999;">
								
								<view style="padding-left: .8rem;display: flex;width: 30vw;">
									<text  class="text-content text-cut" style="font-weight: bold;padding-left: .18rem;width: 100%;">数量:{{item.operNumber}}</text>
								</view>
								<view style="padding-left: .1rem;display: flex;width: 30vw;">
									<text  class="text-content text-cut" style="font-weight: bold;padding-left: .18rem;width: 100%;">单价:{{item.unitPrice}}</text>
								</view>
							 <view style="padding-left: .1rem;display: flex;;width: 30vw;">
								<text  class="text-content text-cut" style="font-weight: bold;padding-left: .18rem;width: 100%;">金额:{{item.allPrice}}</text>
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
	</view>
</template>

<script>
	const tabs = [{title:'通知公告',value:0}, {title:'系统消息',value:1}];
	const enableBatchNumber_dict = [{text:'显示',value:'1'},{text:'隐藏',value:'0'}];
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import appSelect from '@/components/my-componets/appSelect.vue'
	import tkiTree from "@/components/tki-tree/tki-tree.vue"
	import myDate from '@/components/my-componets/my-date.vue'
	import { getNowFormatYear,getFormatDate} from "@/common/util/util.js"
	export default {
	    mixins: [MescrollMixin], // 使用mixin
		components:{
		      appSelect ,tkiTree,myDate
		},
		onLoad() {
			this.loadDepotList()
			this.loadSupList()
		},
		data() {
			return {
				queryParams:{},
				multiple: false,
				selectParent: false,
				flod: false,
				categoryId_type:[],
				enableBatchNumber_dict,
				depotList:[],
				tabs,
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
				listUrl:'/depotHead/findAllocationDetail',
				getStatisticsUrl:"/account/getStatistics",
				delUrl:'/sys/sysAnnouncementSend/delete',
				listTouchStart: 0,
			    modalName: null,
			    listTouchDirection: null,
				currentStockPrice:0,
				currentStock:0,
				stockId:'',
				stockName:'',
				categoryName:'',
				categoryId:'',
				goodsInfo:'',
				zeroStock:'0',
				name:'',
				serialNo:'',
				allMonthAmount:'0',
				allCurrentAmount:'0',
				materialParam:'',
				createTimeRange:'',
				beginTime:getNowFormatYear() + '-01-01',
				endTime:getFormatDate(),
				mpList : "制造商,自定义1,自定义2,自定义3",
				number:'',
				supList: [],
				organId:'',
				depotId:'',
				depotIdF:'',
				remark:'',
				subType: "调拨",
				CustomBar: this.CustomBar,
			}
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
			// unique(arr) {
			//     var obj = {};
			//     return arr.filter(function(item, index, arr){
			//         return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
			//     })
			// },
			getAccountStatistics(){
				let params={order:'desc',column:'createTime',mname:'',number:'',materialParam:'',createTimeRange:''}
				if(this.mname){
					params.mname=this.mname
				}if(this.number){
					params.number=this.number
				}
				this.$http.get(this.getStatisticsUrl,{params:params}).then(res=>{
					if (res.data.code == "200") {
						 this.allMonthAmount=res.data.data.allMonthAmount
						 this.allCurrentAmount=res.data.data.allCurrentAmount
					}
				})
			},
			upCallback(page) {
				let params={subType:this.subType,remark:'',depotIdF:'',depotId:'',organId:'',remark: '',order:'desc',column:'createTime',number:'',materialParam:'',createTimeRange:'',currentPage: 1, pageSize:10}
				if(this.remark){
					params.remark=this.remark
				}if(this.depotIdF){
					params.depotIdF=this.depotIdF
				}if(this.number){
					params.number=this.number
				}if(this.organId){
					params.organId=this.organId
				}if(this.depotId){
					params.depotId=this.depotId
				}
				if(this.materialParam){
					params.materialParam=this.materialParam
				}if(this.beginTime){
					params.beginTime=this.beginTime
				}if(this.endTime){
					params.endTime=this.endTime
				}
				// console.log("params"+JSON.stringify(params) )
				//联网加载数据
				// console.log("tabindex",this.TabCur )
				let keyword = this.TabCur
					this.$http.get(this.listUrl,{params:params}).then(res=>{
						//设置列表数据
						  if (res.data.code == "200") {
						//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
						this.announcement1 = res.data.data.rows
						let totalPages = Math.ceil(res.data.data.total/page.size)
						let hasNext = true;
						if(totalPages == page.num){
							hasNext = false
						}
						this.$refs.mescrollRef.mescroll.endSuccess(res.data.data.rows.length,hasNext);
						if(page.num == 1){
							this.msgList = []; //如果是第一页需手动制空列表
						}
						
							  if(res.data.data.rows.length > 0){
							 for(let annItem of this.announcement1){
									 this.msgList.push(annItem)							
							 }							 
												
						 }
						 }
						
					}).catch(()=>{
						//联网失败, 结束加载
						this.mescroll.endErr();
					})
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
			openSearch(){
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
			loadDepotList(){
			     let that = this;
			     let params = {};
			     params.id='';
			     that.$http.get("/depot/findDepotByCurrentUser",{params}).then(res=>{
					 console.log("仓库有："+JSON.stringify(res.data))
			       if(res){
					  that.depotList = [];
					  for(let annItem of res.data.data){
					   let row = {};
					   row.text = annItem.depotName;
					   row.value = annItem.id+""
					   
						that.depotList.push(row);    
					  } 
			       }else{
					// this.mescroll.endErr();
			        }
			      }).catch(()=>{
			       //加载失败, 结束
			       // this.mescroll.endErr();
			     })
			 },
			 loadSupList(){
			      let that = this;
			      let params = {};
			      params.id='';
			      that.$http.post("/supplier/findBySelect_sup",{params}).then(res=>{
			 		 console.log("供应商有："+JSON.stringify(res.data))
			        if(res){
			 		  that.supList = [];
			 		  for(let annItem of res.data){
			 		   let row = {};
			 		   row.text = annItem.supplier;
			 		   row.value = annItem.id+""
			 		   
			 			that.supList.push(row);    
			 		  } 
			        }else{
			 		// this.mescroll.endErr();
			         }
			       }).catch(()=>{
			        //加载失败, 结束
			        // this.mescroll.endErr();
			      })
			  },
			close() {
				this.$refs.popup.close()
			},
			stockSearch(v){
				this.$refs.mescrollRef.mescroll.setPageNum(1)	
				this.$refs.mescrollRef.mescroll.resetUpScroll(null)
				if(v == 0){
					this.close()
				}
			},
			 reset(){
				this.materialParam=''
				this.number=''
				this.depotIdF = ''
				this.depotId = ''
				this.remark = ''
				this.beginTime=getNowFormatYear() + '-01-01';
				this.endTime=getFormatDate()
				this.stockSearch(0)
			},
			showScan(){
				// 允许从相机和相册扫码
				let code ;
				let that = this;
				uni.scanCode({
					success: function (res) {
						that.materialParam = res.result
					}
				});
					
			},	
			   showScanSearch(){
			       // 允许从相机和相册扫码
			       let code ;
			       let that = this;
			       uni.scanCode({
			        success: function (res) {
			         that.materialParam = res.result
			         that.stockSearch()
			        }
			       });
			      },
			      searchChange(v){
			       this.materialParam =v
			       this.stockSearch()
			      }
			
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
