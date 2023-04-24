import type { StoryFn } from '@storybook/vue';
import sourcifyHeading from './Heading.vue';

export default {
	title: 'Atoms/Heading',
	component: sourcifyHeading,
	argTypes: {
		size: {
			control: {
				type: 'select',
				options: ['2xlarge', 'xlarge', 'large', 'medium', 'small'],
			},
		},
		color: {
			control: {
				type: 'select',
				options: ['primary', 'text-dark', 'text-base', 'text-light', 'text-xlight'],
			},
		},
	},
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyHeading,
	},
	template: '<sourcify-heading v-bind="$props">hello world</sourcify-heading>',
});

export const Heading = Template.bind({});
