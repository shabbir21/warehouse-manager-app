export default function FullPageLoader() {
	return (
		<div className="fixed top-0 left-0 w-full h-full bg-white opacity-75 flex items-center justify-center">
			<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
		</div>
	);
}
