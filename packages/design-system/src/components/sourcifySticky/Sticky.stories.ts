import { action } from '@storybook/addon-actions';
import type { StoryFn } from '@storybook/vue';
import sourcifySticky from './Sticky.vue';

export default {
	title: 'Atoms/Sticky',
	component: sourcifySticky,
	argTypes: {
		content: {
			control: {
				control: 'text',
			},
		},
		height: {
			control: {
				control: 'number',
			},
		},
		minHeight: {
			control: {
				control: 'number',
			},
		},
		minWidth: {
			control: {
				control: 'number',
			},
		},
		readOnly: {
			control: {
				control: 'Boolean',
			},
		},
		width: {
			control: {
				control: 'number',
			},
		},
	},
};

const methods = {
	onInput: action('input'),
	onResize: action('resize'),
	onResizeEnd: action('resizeend'),
	onResizeStart: action('resizestart'),
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifySticky,
	},
	template:
		'<sourcify-sticky v-bind="$props"  @resize="onResize" @resizeend="onResizeEnd" @resizeStart="onResizeStart" @input="onInput"></sourcify-sticky>',
	methods,
});

export const Sticky = Template.bind({});
Sticky.args = {
	height: 160,
	width: 150,
	content:
		"## I'm a note \n**Double click** to edit me. [Guide](https://docs.sourcify.io/workflows/sticky-notes/)",
	defaultText:
		"## I'm a note \n**Double click** to edit me. [Guide](https://docs.sourcify.io/workflows/sticky-notes/)",
	minHeight: 80,
	minWidth: 150,
	readOnly: false,
};
