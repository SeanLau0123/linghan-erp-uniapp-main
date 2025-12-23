<template>
	<view>
		<home :cur="PageCur" v-if="PageCur=='home'" :key="commponent1Key"></home>
		<people v-if="PageCur=='people'" :key="commponent2Key"></people>
		<material v-if="PageCur=='material'" :key="commponent3Key"></material>
		<openorder v-if="PageCur=='openorder'" :key="commponent4Key"></openorder>
		<report v-if="PageCur=='report'" :key="commponent5Key"></report>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view :class="PageCur=='home'?'action text-green':'action text-gray'" @click="NavChange" data-cur="home">
				<view class='cuIcon-homefill'></view>首页
			</view>
			<view :class="PageCur=='material'?'action text-green':'action text-gray'" @click="NavChange"
				data-cur="material">
				<view class='cuIcon-apps'></view>基础资料
			</view>
			<view :class="PageCur=='openorder'?'action text-green':'action text-gray'" @click="NavChange"
				data-cur="openorder">
				<view class='cuIcon-roundadd'></view>开单
			</view>
			<view :class="PageCur=='report'?'action text-green':'action text-gray'" @click="NavChange"
				data-cur="report">
				<view class='cuIcon-rank'></view>报表查询
			</view>
			<view :class="PageCur=='people'?'action text-green':'action text-gray'" @click="NavChange"
				data-cur="people">
				<view class='cuIcon-people'></view>我的
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				PageCur: 'home',
				commponent1Key: 0,
				commponent2Key: 0,
				commponent3Key: 0,
				commponent4Key: 0,
				commponent5Key: 0,
			}
		},
		onLoad: function(option) {
			if (option && option.params) {
				try {
					this.PageCur = params.PageCur || 'home';
				} catch (error) {
					this .PageCur = 'home';
				}
			} else {
				this.PageCur = 'home';
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}

		}
	}
</script>
<style>
</style>