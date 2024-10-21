<template>
	<view>
		<web-view src=""></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
			};
		},
		onLoad(option) {
			this.url = option.url
		}
	}
</script>

<style lang="scss">

</style>