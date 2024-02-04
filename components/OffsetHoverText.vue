<template>
	<div class="OffsetHoverText">
		<div
			v-for="container in 2"
			:key="container"
			class="OffsetHoverText__container"
		>
			<span
				v-for="(letter, index) in value"
				:key="letter"
				:style="{ '--i': index }"
				class="OffsetHoverText__letter"
				v-html="letter.trim() === '' ? '&nbsp;' : letter"
			></span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: String,
			default: '',
		},
	},
};
</script>

<style lang="scss">
.OffsetHoverText {
	overflow: hidden;
	--offset-letters-color: #C93D4B;
	--offset-duration: 0.6s;
	--offset-letter-delay: 0.03s;
	--offset-easing: cubic-bezier(0.76, 0, 0.24, 1);
	cursor: pointer;
	height: 1em;
	width: max-content;

	&__container {
		&:last-child {
			color: var(--offset-letters-color);
		}
	}

	&:hover {
		.OffsetHoverText__letter {
			translate: 0 -100%;
		}
	}

	&__letter {
		display: inline-block;
		transition-timing-function: var(--offset-easing);
		transition-duration: var(--offset-duration);
		transition-property: translate;
		transition-delay: calc(var(--i) * var(--offset-letter-delay));
	}
}
</style>
