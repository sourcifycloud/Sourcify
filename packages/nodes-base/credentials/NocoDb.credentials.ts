import type { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'sourcify-workflow';

export class NocoDb implements ICredentialType {
	name = 'nocoDb';

	displayName = 'NocoDB';

	documentationUrl = 'nocoDb';

	properties: INodeProperties[] = [
		{
			displayName: 'User Token',
			name: 'apiToken',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Host',
			name: 'host',
			type: 'string',
			default: '',
			placeholder: 'http(s)://localhost:8080',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'xc-auth': '={{$credentials.apiToken}}',
			},
		},
	};
}
