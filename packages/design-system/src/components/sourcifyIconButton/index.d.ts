import { sourcifyComponent, sourcifyComponentSize } from '../component';
import { ButtonTheme, ButtonType } from '../sourcifyButton';

/** Icon Button Component */
export declare class sourcifyIconButton extends sourcifyComponent {
	/** Button type */
	type: ButtonType;

	/** Button title on hover */
	title: string;

	/** Button size */
	size: sourcifyComponentSize | 'xlarge';

	/** Determine whether it's loading */
	loading: boolean;

	/** Disable the button */
	disabled: boolean;

	/** Button icon, accepts an icon name of font awesome icon component */
	icon: string;

	/** Button theme */
	theme: ButtonTheme;
}
