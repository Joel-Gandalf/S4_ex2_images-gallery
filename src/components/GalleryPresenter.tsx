// import { useState } from "react";
import type { Image } from "../types/image";
import { ImageItem } from "./ImageItem";
// import { imagesList } from "@/data/images";

import { DragDropProvider } from "@dnd-kit/react";
import type { DragEndEvent, DragOverEvent } from "@dnd-kit/react";
// import { move } from "@dnd-kit/helpers";
// import { useRef } from "react";

// import { toast } from "sonner";

interface GalleryPresenterProps {
    handleDragStart: () => void;
    handleDragOver: (event: DragOverEvent) => void;
    handleDragEnd: (event: DragEndEvent) => void;
    selectedIds: Set<string>
    handleDeleteSelected: () => void;
    images: Image[]
    // handleDelete: (id: string) => void;
    // handleToggleSelect: (id: string) => void;

}

export const GalleryPresenter = ({handleDragStart, handleDragOver, handleDragEnd, selectedIds, handleDeleteSelected, images}: GalleryPresenterProps) => {

    // const [images, setImages] = useState<Image[]>(imagesList);

    // const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    // const handleDelete = (id: string) => {
    //     if (window.confirm('¿Eliminar esta imagen?')) {
    //         setImages(images.filter(img => img.id !== id));
    //     }
    // }

    // const previousImages = useRef<Image[]>(imagesList);

    // const handleDragStart = () => {
    //     previousImages.current = images;
    // };

    // const handleDragOver = (event: DragOverEvent) => {
    //     setImages(images => move(images, event));
    // };

    // const handleDragEnd = (event: DragEndEvent) => {
    //     if (event.canceled || !event.operation.target) {
    //         setImages(previousImages.current);
    //     }
    // };

    // const handleToggleSelect = (id: string) => {
    //     const newSelectedIds = new Set(selectedIds);

    //     if (selectedIds.has(id)) {
    //         newSelectedIds.delete(id);
    //         setSelectedIds(newSelectedIds);
    //         return;
    //     }

    //     newSelectedIds.add(id);
    //     setSelectedIds(newSelectedIds);
    // }

    // const handleDeleteSelected = () => {
    //     if (window.confirm(`Desea eliminar la selección de ${selectedIds.size} ${selectedIds.size > 1 ? "imágenes" : "imagen"}`)) {
    //         setImages(images.filter(image => (
    //             !selectedIds.has(image.id)
    //             ))
    //         )
    //         setSelectedIds(new Set());
    //         toast("Selección de imágenes eliminada");
    //     }
    // }

    return (

        <DragDropProvider onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>

            {selectedIds.size > 0 && (
                <button
                    className="flex justify-center items-center mx-auto rounded py-2 px-3 bg-red-800 text-white cursor-pointer"
                    onClick={handleDeleteSelected}
                >Borrar selección: {selectedIds.size} {selectedIds.size > 1 ? "imágenes" : "imagen"}
                </button>
            )}

            <section
                aria-label="Galería de imágenes"
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 container mx-auto p-4 pt-5 md:pt-8">
                {images.map((image, index) => (
                    <ImageItem key={image.id} index={index} image={image} isFeatured={index === 0} isSelected={selectedIds.has(image.id)}></ImageItem>
                ))}
            </section>
        </DragDropProvider>
    )
}