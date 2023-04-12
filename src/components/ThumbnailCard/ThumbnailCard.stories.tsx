import type { Meta, StoryObj } from '@storybook/react';
import ThumbnailCard from './ThumbnailCard';

const meta: Meta<typeof ThumbnailCard> = {
	title: 'ThumbnailCard',
	component: ThumbnailCard,
};

export default meta;

type Story = StoryObj<typeof ThumbnailCard>;

export const Primary: Story = {
	args: {
		image: 'https://via.placeholder.com/300',
		title: 'Example Title',
		linkUrl:
			'https://example.com/?gclid=CjwKCAjwitShBhA6EiwAq3RqAxmfJUdD82AaTq3VdoSi0b1y1rnCZQKtbmPQLumvXJXGULsV13IAZRoCFdEQAvD_BwE',
	},
};
