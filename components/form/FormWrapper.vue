<template>
	<div class="FormWrapper">
		<slot></slot>
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
		fields: {
			type: Array,
			default: () => ([]),
		},
		type: {
			type: String,
			default: 'callback',
		},
		agree: {
			type: String,
			default: null,
		},
		additional: {
			type: Object,
			default: () => ({}),
		},
		sendDisabled: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			formValue: {},
		};
	},
	computed: {},
	mounted() {
	},
	methods: {
		setFormValue(name, data) {
			this.formValue[name] = data;
			console.log(this.formValue);
		},
		parent() {
			this.$elog('parent');
		},
	},
};
</script>

<style lang="scss">
/* stylelint-disable */
.FormWrapper {
}
</style>
