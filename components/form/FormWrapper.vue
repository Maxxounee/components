<template>
	<div
		class="FormWrapper"
		:class="{ active }"
	>
		<slot></slot>
		<!-- test -->
		<div v-html="agreeActive"></div>
		<div v-html="formValue"></div>
	</div>
</template>

<script>
/* eslint-disable */
export default {
	props: {
		type: {
			type: String,
			default: 'callback',
		},
		additional: {
			type: Object,
			default: () => ({}),
		},
	},
	data() {
		return {
			active: false,
			formValue: {},
			agreeActive: true,
		};
	},
	computed: {},
	watch: {
		formValue: {
			handler(data) {
				this.formValueHandler(data);
			},
			deep: true,
		},
		agreeActive() {
			this.formValueHandler(this.formValue);
		},
	},
	mounted() {
	},
	methods: {
		send() {
			this.$elog('send');
		},
		formValueHandler(data) {
			let available = this.agreeActive;
			for (const key in data) {
				if (!available) break;
				available = !data[key].required || (data[key].required && (data[key].completelyFilled ?? false));
			}
			this.active = available;
		},
		setNewField(name, required = false) {
			this.$set(this.formValue, name, {
				value: '',
				required,
			});
		},
		setAgreeState(boolean) {
			this.agreeActive = boolean;
		},
		setFormValue({ name, value, completelyFilled }) {
			this.$set(this.formValue, name, {
				...this.formValue[name],
				value,
				completelyFilled,
			});
		},
	},
};
</script>

<style lang="scss">
/* stylelint-disable */
.FormWrapper {
	&.active {
		background-color: #ffeb3b;
	}
}
</style>
