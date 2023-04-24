import type { StoryFn } from '@storybook/vue';
import sourcifyPagination from './Pagination.vue';

export default {
	title: 'Atoms/Pagination',
	component: sourcifyPagination,
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		sourcifyPagination,
	},
	template: '<sourcify-pagination v-bind="$props" />',
});

export const Pagination: StoryFn = Template.bind({});
Pagination.args = {
	currentPage: 1,
	pagerCount: 5,
	pageSize: 10,
	total: 100,
};
