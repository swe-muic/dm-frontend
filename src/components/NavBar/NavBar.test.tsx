/* eslint-env jest */
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Navbar from './NavBar';
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
});
