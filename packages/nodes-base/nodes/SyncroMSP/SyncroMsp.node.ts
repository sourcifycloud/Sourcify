import type { INodeTypeBaseDescription, IVersionedNodeType } from 'sourcify-workflow';
import { VersionedNodeType } from 'sourcify-workflow';

import { SyncroMspV1 } from './v1/SyncroMspV1.node';

export class SyncroMsp extends VersionedNodeType {
	constructor() {
		const baseDescription: INodeTypeBaseDescription = {
			displayName: 'SyncroMSP',
			name: 'syncroMsp',
			// eslint-disable-next-line sourcify-nodes-base/node-class-description-icon-not-svg
			icon: 'file:syncromsp.png',
			group: ['output'],
			subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
			description: 'Manage contacts, tickets and more from Syncro MSP',
			defaultVersion: 1,
		};

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			1: new SyncroMspV1(baseDescription),
		};

		super(nodeVersions, baseDescription);
	}
}
