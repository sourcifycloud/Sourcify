import type { StoryFn } from '@storybook/vue';
import sourcifyInfoTip from './InfoTip.vue';

export default {
	title: 'Atoms/InfoTip',
	component: sourcifyInfoTip,
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyInfoTip,
	},
	template:
		'<sourcify-info-tip v-bind="$props">Need help doing something? <a href="/docs" target="_blank">Open docs</a></sourcify-info-tip>',
});

export const Note = Template.bind({});

export const Tooltip = Template.bind({});
Tooltip.args = {
	type: 'tooltip',
	tooltipPlacement: 'right',
};
