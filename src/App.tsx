import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config/FirebaseConfig';
import AuthRoute from './components/AuthRoute';
import Graphs from './pages/Graphs';

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
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
