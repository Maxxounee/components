<template>
	<div class="magnetic-dom">
		<MagneticElement>
			<StandardButton />
		</MagneticElement>
	</div>
</template>

<script>
/* eslint-disable */
export default {
	props: {},
	data() {
		return {};
	},
	mounted() {
		window.addEventListener('mousemove', (event) => {
			this.$nuxt.$emit('mouseTrail', event);
		});
	},
	methods: {},
};
</script>

<style
	lang="scss"
	scoped
>
.magnetic-dom {
	.MagneticElement {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
	}
}
</style>
