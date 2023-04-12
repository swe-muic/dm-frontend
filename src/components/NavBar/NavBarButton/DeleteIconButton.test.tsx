/* eslint-env jest */
import { fireEvent, render, screen } from '@testing-library/react';
import DeleteIconButton from './DeleteIconButton';
import React from 'react';
import DeleteGraph from '../../../services/api/DeleteGraphService';

jest.mock('../../../services/api/DeleteGraphService');

describe('DeleteIconButton', () => {
	it('displays the delete modal when delete icon button is clicked', () => {
		render(<DeleteIconButton graphId={1} />);
		fireEvent.click(screen.getByTestId('delete-icon-button'));
		expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
		fireEvent.click(screen.getByTestId('cancel-button'));
		expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument();
	});

	it('calls the DeleteGraph function and reloads the page when delete button is clicked', () => {
		render(<DeleteIconButton graphId={1} />);
		fireEvent.click(screen.getByTestId('delete-icon-button'));
		fireEvent.click(screen.getByTestId('delete-button'));
		expect(DeleteGraph).toBeCalled();
	});
});
