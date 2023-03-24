import { fireEvent, render, screen } from '@testing-library/react';
import Navbar from './NavBar';
import { act } from 'react-dom/test-utils';
import React from 'react';

// eslint-disable-next-line no-undef
test('can navbar run', () => {
	render(<Navbar />);
});

// eslint-disable-next-line no-undef
test('test login icon button', () => {
	render(<Navbar />);
	act(() => {
		screen.getByTestId('login-button').click();
	});
	// eslint-disable-next-line no-undef
	expect(screen.getByTestId('save-icon-button')).toBeInTheDocument();
	// eslint-disable-next-line no-undef
	expect(screen.getByTestId('user-icon-button')).toBeInTheDocument();
});
// eslint-disable-next-line no-undef
test('test register icon button', () => {
	render(<Navbar />);
	// eslint-disable-next-line no-undef
	act(() => {
		screen.getByTestId('register-button').click();
	});
	// eslint-disable-next-line no-undef
	expect(screen.getByTestId('save-icon-button')).toBeInTheDocument();
	// eslint-disable-next-line no-undef
	expect(screen.getByTestId('user-icon-button')).toBeInTheDocument();
});

// eslint-disable-next-line no-undef
test('test delete and open modal', () => {
	render(<Navbar />);
	// eslint-disable-next-line no-undef
	act(() => {
		screen.getByTestId('register-button').click();
	});

	// eslint-disable-next-line no-undef
	expect(screen.getByTestId('save-icon-button')).toBeInTheDocument();
	act(() => {
		screen.getByTestId('save-icon-button').click();
	});
	// eslint-disable-next-line no-undef
	expect(screen.getByTestId('delete-icon-button')).toBeInTheDocument();
	act(() => {
		screen.getByTestId('delete-icon-button').click();
	});
	// eslint-disable-next-line no-undef
	expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
	// eslint-disable-next-line no-undef
	expect(screen.getByTestId('delete-button')).toBeInTheDocument();
});

// eslint-disable-next-line no-undef
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

// eslint-disable-next-line no-undef
test('test edit graph name', () => {
	render(<Navbar />);
	// eslint-disable-next-line no-undef
	act(() => {
		screen.getByTestId('login-button').click();
	});
	// eslint-disable-next-line no-undef
	fireEvent.doubleClick(screen.getByTestId('graph-name-text-button'));
	// eslint-disable-next-line no-undef
	expect(screen.queryByTestId('text-display-input')).toBeInTheDocument();
});

// eslint-disable-next-line no-undef
test('test text field at edit graph', () => {
	render(<Navbar />);
	// eslint-disable-next-line no-undef
	act(() => {
		screen.getByTestId('login-button').click();
	});
	// eslint-disable-next-line no-undef
	fireEvent.doubleClick(screen.getByTestId('graph-name-text-button'));
	// eslint-disable-next-line no-undef
	fireEvent.change(screen.getByTestId('text-display-input'), { target: { value: 'Hello World' } });

	act(() => {
		screen.getByTestId('edit-icon-button').click();
	});
	// eslint-disable-next-line no-undef
	expect(screen.getByRole('button', { name: 'Hello World' })).toBeInTheDocument();
});
