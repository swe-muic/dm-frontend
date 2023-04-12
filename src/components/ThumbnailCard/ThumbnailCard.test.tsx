/* eslint-env jest */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ThumbnailCard from './ThumbnailCard';
import { BrowserRouter } from 'react-router-dom';

describe('ThumbnailCard component', () => {
	test('renders correctly with given props', () => {
		const props = {
			image: 'https://via.placeholder.com/300x200',
			title: 'Example Title',
			linkUrl:
				'https://example.com/?gclid=CjwKCAjwitShBhA6EiwAq3RqAxmfJUdD82AaTq3VdoSi0b1y1rnCZQKtbmPQLumvXJXGULsV13IAZRoCFdEQAvD_BwE',
		};

		const { getByText, getByAltText } = render(
			<BrowserRouter>
				<ThumbnailCard {...props} />
			</BrowserRouter>,
		);

		expect(getByAltText(props.title)).toBeInTheDocument();
		expect(getByText(props.title)).toBeInTheDocument();
	});

	test('navigates to correct URL when clicked', () => {
		const props = {
			image: 'https://via.placeholder.com/300x200',
			title: 'Example Title',
			linkUrl: '/example',
		};

		const { getByRole } = render(
			<BrowserRouter>
				<ThumbnailCard {...props} />
			</BrowserRouter>,
		);

		const card = getByRole('button');
		fireEvent.click(card);

		expect(window.location.pathname).toBe('/example');
	});
});
