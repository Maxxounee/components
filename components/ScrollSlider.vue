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
			/** Индекс текущего слайда */
			current: 0,
			/** @type {{ node: HTMLElement, offset: function }[]} */
			children: [],
			/** Следит за районом и обновляет данные, когда в разметке что-то пошебуршало */
			mutationObserver: null,
			dataAttributes: {
				/** Дополнительные состояния слайда.
				 * Сейчас каждая единица добавляет 100vh как состояние. Потом надо доделать.
				 * Ставится на элементы в разметке (Элементы нулевой вложенности!!11!!1!!1!!)
				 *
				 * @example
				 * <div class="slide" slider-additional-states="2">...</div>
				 * */
				additionalStates: 'slider-additional-states',
			},
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
				if (element.tag && element.elm) {
					const additionalStates = element.elm.getAttribute(this.dataAttributes.additionalStates);

					acc.push({ node: element.elm });

					if (additionalStates) {
						for (let i = 0; i < additionalStates; i++) {
							acc.push({ node: element.elm, offset: () => window.innerHeight * (i + 1) });
						}
					}
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
			const item = this.children[index];

			if (!item) {
				console.log('ScrollSlider.slideTo ---> [no item in children array]');
				return;
			}

			const options = {
				force: true,
				duration: 1,
				lerp: null,
				lock: true,
				offset: item.offset?.(),
				easing: (e) => e < 0.5 ? 8 * Math.pow(e, 4) : 1 - Math.pow(-2 * e + 2, 4) / 2,
			};

			this.$refs.SmoothieScroller.scrollTo(item.node, options);
		},
	},
};
</script>

<style lang="scss" scoped>

</style>
