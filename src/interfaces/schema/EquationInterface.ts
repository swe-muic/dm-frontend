import type FunctionInterface from '../FunctionInterface';
import type LineStyleEnum from '@/enum/LineStyleEnum';

interface EquationInterface {
	equation: string;
	parsed_equation: string;
	color: number;
	id: number;
	graph: number;
	line_width: number;
	line_style: LineStyleEnum;
}

export const mapToFunctionInterface = (equation: EquationInterface, index: number): FunctionInterface => ({
	...equation,
	index,
	lineStyle: equation.line_style,
	color: `#${equation.color.toString(16)}`,
});

export const mapFromFunctionInterface = (
	equation: FunctionInterface,
	id: number,
	graph: number,
): EquationInterface => ({
	...equation,
	parsed_equation: equation.equation,
	id,
	graph,
	color: parseInt(equation.color.replace('#', ''), 16),
	line_style: equation.lineStyle,
	line_width: 1,
});

export default EquationInterface;
