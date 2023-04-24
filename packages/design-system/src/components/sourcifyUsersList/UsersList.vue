<template>
	<div>
		<div
			v-for="(user, i) in sortedUsers"
			:key="user.id"
			class="ph-no-capture"
			:class="i === sortedUsers.length - 1 ? $style.itemContainer : $style.itemWithBorder"
			:data-test-id="`user-list-item-${user.email}`"
		>
			<sourcify-user-info v-bind="user" :isCurrentUser="currentUserId === user.id" />
			<div :class="$style.badgeContainer">
				<sourcify-badge v-if="user.isOwner" theme="tertiary" bold>
					{{ t('nds.auth.roles.owner') }}
				</sourcify-badge>
				<slot v-if="!user.isOwner && !readonly" name="actions" :user="user" />
				<sourcify-action-toggle
					v-if="
						!user.isOwner &&
						user.signInType !== 'ldap' &&
						!readonly &&
						getActions(user).length > 0 &&
						actions.length > 0
					"
					placement="bottom"
					:actions="getActions(user)"
					theme="dark"
					@action="(action) => onUserAction(user, action)"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import type { IUser, UserAction } from '../../types';
import sourcifyActionToggle from '../sourcifyActionToggle';
import sourcifyBadge from '../sourcifyBadge';
import sourcifyUserInfo from '../sourcifyUserInfo';
import Locale from '../../mixins/locale';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	name: 'sourcify-users-list',
	mixins: [Locale],
	components: {
		sourcifyActionToggle,
		sourcifyBadge,
		sourcifyUserInfo,
	},
	props: {
		readonly: {
			type: Boolean,
			default: false,
		},
		users: {
			type: Array,
			required: true,
			default(): IUser[] {
				return [];
			},
		},
		currentUserId: {
			type: String,
		},
		actions: {
			type: Array as PropType<UserAction[]>,
			default: () => [],
		},
	},
	computed: {
		sortedUsers(): IUser[] {
			return [...(this.users as IUser[])].sort((a: IUser, b: IUser) => {
				if (!a.email || !b.email) {
					throw new Error('Expected all users to have email');
				}

				// invited users sorted by email
				if (a.isPendingUser && b.isPendingUser) {
					return a.email > b.email ? 1 : -1;
				}

				if (a.isPendingUser) {
					return -1;
				}
				if (b.isPendingUser) {
					return 1;
				}

				if (a.isOwner) {
					return -1;
				}
				if (b.isOwner) {
					return 1;
				}

				if (a.lastName && b.lastName && a.firstName && b.firstName) {
					if (a.lastName !== b.lastName) {
						return a.lastName > b.lastName ? 1 : -1;
					}
					if (a.firstName !== b.firstName) {
						return a.firstName > b.firstName ? 1 : -1;
					}
				}

				return a.email > b.email ? 1 : -1;
			});
		},
	},
	methods: {
		getActions(user: IUser): UserAction[] {
			if (user.isOwner) {
				return [];
			}

			const defaultGuard = () => true;

			return this.actions.filter((action) => (action.guard || defaultGuard)(user));
		},
		onUserAction(user: IUser, action: string): void {
			this.$emit(action, user.id);
		},
	},
});
</script>

<style lang="scss" module>
.itemContainer {
	display: flex;
	padding: var(--spacing-2xs) 0 vaR(--spacing-2xs) 0;

	> *:first-child {
		flex-grow: 1;
	}
}

.itemWithBorder {
	composes: itemContainer;
	border-bottom: var(--border-base);
}

.badgeContainer {
	display: flex;
	align-items: center;

	> * {
		margin-left: var(--spacing-2xs);
	}
}
</style>
