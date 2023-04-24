import { render } from '@testing-library/vue';
import sourcifyInfoTip from '../InfoTip.vue';

const slots = {
	default: ['Need help doing something?', '<a href="/docs" target="_blank">Open docs</a>'],
};
const stubs = ['sourcify-tooltip'];

describe('sourcifyInfoTip', () => {
	it('should render correctly as note', () => {
		const wrapper = render(sourcifyInfoTip, {
			slots,
			stubs,
		});
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should render correctly as tooltip', () => {
		const wrapper = render(sourcifyInfoTip, {
			slots,
			stubs,
			props: {
				type: 'tooltip',
			},
		});
		expect(wrapper.html()).toMatchSnapshot();
	});
});
