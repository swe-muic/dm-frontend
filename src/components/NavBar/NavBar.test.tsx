/* eslint-env jest */
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Navbar from './NavBar';
import React from 'react';
import DeleteIconButton from './NavBarButton/DeleteIconButton';
import HomeIconButton from './NavBarButton/HomeIconButton';
import MenuIconButton from './NavBarButton/MenuIconButton';
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

	test('home icon button test', () => {
		render(
			<BrowserRouter>
				<Navbar currentPage='graphs' forceLogin={true} />
			</BrowserRouter>,
		);

		render(
			<BrowserRouter>
				<HomeIconButton />
			</BrowserRouter>,
		);
		const homeButton = screen.getByTestId('home-button');
		expect(homeButton).toBeInTheDocument();
	});

	test('menu icon button test', () => {
		render(
			<BrowserRouter>
				<Navbar currentPage='home' forceLogin={true} />
			</BrowserRouter>,
		);

		render(
			<BrowserRouter>
				<MenuIconButton />
			</BrowserRouter>,
		);
		const homeButton = screen.getByTestId('menu-icon-button');
		expect(homeButton).toBeInTheDocument();
	});
	// TODO :remove skip
	test.skip('delete and modal test', () => {
		render(
			<BrowserRouter>
				<Navbar currentPage='home' forceLogin={true} />
			</BrowserRouter>,
		);
		const saveButton = screen.getByTestId('save-icon-button');
		fireEvent.click(saveButton);
		render(
			<BrowserRouter>
				<DeleteIconButton graphId={0} />
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
