import { render } from '@testing-library/vue';
import sourcifySelect from '../Select.vue';
import sourcifyOption from '../../sourcifyOption/Option.vue';

describe('components', () => {
	describe('sourcifySelect', () => {
		it('should render correctly', () => {
			const wrapper = render(sourcifySelect, {
				components: {
					sourcifyOption,
				},
				slots: {
					default: [
						'<sourcify-option value="1">1</sourcify-option>',
						'<sourcify-option value="2">2</sourcify-option>',
						'<sourcify-option value="3">3</sourcify-option>',
					],
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});
	});
});
