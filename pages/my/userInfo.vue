<template>
	<view>
		<view class="usermain">
			<view class="usermain-item item-padding bg flex align-center">
				<view>头像</view>
				<!-- #ifdef MP-WEIXIN -->
				<view>
					<button open-type="chooseAvatar" @chooseavatar="onChooseAvatar" style="background: #FFFFFF;">
						<image src="../../static/logo.png" v-if="avatar==null" mode=""
							style="width: 111rpx;height: 111rpx;border-radius: 20%;"></image>
						<image v-else :src="avatar" mode="" style="width: 111rpx;height: 111rpx;border-radius: 20%;">
						</image>
					</button>
				</view>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<view @click="uploadImg()">
					<image src="../../static/logo.png" v-if="avatar==null" mode=""
						style="width: 111rpx;height: 111rpx;border-radius: 20%;"></image>
					<image v-else :src="avatar" mode="" style="width: 111rpx;height: 111rpx;border-radius: 20%;">
					</image>
				</view>
				<!-- #endif -->
			</view>
			<view class="usermain-item item-padding">
				<view class="flex align-center padding-bottom-xs" style="border-bottom: 3rpx solid #f7f7f7;">
					<view>昵称</view>
					<view class="margin-left">
						<view class="cu-form-group">
							<input type="nickname" v-model="userName" placeholder="请输入昵称" />
						</view>
					</view>
				</view>
				
				<view class="flex align-center margin-top-xs">
					<view>性别</view>
					<view>
						<view class="cu-form-group margin-left">
							<u-radio-group v-model="sex">
								<u-radio shape="circle" active-color="#579EFF" :name="1">男</u-radio>
								<u-radio style="margin-left: 20rpx;" shape="circle" active-color="#579EFF" :name="2">女</u-radio>
							</u-radio-group>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="usermain-item item-padding ">
				<view>年龄</view>
				<view>
					<view class="cu-form-group">
						<input v-model="age" />
					</view>
				</view>
			</view> -->
			<!-- <view class="usermain-item item-padding">
				<view  >姓名</view>
				<view class="cu-form-group">
					<input    v-model="realName" placeholder="请填写您的真实姓名" />
				</view>
			</view> -->

			<!-- <view class="usermain-item item-padding ">
				<view>手机</view>
				<view>
					<view class="cu-form-group">
						<input v-model="phone" disabled placeholder="请输入联系电话" />
					</view>
				</view>
			</view> -->
		</view>
		<view class="footer-btn">
			<view class="usermain-btn" @click="messagebtn()">保存</view>
		</view>
	</view>
</template>

<script>
	import configdata from '../../common/config.js';
	export default {
		data() {
			return {
				phone: '',
				avatar: '../../static/logo.png',
				userName: '',
				nickName: '',
				userId: '',
				realName: '',
				weChatId: "",
				password: '',
				platform: '',
				createTime: '',
				money: '',
				jiFen: '',
				status: '',
				zhiFuBao: '',
				zhiFuBaoName: '',
				sex: 1,
				age: 0,
				checkPer: true,
			};
		},
		onLoad(e) {
			this.getUserInfo()
			// this.avatar = uni.getStorageSync('avatar')
		},
		methods: {
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
						let url = JSON.parse(uploadFileRes.data);
						that.avatar = url.data
						uni.hideLoading();
					}
				});
			},
			goMyAddress() {
				uni.navigateTo({
					url: '../jifen/myaddress'
				});
			},
			uploadImg() {
				let token = uni.getStorageSync('token')

				if (!token) {
					this.goLoginInfo();
					return;
				}
				// #ifdef APP-PLUS
				if (!this.checkPer) {
					uni.showModal({
						title: '相机服务已关闭',
						content: "您需要打开相机权限，否则我们将无法获得到您的相册信息，请到>设置>隐私>应用权限>中开启【码兄到家】读取相册权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
					return;
				}
				// #endif

				let that = this;
				var url = null;
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
									let userId = uni.getStorageSync('userId');
									uni.uploadFile({
										url: that.config("APIHOST1") +
											'/alioss/upload', //真实的接口地址

										filePath: res.tempFilePaths[0],
										header: {
											token: token
										},
										name: 'file',
										success: uploadFileRes => {
											url = JSON.parse(uploadFileRes.data);
											that.avatar = url.data
											uni.hideLoading();
										}
									});
								}
							});
						}
					}
				})
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
			getUserInfo() {
				let userId = uni.getStorageSync('userId')
				this.$Request.getT("/app/user/selectUserById").then(res => {
					if (res.code == 0) {
						this.$queue.setData('avatar', res.data.avatar);
						this.$queue.setData('userId', res.data.userId);
						this.$queue.setData('userName', res.data.userName);
						this.$queue.setData('phone', res.data.phone);
						this.$queue.setData('age', res.data.age);
						this.sex = res.data.sex
						this.age = res.data.age
						this.phone = res.data.phone;
						this.avatar = res.data.avatar;
						this.userName = res.data.userName;
						if (this.userName == null) {
							this.userName = res.data.nickName;
						} else {
							this.userName = res.data.userName;
						}
					}
					uni.hideLoading();
				});


			},
			// 保存
			messagebtn() {
				if (!this.userName) {
					// this.$queue.showToast('用户名不能为空');
					uni.showToast({
						title: "昵称不能为空",
						icon: "none"
					})
				} else {
					uni.showModal({
						title: '温馨提示',
						content: '确定保存信息',
						success: e => {
							if (e.confirm) {
								this.$Request.postJson("/app/user/updateUser", {
									userName: this.userName,
									avatar: this.avatar,
									sex: this.sex,
									age: this.age
								}).then(res => {
									if (res.code === 0) {
										uni.showToast({
											title: '保存成功',
											icon: "none"
										})
										setTimeout(function() {
											uni.navigateBack()
										}, 1000)
									} else {
										uni.showToast({
											title: res.msg,
											icon: "none"
										})
									}
								})
							}
						}
					});
				}
			}
		},
		// userphone(){
		// 	uni.navigateTo({
		// 		url:'/pages/my/userphone'
		// 	})
		// }

	};
</script>

<style>
	page {
		background: #579EFF;
		height: 100vh;
	}

	button::after {
		border: none;
	}

	.bg {
		background: #FFFFFF;
	}

	.usermain {
		width: 686rpx;
		margin: 0 auto;
		margin-top: 30rpx;
		border-radius: 24rpx;
		/* color: #fff; */
	}

	.usermain-item {
		background: #FFFFFF;
		justify-content: space-between;
		border-bottom: 1rpx solid #579EFF;
		margin-top: 20rpx;
		border-radius: 24rpx;
		/* border-bottom: 2rpx solid #f2f2f2; */
	}

	.usermain-item.item-padding {
		padding: 40rpx;
	}

	.cu-form-group {
		padding: 0;
		background: #ffffff;
		text-align: left;
		width: 500rpx;
	}

	.cu-form-group input {
		background: #ffffff;
		font-size: 28rpx;
		/* color: #fff; */
	}

	.footer-btn {
		margin-top: 86rpx;
	}

	.footer-btn .usermain-btn {
		width: 686rpx;
		height: 87rpx;
		background: linear-gradient(0deg, #FDCE75 0%, #FEEA92 100%);
		/* border: 1rpx solid #FFCBE8; */
		border-radius: 16rpx;
		text-align: center;
		line-height: 87rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #151515;
		margin: 0 auto;
	}
</style>