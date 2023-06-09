import { MigrationInterface, QueryRunner } from 'typeorm';
import { getTablePrefix, logMigrationEnd, logMigrationStart } from '@db/utils/migrationHelpers';
import { NodeTypes } from '@/NodeTypes';
import { IConnections, INode } from 'sourcify-workflow';
import { getLogger } from '@/Logger';
import { Container } from 'typedi';

export class PurgeInvalidWorkflowConnections1675940580449 implements MigrationInterface {
	name = 'PurgeInvalidWorkflowConnections1675940580449';

	async up(queryRunner: QueryRunner): Promise<void> {
		logMigrationStart(this.name);

		const tablePrefix = getTablePrefix();

		const workflows: Array<{
			id: number;
			nodes: INode[] | string;
			connections: IConnections | string;
		}> = await queryRunner.query(`
			SELECT id, nodes, connections
			FROM \`${tablePrefix}workflow_entity\`
		`);

		const nodeTypes = Container.get(NodeTypes);

		workflows.forEach(async (workflow) => {
			let connections: IConnections =
				typeof workflow.connections === 'string'
					? JSON.parse(workflow.connections)
					: workflow.connections;
			const nodes: INode[] =
				typeof workflow.nodes === 'string' ? JSON.parse(workflow.nodes) : workflow.nodes;

			const nodesThatCannotReceiveInput: string[] = nodes.reduce((acc, node) => {
				try {
					const nodeType = nodeTypes.getByNameAndVersion(node.type, node.typeVersion);
					if ((nodeType.description.inputs?.length ?? []) === 0) {
						acc.push(node.name);
					}
				} catch (error) {
					getLogger().warn(`Migration ${this.name} failed with error: ${error.message}`);
				}
				return acc;
			}, [] as string[]);

			Object.keys(connections).forEach((sourceNodeName) => {
				const connection = connections[sourceNodeName];
				const outputs = Object.keys(connection);

				outputs.forEach((outputConnectionName /* Like `main` */, idx) => {
					const outputConnection = connection[outputConnectionName];

					// It filters out all connections that are connected to a node that cannot receive input
					outputConnection.forEach((outputConnectionItem, outputConnectionItemIdx) => {
						outputConnection[outputConnectionItemIdx] = outputConnectionItem.filter(
							(outgoingConnections) =>
								!nodesThatCannotReceiveInput.includes(outgoingConnections.node),
						);
					});
				});
			});

			// Update database with new connections
			const [updateQuery, updateParams] = queryRunner.connection.driver.escapeQueryWithParameters(
				`
							UPDATE \`${tablePrefix}workflow_entity\`
							SET connections = :connections
							WHERE id = '${workflow.id}'
						`,
				{ connections: JSON.stringify(connections) },
				{},
			);

			await queryRunner.query(updateQuery, updateParams);
		});

		logMigrationEnd(this.name);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		// No need to revert this migration
	}
}
