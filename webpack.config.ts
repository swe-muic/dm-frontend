/* eslint-disable import/no-nodejs-modules */
import path from 'path';

export default {
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
		extensions: ['.tsx', '.ts', '.js'],
	},
};
