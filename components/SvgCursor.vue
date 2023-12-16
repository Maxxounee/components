<template>
	<div
		class="SvgCursor"
		:style="{
			translate: `${renderedStyles.tx.previous}px ${renderedStyles.ty.previous}px`,
		}"
	>
		<div
			ref="innerr"
			class="inner"
		></div>
		<svg
			class="cursor"
			width="220"
			height="220"
			viewBox="0 0 220 220"
		>
			<defs>
				<filter
					id="filter-1"
					x="-50%"
					y="-50%"
					width="200%"
					height="200%"
					filterUnits="objectBoundingBox"
				>
					<feTurbulence
						ref="turbulence"
						type="fractalNoise"
						baseFrequency="0"
						numOctaves="1"
						result="warp"
					/>
					<feOffset
						dx="-30"
						result="warpOffset"
					/>
					<feDisplacementMap
						xChannelSelector="R"
						yChannelSelector="G"
						scale="30"
						in="SourceGraphic"
						in2="warpOffset"
					/>
				</filter>
			</defs>
			<circle
				ref="inner"
				class="cursor__inner"
				cx="110"
				cy="110"
				r="60"
			/>
		</svg>
	</div>
</template>

<script>
export default {
	// https://github.com/codrops/AnimatedCustomCursor/blob/master/src/index.html
	data() {
		return {
			window: {
				width: 0,
				height: 0,
			},
			renderedStyles: {
				tx: { previous: 0, current: 0, amt: 0.05 },
				ty: { previous: 0, current: 0, amt: 0.05 },
				radius: { previous: 60, current: 60, amt: 0.2 },
			},
			filterId: '#filter-1',
			primitiveValues: { turbulence: 0 },
			mouse: {
				x: 0,
				y: 0,
			},
			bounds: {},
		};
	},
	mounted() {
		this.bounds = this.$el.getBoundingClientRect();
		this.updateWindowSize();
		window.addEventListener('resize', this.updateWindowSize);
		window.addEventListener('mousemove', this.updateMousePosition);
		window.addEventListener('mousemove', this.onMouseMoveEv);
	},
	methods: {
		render() {
			this.renderedStyles.tx.current = this.mouse.x - this.bounds.width / 2;
			this.renderedStyles.ty.current = this.mouse.y - this.bounds.height / 2;

			for (const key in this.renderedStyles) {
				this.renderedStyles[key].previous = this.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
			}

			this.translate.x = this.renderedStyles.tx.previous;
			this.translate.y = this.renderedStyles.ty.previous;
			this.$refs.inner.setAttribute('r', this.renderedStyles.radius.previous);

			requestAnimationFrame(this.render);
		},
		onMouseMoveEv() {
			this.renderedStyles.tx.previous = this.renderedStyles.tx.current = this.mouse.x - this.bounds.width / 2;
			this.renderedStyles.ty.previous = this.renderedStyles.ty.current = this.mouse.y - this.bounds.height / 2;
			requestAnimationFrame(this.render);
			window.removeEventListener('mousemove', this.onMouseMoveEv);
		},
		enter() {
			this.renderedStyles.radius.current = 100;
			// this.tl.restart();
		},
		leave() {
			this.renderedStyles.radius.current = 60;
			// this.tl.progress(1).kill();
		},
		listen() {
			this.on('enter', () => this.enter());
			this.on('leave', () => this.leave());
		},
		updateMousePosition(event) {
			console.log('updataMouse', event.clientX);
			const { clientX, clientY } = event;
			this.mouse.x = clientX;
			this.mouse.y = clientY;
		},
		updateWindowSize() {
			this.window.width = window.innerWidth;
			this.window.height = window.innerHeight;
		},
		lerp(a, b, n) {
			return (1 - n) * a + n * b;
		},
	},
};
</script>

<style
	lang="scss"
	scoped
>
.SvgCursor {
	width: 100px;
	height: 100px;
	border: 2px solid #2d001e;
	border-radius: 50%;
}
</style>
