module.exports = {
	devServer:{
		disableHostCheck:true,
		proxy:{
			'/jshERP-boot':{
				target:'http://192.168.2.166:8080',
				changeOrigin:true
			}
		}
	}
}