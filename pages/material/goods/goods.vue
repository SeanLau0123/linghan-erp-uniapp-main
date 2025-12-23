<!-- 资料-商品信息 -->
<template>
	<view> <cu-custom :bgColor="NavBarColor" :isBack="true" backRouterName="material">
			<block slot="backText">返回</block>
			<block slot="content">商品信息</block>
		</cu-custom>
		<view class="search-box">
			<view class="input-row">
				<input class="search-input" placeholder="请输入名称查询" v-model="name" @confirm="confirm" />
				<uni-icons type="scan" size="25" @tap="showScan"></uni-icons>
				<uni-icons type="search" @tap="opengoodSearch" size="25" style='margin-right: 5px;'></uni-icons>
			</view>
		</view>
		<uni-popup ref="popup" style="z-index: 20; margin: 0 auto;height: 800px;" type="right">
			<view style="height: 800px; width: 100%;float: right;">
				<form style="height: 800px;">
					<view class="cu-form-group" style="margin-top:60px;">
						<view class="title" 　style="padding-left: 20px;">名称：</view>
						<input prefix-icon="search" placeholder="请输入名称查询" v-model="name" />
					</view>
					<view class="cu-form-group">
						<view class="title">商品类别:</view>
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
		<view class="good-list" style="[{animation: 'show 0.5s 1'}]">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" :top="top" @down="downCallback" @up="upCallback">
				<view
					class="message_text bg-white cu-item flex justify-around align-center solid-bottom margin-bottom-sm margin-top-sm"
					style="width: 100vw;" v-for="(good,index) in goods" :key="index" @tap="gogoodsDetail(good)"
					:class="modalName=='move-box-'+ index?'move-cur':''" :data-target="'move-box-' + index">
					<view class="goods-item" style="min-height: 80px;width: 100vw">
						<view class="goods-row">
							<text class="label">名称：</text>
							<text class="value name">{{ good.name || '-' }}({{good.mBarCode}})</text>
						</view>
						<view class="goods-row">
							<text class="label">单位：</text>
							<text class="value">{{ good.unit || '-' }}</text>
							<text class="label">类别：</text>
							<text class="value">{{ good.categoryName || '-'}}</text>
						</view>
						<view class="goods-row">
							<text class="label">采购价：</text>
							<text class="value">{{ good.purchaseDecimal || '-' }}</text>
							<text class="label">零售价：</text>
							<text class="value">{{ good.commodityDecimal || '-' }}</text>
						</view>
						<view class="goods-row">
							<text class="label">销售价：</text>
							<text class="value">{{ good.wholesaleDecimal || '-' }}</text>
							<text class="label">最低售价：</text>
							<text class="value">{{good.lowDecimal || '-' }}</text>
						</view>
						<!-- 						<view class="goods-row">
							<text class="label">银行账号：</text>
							<text class="value">{{ good.accountNumber || '-' }}</text>
						</view>	 -->
						<view class="goods-row">
							<text class="label">库存数量：</text>
							<text class="value"
								style="font-size: 18px; font-weight: bold;">{{good.stock || '-' }}</text>
							<view style="margin-right: 20rpx; font-weight: bold;">
								<text v-if="good.enabled == '0'" style="color:red;">禁用</text>
								<text v-if="good.enabled == '1'" style="color:green;">启用</text>
							</view>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
		<uni-fab ref="fab" horizontal="right" direction="horizontal" @fabClick="fabClick" />
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js"
	import tkiTree from "@/components/tki-tree/tki-tree.vue"
	export default {
		components: {
			tkiTree
		},
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				telephone: '',
				name: '',
				phonenum: '',
				goods: [],
				goodsUrl: '/material/list',
				modalName: null,
				read: "all",
				msg1Count: "",
				msg1Title: "",
				categoryId_type: [],
				categoryName: "",
				categoryId: "",
				multiple: false,
				selectParent: true,
				flod: false,
			}
		},
		onLoad() {
			this.loadinfo()
			this.loadCategoryIdTreeData()
		},
		computed: {
			top() {
				return this.CustomBar * 2 + 100
			},
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				return style
			},
		},
		methods: {
			opengoodSearch() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			reset() {
				this.phonenum = ''
				this.name = ''
				this.telephone = ''
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
						that.name = res.result
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
						console.log("接口返回数据：", res.data);
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
			gogoodsDetail(good) {
				this.mescroll.resetUpScroll()
				uni.navigateTo({
					url: '/pages/material/goods/goodsInfo?goods=' + encodeURIComponent(JSON.stringify(
						good)) + '&action=edit'
				});
			},
			fabClick() {
				uni.navigateTo({
					url: '/pages/material/goods/goodsInfo?action=add'
				});
			},
			loadinfo() {
				this.$http.get(this.goodsUrl, {
					params: {
						search: JSON.stringify({
							materialParam: this.name,
							categoryId: this.categoryId
						})
					},
				}).then(res => {
					if (res.data.code == "200" && res.data.data.rows.length != 0) {
						let result = res.data.data;
						this.goods = result.rows;
					} else {
						this.$tip.error('未找到数据');
					}
				}).catch(e => {
					console.log("请求错误", e)
				})
			},
			// 搜索方法
			handleSearch() {
				if (!this.name.trim()) {
					this.filteredgoods = [...this.goods];
					return;
				}
				const keyword = this.name.toLowerCase();
				this.filteredgoods = this.goods.filter(good =>
					(good.name && good.name.toLowerCase().includes(keyword)));
			},
			reset() {
				this.name = ''
				this.categoryId = ''
				this.categoryName = ''
				this.loadinfo(); // 重新加载数据

			},
			upCallback(page) {
				let params = {
					currentPage: page.num,
					pageSize: page.size
				}
				params.search = JSON.stringify({
						materialParam: this.name,
						categoryId: this.categoryId
					}),
					//联网加载数据
					this.$http.get(this.goodsUrl, {
						params: params
					}).then(res => {
						if (page.num == 1) {
							this.goods = []; //如果是第一页需手动制空列表
						}
						if (res.data.code == "200") {
							this.goods = this.goods.concat(res.data.data.rows); //追加新数据
							this.msg1Count = res.data.data.total
							//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
							this.mescroll.endBySize(res.data.data.rows.length, res.data.data.total);
						} else {
							this.mescroll.endErr();
						}
					}).catch(() => {
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
		height: 30px;
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

	.good-list {
		margin-top: 3px;
	}

	.good-item {
		background: #fff;
		border-radius: 3px;
		width: 100vw;
		margin-bottom: 3px;
	}

	.goods-row {
		display: flex;
		margin-bottom: 3px;
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
		font-size: 12px;
		padding-right: 30px;
		color: #007aff;
	}
</style>