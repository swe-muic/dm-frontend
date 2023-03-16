import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App(): React.ReactElement {
	const [currentValue, setCurrentValue] = useState(2);
	const onButtonClick = (): void => {
		setCurrentValue((currentValue) => 2 * currentValue);
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
					Learn React
				</a>
				<button onClick={onButtonClick}></button>
				<p data-testid='app-res'>Result = {currentValue}</p>
			</header>
		</div>
	);
}

export default App;
