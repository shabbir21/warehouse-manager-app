import '@testing-library/jest-dom';
import { render, screen, waitFor, act } from '@testing-library/react'; // Import act
import PickingPage from '@/app/picking/page';
import FullPageLoader from '@/components/FullPageLoader';

// Mock fetch
global.fetch = jest.fn();

// Mock FullPageLoader (a simple placeholder)
jest.mock('@/components/FullPageLoader', () => {
	return function MockFullPageLoader() {
		return <div data-testid="loader">Loading...</div>;
	};
});

describe('PickingPage', () => {
	beforeEach(() => {
		fetch.mockClear();
	});

	it('displays the loader while fetching data', async () => {
		// Make the test async
		fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				pickingList: [], // Simulate empty list initially
			}),
		});

		render(<PickingPage />);

		await waitFor(() =>
			expect(screen.getByTestId('loader')).toBeInTheDocument()
		); // Wait for loader to be present
	});

	it('fetches and displays the picking list', async () => {
		fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				pickingList: [
					{ name: 'Product 1', quantity: 2 },
					{ name: 'Product 2', quantity: 2 },
				],
			}),
		});

		await act(async () => {
			// Wrap render and waitFor
			render(<PickingPage />);
		});

		expect(
			screen.getByRole('heading', { name: 'Picking List' })
		).toBeInTheDocument();
		expect(screen.getByRole('table')).toBeInTheDocument();
		expect(screen.getByText('Product 1')).toBeInTheDocument();
		expect(screen.getByText('Product 2')).toBeInTheDocument();
	});

	it('handles fetch errors', async () => {
		fetch.mockResolvedValueOnce({
			ok: false,
			status: 500,
			statusText: 'Internal Server Error',
		});

		await act(async () => {
			// Wrap render and waitFor
			render(<PickingPage />);
		});
	});
});
