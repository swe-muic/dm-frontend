import GetGraphInformation from '../services/api/GetGraphInformationService';
import { isErrorResponseInterface } from '../interfaces/response/ErrorResponseInterface';
import GetAllGraphEquations from '../services/api/GetAllGraphEquationsService';
import { mapToFunctionInterface } from '../interfaces/schema/EquationInterface';
import type FunctionInterface from '../interfaces/FunctionInterface';

const handleCheckGraphExists = (
	setIsDirty: (isDirty: boolean) => void,
	gid: number,
	setGid: (gid: number) => void,
	setDisplayText: (displayText: string) => void,
	setIsSave: (isSave: boolean) => void,
	setEquations?: (equations: FunctionInterface[]) => void,
): void => {
	setIsDirty(true);
	if (gid === 0) {
		setGid(-1);
	}
	GetGraphInformation(gid)
		.then((res) => {
			if (!isErrorResponseInterface(res)) {
				setDisplayText(res.data.name);
				setIsSave(true);
				GetAllGraphEquations(gid)
					.then((equations) => {
						if (setEquations != null) {
							setEquations(equations.map((equation, index) => mapToFunctionInterface(equation, index)));
						}
					})
					.catch((e) => {
						console.log(e);
					});
			}
		})
		.catch((e) => {
			console.log(e);
		});
};

export default handleCheckGraphExists;
