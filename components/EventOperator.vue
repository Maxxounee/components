<template>
	<div
		class="EventOperator"
		@wheel="wheelHandler"
		@mousedown="mousedownHandler"
		@mousemove="mousemoveHandler"
	>
	</div>
</template>

<script>
export default {
	components: {},
	props: {
		cycle: {
			type: Boolean,
			default: false,
		},
		forcedCurrent: {
			type: Number,
			default: null,
		},
		throttle: {
			type: Number,
			default: 400,
		},
		throttleConfig: {
			type: Object,
			default: () => ({}),
			/* wheel, keypress, touch */
		},
		enabled: {
			type: Boolean,
			default: true,
		},
		min: {
			type: Number,
			default: 0,
		},
		max: {
			type: Number,
			default: null,
		},
		wheelDelta: {
			type: Number,
			default: 10,
		},
		mousemoveDelta: {
			type: Number,
			default: 10,
		},
	},
	emits: [
		'throttle',
		'arrowPress',
		'change',
		'corner',
		'wheel',
		'mouseMoving',
		'mouseSwipe',
	],
	data() {
		return {
			current: 0,
			throttled: false,
			mouseEventData: { startX: null, startY: null, mousedown: false },
		};
	},
	watch: {
		forcedCurrent: {
			immediate: true,
			handler(value) {
				if (value === null) { return null; }

				this.current = value;
			},
		},
	},
	mounted() {
		window.addEventListener('keydown', this.keydownHandler);
	},
	methods: {
		throttleProxy(eventType) {
			if (this.throttled || !this.enabled) {
				this.$emit('throttle');
				return false;
			}

			this.throttled = true;
			const timeOut = this.throttleConfig[eventType] ?? this.throttle;

			setTimeout(() => { this.throttled = false; }, timeOut);

			return true;
		},
		calculateCurrent(direction) {
			if (this.max === null) { return null; }

			let corner = 0;
			let nextCurrent = this.current + direction;

			if (nextCurrent > this.max) {
				corner = 1;
				nextCurrent = this.cycle ? this.min : this.max;
			} else if (nextCurrent < this.min) {
				corner = -1;
				nextCurrent = this.cycle ? this.max : this.min;
			}

			this.current = nextCurrent;

			this.$emit('change', { direction, current: this.current });

			if (corner) { this.$emit('corner', corner); }
		},
		keydownHandler(event) {
			if (!this.throttleProxy('keydown')) { return null; }

			let direction = 0;

			if (['ArrowUp', 'ArrowLeft'].includes(event.key) || [37, 38].includes(Number(event.keyCode))) {
				direction = -1;
			}

			if (['ArrowDown', 'ArrowRight'].includes(event.key) || [39, 40].includes(Number(event.keyCode))) {
				direction = 1;
			}

			if (direction) {
				this.calculateCurrent(direction);
				this.$emit('arrowPress', { direction });
			}
		},
		wheelHandler(event) {
			if (!this.throttleProxy('wheel')) { return null; }

			if (Math.abs(event.deltaY) >= this.wheelDelta) {
				const direction = Math.sign(event.deltaY);
				this.calculateCurrent(direction);
				this.$emit('wheel', { direction });
			}
		},
		mousedownHandler(event) {
			this.mouseEventData.startX = event.offsetX;
			this.mouseEventData.startY = event.offsetY;
			this.mouseEventData.mousedown = true;
		},
		mousemoveHandler(event) {
			if (!this.mouseEventData.mousedown) { return null; }

			window.addEventListener('mouseup', this.mouseupHandler);

			const data = {
				deltaX: this.mouseEventData.startX - event.offsetX,
				deltaY: this.mouseEventData.startY - event.offsetY,
			};

			this.$emit('mouseMoving', data);
		},
		mouseupHandler(event) {
			window.removeEventListener('mouseup', this.mouseupHandler);

			this.mouseEventData.mousedown = false;

			const data = {
				deltaX: this.mouseEventData.startX - event.offsetX,
				deltaY: this.mouseEventData.startY - event.offsetY,
			};

			this.$emit('mouseSwipe', data);
		},
		clickHandler(event) {
			/* eslint-disable */
			if (this.handleClick && !this.throttleProxy('click')) { return null; }

			const { width: elWidth, height: elHeight } = this.$el.getBoundingClientRect();

			const data = {
				x: event.offsetX,
				y: event.offsetY,
				isRight: event.offsetX > elWidth / 2,
				isBottom: event.offsetY > elHeight / 2,
			};

			this.$emit('click', data);
		},
	},
};
</script>

<style lang="scss">

.EventOperator {
}
</style>
