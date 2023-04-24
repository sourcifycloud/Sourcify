import {
	IRestApiContext,
	IsourcifyPrompts,
	IsourcifyValueSurveyData,
	IsourcifyUISettings,
	IsourcifyPromptResponse,
} from '../Interface';
import { makeRestApiRequest, get, post } from '@/utils';
import { sourcify_IO_BASE_URL, NPM_COMMUNITY_NODE_SEARCH_API_URL } from '@/constants';

export function getSettings(context: IRestApiContext): Promise<IsourcifyUISettings> {
	return makeRestApiRequest(context, 'GET', '/settings');
}

export async function getPromptsData(instanceId: string, userId: string): Promise<IsourcifyPrompts> {
	return await get(
		sourcify_IO_BASE_URL,
		'/prompts',
		{},
		{ 'sourcify-instance-id': instanceId, 'sourcify-user-id': userId },
	);
}

export async function submitContactInfo(
	instanceId: string,
	userId: string,
	email: string,
): Promise<IsourcifyPromptResponse> {
	return await post(
		sourcify_IO_BASE_URL,
		'/prompt',
		{ email },
		{ 'sourcify-instance-id': instanceId, 'sourcify-user-id': userId },
	);
}

export async function submitValueSurvey(
	instanceId: string,
	userId: string,
	params: IsourcifyValueSurveyData,
): Promise<IsourcifyPromptResponse> {
	return await post(sourcify_IO_BASE_URL, '/value-survey', params, {
		'sourcify-instance-id': instanceId,
		'sourcify-user-id': userId,
	});
}

export async function getAvailableCommunityPackageCount(): Promise<number> {
	const response = await get(
		NPM_COMMUNITY_NODE_SEARCH_API_URL,
		'search?q=keywords:sourcify-community-node-package',
	);

	return response.total || 0;
}
