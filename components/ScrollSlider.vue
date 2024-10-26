<template>
	<EventOperator
		ref="EventOperator"
		class="ScrollSlider"
		:forced-current="current"
		:max="children.length - 1"
		@change="current = $event.current"
	>
		<SmoothieScroller
			ref="SmoothieScroller"
			:stopped="stopped"
		>
			<div
				ref="content"
				class="ScrollSlider__content"
			>
				<slot></slot>
			</div>
		</SmoothieScroller>
		<ReactiveLogger
			v-bind="loggerData"
			@click:item="onLoggerItemClick"
		/>
	</EventOperator>
</template>

<script>
import EventOperator from '~/modules/EventOperator/index.vue';
import SmoothieScroller from '~/modules/SmoothieScroller/src/runtime/components/SmoothieScroller.vue';
export default {
	components: {
		EventOperator,
		SmoothieScroller,
	},
	provide() {
		return {
			scroller: () => this.$refs.SmoothieScroller.$refs.scroll,
		};
	},
	props: {
		stopped: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			current: 0,
			children: [],
			mutationObserver: null,
		};
	},
	computed: {
		loggerData() {
			return {
				current: this.current,
				items: this.children,
			};
		},
	},
	watch: {
		current(index) {
			if (this.stopped) {
				this.slideTo({ index });
			}
		},
	},
	mounted() {
		this.getChildren();
		this.setMutationObserver();
	},
	methods: {
		setMutationObserver() {
			const options = { childList: true };

			this.mutationObserver = new MutationObserver((mutation) => {
				this.getChildren();
			});
			this.mutationObserver.observe(this.$refs.content, options);
		},
		getChildren() {
			this.children = this.$slots.default.reduce((acc, element) => {
				if (element.tag) {
					acc.push(element.elm);
				}
				return acc;
			}, []);
		},
		setCurrentIndex(index) {
			this.current = index;
		},
		onLoggerItemClick(index) {
			if (this.stopped) {
				this.setCurrentIndex(index);
			}	 else {
				this.slideTo({ index });
			}
		},
		slideTo({ index }) {
			console.log(index);
			// this.$refs.SmoothieScroller.start();

			const options = {
				force: true,
				duration: 1,
				lerp: null,
				lock: true,
				easing: (e) => e < 0.5 ? 8 * Math.pow(e, 4) : 1 - Math.pow(-2 * e + 2, 4) / 2,
				onComplete: () => {
					// this.$refs.SmoothieScroller.stop();
					console.log('COMPLETE');
				},
			};
			console.log(this.children[index]);
			this.$refs.SmoothieScroller.scrollTo(this.children[index], options);
		},
	},
};
</script>

<style lang="scss" scoped>

</style>
