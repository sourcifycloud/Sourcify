/* eslint-disable sourcify-nodes-base/node-filename-against-convention */
import type { IExecuteFunctions } from 'sourcify-core';

import type {
	INodeExecutionData,
	INodeType,
	INodeTypeBaseDescription,
	INodeTypeDescription,
} from 'sourcify-workflow';

import { loadOptions, listSearch } from './methods';
import { versionDescription } from './actions/versionDescription';
import { router } from './actions/router';

export class GoogleBigQueryV2 implements INodeType {
	description: INodeTypeDescription;

	constructor(baseDescription: INodeTypeBaseDescription) {
		this.description = {
			...baseDescription,
			...versionDescription,
		};
	}

	methods = { loadOptions, listSearch };

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		return router.call(this);
	}
}
