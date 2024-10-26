<template>
	<ViewportProgressor
		ref="ViewportProgressor"
		v-slot="{ progressIn, progressOut }"
		class="ScrollAnimation"
		:calc-in="needToCalcIn"
		:calc-out="needToCalcOut"
		:class="classList"
		:style="styleList"
	>
		<PinBlock
			v-slot="{ progress: progressPin }"
			:pin-height-vh="pinHeightVh"
			:pin-spacing="pinSpacing"
			@refresh="pinRefreshHandler"
		>
			<div
				class="ScrollAnimation__wrapper"
				:style="{
					'--progress-in': progressIn,
					'--progress-out': progressOut,
					'--progress-pin': progressPin,
				}"
			>
				<div class="ScrollAnimation__wrapper-inner">
					<div class="ScrollAnimation__content">
						<slot
							:progress-pin="progressPin"
							:progress-in="progressIn"
							:progress-out="progressOut"
						></slot>
					</div>
				</div>
			</div>
		</PinBlock>
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
	},
	data() {
		return {};
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
	mounted() {
		if (this.debugLog) {
			this.logData();
		}
	},
	methods: {
		logData() {
			console.log(
				'needToCalcIn --->', this.needToCalcIn, '\n',
				'needToCalcOut --->', this.needToCalcOut, '\n',
			);
		},
		pinRefreshHandler() {
			this.$refs.ViewportProgressor.refreshScrollTriggers();
		},
	},
};
</script>

<style lang="scss">
.ScrollAnimation {
	&__content {
		will-change: translate, opacity, clip-path, transform, scale;
	}

	/* ▼-▼-▼-▼ */

	/* SHIFT */

	@mixin shift($shift: 100vh, $progress: 0, $type: x) {
		$value: calc($shift * $progress);

		//@if ($transform == true) {
		//	@if ($type == x) {
		//		transform: translate($value);
		//	} @else if($type == y) {
		//		transform: translate(0, $value);
		//	}
		//} @else {
		//
		//}
		@if ($type == x) {
			translate: $value;
		} @else if($type == y) {
			translate: 0 $value;
		}
	}

	&._appearance-shift {
		&._appearance-shift-y {
			.ScrollAnimation__wrapper {
				@include shift(var(--appearance-shift), calc(1 - var(--progress-in)), y);
			}
		}
		&._appearance-shift-x {
			.ScrollAnimation__wrapper {
				@include shift(var(--appearance-shift), calc(1 - var(--progress-in)), x);
			}
		}
	}

	&._disappearance-shift {
		&._disappearance-shift-y {
			.ScrollAnimation__wrapper-inner {
				@include shift(var(--disappearance-shift), var(--progress-out), y);
			}
		}
		&._disappearance-shift-x {
			.ScrollAnimation__wrapper-inner {
				@include shift(var(--disappearance-shift), var(--progress-out), x);
			}
		}
	}

	/* ▼-▼-▼-▼ */

	@mixin clip($clip: 100%, $progress: 0, $type: top) {
		$value: calc($clip * $progress);

		@if ($type == top) {
			clip-path: inset(#{$value} 0 0 0);
		} @else if($type == right) {
			clip-path: inset(0 $value 0 0);
		}@else if($type == bottom) {
			clip-path: inset(0 0 $value 0);
		}@else if($type == left) {
			clip-path: inset(0 0 0 $value);
		}
	}
	/* CLIP */
	&._appearance-clip {
		&._appearance-clip-top {
			.ScrollAnimation__wrapper {
				@include clip(var(--appearance-clip), calc(1 - var(--progress-in)), top);
			}
		}
		&._appearance-clip-right {
			.ScrollAnimation__wrapper {
				@include clip(var(--appearance-clip), calc(1 - var(--progress-in)), right);
			}
		}
		&._appearance-clip-bottom {
			.ScrollAnimation__wrapper {
				@include clip(var(--appearance-clip), calc(1 - var(--progress-in)), bottom);
			}
		}
		&._appearance-clip-left {
			.ScrollAnimation__wrapper {
				@include clip(var(--appearance-clip), calc(1 - var(--progress-in)), left);
			}
		}
	}

	&._disappearance-clip {
		&._disappearance-clip-top {
			.ScrollAnimation__wrapper-inner {
				@include clip(var(--disappearance-clip), var(--progress-out), top);
			}
		}
		&._disappearance-clip-right {
			.ScrollAnimation__wrapper-inner {
				@include clip(var(--disappearance-clip), var(--progress-out), right);
			}
		}
		&._disappearance-clip-bottom {
			.ScrollAnimation__wrapper-inner {
				@include clip(var(--disappearance-clip), var(--progress-out), bottom);
			}
		}
		&._disappearance-clip-left {
			.ScrollAnimation__wrapper-inner {
				@include clip(var(--disappearance-clip), var(--progress-out), left);
			}
		}
	}

	/* ▼-▼-▼-▼ */

	/* CIRCLE */
	&._appearance-circle {
		.ScrollAnimation__wrapper {
			clip-path: circle(calc(100% * var(--progress-in)) at var(--appearance-circle));
		}
	}

	&._disappearance-circle {
		.ScrollAnimation__wrapper {
			clip-path: circle(calc(100% * (1 - var(--progress-out))) at var(--disappearance-circle));
		}
	}

	/* ▼-▼-▼-▼ */

	/* OPACITY */
	&._appearance-opacity {
		.ScrollAnimation__wrapper {
			opacity: calc((var(--appearance-opacity) + (1 - var(--appearance-opacity)) * (var(--progress-in))) );
		}
	}

	&._disappearance-opacity {
		.ScrollAnimation__wrapper {
			opacity: calc(var(--disappearance-opacity) + (1 - var(--disappearance-opacity) * (1 - var(--progress-out))));
		}
	}

	/* ▼-▼-▼-▼ */

	/* SCALE */
	&._appearance-scale,
	&._disappearance-scale {
		.ScrollAnimation__content {
			--in: 0;
			--out: 0;

			scale: calc(1 + var(--in) + var(--out));
		}
	}

	&._appearance-scale {
		.ScrollAnimation__content {
			--in: var(--appearance-scale) * (1 - var(--progress-in));
		}
	}

	&._disappearance-scale {
		.ScrollAnimation__content {
			--out: var(--disappearance-scale) * var(--progress-out);
		}
	}
}
</style>
