import type { IUser } from 'sourcify-workflow';
import type { ICredentialsDb } from '@/Interfaces';

export interface CredentialWithSharings extends ICredentialsDb {
	ownedBy?: IUser | null;
	sharedWith?: IUser[];
}
