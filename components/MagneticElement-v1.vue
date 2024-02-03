<template>
	<div class="MagneticElement">
		<slot></slot>
	</div>
</template>

<script>
/* eslint-disable */
export default {
	props: {
		triggerArea: {
			type: Number,
			default: 50,
		},
		listen: {
			type: String,
			default: 'mouseTrail',
		},
		interpolationFactor: {
			type: Number,
			default: 0.1,
		},
	},
	data() {
		return {
			mousePosition: {
				x: 0,
				y: 0,
			},
			clientRect: {
				centerX: 0,
				centerY: 0,
			},
			lerpingData: {
				x: { current: 0, target: 0 },
				y: { current: 0, target: 0 },
			},
		};
	},
	mounted() {
		this.$nuxt.$on(this.listen, this.handleMouse);
		window.addEventListener('resize', this.resize);
		this.resize();
		this.render();
	},
	methods: {
		resize() {
			const {
				left,
				top,
				width,
				height,
			} = this.$el.getBoundingClientRect();
			this.clientRect = {
				left,
				top,
				centerX: left + width / 2,
				centerY: top + height / 2,
			};
		},
		lerp(current, target, factor) {
			return current * (1 - factor) + target * factor;
		},
		handleMouse({ pageX, pageY }) {
			this.mousePosition.x = pageX;
			this.mousePosition.y = pageY;
		},
		render() {
			const distanceFromMouseToCenter = this.calculateDistance(
				this.mousePosition.x,
				this.mousePosition.y,
				this.clientRect.centerX,
				this.clientRect.centerY,
			);
			const targetHolder = { x: 0, y: 0 };

			if (distanceFromMouseToCenter < this.triggerArea) {
				this.$el.classList.add('focus');
				targetHolder.x = this.mousePosition.x - this.clientRect.centerX;
				targetHolder.y = this.mousePosition.y - this.clientRect.centerY;
			} else {
				this.$el.classList.remove('focus');
			}

			this.lerpingData.x.target = targetHolder.x;
			this.lerpingData.y.target = targetHolder.y;

			for (const item in this.lerpingData) {
				this.lerpingData[item].current = this.lerp(
					this.lerpingData[item].current,
					this.lerpingData[item].target,
					this.interpolationFactor,
				);
			}
			this.$el.style.translate = `${this.lerpingData.x.current}px ${this.lerpingData.y.current}px`;
			requestAnimationFrame(this.render);
		},
		calculateDistance(x1, y1, x2, y2) {
			return Math.hypot(x1 - x2, y1 - y2);
		},
	},
};
</script>

<style
	lang="scss"
	scoped
>
.MagneticElement {
	user-select: none;

	position: absolute;
	top: 50%;
	left: 50%;

	// translate: -50% -50%;

	display: flex;
	align-items: center;
	justify-content: center;

	padding: 10px 30px;

	border: 1px solid black;
	border-radius: 20px;

	transition-duration: 0.1s;
	transition-property: translate;

	&.focus {
		color: white;
		background-color: black;
	}
}
</style>
