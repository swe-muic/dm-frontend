/* eslint-disable */
import React, { useRef, useEffect } from 'react';
// @ts-ignore
import functionPlot, { FunctionPlotDatum } from 'function-plot';
// @ts-ignore
import { FunctionPlotOptions } from 'function-plot/dist/types';

interface PlotProps {
	data: FunctionPlotDatum[];
	options?: Partial<FunctionPlotOptions>;
}

const Plot = ({ data, options }: PlotProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const legendItems = document.getElementsByClassName('top-right-legend');
		Array.from(legendItems).forEach((legendItem) => {
			(legendItem as HTMLElement).style.display = 'none';
		});

		try {
			if (containerRef.current) {
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
		} catch (e) {
			if (containerRef.current) {
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
				});
			}
		}
	}, [data, options]);

	return <div ref={containerRef} style={{ width: '100%', height: '100%', marginTop: 15 }}></div>;
};

export default Plot;
