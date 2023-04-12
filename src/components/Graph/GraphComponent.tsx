import React, { useEffect, useState } from 'react';
import functionPlot from 'function-plot';
import { type FunctionPlotDatum, type FunctionPlotOptions } from 'function-plot/dist/types';

// Define the props for the PlotContainer component
interface PlotContainerProps {
	data: FunctionPlotDatum[]; // The data to be plotted
	options?: Partial<FunctionPlotOptions>; // Additional options for the function-plot library
}

// Define the PlotContainer component
const PlotContainer: React.FC<PlotContainerProps> = ({ data, options }) => {
	const containerRef = React.useRef<HTMLDivElement>(null); // Create a ref for the container element

	// Effect to create and render the function-plot chart when the container ref or the data/options props change
	React.useEffect(() => {
		// Check that the container ref is not null
		if (containerRef.current != null) {
			// Create the function-plot chart with the specified options and data, and render it inside the container ref
			functionPlot({
				...options,
				tip: {
					xLine: true,
					yLine: true,
				},
				target: containerRef.current,
				grid: true,
				width: window.innerWidth,
				height: window.innerHeight,
				data,
			});
		}
	}, [data, options]);

	// Return the container element with the ref
	return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

// Define the props for the Plot component
export interface PlotProps {
	data: FunctionPlotDatum[]; // The data to be plotted
	options?: Partial<FunctionPlotOptions>; // Additional options for the function-plot library
}

// Define the Plot component
export default function Plot({ data, options }: PlotProps): React.ReactElement {
	const [mounted, setMounted] = useState(false); // State to keep track of whether the component is mounted

	// Effect to set the mounted state to true when the component is mounted and false when it is unmounted
	useEffect(() => {
		setMounted(true);
		return () => {
			setMounted(false);
		};
	}, []);

	// Return the container for the plot, and render the PlotContainer component inside it when mounted is true
	return (
		<div
			id='plot-container'
			key={JSON.stringify(data)}
			style={{ width: '100%', height: '100%', marginTop: 15 }}
			data-testid='plot-container'
		>
			{mounted && <PlotContainer data={data} options={options} />}
		</div>
	);
}
