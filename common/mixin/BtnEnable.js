/**
 * 下了列表混入
 * @type {{data(): *, methods: {upCallback(*): void, downCallback(): void, loadList(*): void}}}
 */
const ListBtnEnable = {
	data() {
		return {
			btnEnableList: ''
		}
	},
  created() {
	  //初始化按钮权限
	  this.initActiveBtnStr();
  },
	methods: { 
		/* 按钮权限 */
		    initActiveBtnStr() {
			  let btnStrList=uni.getStorageSync("winBtnStrList");
		      this.btnEnableList = ""; //按钮列表
			   var pages = getCurrentPages() // 获取栈实例
			   let currentPage = pages[pages.length-1]['$page']['fullPath'] //当前页面路径(带参数)
		      let pathName = '#' + currentPage
		      pathName = this.urlList(pathName)
			  if (pathName && btnStrList) {
		        for (let i = 0; i < btnStrList.length; i++) {
		          if (btnStrList[i].url === pathName) {
		            if (btnStrList[i].btnStr) {
		              this.btnEnableList = btnStrList[i].btnStr;
		            }
		          }
		        }
		      }
		    },
			urlList(page){
				let url
				if(page.startsWith("#/pages/openorder/retailOut/retailOutModel")){
					url = "/bill/retail_out"
				}
				 if(page.startsWith("#/pages/openorder/retailBackOut/retailBackOutModel")){
				 	url = "/bill/retail_back"
				 }
				 if(page.startsWith("#/pages/openorder/purchaseOrder/purchaseOrderModel")){
					url = "/bill/purchase_order"
				 }
				if(page.startsWith("#/pages/openorder/purchaseIn/purchaseInModel")){
					url = "/bill/purchase_in"
				}
				 if(page.startsWith("#/pages/openorder/purchaseInBack/purchaseInBackModel")){
				 	url = "/bill/purchase_back"
				 }
				if(page.startsWith("#/pages/openorder/saleOrder/saleOrderModel")){
					url = "/bill/sale_order"
				}
				if(page.startsWith("#/pages/openorder/saleOut/saleOutModel")){
					url = "/bill/sale_out"
				}
				if(page.startsWith("#/pages/openorder/saleBack/saleBackModel")){
					url = "/bill/sale_back"
				}
				if(page.startsWith("#/pages/openorder/otherIn/otherInModel")){
					url = "/bill/other_in"
				}
				if(page.startsWith("#/pages/openorder/otherOut/otherOutModel")){
					url = "/bill/other_out"
				}
				if(page.startsWith("#/pages/openorder/allocationOut/allocationOutModel")){
					url = "/bill/allocation_out"
				}
				if(page.startsWith("#/pages/openorder/itemIn/itemInModel")){
					url = "/financial/item_in"
				}
				if(page.startsWith("#/pages/openorder/itemOut/itemOutModel")){
					url = "/financial/item_out"
				}
				if(page.startsWith("#/pages/openorder/moneyIn/moneyInModel")){
					url = "/financial/money_in"
				}
				if(page.startsWith("#/pages/openorder/moneyOut/moneyOutModel")){
					url = "/financial/money_out"
				}
				if(page.startsWith("#/pages/openorder/giro/giroModel")){
					url = "/financial/giro"
				}
				if(page.startsWith("#/pages/openorder/advanceIn/advanceInModel")){
					url = "/financial/advance_in"
				}
			 
				return url
			}
	}
	
}

export default ListBtnEnable;
