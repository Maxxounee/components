<template>
	<ScrollSlider class="page-test">
		<ScrollAnimation
			v-if="test"
		>
			<div class="block-100">
				<img :src="images[0]" />
			</div>
		</ScrollAnimation>
		<!--		<ScrollAnimation-->
		<!--			v-if="test"-->
		<!--			appearance-shift="-50dvh"-->
		<!--			appearance-scale="1.2"-->
		<!--			appearance-clip="50dvh"-->
		<!--			disappearance-shift="100dvh"-->
		<!--			slider-additional-states="2"-->
		<!--		>-->
		<!--			&lt;!&ndash;			<div class="block-100">&ndash;&gt;-->
		<!--			&lt;!&ndash;				<img :src="images[1]" />&ndash;&gt;-->
		<!--			&lt;!&ndash;			</div>&ndash;&gt;-->
		<!--		</ScrollAnimation>-->
		<HorizontalScroll
			ref="test"
			v-slot="{ pinnedElement }"
			:pin-height-vh="2"
			slider-additional-states="2"
		>
			<ScrollAnimation
				v-if="test"
				:style="{ height: '100dvh', overflow: 'hidden', width: '300vw'}"
				appearance-shift="-50dvh"
				appearance-clip="50dvh"
				disappearance-shift="100dvh"
				disappearance-clip="100dvh"
				:pinned-container="pinnedElement"
			>
				<!--			<div class="block-100">-->
				<!--				<img :src="images[1]" />-->
				<!--			</div>-->
				<img src="/images/long.jpg" :style="{ height: '100dvh', overflow: 'hidden', width: '300vw'}" />
			</ScrollAnimation>
		</HorizontalScroll>
		<ScrollAnimation
			appearance-shift="-100dvh"
			appearance-clip="100dvh"
			disappearance-shift="100dvh"
			disappearance-clip="100vw"
			disappearance-clip-type="right"
		>
			<div class="block-100">
				<img :src="images[2]" />
			</div>
		</ScrollAnimation>
		<ScrollAnimation
			v-if="test"
			appearance-shift="-100dvh"
			appearance-clip="100vw"
			appearance-clip-type="left"
			disappearance-shift="100dvh"
			disappearance-clip="100dvh"
		>
			<div class="block-100">
				<img :src="images[3]" />
			</div>
		</ScrollAnimation>
		<ScrollAnimation
			appearance-shift="-100dvh"
			appearance-clip="100dvh"
			disappearance-shift="100dvh"
			disappearance-scale="1.2"
		>
			<div class="block-100">
				<img :src="images[4]" />
			</div>
		</ScrollAnimation>
		<ScrollAnimation
			appearance-circle="50% 50%"
			appearance-shift="-100dvh"
			disappearance-shift="100dvh"
		>
			<div class="block-100">
				<img :src="images[5]" />
			</div>
		</ScrollAnimation>
		<ScrollAnimation
			:style="{ zIndex: 2 }"
			appearance-clip="100dvh"
			appearance-shift="-50dvh"
			disappearance-shift="100dvh"
			disappearance-circle
		>
			<div class="block-100">
				<img :src="images[6]" />
			</div>
		</ScrollAnimation>
		<ScrollAnimation
			:style="{ zIndex: 1, overflow: 'hidden' }"
			appearance-shift="-100dvh"
			appearance-scale="1.2"
			disappearance-circle="50% 80%"
			disappearance-shift="100dvh"
		>
			<div class="block-100">
				<img :src="images[7]" />
			</div>
		</ScrollAnimation>
		<ScrollAnimation appearance-shift="-100dvh">
			<div class="block-100">
				<img :src="images[8]" />
			</div>
		</ScrollAnimation>
	</ScrollSlider>
</template>

<script>
import ScrollAnimation from '~/modules/ScrollAnimation/ScrollAnimation.vue';
import HorizontalScroll from '@/modules/HorizontalScroll/HorizontalScroll.vue';

export default {
	components: { HorizontalScroll, ScrollAnimation },
	data() {
		return {
			test: true,
			images: [
				'/images/00.jpg',
				'/images/01.jpg',
				'/images/02.jpg',
				'/images/03.jpg',
				'/images/04.jpg',
				'/images/05.jpg',
				'/images/06.jpg',
				'/images/07.jpg',
				'/images/08.jpg',
			],
		};
	},
	mounted() {
		setTimeout(() => {
			console.log('mounted');
			this.test = true;
		}, 2000);
	},
};
</script>

<style lang="scss" scoped>
.page-test {
	.block-50 {
		height: 50vh;
		background: linear-gradient(to bottom, #123321, #5f9375);
		//border: 5px solid #521292;
	}
	.block-100 {
		position: relative;
		height: 100dvh;
		//background: linear-gradient(to bottom, #123321, #5f9375);
		//border: 5px solid #521292;
		img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
}
</style>
