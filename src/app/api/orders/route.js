import { getOrders } from '@/data/data-access';

/**
 *
 * Fetches and returns a list of orders with some details that are required by the views.
 */
export async function GET() {
	try {
		let orders = await getOrders();
		if (!orders || orders.length === 0) {
			return Response.json(
				{ message: 'No orders found' },
				{ status: 404 }
			);
		}

		orders = orders.map(({ id, date, customer }) => {
			return {
				id,
				date,
				customer,
			};
		});
		return Response.json({ orders });
	} catch (error) {
		// console.error('Error fetching orders:', error);
		return Response.json(
			{ message: 'Error fetching orders' },
			{ status: 500 }
		);
	}
}
