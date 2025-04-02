// src/data/data-access.js
import orders from './orders.json';
import products from './products.json';

export const getOrders = async () => {
	return Promise.resolve(orders);
};

export const getOrderById = async (orderId) => {
	const order = orders.find((order) => order.id === orderId);
	if (!order) {
		return Promise.resolve(null);
	}
	order.lineItems = order.lineItems.map((lineItem) => {
		return {
			...lineItem,
			products: products[lineItem.productId] || [],
		};
	});

	return Promise.resolve(order);
};

export const getProductsMap = async () => {
	return Promise.resolve(products);
};

export const getProductsInBox = async (boxId) => {
	return Promise.resolve(products[boxId] || []);
};
