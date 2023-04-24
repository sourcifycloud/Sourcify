<template>
	<Modal
		width="540px"
		:title="$locale.baseText('about.aboutsourcify')"
		:eventBus="modalBus"
		:name="ABOUT_MODAL_KEY"
		:center="true"
	>
		<template #content>
			<div :class="$style.container">
				<el-row>
					<el-col :span="8" class="info-name">
						<sourcify-text>{{ $locale.baseText('about.sourcifyVersion') }}</sourcify-text>
					</el-col>
					<el-col :span="16">
						<sourcify-text>{{ rootStore.versionCli }}</sourcify-text>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8" class="info-name">
						<sourcify-text>{{ $locale.baseText('about.sourceCode') }}</sourcify-text>
					</el-col>
					<el-col :span="16">
						<sourcify-link to="https://github.com/sourcifycloud/sourcify">https://github.com/sourcifycloud/sourcify</sourcify-link>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8" class="info-name">
						<sourcify-text>{{ $locale.baseText('about.license') }}</sourcify-text>
					</el-col>
					<el-col :span="16">
						<sourcify-link to="https://github.com/sourcifycloud/sourcify/blob/master/packages/cli/LICENSE.md">
							{{ $locale.baseText('about.sourcifyLicense') }}
						</sourcify-link>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8" class="info-name">
						<sourcify-text>{{ $locale.baseText('about.instanceID') }}</sourcify-text>
					</el-col>
					<el-col :span="16">
						<sourcify-text>{{ rootStore.instanceId }}</sourcify-text>
					</el-col>
				</el-row>
			</div>
		</template>

		<template #footer>
			<div class="action-buttons">
				<sourcify-button @click="closeDialog" float="right" :label="$locale.baseText('about.close')" />
			</div>
		</template>
	</Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Modal from './Modal.vue';
import { ABOUT_MODAL_KEY } from '../constants';
import { mapStores } from 'pinia';
import { useSettingsStore } from '@/stores/settings';
import { useRootStore } from '@/stores/sourcifyRootStore';
import { createEventBus } from '@/event-bus';

export default Vue.extend({
	name: 'About',
	components: {
		Modal,
	},
	data() {
		return {
			ABOUT_MODAL_KEY,
			modalBus: createEventBus(),
		};
	},
	computed: {
		...mapStores(useRootStore, useSettingsStore),
	},
	methods: {
		closeDialog() {
			this.modalBus.emit('close');
		},
	},
});
</script>

<style module lang="scss">
.container > * {
	margin-bottom: var(--spacing-s);
	overflow-wrap: break-word;
}
</style>
