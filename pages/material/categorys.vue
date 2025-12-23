<template>
	<view><cu-custom :bgColor="NavBarColor" :isBack="true" backRouterName="material">
			<block slot="backText">返回</block>
			<block slot="content">商品类别</block>
		</cu-custom>

		<view style="align-items: center; padding: 5px; background-color: aliceblue;">
			<!-- <p>选中的ID: {{title}}</p> -->
			<tkiTreePlus ref="tkiTreePlus" :selectParent="true" :multiple="true" :range="categoryId_type" rangeKey="name"
				@confirm="treeConPlusfirm" @cancel="treeCancel"></tkiTreePlus>
		</view>
		<!-- 		<view class="category-container">
			<view v-for="parent in categoryId_type" :key="parent.id" class="category-group">
				<view class="parent-category">
					<text>{{ parent.name }}</text>
					<view class="icon-container">
						<uni-icons type="compose" @tap="goCategoryDetail(parent.id)"></uni-icons>
						<uni-icons type="trash" @tap=""></uni-icons>
					</view>
				</view>
				<view v-for="child in parent.children" :key="child.id" class="child-category">
					<text>{{ child.name }}</text>
					<view class="icon-container">
						<uni-icons class="edit-link" type="compose" @tap="goCategoryDetail(child.id)"></uni-icons>
						<uni-icons type="trash" @tap=""></uni-icons>
					</view>
				</view>
			</view>
		</view> -->
		<view>
			<view class="cu-form-group">
				<text>名称：</text>
				<input placeholder="请输入名称" name="input" v-model="categoryDetail.name"></input>
				<text>上级目录：</text>
				<input disabled="true" placeholder="请选择类别" name="input" v-model="categoryDetail.parentName"></input>
				<input hidden="true" placeholder="请选择类别" name="input" v-model="categoryDetail.parentId"></input>
				<tki-tree ref="tkitree" :selectParent="selectParent" :multiple="multiple" :range="categoryId_type"
					:foldAll="flod" rangeKey="name" @confirm="treeConfirm" @cancel="treeCancel"></tki-tree>
				<uni-icons type="settings-filled" @tap="showTree" size="30"></uni-icons>
			</view>
			<view class="cu-form-group">
				<text>编号：</text>
				<input placeholder="请输入编号" name="input" v-model="categoryDetail.serialNo"></input>
				<text>排序：</text>
				<input placeholder="请输入排序" name="input" v-model="categoryDetail.sort"></input>
			</view>
			<view class="flex-buttons">
<!-- 				<button class="cu-btn bg-green margin-sm" @tap="addCategorys">添加</button> -->
				<button class="cu-btn bg-grey margin-sm" @tap="editCategory">编辑</button>
				<button class="cu-btn bg-green margin-sm" @tap="resetSearch">重置</button>
				<button class="cu-btn bg-blue margin-sm" @tap="handleSave">保存</button>
				<button class="cu-btn bg-red margin-sm" @tap="handleDelete">删除</button>
			</view>
		</view>
	</view>
</template>

