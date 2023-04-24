<template>
	<sourcify-select
		:value="value"
		:filterable="true"
		:filterMethod="setFilter"
		:placeholder="placeholder"
		:default-first-option="true"
		:popper-append-to-body="true"
		:popper-class="$style.limitPopperWidth"
		:noDataText="t('nds.userSelect.noMatchingUsers')"
		:size="size"
		@change="onChange"
		@blur="onBlur"
		@focus="onFocus"
	>
		<template #prefix v-if="$slots.prefix">
			<slot name="prefix" />
		</template>
		<sourcify-option
			v-for="user in sortedUsers"
			:key="user.id"
			:value="user.id"
			:class="$style.itemContainer"
			:label="getLabel(user)"
			:disabled="user.disabled"
		>
			<sourcify-user-info v-bind="user" :isCurrentUser="currentUserId === user.id" />
		</sourcify-option>
	</sourcify-select>
</template>

<script lang="ts">
import sourcifyUserInfo from '../sourcifyUserInfo';
import sourcifySelect from '../sourcifySelect';
import sourcifyOption from '../sourcifyOption';
import { IUser } from '../../types';
import Locale from '../../mixins/locale';
import { t } from '../../locale';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	name: 'sourcify-user-select',
	mixins: [Locale],
	components: {
		sourcifyUserInfo,
		sourcifySelect,
		sourcifyOption,
	},
	props: {
		users: {
			type: Array as PropType<IUser[]>,
			default: () => [],
		},
		value: {
			type: String,
			default: '',
		},
		ignoreIds: {
			type: Array as PropType<string[]>,
			default: () => [],
			validator: (ids: string[]) => !ids.find((id) => typeof id !== 'string'),
		},
		currentUserId: {
			type: String,
			default: '',
		},
		placeholder: {
			type: String,
			default: () => t('nds.userSelect.selectUser'),
		},
		size: {
			type: String,
			default: '',
			validator: (value: string): boolean => ['mini', 'small', 'medium', 'large'].includes(value),
		},
	},
	data() {
		return {
			filter: '',
		};
	},
	computed: {
		filteredUsers(): IUser[] {
			return this.users.filter((user) => {
				if (user.isPendingUser || !user.email) {
					return false;
				}

				if (this.ignoreIds.includes(user.id)) {
					return false;
				}

				if (user.fullName) {
					const match = user.fullName.toLowerCase().includes(this.filter.toLowerCase());
					if (match) {
						return true;
					}
				}

				return user.email.includes(this.filter);
			});
		},
		sortedUsers(): IUser[] {
			return [...this.filteredUsers].sort((a: IUser, b: IUser) => {
				if (a.lastName && b.lastName && a.lastName !== b.lastName) {
					return a.lastName > b.lastName ? 1 : -1;
				}
				if (a.firstName && b.firstName && a.firstName !== b.firstName) {
					return a.firstName > b.firstName ? 1 : -1;
				}

				if (!a.email || !b.email) {
					throw new Error('Expected all users to have email');
				}

				return a.email > b.email ? 1 : -1;
			});
		},
	},
	methods: {
		setFilter(value: string) {
			this.filter = value;
		},
		onChange(value: string) {
			this.$emit('input', value);
		},
		onBlur() {
			this.$emit('blur');
		},
		onFocus() {
			this.$emit('focus');
		},
		getLabel(user: IUser) {
			if (!user.fullName) {
				return user.email;
			}

			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			return `${user.fullName} (${user.email})`;
		},
	},
});
</script>

<style lang="scss" module>
.itemContainer {
	--select-option-padding: var(--spacing-2xs) var(--spacing-s);
	--select-option-line-height: 1;
}

:root .limitPopperWidth {
	width: 0;

	li > span {
		text-overflow: ellipsis;
		overflow-x: hidden;
	}
}
</style>
