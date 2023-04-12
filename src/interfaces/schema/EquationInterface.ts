import type BaseEquationInterface from './BaseEquationInterface';
import type FunctionInterface from '../FunctionInterface';

interface EquationInterface extends BaseEquationInterface, FunctionInterface {
	id: number;
	graph: number;
}

export default EquationInterface;
