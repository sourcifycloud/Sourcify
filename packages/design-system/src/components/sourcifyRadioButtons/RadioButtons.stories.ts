import sourcifyRadioButtons from './RadioButtons.vue';

import { action } from '@storybook/addon-actions';
import type { StoryFn } from '@storybook/vue';

export default {
	title: 'Atoms/RadioButtons',
	component: sourcifyRadioButtons,
	argTypes: {
		size: {
			type: 'select',
			options: ['small', 'medium'],
		},
	},
	parameters: {
		backgrounds: { default: '--color-background-xlight' },
	},
};

const methods = {
	onInput: action('input'),
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyRadioButtons,
	},
	template: `<sourcify-radio-buttons v-model="val" v-bind="$props" @input="onInput">
		</sourcify-radio-buttons>`,
	methods,
	data() {
		return {
			val: '',
		};
	},
});

export const Example = Template.bind({});
Example.args = {
	options: [
		{
			label: 'Test',
			value: 'test',
		},
		{
			label: 'World',
			value: 'world',
		},
		{
			label: 'Hello',
			value: 'hello',
		},
	],
};
