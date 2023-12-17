<template>
	<div class="index">
		<FormWrapper>
			<!-- Вариант формы через компоненты -->
			<!--<FormInput-->
			<!--	name="phone"-->
			<!--	input-type="tel"-->
			<!--	mask="phone"-->
			<!--	placeholder="Телефон"-->
			<!--	initial-value="+7 ("-->
			<!--	required-->
			<!--	@update="(newValue) => value = newValue"-->
			<!--/>-->
			<!--<FormInput-->
			<!--	name="password"-->
			<!--	input-type="password"-->
			<!--	placeholder="password"-->
			<!--/>-->
			<!--<FormInput-->
			<!--	name="email"-->
			<!--	input-type="email"-->
			<!--	placeholder="email"-->
			<!--/>-->
			<!--<FormText-->
			<!--	name="message"-->
			<!--	placeholder="Your text"-->
			<!--	minimal-length-required="10"-->
			<!--/>-->
			<!-- Вариант формы через объект в data() -->
			<Component
				:is="field.component"
				v-for="(field, index) in fields"
				:key="index"
				v-bind="field.binds"
				v-on="field.handlers"
			/>
			<FormAgree />
			<FormSend>
				<StandardButton value="отправить" />
			</FormSend>
			<template #preloader><img src="/assets/preloader.svg" /></template>
		</FormWrapper>
	</div>
</template>

<script>
import initialMixins from '@/mixins/initialMixins';

export default {
	mixins: [initialMixins({ layout: 'default' })],
	data() {
		return {
			value: 0,
			/* старая школа */
			fields: [
				{
					component: 'FormInput',
					binds: {
						fake: true,
						name: 'name',
						inputType: 'text',
						placeholder: ' ',
					},
				},
				{
					component: 'FormInput',
					binds: {
						name: 'phone',
						inputType: 'tel',
						mask: 'phone',
						placeholder: 'Телефон',
						initialValue: '+7 (',
						required: true,
					},
					handlers: {
						update: this.update,
					},
				},
				{
					component: 'FormInput',
					binds: {
						name: 'password',
						inputType: 'password',
						placeholder: 'Пароль',
					},
				},
				{
					component: 'FormInput',
					binds: {
						name: 'email',
						inputType: 'email',
						placeholder: 'Почта',
					},
				},
				{
					component: 'FormText',
					binds: {
						name: 'message',
						minimalLengthRequired: 0,
						placeholder: 'Ваш текст',
					},
				},
			],
		};
	},
	methods: {
		update(value) {
			this.value = value;
		},
	},
};
</script>
<style lang="scss">
.index {
	.FormWrapper {
		&__form {
			display: flex;
			flex-direction: column;
			row-gap: 20px;
			align-items: center;

			padding: 20px 100px;
		}

		.FormSend {
			pointer-events: none;
			opacity: 0.4;
		}

		&.available {
			.FormSend {
				pointer-events: auto;
				opacity: 1;
			}
		}
	}

	.FormInput {
		padding-bottom: 10px;
		border-bottom: 1px solid #2d001e;
	}

	.FormText {
		padding: 10px 4px;
		border: 1px solid #2d001e;
		border-radius: 4px;
	}

	.FormAgree {
		display: flex;
		column-gap: 4px;
		align-items: center;
		white-space: nowrap;
	}
}
</style>
