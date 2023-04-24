import type { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'sourcify-workflow';

export class HttpHeaderAuth implements ICredentialType {
	name = 'httpHeaderAuth';

	displayName = 'Header Auth';

	documentationUrl = 'httpRequest';

	genericAuth = true;

	icon = 'node:sourcify-nodes-base.httpRequest';

	properties: INodeProperties[] = [
		{
			displayName: 'Name',
			name: 'name',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Value',
			name: 'value',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'={{$credentials.name}}': '={{$credentials.value}}',
			},
		},
	};
}
