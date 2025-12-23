<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true" backRouterName="advanceIn">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>

		<form>
			<view class="cu-form-group">
				<uni-icons  type="bars" style="color: blue;"  size="20"></uni-icons>
				<text class="title"  style="padding-right: 240px;font-size: 20px;;">基础信息</text>
			</view>
			<view class="cu-form-group">
				<text class="title"  >付款会员</text>
				<song-data-picker :localdata="retailList" placeholder="请选择会员" popup-title="请选择会员" :openSearch="true" v-model="myFormData.organId" :value="myFormData.organId"  @change="" ></song-data-picker>
				</view>
			<view class="cu-form-group">
				<text class="title"  >财务人员</text>
				<input  hidden="true"  placeholder="请输入名称" name="input" v-model="myFormData.id"></input>
			    <input  hidden="true" placeholder="请输入供应商" name="input" v-model="myFormData.status"></input>
				<app-select  v-model="myFormData.handsPersonId" :value="myFormData.handsPersonId" placeholder="选择财务人员" :dict="personList" space ></app-select>
			</view>
			<view class="cu-form-group">
				<text class="title">单据日期</text>
				<my-date   v-model="myFormData.billTime" placeholder="请选择单据日期" required fields="minute"></my-date>
			</view>
			<view class="cu-form-group">
				<text class="title"  >单据编号</text>
				<input style="text-align:right;" placeholder="请输入单据编号" name="input" v-model="myFormData.billNo"></input>
			</view>
			<view class="cu-form-group">
			<uni-icons  type="bars" style="color: blue;"  size="20"></uni-icons>
			 <text style="font-size: 20px;">账户信息</text>
				<view>
					<uni-icons  type="plus" style="color: blue;" @tap="goodsSelect" size="20"></uni-icons>
					<text  style="font-size: 20px;color: blue;" @tap="goodsSelect">选择账户</text>
				</view>
				<view>
				<uni-popup ref="popup" style="z-index: 20; margin: 0 auto;height: 800px;" type="right" >
					
					<view style="height: 800px; width: 100%;float: right;">
					<form>
						<view class="cu-form-group" style="padding-left: .8rem;display: flex;width: 100vw;margin-top: 60px;">
							<input hidden placeholder="index" name="input" v-model="myFormDataDetail.index"></input>
							<input hidden placeholder="id" name="input" v-model="myFormDataDetail.id"></input>
							<input hidden placeholder="accountName" name="input" v-model="myFormDataDetail.accountName"></input>
							<app-select  label="账户名称"  @change="accountChange" :required="true" v-model="myFormDataDetail.accountId" placeholder="请选择" :dict="accountList" space ></app-select>
						</view>
						 <view class="cu-form-group" style="padding-left: .8rem;display: flex;width: 100vw;">
							<text  class="text-content text-cut" style="padding-left: .90rem;width: 3em;">金额：</text>
							<input placeholder="请输入金额"  type="number"   name="input"   v-model="myFormDataDetail.eachAmount"></input>
						 </view>
						 <view class="cu-form-group" style="padding-left: .8rem;display: flex;width: 100vw;">
							<text  class="text-content text-cut" style="padding-left: .90rem;width: 3em;">备注：</text>
							<input placeholder="请输入备注" name="input" v-model="myFormDataDetail.remark"></input>
						 </view>
						<view class="cu-form-group" :isBack="true" backRouterName="index">
						  <button style="background-image: linear-gradient(45deg, #848a90, #848a90);" class="cu-btn bg-gradual-blue shadow-blur round" @tap="close">返回</button>
						  <button class="cu-btn bg-gradual-blue shadow-blur round" @tap="onDelDetail">删除</button>
						  <button class="cu-btn bg-gradual-blue shadow-blur round" @tap="onSubmitDetail">确定</button>
						</view>
						 
					</form>
				
					</view>
				</uni-popup>
				</view>
			</view>
			<view class="container">
					<!-- 数据列表 -->
					<view class="al-list cu-list">
						<view class="message_text bg-white cu-item flex justify-around align-center solid-bottom margin-bottom-sm margin-top-sm" style="width: 120vw;" v-for="(item,index) in goodsDetailList" :key="index" @tap="goGoodsDetail(item,index)" :class="modalName=='move-box-'+ index?'move-cur':''"
						   :data-target="'move-box-' + index">
							<view class="titlePad content" style="height: 2.5em;">
								<view class="flex justify-between margin-top-xs" style="font-family: '黑体';color: #999;">
									<view style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
										<text  class="text-content text-cut" style="padding-left: .12rem;width: 100%;">账户名称：{{item.accountName}}</text>
									</view>
								 <view style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
								 	<text  class="text-content text-cut" style="padding-left: .10rem;width: 100%;">金额：{{item.eachAmount}}</text>
								 </view>
								</view>
							</view>
						</view>
					</view>
			</view>
			<view class="cu-form-group">
				<uni-icons  type="bars" style="color: blue;"  size="20"></uni-icons>
				<text class="title" style="padding-right: 240px;font-size: 20px;;">结算信息</text>
			</view>
			<view class="cu-form-group"  >
				<view  style="display: flex;justify-content: space-between;width: 100vw;">
					<text  class="title">合计金额</text>
					<input disabled="true" placeholder="请输入合计金额" name="input" v-model="myFormData.totalPrice"></input>
				</view>
			</view>
			<view class="cu-form-group"  >
				<view  style="display: flex;justify-content: space-between;width: 100vw;">
					<text  class="title">收款金额</text>
					<input disabled="true" placeholder="请输入收款金额" name="input" v-model="myFormData.changeAmount"></input>
				</view>
			</view>
			<view class="cu-form-group">
				<uni-icons  type="bars" style="color: blue;"  size="20"></uni-icons>
				<text class="title"  style="padding-right: 240px;font-size: 20px;;">备注</text>
			</view>
			<view class="cu-form-group">
				<view class="title"  >备注</view>
				<input  placeholder="请输入备注" name="input" v-model="myFormData.remark"></input>
			</view>
			<view class="cu-form-group">
				<uni-icons  type="bars" style="color: blue;"  size="20"></uni-icons>
				<text class="title"  style="padding-right: 240px;font-size: 20px;;">附件信息</text>
			</view>
			<view class="cu-form-group">
			<text class="title"  style="padding-right: 0px;font-size: 16px;color: red;">提醒: 上传word等非图片文件请到电脑端操作</text>
			</view>
			<view class="cu-bar bg-white ">
				<view class="action">
					{{label}}
				</view>
				<view class="action">
					（图片最多4张，单张大小不超过1M）{{imgList.length}}/{{maxImg}}
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<maxImg">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>			
			<view :hidden = isShowButton class="cu-form-group" :isBack="true" backRouterName="index">
			  <button :hidden = isOpen v-if="btnEnableList.indexOf(1)>-1" class="float-button-del cu-btn bg-gradual-red shadow-blur " @tap="onDelBill">删除</button>
			  <button :hidden = isClose v-if="btnEnableList.indexOf(7)>-1" class="float-button-fsh cu-btn bg-gradual-orange shadow-blur " @tap="batchSetStatus(0)">反审核</button>
			  <button :hidden = isOpen v-if="btnEnableList.indexOf(2)>-1" class="float-button-sh cu-btn bg-gradual-orange shadow-blur " @tap="batchSetStatus(1)">审核</button>
			  <button :hidden = isOpen v-if="btnEnableList.indexOf(1)>-1" class="float-button-tj cu-btn bg-gradual-blue shadow-blur " @tap="onSubmit">提交</button>
			</view>
			<view :hidden = !isShowButton class="cu-form-group"   >
			  <button  class="float-button-left bg-blue lg1 " @tap="onSubmit">提交</button>
			  <button v-if="btnEnableList.indexOf(2)>-1" class="float-button-right bg-green lg1 " @tap="onSubmitAndCheck">提交并审核</button>
			</view>
		</form>
		
	</view>

