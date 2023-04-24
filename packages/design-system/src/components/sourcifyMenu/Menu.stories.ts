import sourcifyMenu from './Menu.vue';
import sourcifyIcon from '../sourcifyIcon';
import sourcifyText from '../sourcifyText';
import type { StoryFn } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Atoms/Menu',
	component: sourcifyMenu,
	argTypes: {},
};

const methods = {
	onSelect: action('select'),
};

const template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyMenu,
	},
	template: `
		<div style="height: 90vh; width: 200px">
			<sourcify-menu v-bind="$props" @select="onSelect"></sourcify-menu>
		</div>
	`,
	methods,
});

const templateWithHeaderAndFooter: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyMenu,
		sourcifyIcon,
		sourcifyText,
	},
	template: `
		<div style="height: 90vh; width: 200px">
			<sourcify-menu v-bind="$props" @select="onSelect">
				<template #header>
					<a href="#" class="p-m hideme" style="display: block;">
						<sourcify-icon icon="long-arrow-alt-left"/>&nbsp;&nbsp;Back to home
					</a>
				</template>
				<template #footer>
					<div class="p-m hideme">
						<sourcify-icon icon="user-circle" size="xlarge"/>&nbsp;&nbsp;
						<sourcify-text>John Smithson</sourcify-text>
					</div>
				</template>
			</sourcify-menu>
		</div>
	`,
	methods,
});

const templateWithAllSlots: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyMenu,
		sourcifyIcon,
		sourcifyText,
	},
	template: `
		<div style="height: 90vh; width: 200px">
			<sourcify-menu v-bind="$props" @select="onSelect">
				<template #header>
					<a href="#" class="p-m hideme" style="display: block;">
						<sourcify-icon icon="long-arrow-alt-left"/>&nbsp;&nbsp;Back to home
					</a>
				</template>
				<template #menuPrefix>
					<sourcify-text class="hideme" size="small"  color="text-light">Something can be added here...</sourcify-text>
				</template>
				<template #menuSuffix>
					<sourcify-text class="hideme" size="small" color="text-light">...and here if needed</sourcify-text>
				</template>
				<template #footer>
					<div class="p-m hideme">
						<sourcify-icon icon="user-circle" size="xlarge"/>&nbsp;&nbsp;
						<sourcify-text>John Smithson</sourcify-text>
					</div>
				</template>
			</sourcify-menu>
		</div>
	`,
	methods,
});

const menuItems = [
	{
		id: 'workflows',
		icon: 'network-wired',
		label: 'Workflows',
		position: 'top',
	},
	{
		id: 'executions',
		icon: 'tasks',
		label: 'Executions',
		position: 'top',
	},
	{
		id: 'disabled-item',
		icon: 'times',
		label: 'Not Available',
		available: false,
		position: 'top',
	},
	{
		id: 'website',
		icon: 'globe',
		label: 'Website',
		type: 'link',
		properties: {
			href: 'https://www.sourcify.io',
			newWindow: true,
		},
		position: 'bottom',
	},
	{
		id: 'help',
		icon: 'question',
		label: 'Help',
		position: 'bottom',
		children: [
			{ icon: 'info', label: 'About sourcify', id: 'about' },
			{ icon: 'book', label: 'Documentation', id: 'docs' },
			{
				id: 'disabled-submenu-item',
				icon: 'times',
				label: 'Not Available',
				available: false,
				position: 'top',
			},
			{
				id: 'quickstart',
				icon: 'video',
				label: 'Quickstart',
				type: 'link',
				properties: {
					href: 'https://www.youtube.com/watch?v=RpjQTGKm-ok',
					newWindow: true,
				},
			},
		],
	},
];

export const primary = template.bind({});
primary.args = {
	items: menuItems,
};

export const withHeaderAndFooter = templateWithHeaderAndFooter.bind({});
withHeaderAndFooter.args = { items: menuItems };

export const withAllSlots = templateWithAllSlots.bind({});
withAllSlots.args = { items: menuItems };
