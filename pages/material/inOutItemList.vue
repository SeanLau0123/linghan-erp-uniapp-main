<!-- 资料-收支项目 -->
<template>
	<view> <cu-custom :bgColor="NavBarColor" :isBack="true" backRouterName="material">
			<block slot="backText">返回</block>
			<block slot="content">收支项目</block>
		</cu-custom>
		<view class="search-box">
			<view class="input-row">
				<input class="search-input" placeholder="请输入名称" v-model="name" @confirm="confirm" />
				<uni-icons type="scan" size="25" @tap="showScan"></uni-icons>
				<uni-icons type="search" @tap="openinOutItemearch" size="25" style='margin-right: 5px;'></uni-icons>
			</view>
		</view>
		<uni-popup ref="popup" style="z-index: 20; margin: 0 auto;height: 800px;" type="right">
			<view style="height: 800px; width: 100%;float: right;">
				<form style="height: 800px;">
					<view class="cu-form-group" style="margin-top:60px;">
						<view class="title">名称：</view>
						<input prefix-icon="search" placeholder="请输入姓名查询" v-model="name" />
					</view>
					<view class="cu-form-group">
						<view class="title">类型：</view>
							<app-select v-model="inOutType" placeholder="请选择类型" :dict="inOutList" space></app-select>
					</view>
					<view class="cu-form-group">
						<view class="title">备注：</view>
						<input prefix-icon="search"  placeholder="请输入备注查询" v-model="remark" />
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
		<view class="stock-list" style="[{animation: 'show 0.5s 1'}]">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" :top="top" @down="downCallback" @up="upCallback">
				<view
					class="message_text bg-white cu-item flex justify-around align-center solid-bottom margin-bottom-sm margin-top-sm"
					style="width: 100vw;" v-for="(account,index) in inOutItem" :key="index"
					@tap="goinOutItemDetail(account)" :class="modalName=='move-box-'+ index?'move-cur':''"
					:data-target="'move-box-' + index">
					<view class="stock-item" style="min-height: 60px;width: 100vw">
						<view class="item-row">
							<text class="label">名称：</text>
							<text class="value name">{{ account.name || '-' }}</text>
							<view style="margin-right: 20rpx; font-weight: bold;">
								<text v-if="account.enabled == '0'" style="color:red;">禁用</text>
								<text v-if="account.enabled == '1'" style="color:green;">启用</text>
							</view>
						</view>
						<view class="item-row">
							<text class="label">类型：</text>
							<text class="value">{{ account.type || '-' }}</text>
						</view>
						<view class="item-row">
							<text class="label">备注：</text>
							<text class="value">{{ account.remark || '-' }}</text>
							<text class="label">排序：</text>
							<text class="value">{{ account.sort || '-' }}</text>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
		<uni-fab ref="fab" horizontal="right" direction="horizontal" @fabClick="fabClick" />
	</view>
</template>

<script>
	import appSelect from '@/components/my-componets/appSelect.vue'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		components: {
			appSelect
		},
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				remark: '',
				name: '',
				type: '',
				inOutItem: [],
				inOutItemUrl: '/inOutItem/list',
				modalName: null,
				read: "all",
				msg1Count: "",
				msg1Title: "",
				inOutList: [{
					text: '收入',
					value: '收入'
				}, {
					text: '支出',
					value: '支出'
				}],
				inOutType: ""
			}
		},
		onLoad() {
			this.loadinfo()
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
			openinOutItemearch() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			reset() {
				this.remark = ''
				this.name = ''
				this.inOutType = ''
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
			loadinfo() {
				this.$http.get(this.inOutItemUrl, {
					params: {
						search: '{"name":"' + this.name + '","type":"' + this.inOutType + '","remark":"' + this
							.remark + '"}',
					}
				}).then(res => {
					if (res.data.code == "200" && res.data.data.rows.length != 0) {
						let result = res.data.data;
						this.inOutItem = result.rows;
					} else {
						this.$tip.error('未找到数据');
						this.inOutItem=null;
					}
				}).catch(e => {
					console.log("请求错误", e)
				})
			},
			// 搜索方法
			handleSearch() {
				if (!this.searchText.trim()) {
					this.filteredinOutItem = [...this.inOutItem];
					return;
				}
				const keyword = this.searchText.toLowerCase();
				this.filteredinOutItem = this.inOutItem.filter(account =>
					(account.name && account.name.toLowerCase().includes(keyword)));
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
				params.search = '{"name":"' + this.name + '","type":"' + this.inOutType + '","remark":"' + this.remark +
					'"}',
					//联网加载数据
					this.$http.get(this.inOutItemUrl, {
						params: params
					}).then(res => {
						if (page.num == 1) {
							this.inOutItem = []; //如果是第一页需手动制空列表
						}
						if (res.data.code == "200") {
							this.inOutItem = this.inOutItem.concat(res.data.data.rows); //追加新数据
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
			goinOutItemDetail(account) {
				this.mescroll.resetUpScroll()
				uni.navigateTo({
					url: '/pages/material/inOutItem/inOutItemInfo?inOutItem=' + encodeURIComponent(JSON.stringify(
						account)) + '&action=edit'
				});
			},
			fabClick() {
				uni.navigateTo({
					url: '/pages/material/inOutItem/inOutItemInfo?action=add'
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

	.stock-list {
		margin-top: 8px;
	}

	.stock-item {
		background: #fff;
		border-radius: 3px;
		min-height: 40px;
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