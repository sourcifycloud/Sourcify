import { INode, IConnections } from 'sourcify-workflow';

export interface WorkflowTestData {
	description: string;
	input: {
		workflowData: {
			nodes: INode[];
			connections: IConnections;
		};
	};
	output: {
		nodeExecutionOrder?: string[];
		nodeData: {
			[key: string]: any[][];
		};
	};
}
