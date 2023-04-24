import Vue from 'vue';

import { WorkflowTitleStatus } from '@/Interface';

export const titleChange = Vue.extend({
	methods: {
		/**
		 * Change title of sourcify tab
		 *
		 * @param {string} workflow Name of workflow
		 * @param {WorkflowTitleStatus} status Status of workflow
		 */
		$titleSet(workflow: string, status: WorkflowTitleStatus) {
			let icon = '⚠️';
			if (status === 'EXECUTING') {
				icon = '🔄';
			} else if (status === 'IDLE') {
				icon = '▶️';
			}

			window.document.title = `sourcify - ${icon} ${workflow}`;
		},

		$titleReset() {
			document.title = 'sourcify - Workflow Automation';
		},
	},
});
