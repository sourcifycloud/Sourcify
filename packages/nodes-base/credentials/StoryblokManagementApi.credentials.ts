import type { ICredentialType, INodeProperties } from 'sourcify-workflow';

export class StoryblokManagementApi implements ICredentialType {
	name = 'storyblokManagementApi';

	displayName = 'Storyblok Management API';

	documentationUrl = 'storyblok';

	properties: INodeProperties[] = [
		{
			displayName: 'Personal Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
}
