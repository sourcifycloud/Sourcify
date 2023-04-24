<template>
	<div class="ph-no-capture" :class="classes">
		<div :class="$style.avatarContainer">
			<sourcify-avatar :firstName="firstName" :lastName="lastName" />
		</div>

		<div v-if="isPendingUser" :class="$style.pendingUser">
			<sourcify-text :bold="true">{{ email }}</sourcify-text>
			<span :class="$style.pendingBadge"><sourcify-badge :bold="true">Pending</sourcify-badge></span>
		</div>
		<div v-else :class="$style.infoContainer">
			<div>
				<sourcify-text :bold="true" color="text-dark">
					{{ firstName }} {{ lastName }}
					{{ isCurrentUser ? t('nds.userInfo.you') : '' }}
				</sourcify-text>
				<span v-if="disabled" :class="$style.pendingBadge">
					<sourcify-badge :bold="true">Disabled</sourcify-badge>
				</span>
			</div>
			<div>
				<sourcify-text size="small" color="text-light">{{ email }}</sourcify-text>
			</div>
			<div v-if="!isOwner">
				<sourcify-text v-if="signInType" size="small" color="text-light">
					Sign-in type: {{ signInType }}
				</sourcify-text>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import sourcifyText from '../sourcifyText';
import sourcifyAvatar from '../sourcifyAvatar';
import sourcifyBadge from '../sourcifyBadge';
import Locale from '../../mixins/locale';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'sourcify-users-info',
	mixins: [Locale],
	components: {
		sourcifyAvatar,
		sourcifyText,
		sourcifyBadge,
	},
	props: {
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		email: {
			type: String,
		},
		isOwner: {
			type: Boolean,
		},
		isPendingUser: {
			type: Boolean,
		},
		isCurrentUser: {
			type: Boolean,
		},
		disabled: {
			type: Boolean,
		},
		signInType: {
			type: String,
			required: false,
		},
	},
	computed: {
		classes(): Record<string, boolean> {
			return {
				[this.$style.container]: true,
				[this.$style.disabled]: this.disabled,
			};
		},
	},
});
</script>

<style lang="scss" module>
.container {
	display: inline-flex;
	overflow: hidden;
}

.avatarContainer {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	color: var(--color-text-light);
}

.infoContainer {
	flex-grow: 1;
	display: inline-flex;
	flex-direction: column;
	justify-content: center;
	margin-left: var(--spacing-xs);
}

.pendingUser {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	margin-left: var(--spacing-xs);
}

.pendingBadge {
	margin-left: var(--spacing-xs);
}

.disabled {
	opacity: 0.5;
}
</style>
