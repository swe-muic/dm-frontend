/* eslint-env jest */
import React from 'react';
import { render, screen } from '@testing-library/react';
import ThumbnailGrid from './ThumbnailGrid';

describe('ThumbnailGrid', () => {
	const images = [
		{
			image: 'https://picsum.photos/300/200?random=1',
			title: 'Image 1',
		},
		{
			image: 'https://picsum.photos/300/200?random=2',
			title: 'Image 2',
		},
		{
			image: 'https://picsum.photos/300/200?random=3',
			title: 'Image 3',
		},
	];

	it('renders the correct number of images', () => {
		render(<ThumbnailGrid images={images} />);
		const imageElements = screen.getAllByRole('img');
		expect(imageElements).toHaveLength(images.length);
	});

	it('renders the correct image titles', () => {
		render(<ThumbnailGrid images={images} />);
		const titleElements = screen.getAllByText(/Image \d/);
		expect(titleElements).toHaveLength(images.length);
		images.forEach((image, index) => {
			expect(titleElements[index]).toHaveTextContent(image.title);
		});
	});
});
