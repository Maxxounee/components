<template>
	<div class="pixi-gallery">

	</div>
</template>

<script>
/* eslint-disable */
import fragment from '/static/assets/shader/fragment.glsl';

export default {
	mounted() {
		const app = new this.$pixi.Application(innerWidth, innerHeight, {
			autoResize: true,
		});
		const loader = this.$pixi.loader;

		loader.add('img0', '/assets/images/00.jpeg');
		loader.add('img1', '/assets/images/01.jpeg');
		loader.add('img2', '/assets/images/d01.jpeg');

		let Filter;
		Filter = new this.$pixi.Filter(null, fragment);
		Filter.apply = function(filterManager, input, output, clear) {
			const matrix = new this.$pixi.Matrix();
			this.uniforms.mappedMatrix = filterManager.calculateNormalizedScreenSpaceMatrix(matrix);
			this.$pixi.Filter.prototype.apply.call(
				this,
				filterManager,
				input,
				output,
				clear,
			);
		};
		this.$el.appendChild(app.view);

		loader.load((loader, resources) => {
			Filter = new this.$pixi.Filter(null, fragment);
			const bunny = new this.$pixi.Sprite(resources.img0.texture);
			bunny.x = app.renderer.width / 2;
			bunny.y = app.renderer.height / 2;

			bunny.anchor.x = 0.5;
			bunny.anchor.y = 0.5;

			bunny.filters = [Filter];
			Filter.uniforms.uTextureOne = resources.img1.texture;
			app.stage.addChild(bunny);

			app.ticker.add(() => {
			});
		});
	},
};
</script>

<style lang="scss">
.pixi-gallery {
}
</style>
