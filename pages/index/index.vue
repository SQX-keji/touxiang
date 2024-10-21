<template>
	<view>
		<!-- 公告 -->
		<!-- <view v-if="message.length>0" class="meeags flex align-center justify-center">
			<view class="meeags-box">
				<u-notice-bar bgColor="transparent" color="#FF69BC" fontSize="14" direction="column"
					:text="message"></u-notice-bar>
			</view>
		</view> -->

		<view class="top_view">
			<!-- <image
				src="https://api.shengqianxiong.com.cn/file/uploadPath/2023/12/08/468fc91dc23aa2ba411bf121d4ae39fa.png"
				style="width: 100%;height: 100%;"></image> -->
			<!-- <view class="top_user_view" @tap="goUser">
				<image :src="avatar ? avatar : '/static/logo.png'"></image>
				<view class="top_user_name">{{userName ? userName : '个性头像生成'}}</view>
			</view> -->

			<view class="centers-search flex align-center padding-lr">
				<view class="centers-search-box ">
					<u-search bg-color="#ffffff" :animation="true" @search="goSearch()" @custom="goSearch()"
						:show-action="true" placeholder="搜索你想要的头像" v-model="keyword"></u-search>
				</view>
			</view>

			<!-- 轮播图 -->
			<view style="margin: 26rpx 30rpx 0rpx;" v-if="swiperList.length > 0">
				<!-- <carousel class="swiper" :img-list="swiperList" url-key="imageUrl" @selected="selectedBanner" /> -->
				<swiper :indicator-dots="false" style="height: 200rpx;" :autoplay="true" interval="5000" duration="500"
					:circular="true">
					<swiper-item v-for="(item,index) in swiperList" :key='index' @tap="goPage(item.url)">
						<image :src="item.imageUrl" style="width: 100%;height: 200rpx;border-radius: 24rpx;"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view style="position: sticky;top: 0;z-index: 9999;background-color: #579EFF;">
			<view class="tabs flex align-center justify-center">
				<view class="tabs-box flex align-center">
					<view class="tabs-box-item" @click="selectTabs(index)" :class="current == index?'tabsActive':''"
						v-for="(item,index) in tabsList" :key="index">
						{{item.name}}
						<view class="tabs-box-item-line" v-if="current == index"></view>
					</view>
				</view>
			</view>

			<!-- 头像下载 -->
			<view class="tui-tabs" v-if="current==0">
				<scroll-view scroll-with-animation class="tui-scroll-h" :scroll-x="true" :show-scrollbar="false">
					<view style="display: flex;padding-left: 20rpx;">
						<view v-for="(tab, index) in tabClassTypeLsit" :id="tab.id" :data-current="index"
							@tap='classTypeSlect(tab.id)'>
							<view>
								<view :class="tab.id==tabClassCurrent?'tab_sel':'tab_nosel'">
									{{ tab.name }}
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 头像生成 -->
			<view class="tui-tabs" v-if="current==1">
				<scroll-view scroll-with-animation class="tui-scroll-h" :scroll-x="true" :show-scrollbar="false">
					<view style="display: flex;padding-left: 20rpx;">
						<view v-for="(tab, index) in tabBars" :id="tab.id" :data-current="index" @tap='tabSlect(tab)'>
							<view>
								<view :class="tab.id==tabIndex?'tab_sel':'tab_nosel'">
									{{ tab.name }}
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 高清壁纸 -->
			<view class="tui-tabs" v-if="current==2">
				<scroll-view scroll-with-animation class="tui-scroll-h" :scroll-x="true" :show-scrollbar="false">
					<view style="display: flex;padding-left: 20rpx;">
						<view v-for="(tab, index) in tabClassTypeLsitPhoto" :id="tab.id" :data-current="index"
							@tap='tabSlectPhoto(tab)'>
							<view>
								<view :class="tab.id==tabClassCurrentPhoto?'tab_sel':'tab_nosel'">
									{{ tab.name }}
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view v-if="current == 0 || current == 1" class="flex flex-wrap justify-between" style="padding: 30rpx;">
			<view class="list_view" v-for="(item,index) in gameTypeList" @tap="goDetail(item)">
				<view>
					<text v-if="item.classify==1"
						style="transform: rotate(45deg);position: absolute;z-index: 999;text-align: center;color: aliceblue;margin: 80rpx;">下载后无水印</text>
					<image :src="item.gameImg" mode="aspectFill"></image>

				</view>
				<!-- <view class=""></view> -->
				<view class="list_itemname">{{item.gameName}}</view>
			</view>
		</view>
		<view v-if="current == 2" class="flex justify-between" style="padding: 30rpx;">
			<view>
				<view class="list_view" v-if="index % 2 == 0" v-for="(item,index) in gameTypeList"
					@tap="goDetail(item)">
					<view>
						<text
							style="transform: rotate(45deg);position: absolute;z-index: 999;text-align: center;color: aliceblue;margin: 80rpx;">下载后无水印</text>
						<image :src="item.gameImg" mode="widthFix"></image>

					</view>
					<!-- <view class=""></view> -->
					<view class="list_itemname" v-if="item.classify != 3">{{item.gameName}}</view>
				</view>
			</view>
			<view class="">
				<view class="list_view" v-if="index % 2 != 0" v-for="(item,index) in gameTypeList"
					@tap="goDetail(item)">
					<view>
						<text
							style="transform: rotate(45deg);position: absolute;z-index: 999;text-align: center;color: aliceblue;margin: 80rpx;">下载后无水印</text>
						<image :src="item.gameImg" mode="widthFix"></image>

					</view>
					<!-- <view class=""></view> -->
					<view class="list_itemname" v-if="item.classify != 3">{{item.gameName}}</view>
				</view>
			</view>


		</view>
		<u-empty v-if="gameTypeList.length == 0" textColor="#ffffff" iconColor="#ffffff" marginTop="100" text="暂无模版"
			mode="list">
		</u-empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				tabsList: [{
						name: '头像下载',
						id: 1,
					},
					{
						name: '头像生成',
						id: 2,
					},
					{
						name: '高清壁纸',
						id: 3,
					}
				],
				swiperList: [],
				gameTypeList: [],
				tabIndex: 1,
				tabBars: [{
						id: 1,
						name: '情侣头像'
					},
					{
						id: 2,
						name: '亲子头像'
					},
					{
						id: 3,
						name: '搞钱头像'
					},
					{
						id: 4,
						name: '姓氏头像'
					},
				],
				keyword: '',
				gameList: [],
				message: [],
				tuiguang: '',
				bgImg: '',
				userName: '',
				avatar: '',
				tabClassTypeLsit: [], //下载分类
				tabClassCurrent: 0, //选择的分类
				page: 1,
				pages: 1,
				limit: 10,
				tabClassTypeLsitPhoto: [], //壁纸分类
				tabClassCurrentPhoto: 0, //选择的壁纸分类
			}
		},
		onShareAppMessage(res) {
			return {
				path: '/pages/index/index?invitation=' + this
					.invitationCode, //这是为了传参   onload(data){let id=data.id;} 
				title: this.tuiguang,
				imageUrl: this.bgImg
			}
		},
		onShareTimeline(res) {
			return {
				path: '/pages/index/index?invitation=' + this
					.invitationCode, //这是为了传参   onload(data){let id=data.id;} 
				title: this.tuiguang,
				imageUrl: this.bgImg
			}
		},
		onLoad(option) {
			// #ifdef MP-WEIXIN || MP-TOUTIAO
			if (option.scene) { //这里为线上操作
				//此处的二维码  page/index/index?brokerId=123
				let scene = decodeURIComponent(option.scene);
				scene = scene.split(',')
				uni.setStorageSync('invitation', scene[0])
			}
			//分享文字
			this.$Request.getT('/app/common/type/116').then(res => {
				if (res.code === 0) {
					if (res.data && res.data.value) {
						this.tuiguang = res.data.value;
					}
				}
			});
			//分享图片
			this.$Request.getT('/app/banner/selectBannerList?state=-1&classify=5').then(res => {
				if (res.code === 0) {
					this.bgImg = res.data[0].imageUrl;
				}
			});
			// #endif
			if (option.invitation) {
				uni.setStorageSync('invitation', option.invitation)
			}
			this.$queue.showLoading('加载中...')
			this.getBannerList();
			this.getClassTypeList()
			this.getClassTypeListPhoto()

		},
		onShow() {
			this.invitationCode = uni.getStorageSync('invitationCode') ? uni.getStorageSync('invitationCode') : '';
			this.getMessage()
			this.getGameLIst()

			if (uni.getStorageSync('token')) {
				this.getUserInfo()
			} else {
				this.avatar = '';
				this.userName = '';
			}
		},
		onPullDownRefresh() {
			this.page = 1
			this.getTypeList();
		},
		onReachBottom() {
			if (this.page < this.pages) {
				this.page += 1
				this.getTypeList();
			}
		},
		methods: {
			//获取壁纸分类
			getClassTypeListPhoto() {
				let data = {
					classify: 7
				}
				this.$Request.get('/app/banner/selectBannerList', data).then(res => {
					if (res.code == 0) {
						this.tabClassTypeLsitPhoto = res.data
						if (res.data && res.data.length > 0) {
							this.tabClassCurrentPhoto = this.tabClassTypeLsitPhoto[0].id
						}
					}
				})
			},
			//选择类型 /下载
			classTypeSlect(id) {
				this.tabClassCurrent = id
				this.page = 1
				this.getTypeList();
			},
			//获取头像下载分类
			getClassTypeList() {
				let data = {
					classify: 6
				}
				this.$Request.get('/app/banner/selectBannerList', data).then(res => {
					if (res.code == 0) {
						this.tabClassTypeLsit = res.data
						if (res.data && res.data.length > 0) {
							this.tabClassCurrent = this.tabClassTypeLsit[0].id
							this.getTypeList();
						} else {
							this.getTypeList();
						}
					}
				})
			},
			// tabClassTypeLsit
			goPage(e) {
				if (uni.getStorageSync('token')) {
					if (e == '/pages/picture/index') {
						uni.switchTab({
							url: e
						})
					} else {
						uni.navigateTo({
							url: e
						})
					}
				} else {
					uni.navigateTo({
						url: '/pages/public/login'
					})
				}

			},
			getBannerList() {
				this.$Request.getT('/app/banner/selectBannerList?classify=1').then(res => {
					if (res.code == 0) {
						this.swiperList = res.data;
					}
				});
			},
			selectTabs(index) {
				this.current = index;
				this.page = 1
				this.gameTypeList = []
				this.$queue.showLoading('加载中...')
				this.getTypeList();
			},
			goDetail(item) {
				let token = this.$queue.getData('token');
				if (token) {
					let homeIndex = 1;
					if (this.current == 1) {
						homeIndex = 1;
					} else if (this.current == 0) {
						homeIndex = 2;
					} else if (this.current == 2) {
						homeIndex = 3;
					}
					uni.navigateTo({
						url: '/pages/index/make?tabIndex=' + this.tabIndex + '&gameId=' + item.id + '&homeIndex=' +
							homeIndex
					});
				} else {
					uni.navigateTo({
						url: '/pages/public/login'
					})
				}
			},
			tabSlectPhoto(item) {
				this.tabClassCurrentPhoto = item.id
				this.page = 1
				this.gameTypeList = []
				this.getTypeList();
			},
			tabSlect(item) {
				this.tabIndex = item.id
				this.page = 1
				this.gameTypeList = []
				this.getTypeList();
			},
			goSearch() {
				this.getTypeList();
			},
			getTypeList() {
				let data = {
					page: this.page,
					limit: this.limit,
					gameName: this.keyword,
					classify: this.current + 1
				}
				if (this.current == 0) {
					data.gameType = this.tabClassCurrent
				} else if (this.current == 1) {
					data.gameType = this.tabIndex
				} else if (this.current == 2) {
					data.gameType = this.tabClassCurrentPhoto
				}
				this.$Request.getT('/app/appGame/queryGameName', data)
					.then(res => {
						uni.stopPullDownRefresh()
						uni.hideLoading();
						if (res.code == 0) {
							this.pages = res.data.totalPage
							if (this.page == 1) {
								this.gameTypeList = res.data.list
							} else {
								this.gameTypeList = [...this.gameTypeList, ...res.data.list]
							}


						}
					});
			},
			goUser() {
				uni.navigateTo({
					url: '/pages/my/index'
				});
			},
			//获取公告
			getMessage() {
				let data = {
					page: 1,
					limit: 99999,
					state: 1
				}
				this.$Request.get('/app/message/selectMessageByType', data).then(res => {
					if (res.code == 0) {
						let arr = []
						res.data.list.map(item => {
							arr.push(item.title)
						})
						this.message = arr
					}
				})
			},
			//获取vip信息
			getUserInfo() {
				this.$Request.getT("/app/user/selectUserById").then(res => {
					if (res.code == 0) {
						this.userName = res.data.userName
						this.invitationCode = res.data.invitationCode
						this.avatar = res.data.avatar ? res.data.avatar : '../../static/logo.png'
						uni.setStorageSync('avatar', res.data.avatar)
						uni.setStorageSync('invitationCode', res.data.invitationCode)
						uni.setStorageSync('zhiFuBao', res.data.zhiFuBao)
						uni.setStorageSync('zhiFuBaoName', res.data.zhiFuBaoName)
					}
				});
			},
			//获取游戏列表
			getGameLIst() {
				this.$Request.get('/app/appGame/queryGameName').then(res => {
					if (res.code == 0) {
						this.gameList = res.data
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #579EFF;
	}

	.centers-search {
		width: 100%;
		// height: 92rpx;
		// margin-top: 20rpx;
		padding-top: 20rpx;

		.centers-search-box {
			width: 693rpx;
			height: 100%;
			background-color: #ffffff;
			border-radius: 46rpx;
			padding: 0 24rpx 0 0;
		}
	}

	.tabs {
		width: 100%;
		height: auto;
		margin-top: 40rpx;
		margin-bottom: 60rpx;

		.tabs-box {
			width: 686rpx;
		}

		.tabs-box-item {
			color: #FFFFFF;
			font-size: 26rpx;
			margin-right: 50rpx;
			position: relative;
			font-weight: bold;
		}

		.tabs-box-item-line {
			width: 30rpx;
			height: 6rpx;
			background: linear-gradient(-15deg, #FDCE75 0%, #FEEA92 100%);
			position: absolute;
			left: 50%;
			top: 100%;
			transform: translate(-50%, 0);
			border-radius: 30rpx;
			margin-top: 12rpx
		}
	}

	.tabsActive {
		color: #FFFFFF;
		font-size: 32rpx !important;
	}

	.tab_sel {
		min-width: 156rpx;
		height: 64rpx;
		background: linear-gradient(0deg, #FDCE75 0%, #FEEA92 100%);
		border-radius: 32rpx;
		line-height: 64rpx;
		text-align: center;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #2B2B2B;
		margin-right: 20rpx
	}

	.tab_nosel {
		min-width: 156rpx;
		height: 64rpx;
		background: #F0F6FF;
		border-radius: 32rpx;
		line-height: 64rpx;
		text-align: center;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #2B2B2B;
		margin-right: 20rpx
	}

	.list_view {
		width: 333rpx;
		// height: 392rpx;
		background: #F0F6FF;
		border-radius: 32rpx;
		margin-bottom: 20rpx;
		padding: 12rpx;
		text-align: center;

		.list_itemname {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #2B2B2B;
			margin-top: 8rpx;
		}

		image {
			width: 310rpx;
			height: 310rpx;
			// margin-top: 8rpx;
			border-radius: 24rpx;
		}
	}

	.tui-tabs {
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		/* #ifdef MP-ALIPAY || MP-BAIDU */
		height: 100vh;
		/* #endif */
		margin-top: 20rpx;
	}

	.tui-scroll-h {
		width: 750rpx;
		height: 80rpx;
		flex-direction: row;
		white-space: nowrap;
	}

	.top_view {

		width: 750rpx;
		height: auto;

		.top_user_view {
			width: 750rpx;
			height: 120rpx;
			display: flex;
			align-items: center;
			padding: 0rpx 20rpx;

			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 100rpx;
			}

			.top_user_name {
				font-size: 32rpx;
				color: #FFFFFF;
				margin-left: 20rpx;
				font-weight: 600;
			}
		}
	}

	.meeags {
		width: 100%;
		margin-top: 30rpx;
		position: relative;

		.meeags-box {
			width: 686rpx;
			background-color: rgba(255, 255, 255, 0.5);
			border-radius: 30rpx;

		}
	}

	.center {
		width: 100%;
		// height: 70vh;
		// margin-top: 60rpx;
		margin-top: 30rpx;

		.center-box {
			width: 100%;
			// height: 70vh;
		}
	}
</style>