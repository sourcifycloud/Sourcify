import type { Risk } from '@/audit/types';

/**
 * Risk categories
 */

export const RISK_CATEGORIES: Risk.Category[] = [
	'credentials',
	'database',
	'nodes',
	'instance',
	'filesystem',
];

/**
 * Node types
 */

export const SQL_NODE_TYPES_WITH_QUERY_PARAMS = new Set([
	'sourcify-nodes-base.postgres',
	'sourcify-nodes-base.crateDb',
	'sourcify-nodes-base.questDb',
	'sourcify-nodes-base.timescaleDb',
]);

export const SQL_NODE_TYPES = new Set([
	...SQL_NODE_TYPES_WITH_QUERY_PARAMS,
	'sourcify-nodes-base.mySql',
	'sourcify-nodes-base.microsoftSql',
	'sourcify-nodes-base.snowflake',
]);

export const WEBHOOK_NODE_TYPE = 'sourcify-nodes-base.webhook';

export const WEBHOOK_VALIDATOR_NODE_TYPES = new Set([
	'sourcify-nodes-base.if',
	'sourcify-nodes-base.switch',
	'sourcify-nodes-base.code',
	'sourcify-nodes-base.function',
	'sourcify-nodes-base.functionItem',
]);

export const FILESYSTEM_INTERACTION_NODE_TYPES = new Set([
	'sourcify-nodes-base.readPdf',
	'sourcify-nodes-base.readBinaryFile',
	'sourcify-nodes-base.readBinaryFiles',
	'sourcify-nodes-base.spreadsheetFile',
	'sourcify-nodes-base.writeBinaryFile',
]);

export const OFFICIAL_RISKY_NODE_TYPES = new Set([
	'sourcify-nodes-base.executeCommand',
	'sourcify-nodes-base.code',
	'sourcify-nodes-base.function',
	'sourcify-nodes-base.functionItem',
	'sourcify-nodes-base.httpRequest',
	'sourcify-nodes-base.ssh',
	'sourcify-nodes-base.ftp',
]);

/**
 * Risk reports
 */

export const DATABASE_REPORT = {
	RISK: 'database',
	SECTIONS: {
		EXPRESSIONS_IN_QUERIES: 'Expressions in "Execute Query" fields in SQL nodes',
		EXPRESSIONS_IN_QUERY_PARAMS: 'Expressions in "Query Parameters" fields in SQL nodes',
		UNUSED_QUERY_PARAMS: 'Unused "Query Parameters" fields in SQL nodes',
	},
} as const;

export const CREDENTIALS_REPORT = {
	RISK: 'credentials',
	SECTIONS: {
		CREDS_NOT_IN_ANY_USE: 'Credentials not used in any workflow',
		CREDS_NOT_IN_ACTIVE_USE: 'Credentials not used in any active workflow',
		CREDS_NOT_RECENTLY_EXECUTED: 'Credentials not used in recently executed workflows',
	},
} as const;

export const FILESYSTEM_REPORT = {
	RISK: 'filesystem',
	SECTIONS: {
		FILESYSTEM_INTERACTION_NODES: 'Nodes that interact with the filesystem',
	},
} as const;

export const NODES_REPORT = {
	RISK: 'nodes',
	SECTIONS: {
		OFFICIAL_RISKY_NODES: 'Official risky nodes',
		COMMUNITY_NODES: 'Community nodes',
		CUSTOM_NODES: 'Custom nodes',
	},
} as const;

export const INSTANCE_REPORT = {
	RISK: 'instance',
	SECTIONS: {
		UNPROTECTED_WEBHOOKS: 'Unprotected webhooks in instance',
		OUTDATED_INSTANCE: 'Outdated instance',
		SECURITY_SETTINGS: 'Security settings',
	},
} as const;

/**
 * URLs
 */

export const ENV_VARS_DOCS_URL = 'https://docs.sourcify.io/reference/environment-variables.html';

export const DB_QUERY_PARAMS_DOCS_URL =
	'https://docs.sourcify.io/integrations/builtin/app-nodes/sourcify-nodes-base.postgres#use-query-parameters';

export const COMMUNITY_NODES_RISKS_URL = 'https://docs.sourcify.io/integrations/community-nodes/risks';

export const SELF_HOSTED_AUTH_DOCS_URL = 'https://docs.sourcify.io/hosting/authentication';

export const NPM_PACKAGE_URL = 'https://www.npmjs.com/package';
