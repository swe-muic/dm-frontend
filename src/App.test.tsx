/* eslint-env jest */
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import Graphs from './pages/Graphs';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/NavBar/NavBar';
import React from 'react';

jest.mock('function-plot', () => ({
	__esModule: true,
	default: jest.fn(),
}));
jest.mock('./images/login_background.png', () => './images/login_background.png');

describe('Routes', () => {
	it('should render the correct component for the /graphs route', () => {
		render(
			<MemoryRouter initialEntries={['/graphs']}>
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
			</MemoryRouter>,
		);
		const { container } = render(
			<BrowserRouter>
				<Navbar currentPage={'graphs'} />
			</BrowserRouter>,
		);

		expect(container).toBeInTheDocument();
	});

	it('should render the correct component for the /login route', () => {
		render(
			<MemoryRouter initialEntries={['/login']}>
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
			</MemoryRouter>,
		);

		expect(screen.getByText('Login')).toBeInTheDocument();
	});

	it('should render the correct component for the index route', () => {
		render(
			<MemoryRouter initialEntries={['/']}>
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
			</MemoryRouter>,
		);

		const { container } = render(
			<BrowserRouter>
				<Navbar currentPage={'home'} />
			</BrowserRouter>,
		);

		expect(container).toBeInTheDocument();
	});
});
