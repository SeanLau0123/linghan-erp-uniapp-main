<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true" backRouterName="goods">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<form>
			<view class="cu-form-group name-with-img">
				<view class="name-id-container">
					<view class="name-item">
						<view class="form-label">名称：</view>
						<input placeholder="请输入商品名称" name="input" v-model="myFormData.name" class="form-input"></input>
						<text placeholder="ID" name="input" v-model="myFormData.id"></text>
					</view>
				</view>
				<view class="img-wrapper">
					<image class="goods-img" :src="myFormData.otherField3 || '/static/default-goods.png'"
						mode="aspectFill" @tap="previewGoodsImage"></image>
					<!-- 图片为空提示（行内适配） -->
					<text class="img-empty-tip" v-if="!myFormData.otherField3">无图</text>
				</view>
			</view>

<!-- 			<view class="cu-form-group">
				<view>名称：</view>
				<input placeholder="请输入商品名称" name="input" v-model="myFormData.name"></input>
				<text placeholder="ID" name="input" v-model="myFormData.id"></text>
			</view> -->
			<view class="cu-form-group">
				<text>单位：</text>
				<input placeholder="请输入单位" name="input" v-model="myFormData.unit"></input>
				<text>类别：</text>
				<input disabled="true" placeholder="请选择类别" name="input" v-model="myFormData.categoryName"></input>
				<input hidden="true" placeholder="请选择类别" name="input" v-model="myFormData.categoryId"></input>
				<tki-tree ref="tkitree" :selectParent="selectParent" :multiple="multiple" :range="categoryId_type"
					:foldAll="flod" rangeKey="name" @confirm="treeConfirm" @cancel="treeCancel"></tki-tree>
				<uni-icons type="settings-filled" @tap="showTree" size="30"></uni-icons>
			</view>
			<view class="cu-form-group">
				<text>采购价：</text>
				<input placeholder="请输入采购价" name="input" v-model="myFormData.purchaseDecimal"></input>
				<text>零售价：</text>
				<input placeholder="请输入零售价" name="input" v-model="myFormData.commodityDecimal"></input>
			</view>
			<view class="cu-form-group">
				<text>销售价：</text>
				<input placeholder="请输入销售价" name="input" v-model="myFormData.wholesaleDecimal"></input>
				<text>最低售价：</text>
				<input placeholder="请输入最低售价" name="input" v-model="myFormData.lowDecimal"></input>
			</view>
			<view class="cu-form-group">
				<text>条码：</text>
				<input placeholder="请输入条码" name="input" v-model="myFormData.mBarCode"></input>
				<uni-icons type="scan" size="25" @tap="showScan"></uni-icons>
				<text>库存数量：</text>
				<input placeholder="请输入库存数量" name="input" v-model="myFormData.stock"></input>
			</view>
		</form>
		<view class="footer fixed">
			<button v-if="action== 'edit'" class="cu-btn bg-red margin-lg flex-sub" @tap="handleDelete">删除</button>
			<button v-if="myFormData.enabled == '1'" class="cu-btn bg-grey margin-lg flex-sub"
				@tap="batchSetStatus(0)">禁用</button>
			<button v-if="myFormData.enabled == '0'" class="cu-btn bg-grey margin-lg flex-sub"
				@tap="batchSetStatus(1)">启用</button>
			<button class="cu-btn bg-green margin-lg flex-sub" @tap="handleSave">保存</button>
		</view>
	</view>

</template>

