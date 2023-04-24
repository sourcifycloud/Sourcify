<script lang="ts">
import { computed, defineComponent, PropType, ref, useCssModule } from 'vue';
import { DatatableColumn, DatatableRow, DatatableRowDataType } from '../../types';
import { getValueByPath } from '../../utils';
import { useI18n } from '../../composables';
import sourcifySelect from '../sourcifySelect';
import sourcifyOption from '../sourcifyOption';
import sourcifyPagination from '../sourcifyPagination';

export default defineComponent({
	name: 'sourcify-datatable',
	components: {
		sourcifySelect,
		sourcifyOption,
		sourcifyPagination,
	},
	emits: ['update:currentPage', 'update:rowsPerPage'],
	props: {
		columns: {
			type: Array as PropType<DatatableColumn[]>,
			required: true,
		},
		rows: {
			type: Array as PropType<DatatableRow[]>,
			required: true,
		},
		currentPage: {
			type: Number,
			default: 1,
		},
		pagination: {
			type: Boolean,
			default: true,
		},
		rowsPerPage: {
			type: [Number, String] as PropType<number | '*'>,
			default: 10,
		},
	},
	setup(props, { emit }) {
		const { t } = useI18n();
		const rowsPerPageOptions = ref([10, 25, 50, 100]);

		const style = useCssModule();

		const totalPages = computed(() => {
			if (props.rowsPerPage === '*') {
				return 1;
			}

			return Math.ceil(props.rows.length / props.rowsPerPage);
		});

		const totalRows = computed(() => {
			return props.rows.length;
		});

		const visibleRows = computed(() => {
			if (props.rowsPerPage === '*') {
				return props.rows;
			}

			const start = (props.currentPage - 1) * props.rowsPerPage;
			const end = start + props.rowsPerPage;

			return props.rows.slice(start, end);
		});

		const classes = computed(() => {
			return {
				datatable: true,
				[style.datatableWrapper]: true,
			};
		});

		function onUpdateCurrentPage(value: number) {
			emit('update:currentPage', value);
		}

		function onRowsPerPageChange(value: number | '*') {
			emit('update:rowsPerPage', value);

			const maxPage = value === '*' ? 1 : Math.ceil(totalRows.value / value);
			if (maxPage < props.currentPage) {
				onUpdateCurrentPage(maxPage);
			}
		}

		function getTdValue(row: DatatableRow, column: DatatableColumn) {
			return getValueByPath<DatatableRowDataType>(row, column.path);
		}

		function getThStyle(column: DatatableColumn) {
			return {
				...(column.width ? { width: column.width } : {}),
			};
		}

		return {
			t,
			classes,
			totalPages,
			totalRows,
			visibleRows,
			rowsPerPageOptions,
			getTdValue,
			getThStyle,
			onUpdateCurrentPage,
			onRowsPerPageChange,
		};
	},
});
</script>

<template>
	<div :class="classes" v-on="$listeners">
		<table :class="$style.datatable">
			<thead :class="$style.datatableHeader">
				<tr>
					<th
						v-for="column in columns"
						:key="column.id"
						:class="column.classes"
						:style="getThStyle(column)"
					>
						{{ column.label }}
					</th>
				</tr>
			</thead>
			<tbody>
				<template v-for="row in visibleRows">
					<slot name="row" :columns="columns" :row="row" :getTdValue="getTdValue">
						<tr :key="row.id">
							<td v-for="column in columns" :key="column.id" :class="column.classes">
								<component v-if="column.render" :is="column.render" :row="row" :column="column" />
								<span v-else>{{ getTdValue(row, column) }}</span>
							</td>
						</tr>
					</slot>
				</template>
			</tbody>
		</table>

		<div :class="$style.pagination">
			<sourcify-pagination
				v-if="totalPages > 1"
				background
				:pager-count="5"
				:page-size="rowsPerPage"
				layout="prev, pager, next"
				:total="totalRows"
				:currentPage="currentPage"
				@update:currentPage="onUpdateCurrentPage"
			/>

			<div :class="$style.pageSizeSelector">
				<sourcify-select
					size="mini"
					:value="rowsPerPage"
					@input="onRowsPerPageChange"
					popper-append-to-body
				>
					<template #prepend>{{ t('datatable.pageSize') }}</template>
					<sourcify-option
						v-for="size in rowsPerPageOptions"
						:key="size"
						:label="`${size}`"
						:value="size"
					/>
					<sourcify-option :label="`All`" value="*"> </sourcify-option>
				</sourcify-select>
			</div>
		</div>
	</div>
</template>

<style lang="scss" module>
.datatableWrapper {
	display: block;
	width: 100%;
}

.datatable {
	width: 100%;

	tbody {
		tr {
			td {
				vertical-align: top;
				color: var(--color-text-base);
				padding: var(--spacing-s) var(--spacing-2xs);
			}

			&:nth-of-type(even) {
				background: var(--color-background-xlight);
			}

			&:nth-of-type(odd) {
				background: var(--color-background-light);
			}
		}
	}
}

.datatableHeader {
	background: var(--color-background-base);

	th {
		text-align: left;
		padding: var(--spacing-s) var(--spacing-2xs);
	}
}

.pagination {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	bottom: 0;
	overflow: visible;
	margin-top: var(--spacing-s);
}

.pageSizeSelector {
	text-transform: capitalize;
	max-width: 150px;
	flex: 0 1 auto;
}
</style>
