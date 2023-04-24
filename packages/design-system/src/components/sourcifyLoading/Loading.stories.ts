import type { StoryFn } from '@storybook/vue';
import sourcifyLoading from './Loading.vue';

export default {
	title: 'Atoms/Loading',
	component: sourcifyLoading,
	argTypes: {
		animated: {
			control: {
				type: 'boolean',
			},
		},
		loading: {
			control: {
				type: 'boolean',
			},
		},
		rows: {
			control: {
				type: 'select',
				options: [1, 2, 3, 4, 5],
			},
		},
		variant: {
			control: {
				type: 'select',
				options: ['button', 'h1', 'image', 'p'],
			},
		},
	},
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyLoading,
	},
	template: '<sourcify-loading v-bind="$props"></sourcify-loading>',
});

export const Loading = Template.bind({});
Loading.args = {
	variant: 'p',
};
