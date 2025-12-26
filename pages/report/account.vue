<!-- 报表-账户统计 -->
<template>
	<view>
		<cu-custom :bgColor="NavBarColor" :isBack="true" @back="goBack">
			<block slot="backText">返回</block>
			<block slot="content">账户统计</block>
		</cu-custom>
		<scroll-view>
			<view class="action">
				<view class="search-box" >
					<text>本月：{{accountStatistics.allMonthAmount}}</text>
					<text>总余额：{{accountStatistics.allCurrentAmount}}</text>
					<uni-icons type="search" @tap="openAccountSearch" size="25" style='margin-right: 5px;'></uni-icons>
				</view>
				<uni-popup ref="popup" style="z-index: 20; margin: 0 auto;height: 800px;" type="right">
					<view style="height: 800px; width: 200px;float: right;">
						<form style="height: 800px;">
							<view class="cu-form-group" style="margin-top:60px;">
								<view class="title">账户名称</view>
								<input placeholder="名称" v-model="accountName" name="input"></input>
								<uni-icons type="scan" @tap="showScan" size="20"></uni-icons>
							</view>
							<view class="cu-form-group">
								<view class="title">账户编号</view>
								<input placeholder="编号" v-model="accountNo" name="input"></input>
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
			<view class="account-list" :style="[{animation: 'show 0.5s 1'}]">
				<view class="account-item" v-for="account in accountSum" :key="account.name">
					<view class="item-row">
						<text class="label">名称：</text>
						<text class="value name">{{ account.name || '-' }}</text>
						<text class="label">编号：</text>
						<text class="value">{{ account.serialNo || '-' }}</text>
					</view>
					<view class="item-row">
						<text class="label">期初金额：</text>
						<text class="value">¥{{account.initialAmount.toFixed(2) || '-' }}</text>
						<text class="label">本月发生额：</text>
						<text class="value">¥{{account.thisMonthAmount || '-' }}</text>

					</view>
					<view class="item-row">
						<text class="label">当前余额：</text>
						<text class="value">¥{{account.currentAmount.toFixed(2) || '-' }}</text>
					</view>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				accountSum: [],
				accountStatistics: [],
				accountName: '',
				accountNo: '',
				accountUrl: '/account/listWithBalance',
				SumStatistics: '/account/getStatistics'
			}
		},
		onLoad() {
			this.loadinfo()
		},
		methods: {
			openAccountSearch() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			reset() {
				this.accountName = ''
				this.accountNo = ''
				this.loadinfo()
			},
			confirm() {
				this.loadinfo()
				this.$refs.popup.close()
			},
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
			loadinfo() {
				let params = {
					currentPage: 1,
					pageSize: 10,
					name: '',
					serialNo: ''
				}
				if (this.accountName) {
					params.name = this.accountName
				}
				if (this.accountNo) {
					params.serialNo = this.accountNo
				}
				//账户列表
				this.$http.get(this.accountUrl, {
					params: params
				}).then(res => {
					if (res.data.code == "200") {
						let result = res.data.data;
						this.accountSum = result.rows;
					}
				}).catch(e => {
					console.log("请求错误", e)
				})
				//汇总统计
				this.$http.get(this.SumStatistics, {
					params: params
				}).then(res => {
					if (res.data.code == "200") {
						let result = res.data.data;
						this.accountStatistics = result;
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
		align-items: center;
		background: #ffffff;
		border-bottom: 1px solid #eee;
		text-align:center;
		font-weight: bold; 
		padding-left: 50px;
		color: #000000;
	}

	/* 搜索图标样式 */
	.uni-icons {
		padding: 3px;
	}

	.account-list {
		margin-top: 8px;
	}

	.account-item {
		background: #fff;
		border-radius: 3px;
		margin-bottom: 5px;
		min-height: 65px;
		width: 100vw;
		
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
		min-width: calc(50% - 85px);
		word-break: break-all;
	}

	.name {
		font-weight: bold;
		color: #007aff;
	}
</style>