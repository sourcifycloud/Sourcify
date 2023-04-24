import type { ICredentialType, INodeProperties } from 'sourcify-workflow';

export class ConvertKitApi implements ICredentialType {
	name = 'convertKitApi';

	displayName = 'ConvertKit API';

	documentationUrl = 'convertKit';

	properties: INodeProperties[] = [
		{
			displayName: 'API Secret',
			name: 'apiSecret',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
		},
	];
}
