import type { StoryFn } from '@storybook/vue';
import sourcifyUserInfo from './UserInfo.vue';

export default {
	title: 'Modules/UserInfo',
	component: sourcifyUserInfo,
	parameters: {
		backgrounds: { default: '--color-background-light' },
	},
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyUserInfo,
	},
	template: '<sourcify-user-info v-bind="$props" />',
});

export const Member = Template.bind({});
Member.args = {
	firstName: 'Oscar',
	lastName: 'Wilde',
	email: 'test@sourcify.io',
};

export const Current = Template.bind({});
Current.args = {
	firstName: 'Ham',
	lastName: 'Sam',
	email: 'test@sourcify.io',
	isCurrentUser: true,
};

export const Invited = Template.bind({});
Invited.args = {
	email: 'test@sourcify.io',
	isPendingUser: true,
};
