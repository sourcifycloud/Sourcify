<template>
	<span class="sourcify-spinner">
		<div v-if="type === 'ring'" class="lds-ring">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
		<sourcify-icon v-else icon="spinner" :size="size" spin />
	</span>
</template>

<script lang="ts">
import sourcifyIcon from '../sourcifyIcon';

import { defineComponent } from 'vue';

export default defineComponent({
	name: 'sourcify-spinner',
	components: {
		sourcifyIcon,
	},
	props: {
		size: {
			type: String,
			validator(value: string): boolean {
				return ['small', 'medium', 'large'].includes(value);
			},
		},
		type: {
			type: String,
			validator(value: string): boolean {
				return ['dots', 'ring'].includes(value);
			},
			default: 'dots',
		},
	},
});
</script>

<style lang="scss">
.lds-ring {
	display: inline-block;
	position: relative;
	width: 48px;
	height: 48px;
}
.lds-ring div {
	box-sizing: border-box;
	display: block;
	position: absolute;
	width: 48px;
	height: 48px;
	border: 4px solid var(--color-foreground-xlight);
	border-radius: 50%;
	animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	border-color: var(--color-primary) transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
	animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
	animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
	animation-delay: -0.15s;
}
@keyframes lds-ring {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
