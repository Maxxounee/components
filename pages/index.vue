<template>
	<div class="index">
		<FormWrapper>
			<FormInput
				name="tel"
				type="input"
				input-type="tel"
				mask="phone"
				placeholder="Телефон"
				initial-value="+7 ("
			/>
			<FormInput
				name="tel"
				type="input"
				input-type="tel"
				mask="phone"
				placeholder="Телефон"
				initial-value="+7 ("
			/>
			<div class="test">
				<div class="test">
					<div class="test">
						<FormInput
							name="email"
							type="input"
							input-type="tel"
							mask="phone"
							placeholder="Телефон"
							initial-value="+7 ("
						/>
					</div>
				</div>
			</div>
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
