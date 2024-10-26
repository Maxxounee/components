<template>
	<div class="SmoothieScroller">
		<div ref="scroll" class="SmoothieScroller__scroll">
			<div
				ref="content"
				class="SmoothieScroller__content"
			>
				<slot></slot>
			</div>
		</div>
		<div
			v-if="$slots.static"
			class="SmoothieScroller__static"
		>
			<slot name="static"></slot>
		</div>
	</div>
</template>

<script>
import Lenis from 'lenis';
import WheelIndicator from '../script/WheelIndicator';

export default {
	name: 'SmoothieScroller',
	props: {
		lenisOptions: {
			type: Object,
			default: () => ({}),
		},
		edgeThrottle: {
			type: Number,
			default: 200,
		},
		stopped: {
			type: Boolean,
			default: false,
		},
	},
	/** GLOBAL:
	 * @SmoothieScroller:scroll:first
	 * @SmoothieScroller:resized
	 * */
	emits: [
		'scroll',
		'scroll:first',
		'edge',
		'edge:min',
		'edge:max',
		'stop',
		'start',
		'direction',
		'direction:minus',
		'direction:plus',
	],
	data() {
		return {
			lenisInstance: null,
			resizeObserver: null,
			isScrolledOnce: false,
			currentDirection: 0,

			scrollEdge: {
				wheelIndicator: null,
				reachedEdge: null,
				throttled: false,
			},
		};
	},
	watch: {
		stopped(value) {
			if (value) {
				this.stop();
			} else {
				this.start();
			}
		},
		currentDirection(value) {
			this.$emit('direction', value);
			if (value > 0) {
				this.$emit('direction:plus', value);
			} else if (value < 0) {
				this.$emit('direction:minus', value);
			}
		},
	},
	mounted() {
		this.initLenis();
		this.initWheelListener();
		this.initScrollListener();
		this.initWheelIndicator();
		this.setGsap();
		this.setResizeObserver();
	},
	beforeDestroy() {
		this.lenisInstance?.off('scroll', this.$ScrollTrigger.update);
		this.lenisInstance?.destroy();

		this.$gsap?.ticker?.remove(this.lenisGsapRaf);

		this.initWheelListener(true);
		this.initScrollListener(true);

		this.resizeObserver.disconnect();
		this.scrollEdge.wheelIndicator.destroy();
	},
	methods: {
		/** listeners */
		initWheelListener(destroy = false) {
			this.$el[destroy ? 'removeEventListener' : 'addEventListener']('wheel', this.wheelListenerHandler);
		},
		initScrollListener(destroy = false) {
			this.$refs.scroll[destroy ? 'removeEventListener' : 'addEventListener']('scroll', this.scrollListenerHandler);
		},
		wheelListenerHandler() {
			if (this.isScrolledOnce) { this.initWheelListener(true); } else { this.checkScrollEdge(); }
		},
		scrollListenerHandler() {
			this.initWheelListener(true);
			this.initScrollListener(true);
			this.isScrolledOnce = true;

			this.$emit('scroll:first', this.lenisInstance);
			this.$nuxt.$emit('@SmoothieScroller:scroll:first', this.lenisInstance);
		},
		scrollHandler() {
			this.$emit('scroll', this.lenisInstance);
			this.checkScrollDirection();
			this.checkScrollEdge();
		},
		/** mount */
		initLenis() {
			const options = {
				wrapper: this.$refs.scroll,
				content: this.$refs.content,
				syncTouch: true,
				gestureOrientation: 'vertical',
				duration: 1,
				...this.lenisOptions,
			};
			this.lenisInstance = new Lenis(options);
			this.lenisInstance.on('scroll', this.scrollHandler);

			if (this.stopped) { this.stop(); }
		},
		setGsap() {
			if (!this.$ScrollTrigger || !this.$gsap) {
				console.warn('◤ SmoothieScroller ---> no $gsap || no $ScrollTrigger');
				return;
			}

			this.lenisInstance.on('scroll', this.$ScrollTrigger.update);
			this.$gsap.ticker.add(this.lenisGsapRaf);
			this.$gsap.ticker.lagSmoothing(0);
		},
		lenisGsapRaf(time) {
			this.lenisInstance.raf(time * 1000);
		},
		initWheelIndicator() {
			this.scrollEdge.wheelIndicator = new WheelIndicator({
				elem: this.$refs.scroll,
				callback: this.fireScrollEdge,
			});
		},
		setResizeObserver() {
			this.resizeObserver = new ResizeObserver(() => {
				this.$nuxt.$emit('@SmoothieScroller:resized');
			});

			this.resizeObserver.observe(this.$refs.content);
		},
		checkScrollDirection() {
			this.currentDirection = this.lenisInstance.direction;
		},
		/** corner */
		checkScrollEdge() {
			const scroll = this.$refs.scroll.scrollTop;
			const height = this.$refs.scroll.scrollHeight - innerHeight;

			if (scroll < 69) {
				this.scrollEdge.reachedEdge = -1;
			} else if (scroll > height - 69) {
				this.scrollEdge.reachedEdge = 1;
			} else {
				this.scrollEdge.reachedEdge = null;
			}
		},
		fireScrollEdge({ direction }) {
			if (this.scrollEdge.throttled) { return; }
			if (!direction || direction !== this.scrollEdge.reachedEdge) { return; }

			this.scrollEdge.throttled = true;

			setTimeout(() => (this.scrollEdge.throttled = false), this.edgeThrottle);

			this.$emit('edge', direction);

			if (direction < 0) {
				this.$emit('edge:min', direction);
			} else if (direction > 0) {
				this.$emit('edge:max', direction);
			}
		},
		/** utils */
		scrollTo(value, options) {
			console.log('scrollto');
			this.lenisInstance.scrollTo(value, options);
		},
		stop() {
			this.$emit('stop');
			this.lenisInstance.stop();
		},
		start() {
			this.$emit('start');
			this.lenisInstance.start();
		},

	},
};
</script>

<style lang="scss">
.SmoothieScroller {
	&__scroll {
		scrollbar-width: none;
		overflow: hidden scroll;

		-ms-overflow-style: none;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	&__static {
		pointer-events: none;
	}

	&__scroll,
	&__static {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;
	}

	&__content {
		height: auto;
	}

	&.lenis.lenis-smooth {
		scroll-behavior: auto !important;
	}

	&.lenis.lenis-smooth [data-lenis-prevent] {
		overscroll-behavior: contain;
	}

	&.lenis.lenis-stopped {
		//overflow: hidden;
	}

	&.lenis.lenis-smooth iframe {
		pointer-events: none;
	}

	&.vertical {

		@supports (overflow: clip) {
			overflow: clip scroll;
		}

		.SmoothieScroller__content {
			width: 100%;
			height: max-content;
		}
	}
}
</style>
