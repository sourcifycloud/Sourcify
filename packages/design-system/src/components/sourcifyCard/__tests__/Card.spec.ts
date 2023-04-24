import { render } from '@testing-library/vue';
import sourcifyCard from '../Card.vue';

describe('components', () => {
	describe('sourcifyCard', () => {
		it('should render correctly', () => {
			const wrapper = render(sourcifyCard, {
				slots: {
					default: 'This is a card.',
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});

		it('should render correctly with header and footer', () => {
			const wrapper = render(sourcifyCard, {
				slots: {
					header: 'Header',
					default: 'This is a card.',
					footer: 'Footer',
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});
	});
});
