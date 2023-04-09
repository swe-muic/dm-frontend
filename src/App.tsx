import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config/FirebaseConfig';
import AuthRoute from './components/AuthRoute';
import loadable from '@loadable/component';

// this is intentional (for lazy-loading)
/* eslint-disable @typescript-eslint/promise-function-async */
const Home = loadable(() => import('./pages/Home'));
const Login = loadable(() => import('./pages/Login'));
const Graphs = loadable(() => import('./pages/Graphs'));
/* eslint-enable @typescript-eslint/promise-function-async */

initializeApp(firebaseConfig);

function App(): React.ReactElement {
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
					<Route index element={<Home />} />
					<Route path='/login' element={<Login />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
