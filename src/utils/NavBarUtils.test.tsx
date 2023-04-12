/* eslint-env jest */

import handleCheckGraphExists from './NavBarUtils';
import type FunctionInterface from '../interfaces/FunctionInterface';
import GetAllGraphEquations from '../services/api/GetAllGraphEquationsService';

jest.mock('../services/api/GetAllGraphEquationsService');
jest.mock('../services/api/GetGraphInformationService');

describe('Test Utils for NavBar', () => {
	interface defaultHandleParamsInterface {
		gid: number;
		setIsDirty?: (isDirty: boolean) => void;
		setGid?: (gid: number) => void;
		setDisplayText?: (displayText: string) => void;
		setIsSave?: (isSave: boolean) => void;
		setEquations?: (equations: FunctionInterface[]) => void;
	}

	const defaultHandleGraphParams: defaultHandleParamsInterface = {
		gid: 0,
	};

	function defaultHandleCheckGraphExists({
		setIsDirty,
		gid,
		setGid,
		setDisplayText,
		setIsSave,
		setEquations,
	}: defaultHandleParamsInterface = defaultHandleGraphParams): void {
		handleCheckGraphExists(
			setIsDirty ?? jest.fn(),
			gid,
			setGid ?? jest.fn(),
			setDisplayText ?? jest.fn(),
			setIsSave ?? jest.fn(),
			setEquations ?? jest.fn(),
		);
	}

	test('handleCheckGraphs should set isDirty to true', () => {
		let testIsDirty = false;
		const setIsDirty = jest.fn((isDirty: boolean) => {
			testIsDirty = isDirty;
		});
		defaultHandleCheckGraphExists({ ...defaultHandleGraphParams, setIsDirty });
		expect(setIsDirty).toBeCalledWith(true);
		expect(testIsDirty).toBe(true);
	});

	test('handleCheckGraphs should set GID to -1 if GID = 0', () => {
		let testGid = 0;
		const setGid = jest.fn((gid: number) => {
			testGid = gid;
		});
		defaultHandleCheckGraphExists({ ...defaultHandleGraphParams, gid: testGid, setGid });
		expect(setGid).toBeCalledWith(-1);
		expect(testGid).toBe(-1);
	});

	test('handleCheckGraphs should not set GID to 0 otw', () => {
		const testCases = [1, 2, 3, 4];
		testCases.forEach((testCase) => {
			let testGid = 0;
			const setGid = jest.fn((gid: number) => {
				testGid = gid;
			});
			defaultHandleCheckGraphExists({ ...defaultHandleGraphParams, gid: testCase, setGid });
			expect(setGid).not.toBeCalled();
			expect(testGid).toBe(0);
		});
	});

	test.skip('getAllGraphsEquation should not be called if isErrorResponseInterface', () => {
		const gid = 2;
		defaultHandleCheckGraphExists({ ...defaultHandleGraphParams, gid });
		expect(GetAllGraphEquations).not.toBeCalled();
	});

	test.skip('getAllGraphsEquation should be called if is not ErrorResponseInterface', () => {
		const setIsSave = jest.fn();
		const setDisplayText = jest.fn();
		const gid = 1;
		defaultHandleCheckGraphExists({ ...defaultHandleGraphParams, gid, setIsSave, setDisplayText });
		expect(GetAllGraphEquations).toBeCalled();
		expect(setIsSave).toBeCalledWith(true);
		expect(setDisplayText).toBeCalled();
	});

	test.skip('setEquations should be called if setEquations is not null', () => {
		const gid = 1;
		const setEquations = jest.fn();
		defaultHandleCheckGraphExists({ ...defaultHandleGraphParams, gid, setEquations });
		expect(setEquations).toBeCalled();
	});
});
