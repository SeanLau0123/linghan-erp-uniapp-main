<!-- 报表-供应商对账 -->
<template>
	<view> <cu-custom :bgColor="NavBarColor" :isBack="true" @back="goBack">
			<block slot="backText">返回</block>
			<block slot="content">供应商对账</block>
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
					<text style="text-align:center; font-weight: bold">期初应付：¥{{firstMoney}}，期末应付：¥{{lastMoney}}</text>
				</view>
				  <view>
				  </view>
				<uni-popup ref="popup" style="z-index: 20; margin: 0 auto;height: 800px;" type="right">
					<view style="height: 800px; width: 100%;float: right;">
						<form style="height: 800px;">
							<view class="cu-form-group" style="margin-top:60px;">
								<view class="title">供应商</view>
								<app-select v-model="supplierId" placeholder="请选择" :dict="supplierList"
									space></app-select>
							</view>
							<view class="cu-form-group">
								<view class="title">开始日期</view>
								<myDate v-model="beginTime" fields="day" placeholder="请选择日期"></myDate>
							</view>
							<view class="cu-form-group">
								<view class="title">结束日期</view>
								<myDate v-model="endTime" fields="day" placeholder="请选择日期"></myDate>
							</view>
							<view class="cu-form-group">
								<view class="title">欠款情况</view>
								<view>
									<app-select v-model="debType" placeholder="请选择收款类型" :dict="debtList"
										space></app-select>
								</view>
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
				<view class="stock-item" v-for="item in buyIn" :key="item.id">
					<view class="item-row">
						<text class="label">名称：</text>
						<text class="value name">{{ item.supplier || '-' }}</text>

					</view>
					<view class="item-row">
						<text class="label">联系人：</text>
						<text class="value">{{ item.contacts || '-' }}</text>
						<text class="label">手机号码：</text>
						<text class="value">{{item.telephone || '-' }}</text>
					</view>
					<view class="item-row">
						<text class="label">联系电话：</text>
						<text class="value">{{item.phoneNum || '-' }}，电子邮箱：{{item.email || '-' }}</text>
					</view>
					<view class="item-row">
						<text class="label">期初应付：</text>
						<text class="value">¥{{item.beginNeed || '0' }}</text>
					</view>

					<view class="item-row">
						<text class="label">本期欠款：</text>
						<text style="color: #666;">
						{{item.debtMoney.toFixed(2) || '-' }}，本期付款：{{item.allNeed.toFixed(2) || '-' }}，期末应付：{{item.allNeed.toFixed(2) || '-' }}</text>
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
				supplierList: [],
				searchText: "",
				index: 0,
				buyIn: [],
				firstMoney: 0,
				lastMoney: 0,
				buyInUrl: '/depotHead/getStatementAccount',
				beginTime: threeMonthsAgo.toISOString().split('T')[0],
				endTime: new Date().toISOString().split('T')[0],
				depotId: "",
				categoryId_type: [],
				categoryName: "",
				categoryId: "",
				supplierId: "",
				debtList:[{
					text: '有欠款',value: '1'
				},{
					text: '无欠款',value: '0'
				}],
				debType: ""
			}
		},
		onLoad() {
			this.getdebtList()
			this.getSupplierData() //加载供应商列表
			this.loadinfo()
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
				this.supplierId = ''
				this.debType='1'
				this.categoryId = ''
				this.categoryName = ''
				this.searchText = ''
				this.endTime = new Date().toISOString().split('T')[0]
				this.beginTime = threeMonthsAgo.toISOString().split('T')[0]
				this.loadinfo()
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
			getSupplierData() {
				let that = this
				this.$http.get("/supplier/list", {
					params: {
						search: '{"supplier":"","type":"供应商"}'
					}
				}).then(res => {
					if (res && res.data.code === 200) {
						let v;
						for (let annItem of res.data.data.rows) {
							let row = {};
							row.text = annItem.supplier;
							row.value = annItem.id + ""
							that.supplierList.push(row)
							if (annItem.enabled) {
								v = row.value
							}
						}
						// that.supplierId = v
					}
				})
			},
			//加载欠款情况
			getdebtList() {
				this.debType=this.debtList[0].value
			},
			loadinfo() {
				beginTime: "threeMonthsAgo.toISOString().split('T')[0]"
				endTime: new Date().toISOString().split('T')[0]
				let params = {
					currentPage: 1,
					pageSize: 10,
					supplierType: '供应商',
					beginTime: this.beginTime,
					endTime: this.endTime,
					hasDebt: this.debType
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
				if (this.debType) {
					params.hasDebt = this.debType
				}
				this.$http.get(this.buyInUrl, {
					params: params
				}).then(res => {
					if (res.data.code == "200") {
						let result = res.data.data;
						this.firstMoney = result.firstMoney;
						this.lastMoney = result.lastMoney;
						this.buyIn = result.rows;
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
		margin-top: 8px;
	}

	.stock-item {
		background: #fff;
		border-radius: 3px;
		min-height: 105px;
		width: 100vw;
		margin-bottom: 5px;
	}

	.item-row {
		display: flex;
		margin-bottom: 8px;
		line-height: 1.2;
		flex-wrap: wrap;
	}

	.label {
		color: #666;
		width: 80px;
		text-align: right;
	}

	.value {
		color: #333;
		flex: 1;
		min-width: calc(40% - 65px);
		word-break: break-all;
	}

	.name {
		font-weight: bold;
		color: #007aff;
	}
</style>