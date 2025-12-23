<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true" backRouterName="retailOut">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<form>
			<view class="cu-form-group">
				<view class="title">会员卡号</view>
				<input placeholder="卡号" name="input" v-model="myFormData.id"></input>
				<input hidden="true" placeholder="请输入卡号" name="input" v-model="myFormData.status"></input>
				<view>
					<app-select v-model="myFormData.organId" :value="myFormData.organId" placeholder="选择会员卡号"
						:dict="retailList" space></app-select>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">单据日期</view>
				<my-date v-model="myFormData.operTime" placeholder="请选择单据日期" required fields="minute"></my-date>
			</view>
			<view class="cu-form-group">
				<view class="title">单据编号</view>
				<input placeholder="请输入单据编号" name="input" v-model="myFormData.number"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">收款类型</view>
				<view>
					<app-select v-model="myFormData.payType" placeholder="请选择收款类型" :dict="payTypeList"
						space></app-select>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">单据明细信息</view>
				<uni-popup ref="popup" style="z-index: 20; margin: 0 auto;height: 800px;" type="right">

					<view style="height: 800px; width: 100%;float: right;">
						<form>
							<view class="cu-form-group"
								style="padding-left: .8rem;display: flex;width: 95vw;margin-top: 60px;">
								<text class="text-content text-cut" style="padding-left: .90rem;width: 5em;">条码：</text>
								<input hidden placeholder="index" name="input" v-model="myFormDataDetail.index"></input>
								<input hidden placeholder="id" name="input" v-model="myFormDataDetail.id"></input>
								<view class="text-content text-cut"
									v-if="myFormDataDetail.barCode && myFormDataDetail.barCode.length > 0"
									style="width:30em;" v-html="titleFilter(myFormDataDetail.barCode,14)">
								</view>
							</view>
							<view class="cu-form-group" style="padding-left: .8rem;display: flex;width: 95vw;">
								<view
									style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
									<text class="text-content text-cut"
										style="padding-left: .12rem;width: 10em;">名称：</text>
									<view class="text-content text-cut"
										v-if="myFormDataDetail.name && myFormDataDetail.name.length > 0"
										style="width:30em;" v-html="titleFilter(myFormDataDetail.name,14)">
									</view>
								</view>
								<view
									style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
									<text class="text-content text-cut"
										style="padding-left: .10rem;width: 6em;">规格：</text>
									<view class="text-content text-cut"
										v-if="myFormDataDetail.standard && myFormDataDetail.standard.length > 0"
										style="width:30em;" v-html="titleFilter(myFormDataDetail.standard,9)">
									</view>
								</view>
							</view>
							<view class="cu-form-group" style="padding-left: .8rem;display: flex;width: 95vw;">
								<view
									style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
									<text class="text-content text-cut"
										style="padding-left: .12rem;width: 10em;">型号：</text>
									<view class="text-content text-cut"
										v-if="myFormDataDetail.model && myFormDataDetail.model.length > 0"
										style="width:30em;" v-html="titleFilter(myFormDataDetail.model,14)">
									</view>
								</view>
								<view
									style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
									<text class="text-content text-cut"
										style="padding-left: .10rem;width: 6em;">颜色：</text>
									<view class="text-content text-cut"
										v-if="myFormDataDetail.color && myFormDataDetail.color.length > 0"
										style="width:30em;" v-html="titleFilter(myFormDataDetail.color,9)">
									</view>
								</view>
							</view>
							<view class="cu-form-group" style="padding-left: .8rem;display: flex;width: 95vw;">
								<view
									style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
									<text class="text-content text-cut"
										style="padding-left: .12rem;width: 10em;">扩展：</text>
									<view class="text-content text-cut"
										v-if="myFormDataDetail.materialOther && myFormDataDetail.materialOther.length > 0"
										style="width:30em;" v-html="titleFilter(myFormDataDetail.materialOther,14)">
									</view>
								</view>
								<view
									style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
									<text class="text-content text-cut"
										style="padding-left: .10rem;width: 6em;">库存：</text>
									<view class="text-content text-cut" v-if="myFormDataDetail.stock >= 0"
										style="width:30em;" v-html="myFormDataDetail.stock">
									</view>
								</view>
							</view>

							<view class="cu-form-group" style="padding-left: .8rem;display: flex;width: 95vw;">
								<view
									style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
									<text class="text-content text-cut"
										style="padding-left: .12rem;width: 10em;">单位：</text>
									<view class="text-content text-cut"
										v-if="myFormDataDetail.unit && myFormDataDetail.unit.length > 0"
										style="width:30em;" v-html="titleFilter(myFormDataDetail.unit,14)">
									</view>
								</view>
								<view
									style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
									<text class="text-content text-cut"
										style="padding-left: .10rem;width: 6em;">多属性：</text>
									<view class="text-content text-cut"
										v-if="myFormDataDetail.sku && myFormDataDetail.sku.length > 0"
										style="width:30em;" v-html="titleFilter(myFormDataDetail.sku,9)">
									</view>
								</view>
							</view>
							<view class="cu-form-group" style="padding-left: .8rem;display: flex;width: 95vw;">
								<app-select label="仓库:" @change="changeDepotStock" v-model="myFormDataDetail.depotId"
									placeholder="请选择" :dict="depotList" space></app-select>
							</view>
							<view class="cu-form-group" style="padding-left: .8rem;display: flex;width: 95vw;">
								<text class="text-content text-cut" style="padding-left: .90rem;width: 3em;">数量：</text>
								<input placeholder="请输入数量" id="operNumber" name="input" @input="InputChange"
									v-model="myFormDataDetail.operNumber"></input>
							</view>
							<view class="cu-form-group" style="padding-left: .8rem;display: flex;width: 95vw;">
								<text class="text-content text-cut" style="padding-left: .90rem;width: 3em;">单价：</text>
								<input placeholder="请输入单价" id="unitPrice" name="input" @input="InputChange"
									v-model="myFormDataDetail.unitPrice"></input>
							</view>
							<view class="cu-form-group" style="padding-left: .8rem;display: flex;width: 95vw;">
								<text class="text-content text-cut" style="padding-left: .90rem;width: 3em;">金额：</text>
								<input placeholder="请输入金额" id="allPrice" name="input" @input="InputChange"
									v-model="myFormDataDetail.allPrice"></input>
							</view>
							<view class="cu-form-group" style="padding-left: .8rem;display: flex;width: 95vw;">
								<text class="text-content text-cut" style="padding-left: .90rem;width: 3em;">备注：</text>
								<input placeholder="请输入备注" name="input" v-model="myFormDataDetail.remark"></input>
							</view>
							<view class="cu-form-group" :isBack="true" backRouterName="index">
								<button style="background-image: linear-gradient(45deg, #848a90, #848a90);"
									class="cu-btn bg-gradual-blue shadow-blur round" @tap="close">返回</button>
								<button class="cu-btn bg-gradual-blue shadow-blur round" @tap="onDelDetail">删除</button>
								<button class="cu-btn bg-gradual-blue shadow-blur round"
									@tap="onSubmitDetail">确定</button>
							</view>

						</form>

					</view>
				</uni-popup>
				<uni-icons type="plus-filled" @tap="goodsSelect" size="30"></uni-icons>
			</view>
			<view class="container">
				<!-- 数据列表 -->
				<view class="al-list cu-list">
					<view
						class="message_text bg-white cu-item flex justify-around align-center solid-bottom margin-bottom-sm margin-top-sm"
						style="width: 120vw;" v-for="(item,index) in goodsDetailList" :key="index"
						@tap="goGoodsDetail(item,index)" :class="modalName=='move-box-'+ index?'move-cur':''"
						:data-target="'move-box-' + index">
						<view class="titlePad content" style="height: 12em;">
							<view class="flex justify-between margin-top-xs" style="font-family: '黑体';color: #999;">
								<view
									style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
									<text class="text-content text-cut"
										style="padding-left: .12rem;width: 10em;">仓库：</text>
									<view class="text-content text-cut"
										v-if="item.depotName && item.depotName.length > 0" style="width:30em;"
										v-html="titleFilter(item.depotName,14)">
									</view>
								</view>
								<view
									style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
									<text class="text-content text-cut"
										style="padding-left: .10rem;width: 6em;">条码：</text>
									<view class="text-content text-cut" v-if="item.barCode && item.barCode.length > 0"
										style="width:30em;" v-html="titleFilter(item.barCode,14)">
									</view>
								</view>
							</view>
							<view class="flex justify-between margin-top-xs" style="font-family: '黑体';color: #999;">
								<view
									style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
									<text class="text-content text-cut"
										style="padding-left: .12rem;width: 10em;">名称：</text>
									<view class="text-content text-cut" v-if="item.name && item.name.length > 0"
										style="width:30em;" v-html="titleFilter(item.name,14)">
									</view>
								</view>
								<view
									style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
									<text class="text-content text-cut"
										style="padding-left: .10rem;width: 6em;">规格：</text>
									<view class="text-content text-cut" v-if="item.standard && item.standard.length > 0"
										style="width:30em;" v-html="titleFilter(item.standard,9)">
									</view>
								</view>
							</view>
							<view class="flex justify-between margin-top-xs" style="font-family: '黑体';color: #999;">
								<view
									style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
									<text class="text-content text-cut"
										style="padding-left: .12rem;width: 10em;">型号：</text>
									<view class="text-content text-cut" v-if="item.model && item.model.length > 0"
										style="width:30em;" v-html="titleFilter(item.model,14)">
									</view>
								</view>
								<view
									style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
									<text class="text-content text-cut"
										style="padding-left: .10rem;width: 6em;">颜色：</text>
									<view class="text-content text-cut" v-if="item.color && item.color.length > 0"
										style="width:30em;" v-html="titleFilter(item.color,9)">
									</view>
								</view>
							</view>
							<view class="flex justify-between margin-top-xs" style="font-family: '黑体';color: #999;">
								<view
									style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
									<text class="text-content text-cut"
										style="padding-left: .12rem;width: 10em;">扩展：</text>
									<view class="text-content text-cut"
										v-if="item.materialOther && item.materialOther.length > 0" style="width:30em;"
										v-html="titleFilter(item.materialOther,14)">
									</view>
								</view>
								<view
									style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
									<text class="text-content text-cut"
										style="padding-left: .10rem;width: 6em;">库存：</text>
									<view class="text-content text-cut" v-if="item.stock >= 0" style="width:30em;"
										v-html="item.stock">
									</view>
								</view>
							</view>

							<view class="flex justify-between margin-top-xs" style="font-family: '黑体';color: #999;">
								<view
									style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
									<text class="text-content text-cut"
										style="padding-left: .12rem;width: 10em;">单位：</text>
									<view class="text-content text-cut" v-if="item.unit && item.unit.length > 0"
										style="width:30em;" v-html="titleFilter(item.unit,14)">
									</view>
								</view>
								<view
									style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
									<text class="text-content text-cut"
										style="padding-left: .10rem;width: 6em;">数量：</text>
									<view class="text-content text-cut" v-if="item.operNumber >= 0" style="width:30em;"
										v-html="item.operNumber">
									</view>

								</view>
							</view>
							<view class="flex justify-between margin-top-xs" style="font-family: '黑体';color: #999;">
								<view
									style="padding-left: .8rem;display: flex;justify-content: space-between;width: 50vw;">
									<text class="text-content text-cut"
										style="padding-left: .12rem;width: 10em;">单价：</text>
									<view class="text-content text-cut" v-if="item.unitPrice  >= 0" style="width:30em;"
										v-html="item.unitPrice">
									</view>
								</view>
								<view
									style="padding-left: .1rem;display: flex;justify-content: space-between;width: 70vw;">
									<text class="text-content text-cut"
										style="padding-left: .10rem;width: 6em;">金额：</text>
									<view class="text-content text-cut" v-if="item.allPrice>= 0" style="width:30em;"
										v-html="item.allPrice">
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view style="display: flex;justify-content: space-between;width: 50vw;">
					<text class="title">单据金额</text>
					<input disabled="true" placeholder="请输入单据金额" name="input" v-model="myFormData.changeAmount"></input>
				</view>
				<view style="display: flex;justify-content: space-between;width: 50vw;">
					<text class="title">收款金额</text>
					<input placeholder="请输入收款金额" name="input" @input="getAmountChange"
						v-model="myFormData.getAmount"></input>
				</view>
			</view>
			<view class="cu-form-group">
				<view style="display: flex;justify-content: space-between;width: 50vw;">
					<text class="title">找零</text>
					<input disabled="true" placeholder="请输入找零" name="input" v-model="myFormData.backAmount"></input>
				</view>
				<view style="display: flex;justify-content: space-between;width: 60vw;">
					<!-- <text class="title">收款账户：</text> -->
					<app-select label="收款账户" :required="true" v-model="myFormData.accountId" placeholder="请选择"
						:dict="accountList" space></app-select>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">备注</view>
				<input placeholder="请输入备注" name="input" v-model="myFormData.remark"></input>
			</view>
			<view :hidden=isShowButton class="cu-form-group" :isBack="true" backRouterName="index">
				<button :hidden=isOpen v-if="btnEnableList.indexOf(1)>-1" class="cu-btn bg-gradual-red shadow-blur "
					@tap="onDelBill">删除</button>
				<button :hidden=isClose v-if="btnEnableList.indexOf(7)>-1" class="cu-btn bg-gradual-orange shadow-blur "
					@tap="batchSetStatus(0)">反审核</button>
				<button :hidden=isOpen v-if="btnEnableList.indexOf(2)>-1" class="cu-btn bg-gradual-orange shadow-blur "
					@tap="batchSetStatus(1)">审核</button>
				<button :hidden=isOpen v-if="btnEnableList.indexOf(1)>-1" class="cu-btn bg-gradual-blue shadow-blur "
					@tap="onSubmit">提交</button>
			</view>
			<view :hidden=!isShowButton class="padding flex flex-direction ">
				<button class="cu-btn bg-blue lg " @tap="onSubmit">提交</button>
				<button v-if="btnEnableList.indexOf(2)>-1" class="cu-btn bg-green lg "
					@tap="onSubmitAndCheck">提交并审核</button>
			</view>
		</form>
	</view>

