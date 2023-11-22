<template>
	<div class="spline">
		<div class="my-div">
			<img
				src=""
				alt=""
			/>
		</div>
		<div
			v-for="i in 4"
			:key="i"
			class="container"
			:style="{
				display: 'none',
			}"
			:class="i % 2 === 0 ? 'black' : 'yellow'"
		>
			<div
				class="container__text"
				:class="i % 2 === 0 ? 'left' : 'right'"
			>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit.
				Accusantium,
				ad consectetur corporis eos in iusto laudantium non, pariatur
				placeat
				quia quis quod reiciendis rem totam voluptas! Accusantium animi,
				commodi
				culpa doloribus eaque fugiat hic in nihil nulla provident quas
				sed!
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
import * as THREE from 'three/build/three.module';
// import * as $S from '@splinetool/runtime';
// import * as spline from '@/plugins/spline.runtime.min';
// import * as dd from '@/plugins/distort';
// import * as loader from '@/plugins/SplineLoader.js';
// import Spline from 'vue-spline';
// Vue.component(Spline)
export default {
	components: {
		// Spline,
	},
	mounted() {
		console.log(this.$D);

		const myAnimation = new this.$D({
			parent: document.querySelector('.my-div'),
			intensity: 0.3,
			image1: '/assets/images/00.jpeg',
			image2: '/assets/images/01.jpeg',
			displacementImage: '/assets/images/01.jpeg',
		});
	},
	methods: {
		// test(spline) {
		// 	console.log('test', spline);
		// },
	},
};
</script>

<style
	lang="scss"
>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

.my-div {
	width: 500px;
	height: 500px;
}

.container {
	&.black {
		background-color: #131313;
	}

	&.yellow {
		background-color: #d3d300;
	}

	&__text {
		top: 50%;
		transform: translateY(-50%);

		// font-family: Roboto, serif;
		font-size: 20px;

		&.left {
			left: 40px;
		}

		&.right {
			right: 40px;
		}
	}
}

</style>
