/* eslint-env jest */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import LineStylePopover from './LineStylePopover';
// import {Popover} from '@mui/material';
// import { HexColorPicker } from 'react-colorful';
// import LineStyleEnum from '../../../enum/LineStyleEnum';

describe('LineStylePopover', () => {
	const handleColorChange = jest.fn();
	const handleLineStyleChange = jest.fn();

	const defaultProps = {
		color: '#000000',
		lineStyle: 'solid',
		handleColorChange,
		handleLineStyleChange,
	};

	it('should render without crashing', () => {
		render(<LineStylePopover {...defaultProps} />);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('should show the color picker popover when the icon button is clicked', () => {
		render(<LineStylePopover {...defaultProps} />);
		fireEvent.click(screen.getByRole('button'));
		expect(screen.getByTestId('color-pick')).toBeVisible();
	});

	it('should change the line style when a new radio button is selected', () => {
		render(<LineStylePopover {...defaultProps} />);
		fireEvent.click(screen.getByRole('button'));
		fireEvent.click(screen.getByLabelText('Dotted'));
		expect(handleLineStyleChange).toBeCalledTimes(0);
	});
});
