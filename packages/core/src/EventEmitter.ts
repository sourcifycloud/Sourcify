import EventEmitter from 'events';

interface EventTypes {
	nodeFetchedData: string;
	workflowExecutionCompleted: string;
}

class sourcifyEventEmitter extends EventEmitter {
	types: EventTypes = {
		nodeFetchedData: 'nodeFetchedData',
		workflowExecutionCompleted: 'workflowExecutionCompleted',
	};
}

export const eventEmitter = new sourcifyEventEmitter();
