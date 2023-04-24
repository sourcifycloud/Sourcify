import sourcifyCard from './Card.vue';
import type { StoryFn } from '@storybook/vue';
import sourcifyButton from '../sourcifyButton/Button.vue';
import sourcifyIcon from '../sourcifyIcon/Icon.vue';
import sourcifyText from '../sourcifyText/Text.vue';

export default {
	title: 'Atoms/Card',
	component: sourcifyCard,
};

export const Default: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyCard,
	},
	template: '<sourcify-card v-bind="$props">This is a card.</sourcify-card>',
});

export const Hoverable: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyCard,
		sourcifyIcon,
		sourcifyText,
	},
	template: `<div style="width: 140px; text-align: center;">
		<sourcify-card v-bind="$props">
			<sourcify-icon icon="plus" size="xlarge" />
			<sourcify-text size="large" class="mt-2xs">Add</sourcify-text>
		</sourcify-card>
	</div>`,
});

Hoverable.args = {
	hoverable: true,
};

export const WithSlots: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyCard,
		sourcifyButton,
		sourcifyIcon,
		sourcifyText,
	},
	template: `<sourcify-card v-bind="$props">
		<template slot="prepend">
			<sourcify-icon icon="check" size="large" />
		</template>
		<template slot="header">
			<strong>Card header</strong>
		</template>
		<sourcify-text color="text-light" size="medium" class="mt-2xs mb-2xs">
			This is the card body.
		</sourcify-text>
		<template slot="footer">
			<sourcify-text size="medium">
				Card footer
			</sourcify-text>
		</template>
		<template slot="append">
			<sourcify-button>Click me</sourcify-button>
		</template>
	</sourcify-card>`,
});
