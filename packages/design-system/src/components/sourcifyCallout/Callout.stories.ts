import sourcifyCallout from './Callout.vue';
import sourcifyLink from '../sourcifyLink';
import sourcifyText from '../sourcifyText';
import type { StoryFn } from '@storybook/vue';

export default {
	title: 'Atoms/Callout',
	component: sourcifyCallout,
	argTypes: {
		theme: {
			control: {
				type: 'select',
				options: ['info', 'secondary', 'success', 'warning', 'danger', 'custom'],
			},
		},
		message: {
			control: {
				type: 'text',
			},
		},
		icon: {
			control: {
				type: 'text',
			},
		},
	},
	parameters: {
		design: {
			type: 'figma',
			url: 'https://www.figma.com/file/tPpJvbrnHbP8C496cYuwyW/Node-pinning?node-id=15%3A5777',
		},
	},
};

interface Args {
	theme: string;
	icon: string;
	default: string;
	actions: string;
	trailingContent: string;
}

const template: StoryFn<Args> = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyLink,
		sourcifyText,
		sourcifyCallout,
	},
	template: `
		<sourcify-callout v-bind="$props">
			${args.default}
			<template #actions v-if="actions">
				${args.actions}
			</template>
			<template #trailingContent v-if="trailingContent">
				${args.trailingContent}
			</template>
		</sourcify-callout>
	`,
});

export const defaultCallout = template.bind({});
defaultCallout.args = {
	theme: 'success',
	default: `
		This is a default callout.
	`,
};

export const customCallout = template.bind({});
customCallout.args = {
	theme: 'custom',
	icon: 'code-branch',
	default: `
		This is a custom callout.
	`,
	actions: `
		<sourcify-link size="small">
			Do something!
		</sourcify-link>
	`,
};

export const secondaryCallout = template.bind({});
secondaryCallout.args = {
	theme: 'secondary',
	icon: 'thumbtack',
	default: `
		This data is pinned.
	`,
	actions: `
		<sourcify-link theme="secondary" size="small" :bold="true" :underline="true">
			Unpin
		</sourcify-link>
	`,
	trailingContent: `
		<sourcify-link
			theme="secondary"
			size="small"
			:bold="true"
			:underline="true"
			to="https://sourcify.io"
		>
			Learn more
		</sourcify-link>
	`,
};
