export default {
	preset: 'ts-jest',
	transform: {
		'^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'babel-jest',
		'^.+\\.svg$': 'jest-transform-stub',
		'^.+\\.scss$': '<rootDir>/sassTransform.cjs',
		'^.+\\.(css|scss|png|jpg|svg)$': 'jest-transform-stub',
	},
	collectCoverage: true,
	coverageReporters: ['lcov', 'text', 'cobertura'],
	testResultsProcessor: 'jest-sonar-reporter',
	projects: [
		{
			testEnvironment: 'jsdom',
			testMatch: ['**/*.test.tsx'],
			setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
		},
		{
			testEnvironment: 'node',
			testMatch: ['**/*.test.ts'],
		},
	],
};
