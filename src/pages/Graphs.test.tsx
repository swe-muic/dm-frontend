/* eslint-env jest */
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Graphs from './Graphs';
import React from 'react';
import { act } from 'react-dom/test-utils';

jest.mock('../services/minio/RetrieveObjectService');
jest.mock('../services/minio/InsertObjectService');

it('renders the Navbar component with the currentPage prop set to "home"', () => {
	render(
		<BrowserRouter>
			<Graphs />
		</BrowserRouter>,
	);
	const homeButton = screen.getByTestId('sign-out');
	act(() => {
		fireEvent.click(homeButton);
	});
	expect(window.location.pathname).toBe('/');
});
