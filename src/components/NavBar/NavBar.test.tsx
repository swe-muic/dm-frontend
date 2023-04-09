/* eslint-env jest */
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Navbar from './NavBar';
import React from 'react';

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
		const loginRegisButton = screen.getByTestId('delete-icon-button');

		act(() => {
			fireEvent.click(loginRegisButton);
		});
		expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
	});

	test('delete and modal test and close it', () => {
		render(
			<BrowserRouter>
				<Navbar currentPage='home' forceLogin={true} />
			</BrowserRouter>,
		);
		act(() => {
			screen.getByTestId('save-icon-button').click();
		});
		act(() => {
			screen.getByTestId('delete-icon-button').click();
		});
		act(() => {
			screen.getByTestId('delete-button').click();
		});
		// eslint-disable-next-line no-undef
		expect(screen.queryByTestId('delete-button')).not.toBeInTheDocument();
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
