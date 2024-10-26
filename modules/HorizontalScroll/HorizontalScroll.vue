<template>
	<div class="HorizontalScroll">
		<div ref="pin" class="HorizontalScroll__pin">
			<div
				ref="inner"
				class="HorizontalScroll__inner"
			>
				<slot
					:tween="tween"
					:pinned-element="$refs.pin"
					:progress="progress"
				></slot>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	inject: ['scroller'],
	props: {
		pinHeightVh: {
			type: Number,
			default: 1,
		},
		scrub: {
			type: [Number, Boolean],
			default: true,
		},
	},
	data() {
		return {
			progress: 0,
			tween: null,
		};
	},
	watch: {
		progress() {
		},
	},
	mounted() {
		console.log(this.$refs.inner, this.scroller);
		this.createScroll();
	},
	methods: {
		createScroll() {
			this.tween = this.$gsap.to(this.$refs.inner, {
				ease: 'none',
				xPercent: -100,
				x: () => '100vw',
				scrollTrigger: {
					scroller: this.scroller?.() ?? this.scroller,
					trigger: this.$el,
					start: 'top top',
					end: (self) => self.start + innerHeight * this.pinHeightVh,
					pin: this.$refs.pin,
					scrub: this.scrub,
				},
			});
		},
	},
};
</script>

<style lang="scss">
.HorizontalScroll {
	&__inner {
		width: max-content;
		height: 100dvh;
	}
}
</style>
