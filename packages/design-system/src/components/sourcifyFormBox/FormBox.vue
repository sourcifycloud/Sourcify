<template>
	<div :class="['sourcify-form-box', $style.container]">
		<div v-if="title" :class="$style.heading">
			<sourcify-heading size="xlarge">
				{{ title }}
			</sourcify-heading>
		</div>
		<div :class="$style.inputsContainer">
			<sourcify-form-inputs
				:inputs="inputs"
				:eventBus="formBus"
				:columnView="true"
				@input="onInput"
				@submit="onSubmit"
			/>
		</div>
		<div :class="$style.buttonsContainer" v-if="secondaryButtonText || buttonText">
			<span v-if="secondaryButtonText" :class="$style.secondaryButtonContainer">
				<sourcify-link size="medium" theme="text" @click="onSecondaryButtonClick">
					{{ secondaryButtonText }}
				</sourcify-link>
			</span>
			<sourcify-button
				v-if="buttonText"
				:label="buttonText"
				:loading="buttonLoading"
				size="large"
				@click="onButtonClick"
			/>
		</div>
		<div :class="$style.actionContainer">
			<sourcify-link v-if="redirectText && redirectLink" :to="redirectLink">
				{{ redirectText }}
			</sourcify-link>
		</div>
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import sourcifyFormInputs from '../sourcifyFormInputs';
import sourcifyHeading from '../sourcifyHeading';
import sourcifyLink from '../sourcifyLink';
import sourcifyButton from '../sourcifyButton';
import { createEventBus } from '../../utils';

export default defineComponent({
	name: 'sourcify-form-box',
	components: {
		sourcifyHeading,
		sourcifyFormInputs,
		sourcifyLink,
		sourcifyButton,
	},
	props: {
		title: {
			type: String,
			default: '',
		},
		inputs: {
			type: Array,
			default: () => [],
		},
		buttonText: {
			type: String,
		},
		buttonLoading: {
			type: Boolean,
			default: false,
		},
		secondaryButtonText: {
			type: String,
		},
		redirectText: {
			type: String,
			default: '',
		},
		redirectLink: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			formBus: createEventBus(),
		};
	},
	methods: {
		onInput(e: { name: string; value: string }) {
			this.$emit('input', e);
		},
		onSubmit(e: { [key: string]: string }) {
			this.$emit('submit', e);
		},
		onButtonClick() {
			this.formBus.emit('submit');
		},
		onSecondaryButtonClick(event: Event) {
			this.$emit('secondaryClick', event);
		},
	},
});
</script>

<style lang="scss" module>
.heading {
	display: flex;
	justify-content: center;
	margin-bottom: var(--spacing-xl);
}

.container {
	background-color: var(--color-background-xlight);
	padding: var(--spacing-l);
	border: var(--border-base);
	border-radius: var(--border-radius-large);
	box-shadow: 0px 4px 16px rgba(99, 77, 255, 0.06);
}

.inputsContainer {
	margin-bottom: var(--spacing-xl);
}

.actionContainer {
	display: flex;
	justify-content: center;
}

.buttonsContainer {
	composes: actionContainer;
	margin-bottom: var(--spacing-s);
}

.secondaryButtonContainer {
	flex-grow: 1;
	display: flex;
	align-items: center;
}

.withLabel {
	margin-bottom: var(--spacing-s);
}
</style>
