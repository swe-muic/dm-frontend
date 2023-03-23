/* eslint-disable */
import React, { useRef, useEffect } from 'react';
// @ts-ignore
import functionPlot, { FunctionPlotDatum } from 'function-plot';
import { FunctionPlotOptions } from 'function-plot/dist/types';

interface PlotProps {
	data: FunctionPlotDatum[];
	options?: Partial<FunctionPlotOptions>;
}

const Plot = ({ data, options }: PlotProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			functionPlot({
				...options,
				tip: {
					xLine: false,
					yLine: false,
				},
				target: containerRef.current,
				grid: true,
				width: frames.innerWidth,
				height: frames.innerHeight * 0.9,

				data,
			});
		}
	}, [data, options]);

	return <div ref={containerRef} style={{ width: '100%', height: '100%', marginTop: 50 }} />;
};

export default Plot;
