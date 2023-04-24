import type { ICredentialType, INodeProperties } from 'sourcify-workflow';

export class Msg91Api implements ICredentialType {
	name = 'msg91Api';

	displayName = 'Msg91 Api';

	documentationUrl = 'msg91';

	properties: INodeProperties[] = [
		// User authentication key
		{
			displayName: 'Authentication Key',
			name: 'authkey',
			type: 'string',
			default: '',
		},
	];
}