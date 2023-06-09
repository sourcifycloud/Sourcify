<template>
	<div>
		<sourcify-loading :loading="loading" :rows="5" variant="p" />

		<template-details-block v-if="!loading && template.nodes.length > 0" :title="blockTitle">
			<div :class="$style.icons">
				<div
					v-for="node in filterTemplateNodes(template.nodes)"
					:key="node.name"
					:class="$style.icon"
				>
					<NodeIcon
						:nodeType="node"
						:size="24"
						:showTooltip="true"
						@click="redirectToSearchPage(node)"
					/>
				</div>
			</div>
		</template-details-block>

		<template-details-block
			v-if="!loading && template?.categories.length > 0"
			:title="$locale.baseText('template.details.categories')"
		>
			<sourcify-tags :tags="template.categories" @click="redirectToCategory" />
		</template-details-block>

		<template-details-block v-if="!loading" :title="$locale.baseText('template.details.details')">
			<div :class="$style.text">
				<sourcify-text size="small" color="text-base">
					{{ $locale.baseText('template.details.created') }}
					<TimeAgo :date="template.createdAt" />
					<span>{{ $locale.baseText('template.details.by') }}</span>
					<span v-if="template.user"> {{ template.user.username }}</span>
					<span v-else> sourcify team</span>
				</sourcify-text>
			</div>
			<div :class="$style.text">
				<sourcify-text v-if="template.totalViews !== 0" size="small" color="text-base">
					{{ $locale.baseText('template.details.viewed') }}
					{{ abbreviateNumber(template.totalViews) }}
					{{ $locale.baseText('template.details.times') }}
				</sourcify-text>
			</div>
		</template-details-block>
	</div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue';
import TemplateDetailsBlock from '@/components/TemplateDetailsBlock.vue';
import NodeIcon from '@/components/NodeIcon.vue';
import { abbreviateNumber, filterTemplateNodes } from '@/utils';
import { ITemplatesNode, ITemplatesWorkflow, ITemplatesWorkflowFull } from '@/Interface';
import { mapStores } from 'pinia';
import { useTemplatesStore } from '@/stores/templates';
export default Vue.extend({
	name: 'TemplateDetails',
	props: {
		blockTitle: {
			type: String,
		},
		loading: {
			type: Boolean,
		},
		template: {
			type: Object as PropType<ITemplatesWorkflow | ITemplatesWorkflowFull>,
		},
	},
	components: {
		NodeIcon,
		TemplateDetailsBlock,
	},
	computed: {
		...mapStores(useTemplatesStore),
	},
	methods: {
		abbreviateNumber,
		filterTemplateNodes,
		redirectToCategory(id: string) {
			this.templatesStore.resetSessionId();
			this.$router.push(`/templates?categories=${id}`);
		},
		redirectToSearchPage(node: ITemplatesNode) {
			this.templatesStore.resetSessionId();
			this.$router.push(`/templates?search=${node.displayName}`);
		},
	},
});
</script>
<style lang="scss" module>
.icons {
	display: flex;
	flex-wrap: wrap;
}
.icon {
	margin-right: var(--spacing-xs);
	margin-bottom: var(--spacing-xs);
	cursor: pointer;
}
.text {
	padding-bottom: var(--spacing-xs);
}
</style>
