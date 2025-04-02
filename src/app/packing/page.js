'use client';

import { useState, useEffect } from 'react';
import OrderDetailOverlay from '@/components/OrderDetailOverlay';
import FullPageLoader from '@/components/FullPageLoader';
import { format } from 'date-fns';
import HomeButton from '@/components/HomeButton';

// This function fetches the orders from the API and adds a default status of "Pending" to each order
async function fetchOrders() {
	const response = await fetch('/api/orders');
	if (!response.ok) {
		throw new Error('Failed to fetch orders');
	}
	const data = await response.json();
	const ordersWithStatus = data?.orders?.map((order) => ({
		...order,
		status: 'Pending',
	}));
	return ordersWithStatus; // Extract the orders array
}

export default function PackingPage() {
	const [orders, setOrders] = useState([]);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadData() {
			try {
				const data = await fetchOrders();
				setOrders(data);
			} catch (error) {
				// console.error(error);
				// Handle error (e.g., show an error message)
				// show an error message
			} finally {
				setLoading(false);
			}
		}

		loadData();
	}, []);

	const handleOrderClick = (order) => {
		setSelectedOrder(order);
	};

	const handleOrderComplete = (orderId) => {
		const updatedOrders = orders.map((order) =>
			order.id === orderId ? { ...order, status: 'Completed' } : order
		);
		setOrders(updatedOrders);
		setSelectedOrder(null); // Close the overlay
	};

	const handleCloseOverlay = () => {
		setSelectedOrder(null);
	};

	if (loading) {
		return <FullPageLoader />;
	}

	return (
		<main className="min-h-screen bg-gray-100 py-6 flex flex-col items-center justify-center">
			<div className="flex items-center mb-4">
				<HomeButton />
				<h1 className="text-2xl font-semibold">Packing Orders</h1>
			</div>
			<div className="bg-white shadow-md rounded-md overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Order ID
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Customer Name
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Order Date
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Packing Status
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{orders.map((order) => (
							<tr key={order.id}>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{order.id}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{order.customer.name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{format(
										new Date(order.date),
										'MMMM do, yyyy'
									)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
									{/* lets show a green checkmark here */}
									<span
										className={`inline-block w-3 h-3 rounded-full ${
											order.status === 'Completed'
												? 'bg-green-500'
												: 'bg-yellow-500'
										}`}
									></span>
									{/* {order.status} */}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
									<button
										onClick={() => handleOrderClick(order)}
										className="text-indigo-600 hover:text-indigo-900"
									>
										View Details
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{selectedOrder && (
				<OrderDetailOverlay
					orderId={selectedOrder.id} // Pass orderId instead of order
					onComplete={handleOrderComplete}
					onClose={handleCloseOverlay}
				/>
			)}
		</main>
	);
}
