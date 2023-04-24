<template>
	<div v-if="featureInfo" :class="[$style.container]">
		<div v-if="showTitle" class="mb-2xl">
			<sourcify-heading size="2xlarge">
				{{ $locale.baseText(featureInfo.featureName) }}
			</sourcify-heading>
		</div>
		<div v-if="featureInfo.infoText" class="mb-l">
			<sourcify-info-tip theme="info" type="note">
				<template>
					<span v-html="$locale.baseText(featureInfo.infoText)"></span>
				</template>
			</sourcify-info-tip>
		</div>
		<div :class="$style.actionBoxContainer">
			<sourcify-action-box
				:description="$locale.baseText(featureInfo.actionBoxDescription)"
				:buttonText="
					$locale.baseText(featureInfo.actionBoxButtonLabel || 'fakeDoor.actionBox.button.label')
				"
				@click="openLinkPage"
			>
				<template #heading>
					<span v-html="$locale.baseText(featureInfo.actionBoxTitle)" />
				</template>
			</sourcify-action-box>
		</div>
	</div>
</template>

<script lang="ts">
import { IFakeDoor } from '@/Interface';
import { useRootStore } from '@/stores/sourcifyRootStore';
import { useSettingsStore } from '@/stores/settings';
import { useUIStore } from '@/stores/ui';
import { useUsersStore } from '@/stores/users';
import { mapStores } from 'pinia';
import Vue from 'vue';

export default Vue.extend({
	name: 'FeatureComingSoon',
	props: {
		featureId: {
			type: String,
			required: true,
		},
		showTitle: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		...mapStores(useRootStore, useSettingsStore, useUIStore, useUsersStore),
		userId(): string {
			return this.usersStore.currentUserId || '';
		},
		instanceId(): string {
			return this.rootStore.instanceId;
		},
		featureInfo(): IFakeDoor | undefined {
			return this.uiStore.getFakeDoorById(this.featureId);
		},
	},
	methods: {
		openLinkPage() {
			if (this.featureInfo) {
				window.open(
					`${this.featureInfo.linkURL}&u=${this.instanceId}#${this.userId}&v=${this.rootStore.versionCli}`,
					'_blank',
				);
				this.$telemetry.track('user clicked feature waiting list button', {
					feature: this.featureId,
				});
			}
		},
	},
});
</script>

<style lang="scss" module>
.actionBoxContainer {
	text-align: center;
}
</style>
