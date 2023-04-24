<template>
	<sourcify-text :size="size" :color="color" :compact="true" class="sourcify-icon" v-on="$listeners">
		<font-awesome-icon :icon="icon" :spin="spin" :class="$style[size]" />
	</sourcify-text>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import sourcifyText from '../sourcifyText';

import { defineComponent } from 'vue';

export default defineComponent({
	name: 'sourcify-icon',
	components: {
		FontAwesomeIcon,
		sourcifyText,
	},
	props: {
		icon: {
			required: true,
		},
		size: {
			type: String,
			default: 'medium',
		},
		spin: {
			type: Boolean,
			default: false,
		},
		color: {
			type: String,
		},
	},
});
</script>

<style lang="scss" module>
.xlarge {
	width: var(--font-size-xl) !important;
}

.large {
	width: var(--font-size-m) !important;
}

.medium {
	width: var(--font-size-s) !important;
}

.small {
	width: var(--font-size-2xs) !important;
}

.xsmall {
	width: var(--font-size-3xs) !important;
}
</style>
