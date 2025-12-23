<!-- 报表-库存预警 -->
<template>
	<view> <cu-custom :bgColor="NavBarColor" :isBack="true" @back="goBack">
			<block slot="backText">返回</block>
			<block slot="content">库存预警</block>
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
				</view>
				<uni-popup ref="popup" style="z-index: 20; margin: 0 auto;height: 800px;" type="right">
					<view style="height: 800px; width: 100%;float: right;">
						<form style="height: 800px;">
							<view class="cu-form-group" style="margin-top:60px;">
								<app-select label="仓库" v-model="depotId" placeholder="请选择" :dict="depotList"
									space></app-select>
							</view>
							<view class="cu-form-group">
								<view class="title">类别</view>
								<input disabled="true" placeholder="请输入类别" name="input" v-model="categoryName"></input>
								<input hidden="true" placeholder="请输入类别" name="input" v-model="categoryId"></input>
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
				<view class="stock-item" v-for="stock in stocks" :key="stock.name">
					<view class="item-row">
						<text class="label">名称：</text>
						<text class="value name">{{ stock.mname || '-'}}({{stock.barCode}})</text>
					</view>
					<view class="item-row">
						<text class="label">单位：</text>
						<text class="value">{{ stock.materialUnit || '-' }}</text>
						<text class="label">当前库存：</text>
						<text class="value" style=" font-weight:bold; color: blue; font-size: 14px;">{{ stock.currentNumber || '-' }}</text>
					</view>
					<view class="item-row">
						<text class="label">库存下限：</text>
						<text class="value">{{ stock.lowSafeStock || '0' }}</text>
						<text class="label">库存上限：</text>
						<text class="value">{{ stock.highSafeStock || '0' }}</text>
					</view>
					<view class="item-row">
						<text class="label">建议入库：</text>
						<text class="value">{{stock.lowCritical || '0' }}</text>
						<text class="label">建议出库：</text>
						<text class="value">{{stock.highCritical || '0' }}</text>
					</view>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
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
				depotId: "",
				categoryId_type: [],
				categoryName: "",
				categoryId: "",
				multiple: false,
				selectParent: true,
				flod: false,
				stocks: [],
				depotList: [],
				searchText: '',
				stockUrl: '/depotItem/findStockWarningCount'
			}
		},
		onLoad() {
			this.loadinfo()
			this.getDepotData() //加载仓库列表
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
				this.depotId = ''
				this.categoryId = ''
				this.categoryName = ''
				this.searchText = ''
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
				let params = {
					currentPage: 1,
					pageSize: 10,
					materialParam: '',
					depotId: '',
					categoryId: '',
					mpList: '制造商,自定义1,自定义2,自定义3'
				}
				if (this.searchText) {
					params.materialParam = this.searchText
				}
				if (this.depotId) {
					params.depotId = this.depotId
				}
				if (this.categoryId) {
					params.categoryId = this.categoryId
				}
				this.$http.get(this.stockUrl, {
					params: params
				}).then(res => {
					if (res.data.code == "200") {
						let result = res.data.data;
						this.stocks = result.rows;
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
		background: #ffffff;
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
		margin-top: 5px;
	}

	.stock-item {
		background: #fff;
		border-radius: 3px;
		min-height: 75px;
		width: 100vw;
		margin-bottom: 5px;
	}
	.stock-info {
		font-weight: bold;
		margin-left: 15rpx;
	}
	.item-row {
		display: flex;
		margin-bottom: 5px;
		font-size: 12px;
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
		min-width: calc(50% - 85px);
		word-break: break-all;
	}

	.name {
		font-weight: bold;
		color: #007aff;
	}
</style>