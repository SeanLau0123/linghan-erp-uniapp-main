let BASE_URL = ''


if (process.env.NODE_ENV == 'development') {
    BASE_URL = 'https://erp.linghanshop.cn/jshERP-boot' // 开发环境
} else {
	BASE_URL = 'https://erp.linghanshop.cn/jshERP-boot' // 生产环境
	//BASE_URL = 'http://47.122.124.220:3000/jshERP-boot' // 生产环境
	//https://erp.linghanshop.cn/jshERP-boot/
}
let staticDomainURL = BASE_URL+ '/sys/common/static';

const configService = {
	apiUrl: BASE_URL,
	staticDomainURL: staticDomainURL
};

export default configService
