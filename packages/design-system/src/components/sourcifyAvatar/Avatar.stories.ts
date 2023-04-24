import type { StoryFn } from '@storybook/vue';
import sourcifyAvatar from './Avatar.vue';

export default {
	title: 'Atoms/Avatar',
	component: sourcifyAvatar,
	argTypes: {
		size: {
			type: 'select',
			options: ['small', 'medium', 'large'],
		},
	},
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyAvatar,
	},
	template: '<sourcify-avatar v-bind="$props" />',
});

export const Avatar = Template.bind({});
Avatar.args = {
	name: 'Sunny Side',
};
