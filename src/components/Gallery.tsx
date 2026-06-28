import { useState } from "react";
import type { Image } from "../types/image";
import { ImageItem } from "./ImageItem";

const imagesList: Image[] = [
    { id: '1', src: 'https://picsum.photos/id/11/400/300', alt: 'Río entre montañas' },
    { id: '2', src: 'https://picsum.photos/id/12/400/300', alt: 'Río desembocando en el mar' },
    { id: '3', src: 'https://picsum.photos/id/14/400/300', alt: 'Cala de rocas' },
    { id: '4', src: 'https://picsum.photos/id/15/400/300', alt: 'Cascada vista desde un acantilado' },
    { id: '5', src: 'https://picsum.photos/id/17/400/300', alt: 'Camino adentrandose en el bosque' },
    { id: '6', src: 'https://picsum.photos/id/18/400/300', alt: 'Espiga de trigo' },
    { id: '7', src: 'https://picsum.photos/id/19/400/300', alt: 'Tronco de árbol con musgo' },
    { id: '8', src: 'https://picsum.photos/id/29/400/300', alt: 'Cordillera nevada' },
    { id: '9', src: 'https://picsum.photos/id/46/400/300', alt: 'Montañas desérticas' },
    { id: '10', src: 'https://picsum.photos/id/35/400/300', alt: 'Cactus' },
    { id: '11', src: 'https://picsum.photos/id/82/400/300', alt: 'Flor de cerezo' },
    { id: '12', src: 'https://picsum.photos/id/70/400/300', alt: 'Camino entre arboles' },
]

export const Gallery = () => {
    // La sintaxis función(param: Tipo) es para definir el tipo de un parámetro en una función que tú escribes. Pero cuando llamas a una función ya existente como useState, no puedes añadir tipos a sus parámetros.
    // En cambio <Image[]> es cómo le dices a TypeScript el tipo del genérico — es la forma de parametrizar funciones genéricas ya definidas:
    const [images, setImages] = useState<Image[]>(imagesList);
    // Devuelve dos cosas:
    // images — el valor actual del estado (tu array de imágenes)
    // setImages — la función para actualizarlo
    return (
        <div role="region"
            // role="region" indica que es una sección significativa de la página
            aria-label="Galería de imágenes"
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 container mx-auto p-4 pt-8">
            {/* {images.map((image) => (
                <ImageItem image={image} isFeatured={image === images[0]}></ImageItem>
            ))} */}
            {images.map((image, index) => (
                <ImageItem key={image.id} image={image} isFeatured={index === 0}></ImageItem>
            ))}
        </div>
    )
}

// Equivalente:
// p-4 pt-8
// pt-8 px-4 pb-4
// tailwind aplica en cascada como css
// px-: todo el eje x
// py-: todo el eje y