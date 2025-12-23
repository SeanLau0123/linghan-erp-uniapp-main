<template>
	<view class="bg-white" >
		<cu-custom :bgColor="NavBarColor" :isBack="false" backRouterName="index">
			<block slot="backText">返回</block>
			<block slot="content">商品选择</block>
		</cu-custom>
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<uni-icons type="back" @tap="goodsSelectBack" size="30"></uni-icons>
			<view style="padding-left: 30px;"  > 
				<text style="font-weight: bold;font-size: 15px;">商品信息,点击右侧搜索</text>  
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-blue shadow-blur round" @tap="openGoodsSearch">搜索</button>
			<uni-popup ref="popup" style="z-index: 20; margin: 0 auto;height: 800px;" type="right" >
					<view style="height: 800px; width: 100%;float: right;">
						<form style="height: 800px;">
							<view class="cu-form-group"  style="margin-top:60px;">
							    <view class="title">类别</view>
							    <input disabled="true" placeholder="请输入类别" name="input" v-model="categoryName"></input>
							    <input hidden="true" placeholder="请输入类别" name="input" v-model="categoryId"></input>
							    <tki-tree ref="tkitree" :selectParent="selectParent" :multiple="multiple" :range="categoryId_type" :foldAll="flod" rangeKey="name" @confirm="treeConfirm"
							     @cancel="treeCancel"></tki-tree>
							    <uni-icons type="settings-filled" @tap="showTree" size="30"></uni-icons>
							</view>
							<view class="cu-form-group" >
								<view class="title">商品信息</view>
								<input placeholder="条码/名称/规格/型号" v-model="goodsInfo" name="input" ></input>
								<uni-icons type="scan" @tap="showScan" size="20"></uni-icons>
							</view>
							<view class="cu-form-group" >
								<app-select label="仓库"  v-model="depotId" placeholder="请选择" :dict="depotList" space ></app-select>
							</view>
							<view class="cu-form-group" :isBack="true" backRouterName="index">
							  <button style="background-image: linear-gradient(45deg, #848a90, #848a90);" class="cu-btn bg-gradual-blue shadow-blur round" @tap="close">返回</button>
							  <button class="cu-btn bg-gradual-blue shadow-blur round" @tap="reset">重置</button>
							  <button class="cu-btn bg-gradual-blue shadow-blur round" @tap="goodsSearch">确定</button>
							</view>
						</form>
						
					</view>
				</uni-popup>
			</view>
		</view>
		<view class="container">
		<uni-popup ref="popupStock"  type="bottom" :maskClick="false" >
				<view style="height: 800px; width: 100%;float: right;">
					<form style="height: 800px;">
						<view class="cu-form-group" style="margin-top:450px;">
							<view style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
								<text  class="text-content text-cut" style="padding-left: .18rem;width: 12em;">条码：</text>
								<view class="text-content text-cut" v-if="goodsDetailbarCode && goodsDetailbarCode.length > 0" style="width:30em;"
								 v-html="titleFilter(goodsDetailbarCode,14)">
								</view>
							</view>
						 <view style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
							<text  class="text-content text-cut" style="padding-left: .18rem;width: 7em;">名称：</text>
							<view class="text-content text-cut" v-if="goodsDetailname && goodsDetailname.length > 0" style="width:30em;"
							 v-html="titleFilter(goodsDetailname,14)">
							</view>
						 </view>
						</view>
						<view class="cu-form-group" >
							<app-select label="仓库:"   :required="true" v-model="goodsDetaildepotId" @change="depotChange" placeholder="请选择" :dict="depotList" space ></app-select>
						</view>
						<view class="cu-form-group" style="padding-left: 2rem;" >
							<text  class="title">数量：</text>
							<input placeholder="请输入数量" id="operNumber" @input="InputChange" name="input" v-model="goodsDetailoperNumber"></input>
						</view>
						<view class="cu-form-group" style="padding-left: 2rem;">
							<text  class="title">单价：</text>
							<input placeholder="请输入单价" id="unitPrice" @input="InputChange" name="input" v-model="goodsDetailunitPrice"></input>
						</view>
						<view class="cu-form-group" style="padding-left: 2rem;">
							<text  class="title">金额：</text>
							<input placeholder="请输入金额" id="allPrice"  @input="InputChange" name="input" v-model="goodsDetailallPrice" ></input>
						</view>
