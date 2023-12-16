<template>
	<div class="svgfiltertest">
		<svg>
			<g v-if="type === 'feMorphology'">
				<filter id="leave">
					<feMorphology
						ref="leave"
						in="SourceGraphic"
						operator="dilate"
					/>
				</filter>
				<filter id="enter">
					<feMorphology
						ref="enter"
						in="SourceGraphic"
						operator="dilate"
					/>
				</filter>
			</g>
			<g v-else-if="type === 'feDisplacementMap'">
				<filter id="leave">
					<feTurbulence
						result="turbulence"
						baseFrequency="0.01 0.02"
						numOctaves="1"
					/>
					<feDisplacementMap
						ref="leave"
						in="SourceGraphic"
						scale="50"
						in2="turbulence"
					/>
				</filter>
				<filter id="enter">
					<feTurbulence
						result="turbulence"
						baseFrequency="0.01 0.02"
						numOctaves="1"
					/>
					<feDisplacementMap
						ref="enter"
						in="SourceGraphic"
						scale="50"
						in2="turbulence"
					/>
				</filter>
			</g>
		</svg>
		<div
			ref="image"
			class="image"
		>
			<!--<img-->
			<!--	v-for="(image, index) in images"-->
			<!--	:key="image"-->
			<!--	class="images__image"-->
			<!--	:src="image"-->
			<!--	:class="{-->
			<!--		active: current === index-->
			<!--	}"-->
			<!--	:style="{-->
			<!--		opacity: 1-->
			<!--	}"-->
			<!--	@click="imageHandler"-->
			<!--/>-->
		</div>
		<div class="buttons">
			<button @click="changeCurrent(-1)">-</button>
			<button @click="changeCurrent(1)">+</button>
		</div>
	</div>
</template>

<script>
export default {
	/* https://blog.logrocket.com/complete-guide-using-css-filters-svgs/ */
	props: {
		images: {
			type: Array,
			default: () => ([
				'assets/images/00.jpeg',
				'assets/images/01.jpeg',
			]),
		},
		time: {
			type: [String, Number],
			default: 2000,
		},
		type: {
			type: String,
			validator(value) {
				return [
					'feDisplacementMap',
					'feMorphology',
				].includes(value);
			},
			default: 'feDisplacementMap',
		},
	},
	data() {
		return {
			current: 0,
			attributeModifiers: {
				scale: 1,
				feMorphology: 10,
				feDisplacementMap: 50,
			},
			feAttributes: {
				feDisplacementMap: 'scale',
				feMorphology: 'radius',
			},
		};
	},
	computed: {},
	watch: {
		current(value, oldValue) {
			const leaveNode = this.$refs.image.lastChild;
			const enterNode = this.prepend(this.images[this.current]);
			leaveNode.classList.add('leave');
			enterNode.classList.add('enter');
			setTimeout(() => {
				this.removeLastNode();
				enterNode.classList.remove('enter');
			}, this.time);
			this.animate(leaveNode);
		},
	},
	mounted() {
		this.appendChild(this.images[0]);
	},
	methods: {
		createNode(src) {
			const node = document.createElement('img');
			node.style.opacity = '1';
			node.setAttribute('src', src);
			return node;
		},
		appendChild(src) {
			this.$refs.image.appendChild(this.createNode(src));
		},
		prepend(src) {
			const node = this.createNode(src);
			this.$refs.image.prepend(node);
			return node;
		},
		removeLastNode() {
			this.$refs.image.removeChild(this.$refs.image.lastChild);
		},
		increment(number, min = 0, max = 10, cycle = true) {
			let next = number;
			if (number > max) {
				next = cycle ? min : max;
			} else if (number < min) {
				next = cycle ? max : min;
			}
			return next;
		},
		changeCurrent(delta) {
			this.current = this.increment(this.current + delta, 0, this.images.length - 1);
		},
		animate(leaveNode) {
			let startTime;

			const raf = (time) => {
				if (!startTime) {
					startTime = time;
				}
				const currentTime = time - startTime;

				const value = (time - startTime) / this.time;
				const filterValue = this.attributeModifiers[this.type] * value;
				this.$refs.leave.setAttribute(this.feAttributes[this.type], filterValue);
				this.$refs.enter.setAttribute(this.feAttributes[this.type], this.attributeModifiers[this.type] - filterValue);
				leaveNode.style.opacity = 1 - value;

				if (currentTime < this.time) {
					requestAnimationFrame(raf);
				}
			};

			requestAnimationFrame(raf);
		},
	},
};
</script>

<style
	lang="scss"
>
.svgfiltertest {
	img {
		position: absolute;

		// z-index: -1;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		opacity: 0.5;
		object-fit: cover;

		&.leave {
			filter: url("#leave");
		}

		&.enter {
			filter: url("#enter");
		}
	}

	.image {
		position: absolute;
		top: 0;

		overflow: hidden;

		width: 100vw;
		height: 50vh;

		&__image {
		}
	}

	.active {
		// z-index: 1;
		filter: url("#blur");
	}

	.buttons {
		position: absolute;
		top: 50vh;
		left: 50vw;
	}
}
</style>
