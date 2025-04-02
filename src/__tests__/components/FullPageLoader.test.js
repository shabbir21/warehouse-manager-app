import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import FullPageLoader from '@/components/FullPageLoader';

describe('FullPageLoader Component', () => {
	it('renders without errors', () => {
		render(<FullPageLoader />);
	});
});
