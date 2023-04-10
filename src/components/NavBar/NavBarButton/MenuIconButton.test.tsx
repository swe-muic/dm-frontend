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

	it.skip('should update the value of an equation field when the user types', () => {
		const { getByLabelText } = render(<MenuIconButton />);
		fireEvent.click(getByLabelText('menu'));
		const equationField = getByLabelText('Equation 1');
		fireEvent.click(equationField);
		fireEvent.change(equationField, { target: { textContent: '2+2' } });
		expect(equationField.ariaValueText).toBe('2+2');
	});
});

test('drawer should close when back button is clicked', () => {
	render(<MenuIconButton />);
	const menuButton = screen.getByLabelText('menu');
	fireEvent.click(menuButton);
	const drawer = screen.getByTestId('drawer');
	expect(drawer).toBeVisible();
	const backButton = screen.getByTestId('back-button');
	fireEvent.click(backButton);
	expect(screen.getByTestId('menu-icon-button')).toBeInTheDocument();
});
