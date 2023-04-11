/* eslint-env jest */
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import MathField, { type MathFieldProps } from './MathField';

describe('Test MathField', () => {
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

	it('should update the equation when the input changes', () => {
		const { getByLabelText } = render(<MathField {...props} />);
		const mathField = getByLabelText(`Equation ${props.index + 1}`);

		fireEvent.input(mathField, {
			target: {
				latex: '2x+3',
			},
		});
	});
});