<script>
	import tkiTree from "@/components/tki-tree/tki-tree.vue";
	import tkiTreePlus from "@/components/tki-tree-plus/tki-tree.vue";
	export default {
		components: {
			tkiTree,
			tkiTreePlus
		},
		data() {
			return {
				action: '',
				title: '',
				oldMyFormData: [],
				categoryDetail: {
					id: '',
					name: '',
					serialNo: '',
					sort: '',
					remark: '',
					parentName: '',
					parentId: ''
				},
				show: false,
				multiple: false,
				flod: false,
				selectParent: true,
				categoryId_type: []
			}
		},
		onLoad: function(option) {
			this.loadCategoryIdTreeData();
		},
		methods: {
			addCategorys() {
				this.action = 'add';
				//this.categoryDetail = ''
			},
			//保存类别
			handleSave() {
				let that = this;
				let myForm = this.categoryDetail
				if (!myForm.name || myForm.name.length == 0) {
					this.$tip.alert('请输入商品名称');
					return false
				}
				if (!myForm.serialNo || myForm.serialNo.length == 0) {
					this.$tip.alert('请输入编号');
					return false
				}
				let params = {
					id: this.categoryDetail.id,
					name: this.categoryDetail.name,
					serialNo: this.categoryDetail.serialNo,
					sort: this.categoryDetail.sort,
					remark: this.categoryDetail.remark,
					parentId: this.categoryDetail.parentId,
				};
				this.$tip.loading();
				let url = '/materialCategory/add'
				if (this.action == 'edit') {
					url = '/materialCategory/update'
					this.$http.put(url, params).then(res => {
						console.log(res)
						this.$tip.loaded();
						if (res.data.code === 200) {
							this.$tip.toast('提交成功')
							this.$Router.replace({
								name: 'categorys'
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
								name: 'categorys'
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
			goCategoryDetail(id) {
				this.action = 'edit';
				let params = {
					id: id,
				}
				this.$http.get('/materialCategory/findById', {
					params: params
				}).then(res => {
					if (res.data.code == "200") {
						let result = res.data.data;
						this.categoryDetail = result;
					}
				}).catch(e => {
					console.log("请求错误", e)
				})
			},
			resetSearch() {
				this.categoryDetail = '';
				this.loadCategoryIdTreeData();
			
			},
			//materialCategory/deleteBatch?ids=39,
			//删除商品类别
			handleDelete() {
				this.$refs.tkiTreePlus._confirm();
				let id = this.title
				if (null != id) {
					let that = this
					uni.showModal({
						title: '删除商品类别',
						content: '是否删除该商品类别？',
						success: (res) => {
							if (res.confirm) {
								this.$http.delete("/materialCategory/deleteBatch?ids=" + id).then(res => {
									that.$tip.loaded();
									if (res.data.code === 200) {
										that.$tip.toast('删除成功')
										that.$Router.replace({
											name: 'categorys'
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
			editCategory()
			{
				this.$refs.tkiTreePlus._confirm();
				  // 如果没有选中项，显示树形选择器并等待用户选择
				  if (!this.title) {
				    this.$tip.toast('请先选择要编辑的类别');
				    return;
				  }
				  // 检查是否选择了多个项目
				  const selectedIds = this.title.split(",");
				  if (selectedIds.length > 1) {
					  this.$tip.toast('请选择一个类别');
				    return;
				  }

				this.action = 'edit';
				let params = {
					id: this.title
				}
				this.$http.get('/materialCategory/findById', {
					params: params
				}).then(res => {
					if (res.data.code == "200") {
						let result = res.data.data;
						this.categoryDetail = result;
					}
				}).catch(e => {
					console.log("请求错误", e)
				})
			},
			// 确定回调事件
			treeConfirm(e) {
				this.categoryDetail.parentName = e[0].name
				this.categoryDetail.parentId = e[0].id
			},
			treeConPlusfirm(selectedData) {
				for (let annItem of selectedData) {
					this.title = selectedData.map(annItem => annItem.id).join(",");
				}
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
			}
		}
	}
</script>

<style>
	.parent-category {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.icon-container {
		display: flex;
		gap: 5px;
		/* 可选：为两个图标之间添加一些间距 */
	}

	.child-category {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.cu-form-group {
		display: flex;
		align-items: center;
		padding: 10px 15px;
	}

	.cu-form-group input {
		flex: 1;
		margin-right: 10px;
	}

	.stock-item {
		background: #fff;
		padding: 3px;
		margin-bottom: 5px;
		margin-top: 5px;
		border-radius: 5px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
	}

	.item-row {
		display: flex;
		margin-bottom: 6px;
		font-size: 14px;
	}

	.category-container {
		padding: 5px;
	}

	.category-group {
		margin-bottom: 15px;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
	}

	.parent-category {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5px 5px;
		background-color: #f5f5f5;
		font-weight: bold;
	}

	.child-category {
		padding: 5px 5px 5px 20px;
		background-color: #fff;
		border-top: 1px solid #eee;
	}

	.child-category:active {
		background-color: #f0f7ff;
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
		width: 80px;
		text-align: right;
	}

	.value {
		flex: 1;
		min-width: calc(50% - 85px);
		word-break: break-all;
	}

	.flex-buttons {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
	}
</style>