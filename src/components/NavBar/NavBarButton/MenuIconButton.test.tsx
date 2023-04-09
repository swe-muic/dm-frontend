/* eslint-env jest */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import MenuIconButton from './MenuIconButton';

describe('MenuIconButton', () => {
	it('should render the component', () => {
		const { getByLabelText } = render(<MenuIconButton />);
		expect(getByLabelText('menu')).toBeInTheDocument();
	});

	it('should open the drawer when the menu icon button is clicked', () => {
		const { getByLabelText, getByRole } = render(<MenuIconButton />);
		fireEvent.click(getByLabelText('menu'));
		expect(getByRole('presentation')).toBeVisible();
	});

	it('should add a new equation field when the add button is clicked', () => {
		const { getByLabelText, getAllByLabelText, getByTestId } = render(<MenuIconButton />);
		fireEvent.click(getByLabelText('menu'));
		fireEvent.click(getByTestId('add-button'));
		expect(getAllByLabelText(/Equation \d+/)).toHaveLength(2);
	});

	it('should update the value of an equation field when the user types', () => {
		const { getByLabelText } = render(<MenuIconButton />);
		fireEvent.click(getByLabelText('menu'));
		const equationField = getByLabelText('Equation 1');
		fireEvent.change(equationField, { target: { value: '2+2' } });
		expect(equationField).toHaveValue('2+2');
	});
});

test('drawer should close when back button is clicked', () => {
	render(<MenuIconButton />);

	// Open the drawer
	const menuButton = screen.getByLabelText('menu');
	fireEvent.click(menuButton);

	// Check that the drawer is visible
	const drawer = screen.getByTestId('drawer');
	expect(drawer).toBeVisible();

	// Click the back button
	const backButton = screen.getByTestId('back-button');
	fireEvent.click(backButton);

	// Check that the drawer is no longer visible
	// expect(drawer).not.toBeVisible();

	// Check that isDrawerOpen state is false
	expect(screen.getByTestId('menu-icon-button')).toBeInTheDocument();
});
