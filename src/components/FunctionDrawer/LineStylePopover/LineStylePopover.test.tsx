/* eslint-env jest */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import LineStylePopover, { type LineStyleProp } from './LineStylePopover';
// import {HexColorPicker} from 'react-colorful';
// import userEvent from '@testing-library/user-event';

// import {Popover} from '@mui/material';
// import { HexColorPicker } from 'react-colorful';
import LineStyleEnum from '../../../enum/LineStyleEnum';
// import PropTypes from 'prop-types';
// import {HexColorPicker} from 'react-colorful';
//

describe('LineStylePopover', () => {
	const handleColorChange = jest.fn();
	const handleLineStyleChange = jest.fn();

	const defaultProps1 = {
		color: '#000000',
		lineStyle: 'solid',
		handleColorChange,
		handleLineStyleChange,
	};

	// selector-button
	it('should render without crashing', () => {
		render(<LineStylePopover {...defaultProps1} />);
		const button = screen.getByTestId('selector-button');
		fireEvent.click(button);
		expect(screen.getByTestId('color-pick')).toBeVisible();
		fireEvent.click(screen.getByTestId('selector-button'));
		expect(handleColorChange).not.toHaveBeenCalled();
	});

	it('should render without crashing', () => {
		render(<LineStylePopover {...defaultProps1} />);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});
});
let color = '#000000';
const mockHandleColorChange = jest.fn((value: string) => {
	color = value;
});
const mockHandleLineStyleChange = jest.fn();

const defaultProps: LineStyleProp = {
	color,
	lineStyle: LineStyleEnum.SOLID,
	handleColorChange: mockHandleColorChange,
	handleLineStyleChange: mockHandleLineStyleChange,
};

describe('LineStylePopover', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders color selector button', () => {
		render(<LineStylePopover {...defaultProps} />);
		const buttonElement = screen.getByTestId('selector-button');
		expect(buttonElement).toBeInTheDocument();
	});

	test('renders color wheel inside popover', () => {
		render(<LineStylePopover {...defaultProps} />);
		const buttonElement = screen.getByTestId('selector-button');
		fireEvent.click(buttonElement);
		const colorWheelElement = screen.getByTestId('color-wheel');
		expect(colorWheelElement).toBeInTheDocument();
	});

	test('renders radio buttons inside popover', () => {
		render(<LineStylePopover {...defaultProps} />);
		const buttonElement = screen.getByTestId('selector-button');
		fireEvent.click(buttonElement);
		const solidRadioElement = screen.getByLabelText('Solid');
		const dottedRadioElement = screen.getByLabelText('Dotted');
		expect(solidRadioElement).toBeInTheDocument();
		expect(dottedRadioElement).toBeInTheDocument();
	});

	test('calls handleLineStyleChange function when line style is changed', () => {
		render(<LineStylePopover {...defaultProps} />);
		const buttonElement = screen.getByTestId('selector-button');
		fireEvent.click(buttonElement);
		const dottedRadioElement = screen.getByLabelText('Dotted');
		fireEvent.click(dottedRadioElement);
		expect(mockHandleLineStyleChange).toHaveBeenCalledWith(LineStyleEnum.DOTTED);
	});

	test('handles color change correctly', () => {
		const { getByTestId } = render(<LineStylePopover {...defaultProps} />);

		const buttonElement = screen.getByTestId('selector-button');
		fireEvent.click(buttonElement);
		const input = getByTestId('color-input');
		fireEvent.change(input, { target: { value: '#ffffff' } });
	});

	let color2 = '#ffffff';
	const mockHandleColorChange2 = jest.fn((value: string) => {
		color2 = value;
	});
	const mockHandleLineStyleChange2 = jest.fn();

	const defaultProps2: LineStyleProp = {
		color: color2,
		lineStyle: LineStyleEnum.SOLID,
		handleColorChange: mockHandleColorChange2,
		handleLineStyleChange: mockHandleLineStyleChange2,
	};

	test('handles color change correctly', () => {
		const { getByTestId } = render(<LineStylePopover {...defaultProps2} />);

		const buttonElement = screen.getByTestId('selector-button');
		fireEvent.click(buttonElement);
		const input = getByTestId('color-wheel');
		fireEvent.click(input);
	});
});
