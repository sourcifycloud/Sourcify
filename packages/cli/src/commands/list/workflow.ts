import { flags } from '@oclif/command';
import type { FindOptionsWhere } from 'typeorm';
import * as Db from '@/Db';
import type { WorkflowEntity } from '@db/entities/WorkflowEntity';
import { BaseCommand } from '../BaseCommand';

export class ListWorkflowCommand extends BaseCommand {
	static description = '\nList workflows';

	static examples = [
		'$ sourcify list:workflow',
		'$ sourcify list:workflow --active=true --onlyId',
		'$ sourcify list:workflow --active=false',
	];

	static flags = {
		help: flags.help({ char: 'h' }),
		active: flags.string({
			description: 'Filters workflows by active status. Can be true or false',
		}),
		onlyId: flags.boolean({
			description: 'Outputs workflow IDs only, one per line.',
		}),
	};

	async run() {
		// eslint-disable-next-line @typescript-eslint/no-shadow
		const { flags } = this.parse(ListWorkflowCommand);

		if (flags.active !== undefined && !['true', 'false'].includes(flags.active)) {
			this.error('The --active flag has to be passed using true or false');
		}

		const findQuery: FindOptionsWhere<WorkflowEntity> = {};
		if (flags.active !== undefined) {
			findQuery.active = flags.active === 'true';
		}

		const workflows = await Db.collections.Workflow.findBy(findQuery);
		if (flags.onlyId) {
			workflows.forEach((workflow) => this.logger.info(workflow.id));
		} else {
			workflows.forEach((workflow) => this.logger.info(`${workflow.id}|${workflow.name}`));
		}
	}

	async catch(error: Error) {
		this.logger.error('\nGOT ERROR');
		this.logger.error('====================================');
		this.logger.error(error.message);
		this.logger.error(error.stack!);
	}
}