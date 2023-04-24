<template>
	<sourcify-button ref="button" v-bind="attrs" v-on="$listeners">
		<slot />
	</sourcify-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import sourcifyButton from '../Button.vue';

const classToTypeMap = {
	'btn--cancel': 'secondary',
	'el-picker-panel__link-btn': 'secondary',
};

export default defineComponent({
	components: {
		sourcifyButton,
	},
	computed: {
		attrs() {
			let type = this.$attrs.type || 'primary';

			/* Element UI Button can have 'text' or 'info' type which is not supported by sourcify-button
			 so render it as 'secondary' or 'tertiary' */
			if (type === 'text') {
				type = 'secondary';
			}

			if (type === 'info') {
				type = 'tertiary';
			}

			Object.entries(classToTypeMap).forEach(([className, mappedType]) => {
				if (this.$refs.button && (this.$refs.button as Vue).$el.classList.contains(className)) {
					type = mappedType;
				}
			});

			delete this.$attrs.type;

			return {
				...this.$attrs,
				type,
			};
		},
	},
});
</script>
