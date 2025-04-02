/**
 * @jest-environment node
 */

import { GET } from '@/app/api/orders/[id]/route';
import { getOrderById } from '@/data/data-access';

const mockOrder = {
	id: '1',
	total: 100,
	date: '2024-03-31',
	customer: { name: 'Test Customer', email: 'test@example.com' },
	lineItems: [
		{
			id: '1',
			productId: 'testBox',
			productName: 'Test Box',
			price: 50,
			products: [
				{
					productId: 'test_cupcake',
					productName: 'Test Cupcake',
				},
			],
		},
	],
	shippingAddress: {
		street: '123 Test St',
		city: 'Test City',
		province: 'Test Province',
		postalCode: '12345',
	},
	status: 'Pending',
};

jest.mock('@/data/data-access', () => ({
	getOrderById: jest.fn(async () => mockOrder),
}));

describe('Testing GET api/orders/:id API route', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('GET request should return a 200 status code with valid order data', async () => {
		const response = await GET(
			{},
			{ params: Promise.resolve({ id: '1' }) }
		);
		expect(response.status).toBe(200);

		const data = await response.json();
		expect(data).toHaveProperty('order');

		const order = data.order;
		expect(order).toEqual(mockOrder);
	});

	test('GET request should throw an error if getOrderById fails', async () => {
		getOrderById.mockRejectedValue(new Error('Database connection failed'));
		const response = await GET(
			{},
			{ params: Promise.resolve({ id: '1' }) }
		);
		expect(response.status).toBe(500);
		expect(await response.json()).toHaveProperty('message');
	});

	test('GET request should return a 404 status code if order is not found', async () => {
		getOrderById.mockResolvedValue(null);
		const response = await GET(
			{},
			{ params: Promise.resolve({ id: 'notExistingId' }) }
		);
		expect(response.status).toBe(404);
		expect(await response.json()).toHaveProperty('message');
	});

	test('GET request should return a 400 status code if no ID is provided', async () => {
		const response = await GET({}, { params: Promise.resolve({}) });
		expect(response.status).toBe(400);
		expect(await response.json()).toHaveProperty('message');
	});
});
