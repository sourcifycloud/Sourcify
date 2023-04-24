import type { ICredentialType, INodeProperties } from 'sourcify-workflow';

export class BannerbearApi implements ICredentialType {
	name = 'bannerbearApi';

	displayName = 'Bannerbear API';

	documentationUrl = 'bannerbear';

	properties: INodeProperties[] = [
		{
			displayName: 'Project API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
}
