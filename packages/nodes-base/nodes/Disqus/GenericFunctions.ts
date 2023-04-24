import type { OptionsWithUri } from 'request';
import type {
	IDataObject,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	JsonObject,
} from 'sourcify-workflow';
import { NodeApiError } from 'sourcify-workflow';

export async function disqusApiRequest(
	this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	method: string,
	qs: IDataObject = {},
	uri?: string,
	body: IDataObject = {},
	option: IDataObject = {},
): Promise<any> {
	const credentials = (await this.getCredentials('disqusApi')) as IDataObject;
	qs.api_key = credentials.accessToken;

	// Convert to query string into a format the API can read
	const queryStringElements: string[] = [];
	for (const key of Object.keys(qs)) {
		if (Array.isArray(qs[key])) {
			(qs[key] as string[]).forEach((value) => {
				queryStringElements.push(`${key}=${value}`);
			});
		} else {
			queryStringElements.push(`${key}=${qs[key]}`);
		}
	}

	let options: OptionsWithUri = {
		method,
		body,
		uri: `https://disqus.com/api/3.0/${uri}?${queryStringElements.join('&')}`,
		json: true,
	};

	options = Object.assign({}, options, option);
	if (Object.keys(options.body as IDataObject).length === 0) {
		delete options.body;
	}
	try {
		return await this.helpers.request(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Make an API request to paginated flow endpoint
 * and return all results
 */
export async function disqusApiRequestAllItems(
	this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	method: string,
	qs: IDataObject = {},
	uri?: string,
	body: IDataObject = {},
	option: IDataObject = {},
): Promise<any> {
	const returnData: IDataObject[] = [];

	let responseData;

	try {
		do {
			responseData = await disqusApiRequest.call(this, method, qs, uri, body, option);
			qs.cursor = responseData.cursor.id;
			returnData.push.apply(returnData, responseData.response as IDataObject[]);
		} while (responseData.cursor.more === true && responseData.cursor.hasNext === true);
		return returnData;
	} catch (error) {
		throw error;
	}
}
