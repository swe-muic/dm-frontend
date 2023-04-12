import type { Meta, StoryObj } from '@storybook/react';
import ThumbnailGrid from './ThumbnailGrid';

const meta: Meta<typeof ThumbnailGrid> = {
	title: 'ThumbnailGrid',
	component: ThumbnailGrid,
};

export default meta;

type Story = StoryObj<typeof ThumbnailGrid>;

export const Primary: Story = {
	args: {
		images: [
			{
				image: 'https://via.placeholder.com/500x500.png',
				title: 'Image 1',
				linkUrl:
					'https://example.com/?gclid=CjwKCAjwitShBhA6EiwAq3RqAxmfJUdD82AaTq3VdoSi0b1y1rnCZQKtbmPQLumvXJXGULsV13IAZRoCFdEQAvD_BwE',
			},
			{
				image: 'https://via.placeholder.com/500x500.png',
				title: 'Image 2',
				linkUrl:
					'https://example.com/?gclid=CjwKCAjwitShBhA6EiwAq3RqAxmfJUdD82AaTq3VdoSi0b1y1rnCZQKtbmPQLumvXJXGULsV13IAZRoCFdEQAvD_BwE',
			},
			{
				image: 'https://via.placeholder.com/500x500.png',
				title: 'Image 3',
				linkUrl:
					'https://example.com/?gclid=CjwKCAjwitShBhA6EiwAq3RqAxmfJUdD82AaTq3VdoSi0b1y1rnCZQKtbmPQLumvXJXGULsV13IAZRoCFdEQAvD_BwE',
			},
			{
				image: 'https://via.placeholder.com/500x500.png',
				title: 'Image 4',
				linkUrl:
					'https://example.com/?gclid=CjwKCAjwitShBhA6EiwAq3RqAxmfJUdD82AaTq3VdoSi0b1y1rnCZQKtbmPQLumvXJXGULsV13IAZRoCFdEQAvD_BwE',
			},
			{
				image: 'https://via.placeholder.com/500x500.png',
				title: 'Image 5',
				linkUrl:
					'https://example.com/?gclid=CjwKCAjwitShBhA6EiwAq3RqAxmfJUdD82AaTq3VdoSi0b1y1rnCZQKtbmPQLumvXJXGULsV13IAZRoCFdEQAvD_BwE',
			},
			{
				image: 'https://via.placeholder.com/500x500.png',
				title: 'Image 6',
				linkUrl:
					'https://example.com/?gclid=CjwKCAjwitShBhA6EiwAq3RqAxmfJUdD82AaTq3VdoSi0b1y1rnCZQKtbmPQLumvXJXGULsV13IAZRoCFdEQAvD_BwE',
			},
		],
		columns: 4,
	},
};
