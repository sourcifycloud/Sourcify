import sourcifyActionToggle from './ActionToggle.vue';
import { action } from '@storybook/addon-actions';
import type { StoryFn } from '@storybook/vue';

export default {
	title: 'Atoms/ActionToggle',
	component: sourcifyActionToggle,
	argTypes: {
		placement: {
			type: 'select',
			options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-end'],
		},
		size: {
			type: 'select',
			options: ['mini', 'small', 'medium'],
		},
	},
	parameters: {
		backgrounds: { default: '--color-background-light' },
	},
};

const methods = {
	onAction: action('action'),
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyActionToggle,
	},
	template:
		'<div style="height:300px;width:300px;display:flex;align-items:center;justify-content:center"><sourcify-action-toggle v-bind="$props" @action="onAction" /></div>',
	methods,
});

export const ActionToggle = Template.bind({});
ActionToggle.args = {
	actions: [
		{
			label: 'Go',
			value: 'go',
		},
		{
			label: 'Stop',
			value: 'stop',
		},
	],
};
