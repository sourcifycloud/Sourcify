import type { StoryFn } from '@storybook/vue';
import sourcifyIcon from './Icon.vue';

export default {
	title: 'Atoms/Icon',
	component: sourcifyIcon,
	argTypes: {
		icon: {
			control: 'text',
		},
		size: {
			control: {
				type: 'select',
				options: ['xsmall', 'small', 'medium', 'large'],
			},
		},
		spin: {
			control: {
				type: 'boolean',
			},
		},
	},
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyIcon,
	},
	template: '<sourcify-icon v-bind="$props" />',
});

export const Clock = Template.bind({});
Clock.args = {
	icon: 'clock',
};

export const Plus = Template.bind({});
Plus.args = {
	icon: 'plus',
};

export const Stop = Template.bind({});
Stop.args = {
	icon: 'stop',
};
