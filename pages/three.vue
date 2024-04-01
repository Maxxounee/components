<template>
	<div class="three">
		<div class="container"></div>
		<h2>Кошка жена</h2>
		<h1>Миска рис</h1>
	</div>
</template>

<script>
/* eslint-disable */

export default {
	data() {
		return {};
	},
	mounted() {
		const scene = new this.$t.Scene();

		const renderer = new this.$t.WebGLRenderer({ alpha: true, antialias: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		this.$el.appendChild(renderer.domElement);

		const camera = new this.$t.PerspectiveCamera(
			45,
			window.innerWidth / window.innerHeight,
			1,
			1000,
		);
		camera.position.set(0, 200, 400);
		camera.lookAt(30, 0, 0);

		const loader = new this.$GLTFLoader();

		const groundGeometry = new this.$t.PlaneGeometry(20, 20, 32, 32);
		groundGeometry.rotateX(-Math.PI / 2);
		const groundMaterial = new this.$t.MeshStandardMaterial({ side: this.$t.DoubleSide, color: 0x555555 });
		const groundMesh = new this.$t.Mesh(groundGeometry, groundMaterial);
		groundMesh.castShadow = false;
		groundMesh.receiveShadow = true;
		// scene.add(groundMesh);

		const spotLight = new this.$t.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
		spotLight.position.set(0, 25, 50);
		scene.add(spotLight);
		var hemiLight = new this.$t.HemisphereLight(0xffffff, 0xffffff, 300);
		const ambientLight = new this.$t.AmbientLight(0xffffff, 300);

		ambientLight.position.set(0, 100, 50);
		scene.add(ambientLight);
		scene.add(hemiLight);

		const light = new this.$t.DirectionalLight(0xFFFFFF, 0.3);
		light.position.set(33, 3150, 140);
		// scene.add(light);

		const helper = new this.$t.DirectionalLightHelper(light, 20);
		scene.add(helper);
		// const controls = new this.$OrbitControls(camera, renderer.domElement);
		// controls.enableDamping = true;
		// controls.enablePan = false;
		// controls.minDistance = 5;
		// controls.maxDistance = 20;
		// controls.minPolarAngle = 0.5;
		// controls.maxPolarAngle = 1.5;
		// controls.autoRotate = false;
		// controls.target = new this.$t.Vector3(0, 1, 0);
		// controls.update();
		//
		// scene.add(controls);
		new Promise((resolve) => {
			// loader.load('/assets/3d/normal_girl/scene.gltf', (gltf) => {
			// 	const woman = gltf.scene;
			// 	woman.position.z = 17;
			// 	scene.add(woman);
			// 	resolve(woman);
			// });
			loader.load('/assets/3d/shift/shift_bld_1.gltf', (gltf) => {
				const woman = gltf.scene;
				gltf.scene.children.forEach((child) => {
					child.children[0].children.forEach((mesh) => {
						mesh.material.color = { r: 200, g: 250, b: 100 };
					});
				});
				console.log(gltf);
				// const ambientLight = new this.$t.AmbientLight(0x404040);
				// var hemiLight = new this.$t.HemisphereLight(0xffffff, 0xffffff, 0.6);
				// woman.add(ambientLight);
				// woman.add(hemiLight);
				// const material = new this.$t.MeshBasicMaterial({ color: 'red' });
				// const mesh = new this.$t.Mesh(woman, material);
				woman.position.z = 17;
				scene.add(woman);
				resolve(woman);
			});
		}).then((woman) => {
			loader.load('/assets/3d/rice/scene.gltf', (gltf) => {
				const rice = gltf.scene;
				rice.position.z = 3;
				rice.position.x = -4;
				rice.position.y = -1;
				scene.add(rice);
				this.gsapScroll(woman, rice, scene);
			});
		});

		function animate() {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		}

		animate();
	},
	methods: {
		update(value) {
		},
		gsapScroll(woman, rice, scene) {
			const tl = this.$gsap.timeline({
				scrollTrigger: {
					scroller: this.$el,
					scrub: true,
					markers: true,
				},
			});
			tl.to(scene.rotation, { y: 10 }, 'one');
			// tl.from(woman.position, { x: 5, z: 20 }, 'one');
			// tl.to(woman.position, { x: 2, z: 12 }, 'two');

			tl.from(this.$el.querySelector('h1'), {
				xPercent: -100,
				x: -100,
			}, 'two');

			tl.from(this.$el.querySelector('h2'), {
				xPercent: 100,
				x: 100,
			}, 'two');

			tl.from(rice.position, { x: -30 }, 'two');
			// tl.to(scene.position, { z: 10 }, 0);
		},
	},
};
</script>
<style lang="scss">
.three {
	position: relative;
	height: 100vh;
	overflow-y: scroll;
	width: 100vw;
	background-color: #C93D4B;

	.container {
		background: linear-gradient(to bottom, #345134, #d57070);
		height: 1000vh;
		width: 100vw;
		position: relative;
		overflow: hidden;
	}

	canvas {
		pointer-events: none;
		position: fixed;
		top: 0;
		left: 0;
	}

	h1 {
		font-size: 80px;
		position: fixed;
		top: 50%;
		text-transform: uppercase;
		font-family: Roboto, serif;
		left: 100px;
	}

	h2 {
		font-size: 80px;
		position: fixed;
		text-transform: uppercase;
		font-family: Roboto, serif;
		top: 50%;
		right: 20px;
	}
}
</style>
