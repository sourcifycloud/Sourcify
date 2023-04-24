import type { INodeProperties } from 'sourcify-workflow';

export const cloneFields: INodeProperties[] = [
	{
		displayName: 'Source Repository',
		name: 'sourceRepository',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['clone'],
			},
		},
		default: '',
		placeholder: 'https://github.com/sourcifycloud/sourcify',
		description: 'The URL or path of the repository to clone',
		required: true,
	},
];
