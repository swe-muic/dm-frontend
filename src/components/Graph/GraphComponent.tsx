import React, { useEffect, useRef, useState } from 'react';
import functionPlot from 'function-plot';
import { type FunctionPlotDatum, type FunctionPlotOptions } from 'function-plot/dist/types';

export interface PlotProps {
	data: FunctionPlotDatum[];
	options?: Partial<FunctionPlotOptions>;
}
export default function Plot({ data, options }: PlotProps): React.ReactElement {
	const containerRef = useRef<HTMLDivElement>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const legendItems = document.getElementsByClassName('top-right-legend');
		Array.from(legendItems).forEach((legendItem) => {
			(legendItem as HTMLElement).style.display = 'none';
		});
		try {
			if (containerRef.current != null && mounted) {
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
			console.log(e);
		}
	}, [data, options, mounted]);

	useEffect(() => {
		setMounted(true);
		return () => {
			setMounted(false);
		};
	}, []);

	return (
		<div ref={containerRef} style={{ width: '100%', height: '100%', marginTop: 15 }} data-testid='plot-container'></div>
	);
}
