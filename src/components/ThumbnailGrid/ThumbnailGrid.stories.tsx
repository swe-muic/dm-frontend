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
			},
			{
				image: 'https://via.placeholder.com/500x500.png',
				title: 'Image 2',
			},
			{
				image: 'https://via.placeholder.com/500x500.png',
				title: 'Image 3',
			},
			{
				image: 'https://via.placeholder.com/500x500.png',
				title: 'Image 4',
			},
			{
				image: 'https://via.placeholder.com/500x500.png',
				title: 'Image 5',
			},
			{
				image: 'https://via.placeholder.com/500x500.png',
				title: 'Image 6',
			},
		],
		columns: 4,
	},
};
