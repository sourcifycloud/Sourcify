import { render } from '@testing-library/vue';
import sourcifyInput from '../Input.vue';

describe('sourcifyInput', () => {
	it('should render correctly', () => {
		const wrapper = render(sourcifyInput);
		expect(wrapper.html()).toMatchSnapshot();
	});
});
