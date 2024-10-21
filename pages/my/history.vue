<template>
	<view class="container">
		<view class="flex flex-wrap justify-between" style="padding: 30rpx;">
			<view class="list_view" v-for="(item,index) in ListItem">
				<image v-if="classIndex == 1" @tap="saveImage(item.gameImage)" :src="item.gameImage"></image>
				<image v-if="classIndex == 3" :src="item.gameImg"></image>
				<image v-if="classIndex == 2" @tap="saveImage(item.noWatermarkImage)" :src="item.noWatermarkImage"></image>
				<view class="list_itemtime">{{item.createTime}}</view>
			</view>
		</view>
		<view v-if="ListItem.length == 0">
			<u-empty text="暂无图片记录" mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				size: 20,
				ListItem: [],
				classIndex: 0
			};
		},
		onLoad(d) {
			if (d.index) {
				this.classIndex = d.index;
			}
			if (d.index == 1) {
				uni.setNavigationBarTitle({
					title: '我的生成'
				})
			} else if (d.index == 2) {
				uni.setNavigationBarTitle({
					title: '我的下载'
				})
			} else if (d.index == 3) {
				uni.setNavigationBarTitle({
					title: '浏览记录'
				})
			}
			this.getTimeOrListItem1();
		},
		methods: {
			saveImage(image,classify) {
				let that = this;
				if(this.classIndex != 3){
					let imgArr = []
					imgArr.push(image);
					//预览图片
					uni.previewImage({
						urls: imgArr,
						current: imgArr[0]
					});
				}
			},
			getTimeOrListItem1() {
				this.$queue.showLoading('加载中...');
				if (this.classIndex == 1) {
					let data = {
						page: this.page,
						limit: 20,
						classify: 2
					}
					this.$Request.getT("/app/appGame/selectGameUserList", data).then(res => {
						if (res.code == 0 && res.data) {
							if (this.page == 1) {
								this.ListItem = [];
							}
							if (res.data.list && res.data.list.length > 0) {
								this.ListItem = [...this.ListItem, ...res.data.list]
							}
						}
						uni.hideLoading();
						uni.stopPullDownRefresh();
					});
				} else if (this.classIndex == 2) {
					let data = {
						page: this.page,
						limit: 20,
						classify: 1
					}
					this.$Request.getT("/app/appGame/selectGameUserList", data).then(res => {
						if (res.code == 0 && res.data) {
							if (this.page == 1) {
								this.ListItem = [];
							}
							if (res.data.list && res.data.list.length > 0) {
								this.ListItem = [...this.ListItem, ...res.data.list]
							}
						}
						uni.hideLoading();
						uni.stopPullDownRefresh();
					});
				} else if (this.classIndex == 3) {
					let data = {
						page: this.page,
						limit: 20
					}
					this.$Request.getT("/app/appGame/selectGameBrowseList", data).then(res => {
						if (res.code == 0 && res.data) {
							if (this.page == 1) {
								this.ListItem = [];
							}
							if (res.data.list && res.data.list.length > 0) {
								this.ListItem = [...this.ListItem, ...res.data.list]
							}
						}
						uni.hideLoading();
						uni.stopPullDownRefresh();
					});
				}
			},
			rtBubble() {
				this.getTimeOrListItem1();
			}
		},
		onReachBottom: function() {
			this.page = this.page + 1;
			this.getTimeOrListItem1('');
		},
		onPullDownRefresh: function() {
			this.page = 1;
			this.getTimeOrListItem1();
		},
	};
</script>

<style lang="scss">
	page {
		background: #F5F5F5;
	}

	.list_view {
		width: 340rpx;
		// height: 392rpx;
		background: #F0F6FF;
		border-radius: 24rpx;
		// padding: 10rpx 10rpx 26rpx 10rpx;
		text-align: center;
		margin-bottom: 20rpx;
		// border: 3px solid #579EFF;
		position: relative;

		.list_itemtime {
			padding: 4rpx 16rpx;
			background: #747A85;
			border-radius: 21rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			position: absolute;
			bottom: 20rpx;
			right: 20rpx;
		}

		image {
			width: 340rpx;
			height: 310rpx;
			border-radius: 24rpx;
		}
	}
</style>