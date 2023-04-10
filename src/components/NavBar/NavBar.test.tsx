/* eslint-env jest */
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Navbar, { getBackgroundColor } from './NavBar';
import React from 'react';
import DeleteIconButton from './NavBarButton/DeleteIconButton';
describe('Navbar', () => {
	test('navigates to login page on login/register click', () => {
		render(
			<BrowserRouter>
				<Navbar currentPage='home' />
			</BrowserRouter>,
		);
		const loginRegisButton = screen.getByTestId('login-button');

		act(() => {
			fireEvent.click(loginRegisButton);
		});
		expect(window.location.pathname).toBe('/login');
	});

	test('delete and modal test', () => {
		render(
			<BrowserRouter>
				<Navbar currentPage='home' forceLogin={true} />
			</BrowserRouter>,
		);
		const saveButton = screen.getByTestId('save-icon-button');
		fireEvent.click(saveButton);
		render(
			<BrowserRouter>
				<DeleteIconButton />
			</BrowserRouter>,
		);
		const deleteButton = screen.getByTestId('delete-icon-button');

		expect(deleteButton).toBeVisible();
	});

	test('test text field at edit graph', () => {
		render(
			<BrowserRouter>
				<Navbar currentPage='home' forceLogin={true} />
			</BrowserRouter>,
		);

		fireEvent.doubleClick(screen.getByTestId('graph-name-text-button'));

		fireEvent.change(screen.getByTestId('text-display-input'), { target: { value: 'Hello World' } });

		act(() => {
			screen.getByTestId('edit-icon-button').click();
		});

		expect(screen.getByRole('button', { name: 'Hello World' })).toBeInTheDocument();
	});

	describe('getBackgroundColor', () => {
		it('should return #043551 when currentPage is home', () => {
			// Set up test data
			const currentPage = 'home';

			// Call the function and assert the result
			expect(getBackgroundColor(currentPage)).toBe('#043551');
		});

		it('should return #494B4D when currentPage is not home', () => {
			// Set up test data
			const currentPage = 'about';

			// Call the function and assert the result
			expect(getBackgroundColor(currentPage)).toBe('#494B4D');
		});
	});
});
