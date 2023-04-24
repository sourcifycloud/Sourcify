/* eslint-disable sourcify-nodes-base/node-filename-against-convention */
import type { IExecuteFunctions } from 'sourcify-core';
import type {
	INodeExecutionData,
	INodeType,
	INodeTypeBaseDescription,
	INodeTypeDescription,
} from 'sourcify-workflow';
import { router } from './actions/router';

import { versionDescription } from './actions/versionDescription';
import { credentialTest, listSearch, loadOptions } from './methods';

export class PostgresV2 implements INodeType {
	description: INodeTypeDescription;

	constructor(baseDescription: INodeTypeBaseDescription) {
		this.description = {
			...baseDescription,
			...versionDescription,
		};
	}

	methods = { credentialTest, listSearch, loadOptions };

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		return router.call(this);
	}
}
