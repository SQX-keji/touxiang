<template>
	<view class="text-white">
		<view class="user-info-box" style="display: flex;flex-direction: row;justify-content: space-between;">
			<view style="width: 20%;margin-left: 14upx;padding-top: 20rpx;">
				<!-- #ifdef MP-WEIXIN -->
				<view style="width: 100%;" v-if="isLogin">
					<button open-type="chooseAvatar" @chooseavatar="onChooseAvatar" style="background: #F5F5F5;">
						<image v-if="avatar" style="width: 110upx;height: 110upx;border-radius: 50rpx;" :src="avatar">
						</image>
						<image v-else style="width: 110upx;height: 110upx;border-radius: 50rpx;" src="/static/logo.png">
						</image>
					</button>
				</view>
				<image v-else class="portrait" @click.stop="goLogin()" src="/static/logo.png">
				</image>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<image v-if="avatar" class="portrait" :src="avatar" @click.stop="goLogin()">
				</image>
				<image v-else class="portrait" src="/static/logo2.png" @click.stop="goLogin()">
				</image>
				<!-- #endif -->
			</view>
			<view class="flex align-center"
				style="text-align: left;width: 80%;display: flex;align-items: center;color: #FFFFFF;">
				<view v-if="isLogin" style="margin-left: 15rpx;" @tap="goUpdataNickName">
					<view class="info-box">
						<text class="username">{{ userName ? userName : '游客' }}</text>
					</view>
					<view v-if="invitationCode" class="" style="color: #FFFFFF;">
						ID：{{invitationCode}}
					</view>
				</view>
				<view v-else class="text-xl text-bold margin-left" @click.stop="goLogin()">登录
				</view>
			</view>
		</view>

		<!-- <view class="vipbox">
			<view class="flex align-center">
				<image src="/static/image/my/vips.png"></image>
				<u-line direction="col" color="#785831" length="50rpx"></u-line>
				<view class="text-lg text-bold margin-left-sm" v-if="!vipEndTime">解锁超多专属特权</view>
				<view class="text-26 margin-left-sm" v-else>{{extractDate(vipEndTime)}} 到期</view>
			</view>
			<view class="btn-bg" @click="goNav('/my/vip/index')">{{vipEndTime?'立即续费':'立即开通'}}</view>
		</view> -->
		<view class="sc_view">
			<!-- <image src="https://avatar.xianmxkj.com/file/uploadPath/2024/03/15/ed31c298884667b3207464d1c81f3dea.png"
				style="width: 750rpx;height: 300rpx;"></image> -->
			<view class="sc_itemview">
				<view class="item_view" @click="goNav('/pages/my/history?index=1')">
					<image
						src="https://avatar.xianmxkj.com/file/uploadPath/2024/03/15/16ebd5a6e9ed49aaba097c586f97174d.png">
					</image>
					<view class="text-df">我的生成</view>
				</view>
				<view class="item_view" @click="goNav('/pages/my/history?index=2')">
					<image
						src="https://avatar.xianmxkj.com/file/uploadPath/2024/03/15/ed537a35d5c254e72f239116ad9bed2a.png">
					</image>
					<view class="text-df">我的下载</view>
				</view>
				<view class="item_view" @click="goNav('/pages/my/history?index=3')">
					<image
						src="https://avatar.xianmxkj.com/file/uploadPath/2024/03/15/8bc2d1773c466f4f7cc1d748559b71d5.png">
					</image>
					<view class="text-df">浏览记录</view>
				</view>
			</view>
		</view>
		<!-- <view class="flex justify-between" style="margin: 40rpx 30upx 30rpx;">
			<image @click="goNav('/pages/my/history')"
				src="https://api.shengqianxiong.com.cn/file/uploadPath/2023/12/19/ec0696a5d7f95de8e64c8b8823c5cd6b.png"
				class="centerImg_view"></image>
		</view> -->

		<view class="bgbox2 padding-tb-sm">
			<!-- <view class="bgbox2_title">其他工具</view> -->
			<view class="image_tu" @click="goNav('/pages/my/invitationUser')">
				<view class="images">
					<image src="../../static/image/my/yao.png"></image>
					<view>分享好友</view>
				</view>
				<image src="../../static/image/my/right.png" style="width: 11upx;height: 20upx;"></image>
			</view>
			<!-- <view v-if="isRate==0" class="image_tu" @click="goNav('/my/other/jiameng')">
				<view class="images">
					<image src="../../static/image/my/hezuo.png"></image>
					<view>合伙代理</view>
				</view>
				<image src="../../static/image/my/right.png" style="width: 11upx;height: 20upx;"></image>
			</view>
			<view v-if="isRate && isRate > 0" class="image_tu" @click="goNav('/my/other/tuiguang')">
				<view class="images">
					<image src="../../static/image/my/sy.png"></image>
					<view>我的团队</view>
				</view>
				<image src="../../static/image/my/right.png" style="width: 11upx;height: 20upx;"></image>
			</view> -->

			<view class="image_tu" @click="goNav('/my/feedback/index')">
				<view class="images">
					<image src="../../static/image/my/yijian.png"></image>
					<view>意见反馈</view>
				</view>
				<image src="../../static/image/my/right.png" style="width: 11upx;height: 20upx;"></image>
			</view>
			<view class="image_tu" v-if="Number(kefu) != 4" @click="goMsg()">
				<view class="images">
					<image src="../../static/image/my/kefu.png"></image>
					<view @click="goMsg()">联系我们</view>
				</view>
				<image src="../../static/image/my/right.png" style="width: 11upx;height: 20upx;"></image>
			</view>
			<view class="image_tu" v-if="Number(kefu) == 4">
				<view class="images">
					<image src="../../static/image/my/kefu.png"></image>
					<!-- #ifdef MP-TOUTIAO -->
					<button
						style="color: #000000;height: 60rpx;line-height: 60rpx;width: 200rpx;text-align: left;padding-left: 2rpx;"
						open-type="openAwemeUserProfile" :data-aweme-id="awemeId">
						联系我们
					</button>
					<!-- #endif -->
				</view>
				<image src="../../static/image/my/right.png" style="width: 11upx;height: 20upx;"></image>
			</view>
			<view class="image_tu" @click="goNav('/my/setting/index')">
				<view class="images">
					<image src="../../static/image/my/set.png"></image>
					<view>设置中心</view>
				</view>
				<image src="../../static/image/my/right.png" style="width: 11upx;height: 20upx;"></image>
			</view>
		</view>
		<!-- <u-tabbar activeColor="#FD5A99" :border="false" :value="1" @change="change" :fixed="true" :placeholder="true"
			:safeAreaInsetBottom="true">
			<u-tabbar-item text="玩法">
				<image class="u-page__item__slot-icon" slot="active-icon" src="/static/tabbar/index_.png"></image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" src="/static/tabbar/index.png"></image>
			</u-tabbar-item>
			<u-tabbar-item text="我的">
				<image class="u-page__item__slot-icon" slot="active-icon" src="/static/tabbar/my_.png"></image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" src="/static/tabbar/my.png"></image>
			</u-tabbar-item>
		</u-tabbar> -->
	</view>
