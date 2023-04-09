/* eslint-env jest */
import { fireEvent, render, screen } from '@testing-library/react';
import Navbar from './NavBar';
import { act } from 'react-dom/test-utils';
import React from 'react';

test('can navbar run', () => {
	render(<Navbar />);
});

test('test login icon button', () => {
	render(<Navbar />);
	act(() => {
		screen.getByTestId('login-button').click();
	});

	expect(screen.getByTestId('save-icon-button')).toBeInTheDocument();
	// eslint-disable-next-line no-undef
	expect(screen.getByTestId('user-icon-button')).toBeInTheDocument();
});

test('test register icon button', () => {
	render(<Navbar />);

	act(() => {
		screen.getByTestId('register-button').click();
	});

	expect(screen.getByTestId('save-icon-button')).toBeInTheDocument();

	expect(screen.getByTestId('user-icon-button')).toBeInTheDocument();
});

test('test delete and open modal', () => {
	render(<Navbar />);

	act(() => {
		screen.getByTestId('register-button').click();
	});

	expect(screen.getByTestId('save-icon-button')).toBeInTheDocument();
	act(() => {
		screen.getByTestId('save-icon-button').click();
	});

	expect(screen.getByTestId('delete-icon-button')).toBeInTheDocument();
	act(() => {
		screen.getByTestId('delete-icon-button').click();
	});

	expect(screen.getByTestId('delete-modal')).toBeInTheDocument();

	expect(screen.getByTestId('delete-button')).toBeInTheDocument();
});

test('closing modal', () => {
	render(<Navbar />);
	act(() => {
		screen.getByTestId('register-button').click();
	});
	act(() => {
		screen.getByTestId('save-icon-button').click();
	});
	act(() => {
		screen.getByTestId('delete-icon-button').click();
	});
	act(() => {
		screen.getByTestId('delete-button').click();
	});
	// eslint-disable-next-line no-undef
	expect(screen.queryByTestId('delete-button')).not.toBeInTheDocument();
});

test('test edit graph name', () => {
	render(<Navbar />);

	act(() => {
		screen.getByTestId('login-button').click();
	});

	fireEvent.doubleClick(screen.getByTestId('graph-name-text-button'));

	expect(screen.queryByTestId('text-display-input')).toBeInTheDocument();
});

test('test text field at edit graph', () => {
	render(<Navbar />);

	act(() => {
		screen.getByTestId('login-button').click();
	});

	fireEvent.doubleClick(screen.getByTestId('graph-name-text-button'));

	fireEvent.change(screen.getByTestId('text-display-input'), { target: { value: 'Hello World' } });

	act(() => {
		screen.getByTestId('edit-icon-button').click();
	});

	expect(screen.getByRole('button', { name: 'Hello World' })).toBeInTheDocument();
});
