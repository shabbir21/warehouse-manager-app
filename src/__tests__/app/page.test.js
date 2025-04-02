import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
	it('renders without errors', () => {
		render(<Home />);
		expect(screen.getByText('Warehouse Manager App')).toBeInTheDocument();
	});

	it('displays navigation links and helper text', () => {
		render(<Home />);
		expect(screen.getByText('Picking')).toBeInTheDocument();
		expect(screen.getByText('Packing')).toBeInTheDocument();
		expect(
			screen.getByText('Select an option to proceed.')
		).toBeInTheDocument();
	});
});
