<template>
	<div>
	</div>
</template>

<script>
/* eslint-disable */

export default {
	data() {
		return {
			renderer: undefined,
			container: undefined,
		};
	},
	mounted() {
		this.renderer = new this.PIXI.Application({
			backgroundColor: '0x31b788',
			resizeTo: window,
		});
		this.$el.appendChild(this.renderer.view);
		const sprite1 = new this.PIXI.Sprite(this.getTexture('/assets/images/00.jpeg'));
		this.renderer.stage.addChild(sprite1);
		this.container = new this.PIXI.Container();

		const disSprite = new this.PIXI.Sprite(this.getTexture('/assets/images/d01.jpeg'));
		// const disSprite = new this.PIXI.Sprite.from('/assets/images/d01.jpeg');
		disSprite.width = this.renderer.width;
		disSprite.height = this.renderer.height;
		console.log(disSprite);
		const disFilter = new this.PIXI.filters.DisplacementFilter(disSprite);
		const test = new this.PIXI.filters.BlurFilter();
		console.log(this.PIXI.filters);
		this.renderer.stage.addChild(disSprite);
		this.renderer.stage.filters = [disFilter, test];

		let i = 0;

		const draw = () => {
			i++;
			disSprite.x += i;
			disSprite.y += i;
			this.renderer.render(this.renderer.stage);
			requestAnimationFrame(draw);
		};

		draw();
	},
	methods: {
		getTexture(path) {
			return this.PIXI.Texture.from(path);
		},
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

.Canvas {
}
</style>
