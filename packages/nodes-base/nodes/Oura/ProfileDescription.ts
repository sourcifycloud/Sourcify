import type { INodeProperties } from 'sourcify-workflow';

export const profileOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['profile'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: "Get the user's personal information",
				action: 'Get a profile',
			},
		],
		default: 'get',
	},
];
