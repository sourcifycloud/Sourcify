<template>
	<div :class="$style.block">
		<div :class="$style.header">
			<sourcify-heading tag="h3" size="small" color="text-base">{{ title }}</sourcify-heading>
		</div>
		<div :class="$style.content">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'TemplateDetailsBlock',
	props: {
		title: {
			type: String,
		},
	},
});
</script>

<style lang="scss" module>
.block {
	padding-bottom: var(--spacing-xl);
}

.header {
	padding: 0 0 var(--spacing-4xs);
	border-bottom: var(--border-base);
}

.content {
	padding: var(--spacing-xs) 0 0;
}
</style>
