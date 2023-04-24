<template>
	<el-tooltip v-bind="$attrs">
		<template v-for="(_, slotName) in $slots" #[slotName]>
			<slot :name="slotName" />
			<div
				:key="slotName"
				v-if="slotName === 'content' && buttons.length"
				:class="$style.buttons"
				:style="{ justifyContent: justifyButtons }"
			>
				<sourcify-button
					v-for="button in buttons"
					:key="button.attrs.label"
					v-bind="button.attrs"
					v-on="button.listeners"
				/>
			</div>
		</template>
	</el-tooltip>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Tooltip as ElTooltip } from 'element-ui';
import type { IsourcifyButton } from '@/types';
import sourcifyButton from '../sourcifyButton';

export default defineComponent({
	name: 'sourcify-tooltip',
	inheritAttrs: false,
	components: {
		ElTooltip,
		sourcifyButton,
	},
	props: {
		justifyButtons: {
			type: String,
			default: 'flex-end',
			validator: (value: string): boolean =>
				[
					'flex-start',
					'flex-end',
					'start',
					'end',
					'left',
					'right',
					'center',
					'space-between',
					'space-around',
					'space-evenly',
				].includes(value),
		},
		buttons: {
			type: Array as PropType<IsourcifyButton[]>,
			default: () => [],
		},
	},
});
</script>

<style lang="scss" module>
.buttons {
	display: flex;
	align-items: center;
	margin-top: var(--spacing-s);
}
</style>