<script>
	import tkiTree from "@/components/tki-tree/tki-tree.vue"
	export default {
		components: {
			tkiTree
		},
		data() {
			return {
				title: '',
				action: '',
				SetStatusUrl: '/material/batchSetStatus',
				oldMyFormData: [],
				myFormData: {
					id: '',
					name: '',
					categoryName: '',
					categoryId: '',
					meList: [],
					mId: '',
					otherField3: ''
				},
				multiple: false,
				flod: false,
				selectParent: true,
				categoryId_type: []
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
			let goodInfo;
			if (option && option.goods) {
				goodInfo = JSON.parse(decodeURIComponent(option.goods));
			}
			let oldMyFormData;
			if (option && option.myFormData) {
				oldMyFormData = JSON.parse(decodeURIComponent(option.myFormData));
				oldMyFormData = JSON.parse(decodeURIComponent(oldMyFormData));
			}
			this.loadCategoryIdTreeData();
			if (action == 'edit') {
				this.title = '编辑商品信息'
				if (!selected) {
					this.loadRetailListData(goodInfo, selected);
					this.$nextTick(() => {
						this.myFormData = goodInfo
						this.myFormData.id = goodInfo.id == undefined ? "" : goodInfo.id
						this.getMaterialsExtendId();
					})

				} else {
					if (oldMyFormData) {
						this.myFormData.id = oldMyFormData.id
						oldMyFormData.id = oldMyFormData.id + ""
						this.loadRetailListData(oldMyFormData, selected);
					} else {
						this.loadRetailListData();
					}
				}
			} else {
				this.title = '新增商品信息'
				this.getMaxBarCode();
			}
		},
		methods: {
			// 新增：图片预览方法
			previewGoodsImage() {
				// 判断图片地址是否存在
				if (!this.myFormData.otherField3) {
					this.$tip.toast('暂无图片可预览');
					return;
				}
				// 调用uni-app图片预览API
				uni.previewImage({
					current: this.myFormData.otherField3, // 当前显示图片的链接
					urls: [this.myFormData.otherField3], // 需要预览的图片链接列表
					success: (res) => {
					},
					fail: (err) => {
						console.error('图片预览失败', err);
						this.$tip.toast('图片预览失败');
					}
				});
			},
			showScan() {
				// 允许从相机和相册扫码
				let code;
				let that = this;
				uni.scanCode({
					success: function(res) {
						myFormData.mBarCode = res.result
					}
				});
			},
			loadRetailListData(oldMyFormData, selected) {
				let that = this;
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
			//加载商品类别
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
			//获取最大条码
			getMaxBarCode() {
				this.$http.get("/material/getMaxBarCode").then(res => {
					if (res.data.code == "200") {
						this.myFormData.mBarCode = String(Number(res.data.data.barCode) + 1);
					}
				})
			},
			//获取价格扩展表
			getMaterialsExtendId() {
				let params = {
					materialId: this.myFormData.id,
				}
				this.$http.get("/materialsExtend/getDetailList", {
					params: params
				}).then(res => {
					if (res.data.code == "200") {
						if (res.data.data.rows && res.data.data.rows.length > 0) {
							this.myFormData.mId = res.data.data.rows[0].id;
						} else {
							console.warn('rows数组为空或未定义');
						}
					}
				})
			},
			/*状态是否禁用，启用*/
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
								name: 'goods'
							})
						}
					}).catch(() => {
						that.$tip.loaded();
						that.$tip.error('修改失败！')
					});
				}
			},
			//新增修改提交
			handleSave() {
				let that = this;
				let myForm = this.myFormData
				if (!myForm.name || myForm.name.length == 0) {
					this.$tip.alert('请输入商品名称');
					return false
				}
				if (!myForm.unit || myForm.unit.length == 0) {
					this.$tip.alert('请输入单位');
					return false
				}
				if (!myForm.categoryId || myForm.categoryId.length == 0) {
					this.$tip.alert('请选择类别');
					return false
				}
				let params = {
					id: this.myFormData.id,
					name: this.myFormData.name,
					unit: this.myFormData.unit,
					categoryId: this.myFormData.categoryId,
					meList: [{
						id: this.myFormData.mId,
						commodityUnit: this.myFormData.unit,
						barCode: this.myFormData.mBarCode,
						purchaseDecimal: this.myFormData.purchaseDecimal,
						commodityDecimal: this.myFormData.commodityDecimal,
						wholesaleDecimal: this.myFormData.wholesaleDecimal,
						lowDecimal: this.myFormData.lowDecimal
					}],
					stock: [{
						id: "14",
						initStock: this.myFormData.stock
					}]
				};
				this.$tip.loading();
				let url = '/material/add'
				if (this.action == 'edit') {
					url = '/material/update'
					this.$http.put(url, params).then(res => {
						console.log(res)
						this.$tip.loaded();
						if (res.data.code === 200) {
							this.$tip.toast('提交成功')
							this.$Router.replace({
								name: 'goods'
							})
						} else {
							this.$tip.error(res.data.data.message)
						}
					}).catch(() => {
						this.$tip.loaded();
						this.$tip.error('提交失败')
					});
				} else {
					this.$http.post(url, params).then(res => {
						this.$tip.loaded();
						if (res.data.code === 200) {
							this.$tip.toast('提交成功')
							this.$Router.replace({
								name: 'goods'
							})
						} else {
							this.$tip.error(res.data.data.message)
						}
					}).catch(() => {
						this.$tip.loaded();
						this.$tip.error('提交失败')
					});
				}
			},
			//删除商品信息
			handleDelete() {
				let id = this.myFormData.id
				if (null != id) {
					let that = this
					uni.showModal({
						title: '删除商品',
						content: '是否删除该商品数据？',
						success: (res) => {
							if (res.confirm) {
								this.$http.delete("/material/delete?id=" + id).then(res => {
									that.$tip.loaded();
									if (res.data.code === 200) {
										that.$tip.toast('删除成功')
										that.$Router.replace({
											name: 'goods'
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
	
	/* 新增：名称+图片组合布局 */
	.name-with-img {
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;
		gap: 10rpx; /* 图片与名称区域的间距 */
	}
	
	/* 图片容器样式 */
	.img-wrapper {
		position: relative;
	}
	
	/* 行内商品图片样式（适配名称排高度） */
	.goods-img {
		width: 100rpx;
		height: 100rpx;
		border-radius: 8rpx;
		border: 1rpx solid #eee;
	}
	
	/* 图片为空提示（行内紧凑显示） */
	.img-empty-tip {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 20rpx;
		color: #999;
		background: #f5f5f5;
		padding: 5rpx 5rpx;
		border-radius: 4rpx;
	}
	
	/* 名称+ID容器样式 */
	.name-id-container {
		flex: 1; /* 占满剩余宽度 */
		display: flex;
		flex-direction: column;
	}
	/* 名称/ID项布局 */
	.name-item, .id-item {
		display: flex;
		align-items: center;
	}
</style>