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
export default {
	/* TODO: не забыть про возможность работы со счетчиками */
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
	emits: ['active'],
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
		active(value) {
			this.$emit('active', value);
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
				if (!available) {
					break;
				}
				available = !data[key].required || (data[key].required && (data[key].completelyFilled));
			}
			this.active = available;
		},
		setNewField(name, required = false) {
			this.$set(this.formValue, name, {
				value: '',
				completelyFilled: false,
				required,
			});
		},
		setAgreeState(boolean) {
			this.agreeActive = boolean;
		},
		setFormValue({ name, value, completelyFilled = false }) {
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
.FormWrapper {
	&.active {
		background-color: #ffeb3b;
	}
}
</style>
