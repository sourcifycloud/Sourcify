import type { IUser } from 'sourcify-workflow';
import type { SharedWorkflow } from '@db/entities/SharedWorkflow';
import type { WorkflowEntity } from '@db/entities/WorkflowEntity';

export interface WorkflowWithSharingsAndCredentials extends Omit<WorkflowEntity, 'shared'> {
	ownedBy?: IUser | null;
	sharedWith?: IUser[];
	usedCredentials?: CredentialUsedByWorkflow[];
	shared?: SharedWorkflow[];
}

export interface WorkflowForList
	extends Omit<WorkflowEntity, 'ownedBy' | 'nodes' | 'connections' | 'shared' | 'settings'> {
	ownedBy?: Pick<IUser, 'id'> | null;
	shared?: SharedWorkflow[];
}

export interface CredentialUsedByWorkflow {
	id: string;
	name: string;
	type?: string;
	currentUserHasAccess: boolean;
	ownedBy?: IUser | null;
	sharedWith?: IUser[];
}
