import type { INodeTypeBaseDescription, IVersionedNodeType } from 'sourcify-workflow';
import { VersionedNodeType } from 'sourcify-workflow';

import { MergeV1 } from './v1/MergeV1.node';
import { MergeV2 } from './v2/MergeV2.node';

export class Merge extends VersionedNodeType {
	constructor() {
		const baseDescription: INodeTypeBaseDescription = {
			displayName: 'Merge',
			name: 'merge',
			icon: 'fa:code-branch',
			group: ['transform'],
			subtitle: '={{$parameter["mode"]}}',
			description: 'Merges data of multiple streams once data from both is available',
			defaultVersion: 2,
		};

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			1: new MergeV1(baseDescription),
			2: new MergeV2(baseDescription),
		};

		super(nodeVersions, baseDescription);
	}
}
