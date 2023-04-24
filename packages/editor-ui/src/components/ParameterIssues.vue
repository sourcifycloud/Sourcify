<template>
	<div :class="$style['parameter-issues']" v-if="issues.length">
		<sourcify-tooltip placement="top">
			<template #content>
				<titled-list :title="`${$locale.baseText('parameterInput.issues')}:`" :items="issues" />
			</template>
			<font-awesome-icon icon="exclamation-triangle" />
		</sourcify-tooltip>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import TitledList from '@/components/TitledList.vue';

export default Vue.extend({
	name: 'ParameterIssues',
	components: {
		TitledList,
	},
	props: ['issues'],
});
</script>

<style module lang="scss">
.parameter-issues {
	width: 20px;
	text-align: right;
	float: right;
	color: #ff8080;
	font-size: var(--font-size-s);
	padding-left: var(--spacing-4xs);
}
</style>