</template>

<script>
	import configdata from '../../common/config.js';
	export default {
		data() {
			return {
				awemeId: '', //抖音企业号
				isRate: 0, //是否开通代理
				teamSelect: '否',
				yhqSelect: '否',
				YaoqingShangJin: false,
				huiyuanSelect: '否',
				yueSelect: '否',
				shangxianSelect: '否',
				avatar: '../../static/logo.png',
				isLogin: false,
				userName: '匿名',
				status: -1,
				userId: '',
				isVip: false,
				invitationCode: '', //邀请码
				list: [],
				orderCount: [],
				Huizhang: false,
				consortiaId: '',
				vip: '',
				vipEndTime: '',
				kefu: 1,
			}
		},
		onLoad() {},
		onShow() {
			this.kefu = uni.getStorageSync('kefu')
			this.awemeId = uni.getStorageSync('awemeId')
			this.userId = uni.getStorageSync('userId')
			if (this.userId) {
				this.isLogin = true
				this.getUserInfo()
			} else {
				this.vip = ''
				this.vipEndTime = ''
				this.isLogin = false
				this.isVip = false
				this.userName = '匿名'
				this.avatar = '../../static/logo.png'
			}

		},
		methods: {
			//截取日期
			extractDate(dateString) {
				return dateString.split(" ")[0];
			},
			//联系客服
			goMsg() {
				let kefu = uni.getStorageSync('kefu'); // 1  手机号 2 微信公众号客服  3微信 4 跳转抖音企业号主页
				let kefuPhone = uni.getStorageSync('kefuPhone');
				if (kefu == 1) {
					uni.makePhoneCall({
						phoneNumber: kefuPhone //仅为示例
					});
				} else if (kefu == 3) {
					uni.navigateTo({
						url: '/my/setting/kefu'
					})
				} else if (kefu == 2) {
					// #ifdef MP-WEIXIN
					let that = this
					try {
						wx.openCustomerServiceChat({
							extInfo: {
								url: uni.getStorageSync('kefuUrl')
							},
							corpId: uni.getStorageSync('kefuAppId'),
							success(res) {},
							fail(res) {
								console.error(res)
							}
						})
					} catch (error) {
						console.error("catchcatch" + error)
						uni.showToast({
							title: '请更新至微信最新版本'
						});
					}
					// #endif
					// #ifndef MP-WEIXIN
					let url = uni.getStorageSync('kefuUrl');
					if (url.indexOf('/pages/') !== -1 || url.indexOf('/my/') !== -1) {
						uni.navigateTo({
							url
						});
					} else {
						//#ifndef H5
						uni.navigateTo({
							url: '/pages/my/webView?url=' + url
						});
						//#endif
						//#ifdef H5
						window.location.href = url;
						//#endif
					}
					// #endif
				}
			},
			change(e) {
				if (e == 0) {
					uni.switchTab({
						url: "/pages/index/index"
					})
				}
			},
			goUpdataNickName() {
				let token = this.$queue.getData('token');
				if (token) {
					uni.navigateTo({
						url: '/pages/my/userInfo'
					});
				} else {
					uni.navigateTo({
						url: '/pages/public/login'
					})
				}
			},
			goLogin() {
				let token = this.$queue.getData('token');
				if (!token) {
					uni.navigateTo({
						url: '/pages/public/login'
					})
				} else {
					let that = this;
					var url = null;
					let userId = this.$queue.getData('userId');
					uni.showActionSheet({
						// itemList按钮的文字接受的是数组
						itemList: ["查看头像", "从相册选择图片"],
						success(e) {
							var index = e.tapIndex
							if (index === 0) {
								// 用户点击了预览当前图片
								// 可以自己实现当前头像链接的读取
								let url = that.avatar;
								let arr = []
								arr.push(url)
								uni.previewImage({
									// 预览功能图片也必须是数组的
									urls: arr
								})
							} else if (index === 1) {
								uni.chooseImage({
									count: 1, //默认9
									sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
									sourceType: ['album'], //从相册选择
									success: function(res) {
										uni.showLoading({
											title: '上传中...'
										});
										let token = uni.getStorageSync('token');
										uni.uploadFile({
											url: that.config("APIHOST1") +
												'/alioss/upload', //仅为示例，非真实的接口地址
											filePath: res.tempFilePaths[0],
											header: {
												token: token
											},
											name: 'file',
											success: uploadFileRes => {
												url = JSON.parse(uploadFileRes.data).data;
												that.$Request.postJson(
													"/app/user/updateUser", {
														avatar: url
													}).then(res => {
													uni.hideLoading();
													if (res.code === 0) {
														that.$queue.showToast(
															"更新成功");
														that.getUserInfo();
													}
												});
											}
										});
									}
								});
							}
						}
					})
				}
			},
			//微信填写能力获取头像
			onChooseAvatar(e) {
				console.log(e.detail.avatarUrl)
				let that = this;
				let token = uni.getStorageSync('token');
				uni.showLoading({
					title: '上传中...'
				});
				let userId = uni.getStorageSync('userId');
				uni.uploadFile({
					url: that.config("APIHOST1") + '/alioss/upload', //真实的接口地址
					filePath: e.detail.avatarUrl,
					header: {
						token: token
					},
					name: 'file',
					success: uploadFileRes => {
						let url = JSON.parse(uploadFileRes.data).data;
						this.$Request.postJson("/app/user/updateUser", {
							avatar: url
						}).then(res => {
							uni.hideLoading();
							if (res.code === 0) {
								that.$queue.showToast(
									"更新成功");
								that.getUserInfo();
							}
						});

					}
				});
			},
			config: function(name) {
				var info = null;
				if (name) {
					var name2 = name.split("."); //字符分割
					if (name2.length > 1) {
						info = configdata[name2[0]][name2[1]] || null;
					} else {
						info = configdata[name] || null;
					}
					if (info == null) {
						let web_config = cache.get("web_config");
						if (web_config) {
							if (name2.length > 1) {
								info = web_config[name2[0]][name2[1]] || null;
							} else {
								info = web_config[name] || null;
							}
						}
					}
				}
				return info;
			},
			//是否会长
			getUserTd() {
				let data = {
					consortiaId: this.consortiaId
				}
				this.$Request.get("/app/consortia/selectConsortiaById", data).then(res => {
					if (res.code == 0) {
						let userId = res.data.userId
						let myUserId = this.$queue.getData('userId');
						if (myUserId == userId) {
							console.log('我是会长：' + '少时诵诗书')
							this.Huizhang = true
						} else {
							console.log('我不是会长：' + '少时诵诗书')
							this.Huizhang = false
						}
						uni.setStorageSync("Huizhang", this.Huizhang)
					}
				});

			},
			goNavs(e) {
				if (this.userId) {
					if (this.status == 1) {
						uni.showToast({
							title: '实名认证审核中，请稍等...',
							icon: 'none'
						})
					} else if (this.status == 2) {
						uni.navigateTo({
							url: e
						})
					} else {
						uni.navigateTo({
							url: '/my/renzheng/index'
						})
					}
				} else {
					uni.showModal({
						title: '提示',
						content: '您还未登录,请先登录',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({
									url: '/pages/public/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
			},
			goNav(e) {
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
			getUserInfo() {
				this.$Request.getT("/app/user/selectUserById").then(res => {
					if (res.code == 0) {
						if (res.data.vipEndTime) {
							this.vipEndTime = res.data.vipEndTime
							this.vip = res.data.vip
						}
						this.isRate = res.data.isRate ? res.data.isRate : 0;
						this.consortiaId = res.data.consortiaId
						uni.setStorageSync('consortiaId', res.data.consortiaId)
						if (this.consortiaId) {
							this.getUserTd()
						}
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
			getRenZheng() {
				this.$Request.get("/app/userCertification/queryInsert").then(res => {
					if (res.code == 0) {
						// 0审核中 1通过 2拒绝 
						if (res.data == null) {
							this.status = 0 //未实名
						} else if (res.data.status == 0) {
							this.status = 1 //审核中
						} else if (res.data.status == 1) {
							this.status = 2 //已实名
						} else if (res.data.status == 2) {
							this.status = 3 //已拒绝
						}
					}
				});
			},
			getIsVip() {
				this.$Request.get("/app/UserVip/isUserVip").then(res => {
					if (res.code == 0) {
						this.isVip = res.data
						uni.setStorageSync('isVIP', res.data)
					}
				});
			}

		}
	}
</script>

<style lang="scss">
	page {
		background: linear-gradient(0deg, #579EFF 0%, #579EFF 100%);
		min-height: 100vh;
	}

	button::after {
		border: none;
		background-color: none;
	}

	button {
		display: flex;
		align-items: center;
		position: relative;
		display: block;
		margin-left: auto;
		margin-right: auto;
		padding-left: 0px;
		padding-right: 0px;
		box-sizing: border-box;
		text-decoration: none;
		line-height: 96rpx;
		overflow: hidden;
		color: #FFFFFF;
		/* background-color: #fff; */
		background-color: rgba(255, 255, 255, 0) !important;
		font-size: 28rpx;
		width: 110rpx;
		height: 110rpx;
	}

	.sc_view {
		// position: relative;
		margin-top: 30rpx;
		// z-index: 99;

		.sc_itemview {
			// position: absolute;
			// z-index: 999;
			// top: 50rpx;
			background: #FFFFFF;
			width: 686rpx;
			height: 240rpx;
			border-radius: 40rpx;
			margin-left: 30rpx;
			padding: 20rpx 0rpx;
			display: flex;
			justify-content: space-between;

			.item_view {
				flex: 1;
				text-align: center;

				image {
					width: 140rpx;
					height: 140rpx;
				}
			}
		}
	}

	.centerImg_view {
		width: 688rpx;
		height: 181rpx;
	}

	.u-page__item__slot-icon {
		width: 40rpx;
		height: 40rpx;
	}

	.bg {
		background-color: #FFFFFF;
	}

	.user-info-box {
		width: 100%;
		align-items: center;
		display: flex;

		.portrait {
			width: 110upx;
			height: 110upx;
			border-radius: 100rpx;
			margin-left: 20upx;
		}

		.username {
			font-size: 38rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #FFFFFF;
			// margin-left: 10rpx;
			letter-spacing: 1rpx;
		}

		.username1 {
			font-size: 14px;
			color: whitesmoke;
			margin-left: 10px;
		}
	}

	.vipbox {
		background: linear-gradient(0deg, #FEF2DC 0%, #FEE4BF 100%);
		height: 140rpx;
		border-radius: 24upx;
		margin: 50rpx 30upx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30upx;
		color: #785831;

		image {
			width: 139rpx;
			height: 34rpx;
			margin-right: 20rpx;
		}
	}

	.btn-bg {
		width: 152rpx;
		height: 60rpx;
		background: #785831;
		border-radius: 30rpx;
		text-align: center;
		line-height: 62rpx;
		color: #FFF4E2;
	}



	.bgbox {
		background: #FFFFFF;
		padding: 50upx 0upx;
		border-radius: 16upx;
		margin: 30upx;
	}


	.bgbox2 {
		background: #FFFFFF;
		// padding: 40upx 30upx;
		border-radius: 24upx;
		margin: 30rpx;

		.bgbox2_title {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			margin: 20rpx 30rpx;
		}
	}

	.image_tu {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 25upx 35upx;
	}

	.image_tu image {
		width: 52upx;
		height: 52upx;
		margin-right: 20upx;
	}

	.images {
		display: flex;
		align-items: center;

	}
</style>