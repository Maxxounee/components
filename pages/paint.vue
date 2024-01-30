<template>
	<div class="paint">
		<button
			id="ripple"
			@click="paintRippleOnClick"
		>
			Click me!
		</button>
	</div>
</template>

<script>
/* eslint-disable */
export default {
	mounted() {
	},
	methods: {
		seeker() {

		},
		paintRippleOnClick(event, opt = {}) {
			if (!(event instanceof Event) || typeof opt !== 'object') return;

			const { x, y, target } = event;
			const circle = document.createElement('span');

			circle.classList.add(opt.className ?? 'ripple-circle');

			Object.assign(circle.style, {
				position: 'absolute',
				left: x + 'px',
				top: y + 'px',
				translate: '-50% -50%',
				borderRadius: '50%',
				pointerEvents: 'none',
			});

			target.appendChild(circle);

			circle.animate({
				width: [0, opt.size ?? '100%'],
				height: [0, opt.size ?? '100%'],
				opacity: [1, opt.opacity ?? 0],
			}, {
				duration: opt.duration ?? 700,
				easing: opt.easing ?? 'ease',
			});

			const animation = circle.getAnimations()[0];
			animation && animation.finished.then(() => circle.remove());
		},
	},
};
</script>

<style
	lang="scss"
>
.paint {
	#ripple {
		--ripple-x: 0;
		--ripple-y: 0;
		--ripple-color: rgb(255 255 255 / 54%);
		--animation-tick: 0;

		position: relative;

		width: 300px;
		height: 300px;

		font-size: 5em;
		color: white;

		background-color: rgb(255 64 129);
		border: 0;
		border-radius: 150px;
		box-shadow: 0 1px 1.5px 0 rgb(0 0 0 / 12%), 0 1px 1px 0 rgb(0 0 0 / 24%);
	}

	@keyframes animate-ripple {
		0% {
			width: 0;
			height: 0;
		}

		100% {
			width: 200%;
			height: 200%;
			opacity: 0;
		}
	}

	.ripple__circle {
		// background-color: #fff;
		// animation: animate-ripple;
		// animation-duration: 1s;
	}
}
</style>
