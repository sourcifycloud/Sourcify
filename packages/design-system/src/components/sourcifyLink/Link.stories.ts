import sourcifyLink from './Link.vue';
import { action } from '@storybook/addon-actions';
import type { StoryFn } from '@storybook/vue';

export default {
	title: 'Atoms/Link',
	component: sourcifyLink,
	argTypes: {
		size: {
			control: {
				type: 'select',
				options: ['small', 'medium', 'large'],
			},
		},
	},
};

const methods = {
	onClick: action('click'),
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyLink,
	},
	template: '<sourcify-link v-bind="$props" @click="onClick">hello world</sourcify-link>',
	methods,
});

export const Link = Template.bind({});
Link.args = {
	href: 'https://sourcify.io/',
};
