import { addStyles, EditableMathField } from 'react-mathquill';
import React from 'react';
import MathTextFieldStyle from '../../../style/MathTextField';

addStyles();

export interface MathFieldProps {
	equation: string;
	index: number;
	handleChange: (index: number, value: string) => void;
}

function MathField(props: MathFieldProps): React.ReactElement {
	const { equation, index, handleChange } = props;

	return (
		<EditableMathField
			style={MathTextFieldStyle}
			aria-label={`Equation ${index + 1}`}
			latex={equation}
			aria-valuetext={equation}
			onChange={(mathField) => {
				handleChange(index, mathField.latex());
			}}
			config={{ spaceBehavesLikeTab: true }}
		/>
	);
}

export default MathField;
