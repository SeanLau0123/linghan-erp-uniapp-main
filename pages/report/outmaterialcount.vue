<!-- 报表-出库汇总 -->
<template>
	<view>
		<cu-custom :bgColor="NavBarColor" :isBack="true" @back="goBack">
			<block slot="backText">返回</block>
			<block slot="content">出库汇总</block>
		</cu-custom>
		<scroll-view>
			<view class="action">
				<view class="search-box">
					<view class="input-row">
						<input prefix-icon="search" class="search-input" placeholder="条码/名称/助记码" v-model="searchText"
							@confirm="confirm" />
						<uni-icons type="scan" size="25" @tap="showScan"></uni-icons>
						<uni-icons type="search" @tap="openstockSearch" size="25"
							style='margin-right: 5px;'></uni-icons>
					</view>
					<text style="text-align:center; font-weight: bold">出库总数量：{{numSumTotal|| '0'}}，出库总金额：¥{{priceSumTotal.toFixed(2)|| '-'}}</text>
				</view>
				<uni-popup ref="popup" style="z-index: 20; margin: 0 auto;height:800px;" type="right">
					<view style="height: 800px; width: 100%;float: right;">
						<form style="height: 800px;">
							<view class="cu-form-group" style="margin-top:60px;">
								<view class="title">开始日期</view>
								<myDate v-model="beginTime" fields="day" placeholder="请选择日期"></myDate>
							</view>
							<view class="cu-form-group">
								<view class="title">结束日期</view>
								<myDate v-model="endTime" fields="day" placeholder="请选择日期"></myDate>
							</view>
							<view class="cu-form-group">
								<view class="title">往来单位</view>
								<app-select v-model="supplierId" placeholder="请选择" :dict="supplierList" space></app-select>
							</view>
							<view class="cu-form-group">
								<view class="title">仓库</view>
								<app-select v-model="depotId" placeholder="请选择" :dict="depotList" space></app-select>
							</view>
							<view class="cu-form-group">
								<view class="title">商品类别</view>
								<input disabled="true" placeholder="	请输入类别" name="input" v-model="categoryName"></input>
								<input hidden="true" placeholder="	请输入类别" name="input" v-model="categoryId"></input>
								<tki-tree ref="tkitree" :selectParent="selectParent" :multiple="multiple"
									:range="categoryId_type" :foldAll="flod" rangeKey="name" @confirm="treeConfirm"
									@cancel="treeCancel"></tki-tree>
								<uni-icons type="settings-filled" @tap="showTree" size="25"></uni-icons>
							</view>
							<view class="cu-form-group" :isBack="true" backRouterName="index">
								<button style="background-image: linear-gradient(45deg, #848a90, #848a90);"
									class="cu-btn bg-gradual-blue shadow-blur round" @tap="close">返回</button>
								<button class="cu-btn bg-gradual-blue shadow-blur round" @tap="reset">重置</button>
								<button class="cu-btn bg-gradual-blue shadow-blur round" @tap="confirm">确定</button>
							</view>
						</form>
					</view>
				</uni-popup>
			</view>
			<view class="stock-list" :style="[{animation: 'show 0.5s 1'}]">
				<view class="stock-item" v-for="item in outCount" :key="item.materialId">
					<view class="item-row">
						<text class="label">名称：</text>
						<text class="value name">{{ item.mName || '-' }}({{item.barCode}})</text>

					</view>
					<view class="item-row">
						<text class="label">单位：</text>
						<text class="value">{{ item.materialUnit || '-' }}</text>
						<text class="label">类别：</text>
						<text class="value">{{ item.categoryName || '-' }}</text>
					</view>
					<view class="item-row">
						<text class="label">出库数量：</text>
						<text class="value">{{item.numSum || '-' }}</text>
						<text class="label">出库金额：</text>
						<text class="value">¥{{item.priceSum.toFixed(2) || '-' }}</text>
					</view>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	const currentDate = new Date();
	const threeMonthsAgo = new Date(currentDate);
	threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
	import appSelect from '@/components/my-componets/appSelect.vue'
	import tkiTree from "@/components/tki-tree/tki-tree.vue"
	import scan from '@/components/p-scan/scan.vue'
	import myDate from '@/components/my-componets/my-date.vue'
	export default {
		components: {
			appSelect,
			tkiTree,
			scan,
			myDate
		},
		data() {
			return {
				multiple: false,
				selectParent: true,
				flod: false,
				stocks: [],
				depotList: [],
				supplierList:[],
				searchText: '',
				
				outCount: [],
				numSumTotal: '',
				priceSumTotal: 0,
				outCountUrl: '/depotHead/findInOutMaterialCount',
				beginTime:threeMonthsAgo.toISOString().split('T')[0],
				endTime: new Date().toISOString().split('T')[0],
				depotId: "",
				categoryId_type: [],
				categoryName: "",
				categoryId: "",
				supplierId:""
			}
		},
		onLoad() {
			this.loadinfo()
			this.getDepotData() //加载仓库列表
			this.getSupplierData()	//加载往来单位列表
			this.loadCategoryIdTreeData()
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1,
					success: function() {
						const pages = getCurrentPages();
						const prevPage = pages[pages.length - 2];
						if (prevPage.route === 'pages/index/index') {
							prevPage.$vm.PageCur = 'report';
						}
					}
				});
			},
			openstockSearch() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			reset() {
				this.supplierId=''
				this.depotId = ''
				this.categoryId = ''
				this.categoryName = ''
				this.searchText = ''
				this.endTime=new Date().toISOString().split('T')[0]
				this.beginTime=threeMonthsAgo.toISOString().split('T')[0]
				this.loadinfo()
				this.loadCategoryIdTreeData()
			},
			confirm() {
				this.loadinfo()
				this.$refs.popup.close()
			},
			showScan() {
				// 允许从相机和相册扫码
				let code;
				let that = this;
				uni.scanCode({
					success: function(res) {
						that.goodsInfo = res.result
					}
				});

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
			loadCategoryIdTreeData() {
				let that = this;
				let params = {};
				params.id = '';
				that.$http.get("/materialCategory/getMaterialCategoryTree", {
					params
				}).then(res => {
					if (res) {
						that.categoryId_type = [];
						for (let annItem of res.data) {
							let row = {};
							let p = [];
							row.name = annItem.title;
							row.id = annItem.id
							if (annItem.children.length > 0) {
								for (let c of annItem.children) {
									let cc = {}
									cc.name = c.title;
									cc.id = c.id
									p.push(cc);
								}
							}
							row.children = p
							that.categoryId_type.push(row);
						}
					} else {
						this.mescroll.endErr();
					}
				}).catch(() => {
					//加载失败, 结束
					this.mescroll.endErr();
				})
			},
			getSupplierData() {
				let that = this
				this.$http.get("/supplier/list", {}).then(res => {
					if (res && res.data.code === 200) {
						let v;
						for (let annItem of res.data.data.rows) {
							let row = {};
							row.text = annItem.supplier+"("+annItem.type+")";
							row.value = annItem.id + ""
							that.supplierList.push(row)
							if (annItem.enabled) {
								v = row.value
							}
						}
						that.supplierId = v
					}
				})
			},
			getDepotData() {
				let that = this
				this.$http.get("/depot/findDepotByCurrentUser", {}).then(res => {
 					if (res && res.data.code === 200) {
						let v;
						for (let annItem of res.data.data) {
							let row = {};
							row.text = annItem.depotName;
							row.value = annItem.id + ""
							that.depotList.push(row)
							if (annItem.isDefault) {
 								v = row.value
							}
						}
						that.depotId = v
					}
 				})
			},
			loadinfo() {
				beginTime:"threeMonthsAgo.toISOString().split('T')[0]"
				endTime: new Date().toISOString().split('T')[0]
				let params = {
					currentPage: 1,
					pageSize: 10,
					materialParam: '',
					beginTime: this.beginTime,
					endTime: this.endTime,
					type: '出库'
				}
				if (this.searchText) {
					params.materialParam = this.searchText
				}
				if (this.supplierId) {
					params.organId = this.supplierId
				}
				if (this.depotId) {
					params.depotId = this.depotId
				}
				if (this.categoryId) {
					params.categoryId = this.categoryId
				}
				this.$http.get(this.outCountUrl, {
					params: params
				}).then(res => {
					if (res.data.code == "200") {
						let result = res.data.data;
						this.numSumTotal = result.numSumTotal;
						this.priceSumTotal = result.priceSumTotal;
						this.outCount = result.rows;
					}
				}).catch(e => {
					console.log("请求错误", e)
				})
			}
		}
	}
