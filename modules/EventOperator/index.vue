<template>
	<div
		class="EventOperator"
		@mousedown="mousedownHandler"
		@touchstart="touchStartHandler"
	>
		<!--		@wheel="wheelHandler"-->
		<slot></slot>
	</div>
</template>

<script>
import WheelIndicator from './script/WheelIndicator';

export default {
	props: {
		cycle: {
			type: Boolean,
			default: false,
		},
		forcedCurrent: {
			type: Number,
			default: null,
		},
		start: {
			type: Number,
			default: null,
		},
		throttle: {
			type: Number,
			default: 1000,
		},
		throttleConfig: {
			type: Object,
			default: () => ({}),
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
			default: 1,
		},
		mousemoveDelta: {
			type: Number,
			default: 10,
		},
		swipeDelta: {
			type: Number,
			default: 60,
		},
		mousemoveEnabled: {
			type: Boolean,
			default: false,
		},
		wheelEnabled: {
			type: Boolean,
			default: true,
		},
		touchEnabled: {
			type: Boolean,
			default: true,
		},
		keydownEnabled: {
			type: Boolean,
			default: true,
		},
	},
	emits: [
		'throttle',
		'arrow',
		'change',
		'corner',

		'wheel',

		'mouse:down',
		'mouse:moving',
		'mouse:swipe',

		'touch:start',
		'touch:moving',

		'swipe',
		'swipe:horizontal',
		'swipe:vertical',
	],
	data() {
		return {
			current: 0,
			throttled: false,
			mouseEventData: { startX: null, startY: null, mousedown: false },
			touchEventData: { startX: null, startY: null, touchdown: false, multiTouch: false },

			scrollEdge: {
				wheelIndicator: null,
				reachedEdge: null,
				throttled: false,
			},
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
	beforeDestroy() {
		window.removeEventListener('mouseup', this.mouseupHandler);
		window.removeEventListener('mousemove', this.mousemoveHandler);
	},
	mounted() {
		if (this.start !== null) { this.current = this.start; }

		if (this.keydownEnabled) {
			window.addEventListener('keydown', this.keydownHandler);
		}

		this.initWheelIndicator();
	},
	methods: {
		initWheelIndicator() {
			this.scrollEdge.wheelIndicator = new WheelIndicator({
				elem: this.$el,
				callback: this.wheelHandler,
			});
		},
		wheelHandler({ direction }) {
			if (this.scrollEdge.throttled) { return; }

			if (!direction) { return; }

			this.scrollEdge.throttled = true;

			setTimeout(() => (this.scrollEdge.throttled = false), 200);

			this.calculateCurrent(direction);

			this.$emit('wheel', direction);
		},
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
		/** keydown */
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
				this.$emit('arrow', { direction });
			}
		},
		/** wheel */
		// wheelHandler(event) {
		// 	if (!this.wheelEnabled || !this.throttleProxy('wheel')) { return null; }
		//
		// 	if (Math.abs(event.deltaY) >= this.wheelDelta) {
		// 		const direction = Math.sign(event.deltaY);
		// 		this.calculateCurrent(direction);
		//
		// 		this.$emit('wheel', { direction });
		// 	}
		// },
		/** mouseSwipe */
		mousedownHandler(event) {
			if (!this.mousemoveEnabled) { return null; }

			this.mouseEventData.startX = event.pageX;
			this.mouseEventData.startY = event.pageY;
			this.mouseEventData.mousedown = true;

			const data = {
				x: event.pageX,
				y: event.pageY,
			};

			this.$emit('mouse:down', data);

			window.addEventListener('mousemove', this.mousemoveHandler);
		},
		mousemoveHandler(event) {
			if (!this.mouseEventData.mousedown) { return null; }

			window.addEventListener('mouseup', this.mouseupHandler);

			const data = {
				deltaX: this.mouseEventData.startX - event.offsetX,
				deltaY: this.mouseEventData.startY - event.offsetY,
			};

			this.$emit('mouse:moving', data);
		},
		mouseupHandler(event) {
			window.removeEventListener('mouseup', this.mouseupHandler);
			window.removeEventListener('mousemove', this.mousemoveHandler);

			if (!this.throttleProxy('mouseSwipe')) { return null; }

			this.mouseEventData.mousedown = false;

			const deltaX = this.mouseEventData.startX - event.pageX;
			const deltaY = this.mouseEventData.startY - event.pageY;

			const mousemoveDistance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

			if (mousemoveDistance < this.mousemoveDelta) { return null; }

			const horizontalDirection = (Math.abs(deltaX) > Math.abs(deltaY)) ? ((deltaX > 0) ? 1 : -1) : 0;
			const verticalDirection = (Math.abs(deltaY) > Math.abs(deltaX)) ? ((deltaY > 0) ? 1 : -1) : 0;

			const data = {
				deltaX,
				deltaY,
				horizontalDirection,
				verticalDirection,
			};

			this.calculateCurrent(horizontalDirection || verticalDirection);
			this.$emit('mouse:swipe', data);
		},

		/** touchSwipe */
		touchStartHandler(event) {
			if (!this.touchEnabled) { return null; }

			this.touchEventData.startX = event?.touches?.[0]?.pageX;
			this.touchEventData.startY = event?.touches?.[0]?.pageY;
			this.touchEventData.touchdown = true;
			const data = {
				x: this.touchEventData.startX,
				y: this.touchEventData.startY,
			};

			this.$emit('touch:start', data);

			window.addEventListener('touchmove', this.touchmoveHandler);
		},
		touchmoveHandler(event) {
			if (!this.touchEventData.touchdown) { return null; }

			window.addEventListener('touchend', this.touchendHandler);

			if (event.touches?.length > 1) {
				this.touchEventData.multiTouch = true;
			}

			this.$emit('touch:moving');
		},
		touchendHandler(event) {
			window.removeEventListener('touchmove', this.touchmoveHandler);
			window.removeEventListener('touchend', this.touchendHandler);

			this.touchEventData.touchdown = false;
			this.multiTouch = false;

			const deltaX = this.touchEventData.startX - event?.changedTouches?.[0]?.pageX;
			const deltaY = this.touchEventData.startY - event?.changedTouches?.[0]?.pageY;

			const touchmoveDistance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

			if (touchmoveDistance < this.swipeDelta) { return null; }

			const horizontalDirection = (Math.abs(deltaX) > Math.abs(deltaY)) ? ((deltaX > 0) ? 1 : -1) : 0;
			const verticalDirection = (Math.abs(deltaY) > Math.abs(deltaX)) ? ((deltaY > 0) ? 1 : -1) : 0;

			const data = {
				deltaX,
				deltaY,
				horizontalDirection,
				verticalDirection,
			};

			this.calculateCurrent(horizontalDirection || verticalDirection);
			this.$emit('mouse:swipe', data);

			if (horizontalDirection) {
				this.$emit('swipe:horizontal', horizontalDirection);
			}
			if (verticalDirection) {
				this.$emit('swipe:vertical', verticalDirection);
			}
		},
	},
};
</script>

<style lang="scss">

.EventOperator {
	width: 100%;
	height: 100%;

	&, * {
		user-select: none !important;
	}

	img, picture {
		pointer-events: none;
	}
}
</style>
