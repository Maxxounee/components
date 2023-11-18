<template>
	<div
		class="StandardButton"
		v-html="value"
	></div>
</template>

<script>
export default {
	props: {
		value: {
			type: String,
			default: 'Стандартная кнопка',
		},
	},
};
</script>

<style lang="scss">
.StandardButton {
	cursor: pointer;
	user-select: none;

	display: flex;
	align-items: center;
	justify-content: center;

	height: 40px;
	padding: 0 20px;

	font-family: Helvetica, serif;
	color: #2d001e;
	text-transform: uppercase;

	background-color: transparent;
	border: 2px solid #2d001e;
	border-radius: 30px;

	transition-duration: 0.3s;
	transition-property: background-color, color;

	&:hover {
		color: #f3f3f3;
		background-color: #2d001e;
	}
}
</style>
