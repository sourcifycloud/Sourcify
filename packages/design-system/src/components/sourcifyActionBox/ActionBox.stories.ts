import sourcifyActionBox from './ActionBox.vue';
import { action } from '@storybook/addon-actions';
import type { StoryFn } from '@storybook/vue';

export default {
	title: 'Atoms/ActionBox',
	component: sourcifyActionBox,
	argTypes: {
		calloutTheme: {
			control: {
				type: 'select',
				options: ['info', 'success', 'warning', 'danger', 'custom'],
			},
		},
	},
	parameters: {
		backgrounds: { default: '--color-background-light' },
	},
};

const methods = {
	onClick: action('click'),
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyActionBox,
	},
	template: '<sourcify-action-box v-bind="$props" @click="onClick" />',
	methods,
});

export const ActionBox = Template.bind({});
ActionBox.args = {
	emoji: '😿',
	heading: 'Headline you need to know',
	description:
		'Long description that you should know something is the way it is because of how it is. ',
	buttonText: 'Do something',
};
