/* eslint-env jest */
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import MathField, { type MathFieldProps } from './MathField';

describe('Test MathField', () => {
	it('should update the equation when the input changes', () => {
		let equation = 'x^2';
		const handleChange = jest.fn((index: number, value: string) => {
			equation = value;
		});
		const props: MathFieldProps = {
			equation,
			index: 0,
			handleChange,
		};
		const { getByLabelText } = render(<MathField {...props} />);
		const mathField = getByLabelText(`Equation ${props.index + 1}`);
		const input = mathField.querySelector('span > textarea') as HTMLTextAreaElement;

		fireEvent.change(input, { target: { value: '2x+3' } });
	});
});
