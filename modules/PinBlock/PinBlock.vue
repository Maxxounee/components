<template>
	<div
		class="PinBlock"
	>
		<div ref="pin" class="PinBlock__pin">
			<div
				ref="inner"
				class="PinBlock__content"
			>
				<slot :progress="progress"></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	inject: ['scroller'],
	props: {
		start: {
			type: [String, Function],
			default: 'top top',
		},
		end: {
			type: [String, Function],
			default: '',
		},
		pinHeightVh: {
			type: Number,
			default: 1,
		},
		pinSpacing: {
			type: Boolean,
			default: false,
		},
	},

	emits: ['progress', 'refresh'],
	data() {
		return {
			progress: 0,
			scrollTriggerInstance: null,
		};
	},
	mounted() {
		if (this.pinHeightVh) {
			this.pinComponent();
		}
	},
	beforeDestroy() {
		this.scrollTriggerInstance?.kill();
	},
	methods: {
		pinComponent() {
			if (!this.scroller) { return; }

			const scroller = typeof this.scroller === 'function' ? this.scroller() : this.scroller;

			this.scrollTriggerInstance = this.$ScrollTrigger.create({
				scroller,
				trigger: this.$el,
				pin: this.$refs.pin,
				pinSpacing: this.pinSpacing,
				start: () => this.start ?? 'top top',
				end: (self) => {
					return this.end || self.start + innerHeight * (this.pinHeightVh ?? 1);
				},
				onRefresh: () => {
					this.$emit('refresh');
				},
				onUpdate: (self) => {
					this.progress = self.progress;
					this.$emit('progress', this.progress);
				},
			});
		},
		async refreshPin() {
			await this.$nextTick();
			this.scrollTriggerInstance.refresh();
		},
	},
};
</script>

<style lang="scss">

.PinBlock {
	position: relative;

	&__pin,
	&__content {
		will-change: transform, translate;
	}

}
</style>
