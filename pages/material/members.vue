<!-- 资料-会员管理 -->
<template>
	<view> <cu-custom :bgColor="NavBarColor" :isBack="true" backRouterName="material">
			<block slot="backText">返回</block>
			<block slot="content">会员管理</block>
		</cu-custom>
		<view class="search-box">
			<view class="input-row">
				<input class="search-input" placeholder="请输入会员卡号查询" v-model="name" @confirm="confirm" />
				<uni-icons type="scan" size="25" @tap="showScan"></uni-icons>
				<uni-icons type="search" @tap="openMemberSearch" size="25" style='margin-right: 5px;'></uni-icons>
			</view>
		</view>
		<uni-popup ref="popup" style="z-index: 20; margin: 0 auto;height: 800px;" type="right">
			<view style="height: 800px; width: 100%;float: right;">
				<form style="height: 800px;">
					<view class="cu-form-group" style="margin-top:60px;">
						<view class="title">会员卡号：</view>
						<input prefix-icon="search" placeholder="请输入会员卡号查询" v-model="name" />
					</view>
					<view class="cu-form-group">
						<view class="title">手机号码：</view>
						<view>
							<input prefix-icon="search" placeholder="请输入手机号码查询" v-model="telephone" />
						</view>
					</view>
					<view class="cu-form-group">
						<view class="title">联系电话：</view>
						<view>
							<input prefix-icon="search" placeholder="请输入联系电话查询" v-model="phonenum" />
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
		<view class="stock-list" style="[{animation: 'show 0.5s 1'}]">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" :top="top" @down="downCallback" @up="upCallback">
				<view
					class="message_text bg-white cu-item flex justify-around align-center solid-bottom margin-bottom-sm margin-top-sm"
					style="width: 100vw;" v-for="(member,index) in members" :key="index"
					:class="modalName=='move-box-'+ index?'move-cur':''" :data-target="'move-box-' + index">
					<view class="suppliers-item" style="min-height: 100px;width: 100vw">
						<view class="suppliers-row">
							<text class="label">名称：</text>
							<text class="value name">{{ member.supplier || '-' }}</text>
							<view style="margin-right: 20rpx; font-weight: bold;">
								<text v-if="member.enabled == '0'" style="color:red;">禁用</text>
								<text v-if="member.enabled == '1'" style="color:green;">启用</text>
							</view>
						</view>
						<view class="suppliers-row">
							<text class="label">联系人：</text>
							<text class="value">{{ member.contacts || '-' }}</text>
						</view>
						<view class="suppliers-row">
							<text class="label">联系电话：</text>
							<text class="value">{{ member.phoneNum}}</text>
							<text class="label">手机号码：</text>
							<text class="value">{{member.telephone || '-' }}</text>
						</view>
						<view class="suppliers-row">
							<text class="label">电子邮箱：</text>
							<text class="value">{{ member.email || '-' }}</text>
						</view>
						<view class="suppliers-row">
							<text class="label">备注：</text>
							<text class="value">{{ member.description || '-' }}</text>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
		<uni-fab ref="fab" horizontal="right" direction="horizontal" @fabClick="fabClick" />
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {

				telephone: '',
				name: '',
				phonenum: '',
				members: [],
				membersUrl: '/supplier/list',
				modalName: null,
				read: "all",
				msg1Count: "",
				msg1Title: ""
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
			openMemberSearch() {
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
				this.$http.get(this.membersUrl, {
					params: {
						search: JSON.stringify({
							supplier: this.name,
							telephone: this.telephone,
							phonenum: this.phonenum,
							type: "会员"
						})
					},
				}).then(res => {
					if (res.data.code == "200" && res.data.data.rows.length != 0) {
						let result = res.data.data;
						this.members = result.rows;
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
					this.filteredmembers = [...this.members];
					return;
				}
				const keyword = this.name.toLowerCase();
				this.filteredmembers = this.members.filter(member =>
					(member.name && member.name.toLowerCase().includes(keyword)));
			},
			resetSearch() {
				this.name = '';
				this.telephone = '';
				this.phonenum = '';
				this.loadinfo(); // 重新加载数据

			},
			upCallback(page) {
				let params = {
					currentPage: page.num,
					pageSize: page.size
				}
				params.search = JSON.stringify({
						supplier: this.name,
						telephone: this.telephone,
						phonenum: this.phonenum,
						type: "会员"
					}),
					//联网加载数据
					this.$http.get(this.membersUrl, {
						params: params
					}).then(res => {
						if (page.num == 1) {
							this.members = []; //如果是第一页需手动制空列表
						}
						if (res.data.code == "200") {
							this.members = this.members.concat(res.data.data.rows); //追加新数据
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

	.suppliers-row {
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