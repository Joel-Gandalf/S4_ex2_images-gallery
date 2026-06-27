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
]

export const Gallery = () => {
    const [images, setImages] = useState<Image[]>(imagesList);
    // Devuelve dos cosas:
    // images — el valor actual del estado (tu array de imágenes)
    // setImages — la función para actualizarlo
    return (
        <div>
            {/* {images.map((image) => (
                <ImageItem image={image} isFeatured={image === images[0]}></ImageItem>
            ))} */}
            {images.map((image, index) => (
                <ImageItem key={image.id} image={image} isFeatured={index === 0}></ImageItem>
            ))}
        </div>
    )
}