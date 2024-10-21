<template>
	<view class="page-box">
		<view class="centre flex align-center justify-center flex-wrap">
			<image src="../static/image/empty.png"></image>
			<view class="tips">
				{{content}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			content: {
				type: String,
				default: '暂无内容'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-box {
		background: #ffffff;
	}

	.centre {
		image {
			width: 340rpx;
			height: 200rpx;
		}
	}

	.tips {
		width: 100%;
		text-align: center;

		font-weight: bold;
		margin: 30rpx;
		font-size: 32rpx;
	}
</style>