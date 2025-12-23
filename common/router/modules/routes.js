const routes = [{
		path: "/pages/login/login",
		name: 'login',
		meta: {
			title: '登录',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/index/index',
		name: 'index',
		meta: {
			title: '主页',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/home/home',
		// aliasPath:'/',  //对于h5端你必须在首页加上aliasPath并设置为/
		name: 'home',
		meta: {
			title: '首页',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/material',
		name: 'material',
		meta: {
			title: '资料',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/goods/goods',
		name: 'goods',
		meta: {
			title: '商品管理',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/goods/goodsInfo',
		name: 'goodsInfo',
		meta: {
			title: '商品管理明细',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/goods/goodsModel',
		name: 'goodsModel',
		meta: {
			title: '新增商品',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/depot',
		name: 'depot',
		meta: {
			title: '仓库管理',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/vendors/vendors',
		name: 'vendors',
		meta: {
			title: '供应商管理',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/vendors/vendorsInfo',
		name: 'vendorsInfo',
		meta: {
			title: '供应商管理明细',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/vendors/vendorsAdd',
		name: 'vendorsAdd',
		meta: {
			title: '编辑供应商',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/accounts',
		name: 'accounts',
		meta: {
			title: '账户管理',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/members',
		name: 'members',
		meta: {
			title: '会员管理',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/customers',
		name: 'customers',
		meta: {
			title: '客户管理',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/categorys',
		name: 'categorys',
		meta: {
			title: '商品分类管理',
		},
	},
	// {
	//     //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
	//     path: '/pages/material/goods/goodsModel',
	//     name: 'goodsModel',
	//       meta: {
	//           title: '新增商品',
	//       },
	// },

	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/unites',
		name: 'unites',
		meta: {
			title: '单位管理',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/unites/unitesAdd',
		name: 'unitesAdd',
		meta: {
			title: '单位编辑',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/multiAttribute',
		name: 'multiAttribute',
		meta: {
			title: '多属性管理',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/multiAttribute/multiAttributeModel',
		name: 'multiAttributeModel',
		meta: {
			title: '多属性编辑',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/customers/customers',
		name: 'customers',
		meta: {
			title: '客户管理',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/customers/customersAdd',
		name: 'customersAdd',
		meta: {
			title: '客户供应商',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/members/members',
		name: 'members',
		meta: {
			title: '会员管理',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/members/membersAdd',
		name: 'membersAdd',
		meta: {
			title: '编辑会员',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/inOutItemList',
		name: 'inOutItemList',
		meta: {
			title: '收支管理',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/inOutItemList/inOutItemModel',
		name: 'inOutItemModel',
		meta: {
			title: '编辑收支',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/depot/depotAdd',
		name: 'depotAdd',
		meta: {
			title: '编辑仓库',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/accounts/accounts',
		name: 'accounts',
		meta: {
			title: '账户管理',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/accounts/accountsAdd',
		name: 'accountsAdd',
		meta: {
			title: '编辑账户',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/person',
		name: 'person',
		meta: {
			title: '经办人管理',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/log',
		name: 'log',
		meta: {
			title: '日志管理',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/person/personAdd',
		name: 'personAdd',
		meta: {
			title: '编辑经办人',
		},
	},	
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/user/user',
		name: 'user',
		meta: {
			title: '用户管理',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/role/role',
		name: 'role',
		meta: {
			title: '角色管理',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/role/roleAdd',
		name: 'roleAdd',
		meta: {
			title: '编辑角色',
		},
	},

	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/material/goods/goodsDetail/goodsDetail',
		name: 'goodsDetail',
		meta: {
			title: '新增商品明细',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/openorder',
		name: 'openorder',
		meta: {
			title: '开单',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/retailOut/retailOut',
		name: 'retailOut',
		meta: {
			title: '零售出库',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/retailOut/retailOutModel',
		name: 'retailOutModel',
		meta: {
			title: '零售出库编辑',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/retailOut/goodsSelect',
		name: 'goodsSelect',
		meta: {
			title: '商品选择',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/retailBackOut/retailBackOut',
		name: 'retailBackOut',
		meta: {
			title: '零售退货',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/retailBackOut/retailBackOutModel',
		name: 'retailBackOutModel',
		meta: {
			title: '零售退货编辑',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/retailBackOut/goodsSelect',
		name: 'retailBackOutGoodsSelect',
		meta: {
			title: '零售退货商品选择',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/purchaseOrder/purchaseOrder',
		name: 'purchaseOrder',
		meta: {
			title: '采购订单',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/purchaseOrder/purchaseOrderModel',
		name: 'purchaseOrderModel',
		meta: {
			title: '采购订单编辑',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/purchaseOrder/goodsSelect',
		name: 'purchaseOrderGoodsSelect',
		meta: {
			title: '采购订单商品选择',
		},
	}, {
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/purchaseIn/purchaseIn',
		name: 'purchaseIn',
		meta: {
			title: '采购入库',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/purchaseIn/purchaseInModel',
		name: 'purchaseInModel',
		meta: {
			title: '采购入库编辑',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/purchaseIn/goodsSelect',
		name: 'purchaseInGoodsSelect',
		meta: {
			title: '采购入库商品选择',
		},
	}, {
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/purchaseInBack/purchaseInBack',
		name: 'purchaseInBack',
		meta: {
			title: '采购退货',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/purchaseInBack/purchaseInBackModel',
		name: 'purchaseInBackModel',
		meta: {
			title: '采购退货编辑',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/purchaseInBack/goodsSelect',
		name: 'purchaseInBackGoodsSelect',
		meta: {
			title: '采购入库商品选择',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/saleOrder/saleOrder',
		name: 'saleOrder',
		meta: {
			title: '销售订单',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/saleOrder/saleOrderModel',
		name: 'saleOrderModel',
		meta: {
			title: '销售订单编辑',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/saleOrder/goodsSelect',
		name: 'saleOrderGoodsSelect',
		meta: {
			title: '销售订单商品选择',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/saleOut/saleOut',
		name: 'saleOut',
		meta: {
			title: '销售出库',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/saleOut/saleOutModel',
		name: 'saleOutModel',
		meta: {
			title: '销售出库编辑',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/saleOut/goodsSelect',
		name: 'saleOutGoodsSelect',
		meta: {
			title: '销售出库商品选择',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/saleBack/saleBack',
		name: 'saleBack',
		meta: {
			title: '销售退货',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/saleBack/saleBackModel',
		name: 'saleBackModel',
		meta: {
			title: '销售退货编辑',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/saleBack/goodsSelect',
		name: 'saleBackGoodsSelect',
		meta: {
			title: '销售退货商品选择',
		},
	}, {
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/otherIn/otherIn',
		name: 'otherIn',
		meta: {
			title: '其他入库',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/otherIn/otherInModel',
		name: 'otherInModel',
		meta: {
			title: '其他入库编辑',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/otherIn/goodsSelect',
		name: 'otherInGoodsSelect',
		meta: {
			title: '其他入库商品选择',
		},
	}, {
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/otherOut/otherOut',
		name: 'otherOut',
		meta: {
			title: '其它出库',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/otherOut/otherOutModel',
		name: 'otherOutModel',
		meta: {
			title: '其它出库编辑',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/otherOut/goodsSelect',
		name: 'otherOutGoodsSelect',
		meta: {
			title: '其它出库商品选择',
		},
	}, {
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/allocationOut/allocationOut',
		name: 'allocationOut',
		meta: {
			title: '调拨出库',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/allocationOut/allocationOutModel',
		name: 'allocationOutModel',
		meta: {
			title: '调拨出库编辑',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/allocationOut/goodsSelect',
		name: 'allocationOutGoodsSelect',
		meta: {
			title: '调拨出库商品选择',
		},
	}, {
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/itemIn/itemIn',
		name: 'itemIn',
		meta: {
			title: '收入',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/itemIn/itemInModel',
		name: 'itemInModel',
		meta: {
			title: '收入编辑',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/itemOut/itemOut',
		name: 'itemOut',
		meta: {
			title: '支出',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/itemOut/itemOutModel',
		name: 'itemOutModel',
		meta: {
			title: '支出编辑',
		},
	}, {
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/moneyIn/moneyIn',
		name: 'moneyIn',
		meta: {
			title: '收款',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/moneyIn/moneyInModel',
		name: 'moneyInModel',
		meta: {
			title: '收款编辑',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/moneyIn/arrearsSelect',
		name: 'arrearsSelect',
		meta: {
			title: '收款单欠款选择',
		},
	}, {
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/moneyOut/moneyOut',
		name: 'moneyOut',
		meta: {
			title: '付款',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/moneyOut/moneyOutModel',
		name: 'moneyOutModel',
		meta: {
			title: '付款编辑',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/moneyOut/arrearsSelect',
		name: 'moneyOutarrearsSelect',
		meta: {
			title: '付款单欠款选择',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/giro/giro',
		name: 'giro',
		meta: {
			title: '转账单',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/giro/giroModel',
		name: 'giroModel',
		meta: {
			title: '转账单编辑',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/advanceIn/advanceIn',
		name: 'advanceIn',
		meta: {
			title: '收预付款',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/openorder/advanceIn/advanceInModel',
		name: 'advanceInModel',
		meta: {
			title: '收预付款编辑',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/report/report',
		name: 'report',
		meta: {
			title: '报表',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/report/material_stock',
		name: 'material_stock',
		meta: {
			title: '商品库存',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/report/buyin',
		name: 'buyin',
		meta: {
			title: '采购统计',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/report/retailout',
		name: 'retailout',
		meta: {
			title: '零售统计',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/report/account',
		name: 'account',
		meta: {
			title: '账户统计',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/report/saleout',
		name: 'saleout',
		meta: {
			title: '销售统计',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/report/indetail',
		name: 'indetail',
		meta: {
			title: '入库明细',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/report/outdetail',
		name: 'outdetail',
		meta: {
			title: '出库明细',
		},
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/report/allocationdetail',
		name: 'allocationdetail',
		meta: {
			title: '调拨统计',
		},
	}, {
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/report/inmaterialcount',
		name: 'inmaterialcount',
		meta: {
			title: '入库汇总',
		},
	}, {
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/report/outmaterialcount',
		name: 'outmaterialcount',
		meta: {
			title: '出库汇总',
		},
	}, {
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/report/inoutstockreport',
		name: 'inoutstockreport',
		meta: {
			title: '进销存统计',
		},
	}, {
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/report/customeraccount',
		name: 'customeraccount',
		meta: {
			title: '客户对账',
		},
	}, {
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/report/vendoraccount',
		name: 'vendoraccount',
		meta: {
			title: '供应商对账',
		},
	}, {
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/report/stockwarningreport',
		name: 'stockwarningreport',
		meta: {
			title: '库存预警',
		},
	},
	{
		path: '/pages/user/people',
		name: 'people',
		meta: {
			title: '个人中心',
		},
	},
	{
		path: '/pages/user/userdetail',
		name: 'userdetail',
		meta: {
			title: '个人详情',
		},
	},
	{
		path: '/pages/user/useredit',
		name: 'useredit',
		meta: {
			title: '个人编辑',
		},
	},
	{
		path: '/pages/user/userexit',
		name: 'userexit',
		meta: {
			title: '退出',
		},
	},
	{
		path: '/pages/user/about',
		name: 'about',
		meta: {
			title: '关于',
		},
	},
	{
		path: '/pages/common/exit',
		name: 'exit',
		meta: {
			title: '退出',
		},
	},
	{
		path: '/pages/user/userpwedit',
		name: 'userpwedit',
		meta: {
			title: '修改密码',
		},
	},
	{
		path: '/pages/common/success',
		name: 'success',
		meta: {
			title: 'success',
		},
	}, {
		path: '/pages/addressbook/address-book',
		name: 'addressBook',
		meta: {
			title: 'addressBook',
		},
	},
	{
		path: '/pages/addressbook/level-address-book',
		name: 'levelAddressBook',
		meta: {
			title: 'levelAddressBook',
		},
	},
	{
		path: '/pages/addressbook/member',
		name: 'member',
		meta: {
			title: 'member',
		},
	},
	{
		path: '/pages/addressbook/address-detail',
		name: 'addressDetail',
		meta: {
			title: 'addressDetail',
		},
	},
	{
		path: '/pages/annotation/annotationList',
		name: 'annotationList',
		meta: {
			title: '通知公告',
		},
	},
	{
		path: '/pages/annotation/annotationDetail',
		name: 'annotationDetail',
		meta: {
			title: '通知详情',
		},
	},
	{
		path: '/pages/common/helloWorld',
		name: 'helloWorld',
		meta: {
			title: 'helloWorld',
		},
	},
]
export default routes