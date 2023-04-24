import { IExternalHooks } from '@/Interface';
import { useWebhooksStore } from '@/stores/webhooks';
import { IDataObject } from 'sourcify-workflow';
import { Store } from 'pinia';
import Vue from 'vue';

declare global {
	interface Window {
		sourcifyExternalHooks?: Record<
			string,
			Record<string, Array<(store: Store, metadata?: IDataObject) => Promise<void>>>
		>;
	}
}

export async function runExternalHook(eventName: string, store: Store, metadata?: IDataObject) {
	if (!window.sourcifyExternalHooks) {
		return;
	}

	const [resource, operator] = eventName.split('.');

	if (window.sourcifyExternalHooks[resource]?.[operator]) {
		const hookMethods = window.sourcifyExternalHooks[resource][operator];

		for (const hookMethod of hookMethods) {
			await hookMethod(store, metadata);
		}
	}
}

export const externalHooks = Vue.extend({
	methods: {
		$externalHooks(): IExternalHooks {
			return {
				run: async (eventName: string, metadata?: IDataObject): Promise<void> => {
					await runExternalHook.call(this, eventName, useWebhooksStore(), metadata);
				},
			};
		},
	},
});
