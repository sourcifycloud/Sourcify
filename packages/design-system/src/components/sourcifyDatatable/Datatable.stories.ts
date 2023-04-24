import sourcifyDatatable from './Datatable.vue';
import type { StoryFn } from '@storybook/vue';
import { rows, columns } from './__tests__/data';

export default {
	title: 'Atoms/Datatable',
	component: sourcifyDatatable,
};

export const Default: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyDatatable,
	},
	template: '<sourcify-datatable v-bind="$props"></sourcify-datatable>',
});

Default.args = {
	columns,
	rows,
};
