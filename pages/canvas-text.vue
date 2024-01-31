<template>
	<div class="canvas-text">
		<canvas
			ref="canvas"
			@mousemove="update"
		></canvas>
	</div>
</template>

<script>
/* eslint-disable */
export default {
	data() {
		return {
			particles: [],
			ctx: undefined,
			canvas: undefined,
			diameter: undefined,
		};
	},
	mounted() {

		this.diameter = 6;
		this.canvas = this.$refs.canvas;
		this.ctx = this.canvas.getContext('2d');
		this.particles = [];
		const img = new Image();
		img.src = '/assets/images/00.jpeg';

		img.addEventListener('load', () => {
			this.canvas.width = img.width;
			this.canvas.height = img.height;
			this.ctx.drawImage(img, 0, 0);

			const imageData = this.ctx.getImageData(0, 0, img.width, img.height).data;
			const numRows = Math.round(img.height / this.diameter);
			const numColumns = Math.round(img.width / this.diameter);

			for (let row = 0; row < numRows; row++) {
				for (let column = 0; column < numColumns; column++) {
					const pixelIndex = (row * this.diameter * img.width + column * this.diameter) * 4;

					const red = imageData[pixelIndex];
					const green = imageData[pixelIndex + 1];
					const blue = imageData[pixelIndex + 2];
					const alpha = imageData[pixelIndex + 3];
					this.particles.push({
						x: column * this.diameter + this.diameter / 2,
						y: row * this.diameter + this.diameter / 2,
						originX: column * this.diameter + this.diameter / 2,
						originY: row * this.diameter + this.diameter / 2,
						color: `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`,
					});
				}
			}
			this.drawParticles();
		});
	},
	methods: {
		drawParticles() {
			this.update({});
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.particles.forEach((particle) => {
				this.ctx.beginPath();
				this.ctx.arc(particle.x, particle.y, this.diameter / 2, 0, 2 * Math.PI);
				this.ctx.fillStyle = particle.color;
				this.ctx.fill();
			});
			requestAnimationFrame(this.drawParticles);
		},
		update({ offsetX = 0, offsetY = 0 }) {
			const radius = 50;
			if (!offsetX || !offsetY) return;
			this.particles.forEach((particle, index) => {
				const distanceFromMouseX = offsetX - particle.x;
				const distanceFromMouseY = offsetY - particle.y;
				const distanceFromMouse = Math.sqrt(distanceFromMouseX ** 2 + distanceFromMouseY ** 2);
				if (index > 500) {
					return;
				}
				if (distanceFromMouse < radius) {
					const angle = Math.atan2(distanceFromMouseY, distanceFromMouseX);
					const force = (radius - distanceFromMouse) / radius;
					const moveX = Math.cos(angle) * force;
					const moveY = Math.sin(angle) * force;

					particle.x -= moveX;
					particle.y -= moveY;
				}
			});
		},
	},
};
</script>

<style
	lang="scss"
	scoped
>
.canvas-text {
}
</style>
