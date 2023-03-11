import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
// import {AuthContextProvider} from "./context/AuthContext";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config/firebaseConfig';
import AuthRoute from './components/AuthRoute';
import Graphs from './pages/Graphs';

initializeApp(firebaseConfig);

function App(): React.ReactElement {
	const [currentValue, setCurrentValue] = useState(2);
	const onButtonClick = (): void => {
		setCurrentValue((currentValue) => 2 * currentValue);
	};

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route
						path='/graphs'
						element={
							<AuthRoute>
								<Graphs />
							</AuthRoute>
						}
					/>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
				</Routes>
			</BrowserRouter>
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
