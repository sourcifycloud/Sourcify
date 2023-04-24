import type { StoryFn } from '@storybook/vue';
import sourcifySelect from './Select.vue';
import sourcifyOption from '../sourcifyOption';
import sourcifyIcon from '../sourcifyIcon';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Atoms/Select',
	component: sourcifySelect,
	argTypes: {
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		size: {
			control: {
				type: 'select',
				options: ['large', 'medium', 'small', 'mini'],
			},
		},
		loading: {
			control: {
				type: 'boolean',
			},
		},
		filterable: {
			control: {
				type: 'boolean',
			},
		},
		defaultFirstOption: {
			control: {
				type: 'boolean',
			},
		},
	},
	parameters: {
		backgrounds: { default: '--color-background-light' },
	},
};

const methods = {
	onInput: action('input'),
	onChange: action('change'),
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifySelect,
		sourcifyOption,
		sourcifyIcon,
	},
	template:
		'<sourcify-select v-bind="$props" v-model="val" @input="onInput" @change="onChange"><sourcify-option value="1">op1</sourcify-option><sourcify-option value="2">op2</sourcify-option></sourcify-select>',
	data() {
		return {
			val: '',
		};
	},
	methods,
});

export const Input = Template.bind({});

export const Filterable = Template.bind({});
Filterable.args = {
	filterable: true,
	defaultFirstOption: true,
};

const selects = ['large', 'medium', 'small', 'mini']
	.map(
		(size) =>
			`<sourcify-select v-bind="$props" v-model="val" @input="onInput" @change="onChange" size="${size}"><sourcify-option value="1">op1</sourcify-option><sourcify-option value="2">op2</sourcify-option></sourcify-select>`,
	)
	.join('');

const ManyTemplate: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifySelect,
		sourcifyOption,
		sourcifyIcon,
	},
	template: `<div class="multi-container">${selects}</div>`,
	methods,
	data() {
		return {
			val: '',
		};
	},
});

export const Sizes = ManyTemplate.bind({});
Sizes.args = {
	type: 'text',
	label: 'text input:',
	placeholder: 'placeholder...',
};

const selectsWithIcon = ['xlarge', 'large', 'medium', 'small', 'mini']
	.map(
		(size) =>
			`<sourcify-select v-bind="$props" v-model="val" @input="onInput" size="${size}"><sourcify-icon icon="search" slot="prefix" /><sourcify-option value="1">op1</sourcify-option><sourcify-option value="2">op2</sourcify-option></sourcify-select>`,
	)
	.join('');

const ManyTemplateWithIcon: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifySelect,
		sourcifyOption,
		sourcifyIcon,
	},
	template: `<div class="multi-container">${selectsWithIcon}</div>`,
	methods,
	data() {
		return {
			val: '',
		};
	},
});

export const WithIcon = ManyTemplateWithIcon.bind({});
WithIcon.args = {
	type: 'text',
	label: 'text input:',
	placeholder: 'placeholder...',
};

const LimitedWidthTemplate: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifySelect,
		sourcifyOption,
		sourcifyIcon,
	},
	template:
		'<div style="width:100px;"><sourcify-select v-bind="$props" v-model="val" @input="onInput" @change="onChange"><sourcify-option value="1" label="opt1 11 1111" /><sourcify-option value="2" label="opt2 test very long ipsum"/></sourcify-select></div>',
	data() {
		return {
			val: '',
		};
	},
	methods,
});

export const LimitedWidth = LimitedWidthTemplate.bind({});
LimitedWidth.args = {
	type: 'text',
	label: 'text input:',
	placeholder: 'placeholder...',
};
