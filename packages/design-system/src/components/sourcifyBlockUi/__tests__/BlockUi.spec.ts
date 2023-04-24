import { render, screen } from '@testing-library/vue';
import sourcifyBlockUi from '../BlockUi.vue';

describe('components', () => {
	describe('sourcifyBlockUi', () => {
		it('should render but not visible', () => {
			render(sourcifyBlockUi);
			expect(screen.queryByRole('dialog', { hidden: true })).not.toBeVisible();
		});

		it('should render and is visible', () => {
			render(sourcifyBlockUi, { props: { show: true } });
			expect(screen.getByRole('dialog', { hidden: true })).toBeVisible();
		});
	});
});
