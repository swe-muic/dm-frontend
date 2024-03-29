/* eslint-env jest */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import MathField, { type MathFieldProps } from './MathField';

describe('Test MathField', () => {
	it('should update the equation when the input changes', () => {
		let equation = 'x^2';
		const handleChange = jest.fn((value: string) => {
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

	let equation = '2x + 3 = 7';
	const handleChange = jest.fn((value: string) => {
		equation = value;
	});
	const props: MathFieldProps = {
		equation,
		index: 0,
		handleChange,
	};

	it('renders an EditableMathField with the given equation', () => {
		render(<MathField {...props} />);
		const mathField = screen.getByRole('textbox');
		expect(mathField).toBeInTheDocument();
	});
});
