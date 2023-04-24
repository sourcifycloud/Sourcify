import { render, screen } from '@testing-library/vue';
import sourcifyAlert from '../Alert.vue';
import sourcifyIcon from '../../sourcifyIcon';

describe('components', () => {
	describe('sourcifyAlert', () => {
		it('should render with props', () => {
			render(sourcifyAlert, {
				props: { title: 'Title', description: 'Message' },
			});
			expect(screen.getByRole('alert')).toBeVisible();
			expect(screen.getByText('Title')).toBeVisible();
			expect(screen.getByText('Message')).toBeVisible();
		});

		it('should render slots instead of props', () => {
			const { container } = render(
				sourcifyAlert,
				{
					props: { showIcon: false },
					slots: {
						title: 'Title',
						default: 'Message',
						aside: '<button>Click me</button>',
						icon: '<sourcify-icon icon="plus-circle" />',
					},
				},
				(localVue) => {
					localVue.component('sourcify-icon', sourcifyIcon);
				},
			);
			expect(screen.getByRole('alert')).toBeVisible();
			expect(screen.getByText('Title')).toBeVisible();
			expect(screen.getByText('Message')).toBeVisible();
			expect(screen.getByRole('button')).toBeVisible();
			expect(container.querySelector('.sourcify-icon')).toBeInTheDocument();
		});
	});
});
