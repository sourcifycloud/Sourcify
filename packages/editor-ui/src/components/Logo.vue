<template>
	<img :src="basePath + 'sourcify-logo-expanded.svg'" :class="$style.img" alt="sourcify.io" />
</template>

<script lang="ts">
import { useRootStore } from '@/stores/sourcifyRootStore';
import { mapStores } from 'pinia';
import Vue from 'vue';

export default Vue.extend({
	computed: {
		...mapStores(useRootStore),
		basePath(): string {
			return this.rootStore.baseUrl;
		},
	},
});
</script>

<style lang="scss" module>
.img {
	height: 32px;
}
</style>
