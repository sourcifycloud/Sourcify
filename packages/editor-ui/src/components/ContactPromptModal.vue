<template>
	<Modal
		:name="modalName"
		:eventBus="modalBus"
		:center="true"
		:closeOnPressEscape="false"
		:beforeClose="closeDialog"
		customClass="contact-prompt-modal"
		width="460px"
	>
		<template #header>
			<sourcify-heading tag="h2" size="xlarge" color="text-dark">{{ title }}</sourcify-heading>
		</template>
		<template #content>
			<div :class="$style.description">
				<sourcify-text size="medium" color="text-base">{{ description }}</sourcify-text>
			</div>
			<div @keyup.enter="send">
				<sourcify-input v-model="email" placeholder="Your email address" />
			</div>
			<div :class="$style.disclaimer">
				<sourcify-text size="small" color="text-base"
					>David from our product team will get in touch personally</sourcify-text
				>
			</div>
		</template>
		<template #footer>
			<div :class="$style.footer">
				<sourcify-button label="Send" float="right" @click="send" :disabled="!isEmailValid" />
			</div>
		</template>
	</Modal>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins';

import { IsourcifyPromptResponse } from '@/Interface';
import { VALID_EMAIL_REGEX } from '@/constants';
import { workflowHelpers } from '@/mixins/workflowHelpers';
import Modal from './Modal.vue';
import { mapStores } from 'pinia';
import { useSettingsStore } from '@/stores/settings';
import { useRootStore } from '@/stores/sourcifyRootStore';
import { createEventBus } from '@/event-bus';

export default mixins(workflowHelpers).extend({
	components: { Modal },
	name: 'ContactPromptModal',
	props: ['modalName'],
	data() {
		return {
			email: '',
			modalBus: createEventBus(),
		};
	},
	computed: {
		...mapStores(useRootStore, useSettingsStore),
		title(): string {
			if (this.settingsStore.promptsData && this.settingsStore.promptsData.title) {
				return this.settingsStore.promptsData.title;
			}

			return 'You’re a power user 💪';
		},
		description(): string {
			if (this.settingsStore.promptsData && this.settingsStore.promptsData.message) {
				return this.settingsStore.promptsData.message;
			}

			return 'Your experience with sourcify can help us improve — for you and our entire community.';
		},
		isEmailValid(): boolean {
			return VALID_EMAIL_REGEX.test(String(this.email).toLowerCase());
		},
	},
	methods: {
		closeDialog(): void {
			if (!this.isEmailValid) {
				this.$telemetry.track('User closed email modal', {
					instance_id: this.rootStore.instanceId,
					email: null,
				});
			}
		},
		async send() {
			if (this.isEmailValid) {
				const response = (await this.settingsStore.submitContactInfo(
					this.email,
				)) as IsourcifyPromptResponse;

				if (response.updated) {
					this.$telemetry.track('User closed email modal', {
						instance_id: this.rootStore.instanceId,
						email: this.email,
					});
					this.$showMessage({
						title: 'Thanks!',
						message: "It's people like you that help make sourcify better",
						type: 'success',
					});
				}
				this.modalBus.emit('close');
			}
		},
	},
});
</script>

<style lang="scss" module>
.description {
	margin-bottom: var(--spacing-s);
}

.disclaimer {
	margin-top: var(--spacing-4xs);
}
</style>

<style lang="scss">
.dialog-wrapper {
	.contact-prompt-modal {
		.el-dialog__body {
			padding: 16px 24px 24px;
		}
	}
}
</style>
