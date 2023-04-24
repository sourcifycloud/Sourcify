import type { IWorkflowBase, JsonValue } from 'sourcify-workflow';

export interface AbstractEventPayload {
	[key: string]: JsonValue | IWorkflowBase | undefined;
}
