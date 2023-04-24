import type { StoryFn } from '@storybook/vue';
import sourcifyBlockUi from './BlockUi.vue';

export default {
	title: 'Atoms/BlockUI',
	component: sourcifyBlockUi,
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyBlockUi,
	},
	template:
		'<div style="position: relative; width: 100%; height: 300px;"><sourcify-block-ui v-bind="$props" /></div>',
});

export const BlockUi = Template.bind({});
BlockUi.args = {
	show: false,
};
