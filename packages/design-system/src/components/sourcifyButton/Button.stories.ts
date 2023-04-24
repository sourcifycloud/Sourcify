import sourcifyButton from './Button.vue';
import { action } from '@storybook/addon-actions';
import type { StoryFn } from '@storybook/vue';

export default {
	title: 'Atoms/Button',
	component: sourcifyButton,
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
		float: {
			type: 'select',
			options: ['left', 'right'],
		},
	},
	parameters: {
		design: {
			type: 'figma',
			url: 'https://www.figma.com/file/DxLbnIyMK8X0uLkUguFV4n/sourcify-design-system_v1?node-id=5%3A1147',
		},
	},
};

const methods = {
	onClick: action('click'),
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyButton,
	},
	template: '<sourcify-button v-bind="$props" @click="onClick" />',
	methods,
});

export const Button = Template.bind({});
Button.args = {
	label: 'Button',
};

const AllSizesTemplate: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyButton,
	},
	template: `<div>
		<sourcify-button v-bind="$props" size="large" @click="onClick" />
		<sourcify-button v-bind="$props" size="medium" @click="onClick" />
		<sourcify-button v-bind="$props" size="small" @click="onClick" />
		<sourcify-button v-bind="$props" :loading="true" @click="onClick" />
		<sourcify-button v-bind="$props" :disabled="true" @click="onClick" />
	</div>`,
	methods,
});

const AllColorsAndSizesTemplate: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyButton,
	},
	template: `<div>
		<sourcify-button v-bind="$props" size="large" type="primary" @click="onClick" />
		<sourcify-button v-bind="$props" size="large" type="secondary" @click="onClick" />
		<sourcify-button v-bind="$props" size="large" type="tertiary" @click="onClick" />
		<sourcify-button v-bind="$props" size="large" type="success" @click="onClick" />
		<sourcify-button v-bind="$props" size="large" type="warning" @click="onClick" />
		<sourcify-button v-bind="$props" size="large" type="danger" @click="onClick" />
		<br/>
		<br/>
		<sourcify-button v-bind="$props" size="medium" type="primary" @click="onClick" />
		<sourcify-button v-bind="$props" size="medium" type="secondary" @click="onClick" />
		<sourcify-button v-bind="$props" size="medium" type="tertiary" @click="onClick" />
		<sourcify-button v-bind="$props" size="medium" type="success" @click="onClick" />
		<sourcify-button v-bind="$props" size="medium" type="warning" @click="onClick" />
		<sourcify-button v-bind="$props" size="medium" type="danger" @click="onClick" />
		<br/>
		<br/>
		<sourcify-button v-bind="$props" size="small" type="primary" @click="onClick" />
		<sourcify-button v-bind="$props" size="small" type="secondary" @click="onClick" />
		<sourcify-button v-bind="$props" size="small" type="tertiary" @click="onClick" />
		<sourcify-button v-bind="$props" size="small" type="success" @click="onClick" />
		<sourcify-button v-bind="$props" size="small" type="warning" @click="onClick" />
		<sourcify-button v-bind="$props" size="small" type="danger" @click="onClick" />
	</div>`,
	methods,
});

export const Primary = AllSizesTemplate.bind({});
Primary.args = {
	type: 'primary',
	label: 'Button',
};

export const Secondary = AllSizesTemplate.bind({});
Secondary.args = {
	type: 'secondary',
	label: 'Button',
};

export const Tertiary = AllSizesTemplate.bind({});
Tertiary.args = {
	type: 'tertiary',
	label: 'Button',
};

export const Success = AllSizesTemplate.bind({});
Success.args = {
	type: 'success',
	label: 'Button',
};

export const Warning = AllSizesTemplate.bind({});
Warning.args = {
	type: 'warning',
	label: 'Button',
};

export const Danger = AllSizesTemplate.bind({});
Danger.args = {
	type: 'danger',
	label: 'Button',
};

export const Outline = AllColorsAndSizesTemplate.bind({});
Outline.args = {
	outline: true,
	label: 'Button',
};

export const Text = AllColorsAndSizesTemplate.bind({});
Text.args = {
	text: true,
	label: 'Button',
};

export const WithIcon = AllSizesTemplate.bind({});
WithIcon.args = {
	label: 'Button',
	icon: 'plus-circle',
};

export const Square = AllColorsAndSizesTemplate.bind({});
Square.args = {
	label: '48',
	square: true,
};
