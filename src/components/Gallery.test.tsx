import { render, screen } from '@testing-library/react';
import { Gallery } from './Gallery';

// import { describe } from "@types/jest";

describe('Gallery Component', () => {
    it('should render gallery title', () => {
        render(<Gallery />);
        const heading = screen.getByText('Image Gallery');
        expect(heading).toBeInTheDocument();
    });
});