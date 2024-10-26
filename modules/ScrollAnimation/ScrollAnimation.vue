<template>
	<ViewportProgressor
		ref="ViewportProgressor"
		v-slot="{ progressIn, progressOut }"
		class="ScrollAnimation"
		:calc-in="needToCalcIn"
		:calc-out="needToCalcOut"
		:container-animation-tween="containerAnimationTween"
		:pinned-container="pinnedContainer"
		@progress="saveProgress"
	>
		<div
			ref="wrapper"
			class="ScrollAnimation__wrapper"
		>
			<div ref="inner" class="ScrollAnimation__inner">
				<slot
					:progress-in="progressIn"
					:progress-out="progressOut"
				></slot>
			</div>
		</div>
	</ViewportProgressor>
</template>

<script>
import ViewportProgressor from '@/modules/ViewportProgressor/src/runtime/components/ViewportProgressor.vue';
import PinBlock from '@/modules/PinBlock/PinBlock.vue';

export default {
	components: {
		PinBlock,
		ViewportProgressor,
	},
	props: {
		debugLog: {
			type: Boolean,
			default: false,
		},
		/** ---------------- */
		/** @PROPERTY: SHIFT */
		/** ---------------- */
		/** @example: -100vh */
		appearanceShift: {
			type: String,
			default: null,
		},
		/** @example: x | y */
		appearanceShiftType: {
			type: String,
			default: 'y',
		},
		/** @example: 100vh */
		disappearanceShift: {
			type: String,
			default: null,
		},
		/** @example: x | y */
		disappearanceShiftType: {
			type: String,
			default: 'y',
		},
		/** ---------------- */
		/** @PROPERTY: CLIP */
		/** ---------------- */
		/** @example: -100vh */
		appearanceClip: {
			type: String,
			default: null,
		},
		/** @example: top | right | bottom | left */
		appearanceClipType: {
			type: String,
			default: 'top',
		},
		/** @example: 100vh */
		disappearanceClip: {
			type: String,
			default: null,
		},
		/** @example: top | right | bottom | left */
		disappearanceClipType: {
			type: String,
			default: 'bottom',
		},
		/** @example: true (50% 50%) || 60% 70% (позиция) */
		appearanceCircle: {
			type: [Boolean, String],
			default: false,
		},
		/** @example: true (50% 50%) || 60% 70% (позиция) */
		disappearanceCircle: {
			type: [Boolean, String],
			default: false,
		},
		/** @example: true, 0.2 */
		appearanceOpacity: {
			type: [Boolean, String],
			default: false,
		},
		/** @example: true, 0.5 */
		disappearanceOpacity: {
			type: [Boolean, String],
			default: false,
		},
		/** @example: 0.3 | 0.2 (Суммирующий элемент. Прибавляется к единице. 1 + 0.3 * progress) */
		appearanceScale: {
			type: String,
			default: null,
		},
		/** @example: 0.3 | 0.2 (Суммирующий элемент. Прибавляется к единице. 1 + 0.3 * progress) */
		disappearanceScale: {
			type: String,
			default: null,
		},
		/** @example: 1 | 2 | 3 | 4 */
		pinHeightVh: {
			type: Number,
			default: 0,
		},
		/** @example: true */
		pinSpacing: {
			type: Boolean,
			default: true,
		},
		containerAnimationTween: {
			type: Object,
			default: undefined,
		},
		pinnedContainer: {
			default: undefined,
		},
	},
	data() {
		return {
			progress: {
				in: 0,
				out: 0,
			},
			timeline: {
				in: {
					instance: null,
					create: this._createInTimeline,
					trigger: this._triggerInTimeline,
				},
				out: {
					instance: null,
					create: this._createOutTimeline,
					trigger: this._triggerOutTimeline,
				},
			},
			utils: {
				getRightClip: this._utilsGetRightClip,
			},
		};
	},
	computed: {
		classList() {
			return {
				/** SHIFT */
				'_appearance-shift': this.appearanceShift,
				'_disappearance-shift': this.disappearanceShift,
				['_appearance-shift-type'.replace('type', this.appearanceShiftType)]: this.appearanceShift,
				['_disappearance-shift-type'.replace('type', this.disappearanceShiftType)]: this.disappearanceShift,

				/** CLIP */
				'_appearance-clip': this.appearanceClip,
				'_disappearance-clip': this.disappearanceClip,
				['_appearance-clip-type'.replace('type', this.appearanceClipType)]: this.appearanceClip,
				['_disappearance-clip-type'.replace('type', this.disappearanceClipType)]: this.disappearanceClip,

				/** CIRCLE */
				'_appearance-circle': this.appearanceCircle,
				'_disappearance-circle': this.disappearanceCircle,

				/** OPACITY */
				'_appearance-opacity': this.appearanceOpacity,
				'_disappearance-opacity': this.disappearanceOpacity,

				/** SCALE */
				'_appearance-scale': this.appearanceScale,
				'_disappearance-scale': this.disappearanceScale,
			};
		},
		styleList() {
			return {
				/** SHIFT */
				'--appearance-shift': this.appearanceShift,
				'--disappearance-shift': this.disappearanceShift,

				/** CLIP */
				'--appearance-clip': this.appearanceClip,
				'--disappearance-clip': this.disappearanceClip,

				/** CIRCLE */
				'--appearance-circle': typeof this.appearanceCircle === 'string' ? this.appearanceCircle : '50% 50%',
				'--disappearance-circle': typeof this.disappearanceCircle === 'string' ? this.disappearanceCircle : '50% 50%',

				/** OPACITY */
				'--appearance-opacity': typeof this.appearanceOpacity === 'string' ? this.appearanceOpacity : '0',
				'--disappearance-opacity': typeof this.disappearanceOpacity === 'string' ? this.disappearanceCircle : '0',

				/** SCALE */
				'--appearance-scale': this.appearanceScale,
				'--disappearance-scale': this.disappearanceScale,
			};
		},
		needToCalcIn() {
			return Boolean(
				this.appearanceShift ||
				this.appearanceOpacity ||
				this.appearanceClip ||
				this.appearanceCircle ||
				this.appearanceScale,
			);
		},
		needToCalcOut() {
			return Boolean(
				this.disappearanceShift ||
				this.disappearanceOpacity ||
				this.disappearanceClip ||
				this.disappearanceCircle ||
				this.disappearanceScale,
			);
		},
	},
	watch: {
		'progress.in'(progress) {
			this.timeline.in.trigger(progress);
		},
		'progress.out'(progress) {
			this.timeline.out.trigger(progress);
		},
	},
	mounted() {
		if (this.debugLog) {
			this.logData();
		}
		this._createTimelines();
	},
	methods: {
		logData() {
			console.log(
				'needToCalcIn --->', this.needToCalcIn, '\n',
				'needToCalcOut --->', this.needToCalcOut, '\n',
			);
		},
		saveProgress(progress) {
			this.progress.in = progress.in;
			this.progress.out = progress.out;
		},
		_createTimelines() {
			if (this.needToCalcIn) {
				this.timeline.in.create();
			}
			if (this.needToCalcOut) {
				this.timeline.out.create();
			}
		},
		_createInTimeline() {
			this.timeline.in.instance = this.$gsap.timeline({ defaults: { ease: 'none' } });
			this.timeline.in.instance.pause();

			const rules = { wrapper: {}, inner: {} };

			/** wrapper */
			if (this.appearanceShift) {
				rules.wrapper[this.appearanceShiftType] = this.appearanceShift;
			}
			if (this.appearanceClip) {
				rules.wrapper['clip-path'] = this._utilsGetRightClip(this.appearanceClipType, this.appearanceClip);
			}
			if (this.appearanceOpacity) {
				rules.wrapper.opacity = typeof this.appearanceOpacity === 'string' ? this.appearanceOpacity : '0';
			}
			/** inner */
			if (this.appearanceCircle) {
				this.$gsap.set(this.$refs.inner, { 'clip-path': `circle(100% at ${typeof this.appearanceCircle === 'string' ? this.appearanceCircle : '50% 50%'})` });
				rules.inner['clip-path'] = this._utilsGetRightCircle(this.appearanceCircle);
			}
			if (this.appearanceScale) {
				rules.inner.scale = this.appearanceScale;
			}

			this.timeline.in.instance
				.from(this.$refs.wrapper, {
					ease: 'none',
					...rules.wrapper,
					onComplete: () => {
						// this.$gsap.set(this.$refs.wrapper, { clearProps: 'all' });
					},
				}, 0)
				.from(this.$refs.inner, {
					...rules.inner,
					onComplete: () => {
						// this.$gsap.set(this.$refs.inner, { clearProps: 'all' });
					},
				}, 0);
		},
		_createOutTimeline() {
			this.timeline.out.instance = this.$gsap.timeline({ defaults: { ease: 'none' } });
			this.timeline.out.instance.pause();

			const rules = { wrapper: {}, inner: {} };

			/** wrapper */
			if (this.disappearanceShift) {
				rules.wrapper[this.disappearanceShiftType] = this.disappearanceShift;
			}
			if (this.disappearanceClip) {
				rules.wrapper['clip-path'] = this._utilsGetRightClip(this.disappearanceClipType, this.disappearanceClip);
			}
			if (this.disappearanceOpacity) {
				rules.wrapper.opacity = typeof this.disappearanceOpacity === 'string' ? this.disappearanceOpacity : '0';
			}
			/** inner */
			if (this.disappearanceCircle) {
				this.$gsap.set(this.$refs.inner, { 'clip-path': `circle(100% at ${typeof this.disappearanceCircle === 'string' ? this.disappearanceCircle : '50% 50%'})` });
				rules.inner['clip-path'] = this._utilsGetRightCircle(this.disappearanceCircle);
			}
			if (this.disappearanceScale) {
				rules.inner.scale = this.disappearanceScale;
			}

			this.timeline.out.instance
				.to(this.$refs.wrapper, {
					...rules.wrapper,
					onComplete: () => {
						this.$gsap.set(this.$refs.wrapper, { clearProps: 'all' });
					},
				}, 0)
				.to(this.$refs.inner, {
					...rules.inner,
					onComplete: () => {
						this.$gsap.set(this.$refs.inner, { clearProps: 'all' });
					},
				}, 0);
		},
		_triggerInTimeline(progress) {
			this.timeline.in.instance.progress(progress);
		},
		_triggerOutTimeline(progress) {
			this.timeline.out.instance.progress(progress);
		},
		_utilsGetRightClip(type = 'top', value) {
			let rule = 'inset(';

			switch (type) {
			case 'top': {
				rule += `${value} 0 0 0`;
				break;
			}
			case 'right': {
				rule += `0 ${value} 0 0`;
				break;
			}
			case 'bottom': {
				rule += `0 0 ${value} 0`;
				break;
			}
			case 'left': {
				rule += `0 0 0 ${value}`;
				break;
			}
			}

			rule += ')';
			return rule;
		},
		_utilsGetRightCircle(position) {
			return `circle(0% at ${typeof position === 'string' ? position : '50% 50%'})`;
		},
		pinRefreshHandler() {
			this.$refs.ViewportProgressor.refreshScrollTriggers();
		},
	},
};
</script>

<style lang="scss">
.ScrollAnimation {
	position: relative;

	&__wrapper-in,
	&__wrapper-out {
		will-change: translate, opacity, clip-path, transform, scale;
	}
}
</style>
