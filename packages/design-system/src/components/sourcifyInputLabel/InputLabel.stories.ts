import sourcifyInputLabel from './InputLabel.vue';
import sourcifyInput from '../sourcifyInput';
import type { StoryFn } from '@storybook/vue';

export default {
	title: 'Atoms/Input Label',
	component: sourcifyInputLabel,
	argTypes: {},
	parameters: {
		backgrounds: { default: '--color-background-light' },
	},
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyInputLabel,
		sourcifyInput,
	},
	template:
		'<div style="margin-top:50px"><sourcify-input-label v-bind="$props"><sourcify-input /></sourcify-input-label></div>',
});

export const InputLabel = Template.bind({});
InputLabel.args = {
	label: 'input label',
	tooltipText: 'more info...',
};
