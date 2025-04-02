import {
	getOrders,
	getProductsMap,
	getProductsInBox,
	getOrderById,
} from '@/data/data-access';
import orders from '@/data/orders.json';
import products from '@/data/products.json';

describe('Testing data access', () => {
	test('should return the correct data', async () => {
		const data = await getOrders();
		expect(data).toEqual(orders);
	});

	test('should return the correct products', async () => {
		const data = await getProductsMap();
		expect(data).toEqual(products);
	});

	test('should return the correct products in a box', async () => {
		const data = await getProductsInBox('birthdayBox');
		expect(data).toEqual(products['birthdayBox']);
	});

	test('should return the empty array if no item found', async () => {
		const data = await getProductsInBox('not-found');
		expect(data).toEqual([]);
	});

	test('should return the order by id with product details', async () => {
		const data = await getOrderById('1');
		expect(data).toEqual({
			...orders[0],
			lineItems: orders[0].lineItems.map((lineItem) => ({
				...lineItem,
				products: products[lineItem.productId] || [],
			})),
		});
	});

	test('should return null if no order is found', async () => {
		const data = await getOrderById('nonexistent');
		expect(data).toBeNull();
	});
});
