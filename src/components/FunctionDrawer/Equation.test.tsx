/* eslint-env jest */
import { fireEvent, render } from '@testing-library/react';
import Equation, { type FunctionProp } from './Equation';
import LineStyleEnum from '../../enum/LineStyleEnum';
import MathField, { type MathFieldProps } from './MathField/MathField';
import React from 'react';

describe('Equation component', () => {
	const equation: FunctionProp['equation'] = {
		equation: '4x',
		color: 'red',
		lineStyle: LineStyleEnum.SOLID,
		index: 0,
	};

	const handleInputChange = jest.fn();
	const handleColorChange = jest.fn();
	const handleLineStyleChange = jest.fn();

	const mockSetEquation = jest.fn();
	jest.mock('react', () => ({
		...jest.requireActual('react'),
		useState: (initialValue: string) => [initialValue, mockSetEquation],
	}));

	let props: MathFieldProps;

	beforeAll(() => {
		const equation = 'x^2';
		props = {
			equation,
			index: 0,
			handleChange: mockSetEquation,
		};
	});

	beforeEach(() => {
		render(
			// eslint-disable-next-line react/react-in-jsx-scope
			<Equation
				equation={equation}
				index={0}
				handleInputChange={handleInputChange}
				handleColorChange={handleColorChange}
				handleLineStyleChange={handleLineStyleChange}
			/>,
		);
	});

	it('should render the equation input field', () => {
		const { getByLabelText } = render(<MathField {...props} />);
		const mathField = getByLabelText(`Equation ${props.index + 1}`);

		fireEvent.input(mathField, {
			target: {
				latex: '2x+3',
			},
		});

		// // @ts-ignore
		// void userEvent.clear(input);
		// // @ts-ignore
		// void userEvent.type(input, '4x');
		// expect(handleInputChange).toHaveBeenCalledWith('4x');
	});
	//
	// it('should render the line style popover', () => {
	// 	const popoverButton = screen.getByRole('button', { name: /line style/i });
	// 	void userEvent.click(popoverButton);
	//
	// 	const colorOption = screen.getByRole('button', { name: /color/i });
	// 	void userEvent.click(colorOption);
	//
	// 	const blueOption = screen.getByRole('option', { name: /blue/i });
	// 	void userEvent.click(blueOption);
	// 	expect(handleColorChange).toHaveBeenCalledWith('blue');
	//
	// 	const lineStyleOption = screen.getByRole('button', { name: /line style/i });
	// 	void userEvent.click(lineStyleOption);
	//
	// 	const solidOption = screen.getByRole('option', { name: /solid/i });
	// 	void userEvent.click(solidOption);
	// 	expect(handleLineStyleChange).toHaveBeenCalledWith('solid');
	// });
});

// import { fireEvent, render } from '@testing-library/react';
// import Equation, {type FunctionProp} from './Equation';
// import React from 'react';
// import type FunctionInterface from '../../interfaces/FunctionInterface';
// import LineStyleEnum from '../../enum/LineStyleEnum';
// import MathField, {type MathFieldProps} from './MathField/MathField';
//
//
// describe('Equation component', () => {
// 	const mockEquation: FunctionInterface = {
// 		equation: 'y = 4x',
// 		color: 'red',
// 		lineStyle: LineStyleEnum.SOLID,
// 		index: 0,
// 	};
// 	const mockProps: FunctionProp = {
// 		equation: mockEquation,
// 		index: 0,
// 		handleInputChange: jest.fn(),
// 		handleColorChange: jest.fn(),
// 		handleLineStyleChange: jest.fn(),
// 	};
//
// 	const mockSetEquation = jest.fn();
// 	jest.mock('react', () => ({
// 		...jest.requireActual('react'),
// 		useState: (initialValue: string) => [initialValue, mockSetEquation],
// 	}));
//
// 	let props: MathFieldProps;
//
// 	beforeAll(() => {
// 		const equation = 'x^2';
// 		props = {
// 			equation,
// 			index: 0,
// 			handleChange: mockSetEquation,
// 		};
// 	});
//
// 	it('should render the equation and call handleInputChange on input change', () => {
// 		render(<Equation {...mockProps} />);
// 		const { getByLabelText } = render(<MathField {...props} />);
//
//
// 		// Splitting the `toHaveBeenCalledWith` method into two lines
// 		// const handleInputChangeMock = mockProps.handleInputChange;
//
// 	});
//
// 	it('should call handleColorChange when LineStylePopover color is changed', () => {
// 		const { getByLabelText } = render(<Equation {...mockProps} />);
//
// 		// Simulate a color change on the LineStylePopover component
// 		fireEvent.click(getByLabelText('Select color'));
//
// 		// Splitting the `toHaveBeenCalledWith` method into two lines
// 		const handleColorChangeMock = mockProps.handleColorChange;
// 		expect(handleColorChangeMock).toHaveBeenCalledWith(0, 'red');
// 	});
//
// 	it('should call handleLineStyleChange when LineStylePopover line style is changed', () => {
// 		const { getByLabelText } = render(<Equation {...mockProps} />);
//
// 		// Simulate a line style change on the LineStylePopover component
// 		fireEvent.click(getByLabelText('Select line style'));
// 		fireEvent.click(getByLabelText('Dotted'));
//
// 		// Splitting the `toHaveBeenCalledWith` method into two lines
// 		const handleLineStyleChangeMock = mockProps.handleLineStyleChange;
// 		expect(handleLineStyleChangeMock).toHaveBeenCalledWith(0, 'dotted');
// 	});
// });
