<template>
	<div
		class="SoftSticky"
		:style="{
			'--height': height,
			'--progressTop': progressTop,
		}"
	>
		<div
			ref="spacerTop"
			class="SoftSticky__spacer"
		></div>
		<div class="SoftSticky__inner">
			<slot></slot>
		</div>
		<!--<div class="SoftSticky__spacer"></div>-->
	</div>
</template>

<script>
export default {
	props: {
		top: {
			type: Boolean,
			default: false,
		},
		bottom: {
			type: Boolean,
			default: false,
		},
		padding: {
			type: [String, Number],
			default: 4,
		},
	},
	data() {
		return {
			progressTop: 0,
			progressBottom: 0,
		};
	},
	computed: {
		height() {
			return this.padding * 10;
		},
	},
	mounted() {
		window.addEventListener('scroll', this.update);
	},
	/* eslint-disable */
	methods: {
		update() {
			const {
				top,
				bottom,
			} = this.$el.getBoundingClientRect();

			const value = Math.min(Math.max(1 - top / this.height, 0), 1);
			this.progressTop = -(Math.cos(Math.PI * value) - 1) / 2;
		},
	},
};
</script>

<style lang="scss">
/* stylelint-disable */
.SoftSticky {
	position: sticky;
	top: 0;
	padding-top: calc(var(--height) * 1px);

	&__inner {
		transform: translateY(calc(var(--height) * -1px + var(--height) * var(--progressTop) * 1px));
		//padding-top: calc(var(--padding) * 10px);
	}

	// &__spacer {
	//	height: calc(var(--padding) * 10px);
	// }
}
</style>
