import type { IDataObject } from 'sourcify-workflow';

export type LoaderGetResponse = {
	data: Array<{
		id: string;
		name: string;
	}>;
} & IDataObject;

export type Option = {
	value: string;
	name: string;
};
