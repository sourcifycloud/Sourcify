import type { StoryFn } from '@storybook/vue';
import sourcifyTag from './Tag.vue';

export default {
	title: 'Atoms/Tag',
	component: sourcifyTag,
	argTypes: {
		text: {
			control: {
				control: 'text',
			},
		},
	},
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyTag,
	},
	template: '<sourcify-tag v-bind="$props"></sourcify-tag>',
});

export const Tag = Template.bind({});
Tag.args = {
	text: 'tag name',
};
