// src/components/OrderDetailOverlay.js
import { useState, useEffect } from 'react';

import FullPageLoader from './FullPageLoader';

async function fetchOrderDetails(orderId) {
	const response = await fetch(`/api/orders/${orderId}`);
	if (!response.ok) {
		throw new Error('Failed to fetch order details');
	}
	const data = await response.json();
	return data.order; // Extract the order object
}

export default function OrderDetailOverlay({ orderId, onComplete, onClose }) {
	const [order, setOrder] = useState(null);
	const [productsInBoxes, setProductsInBoxes] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadData() {
			try {
				const orderData = await fetchOrderDetails(orderId);
				setOrder(orderData);

				const productsMap = {};
				for (const lineItem of orderData.lineItems) {
					const products = lineItem.products;
					productsMap[lineItem.productId] = products;
				}
				setProductsInBoxes(productsMap);
			} catch (error) {
				// console.error(error);
				// Handle error (e.g., show an error message)
			} finally {
				setLoading(false);
			}
		}
		loadData();
	}, [orderId]);

	if (!order || loading) return <FullPageLoader />; // Replace with your loader

	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white rounded-lg p-8 w-1/2 overflow-y-auto">
				<h2 className="text-2xl font-bold mb-4">
					Order Details - {order.id}
				</h2>

				<div className="mb-4">
					<h3 className="text-xl font-semibold mb-2">
						Shipping Information
					</h3>
					<p>Customer Name: {order.customer.name}</p>{' '}
					{/* Access customer.name */}
					<p>
						Shipping Address: {order.shippingAddress.street},{' '}
						{order.shippingAddress.city},{' '}
						{order.shippingAddress.province},{' '}
						{order.shippingAddress.postalCode}
					</p>
				</div>

				<div className="mb-4">
					<h3 className="text-xl font-semibold mb-2">Order Items</h3>
					{order.lineItems.map((lineItem) => (
						<div
							key={lineItem.id}
							className="mb-2 p-4 border rounded"
						>
							<p className="font-semibold">
								{lineItem.productName}
							</p>
							<ul>
								{productsInBoxes[lineItem.productId]?.map(
									(product) => (
										<li key={product.productId}>
											{product.productName} (Qty: 1)
										</li>
									)
								)}
							</ul>
						</div>
					))}
				</div>

				<div className="flex justify-end space-x-4">
					<button
						onClick={onClose}
						className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Close
					</button>
					<button
						onClick={() => onComplete(order.id)}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Mark Completed
					</button>
				</div>
			</div>
		</div>
	);
}
