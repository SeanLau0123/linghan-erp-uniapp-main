<template name="home">
	<view>
		<cu-custom :bgColor="NavBarColor" :isBack="false" backRouterName="index">
			<block slot="content">首页</block>
		</cu-custom>
		<scroll-view>
			<!-- 轮播 -->
			<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true"
				interval="5000" duration="500" :style="[{animation: 'show 0.2s 1'}]">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false"
						objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper>
			<!-- 常用服务 -->
			<view class="cu-bar bg-white solid-bottom" :style="[{animation: 'show 0.5s 1'}]">
				<view class="action">
					<text class='cuIcon-title text-blue'></text>常用服务
				</view>
			</view>

			<!-- 今日统计 -->
			<view class="cu-list grid col-4 text-sm">
				<view class="cu-item animation-slide-bottom" style="width: 33%;">
					<view class="padding text-center">
						<view class="margin-top-xs">今日采购</view>
						<view class="margin-top-xs">{{todayPur}}</view>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom" style="width: 33%;">
					<view class="padding text-center">
						<view class="margin-top-xs">今日销售</view>
						<view class="margin-top-xs">{{todaySale}}</view>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom" style="width: 33%;">
					<view class="padding text-center">
						<view class="margin-top-xs">今日零售</view>
						<view class="margin-top-xs">{{todayRetailSale}}</view>
					</view>
				</view>

				<view class="cu-item animation-slide-bottom" style="width: 33%;">
					<view class="padding text-center">
						<view class="margin-top-xs">昨日采购</view>
						<view class="margin-top-xs">{{yesterdayBuy}}</view>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom" style="width: 33%;">
					<view class="padding text-center">
						<view class="margin-top-xs">昨日销售</view>
						<view class="margin-top-xs">{{yesterdaySale}}</view>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom" style="width: 33%;">
					<view class="padding text-center">
						<view class="margin-top-xs">昨日零售</view>
						<view class="margin-top-xs">{{yesterdayRetailSale}}</view>
					</view>
				</view>


				<view class="cu-item animation-slide-bottom" style="width: 33%;">
					<view class="padding text-center">
						<view class="margin-top-xs">本月累计采购</view>
						<view class="margin-top-xs">{{monthBuy}}</view>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom" style="width: 33%;">
					<view class="padding text-center">
						<view class="margin-top-xs">本月累计销售</view>
						<view class="margin-top-xs">{{monthSale}}</view>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom" style="width: 33%;">
					<view class="padding text-center">
						<view class="margin-top-xs">本月累计零售</view>
						<view class="margin-top-xs">{{monthRetailSale}}</view>
					</view>
				</view>


				<view class="cu-item animation-slide-bottom" style="width: 33%;">
					<view class="padding text-center">
						<view class="margin-top-xs">今年累计采购</view>
						<view class="margin-top-xs">{{yearBuy}}</view>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom" style="width: 33%;">
					<view class="padding text-center">
						<view class="margin-top-xs">今年累计销售</view>
						<view class="margin-top-xs">{{yearSale}}</view>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom" style="width: 33%;">
					<view class="padding text-center">
						<view class="margin-top-xs">今年累计零售</view>
						<view class="margin-top-xs">{{yearRetailSale}}</view>
					</view>
				</view>
			</view>
			<hr>
			<!-- 将三个图表合并为一个更紧凑的展示 -->
			<view class="charts-container">
				<view class="chart-item" style="height: 150px;">
					<l-echart ref="chart1"></l-echart>
				</view>
				<view class="chart-item" style="height: 150px;">
					<l-echart ref="chart2"></l-echart>
				</view>
				<view class="chart-item" style="height: 150px;">
					<l-echart ref="chart3"></l-echart>
				</view>
			</view>

		</scroll-view>
		<view class="cu-tabbar-height margin-top"></view>
	</view>
</template>

