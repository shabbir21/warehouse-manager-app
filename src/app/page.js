import Link from 'next/link';

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
			<h1 className="text-4xl font-bold mb-8 ">Warehouse Manager App</h1>
			<div className="flex space-x-4">
				<Link
					href="/picking"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Picking
				</Link>
				<Link
					href="/packing"
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Packing
				</Link>
			</div>
			<p className="text-sm text-gray-500 mt-4">
				Select an option to proceed.
			</p>
		</main>
	);
}
