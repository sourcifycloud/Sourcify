import { render } from '@testing-library/vue';
import sourcifyTree from '../Tree.vue';

describe('components', () => {
	describe('sourcifyTree', () => {
		it('should render simple tree', () => {
			const wrapper = render(sourcifyTree, {
				props: {
					value: {
						hello: 'world',
					},
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});

		it('should render tree', () => {
			const wrapper = render(sourcifyTree, {
				props: {
					value: {
						hello: {
							test: 'world',
						},
						options: ['yes', 'no'],
					},
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});

		it('should render tree with slots', () => {
			const wrapper = render(sourcifyTree, {
				props: {
					value: {
						hello: {
							test: 'world',
						},
						options: ['yes', 'no'],
					},
				},
				slots: {
					label: '<span>label</span>',
					value: '<span>value</span>',
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});

		it('should render each tree with node class', () => {
			const wrapper = render(sourcifyTree, {
				props: {
					value: {
						hello: {
							test: 'world',
						},
						options: ['yes', 'no'],
					},
					nodeClass: 'nodeClass',
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});
	});
});
