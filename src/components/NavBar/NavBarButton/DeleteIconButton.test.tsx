/* eslint-env jest */
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import DeleteIconButton from './DeleteIconButton';
import React from 'react';

describe('Navbar Delete Icon Button', () => {
	beforeEach(() => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			json: jest.fn().mockResolvedValue({}),
		});
	});

	test.skip('open and close modal', () => {
		render(
			<BrowserRouter>
				<DeleteIconButton graphId={0} />
			</BrowserRouter>,
		);

		act(() => {
			screen.getByTestId('delete-icon-button').click();
		});
		expect(screen.queryByTestId('delete-button')).toBeVisible();
		act(() => {
			screen.getByTestId('delete-button').click();
		});

		expect(screen.queryByTestId('delete-button')).not.toBeVisible();
	});
});
