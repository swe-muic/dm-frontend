/* eslint-env jest */
import React from 'react';
import { render } from '@testing-library/react';
import Plot from './GraphComponent';

jest.mock('function-plot', () => ({
	__esModule: true,
	default: jest.fn(),
}));

describe('Plot', () => {
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

	test('renders a graph using function-plot', async () => {
		const { container } = render(<Plot data={data} options={options} />);
		expect(container.querySelector('div')).toBeInTheDocument();

		const functionPlot = await import('function-plot');
		expect(functionPlot.default).toHaveBeenCalledWith({
			...options,
			target: expect.anything(),
			data,
		});
	});

	test('hides the legend items', () => {
		const { container } = render(<Plot data={data} options={options} />);
		const legendItems = container.getElementsByClassName('top-right-legend');
		Array.from(legendItems).forEach((legendItem) => {
			expect(getComputedStyle(legendItem).display).toBe('none');
		});
	});

	test('hides all legend items', () => {
		const legendItems = [document.createElement('div'), document.createElement('div'), document.createElement('div')];
		legendItems.forEach((legendItem) => {
			legendItem.className = 'top-right-legend';
			document.body.appendChild(legendItem);
		});
		render(<Plot data={[]} />);
		legendItems.forEach((legendItem) => {
			expect(legendItem.style.display).toBe('none');
		});
	});

	it('should render with a non-null containerRef', () => {
		const { container } = render(<Plot data={data} />);
		const plotDiv = container.querySelector('div');
		expect(plotDiv).not.toBeNull();
		expect(plotDiv?.getAttribute('ref')).toBeNull();
		expect(plotDiv?.getAttribute('ref')).toBeDefined();
	});

	it('should render with a non-null containerRef2', () => {
		const { container } = render(<Plot data={[]} />);
		const plotDiv = container.querySelector('div');
		expect(plotDiv).not.toBeNull();
		expect(plotDiv?.getAttribute('ref')).toBeNull();
		expect(plotDiv?.getAttribute('ref')).toBeDefined();
	});
});
