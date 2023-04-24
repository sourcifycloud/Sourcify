import { ICredentialsResponse, IRestApiContext, IShareCredentialsPayload } from '@/Interface';
import { makeRestApiRequest } from '@/utils';
import { IDataObject } from 'sourcify-workflow';

export async function setCredentialSharedWith(
	context: IRestApiContext,
	id: string,
	data: IShareCredentialsPayload,
): Promise<ICredentialsResponse> {
	return makeRestApiRequest(
		context,
		'PUT',
		`/credentials/${id}/share`,
		data as unknown as IDataObject,
	);
}
