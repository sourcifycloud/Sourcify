import { IRestApiContext } from '@/Interface';
import { PublicInstalledPackage } from 'sourcify-workflow';
import { get, post, makeRestApiRequest } from '@/utils';

export async function getInstalledCommunityNodes(
	context: IRestApiContext,
): Promise<PublicInstalledPackage[]> {
	const response = await get(context.baseUrl, '/nodes');
	return response.data || [];
}

export async function installNewPackage(
	context: IRestApiContext,
	name: string,
): Promise<PublicInstalledPackage> {
	return await post(context.baseUrl, '/nodes', { name });
}

export async function uninstallPackage(context: IRestApiContext, name: string): Promise<void> {
	return await makeRestApiRequest(context, 'DELETE', '/nodes', { name });
}

export async function updatePackage(
	context: IRestApiContext,
	name: string,
): Promise<PublicInstalledPackage> {
	return await makeRestApiRequest(context, 'PATCH', '/nodes', { name });
}
