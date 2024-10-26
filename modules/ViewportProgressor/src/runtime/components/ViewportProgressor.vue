<template>
	<div
		class="ViewportProgressor"
		:style="{
			'--progress-in': progress.in,
			'--progress-out': progress.out,
			'--progress-full': progress.full,
			'--progress-inset': progress.inset,
			'--progress-custom': progress.custom,
		}"
	>
		<slot
			:progress-in="progress.in"
			:progress-out="progress.out"
			:progress-full="progress.full"
			:progress-custom="progress.custom"
			:progress-inset="progress.inset"
			:progress="progress"
		></slot>
	</div>
</template>

<script>

export default {
	name: 'ViewportProgressor',
	inject: {
		scroller: {
			type: [String, Function],
			default: '',
		},
	},
	props: {
		calcIn: {
			type: [Boolean, Object],
			default: false,
		},
		calcOut: {
			type: [Boolean, Object],
			default: false,
		},
		calcFull: {
			type: [Boolean, Object],
			default: false,
		},
		calcInset: {
			type: [Boolean, Object],
			default: false,
		},
		calcCustom: {
			type: Object,
			default: undefined,
		},
		containerAnimationTween: {
			type: Object,
			default: undefined,
		},
	},
	emits: [
		'progress',
		'progress:in',
		'progress:out',
		'progress:full',
		'progress:inset',
		'progress:custom',
	],
	data() {
		return {
			progress: {
				in: 0,
				out: 0,
				full: 0,
				inset: 0,
				custom: 0,
			},

			scrollTriggers: {
				in: null,
				out: null,
				full: null,
				inset: null,
				custom: null,
			},

			scrollTriggerOptions: {
				trigger: undefined,
				scroller: undefined,
				containerAnimation: undefined,
			},

			defaults: {
				calcIn: {
					start: () => 'top bottom',
					end: () => 'top top',
				},
				calcOut: {
					start: () => 'bottom bottom',
					end: () => 'bottom top',
				},
				calcFull: {
					start: () => 'top bottom',
					end: () => 'bottom top',
				},
				calcInset: {
					start: () => 'top top',
					end: () => 'bottom bottom',
				},
			},
		};
	},
	watch: {
		containerAnimationTween() {
			this.destroyScrollTriggers();
			this.scrollTriggerOptions.containerAnimation = this.containerAnimationTween;
			this.init();
		},
	},
	mounted() {
		if (!this.scroller) { return; }

		this.scrollTriggerOptions.trigger = this.$el;
		this.scrollTriggerOptions.containerAnimation = this.containerAnimationTween;
		this.scrollTriggerOptions.scroller = typeof this.scroller === 'function' ? this.scroller() : this.scroller;
		this.init();
	},
	beforeUnmount() {
		this.destroyScrollTriggers();
	},
	methods: {
		async refreshScrollTriggers() {
			await this.$nextTick();

			Object.values(this.scrollTriggers).forEach((st) => {
				if (!st?.update) { return null; }

				st.refresh();
			});
		},
		destroyScrollTriggers() {
			Object.values(this.scrollTriggers).forEach((st) => {
				if (!st?.kill) { return null; }

				st.kill();
			});
		},
		init() {
			if (!this.$ScrollTrigger) {
				console.error('%c◥ [ViewportProgress]: \n\n %c%s', 'color: #e31c4b; font-size: 18px;', 'color: white', 'There is no ScrollTrigger');
				return;
			}
			if (!this.scroller) {
				console.error('%c◥ [ViewportProgress]: \n\n %c%s', 'color: #e31c4b; font-size: 18px;', 'color: white', 'Отсутствует инъекция скроллера');
				return;
			}

			if (this.calcIn) {
				const start = this.calcIn?.start ?? this.defaults.calcIn.start;
				const end = this.calcIn?.end ?? this.defaults.calcIn.end;

				this.scrollTriggers.in = this.$ScrollTrigger.create({
					...this.scrollTriggerOptions,
					start,
					end,
					onUpdate: (self) => {
						this.progress.in = self.progress;
						this.$emit('progress:in', this.progress.in);
						this.$emit('progress', this.progress);
					},
				});
			}
			if (this.calcOut) {
				const start = this.calcOut?.start ?? this.defaults.calcOut.start;
				const end = this.calcOut?.end ?? this.defaults.calcOut.end;

				this.scrollTriggers.out = this.$ScrollTrigger.create({
					...this.scrollTriggerOptions,
					start,
					end,
					onUpdate: (self) => {
						this.progress.out = self.progress;
						this.$emit('progress:out', this.progress.out);
						this.$emit('progress', this.progress);
					},
				});
			}
			if (this.calcFull) {
				const start = this.calcFull?.start ?? this.defaults.calcFull.start;
				const end = this.calcFull?.end ?? this.defaults.calcFull.end;
				console.log('FULL', this.scrollTriggerOptions);
				this.scrollTriggers.full = this.$ScrollTrigger.create({
					...this.scrollTriggerOptions,
					start,
					end,
					onUpdate: (self) => {
						this.progress.full = self.progress;
						this.$emit('progress:full', this.progress.full);
						this.$emit('progress', this.progress);
					},
				});
			}
			if (this.calcInset) {
				const start = this.calcInset?.start ?? this.defaults.calcInset.start;
				const end = this.calcInset?.end ?? this.defaults.calcInset.end;

				this.scrollTriggers.inset = this.$ScrollTrigger.create({
					...this.scrollTriggerOptions,
					start,
					end,
					onUpdate: (self) => {
						this.progress.inset = self.progress;
						this.$emit('progress:inset', this.progress.inset);
						this.$emit('progress', this.progress);
					},
				});
			}
			if (this.calcCustom) {
				const start = this.calcCustom.start;
				const end = this.calcCustom.end;

				this.scrollTriggers.custom = this.$ScrollTrigger.create({
					...this.scrollTriggerOptions,
					start,
					end,
					onUpdate: (self) => {
						this.progress.custom = self.progress;
						this.$emit('progress:custom', this.progress.custom);
						this.$emit('progress', this.progress);
					},
				});
			}
		},
	},
};
</script>
