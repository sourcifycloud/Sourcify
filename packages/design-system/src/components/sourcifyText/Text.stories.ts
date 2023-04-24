import type { StoryFn } from '@storybook/vue';
import sourcifyText from './Text.vue';

export default {
	title: 'Atoms/Text',
	component: sourcifyText,
	argTypes: {
		size: {
			control: {
				type: 'select',
				options: ['xsmall', 'small', 'medium', 'large'],
			},
		},
		color: {
			control: {
				type: 'select',
				options: [
					'primary',
					'text-dark',
					'text-base',
					'text-light',
					'text-xlight',
					'danger',
					'success',
				],
			},
		},
	},
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyText,
	},
	template: '<sourcify-text v-bind="$props">hello world</sourcify-text>',
});

export const Text = Template.bind({});
