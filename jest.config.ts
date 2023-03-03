export default {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.tsx?$': 'babel-jest',
		'^.+\\.svg$': 'jest-transform-stub',
		'^.+\\.scss$': '<rootDir>/sassTransform.cjs',
		'^.+\\.css$': 'jest-transform-stub',
	},
	testMatch: ['**/*.test.tsx'],
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
