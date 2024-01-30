<template>
	<div class="page">
		<div class="black block">
			<h1 data-text="DATA TEXT">DATA TEXT</h1>
			<h2>TEST NEW</h2>
		</div>
		<div class="red block">
			<h1>TEST TEXT</h1>
			<h1 data-text="DATA TEXT"></h1>
			<h2>TEST NEW</h2>
		</div>
		<div class="white block">
			<h1>TEST TEXT</h1>
			<h1 data-text="DATA TEXT">DATA TEXT</h1>
			<h2>TEST NEW</h2>
		</div>
		<div class="spacer"></div>
		<div class="spacer"></div>
		<div class="block">
			<div class="inner"></div>
		</div>
		<div class="spacer"></div>
		<div class="spacer"></div>
	</div>
</template>

<script>
export default {};
</script>

<style
	lang="scss"
	scoped
>
@import "assets/style/keyframes";
/* stylelint-disable */
.spacer {
	height: 50vh;
}

.red {
	// background-color: #2d001e;
	background-color: #3f3f3f;
	animation-name: bc;
	animation-iteration-count: infinite;
	animation-duration: 10s;
	animation-fill-mode: both;
	animation-direction: alternate;
	background-image: url("/assets/images/00.jpeg");
	@keyframes bc {
		from {
			background-color: black;
		}
		to {
			background-color: white;
		}
	}
}

.black {
	background-color: black;
}

.white {
	background-color: #f3f3f3;
}

h1 {
	color: white;
	mix-blend-mode: darken;
}

[data-text] {
	color: white;
	// position: relative;
	z-index: 1;
	// mix-blend-mode: difference;
	// filter: grayscale(1);
	// background-blend-mode: difference;
	content: '';

	&:before {
		mix-blend-mode: difference;
		color: white;
		// position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		content: attr(data-text);
	}
}

h2 {
	color: black;
	mix-blend-mode: darken;
}

.block {
	position: relative;
	height: 40vh;
	border: 2px solid rosybrown;
	overflow: clip;

	.inner {

		@include scrollDriven(view(), ease-in-out, contain cover 50%);
		@include kf((-10px 100px), (40px -100px)) {
			0% {
				background-color: #ffeb3b;
				scale: 0.2;
			}
			50% {
				opacity: 0;
			}
		}

		height: 100%;

		background-color: violet;

	}
}
</style>
