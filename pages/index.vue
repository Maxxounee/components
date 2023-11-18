<template>
	<div class="index">
		<FormWrapper>
			<FormInput
				name="tel"
				input-type="tel"
				mask="phone"
				placeholder="Телефон"
				initial-value="+7 ("
			/>
			<FormInput
				name="email"
				type="input"
				input-type="email"
				required
				placeholder="Email"
			/>
			<FormInput
				name="text"
				input-type="text"
				required
				placeholder="Введите текст..."
			/>
			<FormInput element-type="agree">
				Отправляя форму блабла
			</FormInput>
			<FormInput element-type="send">
				<StandardButton />
			</FormInput>
		</FormWrapper>
	</div>
</template>

<script>
import initialMixins from '@/mixins/initialMixins';

export default {
	mixins: [initialMixins({ layout: 'default2' })],
	data() {
		return {
			fields: [
				{
					type: 'input',
				},
			],
		};
	},
};
</script>
