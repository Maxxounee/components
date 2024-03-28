<template>
	<div class="test">
		<OffsetHoverText
			v-for="item in menu"
			:key="item.title"
			:value="item.title"
		/>
		<ImageDisplacement />
	</div>
</template>

<script>
/* eslint-disable */
export default {
	data() {
		return {
			menu: [
				{
					title: 'HOME',
				},
				{
					title: 'PROJECTS',
				},
				{
					title: 'ABOUT',
				},
				{
					title: 'CONTACT US',
				},
			],
		};
	},
};
</script>

<style lang="scss">
.test {
	background-color: #101010;
	width: 100vw;
	height: 100vh;

	.OffsetHoverText {
		--offset-letter-delay: 0s;
	}
}
</style>
