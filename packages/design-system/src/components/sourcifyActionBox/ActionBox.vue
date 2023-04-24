<template>
	<div :class="['sourcify-action-box', $style.container]" data-test-id="action-box">
		<div :class="$style.emoji" v-if="emoji">
			{{ emoji }}
		</div>
		<div :class="$style.heading" v-if="heading || $slots.heading">
			<sourcify-heading size="xlarge" align="center">
				<slot name="heading">{{ heading }}</slot>
			</sourcify-heading>
		</div>
		<div :class="$style.description" @click="$emit('descriptionClick', $event)">
			<sourcify-text color="text-base">
				<slot name="description">
					<span v-html="description"></span>
				</slot>
			</sourcify-text>
		</div>
		<sourcify-button
			v-if="buttonText"
			:label="buttonText"
			:type="buttonType"
			size="large"
			@click="$emit('click', $event)"
		/>
		<sourcify-callout
			v-if="calloutText"
			:theme="calloutTheme"
			:icon="calloutIcon"
			:class="$style.callout"
		>
			<template>
				<sourcify-text color="text-base">
					<span size="small" v-html="calloutText"></span>
				</sourcify-text>
			</template>
		</sourcify-callout>
	</div>
</template>

<script lang="ts">
import sourcifyButton from '../sourcifyButton';
import sourcifyHeading from '../sourcifyHeading';
import sourcifyText from '../sourcifyText';
import sourcifyCallout from '../sourcifyCallout';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'sourcify-action-box',
	components: {
		sourcifyButton,
		sourcifyHeading,
		sourcifyText,
		sourcifyCallout,
	},
	props: {
		emoji: {
			type: String,
		},
		heading: {
			type: String,
		},
		buttonText: {
			type: String,
		},
		buttonType: {
			type: String,
		},
		description: {
			type: String,
		},
		calloutText: {
			type: String,
		},
		calloutTheme: {
			type: String,
			default: 'info',
		},
		calloutIcon: {
			type: String,
		},
	},
});
</script>

<style lang="scss" module>
.container {
	border: 2px dashed var(--color-foreground-base);
	border-radius: var(--border-radius-large);
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: var(--spacing-3xl);

	> * {
		margin-bottom: var(--spacing-l);

		&:last-child {
			margin-bottom: 0;
		}
	}
}

.emoji {
	font-size: 40px;
}

.heading {
	margin-bottom: var(--spacing-l);
	text-align: center;
}

.description {
	color: var(--color-text-base);
	margin-bottom: var(--spacing-xl);
	text-align: center;
}

.callout {
	width: 100%;
	text-align: left;
}
</style>
