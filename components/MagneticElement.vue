<template>
	<Component
		:is="tag"
		class="MagneticElement"
		@mousemove="translateElement"
		@mouseenter="setFocusClass"
		@mouseleave="returnElement"
	>
		<slot></slot>
	</Component>
</template>

<script>
export default {
	props: {
		tag: {
			type: String,
			default: 'span',
		},
		factor: {
			type: Number,
			default: 0.2,
		},
		duration: {
			type: Array,
			default: () => ([100, 300]),
		},
	},
	data() {
		return {
			clientRect: {},
			element: undefined,
		};
	},
	mounted() {
		this.element = this.$slots.default[0].elm;
	},
	methods: {
		setFocusClass() {
			this.$el.classList.add('focus');
		},
		translateElement({ x, y }) {
			const { left, top, width, height } = this.element.getBoundingClientRect();

			const factorX = Math.min(this.factor * height / width, this.factor);
			const factorY = Math.min(this.factor * width / height, this.factor);

			const cursorOnElementX = x - (left + width / 2);
			const cursorOnElementY = y - (top + height / 2);

			this.element.animate(
				{ translate: `${cursorOnElementX * factorX}px ${cursorOnElementY * factorY}px` },
				{ duration: this.duration[0], fill: 'forwards' },
			);
		},
		returnElement() {
			this.element.animate(
				{ translate: 'none' },
				{ duration: this.duration[1], fill: 'forwards' },
			);
			this.$el.classList.remove('focus');
		},
	},
};
</script>

<style lang="scss">
.MagneticElement {
	position: relative;
}
</style>
