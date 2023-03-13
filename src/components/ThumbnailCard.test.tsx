/* eslint-env jest */
import React from 'react';
import { render } from '@testing-library/react';
import ThumbnailCard from './ThumbnailCard';

describe('ThumbnailCard component', () => {
	test('renders correctly with given props', () => {
		const props = {
			image: 'https://via.placeholder.com/300x200',
			title: 'Example Title',
			description: 'Example Description',
		};

		const { getByText, getByAltText } = render(<ThumbnailCard {...props} />);

		expect(getByAltText(props.title)).toBeInTheDocument();
		expect(getByText(props.title)).toBeInTheDocument();
		expect(getByText(props.description)).toBeInTheDocument();
	});
});
