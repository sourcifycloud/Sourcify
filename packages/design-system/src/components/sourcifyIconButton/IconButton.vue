<template>
	<sourcify-button square v-bind="$props" v-on="$listeners" />
</template>

<script lang="ts">
import sourcifyButton from '../sourcifyButton';

import { defineComponent } from 'vue';

export default defineComponent({
	name: 'sourcify-icon-button',
	components: {
		sourcifyButton,
	},
	props: {
		type: {
			type: String,
			default: 'primary',
		},
		size: {
			type: String,
			default: 'medium',
		},
		loading: {
			type: Boolean,
			default: false,
		},
		outline: {
			type: Boolean,
			default: false,
		},
		text: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		active: {
			type: Boolean,
			default: false,
		},
		icon: {
			type: [String, Array],
			required: true,
		},
		float: {
			type: String,
			validator: (value: string): boolean => ['left', 'right'].includes(value),
		},
	},
});
</script>
