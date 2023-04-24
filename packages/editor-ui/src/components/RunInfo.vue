<template>
	<sourcify-info-tip type="tooltip" theme="info-light" tooltipPlacement="right" v-if="runMetadata">
		<div>
			<sourcify-text :bold="true" size="small">{{
				$locale.baseText('runData.startTime') + ':'
			}}</sourcify-text>
			{{ runMetadata.startTime }}<br />
			<sourcify-text :bold="true" size="small">{{
				$locale.baseText('runData.executionTime') + ':'
			}}</sourcify-text>
			{{ runMetadata.executionTime }} {{ $locale.baseText('runData.ms') }}
		</div>
	</sourcify-info-tip>
</template>

<script lang="ts">
import { ITaskData } from 'sourcify-workflow';
import Vue from 'vue';

export default Vue.extend({
	props: {
		taskData: {}, // ITaskData
	},

	computed: {
		runTaskData(): ITaskData {
			return this.taskData as ITaskData;
		},
		runMetadata(): { executionTime: number; startTime: string } | null {
			if (!this.runTaskData) {
				return null;
			}
			return {
				executionTime: this.runTaskData.executionTime,
				startTime: new Date(this.runTaskData.startTime).toLocaleString(),
			};
		},
	},
});
</script>
