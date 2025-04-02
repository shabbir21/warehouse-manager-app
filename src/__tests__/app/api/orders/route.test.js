/**
 * @jest-environment node
 */

import { GET } from '@/app/api/orders/route';
import { getOrders } from '@/data/data-access';

// Mock the getOrders function
jest.mock('@/data/data-access', () => ({
	getOrders: jest.fn(async () => [
		{
			id: '1',
			total: 100,
			date: '2024-03-31',
			customer: { name: 'Test Customer', email: 'test@example.com' },
			lineItems: [],
			status: 'Pending',
		},
		{
			id: '2',
			total: 200,
			date: '2024-04-01',
			customer: {
				name: 'Another Customer',
				email: 'another@example.com',
			},
			lineItems: [],
			status: 'Shipped',
		},
	]),
}));

describe('Testing GET /api/orders API route', () => {
	beforeEach(() => {
		jest.clearAllMocks(); // Clear mocks before each test
	});

	it('should return a list of orders with status 200', async () => {
		const response = await GET();
		expect(response.status).toBe(200);

		const data = await response.json();
		expect(data).toHaveProperty('orders');
		expect(Array.isArray(data.orders)).toBe(true);
		expect(data.orders.length).toBe(2);
		expect(Object.keys(data.orders[0])).toEqual(['id', 'date', 'customer']);
	});

	it('should return 404 if no orders are found', async () => {
		// Force getOrders to return an empty array
		getOrders.mockResolvedValue([]);

		const response = await GET();
		expect(response.status).toBe(404);

		const data = await response.json();
		expect(data).toHaveProperty('message');
	});

	it('should handle errors from getOrders and return 500', async () => {
		// Force getOrders to throw an error
		getOrders.mockRejectedValue(new Error('Test error'));

		const response = await GET();
		expect(response.status).toBe(500);

		const data = await response.json();
		expect(data).toHaveProperty('message');
	});
});
