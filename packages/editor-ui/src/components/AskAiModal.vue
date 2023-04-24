<template>
	<Modal
		width="460px"
		:center="true"
		:eventBus="modalBus"
		:name="ASK_AI_MODAL_KEY"
		:title="$locale.baseText('askAi.dialog.title')"
	>
		<template #content>
			<sourcify-text v-html="$locale.baseText('askAi.dialog.body')"></sourcify-text>
		</template>

		<template #footer>
			<sourcify-link :to="ASK_AI_WAITLIST_URL">
				<sourcify-button
					float="right"
					:label="$locale.baseText('askAi.dialog.signup')"
					@click="onAskAiWaitlistClick"
				/>
			</sourcify-link>
		</template>
	</Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Modal from './Modal.vue';
import { ASK_AI_MODAL_KEY, ASK_AI_WAITLIST_URL } from '../constants';
import { createEventBus } from '@/event-bus';

export default Vue.extend({
	name: 'AskAI',
	components: {
		Modal,
	},
	data() {
		return {
			ASK_AI_WAITLIST_URL,
			ASK_AI_MODAL_KEY,
			modalBus: createEventBus(),
		};
	},
	methods: {
		onAskAiWaitlistClick() {
			this.$telemetry.track('User clicked join waitlist', { source: 'ask-ai-code' });
			this.modalBus.emit('close');
		},
	},
});
</script>

<style module lang="scss"></style>
