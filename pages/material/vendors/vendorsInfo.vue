<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true" backRouterName="vendors">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<form>
			<view class="cu-form-group">
				<view class="title">名称</view>
				<input placeholder="请输入名称" name="input" v-model="myFormData.supplier"></input>
				<text placeholder="ID" name="input" v-model="myFormData.id"></text>
			</view>
			<view class="cu-form-group">
				<text class="title">联系人：</text>
				<input placeholder="请输入联系人" name="input" v-model="myFormData.contacts"></input>
				<text class="title">电话：</text>
				<input placeholder="请输入电话" name="input" v-model="myFormData.telephone"></input>
			</view>
			<view class="cu-form-group">
				<text class="title">电子邮箱：</text>
				<input placeholder="请输入电子邮箱" name="input" v-model="myFormData.email"></input>
			</view>
			<view class="cu-form-group">
				<text class="title">银行开户行：</text>
				<input placeholder="请输入开户行" name="input" v-model="myFormData.bankName"></input>
			</view>
			<view class="cu-form-group">
				<text class="title">银行账号：</text>
				<input placeholder="请输入银行账号" name="input" v-model="myFormData.accountNumber"></input>
			</view>
			<view class="cu-form-group">
				<text class="title">地址：</text>
				<input placeholder="请输入地址" name="input" v-model="myFormData.address"></input>
			</view>
			<view class="cu-form-group">
				<text class="title">备注：</text>
				<input placeholder="请输入备注" name="input" v-model="myFormData.description"></input>
			</view>
		</form>
		<view class="footer fixed">
			<button class="cu-btn bg-red margin-lg flex-sub" @tap="handleDelete">删除</button>
			<button v-if="myFormData.enabled == '1'" class="cu-btn bg-grey margin-lg flex-sub"
				@tap="batchSetStatus(0)">禁用</button>
			<button v-if="myFormData.enabled == '0'" class="cu-btn bg-grey margin-lg flex-sub"
				@tap="batchSetStatus(1)">启用</button>
			<button class="cu-btn bg-green margin-lg flex-sub" @tap="handleSave">保存</button>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				title: '',
				SetStatusUrl: '/supplier/batchSetStatus',
				oldMyFormData: [],
				myFormData: {
					id: '',
					vendor: ''
				}
			}
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
			let vendorInfo;
			if (option && option.vendors) {
				vendorInfo = JSON.parse(decodeURIComponent(option.vendors));
			}
			let oldMyFormData;
			if (option && option.myFormData) {
				oldMyFormData = JSON.parse(decodeURIComponent(option.myFormData));
				oldMyFormData = JSON.parse(decodeURIComponent(oldMyFormData));
			}
			if (action == 'edit') {
				this.title = '编辑供应商信息'
				if (!selected) {
					this.loadRetailListData(vendorInfo, selected);
					this.$nextTick(() => {
						this.myFormData = vendorInfo
						this.myFormData.id = vendorInfo.id == undefined ? "" : vendorInfo.id
					})

				} else {
					if (oldMyFormData) {
						this.myFormData.id = oldMyFormData.id
						if (oldMyFormData.operTimeStr) {
							oldMyFormData.operTime = oldMyFormData.operTimeStr
						}
						oldMyFormData.id = oldMyFormData.id + ""
						this.loadRetailListData(oldMyFormData, selected);
					} else {
						this.loadRetailListData();
					}
				}
			}
			else{
				
			}
		},
		methods: {
			loadRetailListData(oldMyFormData, selected) {
				let that = this;
			},
			//状态是否禁用，启用
			batchSetStatus(v) {
				let id = this.myFormData.id
				if (null != id) {
					let that = this
					this.$http.post(this.SetStatusUrl, {
						status: v,
						ids: id + ','
					}).then(res => {
						that.$tip.loaded();
						if (res.data.code === 200) {
							that.$tip.toast('修改成功！')
							that.$Router.replace({
								name: 'vendors'
							})
						}
					}).catch(() => {
						that.$tip.loaded();
						that.$tip.error('修改失败！')
					});
				}
			},
			handleSave() {},
			//删除供应信息
			handleDelete() {
				let id = this.myFormData.id
				if (null != id) {
					let that = this
					uni.showModal({
						title: '删除供应商',
						content: '是否删除该供应商数据？',
						success: (res) => {
							if (res.confirm) {
								this.$http.delete("/vendor/deleteBatch?ids=" + id).then(res => {
									that.$tip.loaded();
									if (res.data.code === 200) {
										that.$tip.toast('删除成功')
										that.$Router.replace({
											name: 'vendors'
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
		}
	}
</script>

<style>
	footer.fixed {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		display: flex;
		justify-content: space-around;
		background-color: #fff;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
	}
</style>