<script>
	import {
		us,
		os
	} from '@/common/util/work.js'
	import socket from '@/common/js-sdk/socket/socket.js'
	//echarts
	// 引入全量包
	// import * as echarts from 'echarts'
	//---or----------------------------------

	// 或者按需引入 
	import * as echarts from 'echarts/core';
	import {
		LineChart,
		BarChart
	} from 'echarts/charts';
	import {
		TitleComponent,
		TooltipComponent,
		GridComponent,
		DatasetComponent,
		TransformComponent,
		LegendComponent
	} from 'echarts/components';
	// 标签自动布局，全局过渡动画等特性
	import {
		LabelLayout,
		UniversalTransition
	} from 'echarts/features';
	// 引入 Canvas 渲染器，注意引入 CanvasRenderer 是必须的一步
	import {
		CanvasRenderer
	} from 'echarts/renderers';

	// 注册必须的组件
	echarts.use([
		LegendComponent,
		TitleComponent,
		TooltipComponent,
		GridComponent,
		DatasetComponent,
		TransformComponent,
		LineChart,
		BarChart,
		LabelLayout,
		UniversalTransition,
		CanvasRenderer
	]);
	export default {
		name: 'home',
		props: {
			cur: String,
		},
		watch: {
			cur: {
				immediate: true,
				handler: function(val, oldVal) {
					console.log('cur', val, oldVal)
					this.initMenu()
				},
			},
		},
		data() {
			return {
				buyPriceDataX: [],
				buyPriceDataY: [],
				salePriceDataX: [],
				salePriceDataY: [],
				retailPriceDataX: [],
				retailPriceDataY: [],
				todayPur: 0,
				todaySale: 0,
				todayRetailSale: 0,
				yesterdayBuy: 0,
				yesterdaySale: 0,
				yesterdayRetailSale: 0,
				monthBuy: 0,
				monthSale: 0,
				monthRetailSale: 0,
				yearBuy: 0,
				yearSale: 0,
				yearRetailSale: 0,
				swiperList: [{
						id: 1,
						type: 'image',
						url: '/static/banner/banner1.png',
						link: ''
					},
					{
						id: 2,
						type: 'image',
						url: '/static/banner/banner2.jpg',
						link: ''
					},
					{
						id: 3,
						type: 'image',
						url: '/static/banner/banner3.jpg',
						link: ''
					},
				],
				middleApps: [{
						icon: 'line2_icon1.png',
						title: '审批',
						'text': '个人审批'
					},
					{
						icon: 'line2_icon2.png',
						title: '审批稿',
						'text': '审批草稿箱'
					},
				],
				usList: us.data,
				osList: os.data,
				msgCount: 0,
				dot: {
					mailHome: false
				},

				//echart
				option1: {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						},
						confine: true
					},
					legend: {
						data: ['采购统计']
					},
					grid: {
						left: 20,
						right: 20,
						bottom: 15,
						top: 40,
						containLabel: true
					},
					xAxis: {
						data: []
					},
					yAxis: {},
					series: [{
						name: '采购统计',
						type: 'bar',
						itemStyle: {
							normal: {
								label: {
									show: true, //开启显示数值
									position: 'top', //数值在上方显示
									textStyle: { //数值样式
										color: '#000000', //字体颜色
										fontSize: 14 //字体大小
									}
								}
							}
						},
						data: []
					}]
				},
				option2: {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						},
						confine: true
					},
					legend: {
						data: ['销售统计']
					},
					grid: {
						left: 20,
						right: 20,
						bottom: 15,
						top: 40,
						containLabel: true
					},
					xAxis: {
						data: []
					},
					yAxis: {},
					series: [{
						name: '销售统计',
						type: 'bar',
						itemStyle: {
							normal: {
								label: {
									show: true, //开启显示数值
									position: 'top', //数值在上方显示
									textStyle: { //数值样式
										color: '#000000', //字体颜色
										fontSize: 14 //字体大小
									}
								}
							}
						},
						data: []
					}]
				},
				option3: {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						},
						confine: true
					},
					legend: {
						data: ['零售统计']
					},
					grid: {
						left: 20,
						right: 20,
						bottom: 15,
						top: 40,
						containLabel: true
					},
					xAxis: {
						data: []
					},
					yAxis: {},
					series: [{
						name: '零售统计',
						type: 'bar',
						itemStyle: {
							normal: {
								label: {
									show: true, //开启显示数值
									position: 'top', //数值在上方显示
									textStyle: { //数值样式
										color: '#000000', //字体颜色
										fontSize: 14 //字体大小
									}
								}
							}
						},
						data: []
					}]
				},
				//echart end


			}
		},
		methods: {
			initMenu() {
				console.log("-----------home------------")
			},
			goPage(page) {
				if (!page) {
					return false;
				}
				if (page === 'annotationList') {
					this.msgCount = 0
				}
				this.dot[page] = false
				this.$Router.push({
					name: page
				})
			},
			// 启动webSocket
			onSocketOpen() {
				socket.init('websocket');
			},
			getTtemDotInfo(item) {
				if (item.page === 'annotationList' && this.msgCount > 0) {
					return this.msgCount
				}
				return '';
			},
			loadPurchaseStatics() {
				let url = '/depotItem/buyOrSalePrice';
				let that = this
				this.$http.get(url).then(res => {
					if (res.data.code === 200) {
						let buyPriceData = res.data.data.buyPriceList;
						let salePriceData = res.data.data.salePriceList;
						let retailPriceData = res.data.data.retailPriceList;

						that.buyPriceDataX = buyPriceData.map(o => {
							return o.x
						}) // 生成数组
						that.buyPriceDataY = buyPriceData.map(o => {
							return o.y
						}) // 生成数组
						that.option1.xAxis.data = that.buyPriceDataX
						that.option1.series[0].data = that.buyPriceDataY
						that.$refs.chart1.init(echarts, chart => {
							chart.resize();
							chart.setOption(that.option1);
						});

						that.salePriceDataX = salePriceData.map(o => {
							return o.x
						}) // 生成数组
						that.salePriceDataY = salePriceData.map(o => {
							return o.y
						}) // 生成数组
						that.option2.xAxis.data = that.salePriceDataX
						that.option2.series[0].data = that.salePriceDataY
						that.$refs.chart2.init(echarts, chart => {
							chart.resize();
							chart.setOption(that.option2);
						});

						that.retailPriceDataX = retailPriceData.map(o => {
							return o.x
						}) // 生成数组
						that.retailPriceDataY = retailPriceData.map(o => {
							return o.y
						}) // 生成数组
						that.option3.xAxis.data = that.retailPriceDataX
						that.option3.series[0].data = that.retailPriceDataY
						that.$refs.chart3.init(echarts, chart => {
							chart.resize();
							chart.setOption(that.option3);
						});

					}
				})
			},
			getBuyAndSaleStatistics() {
				let url = '/depotHead/getBuyAndSaleStatistics';
				let that = this
				this.$http.get(url).then(res => {
					console.log("统计：" + JSON.stringify(res))
					if (res.data.code === 200) {
						this.todayPur = res.data.data.todayBuy
						this.todaySale = res.data.data.todaySale
						this.todayRetailSale = res.data.data.todayRetailSale

						this.yesterdayBuy = res.data.data.yesterdayBuy
						this.yesterdaySale = res.data.data.yesterdaySale
						this.yesterdayRetailSale = res.data.data.yesterdayRetailSale

						this.monthBuy = res.data.data.monthBuy
						this.monthSale = res.data.data.monthSale
						this.monthRetailSale = res.data.data.monthRetailSale

						this.yearBuy = res.data.data.yearBuy
						this.yearSale = res.data.data.yearSale
						this.yearRetailSale = res.data.data.yearRetailSale
					}
				})

			}
		},
		mounted() {
			this.loadPurchaseStatics()
			this.getBuyAndSaleStatistics()
		}
	}
</script>

<style scoped>
	.cu-list.grid>.cu-item {
		padding: 0px 0px;
	}

	.line2-icon {
		width: 60px;
		height: 60px;
	}

	.charts-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.chart-item {
		width: 100%;
		margin-bottom: 5px;
	}

	@media (min-width: 768px) {
		.chart-item {
			width: 50%;
		}
	}
</style>