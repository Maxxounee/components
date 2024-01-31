<template>
	<div class="clip-text">
		<HoverTextEffect
			class="text"
		/>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {},
};
</script>

<style
	lang="scss"
	scoped
>
/*  stylelint-disable  */
.clip-text {
	.text {
		font-size: 40px;

		color: black;
		--hover-color: gold;
	}
}
</style>
