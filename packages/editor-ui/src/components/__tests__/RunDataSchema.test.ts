import { PiniaVuePlugin } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { render, cleanup } from '@testing-library/vue';
import RunDataJsonSchema from '@/components/RunDataSchema.vue';
import { STORES } from '@/constants';

describe('RunDataJsonSchema.vue', () => {
	const renderOptions = {
		pinia: createTestingPinia({
			initialState: {
				[STORES.SETTINGS]: {
					settings: {
						templates: {
							enabled: true,
							host: 'https://api.sourcify.io/api/',
						},
					},
				},
			},
		}),
		stubs: ['font-awesome-icon'],
		props: {
			mappingEnabled: true,
			distanceFromActive: 1,
			runIndex: 1,
			totalRuns: 2,
			paneType: 'input',
			node: {
				parameters: {
					keepOnlySet: false,
					values: {},
					options: {},
				},
				id: '820ea733-d8a6-4379-8e73-88a2347ea003',
				name: 'Set',
				type: 'sourcify-nodes-base.set',
				typeVersion: 1,
				position: [380, 1060],
				disabled: false,
			},
			data: [{}],
		},
	};

	beforeEach(cleanup);

	it('renders schema for empty data', () => {
		const { container } = render(RunDataJsonSchema, renderOptions, (vue) => {
			vue.use(PiniaVuePlugin);
		});
		expect(container).toMatchSnapshot();
	});

	it('renders schema for data', () => {
		renderOptions.props.data = [
			{ name: 'John', age: 22, hobbies: ['surfing', 'traveling'] },
			{ name: 'Joe', age: 33, hobbies: ['skateboarding', 'gaming'] },
		];
		const { container } = render(RunDataJsonSchema, renderOptions, (vue) => {
			vue.use(PiniaVuePlugin);
		});
		expect(container).toMatchSnapshot();
	});

	it('renders schema with spaces and dots', () => {
		renderOptions.props.data = [
			{
				'hello world': [
					{
						test: {
							'more to think about': 1,
						},
						'test.how': 'ignore',
					},
				],
			},
		];
		const { container } = render(RunDataJsonSchema, renderOptions, (vue) => {
			vue.use(PiniaVuePlugin);
		});
		expect(container).toMatchSnapshot();
	});
});
