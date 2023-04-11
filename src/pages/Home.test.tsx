/* eslint-env jest */

import { render } from '@testing-library/react';
import Home from './Home';
import Plot from '../components/Graph/GraphComponent';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/NavBar/NavBar';

jest.mock('function-plot', () => ({
	__esModule: true,
	default: jest.fn(),
}));

describe('Home component', () => {
	const data = [
		{ fn: 'x', color: 'red' },
		{ fn: 'y', color: 'blue' },
	];
	const options = {
		tip: {
			xLine: true,
			yLine: true,
		},
		grid: true,
		width: window.innerWidth,
		height: window.innerHeight,
	};

	it('renders the Navbar component with the currentPage prop set to "home"', () => {
		render(
			<BrowserRouter>
				<Home />
			</BrowserRouter>,
		);
		const { container } = render(
			<BrowserRouter>
				<Navbar currentPage={'home'} />
			</BrowserRouter>,
		);

		expect(container).toBeInTheDocument();
	});

	it('renders the Plot component with an empty data prop', async () => {
		// eslint-disable-next-line react/react-in-jsx-scope
		render(
			<BrowserRouter>
				<Home />
			</BrowserRouter>,
		);
		const { container } = render(<Plot data={data} options={options} />);
		expect(container.querySelector('div')).toBeInTheDocument();

		const functionPlot = await import('function-plot');
		expect(functionPlot.default).toHaveBeenCalledWith({
			...options,
			target: expect.anything(),
			data,
		});
	});
});
