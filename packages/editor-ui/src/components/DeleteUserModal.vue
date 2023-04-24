<template>
	<Modal
		:name="modalName"
		@enter="onSubmit"
		:title="title"
		:center="true"
		width="460px"
		:eventBus="modalBus"
	>
		<template #content>
			<div>
				<div v-if="isPending">
					<sourcify-text color="text-base">{{
						$locale.baseText('settings.users.confirmUserDeletion')
					}}</sourcify-text>
				</div>
				<div :class="$style.content" v-else>
					<div>
						<sourcify-text color="text-base">{{
							$locale.baseText('settings.users.confirmDataHandlingAfterDeletion')
						}}</sourcify-text>
					</div>
					<el-radio :value="operation" label="transfer" @change="() => setOperation('transfer')">
						<sourcify-text color="text-dark">{{
							$locale.baseText('settings.users.transferWorkflowsAndCredentials')
						}}</sourcify-text>
					</el-radio>
					<div :class="$style.optionInput" v-if="operation === 'transfer'">
						<sourcify-input-label :label="$locale.baseText('settings.users.userToTransferTo')">
							<sourcify-user-select
								:users="usersStore.allUsers"
								:value="transferId"
								:ignoreIds="ignoreIds"
								:currentUserId="usersStore.currentUserId"
								@input="setTransferId"
							/>
						</sourcify-input-label>
					</div>
					<el-radio :value="operation" label="delete" @change="() => setOperation('delete')">
						<sourcify-text color="text-dark">{{
							$locale.baseText('settings.users.deleteWorkflowsAndCredentials')
						}}</sourcify-text>
					</el-radio>
					<div
						:class="$style.optionInput"
						v-if="operation === 'delete'"
						data-test-id="delete-data-input"
					>
						<sourcify-input-label :label="$locale.baseText('settings.users.deleteConfirmationMessage')">
							<sourcify-input
								:value="deleteConfirmText"
								:placeholder="$locale.baseText('settings.users.deleteConfirmationText')"
								@input="setConfirmText"
							/>
						</sourcify-input-label>
					</div>
				</div>
			</div>
		</template>
		<template #footer>
			<sourcify-button
				:loading="loading"
				:disabled="!enabled"
				:label="$locale.baseText('settings.users.delete')"
				@click="onSubmit"
				float="right"
			/>
		</template>
	</Modal>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins';

import { showMessage } from '@/mixins/showMessage';
import Modal from './Modal.vue';
import { IUser } from '../Interface';
import { mapStores } from 'pinia';
import { useUsersStore } from '@/stores/users';
import { createEventBus } from '@/event-bus';

export default mixins(showMessage).extend({
	components: {
		Modal,
	},
	name: 'DeleteUserModal',
	props: {
		modalName: {
			type: String,
		},
		activeId: {
			type: String,
		},
	},
	data() {
		return {
			modalBus: createEventBus(),
			loading: false,
			operation: '',
			deleteConfirmText: '',
			transferId: '',
			ignoreIds: [this.activeId],
		};
	},
	computed: {
		...mapStores(useUsersStore),
		userToDelete(): IUser | null {
			return this.usersStore.getUserById(this.activeId);
		},
		isPending(): boolean {
			return this.userToDelete ? this.userToDelete && !this.userToDelete.firstName : false;
		},
		title(): string {
			const user =
				(this.userToDelete && (this.userToDelete.fullName || this.userToDelete.email)) || '';
			return this.$locale.baseText('settings.users.deleteUser', { interpolate: { user } });
		},
		enabled(): boolean {
			if (this.isPending) {
				return true;
			}
			if (
				this.operation === 'delete' &&
				this.deleteConfirmText === this.$locale.baseText('settings.users.deleteConfirmationText')
			) {
				return true;
			}

			if (this.operation === 'transfer' && this.transferId) {
				return true;
			}

			return false;
		},
	},
	methods: {
		setOperation(operation: string) {
			this.operation = operation;
			this.transferId = '';
		},
		setConfirmText(text: string) {
			this.deleteConfirmText = text;
		},
		setTransferId(id: string) {
			this.transferId = id;
		},
		async onSubmit() {
			try {
				if (!this.enabled) {
					return;
				}

				this.loading = true;

				const params = { id: this.activeId } as { id: string; transferId?: string };
				if (this.operation === 'transfer') {
					params.transferId = this.transferId;
				}

				await this.usersStore.deleteUser(params);

				let message = '';
				if (this.transferId) {
					const transferUser: IUser | null = this.usersStore.getUserById(this.transferId);
					if (transferUser) {
						message = this.$locale.baseText('settings.users.transferredToUser', {
							interpolate: { user: transferUser.fullName || '' },
						});
					}
				}

				this.$showMessage({
					type: 'success',
					title: this.$locale.baseText('settings.users.userDeleted'),
					message,
				});

				this.modalBus.emit('close');
			} catch (error) {
				this.$showError(error, this.$locale.baseText('settings.users.userDeletedError'));
			}
			this.loading = false;
		},
	},
});
</script>

<style lang="scss" module>
.content {
	padding-bottom: var(--spacing-2xs);
	> * {
		margin-bottom: var(--spacing-s);
	}
}

.innerContent {
	> * {
		margin-bottom: var(--spacing-2xs);
	}
}

.optionInput {
	padding-left: var(--spacing-l);
}
</style>
