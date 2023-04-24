import type { EventMessageAudit } from './EventMessageAudit';
import type { EventMessageGeneric } from './EventMessageGeneric';
import type { EventMessageNode } from './EventMessageNode';
import type { EventMessageWorkflow } from './EventMessageWorkflow';

export const eventNamesWorkflow = [
	'sourcify.workflow.started',
	'sourcify.workflow.success',
	'sourcify.workflow.failed',
	'sourcify.workflow.crashed',
] as const;
export const eventNamesNode = ['sourcify.node.started', 'sourcify.node.finished'] as const;
export const eventNamesAudit = [
	'sourcify.audit.user.signedup',
	'sourcify.audit.user.updated',
	'sourcify.audit.user.deleted',
	'sourcify.audit.user.invited',
	'sourcify.audit.user.invitation.accepted',
	'sourcify.audit.user.reinvited',
	'sourcify.audit.user.email.failed',
	'sourcify.audit.user.reset.requested',
	'sourcify.audit.user.reset',
	'sourcify.audit.user.credentials.created',
	'sourcify.audit.user.credentials.shared',
	'sourcify.audit.user.api.created',
	'sourcify.audit.user.api.deleted',
	'sourcify.audit.package.installed',
	'sourcify.audit.package.updated',
	'sourcify.audit.package.deleted',
	'sourcify.audit.workflow.created',
	'sourcify.audit.workflow.deleted',
	'sourcify.audit.workflow.updated',
] as const;

export type EventNamesWorkflowType = (typeof eventNamesWorkflow)[number];
export type EventNamesAuditType = (typeof eventNamesAudit)[number];
export type EventNamesNodeType = (typeof eventNamesNode)[number];

export type EventNamesTypes =
	| EventNamesAuditType
	| EventNamesWorkflowType
	| EventNamesNodeType
	| 'sourcify.destination.test';

export const eventNamesAll = [...eventNamesAudit, ...eventNamesWorkflow, ...eventNamesNode];

export type EventMessageTypes =
	| EventMessageGeneric
	| EventMessageWorkflow
	| EventMessageAudit
	| EventMessageNode;

export interface FailedEventSummary {
	lastNodeExecuted: string;
	executionId: string;
	name: string;
	event: string;
	timestamp: string;
}
