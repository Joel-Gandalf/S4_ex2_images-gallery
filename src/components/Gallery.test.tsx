import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Gallery } from './Gallery';

describe('Gallery Component', () => {
    it('should render all images', () => {
        render(<Gallery />);
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(12);
    });

    it('should identify first image as featured', () => {
        render(<Gallery />);
        const images = screen.getAllByRole('img');
        expect(images[0]).toHaveAttribute('alt', expect.stringContaining('Imagen destacada'));
    });

    it('The individual delete button should delete an image', async () => {
        render(<Gallery />);
        vi.spyOn(window, 'confirm').mockImplementation(() => true);
        const initialImages = screen.getAllByRole('img');
        const totalInitialImages = initialImages.length;
        
        const deleteButtons = screen.getAllByRole('button', {name: /eliminar imagen/i});
        await userEvent.click(deleteButtons[0]);

        const finalImages = screen.getAllByRole('img');
        expect(finalImages).toHaveLength(totalInitialImages -1);
    });

    it('It should allow selecting multiple images and deleting them.', async () => {
        render(<Gallery />);
        vi.spyOn(window, 'confirm').mockImplementation(() => true);
        const initialImages = screen.getAllByRole('img');
        const totalInitialImages = initialImages.length;
        
        await userEvent.click(initialImages[0]);
        await userEvent.click(initialImages[1]);

        const deleteButton = screen.getByRole('button', {name: /borrar selección/i});
        expect(deleteButton).toBeInTheDocument();
        
        await userEvent.click(deleteButton);

        const finalImages = screen.getAllByRole('img');
        expect(finalImages).toHaveLength(totalInitialImages -2);
    });
});
