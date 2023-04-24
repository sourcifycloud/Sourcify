<script lang="ts" setup>
import { computed, ref, onBeforeMount } from 'vue';
import { Notification } from 'element-ui';
import { useSSOStore } from '@/stores/sso';
import { useUsageStore } from '@/stores/usage';
import { useUIStore } from '@/stores/ui';
import { i18n as locale } from '@/plugins/i18n';
import CopyInput from '@/components/CopyInput.vue';

const ssoStore = useSSOStore();
const usageStore = useUsageStore();
const uiStore = useUIStore();

const ssoActivatedLabel = computed(() =>
	ssoStore.isSamlLoginEnabled
		? locale.baseText('settings.sso.activated')
		: locale.baseText('settings.sso.deactivated'),
);
const ssoSettingsSaved = ref(false);
const metadata = ref();
const redirectUrl = ref();
const entityId = ref();

const getSamlConfig = async () => {
	const config = await ssoStore.getSamlConfig();
	entityId.value = config?.entityID;
	redirectUrl.value = config?.returnUrl;
	metadata.value = config?.metadata;
	ssoSettingsSaved.value = !!config?.metadata;
};

const onSave = async () => {
	try {
		await ssoStore.saveSamlConfig({ metadata: metadata.value });
		await getSamlConfig();
	} catch (error) {
		Notification.error({
			title: 'Error',
			message: error.message,
			position: 'bottom-right',
		});
	}
};

const onTest = async () => {
	try {
		const url = await ssoStore.testSamlConfig();
		window.open(url, '_blank');
	} catch (error) {
		Notification.error({
			title: 'Error',
			message: error.message,
			position: 'bottom-right',
		});
	}
};

const goToUpgrade = () => {
	uiStore.goToUpgrade('sso', 'upgrade-sso`');
};

onBeforeMount(async () => {
	if (!ssoStore.isEnterpriseSamlEnabled) {
		return;
	}
	try {
		await getSamlConfig();
	} catch (error) {
		Notification.error({
			title: 'Error',
			message: error.message,
			position: 'bottom-right',
		});
	}
});
</script>

<template>
	<div>
		<sourcify-heading size="2xlarge">{{ locale.baseText('settings.sso.title') }}</sourcify-heading>
		<div :class="$style.top">
			<sourcify-heading size="medium">{{ locale.baseText('settings.sso.subtitle') }}</sourcify-heading>
			<sourcify-tooltip v-if="ssoStore.isEnterpriseSamlEnabled" :disabled="ssoStore.isSamlLoginEnabled">
				<template #content>
					<span>
						{{ locale.baseText('settings.sso.activation.tooltip') }}
					</span>
				</template>
				<el-switch
					v-model="ssoStore.isSamlLoginEnabled"
					:disabled="!ssoSettingsSaved"
					:class="$style.switch"
					:inactive-text="ssoActivatedLabel"
				/>
			</sourcify-tooltip>
		</div>
		<sourcify-info-tip>
			<i18n :class="$style.count" path="settings.sso.info">
				<template #link>
					<a href="https://docs.sourcify.io/user-management/saml/" target="_blank">
						{{ locale.baseText('settings.sso.info.link') }}
					</a>
				</template>
			</i18n>
		</sourcify-info-tip>
		<div v-if="ssoStore.isEnterpriseSamlEnabled" data-test-id="sso-content-licensed">
			<div :class="$style.group">
				<label>{{ locale.baseText('settings.sso.settings.redirectUrl.label') }}</label>
				<CopyInput
					:class="$style.copyInput"
					:value="redirectUrl"
					:copy-button-text="locale.baseText('generic.clickToCopy')"
					:toast-title="locale.baseText('settings.sso.settings.redirectUrl.copied')"
				/>
				<small>{{ locale.baseText('settings.sso.settings.redirectUrl.help') }}</small>
			</div>
			<div :class="$style.group">
				<label>{{ locale.baseText('settings.sso.settings.entityId.label') }}</label>
				<CopyInput
					:class="$style.copyInput"
					:value="entityId"
					:copy-button-text="locale.baseText('generic.clickToCopy')"
					:toast-title="locale.baseText('settings.sso.settings.entityId.copied')"
				/>
				<small>{{ locale.baseText('settings.sso.settings.entityId.help') }}</small>
			</div>
			<div :class="$style.group">
				<label>{{ locale.baseText('settings.sso.settings.ips.label') }}</label>
				<sourcify-input v-model="metadata" type="textarea" name="metadata" />
				<small>{{ locale.baseText('settings.sso.settings.ips.help') }}</small>
			</div>
			<div :class="$style.buttons">
				<sourcify-button
					:disabled="!ssoSettingsSaved"
					type="tertiary"
					@click="onTest"
					data-test-id="sso-test"
				>
					{{ locale.baseText('settings.sso.settings.test') }}
				</sourcify-button>
				<sourcify-button :disabled="!metadata" @click="onSave" data-test-id="sso-save">
					{{ locale.baseText('settings.sso.settings.save') }}
				</sourcify-button>
			</div>
		</div>
		<sourcify-action-box
			v-else
			data-test-id="sso-content-unlicensed"
			:class="$style.actionBox"
			:description="locale.baseText('settings.sso.actionBox.description')"
			:buttonText="locale.baseText('settings.sso.actionBox.buttonText')"
			@click="goToUpgrade"
		>
			<template #heading>
				<span>{{ locale.baseText('settings.sso.actionBox.title') }}</span>
			</template>
		</sourcify-action-box>
	</div>
</template>

<style lang="scss" module>
.top {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--spacing-2xl) 0 var(--spacing-xl);
}

.switch {
	span {
		font-size: var(--font-size-2xs);
		font-weight: var(--font-weight-bold);
		color: var(--color-text-light);
	}
}

.buttons {
	display: flex;
	justify-content: flex-start;
	padding: var(--spacing-2xl) 0 var(--spacing-3xl);

	button {
		margin: 0 var(--spacing-s) 0 0;
	}
}

.group {
	padding: var(--spacing-xl) 0 0;

	label {
		display: inline-block;
		font-size: var(--font-size-s);
		font-weight: var(--font-weight-bold);
		padding: 0 0 var(--spacing-2xs);
	}

	small {
		display: block;
		padding: var(--spacing-2xs) 0 0;
		font-size: var(--font-size-2xs);
		color: var(--color-text-base);
	}
}

.actionBox {
	margin: var(--spacing-2xl) 0 0;
}
</style>
