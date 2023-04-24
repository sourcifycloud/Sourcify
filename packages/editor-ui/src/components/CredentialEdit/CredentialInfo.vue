<template>
	<div :class="$style.container">
		<el-row>
			<el-col :span="8" :class="$style.accessLabel">
				<sourcify-text :compact="true" :bold="true">
					{{ $locale.baseText('credentialEdit.credentialInfo.allowUseBy') }}
				</sourcify-text>
			</el-col>
			<el-col :span="16">
				<div v-for="node in nodesWithAccess" :key="node.name" :class="$style.valueLabel">
					<el-checkbox
						v-if="credentialPermissions.updateNodeAccess"
						:label="
							$locale.headerText({
								key: `headers.${shortNodeType(node)}.displayName`,
								fallback: node.displayName,
							})
						"
						:value="!!nodeAccess[node.name]"
						@change="(val) => onNodeAccessChange(node.name, val)"
					/>
					<sourcify-text v-else>
						{{
							$locale.headerText({
								key: `headers.${shortNodeType(node)}.displayName`,
								fallback: node.displayName,
							})
						}}
					</sourcify-text>
				</div>
			</el-col>
		</el-row>
		<el-row v-if="currentCredential">
			<el-col :span="8" :class="$style.label">
				<sourcify-text :compact="true" :bold="true">
					{{ $locale.baseText('credentialEdit.credentialInfo.created') }}
				</sourcify-text>
			</el-col>
			<el-col :span="16" :class="$style.valueLabel">
				<sourcify-text :compact="true"
					><TimeAgo :date="currentCredential.createdAt" :capitalize="true"
				/></sourcify-text>
			</el-col>
		</el-row>
		<el-row v-if="currentCredential">
			<el-col :span="8" :class="$style.label">
				<sourcify-text :compact="true" :bold="true">
					{{ $locale.baseText('credentialEdit.credentialInfo.lastModified') }}
				</sourcify-text>
			</el-col>
			<el-col :span="16" :class="$style.valueLabel">
				<sourcify-text :compact="true"
					><TimeAgo :date="currentCredential.updatedAt" :capitalize="true"
				/></sourcify-text>
			</el-col>
		</el-row>
		<el-row v-if="currentCredential">
			<el-col :span="8" :class="$style.label">
				<sourcify-text :compact="true" :bold="true">
					{{ $locale.baseText('credentialEdit.credentialInfo.id') }}
				</sourcify-text>
			</el-col>
			<el-col :span="16" :class="$style.valueLabel">
				<sourcify-text :compact="true">{{ currentCredential.id }}</sourcify-text>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

import TimeAgo from '../TimeAgo.vue';
import { INodeTypeDescription } from 'sourcify-workflow';

export default Vue.extend({
	name: 'CredentialInfo',
	props: ['nodesWithAccess', 'nodeAccess', 'currentCredential', 'credentialPermissions'],
	components: {
		TimeAgo,
	},
	methods: {
		onNodeAccessChange(name: string, value: string) {
			this.$emit('accessChange', {
				name,
				value,
			});
		},
		shortNodeType(nodeType: INodeTypeDescription) {
			return this.$locale.shortNodeType(nodeType.name);
		},
	},
});
</script>

<style lang="scss" module>
.container {
	> * {
		margin-bottom: var(--spacing-l);
	}
}

.label {
	font-weight: var(--font-weight-bold);
	max-width: 230px;
}

.accessLabel {
	composes: label;
	margin-top: var(--spacing-5xs);
}

.valueLabel {
	font-weight: var(--font-weight-regular);
}
</style>
