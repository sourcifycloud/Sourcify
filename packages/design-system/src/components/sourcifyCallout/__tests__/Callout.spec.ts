import { render } from '@testing-library/vue';
import sourcifyCallout from '../Callout.vue';

describe('components', () => {
	describe('sourcifyCallout', () => {
		it('should render info theme correctly', () => {
			const wrapper = render(sourcifyCallout, {
				props: {
					theme: 'info',
				},
				stubs: ['sourcify-icon', 'sourcify-text'],
				slots: {
					default: '<sourcify-text size="small">This is an info callout.</sourcify-text>',
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});
		it('should render success theme correctly', () => {
			const wrapper = render(sourcifyCallout, {
				props: {
					theme: 'success',
				},
				stubs: ['sourcify-icon', 'sourcify-text'],
				slots: {
					default: '<sourcify-text size="small">This is a success callout.</sourcify-text>',
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});
		it('should render warning theme correctly', () => {
			const wrapper = render(sourcifyCallout, {
				props: {
					theme: 'warning',
				},
				stubs: ['sourcify-icon', 'sourcify-text'],
				slots: {
					default: '<sourcify-text size="small">This is a warning callout.</sourcify-text>',
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});
		it('should render danger theme correctly', () => {
			const wrapper = render(sourcifyCallout, {
				props: {
					theme: 'danger',
				},
				stubs: ['sourcify-icon', 'sourcify-text'],
				slots: {
					default: '<sourcify-text size="small">This is a danger callout.</sourcify-text>',
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});
		it('should render secondary theme correctly', () => {
			const wrapper = render(sourcifyCallout, {
				props: {
					theme: 'secondary',
				},
				stubs: ['sourcify-icon', 'sourcify-text'],
				slots: {
					default: '<sourcify-text size="small">This is a secondary callout.</sourcify-text>',
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});
		it('should render custom theme correctly', () => {
			const wrapper = render(sourcifyCallout, {
				props: {
					theme: 'custom',
					icon: 'code-branch',
				},
				stubs: ['sourcify-icon', 'sourcify-text'],
				slots: {
					default: '<sourcify-text size="small">This is a secondary callout.</sourcify-text>',
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});
		it('should render additional slots correctly', () => {
			const wrapper = render(sourcifyCallout, {
				props: {
					theme: 'custom',
					icon: 'code-branch',
				},
				stubs: ['sourcify-icon', 'sourcify-text', 'sourcify-link'],
				slots: {
					default: '<sourcify-text size="small">This is a secondary callout.</sourcify-text>',
					actions: '<sourcify-link size="small">Do something!</sourcify-link>',
					trailingContent:
						'<sourcify-link theme="secondary" size="small" :bold="true" :underline="true" to="https://sourcify.io">Learn more</sourcify-link>',
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});
	});
});