</template> 

<script>
	const  enableSerialNumber_dict = [{text:'有',value:'1'},{text:'无',value:'0'}];
	const enableBatchNumber_dict = [{text:'有',value:'1'},{text:'无',value:'0'}];
	import appSelect from '@/components/my-componets/appSelect.vue'
	import tkiTree from "@/components/tki-tree/tki-tree.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
    import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import myDate from '@/components/my-componets/my-date.vue'
	import { getNowFormatYear,getNowFormatDateTime} from "@/common/util/util.js"
	import ListBtnEnable from "@/common/mixin/BtnEnable.js"
	import {ACCESS_TOKEN} from '@/common/util/constants.js'
		import songDataPicker from '@/components/song-data-picker/components/song-data-picker/song-data-picker.vue'
	export default {
		components:{
		    appSelect ,tkiTree,uniPopup,myDate,songDataPicker
		 },	    mixins: [MescrollMixin,ListBtnEnable], // 使用mixin
		 props: {
		 			 value: {type:String,default:''},
		 			 label:{type:String,default:'文件上传'},
		 	maxImg: {
		 		type: Number,
		 		default: 4
		 	},
		 },		 
		data() {
			return {
				title:'新增单据',
				isDel:true,
				isOpen: true,
				isClose:true,
				isShowButton:true,
				multiple: false,
				selectParent: false,
				flod: false,
				index: -1,
				switchC: false,
				imgList: [],
				goodsDetailList: [], //列表数据
				enableSerialNumber_dict,
				enableBatchNumber_dict,
				categoryId_type:[],
				unit_type:[],
				uploadUrl:"/sys/common/upload",
				depotList:[],
				myFormDataDetail:{
					index:'',
					id:'',
					eachAmount:0,
					accountId:'',
					accountName:'',
					remark:'',
					
				},
				organId:'',
				myFormData:{
					id:'',
					organId:'',
					billTime:getNowFormatDateTime(),
					billNo:'',
					payType:'现付',
					type:'收预付款',
					subType:'',
					status:'0',
					billStatus:'0',
					changeAmount:0,
					getAmount:0,
					backAmount:0,
					accountId:'',
					unit:'',
					color:'',
					weight:'',
					expiryNum:'',
					categoryId:'',
					categoryName:'',
					enableSerialNumber:'0',
					enableBatchNumber:'0',
					remark:'',
					totalPrice:'',
					defaultNumber:'',status:'',
				},
				accountList:[],
				prefixNo: 'SYF',
				retailList:[],
				organList:[],
				inOutItemInfoList:[],
				personList:[],
				payTypeList:[],
			    modalName: null,
				listTouchDirection: null,
				maxBarCodeInfo: '', //最大条码
				meDeleteIdList:[],//删除条码信息的id数组
				action:'',// add edit
				imgList: [],
				pathlist:[],
				imageNameList:''				
			};
		},
		 onLoad: function (option) {
			let selected = false;
			if(option.selected){
				selected = true
			}
			let action = 'add';
			if(option.action){
				action = option.action
				this.action = action
			}
			let retailOut ;
			 if(option && option.item){
			 	retailOut = JSON.parse(decodeURIComponent(option.item));
			if (retailOut.fileName != undefined && retailOut.fileName.split(',')!=''){
					retailOut.fileName.split(',').forEach(res=>{
						this.imgList.push(this.$config.apiUrl+"/systemConfig/static/"+res)
						this.pathlist.push(res);
					})
					this.imageNameList=retailOut.fileName
				}				
			}
			let oldMyFormData;
			if(option && option.myFormData ){
				oldMyFormData = JSON.parse(decodeURIComponent(option.myFormData));
				oldMyFormData = JSON.parse(decodeURIComponent(oldMyFormData));
				}
			 this.initInOutItem('out')
			if(action == 'add'){
				this.title = '新增单据'
			
			if(!selected){
				this.addInit(this.prefixNo)
			}
			if(option &&option.goodsDetail){
				let goodsDetail = JSON.parse(decodeURIComponent(option.goodsDetail));
				if(option &&option.goodsDetailList != 'undefined'){
					let oldgoodsDetailList = JSON.parse(decodeURIComponent(option.goodsDetailList));
					oldgoodsDetailList = JSON.parse(decodeURIComponent(oldgoodsDetailList));
					if(oldgoodsDetailList.length > 0){
						this.goodsDetailList = oldgoodsDetailList;
						let goodsIndex = 0;
						for(let goods of this.goodsDetailList){
							if(goods.goodsDetailid == goodsDetail.goodsDetailid){
								this.goodsDetailList.splice(goodsIndex,1 );
								break
							}
							goodsIndex ++
						  }
						
					}
					
				}
				this.myFormDataDetail.accountName = goodsDetail.accountName
				this.myFormDataDetail.accountId = goodsDetail.accountId
				this.myFormDataDetail.eachAmount = goodsDetail.eachAmount
				this.myFormDataDetail.remark = goodsDetail.remark 
				this.goodsDetailList.push(this.myFormDataDetail)
			}
				// this.initPayTypeList();
				if(oldMyFormData){
					this.myFormData.id = oldMyFormData.id
					this.myFormData.billNo = oldMyFormData.billNo
					this.myFormData.billTime = oldMyFormData.billTime
					this.myFormData.handsPersonId = oldMyFormData.handsPersonId
					this.myFormData.changeAmount = oldMyFormData.changeAmount
					this.myFormData.totalPrice = oldMyFormData.totalPrice
					this.myFormData.getAmount = oldMyFormData.getAmount
					this.myFormData.backAmount = oldMyFormData.backAmount
					this.myFormData.remark = oldMyFormData.remark
					if (this.myFormData.fileName != undefined && this.myFormData.fileName.split(',')!=''){
						this.myFormData.fileName.split(',').forEach(res=>{
							this.imgList.push(this.$config.apiUrl+"/systemConfig/static/"+res)
							this.pathlist.push(res);
						})
						this.imageNameList=this.myFormData.fileName
					}
					this.loadRetailListData(oldMyFormData,selected);
					}else{
						this.loadRetailListData();
				}
				// this.getDepotData();
				this.$nextTick(() => {
					this.jsje();
				})	
			}else if (action == 'edit'){
				this.title = '编辑单据'
				this.isShowButton = false
				if(this.myFormData.status == '1'){
					this.isOpen = true
					this.isClose = false
				}else{
					this.isOpen = false
					this.isClose = true					
				}
				if(option &&option.goodsDetail){
					let goodsDetail = JSON.parse(decodeURIComponent(option.goodsDetail));
					if(option &&option.goodsDetailList != 'undefined'){
						let oldgoodsDetailList = JSON.parse(decodeURIComponent(option.goodsDetailList));
						oldgoodsDetailList = JSON.parse(decodeURIComponent(oldgoodsDetailList));
						if(oldgoodsDetailList.length > 0){
							this.goodsDetailList = oldgoodsDetailList;
							let goodsIndex = 0;
							for(let goods of this.goodsDetailList){
								if(goods.goodsDetailid == goodsDetail.goodsDetailid){
									this.goodsDetailList.splice(goodsIndex,1 );
									break
								}
								goodsIndex ++
							  }
							
						}
						
					}
					
				this.myFormDataDetail.accountName = goodsDetail.accountName
				this.myFormDataDetail.accountId = goodsDetail.accountId
				this.myFormDataDetail.eachAmount = goodsDetail.eachAmount
				this.myFormDataDetail.remark = goodsDetail.remark 
					
					this.goodsDetailList.push(this.myFormDataDetail)
				}
				// this.initPayTypeList();
				// this.getDepotData();
				if(!selected){
					this.loadRetailListData(retailOut,selected);
					// this.initAccount(retailOut.accountId);	
					
					
				}else{
					if(oldMyFormData){
						this.myFormData.id = oldMyFormData.id
						this.myFormData.status = oldMyFormData.status
						this.myFormData.number = oldMyFormData.number
						this.myFormData.billTime = oldMyFormData.billTime
						this.myFormData.handsPersonId = oldMyFormData.handsPersonId
						this.myFormData.changeAmount = oldMyFormData.changeAmount
						this.myFormData.totalPrice = oldMyFormData.totalPrice
						this.myFormData.getAmount = oldMyFormData.getAmount
						this.myFormData.backAmount = oldMyFormData.backAmount
						this.myFormData.remark = oldMyFormData.remark
						if (this.myFormData.fileName != undefined && this.myFormData.fileName.split(',')!=''){
							this.myFormData.fileName.split(',').forEach(res=>{
								this.imgList.push(this.$config.apiUrl+"/systemConfig/static/"+res)
								this.pathlist.push(res);
							})
							this.imageNameList=this.myFormData.fileName
						}
						   this.loadRetailListData(oldMyFormData,selected);
						}else{
							this.loadRetailListData();
					}
					
				this.$nextTick(() => {
					this.jsje();
				})		 
				}

			}
			
		},
		methods: {
			accountChange(v){
				let accountName ;
				 for(let account of this.accountList){
						if(account.value == v){
							accountName = account.text
						}
					 }
				this.myFormDataDetail.accountName = accountName
			},
			initInOutItem(type,v){
			let that = this
			let params = {type:type};
			 this.$http.get("/inOutItem/findBySelect",{params}).then(res=>{
				if(res && res.statusCode === 200) {
				  for(let annItem of res.data){
					  let row = {};
					  row.text = annItem.name;
					  row.value = annItem.id+""
					 that.inOutItemInfoList.push(row)
					 }
					if(v){
						that.myFormDataDetail.inOutItemId = v
					}
				}
			  })	
			},
			jsje(){
				let changeAmount = 0;
				let getAmount = 0;
				let backAmount=0;
				if(this.goodsDetailList != null && this.goodsDetailList.length > 0){
					for(let goodsDetail of this.goodsDetailList){
						changeAmount = changeAmount + parseFloat(goodsDetail.eachAmount)
					 }
				}
				this.myFormData.changeAmount = changeAmount;
				this.myFormData.totalPrice = changeAmount;
				
			},
			getDepotData(v){
			let that = this
			 this.$http.get("/depot/findDepotByCurrentUser",{}).then(res=>{
				if(res && res.data.code === 200) {
				  for(let annItem of res.data.data){
					  let row = {};
					  row.text = annItem.depotName;
					  row.value = annItem.id+""
					 that.depotList.push(row)
					 }
					if(v){
						that.myFormDataDetail.depotId = v
					}
				}
			  })
					},
			goodsSelect(){
				this.myFormDataDetail=[]
				this.$refs.popup.open()
			},
		//加载收款类型
		  initPayTypeList() {
			this.payTypeList =  [{text:'现付',value:'现付'}];
		  },
		initAccount( retailOut,selected){
			let that = this
			this.myFormData.accountId="";
		 this.$http.get("/account/getAccount",{}).then(res=>{
			if(res && res.data.code === 200) {
				let v ;
			  for(let annItem of res.data.data.accountList){
				  let row = {};
				  row.text = annItem.name;
				  row.value = annItem.id+""
				 that.accountList.push(row)
				// if(annItem.isDefault){
				// 	v = row.value
				// }
			  }	
			  if(retailOut){
				  let acId = String(retailOut.accountId)
				  v = acId
				   that.myFormData.accountId = String(v)
			  }
			  if(retailOut && !selected){
				  this.goodsInit(retailOut);
				  retailOut.billTime = retailOut.billTimeStr
				  retailOut.organId = retailOut.organId+""
					this.myFormData = retailOut
			  }
			  }
		  })
		},
			addInit(amountNum) {
				if(!this.myFormData.billNo){
					this.$http.get("/sequence/buildNumber",{}).then(res=>{
					if (res && res.data.code === 200) {
					  this.myFormData.billNo = amountNum + res.data.data.defaultNumber 
					}
					})
				}
			  this.$nextTick(() => {
				this.myFormData.discount=0;
				this.myFormData.discountMoney=0;
				this.myFormData.discountLastMoney=0;
				this.myFormData.otherMoney=0;
				this.myFormData.changeAmount=0;
				this.myFormData.totalPrice=0;
				this.myFormData.debt=0;
				this.myFormData.getAmount=0;
				this.myFormData.backAmount=0;
				
			  })
			
			},
			//财务人员
			initPerson(oldMyFormData,selected){
			  let that = this;
			  this.personList = []
			  let params = {type:'财务员'};
			  that.$http.get("/person/getPersonByType",{params}).then(res=>{
				 if(res.data.code+"" == "200"){
				  for(let annItem of res.data.data.personList){
					  let row = {};
					  row.text = annItem.name;
					  row.value = annItem.id+""
					 that.personList.push(row)							
				  }
				  if( oldMyFormData){
					 that.myFormData.handsPersonId = oldMyFormData.handsPersonId+""
				  }
				  if( oldMyFormData){
					 that.initAccount(oldMyFormData,selected);
				  }else{
				   that.initAccount();
				  }
				 } 
				}).catch(()=>{
								//加载失败, 结束
			  })
			},
	 
			loadRetailListData(oldMyFormData,selected){
				  let that = this;
		
					if(this.retailList.length == 0){
					  let params = {};
					  that.$http.post("/supplier/findBySelect_retail",{params}).then(res=>{
					 if(res.statusCode == '200'){
					  for(let annItem of res.data){
						  let row = {};
						  row.text = annItem.supplier;
						  row.value = annItem.id+""
						 that.retailList.push(row)							
					  }	
					  if( oldMyFormData){
						 that.myFormData.organId = oldMyFormData.organId+""
					  }
					  if( oldMyFormData){
						 that.initPerson(oldMyFormData,selected);
					  }else{
					     that.initPerson();
					  }
					  
					 } 
					})
				  }

			  
			
			},
			goodsInit(retailOut){
				this.myFormData = {}
				this.goodsDetailList = []
				this.isDel = false
				this.isShowButton = false
				if(retailOut.status == '1'){
					this.isOpen = false
					this.isClose = true
					this.isOpen = true
					this.isClose = false
				}else{
					this.isOpen = false
					this.isClose = true					
				}
				let that = this;
				if(retailOut != ''){
					if(retailOut.id){
						this.myFormData = {}
						this.goodsDetailList =[]
						let mpList =  uni.getStorageSync("materialPropertyList");  //扩展属性
						let params = { headerId: retailOut.id,mpList:mpList }
						this.$http.get("/accountItem/getDetailList",{params:params}).then(res=>{
							if(res && res.data.code===200) {
								that.goodsDetailList = res.data.data.rows || []
								}
						})
					} 
				} 
			},
			onSubmitAndCheck(){
				this.onSubmit(1);
			},			
			onSubmit(v) {
				let that = this;
			  let myForm = this.myFormData
			  console.log("myForm",myForm)
			  if(!myForm.organId || myForm.organId.length==0){
				this.$tip.alert('请选择付款会员');
				return false
			  }
			  if(!myForm.billTime || myForm.billTime.length==0){
				this.$tip.alert('请输入单据日期');
				return false
			  }
			  if(!myForm.billNo || myForm.billNo.length==0){
				this.$tip.alert('请输入单据编号');
				return false
			  }
			  if(!myForm.handsPersonId || myForm.handsPersonId.length==0){
				this.$tip.alert('请选择财务人员');
				return false
			  }
			  
			  if(!this.goodsDetailList || this.goodsDetailList.length==0){
				this.$tip.alert('请选择单据明细信息');
				return false
			  }
			if(v == '1'){
				this.myFormData.status = '1'
			}
				this.myFormData.totalPrice = this.myFormData.changeAmount
				this.myFormData.defaultNumber = this.myFormData.billNo
				this.myFormData.fileName = this.imageNameList;
				this.myFormData.meDeleteIdList = this.meDeleteIdList;
				this.myFormData.source = "1";
				console.log('myform',this.myFormData)
				let params = {};
				params.info =  JSON.stringify(this.myFormData);
				params.rows = JSON.stringify(this.goodsDetailList);
				this.$tip.loading();
				let url = '/accountHead/addAccountHeadAndDetail' 
				  if (this.action == 'edit') {
					url = '/accountHead/updateAccountHeadAndDetail'
					this.$http.put(url,params).then(res=>{
						console.log(res)
						this.$tip.loaded();
						if(res.data.code === 200){
							this.$tip.toast('提交成功')
							this.$navigateTo('/page_openorder/advanceIn/advanceIn');
						}else{
							this.$tip.error(res.data.data.message)
						}
					}).catch(()=>{
						this.$tip.loaded();
						this.$tip.error('提交失败')
					});
				  }	else{
					  this.$http.post(url,params).then(res=>{
						console.log(res)
						this.$tip.loaded();
						if(res.data.code === 200){
							this.$tip.toast('提交成功')
							this.$navigateTo('/page_openorder/advanceIn/advanceIn');
						}else{
							this.$tip.error(res.data.data.message)
							this.myFormData.status = '0'
						}
					  }).catch(()=>{
						this.$tip.loaded();
						this.$tip.error('提交失败')
					  });
				  }					

						 
			},
		  parseParam(param) {
			return param ? param: ""
		  },			
			 
			SwitchC(e) {
				this.switchC = e.detail.value
			},
			close() {
				this.$refs.popup.close()
			},
			onSubmitDetail(){
				if(!this.myFormDataDetail.accountId || this.myFormDataDetail.accountId.length==0){
					this.$tip.alert('请选择账户名称');
					return false
				}
				if(!this.myFormDataDetail.eachAmount || this.myFormDataDetail.eachAmount.length==0){
					this.$tip.alert('请输入金额');
					return false
				}
				let index = this.myFormDataDetail.index
				if(this.myFormDataDetail.id == undefined){
					this.createCode()
					this.myFormDataDetail.id = parseInt(new Date().getTime()) +''+ this.code ;
				}
				if(index == undefined){
					let formDetail =  {...this.myFormDataDetail};
					this.goodsDetailList.push(formDetail)
					
				}else{
					this.goodsDetailList[index] = this.myFormDataDetail
				}
				this.$refs.popup.close()
				this.jsje();
			},
			 createCode() {
			      var code = '';
			      //设置长度，这里看需求，我这里设置了4
			      var codeLength = 7;
			
			      //设置随机字符
			      var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
			
			      //循环codeLength 我设置的4就是循环4次
			      for (var i = 0; i < codeLength; i++) {
			          //设置随机数范围,这设置为0 ~ 36
			          var index = Math.floor(Math.random() * 9);
			
			          //字符串拼接 将每次随机的字符 进行拼接
			          code += random[index];
			      }
			
			      //将拼接好的字符串赋值给展示的code
			      this.code = code;
			  }, 
			goGoodsDetail(item,index){
				if(this.myFormData.status != '1'){
				this.myFormDataDetail = [];
				this.myFormDataDetail = item
				this.myFormDataDetail.index = index
				this.$refs.popup.open()
				}
				
			},
			onDelDetail(){
				let index = this.myFormDataDetail.index
				if(null != index){
					this.meDeleteIdList.push(this.myFormDataDetail.id)
					this.goodsDetailList.splice(index, 1);
					this.$refs.popup.close()
					this.$nextTick(() => {
						this.jsje();
					})
				}
			},
			batchSetStatus(v){
				let id = this.myFormData.id
				if(null != id){
					let that = this
					this.$http.post("/accountHead/batchSetStatus",{status: v, ids: id+','}).then(res=>{
						that.$tip.loaded();
						if(res.data.code === 200){
							that.$tip.toast('变更成功')
							that.$navigateTo('/page_openorder/advanceIn/advanceIn');
						}
					}).catch(()=>{
						that.$tip.loaded();
						that.$tip.error('变更失败')
					});
				}
			},
			onDelBill(){
				let id = this.myFormData.id
				if(null != id){
					let that = this
					uni.showModal({
						title: '删除单据',
						content: '是否删除该单据数据？',
						success: (res)=> {
							if (res.confirm) {
								this.$http.delete("/accountHead/delete?id="+id).then(res => {
									that.$tip.loaded();
									if(res.data.code === 200){
										that.$tip.toast('删除成功')
										that.$navigateTo('/page_openorder/advanceIn/advanceIn');
									}
									}).catch(()=>{
						that.$tip.loaded();
						that.$tip.error('删除失败')
					}); 
							}  
						}
					});

					}
			},
			 ChooseImage() {
			 	let flag = 0;
			 	uni.chooseImage({
			 		count: this.maxImg, //默认9
			 		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			 		sourceType: ['album','camera'], //从相册选择
			 					extension:['.pdf','.doc','.xlsx','.docx','.xls','.png', '.jpg', '.jpeg'],
			 		success: (res) => {
			 			res.tempFilePaths.forEach(item =>{
			 				uni.uploadFile({
			 					url: this.$config.apiUrl+"/systemConfig/upload",
			 					filePath: item,
			 					name: 'file',
			 					header: {
			 							'X-Access-Token': uni.getStorageSync(ACCESS_TOKEN)
			 						},
			 					formData: {
			 						'biz': 'financial' 
			 					},
			 					biz: 'financial',
			 					success: (uploadFileRes) => {
			 						let path = JSON.parse(uploadFileRes.data).data
			 						this.pathlist.push(path);
			 						this.imageNameList = this.pathlist.join(',')
			 						this.myFormData.fileName = this.imageNameList
			 						flag ++
			 						if(flag == res.tempFilePaths.length){
			 							if (this.imgList.length != 0) {
			 								this.imgList = this.imgList.concat(res.tempFilePaths)
			 							} else {
			 								this.imgList = res.tempFilePaths
			 							}
			 						}
			 					}
			 				})
			 			})
			 		}
			 	});
			 },
			   ViewImage(e) {
			   				   // 图片格式
			   				   	let isImgType = ['png', 'jpg', 'jpeg']
			   					let fileType = this.getfileName(e.currentTarget.dataset.url)
			   				   if (isImgType.includes(fileType)) {
			   						// 图片预览
			   						uni.previewImage({
			   							//说明
			   							current: e.currentTarget.dataset.url,
			   							//预览的图片集   可以是多张图片需要Array类型
			   							urls: this.imgList,
			   						})
			   						
			   					} else {
			   				   //文件保存到本地
			   						 const downloadTask = uni.downloadFile({
			   								url: e.currentTarget.dataset.url, //仅为示例，并非真实的资源
			   									success: (res) => {
			   										if (res.statusCode === 200) {
			   											console.log('下载成功');
			   										}
			   										this.dd = res.tempFilePath;
			   										console.log(this.dd);
			   										setTimeout(() => {
			   											//打开文档查看
			   											uni.openDocument({
			   												filePath: res.tempFilePath,
			   												success: function(res) {
			   													// console.log('打开文档成功');
			   												}
			   											});
			   										}, 3000)
			   										}
			   							});
			   					
			   							downloadTask.onProgressUpdate((res) => {
			   								console.log('下载进度' + res.progress);
			   								console.log('已经下载的数据长度' + res.totalBytesWritten);
			   								console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
			   							});
			   					}
			   				 
			   			 
			   },
			   getfileName(filename) {
			   					// 转换为小写方便处理 拿到.的下标
			   					const pos = filename.toLowerCase().lastIndexOf('.')
			   					let suffix = ''
			   					// 判断是否是文件或图片
			   					if (pos !== -1) {
			   						// 拿到截取.的下标后面所有字符(这样就拿到了文件类型)
			   						suffix = filename.substring(pos+1)
			   					}
			   					return suffix
			   				}, 
			   DelImg(e) {
			   	uni.showModal({
			   		title: '提示',
			   		content: '确认要删除吗',
			   		cancelText: '取消',
			   		confirmText: '确认',
			   		success: res => {
			   			if (res.confirm) {
			   				this.pathlist.splice(e.currentTarget.dataset.index,1)
			   				this.imgList.splice(e.currentTarget.dataset.index, 1)
			   				this.imageNameList = this.pathlist.join(',')
			   			}
			   		}
			   	})
			   },			
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.switch-unit::after {
		content: "\e645";
	}
	
	.switch-unit::before {
		content: "\e646";
	}
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
	.float-button-right {
	  position: fixed;
	  right: 15px;
	  bottom: 20px;
	  width: 190px;
	  height: 46px;
	  border-radius: 10%;
	  background: #007aff;
	  text-align: center;
	  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.4);
	  z-index: 10;
	}
	.float-button-left {
	  position: fixed;
	  left: 15px;
	  bottom: 20px;
	  width: 150px;
	  height: 46px;
	  border-radius: 10%;
	  background: #F37B1D;
	  text-align: center;
	  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.4);
	  z-index: 10;
	}
	.float-button-del {
	  position: fixed;
	  left: 15px;
	  bottom: 20px;
	  width: 80px;
	  height: 46px;
	  border-radius: 10%;
	  background: #55aaff;
	  text-align: center;
	  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.4);
	  z-index: 10;
	}
	.float-button-fsh {
	  position: fixed;
	  left: 15px;
	  bottom: 20px;
	  width: 160px;
	  height: 46px;
	  border-radius: 10%;
	  background: #F37B1D;
	  text-align: center;
	  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.4);
	  z-index: 10;
	}
	.float-button-sh {
	  position: fixed;
	  left: 195px;
	  bottom: 20px;
	  width: 80px;
	  height: 46px;
	  border-radius: 10%;
	  background: #F37B1D;
	  text-align: center;
	  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.4);
	  z-index: 10;
	}
	.float-button-tj {
	  position: fixed;
	  left: 105px;
	  bottom: 20px;
	  width: 80px;
	  height: 46px;
	  border-radius: 10%;
	  background: green;
	  text-align: center;
	  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.4);
	  z-index: 10;
	}
	.float-button-dy {
	  position: fixed;
	  right: 10px;
	  bottom: 20px;
	  width: 80px;
	  height: 46px;
	  border-radius: 10%;
	  background: #007aff;
	  text-align: center;
	  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.4);
	  z-index: 10;
	}	
</style>
