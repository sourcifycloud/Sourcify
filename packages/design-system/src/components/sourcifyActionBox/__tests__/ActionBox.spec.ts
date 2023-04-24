import { render } from '@testing-library/vue';
import sourcifyActionBox from '../ActionBox.vue';

describe('sourcifyActionBox', () => {
	it('should render correctly', () => {
		const wrapper = render(sourcifyActionBox, {
			props: {
				emoji: '😿',
				heading: 'Headline you need to know',
				description:
					'Long description that you should know something is the way it is because of how it is. ',
				buttonText: 'Do something',
			},
			stubs: ['sourcify-heading', 'sourcify-text', 'sourcify-button', 'sourcify-callout'],
		});
		expect(wrapper.html()).toMatchSnapshot();
	});
});
