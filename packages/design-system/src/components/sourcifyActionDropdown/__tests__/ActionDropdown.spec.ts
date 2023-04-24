import { render } from '@testing-library/vue';
import sourcifyActionDropdown from '../ActionDropdown.vue';

describe('components', () => {
	describe('sourcifyActionDropdown', () => {
		it('should render default styling correctly', () => {
			const wrapper = render(sourcifyActionDropdown, {
				props: {
					items: [
						{
							id: 'item1',
							label: 'Action 1',
						},
						{
							id: 'item2',
							label: 'Action 2',
						},
					],
				},
				stubs: ['sourcify-icon', 'el-dropdown', 'el-dropdown-menu', 'el-dropdown-item'],
			});
			expect(wrapper.html()).toMatchSnapshot();
		});
		it('should render custom styling correctly', () => {
			const wrapper = render(sourcifyActionDropdown, {
				props: {
					items: [
						{
							id: 'item1',
							label: 'Action 1',
							icon: 'thumbs-up',
						},
						{
							id: 'item2',
							label: 'Action 2',
							icon: 'thumbs-down',
							disabled: true,
						},
						{
							id: 'item3',
							label: 'Action 3',
							icon: 'heart',
							divided: true,
						},
					],
				},
				stubs: ['sourcify-icon', 'el-dropdown', 'el-dropdown-menu', 'el-dropdown-item'],
			});
			expect(wrapper.html()).toMatchSnapshot();
		});
	});
});
