import type { StoryFn } from '@storybook/vue';
import sourcifySpinner from './Spinner.vue';

export default {
	title: 'Atoms/Spinner',
	component: sourcifySpinner,
	argTypes: {
		size: {
			control: {
				type: 'select',
				options: ['small', 'medium', 'large'],
			},
		},
		type: {
			control: {
				type: 'select',
				options: ['dots', 'ring'],
			},
		},
	},
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifySpinner,
	},
	template: '<sourcify-spinner v-bind="$props" />',
});

export const Spinner = Template.bind({});
