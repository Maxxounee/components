<template>
	<div class="index">
		{{ value }}
		<FormWrapper>
			<FormInput
				name="phone"
				input-type="tel"
				mask="phone"
				placeholder="Телефон"
				initial-value="+7 ("
				required
				@update="(newValue) => value = newValue"
			/>
			<FormInput
				name="password"
				input-type="password"
				placeholder="password"
			/>
			<FormInput
				name="email"
				input-type="email"
				placeholder="email"
			/>
			<FormText
				name="message"
				placeholder="Your text"
				minimal-length-required="10"
			/>
			<FormAgree />
			<FormSend>
				<StandardButton value="отправить" />
			</FormSend>
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
			fields: [
				{
					type: 'input',
				},
			],
		};
	},
};
</script>
