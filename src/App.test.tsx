import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

test('renders learn react link', () => {
	render(<App />);
	const linkElement = screen.getByText(/This is the home page/i);
	expect(linkElement).toBeInTheDocument();
});

test('test onClick', () => {
	render(<App />);
	act(() => {
		screen.getByTestId('app-button').click();
	});
	// const
	expect(screen.getByTestId('app-res')).toHaveTextContent('4');
});
