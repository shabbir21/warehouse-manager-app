import Link from 'next/link';

export default function HomeButton() {
	return (
		<Link
			href="/"
			className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
		>
			Home
		</Link>
	);
}
{
}
