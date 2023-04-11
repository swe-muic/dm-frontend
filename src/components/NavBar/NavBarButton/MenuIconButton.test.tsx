/* eslint-env jest */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import MenuIconButton from './MenuIconButton';
import type FunctionInterface from '@/interfaces/FunctionInterface';
describe('MenuIconButton', () => {
	const component = <MenuIconButton equations={[]} setEquations={jest.fn} />;

	it('should render the component', () => {
		const { getByLabelText } = render(component);
		expect(getByLabelText('menu')).toBeInTheDocument();
	});

	it('should open the drawer when the menu icon button is clicked', () => {
		const { getByLabelText, getByRole } = render(component);
		fireEvent.click(getByLabelText('menu'));
		expect(getByRole('presentation')).toBeVisible();
	});

	it('should add a new equation field when the add button is clicked', () => {
		const mockSetEquation = jest.fn();
		jest.mock('react', () => ({
			...jest.requireActual('react'),
			useState: (initialValue: FunctionInterface) => [initialValue, mockSetEquation],
		}));

		const { getByLabelText, getByTestId } = render(<MenuIconButton equations={[]} setEquations={mockSetEquation} />);

		fireEvent.click(getByLabelText('menu'));
		fireEvent.click(getByTestId('add-button'));
		expect(mockSetEquation).toHaveBeenCalled();
	});

	it('drawer should close when back button is clicked', () => {
		render(component);
		const menuButton = screen.getByLabelText('menu');
		fireEvent.click(menuButton);
		const drawer = screen.getByTestId('drawer');
		expect(drawer).toBeVisible();
		const backButton = screen.getByTestId('back-button');
		fireEvent.click(backButton);
		expect(screen.getByTestId('menu-icon-button')).toBeInTheDocument();
	});
});
