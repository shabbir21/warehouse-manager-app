import { getOrderById } from '@/data/data-access';

export async function GET(request, { params }) {
	try {
		const { id } = await params;
		if (!id) {
			return Response.json(
				{ message: 'Order ID is required' },
				{ status: 400 }
			);
		}
		// we can do extra validation here but not required
		// Fetch the order by ID
		const order = await getOrderById(id);

		if (!order) {
			return Response.json(
				{ message: 'Order not found' },
				{ status: 404 }
			);
		}

		return Response.json({ order });
	} catch (error) {
		// console.error(`Error fetching order `, error);
		return Response.json(
			{ message: 'Error fetching order' },
			{ status: 500 }
		);
	}
}
