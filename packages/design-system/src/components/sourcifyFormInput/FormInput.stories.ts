import sourcifyFormInput from './FormInput.vue';
import { action } from '@storybook/addon-actions';
import type { StoryFn } from '@storybook/vue';

export default {
	title: 'Modules/FormInput',
	component: sourcifyFormInput,
	argTypes: {},
};

const methods = {
	onInput: action('input'),
	onFocus: action('focus'),
	onChange: action('change'),
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyFormInput,
	},
	template: `
		<sourcify-form-input v-bind="$props" v-model="val" @input="onInput" @change="onChange" @focus="onFocus" />
	`,
	methods,
	data() {
		return {
			val: '',
		};
	},
});

export const FormInput = Template.bind({});
FormInput.args = {
	label: 'Label',
	placeholder: 'placeholder',
};