</template>

<script>
	const enableSerialNumber_dict = [{
		text: '有',
		value: '1'
	}, {
		text: '无',
		value: '0'
	}];
	const enableBatchNumber_dict = [{
		text: '有',
		value: '1'
	}, {
		text: '无',
		value: '0'
	}];
	import appSelect from '@/components/my-componets/appSelect.vue'
	import tkiTree from "@/components/tki-tree/tki-tree.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import scan from '@/components/p-scan/scan.vue'
	import myDate from '@/components/my-componets/my-date.vue'
	import {
		getNowFormatYear,
		getNowFormatDateTime
	} from "@/common/util/util.js"
	import ListBtnEnable from "@/common/mixin/BtnEnable.js"
	export default {
		components: {
			appSelect,
			tkiTree,
			uniPopup,
			scan,
			myDate,
		},
		mixins: [ListBtnEnable], // 使用mixin
		data() {
			return {
				title: '新增单据',
				isDel: true,
				isOpen: true,
				isClose: true,
				isShowButton: true,
				multiple: false,
				selectParent: true,
				flod: false,
				index: -1,
				switchC: false,
				imgList: [],
				goodsDetailList: [], //列表数据
				enableSerialNumber_dict,
				enableBatchNumber_dict,
				categoryId_type: [],
				unit_type: [],
				uploadUrl: "/sys/common/upload",
				depotList: [],
				myFormDataDetail: {
					index: '',
					id: '',
					goodsDetailid: '',
					depotId: '',
					depotName: '',
					barCode: '',
					name: '',
					standard: '',
					model: '',
					color: '',
					materialOther: '',
					stock: '',
					unit: '',
					operNumber: '',
					unitPrice: '',
					allPrice: '',
					sku: '',
					remark: '',

				},
				organId: '',
				myFormData: {
					id: '',
					organId: '',
					operTime: getNowFormatDateTime(),
					number: '',
					payType: '现付',
					type: '出库',
					subType: '零售',
					status: '0',
					changeAmount: 0,
					getAmount: 0,
					backAmount: 0,
					accountId: '',
					unit: '',
					color: '',
					weight: '',
					expiryNum: '',
					categoryId: '',
					categoryName: '',
					enableSerialNumber: '0',
					enableBatchNumber: '0',
					remark: '',
					totalPrice: '',
					defaultNumber: '',
					status: '',
				},
				accountList: [],
				prefixNo: 'LSCK',
				retailList: [],
				payTypeList: [],
				modalName: null,
				listTouchDirection: null,
				maxBarCodeInfo: '', //最大条码
				meDeleteIdList: [], //删除条码信息的id数组
				action: '', // add edit
			};
		},
		onLoad: function(option) {
			let selected = false;
			if (option.selected) {
				selected = true
			}
			let action = 'add';
			if (option.action) {
				action = option.action
				this.action = action
			}
			let retailOut;
			if (option && option.item) {
				retailOut = JSON.parse(decodeURIComponent(option.item));
			}
			let oldMyFormData;
			if (option && option.myFormData) {
				oldMyFormData = JSON.parse(decodeURIComponent(option.myFormData));
				oldMyFormData = JSON.parse(decodeURIComponent(oldMyFormData));
			}
			if (action == 'add') {
				this.title = '新增单据'

				if (!selected) {
					this.addInit(this.prefixNo)
				}
				if (option && option.goodsDetail) {
					let goodsDetail = JSON.parse(decodeURIComponent(option.goodsDetail));
					if (option && option.goodsDetailList != 'undefined') {
						let oldgoodsDetailList = JSON.parse(decodeURIComponent(option.goodsDetailList));
						oldgoodsDetailList = JSON.parse(decodeURIComponent(oldgoodsDetailList));
						if (oldgoodsDetailList.length > 0) {
							this.goodsDetailList = oldgoodsDetailList;
							let goodsIndex = 0;
							for (let goods of this.goodsDetailList) {
								if (goods.goodsDetailid == goodsDetail.goodsDetailid) {
									this.goodsDetailList.splice(goodsIndex, 1);
									break
								}
								goodsIndex++
							}

						}

					}

					this.myFormDataDetail.goodsDetailid = goodsDetail.goodsDetailid
					this.myFormDataDetail.depotId = goodsDetail.goodsDetaildepotId
					this.myFormDataDetail.depotName = goodsDetail.goodsDetailstockName
					this.myFormDataDetail.barCode = goodsDetail.goodsDetailbarCode
					this.myFormDataDetail.name = goodsDetail.goodsDetailname
					this.myFormDataDetail.standard = goodsDetail.goodsDetailstandard
					this.myFormDataDetail.model = goodsDetail.goodsDetailmodalName
					this.myFormDataDetail.color = goodsDetail.goodsDetailcolor
					this.myFormDataDetail.materialOther = goodsDetail.goodsDetailmaterialOther
					this.myFormDataDetail.stock = goodsDetail.goodsDetailstock
					this.myFormDataDetail.unit = goodsDetail.goodsDetailunitName
					this.myFormDataDetail.operNumber = goodsDetail.goodsDetailoperNumber
					this.myFormDataDetail.unitPrice = goodsDetail.goodsDetailunitPrice
					this.myFormDataDetail.allPrice = goodsDetail.goodsDetailallPrice
					this.myFormDataDetail.sku = goodsDetail.goodsDetailsku
					this.goodsDetailList.push(this.myFormDataDetail)
				}
				this.initPayTypeList();
				if (oldMyFormData) {
					this.myFormData.id = oldMyFormData.id
					oldMyFormData.accountId = oldMyFormData.accountId + ""
					this.myFormData.number = oldMyFormData.number
					this.myFormData.operTime = oldMyFormData.operTime
					this.myFormData.accountId = oldMyFormData.accountId + ""
					this.myFormData.payType = oldMyFormData.payType
					this.myFormData.changeAmount = oldMyFormData.changeAmount
					this.myFormData.getAmount = oldMyFormData.getAmount
					this.myFormData.backAmount = oldMyFormData.backAmount
					this.myFormData.remark = oldMyFormData.remark
					this.loadRetailListData(oldMyFormData, selected);
				} else {
					this.loadRetailListData();
				}
				this.getDepotData();
				this.$nextTick(() => {
					this.jsje();
				})
			} else if (action == 'edit') {
				this.title = '编辑单据'
				if (option && option.goodsDetail) {
					let goodsDetail = JSON.parse(decodeURIComponent(option.goodsDetail));
					if (option && option.goodsDetailList != 'undefined') {
						let oldgoodsDetailList = JSON.parse(decodeURIComponent(option.goodsDetailList));
						oldgoodsDetailList = JSON.parse(decodeURIComponent(oldgoodsDetailList));
						if (oldgoodsDetailList.length > 0) {
							this.goodsDetailList = oldgoodsDetailList;
							let goodsIndex = 0;
							for (let goods of this.goodsDetailList) {
								if (goods.goodsDetailid == goodsDetail.goodsDetailid) {
									this.goodsDetailList.splice(goodsIndex, 1);
									break
								}
								goodsIndex++
							}

						}

					}

					this.myFormDataDetail.goodsDetailid = goodsDetail.goodsDetailid
					this.myFormDataDetail.depotId = goodsDetail.goodsDetaildepotId
					this.myFormDataDetail.depotName = goodsDetail.goodsDetailstockName
					this.myFormDataDetail.barCode = goodsDetail.goodsDetailbarCode
					this.myFormDataDetail.name = goodsDetail.goodsDetailname
					this.myFormDataDetail.standard = goodsDetail.goodsDetailstandard
					this.myFormDataDetail.model = goodsDetail.goodsDetailmodalName
					this.myFormDataDetail.color = goodsDetail.goodsDetailcolor
					this.myFormDataDetail.materialOther = goodsDetail.goodsDetailmaterialOther
					this.myFormDataDetail.stock = goodsDetail.goodsDetailstock
					this.myFormDataDetail.unit = goodsDetail.goodsDetailunitName
					this.myFormDataDetail.operNumber = goodsDetail.goodsDetailoperNumber
					this.myFormDataDetail.unitPrice = goodsDetail.goodsDetailunitPrice
					this.myFormDataDetail.allPrice = goodsDetail.goodsDetailallPrice
					this.myFormDataDetail.sku = goodsDetail.goodsDetailsku

					this.goodsDetailList.push(this.myFormDataDetail)
				}
				this.initPayTypeList();
				this.getDepotData();
				if (!selected) {
					this.loadRetailListData(retailOut, selected);
					// this.initAccount(retailOut.accountId);	
					this.goodsInit(retailOut);
					this.$nextTick(() => {
						// this.myFormData.id = retailOut.id
						if (retailOut.operTimeStr) {
							retailOut.operTime = retailOut.operTimeStr
						}
						this.myFormData = retailOut
						this.myFormData.organId = retailOut.organId == undefined ? "" : retailOut.organId
						// this.myFormData.number = retailOut.number
						// this.myFormData.operTime = retailOut.operTime
						// this.myFormData.accountId = retailOut.accountId
						// this.myFormData.payType = retailOut.payType
						// this.myFormData.changeAmount = retailOut.changeAmount
						// this.myFormData.getAmount = retailOut.getAmount
						// this.myFormData.backAmount = retailOut.backAmount
						// this.myFormData.remark = retailOut.remark
					})

				} else {
					if (oldMyFormData) {
						this.myFormData.id = oldMyFormData.id
						this.myFormData.status = oldMyFormData.status
						if (oldMyFormData.operTimeStr) {
							oldMyFormData.operTime = oldMyFormData.operTimeStr
						}
						oldMyFormData.accountId = oldMyFormData.accountId + ""
						this.myFormData.number = oldMyFormData.number
						this.myFormData.operTime = oldMyFormData.operTime
						this.myFormData.accountId = oldMyFormData.accountId + ""
						this.myFormData.payType = oldMyFormData.payType
						this.myFormData.changeAmount = oldMyFormData.changeAmount
						this.myFormData.getAmount = oldMyFormData.getAmount
						this.myFormData.backAmount = oldMyFormData.backAmount
						this.myFormData.remark = oldMyFormData.remark
						this.loadRetailListData(oldMyFormData, selected);
					} else {
						this.loadRetailListData();
					}

					this.$nextTick(() => {
						this.jsje();
					})
				}

			}

		},
		methods: {

			getAmountChange(v) {
				let target = v.target.value
				this.myFormData.backAmount = parseFloat(target) - parseFloat(this.myFormData.changeAmount)
			},
			jsje() {
				let changeAmount = 0;
				let getAmount = 0;
				let backAmount = 0;
				if (this.goodsDetailList != null && this.goodsDetailList.length > 0) {
					for (let goodsDetail of this.goodsDetailList) {
						changeAmount = changeAmount + parseFloat(goodsDetail.allPrice)
					}
				}
				this.myFormData.changeAmount = changeAmount;
				this.myFormData.getAmount = changeAmount;
				this.myFormData.backAmount = backAmount;

			},
			InputChange(v) {
				const that = this;
				let target = v.target
				if (target.id == 'operNumber') {
					that.myFormDataDetail.allPrice = that.myFormDataDetail.unitPrice * target.value
				}
				if (target.id == 'unitPrice') {
					that.myFormDataDetail.allPrice = that.myFormDataDetail.operNumber * target.value
				}
				if (target.id == 'allPrice') {
					that.myFormDataDetail.unitPrice = parseFloat(target.value / that.myFormDataDetail.operNumber).toFixed(
						2);
				}
			},
			changeDepotStock(v) {
				let that = this
				let depotName;
				for (let depot of this.depotList) {
					if (depot.value == v) {
						depotName = depot.text
					}
				}
				this.myFormDataDetail.depotName = depotName;
				let params = {};
				params.depotId = v
				params.barCode = this.myFormDataDetail.barCode + ''
				this.$http.get("/depotItem/findStockByDepotAndBarCode", {
					params
				}).then(res => {
					if (res && res.data.code === 200) {
						that.myFormDataDetail.stock = res.data.data.stock
					}
				})

			},
			getDepotData(v) {
				let that = this
				this.$http.get("/depot/findDepotByCurrentUser", {}).then(res => {
					if (res && res.data.code === 200) {
						for (let annItem of res.data.data) {
							let row = {};
							row.text = annItem.depotName;
							row.value = annItem.id + ""
							that.depotList.push(row)
						}
						if (v) {
							that.myFormDataDetail.depotId = v
						}
					}
				})
			},
			goodsSelect() {
				uni.navigateTo({
					url: '/pages/openorder/retailOut/goodsSelect?myFormData=' + encodeURIComponent(JSON.stringify(
							this.myFormData)) + '&goodsDetailList=' + encodeURIComponent(JSON.stringify(this
							.goodsDetailList)) +
						'&action=' + this.action
				});
			},
			//加载收款类型
			initPayTypeList() {
				this.payTypeList = [{
					text: '现付',
					value: '现付'
				}];
			},
			initAccount(accountId) {
				let that = this
				this.myFormData.accountId = "";
				this.$http.get("/account/getAccount", {}).then(res => {
					if (res && res.data.code === 200) {
						let v;
						for (let annItem of res.data.data.accountList) {
							let row = {};
							row.text = annItem.name;
							row.value = annItem.id + ""
							that.accountList.push(row)
							if (annItem.isDefault) {
								v = row.value
							}
						}
						if (accountId) {
							let acId = String(accountId)
							v = acId
						}
						that.myFormData.accountId = String(v)
					}
				})
			},
			editAfter(retailOut) {
				let that = this


			},
			addInit(amountNum) {
				if (!this.myFormData.number) {
					this.$http.get("/sequence/buildNumber", {}).then(res => {
						if (res && res.data.code === 200) {
							this.myFormData.number = amountNum + res.data.data.defaultNumber
						}
					})
				}
				this.$nextTick(() => {
					this.myFormData.discount = 0;
					this.myFormData.discountMoney = 0;
					this.myFormData.discountLastMoney = 0;
					this.myFormData.otherMoney = 0;
					this.myFormData.changeAmount = 0;
					this.myFormData.debt = 0;
					this.myFormData.getAmount = 0;
					this.myFormData.backAmount = 0;

				})
				//  this.$nextTick(() => {
				// getAccount({}).then((res)=>{
				//   if(res && res.code === 200) {
				// 	for (const item of res.data.accountList) {
				// 	  if(item.isDefault){
				// 		this.form.setFieldsValue({'accountId': item.id})
				// 	  }
				// 	}
				//   }
				// })
				//  })
				// this.accountIdList = []
				// this.accountMoneyList = []
				// this.manyAccountBtnStatus = false
			},
			loadRetailListData(oldMyFormData, selected) {
				let that = this;

				if (this.retailList.length == 0) {
					let params = {};
					that.$http.post("/supplier/findBySelect_retail", {
						params
					}).then(res => {
						if (res.statusCode == '200') {
							for (let annItem of res.data) {
								let row = {};
								row.text = annItem.supplier;
								row.value = annItem.id + ""
								that.retailList.push(row)
							}
							if (oldMyFormData) {
								that.myFormData.organId = oldMyFormData.organId + ""
							}
							if (oldMyFormData) {
								that.initAccount(oldMyFormData.accountId);
							} else {
								that.initAccount();
							}

						}
					})
				}



			},
			goodsInit(retailOut) {
				this.myFormData = {}
				this.goodsDetailList = []

				this.isDel = false
				this.isShowButton = false
				// if(goods.unitId){
				// 	this.switchC = true
				// }

				if (retailOut.status == '1') {
					this.isOpen = false
					this.isClose = true
					this.isOpen = true
					this.isClose = false
				} else {
					this.isOpen = false
					this.isClose = true
				}
				let that = this;
				if (retailOut != '') {
					if (retailOut.id) {
						this.myFormData = {}
						this.goodsDetailList = []

						// retailOut.depotId = retailOut.depotId+""

						let mpList = "制造商,自定义1,自定义2,自定义3"; //扩展属性
						let params = {
							headerId: retailOut.id,
							mpList: mpList
						}
						this.$http.get("/depotItem/getDetailList", {
							params: params
						}).then(res => {
							if (res && res.data.code === 200) {
								that.goodsDetailList = res.data.data.rows || []
							}
						})
					}
					// this.$nextTick(() => {
					// 	this.jsje();
					// })
				}
			},
			onSubmitAndCheck() {
				this.myFormData.status = '1'
				this.onSubmit();
			},
			onSubmit() {
				let that = this;
				let myForm = this.myFormData
				console.log("myForm", myForm)
				if (!myForm.operTime || myForm.operTime.length == 0) {
					this.$tip.alert('请输入单据日期');
					return false
				}
				if (!myForm.number || myForm.number.length == 0) {
					this.$tip.alert('请输入单据编号');
					return false
				}
				if (!myForm.payType || myForm.payType.length == 0) {
					this.$tip.alert('请选择序收款类型');
					return false
				}
				if (!myForm.accountId || myForm.accountId.length == 0) {
					this.$tip.alert('请选择收款账户');
					return false
				}
				if (!this.goodsDetailList || this.goodsDetailList.length == 0) {
					this.$tip.alert('请选择单据明细信息');
					return false
				}

				//  for(let i=0; i<this.goodsDetailList.length; i++) {
				// let barCode = this.goodsDetailList[i].barCode;
				// let stock = this.goodsDetailList[i].stock;
				// let operNumber = this.goodsDetailList[i].operNumber;
				// if(operNumber > stock) {
				// 	this.$tip.alert('第'+(i+1)+'行条码['+barCode+']数量大于库存数量，请修改！！');
				// 	return;
				// }  
				//  }

				this.myFormData.totalPrice = this.myFormData.changeAmount
				this.myFormData.defaultNumber = this.myFormData.number
				this.myFormData.fileName = '';
				this.myFormData.meDeleteIdList = this.meDeleteIdList;
				console.log('myform', this.myFormData)
				let params = {};
				params.info = JSON.stringify(this.myFormData);
				params.rows = JSON.stringify(this.goodsDetailList);
				this.$tip.loading();
				let url = '/depotHead/addDepotHeadAndDetail'
				if (this.action == 'edit') {
					url = '/depotHead/updateDepotHeadAndDetail'
					this.$http.put(url, params).then(res => {
						console.log(res)
						this.$tip.loaded();
						if (res.data.code === 200) {
							this.$tip.toast('提交成功')
							this.$Router.replace({
								name: 'retailOut'
							})
							/* uni.navigateTo({
								url: '/pages/user/userdetail'
							}) */
						} else {
							this.$tip.error(res.data.data.message)
						}
					}).catch(() => {
						this.$tip.loaded();
						this.$tip.error('提交失败')
					});
				} else {
					this.$http.post(url, params).then(res => {
						console.log(res)
						this.$tip.loaded();
						if (res.data.code === 200) {
							this.$tip.toast('提交成功')
							this.$Router.replace({
								name: 'retailOut'
							})
							/* uni.navigateTo({
								url: '/pages/user/userdetail'
							}) */
						} else {
							this.$tip.error(res.data.data.message)
						}
					}).catch(() => {
						this.$tip.loaded();
						this.$tip.error('提交失败')
					});
				}


			},
			parseParam(param) {
				return param ? param : ""
			},
			DateChange(e) {
				this.myFormData.birthday = e.detail.value
			},
			SwitchC(e) {
				this.switchC = e.detail.value
			},
			ChooseImage() {
				var that = this;
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						that.$http.upload(that.$config.apiUrl + that.uploadUrl, {
								filePath: res.tempFilePaths[0],
								name: 'file'
							})
							.then(res => {
								that.myFormData.avatar = res.data.message;
							})
							.catch(err => {
								that.$tip.error(err.data.message)
							});
						this.imgList = res.tempFilePaths
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
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
			PickerChange(e) {
				this.index = e.detail.value
			},
			// 确定回调事件
			treeConfirm(e) {
				this.myFormData.categoryName = e[0].name
				this.myFormData.categoryId = e[0].id
			},
			// 取消回调事件
			treeCancel(e) {
				console.log(e)
			},
			// 显示树形选择器
			showTree() {
				this.$refs.tkitree._show();
			},
			popupOpen(code) {
				this.myFormDataDetail = []
				if (null != code) {
					this.myFormDataDetail.barCode = code
				} else {
					this.$refs.popup.open()
					this.maxBarCodeInfo = parseFloat(this.maxBarCodeInfo) + 1
					this.myFormDataDetail.barCode = this.maxBarCodeInfo + ''
				}
				this.myFormDataDetail.commodityUnit = this.myFormData.unit ? this.myFormData.unit : ''
			},

			close() {
				this.$refs.popup.close()
			},
			onSubmitDetail() {
				let index = this.myFormDataDetail.index
				if (this.myFormDataDetail.id == undefined) {
					this.myFormDataDetail.id = parseInt(new Date().getTime()) + '' + this.createCode();
				}
				if (null != index) {
					this.goodsDetailList[index] = this.myFormDataDetail
				} else {
					let formDetail = {
						...this.myFormDataDetail
					};
					this.goodsDetailList.push(formDetail)
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
			titleFilter(text, len) {
				if (!text || text.length == 0) {
					return ''
				}
				if (text.length < len) {
					return text;
				}
				return text.substr(0, len) + "..."
			},
			goGoodsDetail(item, index) {
				if (this.myFormData.status != '1') {
					this.myFormDataDetail = [];
					this.myFormDataDetail = item
					this.myFormDataDetail.index = index
					this.$refs.popup.open()
				}

			},
			onDelDetail() {
				let index = this.myFormDataDetail.index
				if (null != index) {
					this.meDeleteIdList.push(this.myFormDataDetail.id)
					this.goodsDetailList.splice(index, 1);
					this.$refs.popup.close()
					this.$nextTick(() => {
						this.jsje();
					})
				}
			},
			batchSetStatus(v) {
				let id = this.myFormData.id
				if (null != id) {
					let that = this
					this.$http.post("/depotHead/batchSetStatus", {
						status: v,
						ids: id + ','
					}).then(res => {
						that.$tip.loaded();
						if (res.data.code === 200) {
							that.$tip.toast('变更成功')
							that.$Router.replace({
								name: 'retailOut'
							})
						}
					}).catch(() => {
						that.$tip.loaded();
						that.$tip.error('变更失败')
					});
				}
			},
			onDelBill() {
				let id = this.myFormData.id
				if (null != id) {
					let that = this
					uni.showModal({
						title: '删除商品',
						content: '是否删除该商品数据？',
						success: (res) => {
							if (res.confirm) {
								this.$http.delete("/depotHead/delete?id=" + id).then(res => {
									that.$tip.loaded();
									if (res.data.code === 200) {
										that.$tip.toast('删除成功')
										that.$Router.replace({
											name: 'retailOut'
										})
									}
								}).catch(() => {
									that.$tip.loaded();
									that.$tip.error('删除失败')
								});
							}
						}
					});

				}
			},

			showScan() {
				// 允许从相机和相册扫码
				let code;
				let that = this;
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						that.popupOpen(res.result)
					}
				});

			},
			// clearMyFormDetail(){
			// 	this.myFormDataDetail.index=''
			// 	this.myFormDataDetail.barCode=''
			// 	this.myFormDataDetail.commodityUnit=''
			// 	this.myFormDataDetail.purchaseDecimal=''
			// 	this.myFormDataDetail.commodityDecimal=''
			// 	this.myFormDataDetail.wholesaleDecimal=''
			// 	this.myFormDataDetail.lowDecimal=''
			// },
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

	.e-btn {
		margin-bottom: 1rem;
	}

	.titlePad {
		margin-top: 0.6rem;
	}

	.cu-list>.move-cur {
		transform: translateX(-150rpx);

	}

	.nav .cu-item.cur {
		position: flex;
		z-index: 9;
		border-bottom: 4upx solid;
	}
</style>