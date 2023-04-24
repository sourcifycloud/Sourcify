import sourcifyIconButton from './IconButton.vue';
import { action } from '@storybook/addon-actions';
import type { StoryFn } from '@storybook/vue';

export default {
	title: 'Atoms/Icon Button',
	component: sourcifyIconButton,
	argTypes: {
		type: {
			control: 'select',
			options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'],
		},
		size: {
			control: {
				type: 'select',
				options: ['mini', 'small', 'medium', 'large', 'xlarge'],
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
		sourcifyIconButton,
	},
	template: '<sourcify-icon-button v-bind="$props" @click="onClick" />',
	methods,
});

export const Button = Template.bind({});
Button.args = {
	icon: 'plus',
	title: 'my title',
};

const ManyTemplate: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyIconButton,
	},
	template:
		'<div> <sourcify-icon-button v-bind="$props" size="xlarge" @click="onClick" /> <sourcify-icon-button v-bind="$props" size="large" @click="onClick" />  <sourcify-icon-button v-bind="$props" size="medium" @click="onClick" />  <sourcify-icon-button v-bind="$props" size="small" @click="onClick" />  <sourcify-icon-button v-bind="$props" :loading="true" @click="onClick" />  <sourcify-icon-button v-bind="$props" :disabled="true" @click="onClick" /></div>',
	methods,
});

export const Primary = ManyTemplate.bind({});
Primary.args = {
	icon: 'plus',
	title: 'my title',
	type: 'primary',
};

export const Outline = ManyTemplate.bind({});
Outline.args = {
	icon: 'plus',
	title: 'my title',
	type: 'primary',
	outline: true,
};

export const Tertiary = ManyTemplate.bind({});
Tertiary.args = {
	icon: 'plus',
	title: 'my title',
	type: 'tertiary',
};

export const Text = ManyTemplate.bind({});
Text.args = {
	icon: 'plus',
	title: 'my title',
	type: 'text',
};
