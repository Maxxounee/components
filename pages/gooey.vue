<template>
	<div class="gooey">
		<div class="container">
			<div class="circle n1"></div>
			<div class="circle n2"></div>
		</div>
		<svg>
			<filter id="gooey">
				<feGaussianBlur
					in="SourceGraphic"
					:stdDeviation="value"
				/>
				<feColorMatrix
					values="
					1 0 0 0 0
					0 1 0 0 0
					0 0 1 0 0
					0 0 0 20 -10"
				/>
			</filter>
		</svg>
		<div class="controls">
			<button @click="value++">+</button>
			<button @click="value--">-</button>
			<p v-html="value"></p>
			<input
				v-model="value"
				type="range"
			/>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			value: 1,
		};
	},
};
</script>

<style
	lang="scss"
	scoped
>
/* stylelint-disable */
.gooey {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	// background: #000;
	overflow: hidden;

	.container {
		position: relative;

		display: flex;
		justify-content: space-between;

		width: 800px;
		filter: url(#gooey);

	}

	.circle {
		position: relative;

		// z-index: 1;

		min-width: 300px;
		height: 300px;
		// border-radius: 50%;
		background: #fff;

		&::before {
			// content: '';

			position: absolute;

			z-index: -1;
			// inset: -50px;
			top: -50px;
			bottom: -50px;
			left: -50px;
			right: -50px;

			background: #fff;
			filter: blur(50px);
			border-radius: 50%;
		}

		@keyframes animate1 {
			0% {
				transform: translateX(0) rotate(0deg);
			}
			50% {
				transform: translateX(200px);
			}
			100% {
				transform: translateX(0);
			}
		}

		@keyframes animate2 {
			0% {
				transform: translateX(0);
			}
			50% {
				transform: translateX(-200px) rotate(-360deg);
			}
			100% {
				transform: translateX(0) rotate(-720deg);
			}
		}

		&.n1 {
			background: linear-gradient(90deg, #f00, #0ff);
			animation: animate1 5s ease-in-out infinite;

			&::before {
				background: linear-gradient(90deg, #f00, #0ff);
			}
		}

		&.n2 {
			background: linear-gradient(90deg, #ff3b3b, #da00ff);
			animation: animate2 5s linear infinite;

			&::before {
				background: linear-gradient(90deg, #ffeb3b, #da00ff);
			}
		}
	}

	svg {
		width: 100vw;
		height: 100vh;
	}

	.controls {
		position: absolute;
		left: 50%;
		top: 30px;
	}

	image {
		position: absolute;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
	}
}
</style>
