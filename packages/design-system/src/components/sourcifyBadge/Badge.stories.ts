import type { StoryFn } from '@storybook/vue';
import sourcifyBadge from './Badge.vue';

export default {
	title: 'Atoms/Badge',
	component: sourcifyBadge,
	argTypes: {
		theme: {
			type: 'text',
			options: ['default', 'primary', 'secondary', 'tertiary'],
		},
		size: {
			type: 'select',
			options: ['small', 'medium', 'large'],
		},
	},
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyBadge,
	},
	template: '<sourcify-badge v-bind="$props">Badge</sourcify-badge>',
});

export const Badge = Template.bind({});
Badge.args = {};
