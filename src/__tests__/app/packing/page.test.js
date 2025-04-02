import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import PackingPage from '@/app/packing/page';
import FullPageLoader from '@/components/FullPageLoader';
import OrderDetailOverlay from '@/components/OrderDetailOverlay';

// Mock fetch
global.fetch = jest.fn();

// Mock FullPageLoader (a simple placeholder)
jest.mock('@/components/FullPageLoader', () => {
	return function MockFullPageLoader() {
		return <div data-testid="loader">Loading...</div>;
	};
});

// Mock OrderDetailOverlay (a simple placeholder)
jest.mock('@/components/OrderDetailOverlay', () => {
	return function MockOrderDetailOverlay() {
		return <div data-testid="overlay">Order Detail Overlay</div>;
	};
});

describe('PackingPage', () => {
	beforeEach(() => {
		fetch.mockClear();
	});

	it('fetches and displays the orders packing list', async () => {
		fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				orders: [
					{
						id: 'testId',
						date: '2021-09-01',
						customer: { name: 'Test Customer' },
					},
				],
			}),
		});

		await act(async () => {
			render(<PackingPage />);
		});

		expect(
			screen.getByRole('heading', { name: 'Packing Orders' })
		).toBeInTheDocument();
		expect(screen.getByRole('table')).toBeInTheDocument();
		expect(screen.getByText('Test Customer')).toBeInTheDocument();
		expect(screen.getByText('testId')).toBeInTheDocument();
	});

	it('displays a loading indicator while fetching orders', async () => {
		fetch.mockResolvedValueOnce(new Promise(() => {}));

		await act(async () => {
			render(<PackingPage />);
		});

		expect(screen.getByTestId('loader')).toBeInTheDocument();
	});

	it('displays an error message if fetching orders fails', async () => {
		fetch.mockResolvedValueOnce({
			ok: false,
		});

		await act(async () => {
			render(<PackingPage />);
		});
	});

	it('displays an order detail overlay when an order is clicked', async () => {
		fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				orders: [
					{
						id: 'testId',
						date: '2021-09-01',
						customer: { name: 'Test Customer' },
					},
				],
			}),
		});

		await act(async () => {
			render(<PackingPage />);
		});
		let button = await screen.findByRole('button');
		fireEvent.click(button);

		expect(screen.getByTestId('overlay')).toBeInTheDocument();
	});
});
