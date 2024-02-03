<template>
	<div class="MouseTrail"></div>
</template>

<script>
export default {
	name: 'MouseTrail',
	props: {
		decay: {
			type: Number,
			default: 0.08,
		},
		delta: {
			type: Number,
			default: 0.0001,
		},
		emit: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			positions: {
				x: 0.5,
				y: 0.5,
				prev: {
					x: 0.5,
					y: 0.5,
				},
			},
			width: null,
			height: null,
			pageX: null,
			pageY: null,
			mounted: false,
		};
	},
	mounted() {
		this.mounted = true;
		this.resize();
		this.$nuxt.$on('windowResize', this.resize);
		window.addEventListener('mousemove', this.mousemove);
		requestAnimationFrame(this.calcPosition);
	},
	beforeDestroy() {
		this.mounted = false;
		this.$nuxt.$off('windowResize', this.resize);
		window.removeEventListener('mousemove', this.mousemove);
	},
	methods: {
		calcPosition() {
			// this.positions.x =
			this.positions.x += ((this.pageX / this.width) - this.positions.x) * this.decay;
			this.positions.y += ((this.pageY / this.height) - this.positions.y) * this.decay;
			if (Math.abs(this.positions.x - this.positions.prev.x) > this.delta || Math.abs(this.positions.y - this.positions.prev.y) > this.delta) {
				this.$emit('change', this.positions);
				if (this.emit) {
					this.$nuxt.$emit('mouseTrail', this.positions);
				}
				this.positions.prev.x = this.positions.x;
				this.positions.prev.y = this.positions.y;
			}
			if (this.mounted) {
				requestAnimationFrame(this.calcPosition);
			}
		},
		mousemove(e) {
			this.pageX = e.pageX;
			this.pageY = e.pageY;
		},
		resize() {
			this.width = this.$store.state.window.width;
			this.height = this.$store.state.window.height;
			if (this.pageX === null) {
				this.pageX = 0.5 * this.width;
				this.pageY = 0.5 * this.height;
			}
		},
	},
};
</script>
