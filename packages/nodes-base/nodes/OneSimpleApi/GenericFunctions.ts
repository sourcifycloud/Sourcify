import type { OptionsWithUri } from 'request';

import type { IExecuteFunctions, IDataObject, JsonObject } from 'sourcify-workflow';
import { NodeApiError } from 'sourcify-workflow';

export async function oneSimpleApiRequest(
	this: IExecuteFunctions,
	method: string,
	resource: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	uri?: string,
	option: IDataObject = {},
) {
	const credentials = await this.getCredentials('oneSimpleApi');

	const outputFormat = 'json';
	let options: OptionsWithUri = {
		method,
		body,
		qs,
		uri:
			uri ||
			`https://onesimpleapi.com/api${resource}?token=${credentials.apiToken}&output=${outputFormat}`,
		json: true,
	};
	options = Object.assign({}, options, option);

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	try {
		const responseData = await this.helpers.request(options);
		return responseData;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}
