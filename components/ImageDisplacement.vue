<template>
	<div class="SectionGallery">
		<!--<SlideGallery-->
		<!--	ref="slideGallery"-->
		<!--	:images="images"-->
		<!--	animation="opacity"-->
		<!--/>-->
		<div
			id="faux-3d"
			class="o-page o-page--faux-3d"
		>
			<div class="o-page__inner">

				<section class="o-section o-section--3d">

					<div class="o-section__content">
						<div class="o-container">
							<div class="c-3d-image-wrapper">
								<div class="c-3d-image-container js-3d-image-container">

									<div
										class="c-3d-image js-3d-image"
										data-image="/assets/images/views/gallery/00.jpg"
										data-depth-map="/assets/images/views/gallery/d-test.png"
										data-horizontal-threshold="150"
										data-vertical-threshold="75"
									>
									</div>
								</div>
								<div class="c-3d-image-heading">
									<span class="c-eyebrow u-uppercase u-b1">
										<span>Fake 3D images</span>
									</span>

									<h1 class="u-a6">
										3D images bring scenes to life with depth and movement
									</h1>
								</div>
							</div>
						</div>
					</div>

				</section>

			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
import SlideGallery from '~/components/tools/SlideGallery.vue';

/*https://bornfight.github.io/pixi.js-playground/faux-3d.html*/
class ThreeDImagesController {

	init() {
		console.log('ThreeDImages init()');

		if (this.threeDImages !== null) {

		} else {
			console.error(`${this.DOM.threeDImage} does not exist in the DOM!`);
		}
	}

	/**
	 *
	 * @param {HTMLElement} container
	 * @param {PIXI.filters.DisplacementFilter} displacementFilter
	 * @param {number} horizontalThreshold
	 * @param {number} verticalThreshold
	 */

}

export default {
	components: { SlideGallery },
	props: {},
	data() {
		return {
			DOM: {
				threeDImageContainer: '.js-3d-image-container',
				threeDImage: '.js-3d-image',
				threeDImageCanvas: '.js-3d-image-canvas',
			},
			threeDImages: undefined,
			images: [
				'/assets/images/views/gallery/00.jpg',
				'/assets/images/views/gallery/01.jpg',
				'/assets/images/views/gallery/02.jpg',
				'/assets/images/views/gallery/03.jpg',
			],
		};
	},
	mounted() {
		this.threeDImages = document.querySelectorAll(this.DOM.threeDImage);
		this.threeDImagesController();
	},
	methods: {
		threeDImagesController() {
			for (let i = 0; i < this.threeDImages.length; i++) {
				//MOUSEMOVE CONTAINER
				const container = this.threeDImages[i].closest(
					this.DOM.threeDImageContainer,
				);

				//THRESHOLD
				const verticalThreshold = this.threeDImages[i].getAttribute(
					'data-vertical-threshold',
				);
				const horizontalThreshold = this.threeDImages[i].getAttribute(
					'data-horizontal-threshold',
				);

				// CANVAS SIZE
				const canvasWidth = this.threeDImages[i].clientWidth;
				const canvasHeight = this.threeDImages[i].clientHeight;

				// CREATE PIXI APPLICATION
				const app = new this.$pixi.Application({
					width: 1080,
					height: 500,
					transparent: true,
					resolution: window.devicePixelRatio,
					resizeTo: this.threeDImages[i],
				});

				// ADD CANVAS TO CANVAS WRAPPER ELEMENT
				this.threeDImages[i].appendChild(app.view);

				//IMAGE
				const imageFile = this.threeDImages[i].getAttribute('data-image');
				const image = this.$pixi.Sprite.from(
					imageFile,
				);

				image.name = imageFile;
				// image.width = canvasWidth;
				// image.height = canvasHeight;
				image.width = 1080;
				image.height = 2000;

				image.anchor.set(0.5);

				// image.position.x = 1080 / 2;
				// image.position.y = 2000 / 2;

				app.stage.addChild(image);

				// //DEPTH MAP
				const depthMapName = this.threeDImages[i].getAttribute('data-depth-map');
				const depthMap = PIXI.Sprite.from(
					depthMapName,
				);
				console.log('depth', depthMapName);
				const depthMapFilter = new this.$pixi.filters.DisplacementFilter(
					depthMap,
				);

				app.stage.addChild(depthMap);
				app.stage.filters = [depthMapFilter];

				depthMap.name = depthMapName;
				// depthMap.width = canvasWidth;
				// depthMap.height = canvasHeight;
				depthMap.width = 1080;
				depthMap.height = 2000;
				depthMap.anchor.set(0.5);

				// depthMap.position.y = 1080 / 2;
				// depthMap.position.x = 2000 / 2;

				depthMapFilter.scale.x = 2;
				depthMapFilter.scale.y = 2;

				//EVENTS
				this.initThreeDEvents(
					container,
					depthMapFilter,
					horizontalThreshold,
					verticalThreshold,
				);
			}
		},
		initThreeDEvents(
			container,
			displacementFilter,
			horizontalThreshold,
			verticalThreshold,
		) {
			container.addEventListener('mousemove', (ev) => {
				let yAmount = ev.clientY / window.innerHeight - 0.5;
				let xAmount = ev.clientX / window.innerWidth - 0.5;

				// this.$gsap.to(displacementFilter.scale, {
				// 	duration: 2,
				// 	y: yAmount * verticalThreshold,
				// 	x: xAmount * horizontalThreshold,
				// 	ease: 'power3.out',
				// });

				displacementFilter.scale.x = xAmount * horizontalThreshold;
				displacementFilter.scale.y = yAmount * verticalThreshold;
			});
		},
	},
};
</script>

<style lang="scss">
@import "@/assets/style/import";

.SectionGallery {
	@include div100d(relative);

	position: relative;

	.hidden {
		pointer-events: none;
		opacity: 0;
	}
}
</style>
