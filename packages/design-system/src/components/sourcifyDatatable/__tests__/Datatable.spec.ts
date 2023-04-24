import { render } from '@testing-library/vue';
import sourcifyDatatable from '../Datatable.vue';
import { rows, columns } from './data';

const stubs = ['sourcify-select', 'sourcify-option', 'sourcify-button', 'sourcify-pagination'];

describe('components', () => {
	describe('sourcifyDatatable', () => {
		const rowsPerPage = 10;

		it('should render correctly', () => {
			const wrapper = render(sourcifyDatatable, {
				propsData: {
					columns,
					rows,
					rowsPerPage,
				},
				stubs,
			});

			expect(wrapper.container.querySelectorAll('thead tr').length).toEqual(1);
			expect(wrapper.container.querySelectorAll('tbody tr').length).toEqual(rowsPerPage);
			expect(wrapper.container.querySelectorAll('tbody tr td').length).toEqual(
				columns.length * rowsPerPage,
			);
			expect(wrapper.html()).toMatchSnapshot();
		});

		it('should add column classes', () => {
			const wrapper = render(sourcifyDatatable, {
				propsData: {
					columns: columns.map((column) => ({ ...column, classes: ['example'] })),
					rows,
					rowsPerPage,
				},
				stubs,
			});

			expect(wrapper.container.querySelectorAll('.example').length).toEqual(
				columns.length * (rowsPerPage + 1),
			);
		});

		it('should render row slot', () => {
			const wrapper = render(sourcifyDatatable, {
				propsData: {
					columns,
					rows,
					rowsPerPage,
				},
				stubs,
				scopedSlots: {
					row: '<main><td v-for="column in props.columns" :key="column.id">Row slot</td></main>', // Wrapper is necessary for looping
				},
			});

			expect(wrapper.container.querySelectorAll('tbody td').length).toEqual(
				columns.length * rowsPerPage,
			);
			expect(wrapper.container.querySelector('tbody td')?.textContent).toEqual('Row slot');
		});
	});
});
