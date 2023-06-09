import type { ICredentialType, INodeProperties } from 'sourcify-workflow';

export class VeroApi implements ICredentialType {
	name = 'veroApi';

	displayName = 'Vero API';

	documentationUrl = 'vero';

	properties: INodeProperties[] = [
		{
			displayName: 'Auth Token',
			name: 'authToken',
			type: 'string',
			default: '',
		},
	];
}
