/**
 * @jest-environment node
 */

import { GET } from '@/app/api/picking-list/route';
import { getOrders, getProductsInBox } from '@/data/data-access';

jest.mock('@/data/data-access', () => ({
	getOrders: jest.fn(),
	getProductsInBox: jest.fn(),
}));

describe('Testing GET /api/picking route', () => {
	test('should return 404 if no orders are found', async () => {
		getOrders.mockResolvedValue([]);

		const response = await GET();
		expect(response.status).toBe(404);
		const data = await response.json();
		expect(data).toHaveProperty('message');
	});

	test('should return 500 if getOrders throws an error', async () => {
		getOrders.mockRejectedValue(new Error('Test error'));

		const response = await GET();
		expect(response.status).toBe(500);
		const data = await response.json();
		expect(data).toHaveProperty('message');
	});

	test('should return 200 with picking list', async () => {
		getOrders.mockResolvedValue([
			{
				lineItems: [
					{ productId: 'product1' },
					{ productId: 'product2' },
				],
			},
		]);
		getProductsInBox.mockResolvedValue([
			{ productName: 'Product 1' },
			{ productName: 'Product 2' },
		]);

		const response = await GET();
		const data = await response.json();
		expect(response.status).toBe(200);
		expect(data).toEqual({
			pickingList: [
				{ name: 'Product 1', quantity: 2 },
				{ name: 'Product 2', quantity: 2 },
			],
		});
	});
});
