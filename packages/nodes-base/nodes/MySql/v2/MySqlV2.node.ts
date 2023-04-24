/* eslint-disable sourcify-nodes-base/node-filename-against-convention */
import type {
	INodeExecutionData,
	INodeType,
	INodeTypeBaseDescription,
	INodeTypeDescription,
} from 'sourcify-workflow';

import type { IExecuteFunctions } from 'sourcify-core';

import { listSearch, credentialTest, loadOptions } from './methods';

import { versionDescription } from './actions/versionDescription';

import { router } from './actions/router';

export class MySqlV2 implements INodeType {
	description: INodeTypeDescription;

	constructor(baseDescription: INodeTypeBaseDescription) {
		this.description = {
			...baseDescription,
			...versionDescription,
		};
	}

	methods = { listSearch, loadOptions, credentialTest };

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		return router.call(this);
	}
}
