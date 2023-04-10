/* eslint-env jest */
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import HomeIconButton from './HomeIconButton';
import React from 'react';

describe('Navbar', () => {
	test('navigates to home page ', () => {
		render(
			<BrowserRouter>
				<HomeIconButton />
			</BrowserRouter>,
		);
		const homeButton = screen.getByTestId('home-button');
		act(() => {
			fireEvent.click(homeButton);
		});
		expect(window.location.pathname).toBe('/');
	});
});
