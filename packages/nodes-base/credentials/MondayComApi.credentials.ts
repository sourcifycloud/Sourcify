import type { ICredentialType, INodeProperties } from 'sourcify-workflow';

export class MondayComApi implements ICredentialType {
	name = 'mondayComApi';

	displayName = 'Monday.com API';

	documentationUrl = 'mondayCom';

	properties: INodeProperties[] = [
		{
			displayName: 'Token V2',
			name: 'apiToken',
			type: 'string',
			default: '',
		},
	];
}
