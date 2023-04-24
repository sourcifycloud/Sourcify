import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'sourcify-workflow';

export class TwakeCloudApi implements ICredentialType {
	name = 'twakeCloudApi';

	displayName = 'Twake Cloud API';

	documentationUrl = 'twake';

	properties: INodeProperties[] = [
		{
			displayName: 'Workspace Key',
			name: 'workspaceKey',
			type: 'string',
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.workspaceKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://plugins.twake.app/plugins/sourcify',
			url: '/channel',
			method: 'POST',
		},
	};
}
