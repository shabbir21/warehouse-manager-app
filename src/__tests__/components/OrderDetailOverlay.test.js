import '@testing-library/jest-dom';
import { render, screen, waitFor, act } from '@testing-library/react'; // Import act
import OrderDetailOverlayPage from '@/components/OrderDetailOverlay';
import FullPageLoader from '@/components/FullPageLoader';

// Mock fetch
global.fetch = jest.fn();

// Mock FullPageLoader (a simple placeholder)
jest.mock('@/components/FullPageLoader', () => {
	return function MockFullPageLoader() {
		return <div data-testid="loader">Loading...</div>;
	};
});

describe('OrderDetailOverlayPage', () => {
	beforeEach(() => {
		fetch.mockClear();
	});

	it('loads properly if all the data is available', async () => {
		// Make the test async
		fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				order: {
					id: '1',
					date: '2023-09-15',
					shippingAddress: {
						street: '100 Dundas Street East',
						city: 'Toronto',
						province: 'ON',
						postalCode: 'M5B 1H3',
					},
					customer: {
						name: 'Test Customer',
						email: 'test@email.com',
					},
					lineItems: [
						{
							id: '101',
							productId: 'testBox',
							productName: 'Test Box',
							price: 50,
							products: [
								{
									productId: 'test_cupcake',
									productName: 'Test cupcake',
								},
							],
						},
					],
					status: 'Pending',
				},
			}),
		});

		await act(async () => {
			render(<OrderDetailOverlayPage orderId={'1'} />);
		});

		expect(
			screen.getByRole('heading', { name: 'Order Details - 1' })
		).toBeInTheDocument();
		expect(screen.getByText('Test Box')).toBeInTheDocument();
		expect(
			screen.getByText('Customer Name: Test Customer')
		).toBeInTheDocument();
	});

	it('handles fetch errors', async () => {
		fetch.mockResolvedValueOnce({
			ok: false,
			status: 500,
			statusText: 'Internal Server Error',
		});

		await act(async () => {
			// Wrap render and waitFor
			render(<OrderDetailOverlayPage />);
		});
	});
});
