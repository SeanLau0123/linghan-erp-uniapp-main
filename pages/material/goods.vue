<!-- 资料-供应商管理 -->
<template>
	<view> <cu-custom :bgColor="NavBarColor" :isBack="true" backRouterName="material">
			<block slot="backText">返回</block>
			<block slot="content">商品管理列表</block>
		</cu-custom>
		<!-- 搜索栏 -->
		<view class="search-box">
			<input class="search-input" placeholder="请输入商品名称" v-model="searchText" @confirm="loadinfo" />
			<button class="search-btn" @click="loadinfo">搜索</button>
			<button class="reset-btn" @click="resetSearch">重置</button>
		</view>
		<view class="container" style="[{animation: 'show 0.5s 1'}]">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" :top="top" @down="downCallback" @up="upCallback">
				<view
					class="message_text bg-white cu-item flex justify-around align-center solid-bottom margin-bottom-sm margin-top-sm"
					style="width: 100vw;" v-for="(good,index) in goods" :key="index"
					:class="modalName=='move-box-'+ index?'move-cur':''"
					:data-target="'move-box-' + index">
					<view class="goods-item">
						<view class="goods-row">
							<text class="label">名称：</text>
							<text class="value name">{{ good.name || '-' }}</text>
							<view style="margin-right: 20rpx; font-weight: bold;">
								<text v-if="good.enabled == '0'" style="color:red;">禁用</text>
								<text v-if="good.enabled == '1'" style="color:green;">启用</text>
							</view>
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
							<text class="value">¥{{good.lowDecimal || '-' }}</text>
						</view>
<!-- 						<view class="goods-row">
							<text class="label">银行账号：</text>
							<text class="value">{{ good.accountNumber || '-' }}</text>
						</view>	 -->				
						<view class="goods-row">
							<text class="label">库存数量：</text>
						<text class="value" style="font-size: 24px; font-weight: bold;">{{good.stock || '-' }}</text>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				searchText: '',
				goods: [],
				goodsUrl: '/material/list',
				//material/findBySelect
				modalName: null,
				read: "all",
				announcement1:[],
				msg1Count:"",
				msg1Title:""
			}
		},
		onLoad() {
			this.loadinfo()
		},
		computed: {
			top() {
				return this.CustomBar * 2 + 65
			},
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				return style
			},
		},
		methods: {
			loadinfo() {
				this.$http.get(this.goodsUrl, {
					params: {
						search: '{"materialParam":"' + this.searchText + '"}',
					}
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
				if (!this.searchText.trim()) {
					this.filteredgoods = [...this.goods];
					return;
				}

				const keyword = this.searchText.toLowerCase();
				this.filteredgoods = this.goods.filter(good =>
					(good.name && good.name.toLowerCase().includes(keyword)) ||
					(good.mBarCode && good.mBarCode.toLowerCase().includes(keyword))
				);
			},
			resetSearch() {
				this.searchText = '';
				this.loadinfo(); // 重新加载数据

			},
			upCallback(page) {
				let params = {
					currentPage: page.num,
					pageSize: page.size
				}
				params.search= '{"materialParam":"' + this.searchText + '"}',
				//联网加载数据
				this.$http.get(this.goodsUrl, {
					params: params
				}).then(res => {
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.announcement1 = res.data.data.rows
					this.mescroll.endSuccess(res.data.data.total);
					//console.log("url", res)
					//设置列表数据
					if (res.data.code == "200") {
						console.log("res", res.data)
						this.msg1Count = res.data.data.total
						for (let annItem of this.announcement1) {
							this.goods.push(annItem)
						}

					}
					if (page.num == 1) {
						this.goods = []; //如果是第一页需手动制空列表
						this.goods = this.goods.concat(res.data.data.rows); //追加新数据
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
	.e-btn {
		margin-bottom: 1rem;
	}

	.titlePad {
		margin-top: 0.6rem;
	}

	.cu-list>.move-cur {
		transform: translateX(-100rpx);

	}

	.nav .cu-item.cur {
		position: flex;
		z-index: 9;
		border-bottom: 4upx solid;
	}

	.goods-list {
		border-radius: 5px;
		overflow: hidden;
	}

	/* 	message_text bg-white cu-item flex justify-around align-center solid-bottom margin-bottom-sm margin-top-sm */
	.goods-item {
		background: #fff; /* 更改为白色背景 */
		border-radius: 5upx;
		box-shadow: 0 2upx 5upx rgba(0, 0, 0, 0.05);
		min-height: 120px;
		width: 100vw;
		padding: 10rpx;

	}

	.goods-row {
		display: flex;
		justify-content: space-between;
		margin-top: 3upx;
	}

	.label {
		color: #000000;
		width: 25%;
		font-family: 'HarmonyOS Sans Black';
		text-align: right;
	}

	.value {
		flex: 1;
		text-align: left;
	}
	.name {
		font-weight: bold;
		color: #0000ff;
	}

	/* 新增搜索框样式 */
	.search-box {
		display: flex;
		padding: 10upx;
		background: #fff;
		align-goods: center;
	}

	.search-input {
		flex: 1;
		height: 30px;
		padding: 0 10upx;
		border: 1px solid #ddd;
		border-radius: 5px;
		font-size: 16px;
	}

	.search-btn,
	.reset-btn {
		margin-left: 10px;
		padding: 0 15px;
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		border-radius: 5px;
	}

	.search-btn {
		background-color: #00aaff;
		color: white;
	}

	/* 按下时的样式 */
	.search-btn:active {
		transform: scale(0.95);
		/* 轻微缩小 */
		background: #096dd9;
		/* 颜色变深 */
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		/* 阴影效果 */
	}

	.reset-btn {
		background-color: #f5f5f5;
		color: #666;
	}

	.reset-btn:active {
		transform: scale(0.95);
		/* 轻微缩小 */
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		/* 阴影效果 */
	}
</style>