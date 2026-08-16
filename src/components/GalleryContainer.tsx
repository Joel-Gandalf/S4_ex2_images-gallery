import { useState } from "react";
import type { Image } from "../types/image";
import { imagesList } from "@/data/images";

import type { DragEndEvent, DragOverEvent } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { useRef } from "react";

import { toast } from "sonner";

import { GalleryPresenter } from "./GalleryPresenter";
import { GalleryContext } from "@/contexts/GalleryContext";

export const GalleryContainer = () => {
    const [images, setImages] = useState<Image[]>(imagesList);

    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const handleDelete = (id: string) => {
        if (window.confirm('¿Eliminar esta imagen?')) {
            setImages(images.filter(img => img.id !== id));
        }
    }

    const previousImages = useRef<Image[]>(imagesList);

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
            toast("Selección de imágenes eliminada");
        }
    }
    return (
        <GalleryContext.Provider value={{ handleDelete, handleToggleSelect }}>
            <GalleryPresenter handleDragStart={handleDragStart} handleDragOver={handleDragOver} handleDragEnd={handleDragEnd} selectedIds={selectedIds} handleDeleteSelected={handleDeleteSelected} images={images} />
        </GalleryContext.Provider>
    )
}