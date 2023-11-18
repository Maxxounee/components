<template>
	<div class="FormInput">
		<TheMask
			v-if="mask"
			ref="TheMask"
			v-model="value"
			:mask="maskDict[mask] ?? mask"
			masked
			:placeholder="placeholder"
			:type="type"
			@focus.native="setInitialValue($event, initialValue)"
			@blur.native="clearBlankValue($event, initialValue)"
		/>
		<div
			v-if="line"
			class="FormInput__line"
		></div>
	</div>
</template>

<script>
/* eslint-disable */
import { TheMask } from 'vue-the-mask';

export default {
	components: {
		TheMask,
	},
	props: {
		name: {
			type: String,
			required: true,
			default: '',
		},
		type: {
			type: String,
			validator(value) {
				return [
					'input',
					'textarea',
					'checkbox',
					'multiple',
				].includes(value.trim().toLowerCase());
			},
			default: 'input',
		},
		inputType: {
			type: String,
			validator(value) {
				return [
					'tel',
					'email',
					'text',
					'password',
					'url',
					'date',
				].includes(value.trim().toLowerCase());
			},
			default: 'text',
		},
		line: {
			type: Boolean,
			default: false,
		},
		mask: {
			type: String,
			default: '',
		},
		placeholder: {
			type: String,
			default: '',
		},
		initialValue: {
			type: String,
			default: '',
		},
		required: {
			type: Boolean,
			default: false,
		},
	},
	watch: {
		value(data) {
			try {
				this.$parent.setFormValue(this.name, data);
			} catch (error) {
				console.error('Parent has no \"setFormValue\" method \n\n', error);
			}
		},
	},
	data() {
		return {
			maskDict: {
				phone: '+7 (###) ###-##-##',
				phone8: '8 (###) ###-##-##',
			},
			value: '',
		};
	},
	methods: {
		/* TODO debounce */
		
		setInitialValue({ target }, value = '') {
			if (!target.value) {
				target.value = value;
				setTimeout(() => {
					target.setSelectionRange(target.value.length, target.value.length);
				}, 10);
			}
		},
		clearBlankValue({ target }, value = '') {
			if (target.value.length <= value.length) {
				target.value = '';
			}
		},
	},
};
</script>

<style lang="scss">
.FormInput {
	&__line {
		width: 100%;
		height: 1px;
	}

	/* reset */
	input,
	textarea {
		border: none;
		background: none;
		outline: none;
		padding: 0;
		border-radius: 0;
		font-family: inherit;
		font-weight: inherit;
		letter-spacing: inherit;
		box-sizing: border-box;
		width: 100%;
		color: inherit;

		&::placeholder {
			color: inherit;
			line-height: inherit;
		}
	}

	textarea {
		resize: none;
	}
}
</style>
