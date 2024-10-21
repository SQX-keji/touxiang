export default {
	onShareAppMessage(res) { //发送给朋友
		return {
			title: uni.getStorageSync('tuiguang'),
			imageUrl: uni.getStorageSync('tuiguangImg'),
		}
	},
	onShareTimeline(res) { //分享到朋友圈
		return {
			title: uni.getStorageSync('tuiguang'),
			imageUrl: uni.getStorageSync('tuiguangImg'),
		}
	},
}
