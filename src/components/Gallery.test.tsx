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
        // Otra opción:
        // const altText = images[0].getAttribute('alt');
        // expect(altText).toMatch(/Imagen destacada/);
    });

    it('The individual delete button should delete an image', async () => {
        render(<Gallery />);
        vi.spyOn(window, 'confirm').mockImplementation(() => true)
        const deleteButtons = screen.getAllByRole('button', {name: /eliminar imagen/i});
        
        await userEvent.click(deleteButtons[0])

        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(11);
    });
});

// toBeInTheDocument() espera un elemento HTML, no un array. getAllByRole devuelve un array.
// Para verificar la cantidad de imágenes necesitas toHaveLength:

// getByAltText() recoge el text de Alt, falla si encuentra más de uno, así que si solo hay una imagen con "Imagen destacada" en el alt, el test garantiza que solo hay una. 

// getByAltText(/Imagen destacada/)  Expresión regular //. Al poner / / el contenido se busca por coincidencia parcial.

// it('should identify first image as featured', () => {
//     render(<Gallery />);
//     const image = screen.getByAltText(/Imagen destacada/);
//     expect(image).toBeInTheDocument();
// });

// Así NO funciona pq toHaveAttribute espera ('atributo', 'valor') hace una comparación exacta de tipo ===. Al pasarle /Imagen destacada/, el test busca literalmente el texto con las barras inclinadas o directamente falla porque espera un string, no un objeto RegExp.
// it('should identify first image as featured', () => {
//     render(<Gallery />);
//     const images = screen.getAllByRole('img');
//     expect(images[0]).toHaveAttribute('alt', /Imagen destacada/);
// });


// Diferncias entre herramientas de testing:

// 1. VITEST organiza la estructura del experimento
// describe('Gallery Component', () => {
//     it('should render all images', () => {

        // 2. REACT TESTING LIBRARY monta el componente y busca los elementos
        // render(<Gallery />);
        // const images = screen.getAllByRole('img');

        // 3. VITEST (expect) + JEST-DOM (toHaveAttribute) comprueban el HTML
//         expect(images[0]).toHaveAttribute('alt', expect.stringContaining('Imagen destacada'));
//     });
// });
