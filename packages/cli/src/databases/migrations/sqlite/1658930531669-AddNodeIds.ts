import { INode } from 'sourcify-workflow';
import { MigrationInterface, QueryRunner } from 'typeorm';
import config from '@/config';
import { logMigrationEnd, logMigrationStart } from '@db/utils/migrationHelpers';
import { runInBatches } from '@db/utils/migrationHelpers';
import { v4 as uuid } from 'uuid';

// add node ids in workflow objects

export class AddNodeIds1658930531669 implements MigrationInterface {
	name = 'AddNodeIds1658930531669';

	public async up(queryRunner: QueryRunner): Promise<void> {
		logMigrationStart(this.name);

		const tablePrefix = config.getEnv('database.tablePrefix');

		const workflowsQuery = `
			SELECT id, nodes
			FROM "${tablePrefix}workflow_entity"
		`;

		// @ts-ignore
		await runInBatches(queryRunner, workflowsQuery, (workflows) => {
			workflows.forEach(async (workflow) => {
				const nodes = JSON.parse(workflow.nodes);
				nodes.forEach((node: INode) => {
					if (!node.id) {
						node.id = uuid();
					}
				});

				const [updateQuery, updateParams] = queryRunner.connection.driver.escapeQueryWithParameters(
					`
							UPDATE "${tablePrefix}workflow_entity"
							SET nodes = :nodes
							WHERE id = '${workflow.id}'
						`,
					{ nodes: JSON.stringify(nodes) },
					{},
				);

				queryRunner.query(updateQuery, updateParams);
			});
		});

		logMigrationEnd(this.name);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const tablePrefix = config.getEnv('database.tablePrefix');

		const workflowsQuery = `
			SELECT id, nodes
			FROM "${tablePrefix}workflow_entity"
		`;

		// @ts-ignore
		await runInBatches(queryRunner, workflowsQuery, (workflows) => {
			workflows.forEach(async (workflow) => {
				const nodes = JSON.parse(workflow.nodes);
				// @ts-ignore
				nodes.forEach((node) => delete node.id);

				const [updateQuery, updateParams] = queryRunner.connection.driver.escapeQueryWithParameters(
					`
							UPDATE "${tablePrefix}workflow_entity"
							SET nodes = :nodes
							WHERE id = '${workflow.id}'
						`,
					{ nodes: JSON.stringify(nodes) },
					{},
				);

				queryRunner.query(updateQuery, updateParams);
			});
		});
	}
}
