import sourcifyPulse from './Pulse.vue';
import type { StoryFn } from '@storybook/vue';

export default {
	title: 'Atoms/Pulse',
	component: sourcifyPulse,
	argTypes: {},
	parameters: {
		backgrounds: { default: '--color-background-light' },
	},
};

export const Default: StoryFn = () => ({
	components: {
		sourcifyPulse,
	},
	template: '<sourcify-pulse> yo </sourcify-pulse>',
});
