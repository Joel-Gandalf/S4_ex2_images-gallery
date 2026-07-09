import { render, screen } from '@testing-library/react';
import { App } from './App';


describe('App Component', () => {
    it('should render gallery title', () => {
        render(<App />);
        const heading = screen.getByText('Galería de imágenes');
        expect(heading).toBeInTheDocument();
    });
});