import type { INodeTypeBaseDescription, IVersionedNodeType } from 'sourcify-workflow';
import { VersionedNodeType } from 'sourcify-workflow';

import { GoogleBigQueryV1 } from './v1/GoogleBigQueryV1.node';
import { GoogleBigQueryV2 } from './v2/GoogleBigQueryV2.node';

export class GoogleBigQuery extends VersionedNodeType {
	constructor() {
		const baseDescription: INodeTypeBaseDescription = {
			displayName: 'Google BigQuery',
			name: 'googleBigQuery',
			icon: 'file:googleBigQuery.svg',
			group: ['input'],
			subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
			description: 'Consume Google BigQuery API',
			defaultVersion: 2,
		};

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			1: new GoogleBigQueryV1(baseDescription),
			2: new GoogleBigQueryV2(baseDescription),
		};

		super(nodeVersions, baseDescription);
	}
}
