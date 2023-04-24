/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import path from 'path';
import convict from 'convict';
import { UserSettings } from 'sourcify-core';
import { jsonParse } from 'sourcify-workflow';

convict.addFormat({
	name: 'nodes-list',
	// @ts-ignore
	validate(values: string[], { env }: { env: string }): void {
		try {
			if (!Array.isArray(values)) {
				throw new Error();
			}

			for (const value of values) {
				if (typeof value !== 'string') {
					throw new Error();
				}
			}
		} catch (error) {
			throw new TypeError(`${env} is not a valid Array of strings.`);
		}
	},
	coerce(rawValue: string): string[] {
		return jsonParse(rawValue, { errorMessage: 'nodes-list needs to be valid JSON' });
	},
});

export const schema = {
	database: {
		type: {
			doc: 'Type of database to use',
			format: ['sqlite', 'mariadb', 'mysqldb', 'postgresdb'] as const,
			default: 'sqlite',
			env: 'DB_TYPE',
		},
		tablePrefix: {
			doc: 'Prefix for table names',
			format: '*',
			default: '',
			env: 'DB_TABLE_PREFIX',
		},
		logging: {
			enabled: {
				doc: 'Typeorm logging enabled flag.',
				format: Boolean,
				default: false,
				env: 'DB_LOGGING_ENABLED',
			},
			options: {
				doc: 'Logging level options, default is "error". Possible values: query,error,schema,warn,info,log. To enable all logging, specify "all"',
				format: String,
				default: 'error',
				env: 'DB_LOGGING_OPTIONS',
			},
			maxQueryExecutionTime: {
				doc: 'Maximum number of milliseconds query should be executed before logger logs a warning. Set 0 to disable long running query warning',
				format: Number,
				default: 1000,
				env: 'DB_LOGGING_MAX_EXECUTION_TIME',
			},
		},
		postgresdb: {
			database: {
				doc: 'PostgresDB Database',
				format: String,
				default: 'sourcify',
				env: 'DB_POSTGRESDB_DATABASE',
			},
			host: {
				doc: 'PostgresDB Host',
				format: String,
				default: 'localhost',
				env: 'DB_POSTGRESDB_HOST',
			},
			password: {
				doc: 'PostgresDB Password',
				format: String,
				default: '',
				env: 'DB_POSTGRESDB_PASSWORD',
			},
			port: {
				doc: 'PostgresDB Port',
				format: Number,
				default: 5432,
				env: 'DB_POSTGRESDB_PORT',
			},
			user: {
				doc: 'PostgresDB User',
				format: String,
				default: 'root',
				env: 'DB_POSTGRESDB_USER',
			},
			schema: {
				doc: 'PostgresDB Schema',
				format: String,
				default: 'public',
				env: 'DB_POSTGRESDB_SCHEMA',
			},

			ssl: {
				ca: {
					doc: 'SSL certificate authority',
					format: String,
					default: '',
					env: 'DB_POSTGRESDB_SSL_CA',
				},
				cert: {
					doc: 'SSL certificate',
					format: String,
					default: '',
					env: 'DB_POSTGRESDB_SSL_CERT',
				},
				key: {
					doc: 'SSL key',
					format: String,
					default: '',
					env: 'DB_POSTGRESDB_SSL_KEY',
				},
				rejectUnauthorized: {
					doc: 'If unauthorized SSL connections should be rejected',
					format: 'Boolean',
					default: true,
					env: 'DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED',
				},
			},
		},
		mysqldb: {
			database: {
				doc: 'MySQL Database',
				format: String,
				default: 'sourcify',
				env: 'DB_MYSQLDB_DATABASE',
			},
			host: {
				doc: 'MySQL Host',
				format: String,
				default: 'localhost',
				env: 'DB_MYSQLDB_HOST',
			},
			password: {
				doc: 'MySQL Password',
				format: String,
				default: '',
				env: 'DB_MYSQLDB_PASSWORD',
			},
			port: {
				doc: 'MySQL Port',
				format: Number,
				default: 3306,
				env: 'DB_MYSQLDB_PORT',
			},
			user: {
				doc: 'MySQL User',
				format: String,
				default: 'root',
				env: 'DB_MYSQLDB_USER',
			},
		},
		sqlite: {
			database: {
				doc: 'SQLite Database file name',
				format: String,
				default: 'database.sqlite',
				env: 'DB_SQLITE_DATABASE',
			},
			executeVacuumOnStartup: {
				doc: 'Runs VACUUM operation on startup to rebuild the database. Reduces filesize and optimizes indexes. WARNING: This is a long running blocking operation. Will increase start-up time.',
				format: Boolean,
				default: false,
				env: 'DB_SQLITE_VACUUM_ON_STARTUP',
			},
		},
	},

	credentials: {
		overwrite: {
			data: {
				// Allows to set default values for credentials which
				// get automatically prefilled and the user does not get
				// displayed and can not change.
				// Format: { CREDENTIAL_NAME: { PARAMETER: VALUE }}
				doc: 'Overwrites for credentials',
				format: '*',
				default: '{}',
				env: 'CREDENTIALS_OVERWRITE_DATA',
			},
			endpoint: {
				doc: 'Fetch credentials from API',
				format: String,
				default: '',
				env: 'CREDENTIALS_OVERWRITE_ENDPOINT',
			},
		},
		defaultName: {
			doc: 'Default name for credentials',
			format: String,
			default: 'My credentials',
			env: 'CREDENTIALS_DEFAULT_NAME',
		},
	},

	workflows: {
		defaultName: {
			doc: 'Default name for workflow',
			format: String,
			default: 'My workflow',
			env: 'WORKFLOWS_DEFAULT_NAME',
		},
		onboardingFlowDisabled: {
			doc: 'Show onboarding flow in new workflow',
			format: 'Boolean',
			default: false,
			env: 'sourcify_ONBOARDING_FLOW_DISABLED',
		},
		callerPolicyDefaultOption: {
			doc: 'Default option for which workflows may call the current workflow',
			format: ['any', 'none', 'workflowsFromAList', 'workflowsFromSameOwner'] as const,
			default: 'workflowsFromSameOwner',
			env: 'sourcify_WORKFLOW_CALLER_POLICY_DEFAULT_OPTION',
		},
	},

	executions: {
		// By default workflows get always executed in their own process.
		// If this option gets set to "main" it will run them in the
		// main-process instead.
		process: {
			doc: 'In what process workflows should be executed',
			format: ['main', 'own'] as const,
			default: 'own',
			env: 'EXECUTIONS_PROCESS',
		},

		mode: {
			doc: 'If it should run executions directly or via queue',
			format: ['regular', 'queue'] as const,
			default: 'regular',
			env: 'EXECUTIONS_MODE',
		},

		// A Workflow times out and gets canceled after this time (seconds).
		// If the workflow is executed in the main process a soft timeout
		// is executed (takes effect after the current node finishes).
		// If a workflow is running in its own process is a soft timeout
		// tried first, before killing the process after waiting for an
		// additional fifth of the given timeout duration.
		//
		// To deactivate timeout set it to -1
		//
		// Timeout is currently not activated by default which will change
		// in a future version.
		timeout: {
			doc: 'Max run time (seconds) before stopping the workflow execution',
			format: Number,
			default: -1,
			env: 'EXECUTIONS_TIMEOUT',
		},
		maxTimeout: {
			doc: 'Max execution time (seconds) that can be set for a workflow individually',
			format: Number,
			default: 3600,
			env: 'EXECUTIONS_TIMEOUT_MAX',
		},

		// If a workflow executes all the data gets saved by default. This
		// could be a problem when a workflow gets executed a lot and processes
		// a lot of data. To not exceed the database's capacity it is possible to
		// prune the database regularly or to not save the execution at all.
		// Depending on if the execution did succeed or error a different
		// save behaviour can be set.
		saveDataOnError: {
			doc: 'What workflow execution data to save on error',
			format: ['all', 'none'] as const,
			default: 'all',
			env: 'EXECUTIONS_DATA_SAVE_ON_ERROR',
		},
		saveDataOnSuccess: {
			doc: 'What workflow execution data to save on success',
			format: ['all', 'none'] as const,
			default: 'all',
			env: 'EXECUTIONS_DATA_SAVE_ON_SUCCESS',
		},
		saveExecutionProgress: {
			doc: 'Whether or not to save progress for each node executed',
			format: 'Boolean',
			default: false,
			env: 'EXECUTIONS_DATA_SAVE_ON_PROGRESS',
		},

		// If the executions of workflows which got started via the editor
		// should be saved. By default they will not be saved as this runs
		// are normally only for testing and debugging. This setting can
		// also be overwritten on a per workflow basis in the workflow settings
		// in the editor.
		saveDataManualExecutions: {
			doc: 'Save data of executions when started manually via editor',
			format: 'Boolean',
			default: false,
			env: 'EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS',
		},

		// To not exceed the database's capacity and keep its size moderate
		// the execution data gets pruned regularly (default: 1 hour interval).
		// All saved execution data older than the max age will be deleted.
		// Pruning is currently not activated by default, which will change in
		// a future version.
		pruneData: {
			doc: 'Delete data of past executions on a rolling basis',
			format: 'Boolean',
			default: false,
			env: 'EXECUTIONS_DATA_PRUNE',
		},
		pruneDataMaxAge: {
			doc: 'How old (hours) the execution data has to be to get deleted',
			format: Number,
			default: 336,
			env: 'EXECUTIONS_DATA_MAX_AGE',
		},
		pruneDataTimeout: {
			doc: 'Timeout (seconds) after execution data has been pruned',
			format: Number,
			default: 3600,
			env: 'EXECUTIONS_DATA_PRUNE_TIMEOUT',
		},

		// Additional pruning option to delete executions if total count exceeds the configured max.
		// Deletes the oldest entries first
		// Default is 0 = No limit
		pruneDataMaxCount: {
			doc: 'Maximum number of executions to keep in DB. Default 0 = no limit',
			format: Number,
			default: 0,
			env: 'EXECUTIONS_DATA_PRUNE_MAX_COUNT',
		},
	},

	queue: {
		health: {
			active: {
				doc: 'If health checks should be enabled',
				format: 'Boolean',
				default: false,
				env: 'QUEUE_HEALTH_CHECK_ACTIVE',
			},
			port: {
				doc: 'Port to serve health check on if activated',
				format: Number,
				default: 5678,
				env: 'QUEUE_HEALTH_CHECK_PORT',
			},
		},
		bull: {
			prefix: {
				doc: 'Prefix for all queue keys',
				format: String,
				default: '',
				env: 'QUEUE_BULL_PREFIX',
			},
			redis: {
				db: {
					doc: 'Redis DB',
					format: Number,
					default: 0,
					env: 'QUEUE_BULL_REDIS_DB',
				},
				host: {
					doc: 'Redis Host',
					format: String,
					default: 'localhost',
					env: 'QUEUE_BULL_REDIS_HOST',
				},
				password: {
					doc: 'Redis Password',
					format: String,
					default: '',
					env: 'QUEUE_BULL_REDIS_PASSWORD',
				},
				port: {
					doc: 'Redis Port',
					format: Number,
					default: 6379,
					env: 'QUEUE_BULL_REDIS_PORT',
				},
				timeoutThreshold: {
					doc: 'Redis timeout threshold',
					format: Number,
					default: 10000,
					env: 'QUEUE_BULL_REDIS_TIMEOUT_THRESHOLD',
				},
				username: {
					doc: 'Redis Username (needs Redis >= 6)',
					format: String,
					default: '',
					env: 'QUEUE_BULL_REDIS_USERNAME',
				},
			},
			queueRecoveryInterval: {
				doc: 'If > 0 enables an active polling to the queue that can recover for Redis crashes. Given in seconds; 0 is disabled. May increase Redis traffic significantly.',
				format: Number,
				default: 60,
				env: 'QUEUE_RECOVERY_INTERVAL',
			},
			gracefulShutdownTimeout: {
				doc: 'How long should sourcify wait for running executions before exiting worker process',
				format: Number,
				default: 30,
				env: 'QUEUE_WORKER_TIMEOUT',
			},
		},
	},

	generic: {
		// The timezone to use. Is important for nodes like "Cron" which start the
		// workflow automatically at a specified time. This setting can also be
		// overwritten on a per workflow basis in the workflow settings in the
		// editor.
		timezone: {
			doc: 'The timezone to use',
			format: '*',
			default: 'America/New_York',
			env: 'GENERIC_TIMEZONE',
		},
	},

	// How sourcify can be reached (Editor & REST-API)
	path: {
		format: String,
		default: '/',
		arg: 'path',
		env: 'sourcify_PATH',
		doc: 'Path sourcify is deployed to',
	},
	host: {
		format: String,
		default: 'localhost',
		arg: 'host',
		env: 'sourcify_HOST',
		doc: 'Host name sourcify can be reached',
	},
	port: {
		format: Number,
		default: 5678,
		arg: 'port',
		env: 'sourcify_PORT',
		doc: 'HTTP port sourcify can be reached',
	},
	listen_address: {
		format: String,
		default: '0.0.0.0',
		env: 'sourcify_LISTEN_ADDRESS',
		doc: 'IP address sourcify should listen on',
	},
	protocol: {
		format: ['http', 'https'] as const,
		default: 'http',
		env: 'sourcify_PROTOCOL',
		doc: 'HTTP Protocol via which sourcify can be reached',
	},
	ssl_key: {
		format: String,
		default: '',
		env: 'sourcify_SSL_KEY',
		doc: 'SSL Key for HTTPS Protocol',
	},
	ssl_cert: {
		format: String,
		default: '',
		env: 'sourcify_SSL_CERT',
		doc: 'SSL Cert for HTTPS Protocol',
	},
	editorBaseUrl: {
		format: String,
		default: '',
		env: 'sourcify_EDITOR_BASE_URL',
		doc: 'Public URL where the editor is accessible. Also used for emails sent from sourcify.',
	},

	security: {
		audit: {
			daysAbandonedWorkflow: {
				doc: 'Days for a workflow to be considered abandoned if not executed',
				format: Number,
				default: 90,
				env: 'sourcify_SECURITY_AUDIT_DAYS_ABANDONED_WORKFLOW',
			},
		},
		excludeEndpoints: {
			doc: 'Additional endpoints to exclude auth checks. Multiple endpoints can be separated by colon (":")',
			format: String,
			default: '',
			env: 'sourcify_AUTH_EXCLUDE_ENDPOINTS',
		},
		basicAuth: {
			active: {
				format: 'Boolean',
				default: false,
				env: 'sourcify_BASIC_AUTH_ACTIVE',
				doc: 'If basic auth should be activated for editor and REST-API',
			},
			user: {
				format: String,
				default: '',
				env: 'sourcify_BASIC_AUTH_USER',
				doc: 'The name of the basic auth user',
			},
			password: {
				format: String,
				default: '',
				env: 'sourcify_BASIC_AUTH_PASSWORD',
				doc: 'The password of the basic auth user',
			},
			hash: {
				format: 'Boolean',
				default: false,
				env: 'sourcify_BASIC_AUTH_HASH',
				doc: 'If password for basic auth is hashed',
			},
		},
		jwtAuth: {
			active: {
				format: 'Boolean',
				default: false,
				env: 'sourcify_JWT_AUTH_ACTIVE',
				doc: 'If JWT auth should be activated for editor and REST-API',
			},
			jwtHeader: {
				format: String,
				default: '',
				env: 'sourcify_JWT_AUTH_HEADER',
				doc: 'The request header containing a signed JWT',
			},
			jwtHeaderValuePrefix: {
				format: String,
				default: '',
				env: 'sourcify_JWT_AUTH_HEADER_VALUE_PREFIX',
				doc: 'The request header value prefix to strip (optional)',
			},
			jwksUri: {
				format: String,
				default: '',
				env: 'sourcify_JWKS_URI',
				doc: 'The URI to fetch JWK Set for JWT authentication',
			},
			jwtIssuer: {
				format: String,
				default: '',
				env: 'sourcify_JWT_ISSUER',
				doc: 'JWT issuer to expect (optional)',
			},
			jwtNamespace: {
				format: String,
				default: '',
				env: 'sourcify_JWT_NAMESPACE',
				doc: 'JWT namespace to expect (optional)',
			},
			jwtAllowedTenantKey: {
				format: String,
				default: '',
				env: 'sourcify_JWT_ALLOWED_TENANT_KEY',
				doc: 'JWT tenant key name to inspect within JWT namespace (optional)',
			},
			jwtAllowedTenant: {
				format: String,
				default: '',
				env: 'sourcify_JWT_ALLOWED_TENANT',
				doc: 'JWT tenant to allow (optional)',
			},
		},
	},

	endpoints: {
		payloadSizeMax: {
			format: Number,
			default: 16,
			env: 'sourcify_PAYLOAD_SIZE_MAX',
			doc: 'Maximum payload size in MB.',
		},
		metrics: {
			enable: {
				format: 'Boolean',
				default: false,
				env: 'sourcify_METRICS',
				doc: 'Enable /metrics endpoint. Default: false',
			},
			prefix: {
				format: String,
				default: 'sourcify_',
				env: 'sourcify_METRICS_PREFIX',
				doc: 'An optional prefix for metric names. Default: sourcify_',
			},
			includeDefaultMetrics: {
				format: Boolean,
				default: true,
				env: 'sourcify_METRICS_INCLUDE_DEFAULT_METRICS',
				doc: 'Whether to expose default system and node.js metrics. Default: true',
			},
			includeWorkflowIdLabel: {
				format: Boolean,
				default: false,
				env: 'sourcify_METRICS_INCLUDE_WORKFLOW_ID_LABEL',
				doc: 'Whether to include a label for the workflow ID on workflow metrics. Default: false',
			},
			includeNodeTypeLabel: {
				format: Boolean,
				default: false,
				env: 'sourcify_METRICS_INCLUDE_NODE_TYPE_LABEL',
				doc: 'Whether to include a label for the node type on node metrics. Default: false',
			},
			includeCredentialTypeLabel: {
				format: Boolean,
				default: false,
				env: 'sourcify_METRICS_INCLUDE_CREDENTIAL_TYPE_LABEL',
				doc: 'Whether to include a label for the credential type on credential metrics. Default: false',
			},
			includeApiEndpoints: {
				format: Boolean,
				default: false,
				env: 'sourcify_METRICS_INCLUDE_API_ENDPOINTS',
				doc: 'Whether to expose metrics for API endpoints. Default: false',
			},
			includeApiPathLabel: {
				format: Boolean,
				default: false,
				env: 'sourcify_METRICS_INCLUDE_API_PATH_LABEL',
				doc: 'Whether to include a label for the path of API invocations. Default: false',
			},
			includeApiMethodLabel: {
				format: Boolean,
				default: false,
				env: 'sourcify_METRICS_INCLUDE_API_METHOD_LABEL',
				doc: 'Whether to include a label for the HTTP method (GET, POST, ...) of API invocations. Default: false',
			},
			includeApiStatusCodeLabel: {
				format: Boolean,
				default: false,
				env: 'sourcify_METRICS_INCLUDE_API_STATUS_CODE_LABEL',
				doc: 'Whether to include a label for the HTTP status code (200, 404, ...) of API invocations. Default: false',
			},
		},
		rest: {
			format: String,
			default: 'rest',
			env: 'sourcify_ENDPOINT_REST',
			doc: 'Path for rest endpoint',
		},
		webhook: {
			format: String,
			default: 'webhook',
			env: 'sourcify_ENDPOINT_WEBHOOK',
			doc: 'Path for webhook endpoint',
		},
		webhookWaiting: {
			format: String,
			default: 'webhook-waiting',
			env: 'sourcify_ENDPOINT_WEBHOOK_WAIT',
			doc: 'Path for waiting-webhook endpoint',
		},
		webhookTest: {
			format: String,
			default: 'webhook-test',
			env: 'sourcify_ENDPOINT_WEBHOOK_TEST',
			doc: 'Path for test-webhook endpoint',
		},
		disableUi: {
			format: Boolean,
			default: false,
			env: 'sourcify_DISABLE_UI',
			doc: 'Disable sourcify UI (Frontend).',
		},
		disableProductionWebhooksOnMainProcess: {
			format: Boolean,
			default: false,
			env: 'sourcify_DISABLE_PRODUCTION_MAIN_PROCESS',
			doc: 'Disable production webhooks from main process. This helps ensures no http traffic load to main process when using webhook-specific processes.',
		},
		skipWebhooksDeregistrationOnShutdown: {
			/**
			 * Longer explanation: sourcify de-registers webhooks on shutdown / deactivation
			 * and registers on startup / activation. If we skip
			 * deactivation on shutdown, webhooks will remain active on 3rd party services.
			 * We don't have to worry about startup as it always
			 * checks if webhooks already exist.
			 * If users want to upgrade sourcify, it is possible to run
			 * two instances simultaneously without downtime, similar
			 * to blue/green deployment.
			 * WARNING: Trigger nodes (like Cron) will cause duplication
			 * of work, so be aware when using.
			 */
			doc: 'Deregister webhooks on external services only when workflows are deactivated.',
			format: Boolean,
			default: false,
			env: 'sourcify_SKIP_WEBHOOK_DEREGISTRATION_SHUTDOWN',
		},
	},

	publicApi: {
		disabled: {
			format: Boolean,
			default: false,
			env: 'sourcify_PUBLIC_API_DISABLED',
			doc: 'Whether to disable the Public API',
		},
		path: {
			format: String,
			default: 'api',
			env: 'sourcify_PUBLIC_API_ENDPOINT',
			doc: 'Path for the public api endpoints',
		},
		swaggerUi: {
			disabled: {
				format: Boolean,
				default: false,
				env: 'sourcify_PUBLIC_API_SWAGGERUI_DISABLED',
				doc: 'Whether to disable the Swagger UI for the Public API',
			},
		},
	},

	workflowTagsDisabled: {
		format: Boolean,
		default: false,
		env: 'sourcify_WORKFLOW_TAGS_DISABLED',
		doc: 'Disable workflow tags.',
	},

	userManagement: {
		disabled: {
			doc: 'Disable user management and hide it completely.',
			format: Boolean,
			default: false,
			env: 'sourcify_USER_MANAGEMENT_DISABLED',
		},
		jwtSecret: {
			doc: 'Set a specific JWT secret (optional - sourcify can generate one)', // Generated @ start.ts
			format: String,
			default: '',
			env: 'sourcify_USER_MANAGEMENT_JWT_SECRET',
		},
		isInstanceOwnerSetUp: {
			// sourcify loads this setting from DB on startup
			doc: "Whether the instance owner's account has been set up",
			format: Boolean,
			default: false,
		},
		skipInstanceOwnerSetup: {
			// sourcify loads this setting from DB on startup
			doc: 'Whether to hide the prompt the first time sourcify starts with UM enabled',
			format: Boolean,
			default: false,
		},
		emails: {
			mode: {
				doc: 'How to send emails',
				format: ['', 'smtp'] as const,
				default: 'smtp',
				env: 'sourcify_EMAIL_MODE',
			},
			smtp: {
				host: {
					doc: 'SMTP server host',
					format: String, // e.g. 'smtp.gmail.com'
					default: '',
					env: 'sourcify_SMTP_HOST',
				},
				port: {
					doc: 'SMTP server port',
					format: Number,
					default: 465,
					env: 'sourcify_SMTP_PORT',
				},
				secure: {
					doc: 'Whether or not to use SSL for SMTP',
					format: Boolean,
					default: true,
					env: 'sourcify_SMTP_SSL',
				},
				auth: {
					user: {
						doc: 'SMTP login username',
						format: String, // e.g.'you@gmail.com'
						default: '',
						env: 'sourcify_SMTP_USER',
					},
					pass: {
						doc: 'SMTP login password',
						format: String,
						default: '',
						env: 'sourcify_SMTP_PASS',
					},
				},
				sender: {
					doc: 'How to display sender name',
					format: String,
					default: '',
					env: 'sourcify_SMTP_SENDER',
				},
			},
			templates: {
				invite: {
					doc: 'Overrides default HTML template for inviting new people (use full path)',
					format: String,
					default: '',
					env: 'sourcify_UM_EMAIL_TEMPLATES_INVITE',
				},
				passwordReset: {
					doc: 'Overrides default HTML template for resetting password (use full path)',
					format: String,
					default: '',
					env: 'sourcify_UM_EMAIL_TEMPLATES_PWRESET',
				},
			},
		},
		authenticationMethod: {
			doc: 'How to authenticate users (e.g. "email", "ldap", "saml")',
			format: ['email', 'ldap', 'saml'] as const,
			default: 'email',
		},
	},

	externalFrontendHooksUrls: {
		doc: 'URLs to external frontend hooks files, ; separated',
		format: String,
		default: 'https://public.sourcify.cloud/posthog-hooks.js',
		env: 'EXTERNAL_FRONTEND_HOOKS_URLS',
	},

	externalHookFiles: {
		doc: 'Files containing external hooks. Multiple files can be separated by colon (":")',
		format: String,
		default: '',
		env: 'EXTERNAL_HOOK_FILES',
	},

	nodes: {
		include: {
			doc: 'Nodes to load',
			format: 'nodes-list',
			default: undefined,
			env: 'NODES_INCLUDE',
		},
		exclude: {
			doc: 'Nodes not to load',
			format: 'nodes-list',
			default: undefined,
			env: 'NODES_EXCLUDE',
		},
		errorTriggerType: {
			doc: 'Node Type to use as Error Trigger',
			format: String,
			default: 'sourcify-nodes-base.errorTrigger',
			env: 'NODES_ERROR_TRIGGER_TYPE',
		},
		communityPackages: {
			enabled: {
				doc: 'Allows you to disable the usage of community packages for nodes',
				format: Boolean,
				default: true,
				env: 'sourcify_COMMUNITY_PACKAGES_ENABLED',
			},
		},
		packagesMissing: {
			// Used to have a persistent list of packages
			doc: 'Contains a comma separated list of packages that failed to load during startup',
			format: String,
			default: '',
		},
	},

	logs: {
		level: {
			doc: 'Log output level',
			format: ['error', 'warn', 'info', 'verbose', 'debug', 'silent'] as const,
			default: 'info',
			env: 'sourcify_LOG_LEVEL',
		},
		output: {
			doc: 'Where to output logs. Options are: console, file. Multiple can be separated by comma (",")',
			format: String,
			default: 'console',
			env: 'sourcify_LOG_OUTPUT',
		},
		file: {
			fileCountMax: {
				doc: 'Maximum number of files to keep.',
				format: Number,
				default: 100,
				env: 'sourcify_LOG_FILE_COUNT_MAX',
			},
			fileSizeMax: {
				doc: 'Maximum size for each log file in MB.',
				format: Number,
				default: 16,
				env: 'sourcify_LOG_FILE_SIZE_MAX',
			},
			location: {
				doc: 'Log file location; only used if log output is set to file.',
				format: String,
				default: path.join(UserSettings.getUsersourcifyFolderPath(), 'logs/sourcify.log'),
				env: 'sourcify_LOG_FILE_LOCATION',
			},
		},
	},

	versionNotifications: {
		enabled: {
			doc: 'Whether feature is enabled to request notifications about new versions and security updates.',
			format: Boolean,
			default: true,
			env: 'sourcify_VERSION_NOTIFICATIONS_ENABLED',
		},
		endpoint: {
			doc: 'Endpoint to retrieve version information from.',
			format: String,
			default: 'https://api.sourcify.io/api/versions/',
			env: 'sourcify_VERSION_NOTIFICATIONS_ENDPOINT',
		},
		infoUrl: {
			doc: "Url in New Versions Panel with more information on updating one's instance.",
			format: String,
			default: 'https://docs.sourcify.io/getting-started/installation/updating.html',
			env: 'sourcify_VERSION_NOTIFICATIONS_INFO_URL',
		},
	},

	templates: {
		enabled: {
			doc: 'Whether templates feature is enabled to load workflow templates.',
			format: Boolean,
			default: true,
			env: 'sourcify_TEMPLATES_ENABLED',
		},
		host: {
			doc: 'Endpoint host to retrieve workflow templates from endpoints.',
			format: String,
			default: 'https://api.sourcify.io/api/',
			env: 'sourcify_TEMPLATES_HOST',
		},
	},

	push: {
		backend: {
			format: ['sse', 'websocket'] as const,
			default: 'sse',
			env: 'sourcify_PUSH_BACKEND',
			doc: 'Backend to use for push notifications',
		},
	},

	binaryDataManager: {
		availableModes: {
			format: String,
			default: 'filesystem',
			env: 'sourcify_AVAILABLE_BINARY_DATA_MODES',
			doc: 'Available modes of binary data storage, as comma separated strings',
		},
		mode: {
			format: ['default', 'filesystem'] as const,
			default: 'default',
			env: 'sourcify_DEFAULT_BINARY_DATA_MODE',
			doc: 'Storage mode for binary data',
		},
		localStoragePath: {
			format: String,
			default: path.join(UserSettings.getUsersourcifyFolderPath(), 'binaryData'),
			env: 'sourcify_BINARY_DATA_STORAGE_PATH',
			doc: 'Path for binary data storage in "filesystem" mode',
		},
		binaryDataTTL: {
			format: Number,
			default: 60,
			env: 'sourcify_BINARY_DATA_TTL',
			doc: 'TTL for binary data of unsaved executions in minutes',
		},
		persistedBinaryDataTTL: {
			format: Number,
			default: 1440,
			env: 'sourcify_PERSISTED_BINARY_DATA_TTL',
			doc: 'TTL for persisted binary data in minutes (binary data gets deleted if not persisted before TTL expires)',
		},
	},

	deployment: {
		type: {
			format: String,
			default: 'default',
			env: 'sourcify_DEPLOYMENT_TYPE',
		},
	},

	sso: {
		justInTimeProvisioning: {
			format: Boolean,
			default: true,
			doc: 'Whether to automatically create users when they login via SSO.',
		},
		redirectLoginToSso: {
			format: Boolean,
			default: true,
			doc: 'Whether to automatically redirect users from login dialog to initialize SSO flow.',
		},
		saml: {
			loginEnabled: {
				format: Boolean,
				default: false,
				doc: 'Whether to enable SAML SSO.',
			},
			loginLabel: {
				format: String,
				default: '',
			},
		},
		ldap: {
			loginEnabled: {
				format: Boolean,
				default: false,
			},
			loginLabel: {
				format: String,
				default: '',
			},
		},
	},

	hiringBanner: {
		enabled: {
			doc: 'Whether hiring banner in browser console is enabled.',
			format: Boolean,
			default: true,
			env: 'sourcify_HIRING_BANNER_ENABLED',
		},
	},

	personalization: {
		enabled: {
			doc: 'Whether personalization is enabled.',
			format: Boolean,
			default: true,
			env: 'sourcify_PERSONALIZATION_ENABLED',
		},
	},

	userActivationSurvey: {
		enabled: {
			doc: 'Whether user activation survey is enabled.',
			format: Boolean,
			default: true,
			env: 'sourcify_USER_ACTIVATION_SURVEY_ENABLED',
		},
	},

	diagnostics: {
		enabled: {
			doc: 'Whether diagnostic mode is enabled.',
			format: Boolean,
			default: true,
			env: 'sourcify_DIAGNOSTICS_ENABLED',
		},
		config: {
			posthog: {
				apiKey: {
					doc: 'API key for PostHog',
					format: String,
					default: 'phc_4URIAm1uYfJO7j8kWSe0J8lc8IqnstRLS7Jx8NcakHo',
					env: 'sourcify_DIAGNOSTICS_POSTHOG_API_KEY',
				},
				apiHost: {
					doc: 'API host for PostHog',
					format: String,
					default: 'https://ph.sourcify.io',
					env: 'sourcify_DIAGNOSTICS_POSTHOG_API_HOST',
				},
				disableSessionRecording: {
					doc: 'Disable posthog session recording',
					format: Boolean,
					default: true,
					env: 'sourcify_DIAGNOSTICS_POSTHOG_DISABLE_RECORDING',
				},
			},
			sentry: {
				dsn: {
					doc: 'Data source name for error tracking on Sentry',
					format: String,
					default:
						'https://1f954e089a054b8e943ae4f4042b2bff@o1420875.ingest.sentry.io/4504016528408576',
					env: 'sourcify_SENTRY_DSN',
				},
			},
			frontend: {
				doc: 'Diagnostics config for frontend.',
				format: String,
				default: '1zPn9bgWPzlQc0p8Gj1uiK6DOTn;https://telemetry.sourcify.io',
				env: 'sourcify_DIAGNOSTICS_CONFIG_FRONTEND',
			},
			backend: {
				doc: 'Diagnostics config for backend.',
				format: String,
				default: '1zPn7YoGC3ZXE9zLeTKLuQCB4F6;https://telemetry.sourcify.io/v1/batch',
				env: 'sourcify_DIAGNOSTICS_CONFIG_BACKEND',
			},
		},
	},

	defaultLocale: {
		doc: 'Default locale for the UI',
		format: String,
		default: 'en',
		env: 'sourcify_DEFAULT_LOCALE',
	},

	onboardingCallPrompt: {
		enabled: {
			doc: 'Whether onboarding call prompt feature is available',
			format: Boolean,
			default: true,
			env: 'sourcify_ONBOARDING_CALL_PROMPTS_ENABLED',
		},
	},

	license: {
		serverUrl: {
			format: String,
			default: 'https://license.sourcify.io/v1',
			env: 'sourcify_LICENSE_SERVER_URL',
			doc: 'License server url to retrieve license.',
		},
		autoRenewEnabled: {
			format: Boolean,
			default: true,
			env: 'sourcify_LICENSE_AUTO_RENEW_ENABLED',
			doc: 'Whether autorenew for licenses is enabled.',
		},
		autoRenewOffset: {
			format: Number,
			default: 60 * 60 * 72, // 72 hours
			env: 'sourcify_LICENSE_AUTO_RENEW_OFFSET',
			doc: 'How many seconds before expiry a license should get automatically renewed. ',
		},
		activationKey: {
			format: String,
			default: '',
			env: 'sourcify_LICENSE_ACTIVATION_KEY',
			doc: 'Activation key to initialize license',
		},
		tenantId: {
			format: Number,
			default: 1,
			env: 'sourcify_LICENSE_TENANT_ID',
			doc: 'Tenant id used by the license manager',
		},
		cert: {
			format: String,
			default: '',
			env: 'sourcify_LICENSE_CERT',
			doc: 'Ephemeral license certificate',
		},
	},

	hideUsagePage: {
		format: Boolean,
		default: false,
		env: 'sourcify_HIDE_USAGE_PAGE',
		doc: 'Hide or show the usage page',
	},

	eventBus: {
		checkUnsentInterval: {
			doc: 'How often (in ms) to check for unsent event messages. Can in rare cases cause a message to be sent twice. 0=disabled',
			format: Number,
			default: 0,
			env: 'sourcify_EVENTBUS_CHECKUNSENTINTERVAL',
		},
		logWriter: {
			keepLogCount: {
				doc: 'How many event log files to keep.',
				format: Number,
				default: 3,
				env: 'sourcify_EVENTBUS_LOGWRITER_KEEPLOGCOUNT',
			},
			maxFileSizeInKB: {
				doc: 'Maximum size of an event log file before a new one is started.',
				format: Number,
				default: 10240, // 10MB
				env: 'sourcify_EVENTBUS_LOGWRITER_MAXFILESIZEINKB',
			},
			logBaseName: {
				doc: 'Basename of the event log file.',
				format: String,
				default: 'sourcifyEventLog',
				env: 'sourcify_EVENTBUS_LOGWRITER_LOGBASENAME',
			},
		},
	},
};