<!-- 						<view class="cu-form-group" style="padding-left: 2rem;">
							<text  class="title">税率（%）：</text>
							<input placeholder="请输入税率（%）" id="taxRate" @input="InputChange" name="input" v-model="goodsDetailtaxRate"></input>
						</view>
						<view class="cu-form-group" style="padding-left: 2rem;">
							<text  class="title">税额：</text>
							<input placeholder="请输入税额" disabled="true" @input="InputChange" name="input" v-model="goodsDetailtaxMoney"></input>
						</view>
						<view class="cu-form-group" style="padding-left: 2rem;">
							<text  class="title">价税合计：</text>
							<input placeholder="请输入税额" id="taxLastMoney" @input="InputChange" name="input" v-model="goodsDetailtaxLastMoney"></input>
						</view> -->
						<view class="cu-form-group" style="padding-left: 2rem;">
							<text  class="title">备注：</text>
							<input placeholder="请输入备注" name="input" v-model="goodsDetailremark"></input>
						</view>
						<view class="cu-form-group" :isBack="true" backRouterName="index">
						  <button style="background-image: linear-gradient(45deg, #848a90, #848a90);" class="cu-btn bg-gradual-blue shadow-blur round" @tap="goodsDetailClose">取消</button>
						  <button class="cu-btn bg-gradual-blue shadow-blur round" @tap="goodsDetailSubmit">确定</button>
						</view> 
					</form>
					
				</view>
			</uni-popup>
		</view>
		<view class="container">
			 <mescroll-uni ref="mescrollRef" @init="mescrollInit" :top="top"  @down="downCallback"  @up="upCallback">
				<!-- 数据列表 -->
				<view class="al-list cu-list">
					<view class="message_text bg-white cu-item flex justify-around align-center solid-bottom margin-bottom-sm margin-top-sm" style="width: 100vw;" v-for="(item,index) in msgList" :key="index" @tap="goGoodsDetail(item)" :class="modalName=='move-box-'+ index?'move-cur':''"
					   :data-target="'move-box-' + index">
						<view class="titlePad content" style="height: 11.5em;">
							<view class="flex justify-start text-cut text-lg" style="width:26em;color: #333;font-family: '黑体';">
								<!-- <view v-if="item.readFlag == '0'"  class="cu-tag light bg-blue">未读</view> -->
								<view  >
									<text class="cuIcon-title text-red padding-left-sm" style="margin-right: -0.8em;"></text>
								</view>
								<view style="display: flex;justify-content: space-between;width: 90vw;" class="padding-left">
									<text class="text-black"  >{{titleFilter(item.name,18)}}({{titleFilter(item.mBarCode,18)}}) </text>
								
								</view>
							</view>
							<view class="flex justify-between margin-top-xs" style="font-family: '黑体';color: #999;">
	
								<view style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
									<text  class="text-content text-cut" style="padding-left: .18rem;width: 12em;">规格：</text>
									<view class="text-content text-cut" v-if="item.standard && item.standard.length > 0" style="width:30em;"
									 v-html="titleFilter(item.standard,9)">
									</view>
								</view>
							 <view style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
							 	<text  class="text-content text-cut" style="padding-left: .18rem;width: 7em;">型号：</text>
							 	<view class="text-content text-cut" v-if="item.model && item.model.length > 0" style="width:30em;"
							 	 v-html="titleFilter(item.model,9)">
							 	</view>
							 </view>
							</view>
							<view class="flex justify-between margin-top-xs" style="font-family: '黑体';color: #999;">
					 
								<view style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
									<text  class="text-content text-cut" style="padding-left: .18rem;width: 12em;">颜色：</text>
									<view class="text-content text-cut" v-if="item.color && item.color.length > 0" style="width:30em;"
									 v-html="titleFilter(item.color,9)">
									</view>
								</view>
							 <view style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
							 	<text  class="text-content text-cut" style="padding-left: .18rem;width: 7em;">类别：</text>
							 	<view class="text-content text-cut" v-if="item.categoryName && item.categoryName.length > 0" style="width:30em;"
							 	 v-html="titleFilter(item.categoryName,9)">
							 	</view>
							 </view>
							</view>
							<view class="flex justify-between margin-top-xs" style="font-family: '黑体';color: #999;">
			 
								<view style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
									<text  class="text-content text-cut" style="padding-left: .18rem;width: 12em;">单位：</text>
									<view class="text-content text-cut" v-if="item.unit && item.unit.length > 0" style="width:30em;"
									 v-html="titleFilter(item.unit,12)">
									</view>
									<view class="text-content text-cut" v-if="item.unitName && item.unitName.length > 0" style="width:30em;"
									 v-html="titleFilter(item.unitName,12)">
									</view>
									<view v-show="false" class="text-content text-cut" v-if="item.unitId  >= 0" style="width:30em;"
									 v-html="item.unitId">
									</view>
								</view>
							 <view style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
							 	<text  class="text-content text-cut" style="padding-left: .18rem;width: 9em;">多属性：</text>
							 	<view class="text-content text-cut" v-if=" item.sku && item.sku.length  >= 0" style="width:30em;"
							 	 v-html="titleFilter(item.sku,7)">
							 	</view>
							 </view>
							</view>
							<view class="flex justify-between margin-top-xs" style="font-family: '黑体';color: #999;">
		 
								<view style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
									<text  class="text-content text-cut" style="padding-left: .18rem;width: 15em;">库存：</text>
									<view class="text-content text-cut" v-if="item.stock >= 0" style="width:30em;"
									 v-html="item.stock">
									</view>
								</view>
							 <view style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
							 	<text  class="text-content text-cut" style="padding-left: .18rem;width: 12em;">扩展信息：</text>
							 	<view class="text-content text-cut" v-if="item.expand && item.expand.length  >= 0" style="width:30em;"
							 	 v-html="titleFilter(item.expand,7)">
							 	</view>
							 </view>
							</view>
							<view class="flex justify-between margin-top-xs" style="font-family: '黑体';color: #999;">
			 
								<view style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
									<text  class="text-content text-cut" style="padding-left: .18rem;width: 16em;">序列号：</text>

									<view class="text-content text-cut"  style="width:30em;">
									  <text v-if="item.enableSerialNumber == 0" style="color:green;">无</text>
									  <text v-if="item.enableSerialNumber == 1" style="color:orange;">有</text>
									</view>
								</view>
							 <view style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
							 	<text  class="text-content text-cut" style="padding-left: .18rem;width: 7em;">批号：</text>
							<!-- 	<view class="text-content text-cut" v-if="item.enableBatchNumber && item.enableBatchNumber.length > 0" style="width:30em;"
							 	 v-html="titleFilter(item.enableBatchNumber,9)">
							 	</view> -->
								<view class="text-content text-cut"  style="width:30em;">
								  <text v-if="item.enableBatchNumber == 0" style="color:green;">无</text>
								  <text v-if="item.enableBatchNumber == 1" style="color:orange;">有</text>
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

	</view>
