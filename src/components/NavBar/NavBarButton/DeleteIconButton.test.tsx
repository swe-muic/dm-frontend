/* eslint-env jest */
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import DeleteIconButton from './DeleteIconButton';
import React from 'react';

describe('Navbar Delete Icon Button', () => {
	test('open and close modal', () => {
		render(
			<BrowserRouter>
				<DeleteIconButton />
			</BrowserRouter>,
		);

		act(() => {
			screen.getByTestId('delete-icon-button').click();
		});
		act(() => {
			screen.getByTestId('delete-button').click();
		});
		// eslint-disable-next-line no-undef
		expect(screen.queryByTestId('delete-button')).not.toBeInTheDocument();
	});
});
