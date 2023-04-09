/* eslint-env jest */
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import UserIconButton from './UserIconButton';
import React from 'react';

describe('Navbar', () => {
	test('navigates to login page on login/register click', () => {
		render(
			<BrowserRouter>
				<UserIconButton />
			</BrowserRouter>,
		);
		const paned = screen.getByTestId('user-icon-button');
		fireEvent.click(paned);
		const mygraph = screen.getByTestId('my-graph-button');

		act(() => {
			fireEvent.click(mygraph);
		});
		expect(window.location.pathname).toBe('/graphs');
	});
});

describe('UserIconButton component', () => {
	it('closes the menu when clicked outside the component', () => {
		render(
			<BrowserRouter>
				<UserIconButton />
			</BrowserRouter>,
		);
		const userIconButton = screen.getByTestId('user-icon-button');
		fireEvent.click(userIconButton);
		expect(screen.getByText('My Graph')).toBeVisible();
		fireEvent.click(userIconButton);
		expect(screen.queryByText('My Graph')).not.toBeVisible();
	});
});