</script>

<style scoped>
	/* 新增全局样式 */
	page {
		background-color: #f5f5f5;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	scroll-view {
		height: calc(100vh - 60px);
		background-color: #f5f5f5;
	}

	.search-box {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		align-items: left;
		background: #fff;
		border-bottom: 1px solid #eee;
	}

	.search-box text {
		font-size: 12px;
		color: #333;
		padding: 5px;
	}

	.search-input {
		flex: 1;
		margin: 5px 5px;
		height: 25px;
		text-align: center;
		border-radius: 3px;
		background-color: #eee;
		font-size: 12px;
		width: 100%;
	}

	.input-row {
		display: flex;
		align-items: center;
	}

	/* 搜索图标样式 */
	.uni-icons {
		padding: 3px;
	}

	.stock-list {
		margin-top: 10px;
	}

	.stock-item {
		background: #fff;
		border-radius: 3px;
		min-height: 60px;
		width: 100vw;
		margin-bottom: 5px;
	}

	.item-row {
		display: flex;
		margin-bottom: 5px;
		line-height: 1.2;
	}

	.label {
		color: #666;
		width: 100px;
		text-align: right;
	}

	.value {
		color: #333;
		flex: 0.6;
		min-width: calc(30% - 85px);
		word-break: break-all;
	}

	.name {
		font-weight: bold;
		color: #007aff;
	}
</style>