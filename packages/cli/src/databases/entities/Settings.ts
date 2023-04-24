import type { IDataObject } from 'sourcify-workflow';
import { Column, Entity, PrimaryColumn } from 'typeorm';

interface ISettingsDb {
	key: string;
	value: string | boolean | IDataObject | number;
	loadOnStartup: boolean;
}

@Entity()
export class Settings implements ISettingsDb {
	@PrimaryColumn()
	key: string;

	@Column()
	value: string;

	@Column()
	loadOnStartup: boolean;
}
