import { render } from '@testing-library/vue';
import sourcifyBadge from '../Badge.vue';

describe('components', () => {
	describe('sourcifyBadge', () => {
		describe('props', () => {
			it('should render default theme correctly', () => {
				const wrapper = render(sourcifyBadge, {
					props: {
						theme: 'default',
						size: 'large',
						bold: true,
					},
					slots: {
						default: '<sourcify-text>Default badge</sourcify-text>',
					},
					stubs: ['sourcify-text'],
				});
				expect(wrapper.html()).toMatchSnapshot();
			});
			it('should render secondary theme correctly', () => {
				const wrapper = render(sourcifyBadge, {
					props: {
						theme: 'secondary',
						size: 'medium',
						bold: false,
					},
					slots: {
						default: '<sourcify-text>Secondary badge</sourcify-text>',
					},
					stubs: ['sourcify-text'],
				});
				expect(wrapper.html()).toMatchSnapshot();
			});
			it('should render with default values correctly', () => {
				const wrapper = render(sourcifyBadge, {
					slots: {
						default: '<sourcify-text>A Badge</sourcify-text>',
					},
					stubs: ['sourcify-text'],
				});
				expect(wrapper.html()).toMatchSnapshot();
			});
		});
	});
});
