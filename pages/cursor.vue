<template>
	<div class="cursor">
		<SvgCursor />
	</div>
</template>

<script>
import initialMixins from '@/mixins/initialMixins';
import SvgCursor from '@/components/SvgCursor.vue';

export default {
	mixins: [initialMixins({ layout: 'default' })],
	components: {
		SvgCursor,
	},
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
