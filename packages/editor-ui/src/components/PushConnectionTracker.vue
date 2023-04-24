<template>
	<span>
		<div class="push-connection-lost primary-color" v-if="!rootStore.pushConnectionActive">
			<sourcify-tooltip placement="bottom-end">
				<template #content>
					<div v-html="$locale.baseText('pushConnectionTracker.cannotConnectToServer')"></div>
				</template>
				<span>
					<font-awesome-icon icon="exclamation-triangle" />&nbsp;
					{{ $locale.baseText('pushConnectionTracker.connectionLost') }}
				</span>
			</sourcify-tooltip>
		</div>
		<slot v-else />
	</span>
</template>

<script lang="ts">
import { useRootStore } from '@/stores/sourcifyRootStore';
import { mapStores } from 'pinia';
import Vue from 'vue';

export default Vue.extend({
	name: 'PushConnectionTracker',
	computed: {
		...mapStores(useRootStore),
	},
});
</script>
