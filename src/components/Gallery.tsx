import { useState } from "react";
import type { Image } from "../types/image";
import { ImageItem } from "./ImageItem";

import { DragDropProvider } from "@dnd-kit/react";
import type { DragEndEvent, DragOverEvent } from "@dnd-kit/react";

// import { isSortable } from "@dnd-kit/react/sortable";
import { move } from "@dnd-kit/helpers";

import { useRef } from "react";


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
    // const [savedImages, setSavedImages] = useState<Image[]>(imagesList);

    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const handleDelete = (id: string) => {
        if (window.confirm('¿Eliminar esta imagen?')) {
            setImages(images.filter(img => img.id !== id));
        }
    }

    const previousImages = useRef<Image[]>(imagesList);

    // const handleDragEnd = (event: DragEndEvent) => {

    //     if (event.canceled || !event.operation.target) {
    //         setImages(savedImages);
    //         return;
    //     }

    //     const { source, target } = event.operation;

    //     if (!target || !isSortable(source) || !isSortable(target)) {
    //         console.log('returning early - no valid target');
    //         return;
    //     }

    // setImages(images => move(images, event));
    // setImages(move(images, source.index, target.index));
    //     setImages(move(images, event));
    // }

    // const handleDragEnd = ({operation: {source, target}}: DragEndEvent) => {

    // }

    const handleDragStart = () => {
        previousImages.current = images;
    };

    const handleDragOver = (event: DragOverEvent) => {
        setImages(images => move(images, event));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        if (event.canceled || !event.operation.target) {
            setImages(previousImages.current);
        }
    };

    const handleToggleSelect = (id: string) => {
        const newSelectedIds = new Set(selectedIds);

        if (selectedIds.has(id)) {
            newSelectedIds.delete(id);
            setSelectedIds(newSelectedIds);
            return;
        }

        newSelectedIds.add(id);
        setSelectedIds(newSelectedIds);
    }

    const handleDeleteSelected = () => {
        if (window.confirm(`Desea eliminar la selección de ${selectedIds.size} ${selectedIds.size > 1 ? "imágenes" : "imagen"}`)) {
            setImages(images.filter(image => (
                !selectedIds.has(image.id)
                ))
            )
            setSelectedIds(new Set());
        }
    }

    return (
        // <DragDropProvider onDragEnd={handleDragEnd} onDragOver={(event) => {
        //     console.log('dragOver:', event.operation.target?.id);
        // }} onDragStart={() => setSavedImages(images)}>

        <DragDropProvider onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>

            {selectedIds.size > 0 && (
                <button
                    className="flex justify-center items-center mx-auto rounded py-2 px-3 bg-red-800 text-white"
                onClick={handleDeleteSelected}
                >Borrar selección: {selectedIds.size} {selectedIds.size > 1 ? "imágenes" : "imagen"}
                </button>
            )
            }
            {/* <div role="region" */}
            {/* // role="region" indica que es una sección significativa de la página. La etiqueta <section> lo lleva implicito.     */}

            <section
                aria-label="Galería de imágenes"
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 container mx-auto p-4 pt-5 md:pt-8">
                {/* {images.map((image) => (
                <ImageItem image={image} isFeatured={image === images[0]}></ImageItem>
            ))} */}
                {images.map((image, index) => (
                    <ImageItem key={image.id} index={index} image={image} isFeatured={index === 0} onDelete={handleDelete} onToggleSelect={handleToggleSelect} isSelected={selectedIds.has(image.id)}></ImageItem>
                ))}
            </section>
        </DragDropProvider>
    )
}

// Equivalente:
// p-4 pt-8
// pt-8 px-4 pb-4
// tailwind aplica en cascada como css
// px-: todo el eje x
// py-: todo el eje y

//  es una convención nombrar los callbacks con el PREFIJO  ON.

// las props van de padre a hijo, de Gallery a ImageItem.
// Lo que va de hijo a padre son los callbacks. Pero el callback en sí también es una prop — Gallery lo define y lo pasa a ImageItem como prop. ImageItem lo recibe y lo llama cuando el usuario hace click.
// Es la forma que tiene React de comunicar hacia arriba — el hijo no sube datos directamente, sino que llama a una función que el padre le pasó.