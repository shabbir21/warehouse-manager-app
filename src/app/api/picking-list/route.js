import { getOrders, getProductsInBox } from '@/data/data-access';

/**
 *
 * Generates and returns a consolidated picking list based on orders.
 */
export async function GET() {
	try {
		// Fetch orders from the data access layer
		const orders = await getOrders();

		if (!orders || orders.length === 0) {
			return Response.json(
				{ message: 'No orders found' },
				{ status: 404 }
			);
		}
		// Create a picking list
		let pickingList = {};
		for (let order of orders) {
			for (let lineItem of order.lineItems) {
				const productsInBox = await getProductsInBox(
					lineItem.productId
				);
				// Iterate over products in box
				for (let product of productsInBox) {
					if (!pickingList[product.productName]) {
						pickingList[product.productName] = 0;
					}
					pickingList[product.productName]++;
				}
			}
		}

		// Converting pickingList object to an array of objects
		// [{ name: 'productName', quantity: 1 }, ...]
		pickingList = Object.keys(pickingList).map((name) => ({
			name,
			quantity: pickingList[name],
		}));
		return Response.json({ pickingList });
	} catch (error) {
		return Response.json(
			{ message: 'Error generating picking list' },
			{ status: 500 }
		);
	}
}
