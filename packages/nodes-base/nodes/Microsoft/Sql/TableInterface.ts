import type { IDataObject } from 'sourcify-workflow';

export interface ITables {
	[key: string]: {
		[key: string]: IDataObject[];
	};
}
