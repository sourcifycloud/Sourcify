import type { StoryFn } from '@storybook/vue';
import sourcifyPopover from './Popover.vue';

export default {
	title: 'Atoms/Popover',
	component: sourcifyPopover,
	argTypes: {
		effect: {
			control: 'select',
			options: ['dark', 'light'],
		},
		placement: {
			control: 'select',
			options: [
				'top',
				'top-start',
				'top-end',
				'bottom',
				'bottom-start',
				'bottom-end',
				'left',
				'left-start',
				'left-end',
				'right',
				'right-start',
				'right-end',
			],
		},
		disabled: {
			control: { type: 'boolean' },
		},
	},
	parameters: {
		backgrounds: { default: '--color-background-light' },
	},
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyPopover,
	},
	template:
		'<sourcify-Popover v-bind="$props"><div style="margin:50px; display: inline-block;"><span>yo</span></div></sourcify-Popover>',
});

export const Popover = Template.bind({});
Popover.args = {
	content: '...',
};
