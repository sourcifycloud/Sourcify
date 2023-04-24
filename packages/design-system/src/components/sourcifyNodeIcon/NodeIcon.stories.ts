import sourcifyNodeIcon from './NodeIcon.vue';
import type { StoryFn } from '@storybook/vue';

export default {
	title: 'Atoms/NodeIcon',
	component: sourcifyNodeIcon,
};

const DefaultTemplate: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyNodeIcon,
	},
	template: '<sourcify-node-icon v-bind="$props"></sourcify-node-icon>',
});

export const FileIcon = DefaultTemplate.bind({});
FileIcon.args = {
	type: 'file',
	src: 'https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/cartman.svg',
	size: 200,
};

export const FontIcon = DefaultTemplate.bind({});
FontIcon.args = {
	type: 'icon',
	name: 'cogs',
	size: 200,
};

export const Hoverable = DefaultTemplate.bind({});
Hoverable.args = {
	type: 'icon',
	name: 'heart',
	color: 'red',
	size: 200,
	nodeTypeName: 'We ❤️ sourcify',
	showTooltip: true,
};
