<template>
	<view style="padding-bottom: 100rpx;">
		<view v-if="homeIndex == 1">
			<view style="width: 620rpx;margin: 0 auto;margin-top: 30rpx;" v-if="itemDetail">
				<image v-if="!imageUrl" :src="itemDetail.gameImg"
					style="width: 620rpx;height: 600rpx;border-radius: 24rpx;"></image>
				<image v-if="imageUrl" @longpress="svaeImgs(imageUrl)" @tap="saveImg" :src="imageUrl"
					style="width: 620rpx;height: 600rpx;border-radius: 24rpx;"></image>
			</view>
			<view class="center_view" v-if="tabIndex && !imageUrl">
				<view class="flex align-center">
					<view class="item_name">输入姓氏</view>
					<input type="text" v-model="xingshi1" class="item_inputview" placeholder="请输入姓氏"
						placeholder-style="color:#999999" />
				</view>
				<view class="flex align-center margin-top-sm" v-if="tabIndex != 3">
					<view class="item_name">选择成语</view>
					<view class="item_inputview flex justify-between align-center">
						<!-- <view>{{chengyu1 ? chengyu1 : '请输入或选择成语'}}</view> -->
						<input type="text" v-model="chengyu1" maxlength="4" placeholder="请选择/输入成语"
							placeholder-style="color:#999999"
							style="width: 260rpx;font-size: 28rpx;line-height: 70rpx;" />
						<!-- <view style="color: #579EFF;" @tap="chooseMsg(xingshi1,1)">选择</view> -->
						<image src="../../static/image/my/down.png" @tap="chooseMsg(xingshi1,1)"></image>
					</view>
				</view>
				<view style="margin-top: 60rpx;" v-if="tabIndex == 1 || tabIndex == 2">
					<view class="flex align-center">
						<view class="item_name">输入姓氏</view>
						<input type="text" v-model="xingshi2" class="item_inputview" placeholder="请输入姓氏"
							placeholder-style="color:#999999" />
					</view>
					<view class="flex align-center margin-top-sm">
						<view class="item_name">选择成语</view>
						<!-- <input type="text" disabled v-model="chengyu2" class="item_inputview" placeholder="请选择成语" /> -->
						<!-- <view class="item_inputview">{{chengyu2 ? chengyu2 : '请选择成语'}}</view> -->
						<view class="item_inputview flex justify-between align-center">
							<!-- <view>{{chengyu1 ? chengyu1 : '请输入或选择成语'}}</view> -->
							<input type="text" v-model="chengyu2" maxlength="4" placeholder="请选择/输入成语"
								placeholder-style="color:#999999"
								style="width: 260rpx;font-size: 28rpx;line-height: 70rpx;" />
							<!-- <view style="color: #579EFF;" @tap="chooseMsg(xingshi2,2)">选择</view> -->
							<image src="../../static/image/my/down.png" @tap="chooseMsg(xingshi2,2)"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="save_text" v-if="imageUrl">注*长按图片即可保存到相册</view>
			<view class="save_btn" @tap="save()" v-if="!imageUrl && showPlay=='是'">立即生成</view>


			<!-- #ifdef MP-WEIXIN || MP-TOUTIAO -->
			<view class="save_btn" @tap="openVideoAd()" v-if="!imageUrl && isGuanggao === '是'">看广告免费生成</view>
			<button class="save_btn1" open-type="share">分享好友</button>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN || MP-TOUTIAO -->
			<button class="save_btn1" @click="sharurl()">分享好友</button>
			<!-- #endif -->

		</view>
		<view v-if="homeIndex == 2 || homeIndex == 3">
			<view style="width: 620rpx;margin: 0 auto;margin-top: 30rpx;" v-if="itemDetail">
				<text v-if="!imageUrl"
					style="transform: rotate(45deg);position: absolute;z-index: 999;text-align: center;color: aliceblue;margin: 160upx;font-size: 40upx;">下载后无水印</text>
				<block v-if="homeIndex==2">
					<image v-if="!imageUrl" :src="itemDetail.gameImg"
						style="width: 620rpx;height: 600rpx;border-radius: 24rpx;"></image>

					<image v-if="imageUrl" @longpress="svaeImgs(imageUrl)" @tap="saveImg" :src="imageUrl"
						style="width: 620rpx;height: 600rpx;border-radius: 24rpx;"></image>
				</block>
				<block v-if="homeIndex == 3">
					<image v-if="!imageUrl" :src="itemDetail.gameImg"
						style="width: 620rpx;height: 600rpx;border-radius: 24rpx;" mode="widthFix"></image>

					<image v-if="imageUrl" @longpress="svaeImgs(imageUrl)" @tap="saveImg" :src="imageUrl"
						style="width: 620rpx;height: 600rpx;border-radius: 24rpx;" mode="widthFix"></image>
				</block>

			</view>

			<view class="save_text" v-if="imageUrl">注*长按图片即可保存到相册</view>
			<view class="save_btn" @tap="dysave()" v-if="!imageUrl && showPlay=='是'">立即下载</view>
			<!-- #ifdef MP-WEIXIN || MP-TOUTIAO -->
			<view class="save_btn" @tap="openVideodyAd()" v-if="!imageUrl && isGuanggao === '是'">看广告免费下载</view>
			<button class="save_btn1" open-type="share">分享好友</button>
			<!-- #endif -->
		</view>
		<u-popup :safeAreaInsetBottom="false" bgColor="transparent" :show="payshow" @close="payshow = false">
			<view
				style="background: linear-gradient(193deg, #579EFF 0%, #FFFFFF 61%, #FFFFFF 100%);border-radius: 42rpx 42rpx 0rpx 0rpx;">
				<view
					style="width: 100%;text-align: center;font-size:38rpx;font-weight: bold;margin-top:15rpx;margin-bottom: 80rpx;">
					选择支付方式
				</view>
				<view style="display: flex;height: 100upx;align-items: center;padding: 20upx 30rpx;"
					v-for="(item,index) in openLists" :key='index'>
					<view style="display: flex;width:80%;align-items: center;">
						<image :src="item.image" style="width: 55upx;height: 55upx;border-radius: 50upx;"></image>
						<view style="font-size: 30upx;margin-left: 20upx;width: 70%;">{{item.text}}
						</view>
					</view>
					<view style="width: 20%;display: flex;justify-content: flex-end;">
						<radio-group name="openWay" style="margin-left: 20upx;" @tap='selectWay(item.id)'>
							<label class="tui-radio">
								<radio color="#579EFF" :checked="openWay === item.id ? true : false" />
							</label>
						</radio-group>
					</view>
				</view>
				<view
					style="width: 690rpx;height: 80rpx;background: linear-gradient(0deg, #FDCE75 0%, #FEEA92 100%);color:#151515;text-align: center;line-height: 80rpx;border-radius: 50rpx;margin: 30rpx;"
					@tap="pay()">确认支付</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	// #ifdef MP-WEIXIN || MP-TOUTIAO
	var videoAd = null;
	// #endif
	export default {
		data() {
			return {
				isRight: false,
				imageUrl: '',
				payshow: false,
				msgContents: [],
				msgContents2: [],
				chengyu1: '',
				chengyu2: '',
				xingshi1: '',
				xingshi2: '',
				itemDetail: {},
				tabIndex: 0,
				openWay: 0,
				openLists: [],
				timers: null,
				gameId: '',
				tuiguang: '',
				bgImg: '',
				ordersNum: '',
				invitationCode: '',
				isGuanggao: '否',
				adUnitId: '',
				homeIndex: 0,
				showPlay: '否', //是否开启支付
			}
		},
		onLoad(d) {
			if (d.homeIndex) {
				this.homeIndex = d.homeIndex;
				if (this.homeIndex == 1) {
					uni.setNavigationBarTitle({
						title: '头像制作生成'
					})
				} else if (this.homeIndex == 2) {
					uni.setNavigationBarTitle({
						title: '头像下载'
					})
				} else if (this.homeIndex == 3) {
					uni.setNavigationBarTitle({
						title: '壁纸下载'
					})
				}
			} else {
				uni.setNavigationBarTitle({
					title: '头像制作生成'
				})
			}
			if (d.tabIndex) {
				this.tabIndex = d.tabIndex;
			}
			if (d.gameId) {
				this.gameId = d.gameId;
				this.getGameDetail();
			}
			// this.itemDetail = this.$queue.getData('imageItem');

			// #ifdef MP-WEIXIN
			if (d.scene) { //这里为线上操作
				//此处的二维码  page/index/index?brokerId=123
				let scene = decodeURIComponent(d.scene);
				scene = scene.split(',')
				uni.setStorageSync('invitation', scene[0])
			}
			// #endif
			if (d.invitation) {
				uni.setStorageSync('invitation', d.invitation)
			}


			// #ifdef APP-PLUS
			this.openLists = [{
				image: '../../my/static/icon_weixin.png',
				text: '微信',
				id: 2
			}, {
				image: '../../my/static/zhifubao.png',
				text: '支付宝',
				id: 1
			}];
			this.openWay = 2;
			// #endif

			this.$Request.getT('/app/common/type/116').then(res => {
				if (res.code === 0) {
					if (res.data && res.data.value) {
						this.tuiguang = res.data.value;
					}
				}
			});
			this.$Request.getT('/app/banner/selectBannerList?state=-1&classify=5').then(res => {
				if (res.code === 0) {
					this.bgImg = res.data[0].imageUrl;
				}
			});

			// #ifdef MP-WEIXIN || MP-TOUTIAO
			this.isGuanggao = uni.getStorageSync('isGuanggao');
			// #ifdef MP-WEIXIN
			this.adUnitId = uni.getStorageSync('adUnitId');
			if (this.isGuanggao == '是' && this.adUnitId) {
				this.adLoad()
			}
			// #endif
			// #ifdef MP-TOUTIAO
			this.adUnitId = uni.getStorageSync('dyadUnitId');
			if (this.isGuanggao == '是' && this.adUnitId) {
				this.adLoad()
			}
			// #endif
			// #endif
		},
		onShow() {
			if (uni.getStorageSync('showPlay')) {
				this.showPlay = uni.getStorageSync('showPlay')
			}
			let token = this.$queue.getData('token');
			if (token) {
				this.getUserInfo();
			}
		},
		onShareAppMessage(res) {
			return {
				path: '/pages/index/index?invitation=' + this.invitationCode, //这是为了传参   onload(data){let id=data.id;} 
				title: this.tuiguang,
				imageUrl: this.bgImg
			}
		},
		onShareTimeline(res) {
			return {
				path: '/pages/index/index?invitation=' + this.invitationCode, //这是为了传参   onload(data){let id=data.id;} 
				title: this.tuiguang,
				imageUrl: this.bgImg
			}
		},
		onUnload() {
			clearInterval(this.timers);
		},
		onBackPress() {
			clearInterval(this.timers);
		},
		methods: {
			svaeImgs(url) {
				//#ifdef APP-PLUS || MP-TOUTIAO || MP-KUAISHOU
				uni.getImageInfo({
					src: url,
					success: function(image) {
						console.log('图片信息：', JSON.stringify(image));
						uni.saveImageToPhotosAlbum({
							filePath: image.path,
							success: function() {
								console.log('save success');
								uni.showToast({
									title: '已保存',
									icon: 'success',
									duration: 2000
								});
							}
						});
					}
				});
				//#endif
			},
			sharurl() {
				let that = this;
				let token = this.$queue.getData('token');
				if (!token) {
					uni.navigateTo({
						url: '/pages/public/login'
					})
					return;
				}
				// this.$queue.showLoading('加载中...');
				let relationId = this.invitationCode;
				uni.showModal({
					title: '文案推广',
					content: this.tuiguang + '\n' + this.url,
					showCancel: true,
					cancelText: '关闭',
					confirmText: '一键复制',
					success: res => {
						if (res.confirm) {
							uni.setClipboardData({
								data: this.tuiguang + '\n' + this.url,
								success: function() {
									console.log('success');
									that.$queue.showToast('复制成功');
								}
							});
						}
					}
				});
			},
			//获取用户信息
			getUserInfo() {
				this.$Request.getT("/app/user/selectUserById").then(res => {
					if (res.code == 0) {
						this.invitationCode = res.data.invitationCode
						uni.setStorageSync('avatar', res.data.avatar)
						uni.setStorageSync('invitationCode', res.data.invitationCode)
						uni.setStorageSync('zhiFuBao', res.data.zhiFuBao)
						uni.setStorageSync('zhiFuBaoName', res.data.zhiFuBaoName)

						// #ifdef H5
						this.url = this.$queue.publicYuMing() + '/?invitation=' + this.invitationCode;
						//#endif
					}
				});
			},
			getGameDetail() {
				if (this.homeIndex == 1) {
					this.$Request.getT('/app/appGame/selectGameById?gameId=' + this.gameId).then(res => {
						if (res.code == 0) {
							this.itemDetail = res.data;
						}
					});
				} else if (this.homeIndex == 2 || this.homeIndex == 3) {
					this.$Request.getT('/app/appGame/selectGameUserDetails?gameId=' + this.gameId).then(res => {
						if (res.code == 0) {
							if (res.data) {
								this.itemDetail = res.data;
								this.imageUrl = res.data.noWatermarkImage;
							} else {
								let userId = this.$queue.getData('userId');
								this.$Request.getT('/app/appGame/selectGameById?gameId=' + this.gameId +
									'&userId=' + userId).then(res => {
									if (res.code == 0) {
										this.itemDetail = res.data;
									}
								});
							}
						}
					});
				}
			},
			saveImg() {
				let that = this;
				let imgArr = []
				imgArr.push(that.imageUrl);
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[0]
				});
			},
			selectWay(id) {
				this.openWay = id;
			},
			dysave() {
				let token = this.$queue.getData('token');
				if (!token) {
					uni.navigateTo({
						url: '/pages/public/login'
					})
					return;
				}
				let that = this;
				// #ifdef MP-TOUTIAO
				let data = {
					gameId: this.itemDetail.id
				}
				this.$Request.postT('/app/dyPay/payWatermark', data).then(res => {
					if (res.code == 0) {
						let payInfo = JSON.parse(res.data)
						let orderInfo = {
							order_id: payInfo.order_id,
							order_token: payInfo.order_token
						}
						uni.getProvider({
							service: 'payment',
							success(ret) {
								uni.requestPayment({
									orderInfo: orderInfo,
									provider: ret.provider[0],
									service: 5,
									success(rep) {
										if (rep.code == 0) {
											uni.showLoading({
												title: '支付成功'
											});
											uni.hideLoading();
											that.getGameDetail();
										} else {
											uni.showToast({
												title: '支付失败,请重试',
												icon: 'none',
												duration: 2000,
											})
										}
									}
								})
							},
							fail() {
								uni.showToast({
									title: '拉起支付失败,请重试',
									icon: 'none',
									duration: 2000,
								})
							}
						})
					} else {
						this.$queue.showToast(res.msg);
					}
				})
				// #endif
			},


			save() {

				let token = this.$queue.getData('token');
				if (!token) {
					uni.navigateTo({
						url: '/pages/public/login'
					})
					return;
				}

				if (this.xingshi1 == '') {
					this.$queue.showToast('请输入姓氏！');
					return;
				}

				if (this.tabIndex != 3) {
					if (this.chengyu1 == '') {
						this.$queue.showToast('请选择成语！');
						return;
					}

					if (this.chengyu1.indexOf(this.xingshi1) !== -1 || this.chengyu1.indexOf(this.xingshi1) !== -1) {

					} else {
						this.$queue.showToast('成语中需包含姓氏文字！');
						return;
					}
				}
				if (this.tabIndex == 1 || this.tabIndex == 2) {
					if (this.xingshi2 == '') {
						this.$queue.showToast('请输入姓氏！');
						return;
					}
					if (this.chengyu2 == '') {
						this.$queue.showToast('请选择成语！');
						return;
					}

					if (this.chengyu2.indexOf(this.xingshi2) !== -1 || this.chengyu2.indexOf(this.xingshi2) !== -1) {

					} else {
						this.$queue.showToast('成语中需包含姓氏文字！');
						return;
					}
				}
				let that = this;
				uni.showLoading({
					title: '正在生成中请稍等...',
					mask: false
				});
				let content = this.xingshi2 + this.xingshi1 + this.chengyu1 + this.chengyu2;
				this.$Request.postJson('/app/user/checkText', {
					content: content
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: "正在拉起支付...",
						icon: 'none'
					})
					if (res.code == 0) {
						let userId = this.$queue.getData('userId');
						this.ordersNum = Number(new Date()) + '' + userId

						// #ifdef APP-PLUS
						this.payshow = true;
						// #endif

						// #ifndef APP-PLUS

						// #ifdef MP-TOUTIAO
						let data = {
							type: 6,
							ordersNum: this.ordersNum,
							gameId: this.itemDetail.id,
							oneName: this.xingshi1,
							oneIdiom: this.chengyu1,
							twoName: this.xingshi2,
							twoIdiom: this.chengyu2
						}
						this.$Request.postT('/app/dyPay/payAvatar', data).then(res => {
							if (res.code == 0) {
								let payInfo = JSON.parse(res.data)
								let orderInfo = {
									order_id: payInfo.order_id,
									order_token: payInfo.order_token
								}
								uni.getProvider({
									service: 'payment',
									success(ret) {
										uni.requestPayment({
											orderInfo: orderInfo,
											provider: ret.provider[0],
											service: 5,
											success(rep) {
												if (rep.code == 0) {
													uni.showLoading({
														title: '支付成功'
													});
													uni.hideLoading();
													that.getLunXun(that.ordersNum)
												} else {
													uni.showToast({
														title: '支付失败,请重试',
														icon: 'none',
														duration: 3000,
													})
												}
											}
										})
									},
									fail() {
										uni.showToast({
											title: '拉起支付失败,请重试',
											icon: 'none',
											duration: 3000,
										})
									}
								})
							} else {
								this.$queue.showToast(res.msg);
							}
						})
						// #endif


						// #ifdef MP-WEIXIN
						let data = {
							type: 3,
							ordersNum: this.ordersNum,
							gameId: this.itemDetail.id,
							oneName: this.xingshi1,
							oneIdiom: this.chengyu1,
							twoName: this.xingshi2,
							twoIdiom: this.chengyu2
						}
						this.$Request.postT('/app/wxPay/payAvatar', data).then(res => {
							if (res.code == 0) {
								uni.requestPayment({
									provider: 'wxpay',
									timeStamp: res.data.timestamp,
									nonceStr: res.data.noncestr,
									package: res.data.package,
									signType: res.data.signType,
									paySign: res.data.sign,
									success: function(redd) {
										uni.showLoading({
											title: '支付成功'
										});
										uni.hideLoading();
										that.getLunXun(that.ordersNum)
									},
									fail: function(err) {
										uni.hideLoading();
										that.$queue.showToast(
											'支付失败');
									}
								});
							} else {
								that.$queue.showToast(res.msg);
							}
						})
						// #endif

						// #ifdef H5

						let ua = navigator.userAgent.toLowerCase();
						if (ua.indexOf('micromessenger') !== -1) {
							let data = {
								type: 2,
								ordersNum: this.ordersNum,
								gameId: this.itemDetail.id,
								oneName: this.xingshi1,
								oneIdiom: this.chengyu1,
								twoName: this.xingshi2,
								twoIdiom: this.chengyu2
							}
							this.$Request.postT('/app/wxPay/payAvatar', data).then(res => {
								if (res.code == 0) {
									that.callPay(res.data);
								} else {
									that.$queue.showToast(res.msg);
								}
							})
						} else {
							let data = {
								classify: 5,
								ordersNum: this.ordersNum,
								gameId: this.itemDetail.id,
								oneName: this.xingshi1,
								oneIdiom: this.chengyu1,
								twoName: this.xingshi2,
								twoIdiom: this.chengyu2
							}
							this.$Request.postT('/app/aliPay/payAvatar', data).then(res => {
								if (res.code == 0) {
									const div = document.createElement('div')
									div.innerHTML = res.data //此处form就是后台返回接收到的数据
									document.body.appendChild(div)
									document.forms[0].submit()
								} else {
									that.$queue.showToast(res.msg);
								}
							})
						}
						// #endif

					} else {
						that.$queue.showToast('因相关法律和要求，相关内容不予展示或搜索');


					}

				})

				// #endif

			},
			openVideodyAd() {
				let that = this

				let token = this.$queue.getData('token');
				if (!token) {
					uni.navigateTo({
						url: '/pages/public/login'
					})
					return;
				}

				console.log(videoAd, 333333333)
				if (videoAd) {
					videoAd.show().catch(err => {
						console.log(' 广告拉取失败，重试')
						// 广告拉取失败，重试
						videoAd.load().then(() => {
							videoAd.show();
						});
					})
				}
			},
			//拉取广告
			openVideoAd() {
				let that = this

				let token = this.$queue.getData('token');
				if (!token) {
					uni.navigateTo({
						url: '/pages/public/login'
					})
					return;
				}
				if (this.xingshi1 == '') {
					this.$queue.showToast('请输入姓氏！');
					return;
				}
				if (this.tabIndex != 3) {
					if (this.chengyu1 == '') {
						this.$queue.showToast('请选择成语！');
						return;
					}

					if (this.chengyu1.indexOf(this.xingshi1) !== -1 || this.chengyu1.indexOf(this.xingshi1) !== -1) {

					} else {
						this.$queue.showToast('成语中需包含姓氏文字！');
						return;
					}
				}
				if (this.tabIndex == 1 || this.tabIndex == 2) {
					if (this.xingshi2 == '') {
						this.$queue.showToast('请输入姓氏！');
						return;
					}
					if (this.chengyu2 == '') {
						this.$queue.showToast('请选择成语！');
						return;
					}

					if (this.chengyu2.indexOf(this.xingshi2) !== -1 || this.chengyu2.indexOf(this.xingshi2) !== -1) {

					} else {
						this.$queue.showToast('成语中需包含姓氏文字！');
						return;
					}
				}
				uni.showLoading({
					title: '正在生成中请稍等...',
					mask: false
				});
				let content = this.xingshi2 + this.xingshi1 + this.chengyu1 + this.chengyu2;
				this.$Request.postJson('/app/user/checkText', {
					content: content
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: "正在拉起广告",
						icon: 'none'
					})
					if (res.code == 0) {
						if (videoAd) {
							videoAd.show().catch(err => {
								console.log(' 广告拉取失败，重试')
								// 广告拉取失败，重试
								videoAd.load().then(() => {
									videoAd.show();
								});
							})
						}

					} else {
						that.$queue.showToast('因相关法律和要求，相关内容不予展示或搜索');



					}

				})

			},
			getLunXun(ordersNum) {
				let that = this;
				that.$queue.showLoading('制作中...')
				let data = {
					ordersNum: ordersNum
				}
				this.$queue.setData('ordersNum', ordersNum);
				this.$Request.getT('/app/appGame/selectGameImgByOrdersNum', data).then(res => {
					if (res.code == 0) {
						if (!res.data) {
							that.timers = setInterval(function() {
								that.getLunXun(ordersNum)
								clearInterval(that.timers);
							}, 6000);
						} else if (res.data) {
							uni.hideLoading();
							that.$queue.removeItem('ordersNum');
							clearInterval(that.timers);
							that.imageUrl = res.data.gameImage;
							that.ordersNum = '';
						}
					} else {
						uni.hideLoading();
						that.$queue.removeItem('ordersNum');
						that.$queue.showToast(res.msg)
						that.ordersNum = '';
					}
				});
			},
			//获取
			adLoad() {
				let that = this
				let adUnitIds = that.adUnitId;
				if (uni.createRewardedVideoAd) {
					videoAd = uni.createRewardedVideoAd({
						adUnitId: that.adUnitId //你的广告key,从微信小程序后台>流量主>广告管理获取
					});
					console.log(videoAd, '广告广告广告广告11111')
					videoAd.onError(err => {
						console.log(err);
					});

					try {
						if (videoAd.closeHandler) {
							videoAd.offClose(videoAd.closeHandler);
							console.log("videoAd.offClose卸载成功");
						}
					} catch (e) {
						console.log("videoAd.offClose 卸载失败");
						console.error(e);
					}
					videoAd.closeHandler = function(res) {
						// 用户点击了【关闭广告】按钮
						if (res && res.isEnded || res === undefined) {
							//广告播放完成后的的业务逻辑
							console.log('播放成功')
							uni.showToast({
								title: '生成中'
							})
							if (that.homeIndex == 1) {
								let data = {
									gameId: that.itemDetail.id,
									oneName: that.xingshi1,
									oneIdiom: that.chengyu1,
									twoName: that.xingshi2,
									twoIdiom: that.chengyu2
								}
								that.$Request.postT('/app/appGame/notifyAvatar', data).then(res => {
									uni.hideLoading();
									if (res.code == 0) {
										that.imageUrl = res.data;
										that.ordersNum = '';
										that.videoAd = null;
									} else {
										that.$queue.showToast(res.msg);
									}
								})
							} else if (that.homeIndex == 2 || that.homeIndex == 3) {
								let data = {
									gameId: that.itemDetail.id
								}
								that.$Request.postT('/app/appGame/notifyWatermark', data).then(res => {
									uni.hideLoading();
									if (res.code == 0) {
										that.imageUrl = res.data;
										that.ordersNum = '';
										that.videoAd = null;
									} else {
										that.$queue.showToast(res.msg);
									}
								})
							}
						} else {
							//广告播放失败或者未播放完成
							console.log('播放失败或者未播放完成')
							uni.showToast({
								title: '未完整观看视频不能获取奖励哦',
								icon: 'none'
							})
						}
					};
					videoAd.onClose(videoAd.closeHandler);

					// videoAd.onClose((status) => {
					// 	if (status && status.isEnded || status === undefined) {

					// 	} else {
					// 		//广告播放失败或者未播放完成
					// 		console.log('播放失败或者未播放完成')
					// 		uni.showToast({
					// 			title: '未完整观看视频不能获取奖励哦',
					// 			icon: 'none'
					// 		})
					// 	}
					// });
				}
			},
			pay() {
				this.payshow = false;
				let that = this;
				this.ordersNum = Number(new Date()) + '' + userId

				if (this.openWay == 2) {
					let data = {
						type: 1,
						ordersNum: this.ordersNum,
						gameId: this.itemDetail.id,
						oneName: this.xingshi1,
						oneIdiom: this.chengyu1,
						twoName: this.xingshi2,
						twoIdiom: this.chengyu2
					}
					this.$Request.postT('/app/wxPay/payAvatar', data).then(res => {
						if (res.code == 0) {
							that.setPayment('wxpay', JSON.stringify(res
								.data));
						} else {
							that.$queue.showToast(res.msg);
						}
					})
				} else {
					let data = {
						ordersNum: this.ordersNum,
						classify: 4,
						gameId: this.itemDetail.id,
						oneName: this.xingshi1,
						oneIdiom: this.chengyu1,
						twoName: this.xingshi2,
						twoIdiom: this.chengyu2
					}
					this.$Request.postT('/app/aliPay/payAvatar', data).then(res => {
						if (res.code == 0) {
							that.setPayment('alipay', res.data);
						} else {
							that.$queue.showToast(res.msg);
						}
					})
				}

			},
			callPay: function(response) {
				if (typeof WeixinJSBridge === "undefined") {
					if (document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(response), false);
					} else if (document.attachEvent) {
						document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(response));
						document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(response));
					}
				} else {
					this.onBridgeReady(response);
				}
			},
			onBridgeReady: function(response) {
				let that = this;
				if (!response.package) {
					return;
				}
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId": response.appid, //公众号名称，由商户传入
						"timeStamp": response.timestamp, //时间戳，自1970年以来的秒数
						"nonceStr": response.noncestr, //随机串
						"package": response.package,
						"signType": response.signType, //微信签名方式：
						"paySign": response.sign //微信签名
					},
					function(res) {
						if (res.err_msg === "get_brand_wcpay_request:ok") {
							// 使用以上方式判断前端返回,微信团队郑重提示：
							//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
							uni.showLoading({
								title: '支付成功'
							});
							uni.hideLoading();
							that.getLunXun(that.ordersNum)
						} else {
							uni.hideLoading();
						}
						WeixinJSBridge.log(response.err_msg);
					}
				);
			},
			setPayment(name, order) {
				let that = this;
				uni.requestPayment({
					provider: name,
					orderInfo: order, //微信、支付宝订单数据
					success: function(res) {
						uni.showLoading({
							title: '支付成功'
						});
						uni.hideLoading();
						that.getLunXun(that.ordersNum)
					},
					fail: function(err) {
						uni.hideLoading();
					}
				});
			},
			chooseMsg(title, index) {
				let token = this.$queue.getData('token');
				if (!token) {
					uni.navigateTo({
						url: '/pages/public/login'
					})
					return;
				}
				if (!title) {
					this.$queue.showToast('请输入对应姓氏！');
					return;
				}
				this.getDetail(title, index)
			},
			getDetail(title, index) {
				this.$queue.showLoading('查询中...')
				this.$Request.getT('/app/message/selectMessageByType?state=10&page=1&limit=100&title=' + title)
					.then(
						res => {
							if (res.code == 0) {
								uni.hideLoading();
								if (res.data.list && res.data.list.length == 0) {
									this.$queue.showToast('未找到对应的成语！')
									return;
								}
								let listDetail = []
								res.data.list.forEach(d => {
									listDetail.push(d.title);
								});
								if (index == 1) {
									this.msgContents = listDetail;
									//快速输入
									uni.showActionSheet({
										itemList: this.msgContents,
										success: res => {
											this.chengyu1 = this.msgContents[res.tapIndex];
										}
									});
								} else {
									this.msgContents2 = listDetail;
									//快速输入
									uni.showActionSheet({
										itemList: this.msgContents2,
										success: res => {
											this.chengyu2 = this.msgContents2[res.tapIndex];
										}
									});
								}

							} else {
								this.$queue.showToast(res.msg);
							}
						});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #579EFF;
	}

	.save_text {
		width: 620rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #151515;
		margin: 0 auto;
		margin-top: 30rpx;
	}

	.save_btn {
		width: 620rpx;
		height: 99rpx;
		background: linear-gradient(0deg, #FDCE75 0%, #FEEA92 100%);
		border-radius: 24rpx;
		text-align: center;
		line-height: 99rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #151515;
		margin: 0 auto;
		margin-top: 30rpx;
	}

	.save_btn1 {
		width: 620rpx;
		height: 99rpx;
		background: #F0F6FF;
		border-radius: 24rpx;
		text-align: center;
		line-height: 99rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #151515;
		margin: 0 auto;
		margin-top: 30rpx;
	}

	.center_view {
		width: 620rpx;
		margin: 0 auto;
		padding: 40rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
		margin-top: 30rpx;

		.item_name {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #212121;
		}

		.item_inputview {
			width: 396rpx;
			height: 71rpx;
			line-height: 70rpx;
			background: #FFFFFF;
			color: #999999;
			border: 1px solid #579EFF;
			border-radius: 12rpx;
			margin-left: 20rpx;
			font-size: 28rpx;
			padding: 0rpx 20rpx;

			image {
				width: 18rpx;
				height: 10rpx;
			}
		}
	}
</style>