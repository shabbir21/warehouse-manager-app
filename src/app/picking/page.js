// src/app/picking/page.js
'use client'; // Mark component as client-side

import { useState, useEffect } from 'react';
import FullPageLoader from '@/components/FullPageLoader';
import HomeButton from '@/components/HomeButton';

// Function to fetch the picking list from the API
async function fetchPickingList() {
	const response = await fetch('/api/picking-list');
	if (!response.ok) {
		throw new Error('Failed to fetch picking list');
	}
	const data = await response.json();
	return data.pickingList || []; // Ensure we return an array
}

export default function PickingPage() {
	const [pickingList, setPickingList] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadData() {
			try {
				const data = await fetchPickingList();
				setPickingList(data);
			} catch (error) {
				//console.error('Error fetching picking list:', error);
				// show an error message
			} finally {
				setLoading(false);
			}
		}

		loadData();
	}, []);

	if (loading) {
		return <FullPageLoader />;
	}

	return (
		<main className="min-h-screen bg-gray-100 py-6 flex flex-col items-center justify-center">
			<div className="flex items-center mb-4">
				<HomeButton />
				<h1 className="text-2xl font-semibold">Picking List</h1>
			</div>
			<div className="bg-white shadow-md rounded-md overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								#
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Product Name
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Quantity
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{pickingList.map((item, index) => (
							<tr key={index}>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{index + 1}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{item.name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
									{item.quantity}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	);
}
