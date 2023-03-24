/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/nav_bars_components/Navbar';
import functionPlot from 'function-plot';
import Plot from './components/graph_components/GraphComponent';

function App(): React.ReactElement {
	const [currentValue, setCurrentValue] = useState(2);
	const onButtonClick = (): void => {
		setCurrentValue((currentValue) => 2 * currentValue);
	};

	const data = [
		{
			fn: 'x+2',
			graphType: 'polyline',
			color: 'red',
		},
	];

	return (
		<div className='App'>
			<Nav />
			{/*<Plot data={data} />*/}

			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
					Learn React
				</a>
				<button data-testid='app-button' onClick={onButtonClick}></button>
				<p data-testid='app-res'>Result = {currentValue}</p>
			</header>
		</div>
	);
}

export default App;
