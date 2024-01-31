<template>
	<div class="RippleCirclesClick">
		<button
			@click="paintRipple"
		>
			🐷
		</button>
	</div>
</template>

<script>
export default {
	methods: {
		paintRipple(event, opt = {}) {
			if (!(event instanceof Event) || typeof opt !== 'object') {
				return;
			}
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
				backgroundColor: opt.color ?? 'white',
			});

			target.appendChild(circle);

			circle.animate({
				width: [0, opt.size ?? '100%'],
				height: [0, opt.size ?? '100%'],
				opacity: [1, opt.opacity ?? 0],
			}, {
				duration: opt.duration ?? 1000,
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
.RippleCirclesClick {
	button {
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
}
</style>
