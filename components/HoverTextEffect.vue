<template>
	<div
		class="HoverTextEffect"
		:style="{
			'--x': (position?.x ?? x) + 'px',
			'--y': (position?.y ?? y) + 'px',
		}"
		:class="{ active }"
		@mousemove="getPosition"
		@mouseleave="deactivate"
		@mouseenter="activate"
	>
		{{ inner }}
		<span
			class="HoverTextEffect__fake"
		>{{ inner }}</span>
	</div>
</template>

<script>
export default {
	props: {
		position: {
			type: [Object, Boolean],
			default: true,
			validator(value) {
				return (typeof value === 'boolean' && value) || ('x' in value && 'y' in value);
			},
		},
		inner: {
			type: String,
			default: '🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷🐷',
		},
	},
	data() {
		return {
			x: 0,
			y: 0,
			handleMousemove: false,
			active: false,
		};
	},
	mounted() {
		if (typeof this.position === 'boolean' && this.position) {
			this.handleMousemove = true;
		}
	},
	methods: {
		getPosition({ x = 0, y = 0 }) {
			if (!this.handleMousemove) {
				return null;
			}
			this.x = x;
			this.y = y;
		},
		activate() {
			this.active = true;
		},
		deactivate() {
			this.active = false;
		},
	},

};
</script>

<style
	lang="scss"
	scoped
>
.HoverTextEffect {
@layer fake {
	--hover-size: 30rem;
	--hover-color: gold;
	--opacity: 1;
	--hover-duration: 0.6s;

	.HoverTextEffect__fake {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;

		color: transparent;

		opacity: 0;
		background: radial-gradient(var(--hover-color) 0%, transparent 80%);
		background-repeat: no-repeat;
		background-position: calc(var(--x) - var(--hover-size) / 2) calc(var(--y) - var(--hover-size) / 2);
		background-clip: text;
		background-size: var(--hover-size) var(--hover-size);

		transition-timing-function: ease-in-out;
		transition-duration: var(--hover-duration);
		transition-property: opacity;
	}
}

	&.active .HoverTextEffect__fake {
		opacity: var(--opacity);
	}
}
</style>
