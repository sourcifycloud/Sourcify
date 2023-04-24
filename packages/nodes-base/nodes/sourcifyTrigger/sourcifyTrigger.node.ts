import type {
	ITriggerFunctions,
	INodeType,
	INodeTypeDescription,
	ITriggerResponse,
} from 'sourcify-workflow';

type eventType = 'Instance started' | undefined;

export class sourcifyTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'sourcify Trigger',
		name: 'sourcifyTrigger',
		icon: 'file:sourcifyTrigger.svg',
		group: ['trigger'],
		version: 1,
		description: 'Handle events and perform actions on your sourcify instance',
		eventTriggerDescription: '',
		mockManualExecution: true,
		defaults: {
			name: 'sourcify Trigger',
		},
		inputs: [],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: [],
				description:
					'Specifies under which conditions an execution should happen: <b>Instance started</b>: Triggers when this sourcify instance is started or re-started',
				options: [
					{
						name: 'Instance Started',
						value: 'init',
						description: 'Triggers when this sourcify instance is started or re-started',
					},
				],
			},
		],
	};

	async trigger(this: ITriggerFunctions): Promise<ITriggerResponse> {
		const events = this.getNodeParameter('events', []) as string[];

		const activationMode = this.getActivationMode();

		if (events.includes(activationMode)) {
			let event: eventType;
			if (activationMode === 'init') {
				event = 'Instance started';
			}
			this.emit([
				this.helpers.returnJsonArray([
					{ event, timestamp: new Date().toISOString(), workflow_id: this.getWorkflow().id },
				]),
			]);
		}

		const manualTriggerFunction = async () => {
			this.emit([
				this.helpers.returnJsonArray([
					{
						event: 'Manual execution',
						timestamp: new Date().toISOString(),
						workflow_id: this.getWorkflow().id,
					},
				]),
			]);
		};

		return {
			manualTriggerFunction,
		};
	}
}
