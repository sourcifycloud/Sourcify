import 'tsconfig-paths/register';
import { DataSource as Connection } from 'typeorm';
import config from '@/config';
import { getBootstrapDBOptions } from './integration/shared/testDb';

export default async () => {
	const dbType = config.getEnv('database.type').replace(/db$/, '');
	if (dbType !== 'postgres' && dbType !== 'mysql') return;

	const connection = new Connection(getBootstrapDBOptions(dbType));
	await connection.initialize();

	const query =
		dbType === 'postgres' ? 'SELECT datname as "Database" FROM pg_database' : 'SHOW DATABASES';
	const results: { Database: string }[] = await connection.query(query);
	const databases = results
		.filter(
			({ Database: dbName }) => dbName.startsWith(`${dbType}_`) && dbName.endsWith('_sourcify_test'),
		)
		.map(({ Database: dbName }) => dbName);

	const promises = databases.map((dbName) => connection.query(`DROP DATABASE ${dbName};`));
	await Promise.all(promises);
	await connection.destroy();
};
