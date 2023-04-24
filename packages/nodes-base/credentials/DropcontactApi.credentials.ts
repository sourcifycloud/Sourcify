import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	NodePropertyTypes,
} from 'sourcify-workflow';

export class DropcontactApi implements ICredentialType {
	name = 'dropcontactApi';

	displayName = 'Dropcontact API';

	documentationUrl = 'dropcontact';

	properties = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'user-agent': 'sourcify',
				'X-Access-Token': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.dropcontact.io',
			url: '/batch',
			method: 'POST',
			body: {
				data: [{ email: '' }],
			},
		},
	};
}
