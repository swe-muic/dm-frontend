import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import functionPlot, { type FunctionPlotDatum } from 'function-plot';
import { type FunctionPlotOptions } from 'function-plot/dist/types';

export interface PlotProps {
	data: FunctionPlotDatum[];
	options?: Partial<FunctionPlotOptions>;
}

export default function Plot({ data, options }: PlotProps): React.ReactElement {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const legendItems = document.getElementsByClassName('top-right-legend');
		Array.from(legendItems).forEach((legendItem) => {
			(legendItem as HTMLElement).style.display = 'none';
		});

		if (containerRef.current != null) {
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

	return <div ref={containerRef} style={{ width: '100%', height: '100%', marginTop: 15 }}></div>;
}
