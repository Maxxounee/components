<template>
	<div class="FormWrapper">
		<slot></slot>
		<div v-html="agreeActive"></div>
		<div v-html="formValue"></div>
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
			agreeActive: true,
			regExp: {
				phoneReplace: /^(\+)|\D/g,
			},
		};
	},
	computed: {},
	mounted() {
	},
	methods: {
		send() {
			this.$elog('send');
		},
		setNewField(name, required = false) {
			this.$set(this.formValue, name, {
				value: '',
				required,
			});
		},
		setAgreeState(boolean) {
			this.agreeActive = boolean;
			this.$elog('Дороуууу');
		},
		setFormValue({ name, value, completelyFilled }) {
			this.$set(this.formValue, name, {
				...this.formValue[name],
				value,
				completelyFilled,
			});
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
