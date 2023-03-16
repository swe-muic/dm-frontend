import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

test('renders learn react link', () => {
	render(<App />);
	const linkElement = screen.getByText(/learn react/i);
	expect(linkElement).toBeInTheDocument();
});

test('test onClick', () => {
	render(<App />);
	act(() => {
		screen.getByRole('button').click();
	});
	// const
	expect(screen.getByTestId('app-res')).toHaveTextContent('4');
});
