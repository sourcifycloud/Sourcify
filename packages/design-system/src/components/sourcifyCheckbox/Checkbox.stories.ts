import sourcifyCheckbox from './Checkbox.vue';
import type { StoryFn } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Atoms/Checkbox',
	component: sourcifyCheckbox,
};

const methods = {
	onInput: action('input'),
	onFocus: action('focus'),
	onChange: action('change'),
};

const DefaultTemplate: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyCheckbox,
	},
	data: () => ({
		isChecked: false,
	}),
	template: '<sourcify-checkbox v-model="isChecked" v-bind="$props" @input="onInput"></sourcify-checkbox>',
	methods,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
	label: 'This is a default checkbox',
	tooltipText: 'Checkbox tooltip',
	disabled: false,
	indeterminate: false,
	size: 'small',
};
