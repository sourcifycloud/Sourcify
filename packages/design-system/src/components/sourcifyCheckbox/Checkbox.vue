<template>
	<el-checkbox
		v-bind="$props"
		ref="checkbox"
		:class="['sourcify-checkbox', $style.sourcifyCheckbox]"
		:disabled="disabled"
		:indeterminate="indeterminate"
		:value="value"
		@change="onChange"
	>
		<sourcify-input-label
			:label="label"
			:tooltipText="tooltipText"
			:bold="false"
			:size="labelSize"
			@click.prevent="onLabelClick"
		/>
	</el-checkbox>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Checkbox as ElCheckbox } from 'element-ui';
import sourcifyInputLabel from '../sourcifyInputLabel';

export default defineComponent({
	name: 'sourcify-checkbox',
	components: {
		ElCheckbox,
		sourcifyInputLabel,
	},
	props: {
		label: {
			type: String,
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		tooltipText: {
			type: String,
			required: false,
		},
		indeterminate: {
			type: Boolean,
			default: false,
		},
		value: {
			type: Boolean,
			default: false,
		},
		labelSize: {
			type: String,
			default: 'medium',
			validator: (value: string): boolean => ['small', 'medium'].includes(value),
		},
	},
	methods: {
		onChange(event: Event) {
			this.$emit('input', event);
		},
		onLabelClick() {
			const checkboxComponent = this.$refs.checkbox as ElCheckbox;
			if (!checkboxComponent) {
				return;
			}

			(checkboxComponent.$el as HTMLElement).click();
		},
	},
});
</script>

<style lang="scss" module>
.sourcifyCheckbox {
	display: flex !important;
	white-space: normal !important;
	margin-bottom: var(--spacing-2xs);

	span {
		white-space: normal;
	}

	label {
		cursor: pointer;
		margin-bottom: 0;
	}
}
</style>
