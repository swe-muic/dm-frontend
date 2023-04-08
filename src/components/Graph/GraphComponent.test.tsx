import React from 'react';
import { render } from '@testing-library/react';
import Plot from './GraphComponent';

// eslint-disable-next-line no-undef
jest.mock('function-plot', () => ({
	__esModule: true,
	// eslint-disable-next-line no-undef
	default: jest.fn(),
}));

// eslint-disable-next-line no-undef
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

	// eslint-disable-next-line no-undef
	test('renders a graph using function-plot', () => {
		const { container } = render(<Plot data={data} options={options} />);

		// eslint-disable-next-line no-undef
		expect(container.querySelector('div')).toBeInTheDocument();
		// eslint-disable-next-line no-undef,@typescript-eslint/no-var-requires,no-restricted-syntax
		expect(require('function-plot').default).toHaveBeenCalledWith({
			...options,
			// eslint-disable-next-line no-undef
			target: expect.anything(),
			data,
		});
	});

	// eslint-disable-next-line no-undef
	test('hides the legend items', () => {
		// Render the component
		const { container } = render(<Plot data={data} options={options} />);

		// Get the legend items
		const legendItems = container.getElementsByClassName('top-right-legend');

		// Check that each legend item is hidden
		Array.from(legendItems).forEach((legendItem) => {
			// eslint-disable-next-line no-undef
			expect(getComputedStyle(legendItem).display).toBe('none');
		});
	});

	// eslint-disable-next-line no-undef
	test('hides all legend items', () => {
		// Create an array of dummy legend items
		const legendItems = [document.createElement('div'), document.createElement('div'), document.createElement('div')];
		legendItems.forEach((legendItem) => {
			legendItem.className = 'top-right-legend';
			document.body.appendChild(legendItem);
		});

		// Render the Plot component
		render(<Plot data={[]} />);

		// Check that the display style property of all legend items is 'none'
		legendItems.forEach((legendItem) => {
			// eslint-disable-next-line no-undef
			expect(legendItem.style.display).toBe('none');
		});
	});
});