</template>

<script>
	const enabled_dict = [{title:'禁用',value:0}, {title:'启用',value:1}];
	const  enableSerialNumber_dict = [{text:'有',value:'1'},{text:'无',value:'0'}];
	const enableBatchNumber_dict = [{text:'有',value:'1'},{text:'无',value:'0'}];
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import appSelect from '@/components/my-componets/appSelect.vue'
	import tkiTree from "@/components/tki-tree/tki-tree.vue"
	export default {
	    mixins: [MescrollMixin], // 使用mixin
		components:{
		    appSelect ,tkiTree,
		 },
		onLoad: function (option) {
			this.action = option.action
			this.myFormData = option.myFormData;
			this.goodsDetailList = option.goodsDetailList;
			this.loadCategoryIdTreeData();
			this.getDepotData()
		},
		data() {
			return {
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
				categoryName:"",
				categoryId:"",
				goodsInfo:"",
				color:"",
				weight:"",
				sku:"",
				stockName:'',
				stock:'',
				materialOther:'',
				unitName:'',
				enabled:"",
				enableSerialNumber:"",
				enableBatchNumber:"",
				remark:"",
				enableSerialNumber_dict,
				enableBatchNumber_dict,
				enabled_dict,
				depotList:[],
				depotId:'',
				myFormData:{},
				goodsDetailList:[],
					goodsDetailid:'',
					goodsDetailbarCode:'',
					goodsDetailname:'',
					goodsDetaildepotId:'',
					goodsDetailoperNumber:'',
					goodsDetailunitPrice:'',
					goodsDetailallPrice:'',
					goodsDetailtaxRate:'',
					goodsDetailtaxMoney:'',
					goodsDetailtaxLastMoney:'',
					goodsDetailremark:'',
					goodsDetailstockName:'',
					goodsDetailstock:'',
					goodsDetailmaterialOther:'',
					goodsDetailunitName:'',
					goodsDetailmodalName: '',
					goodsDetailstandard:'',
					goodsDetailcolor:'',
					goodsDetailsku:'',
				action:'',
					
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

			getDepotNameBydepotList(v){
				for(let depot of this.depotList){
				 if(depot.value == v){
					this.goodsDetailstockName = depot.text
					this.goodsDetaildepotId = depot.value
				 }
				 }
			},
			getDepotData(){
						let that = this
					 this.$http.get("/depot/findDepotByCurrentUser",{}).then(res=>{
						if(res && res.data.code === 200) {
							let v ;
						  for(let annItem of res.data.data){
							  let row = {};
							  row.text = annItem.depotName;
							  row.value = annItem.id+""
							 that.depotList.push(row)
							 if(annItem.isDefault){
							 					v = row.value
							 				}
							 }	
							 that.depotId = v
							 that.goodsDetaildepotId = v
						}
					  })
					},
			upCallback(page) {
				let params={page: 1, rows:10}
			if(this.categoryId){
				params.categoryId=this.categoryId
			}if(this.goodsInfo){
				params.q=this.goodsInfo
			}if(this.depotId){
				params.depotId=this.depotId
			}
			params.mpList = "制造商,自定义1,自定义2,自定义3";
				//联网加载数据
					this.$http.get("/material/findBySelect",{params:params}).then(res=>{
						//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
						this.announcement1 = res.data.rows
						this.mescroll.endSuccess(res.data.total);
						//console.log("url", res)
						//设置列表数据
						if(res.statusCode == '200'){
					   for(let annItem of res.data.rows){
									 this.msgList.push(annItem)							
							 }							 
												
						 }
						if(page.num == 1){
							this.msgList = []; //如果是第一页需手动制空列表
							this.msgList = this.msgList.concat(res.data.rows); //追加新数据
						}
						
					}).catch(()=>{
						//联网失败, 结束加载
						this.mescroll.endErr();
					})
			},
			changeInpFocus(e){
			},
			goodsSelectBack(){
				uni.navigateBack({
					delta: 1
				});
			},
		InputChange(v){
			const that= this;
				let target = v.target
				if(target.id == 'operNumber'){
					that.goodsDetailallPrice = that.goodsDetailunitPrice * target.value
					// that.goodsDetailtaxLastMoney = that.goodsDetailallPrice + that.goodsDetailtaxMoney
				}
				if(target.id == 'unitPrice'){
					that.goodsDetailallPrice = that.goodsDetailoperNumber * target.value
					// that.goodsDetailtaxLastMoney = that.goodsDetailallPrice + that.goodsDetailtaxMoney
				}if(target.id == 'allPrice'){
					that.goodsDetailunitPrice =  parseFloat(target.value/that.goodsDetailoperNumber).toFixed(2);
					// that.goodsDetailtaxLastMoney = that.goodsDetailallPrice + that.goodsDetailtaxMoney
				}
		},
		depotChange(v){
			this.getDepotNameBydepotList(v)
				let that = this
				 let params = {};
				 params.depotId = v
				 params.barCode = this.goodsDetailbarCode+''
				 this.$http.get("/depotItem/findStockByDepotAndBarCode",{params}).then(res=>{
					if(res && res.data.code === 200) {
					  that.goodsDetailstock = res.data.data.stock
					}
				  })
		},
		getMaterialByBarCode(item,depotId){
			let that = this
			this.getDepotNameBydepotList(depotId)
			let params={
				barCode: item.mBarCode,
			  depotId: depotId,
			  mpList:  "制造商,自定义1,自定义2,自定义3",  //扩展属性
			  prefixNo: 'LSCK',
			  }
			  this.$http.get("/material/getMaterialByBarCode",{params}).then(res=>{
			   if (res && res.data.code === 200) {
					let mList = res.data.data
					if(mList && mList.length>0) {
					  let mInfo = mList[0]
					  item.depotId = mInfo.depotId
					  item.name = mInfo.name
					  item.standard = mInfo.standard
					  item.model = mInfo.model
					  item.color = mInfo.color
					  item.materialOther = mInfo.materialOther
					  item.stock = mInfo.stock
					  item.sku = mInfo.sku
					  item.operNumber = 1
					  item.unitPrice = mInfo.billPrice
					  item.allPrice = mInfo.billPrice
					  item.taxRate = 0
					  item.taxMoney = 0
					  item.taxLastMoney = mInfo.billPrice
					  item.stockName = mInfo.stockName
					  item.unitName = mInfo.commodityUnit
					  }
					  that.goodsDetail = {}
					  that.goodsDetailid = item.id
					  that.goodsDetailbarCode = item.mBarCode
					  that.goodsDetailname = item.name
					  that.goodsDetailoperNumber='1'
					  that.goodsDetailunitPrice = item.unitPrice
					  that.goodsDetailallPrice =  item.allPrice
					  that.goodsDetailtaxRate = 0
					  that.goodsDetailtaxMoney=  0
					  that.goodsDetailtaxLastMoney=  item.taxLastMoney
					  
					  that.goodsDetailstockName = this.goodsDetailstockName == null ? '' :this.goodsDetailstockName
					  that.goodsDetailstock=item.stock
					  that.goodsDetailmaterialOther=item.materialOther == null ? '' :item.materialOther
					  that.goodsDetailunitName =  item.unitName == null ? '' :item.unitName
					  that.goodsDetailstandard= item.standard == null ? '' :item.standard
					  that.goodsDetailcolor = item.color == null ? '' :item.color
					  that.goodsDetailsku = item.sku == null ? '' :item.sku
					  that.goodsDetailmodalName = item.model== null ? '' : item.model
					  
				}
				})
		},
		goodsDetailSubmit(){
			this.$nextTick(() => {
			uni.navigateTo({ 
				url: '/pages/openorder/retailOut/retailOutModel?myFormData='+ encodeURIComponent(JSON.stringify(this.myFormData))+'&goodsDetailList='+ encodeURIComponent(JSON.stringify(this.goodsDetailList))
				+'&action='+this.action+'&selected=selected'
				+'&goodsDetail={"goodsDetailbarCode":"'+this.goodsDetailbarCode+
				'","goodsDetailname":"'+this.goodsDetailname+
				'","goodsDetailid":"'+this.goodsDetailid+
				'","goodsDetailoperNumber":"'+this.goodsDetailoperNumber+
				'","goodsDetailunitPrice":"'+this.goodsDetailunitPrice+
				'","goodsDetailallPrice":"'+this.goodsDetailallPrice+
				'","goodsDetailstockName":"'+this.goodsDetailstockName+
				'","goodsDetaildepotId":"'+this.goodsDetaildepotId+
				'","goodsDetailstock":"'+this.goodsDetailstock+
				'","goodsDetailmaterialOther":"'+this.goodsDetailmaterialOther+
				'","goodsDetailunitName":"'+this.goodsDetailunitName+
				'","goodsDetailstandard":"'+this.goodsDetailstandard+
				'","goodsDetailcolor":"'+this.goodsDetailcolor+
				'","goodsDetailmodalName":"'+this.goodsDetailmodalName+
				'","goodsDetailsku":"'+this.goodsDetailsku+
				'"}'
			});
			})

		},
			goGoodsDetail(item){
				this.$refs.popupStock.open();
				this.getMaterialByBarCode(item,this.depotId)
			},
			fabClick(){
				uni.navigateTo({ url: '/pages/material/goods/goodsModel'				});
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
			goodsDetailClose() {
				this.$refs.popupStock.close()
			},
			goodsSearch(){
				let that = this
			this.msgList = [];
			let params={page: 1, rows:10}
			if(this.categoryId){
				params.categoryId=this.categoryId
			}if(this.goodsInfo){
				params.q=this.goodsInfo
			}if(this.depotId){
				params.depotId=this.depotId
			}
			params.mpList = "制造商,自定义1,自定义2,自定义3";
			//联网加载数据
				this.$http.get("/material/findBySelect",{params:params}).then(res=>{
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					that.announcement1 = res.data.rows
					that.mescroll.endSuccess(res.data.total);
					//console.log("url", res)
					//设置列表数据
					  if(res.statusCode == '200'){
					   for(let annItem of res.data.rows){
								 that.msgList.push(annItem)							
						 }							 
											
					 }
					if(page.num == 1){
						that.msgList = []; //如果是第一页需手动制空列表
						that.msgList = that.msgList.concat(res.data.rows); //追加新数据
					}
					
				}).catch(()=>{
					//联网失败, 结束加载
					that.mescroll.endErr();
				})
			},
			reset(){
				this.zeroStock='0'
				this.stockName=''
				this.categoryId=''
				this.categoryName=''
				this.goodsInfo=''
				this.color=''
				this.weight=''
				this.sku=''
				this.enabled=''
				this.enableSerialNumber=''
				this.enableBatchNumber=''
				this.remark=''
				this.goodsSearch()
			},			
			showScan(){
				// 允许从相机和相册扫码
				let code ;
				let that = this;
				uni.scanCode({
					success: function (res) {
						that.goodsInfo = res.result
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
