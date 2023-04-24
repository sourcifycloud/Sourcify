import type { StoryFn } from '@storybook/vue';
import sourcifyAlert from './Alert.vue';
import sourcifyIcon from '../sourcifyIcon';

export default {
	title: 'Atoms/Alert',
	component: sourcifyAlert,
	argTypes: {
		type: {
			type: 'select',
			options: ['success', 'info', 'warning', 'error'],
		},
		effect: {
			type: 'select',
			options: ['light', 'dark'],
		},
	},
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyAlert,
	},
	template:
		'<div style="position: relative; width: 100%; height: 300px;"><sourcify-alert v-bind="$props"><template #aside>custom content slot</template></sourcify-alert></div>',
});

export const ContentAsProps = Template.bind({});
ContentAsProps.args = {
	type: 'info',
	effect: 'light',
	title: 'Alert title',
	description: 'Alert description',
	center: false,
	showIcon: true,
	background: true,
};

const TemplateForSlots: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyAlert,
		sourcifyIcon,
	},
	template: `<div style="position: relative; width: 100%; height: 300px;">
			  <sourcify-alert v-bind="$props">
					<template #title>Title</template>
					<template>Description</template>
					<template #aside><button>Button</button></template>
					<template #icon>
						<sourcify-icon icon="grin-stars" size="xlarge" />
					</template>
				</sourcify-alert>
		</div>`,
});

export const ContentInSlots = TemplateForSlots.bind({});
ContentInSlots.args = {
	type: 'info',
	effect: 'light',
	center: false,
	background: true,
	showIcon: false,
};
