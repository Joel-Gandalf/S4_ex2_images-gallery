import type { Image } from "../types/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";
import { pointerIntersection } from "@dnd-kit/collision";

import { useGalleryContext } from "@/hooks/useGalleryContext";

interface ImageItemProps {
    image: Image;
    isFeatured: boolean;
    // onDelete: (id: string) => void;
    index: number;
    isSelected: boolean;
    // onToggleSelect: (id: string) => void;
}

const buttonDeleteStyles = "absolute top-2 right-2 bg-white/60 text-red-800 border-none hover:bg-destructive/70 hover:text-white hover:shadow-[0_0_0_3px_rgba(220,38,38,0.25)] hover:cursor-pointer"

export const ImageItem = ({ image, isFeatured, index, isSelected }: ImageItemProps) => {

    const {handleDelete, handleToggleSelect} = useGalleryContext();

    const {ref, isDragging} = useSortable({
        id: image.id,
        index,
        collisionDetector: pointerIntersection,
    });

    return (
        <figure 
            ref={ref}
            tabIndex={0}
            className={`relative ${isFeatured ? 'lg:col-span-2 lg:row-span-2' : ''} ${isDragging ? 'opacity-30' : ''} ${isSelected ? 'ring-5 ring-cyan-800 rounded-xs' : ''}`} 
            aria-roledescription="imagen arrastrable"
            onClick={()=> {
                handleToggleSelect(image.id);
            }}
            onKeyDown= {(event) => {
                if (event.key === ' ' || event.key === 'Enter') {
                    event.preventDefault();
                    handleToggleSelect(image.id);
                }
            }}
            >
            
            <img 
                id={image.id} 
                src={image.src} 
                alt={isFeatured ? `Imagen destacada: ${image.alt}` : image.alt} 
                className={`w-full h-full ${isSelected ? 'rounded-xs' : 'rounded-none'}`} 
                fetchPriority={isFeatured ? "high" : "auto"} />
            
            {isSelected && <div className="absolute inset-0 bg-cyan-700/20 rounded-xs" />}
            
            <Button
                className={buttonDeleteStyles}
                variant="destructive"
                size="icon"
                aria-label="Eliminar imagen"
                onClick={(event) => {
                    event.stopPropagation();
                    handleDelete(image.id);
                }}><Trash2 /></Button>
        </figure>
    )
}

// La convención onX vs handleX en React:

// onX (onDelete, onToggleSelect) se usa para el nombre de la prop que declaras en la interfaz, desde el punto de vista de quien la recibe — indica "esto es un callback que se dispara cuando ocurre X". Es lo que hacías antes: ImageItem declaraba onDelete como prop porque, desde su perspectiva, es "el evento al que reacciono".

// handleX (handleDelete, handleToggleSelect) se usa para el nombre de la función que implementa la lógica, desde el punto de vista de quien la define. Es lo que sigue haciendo GalleryContainer: define handleDelete porque es quien "maneja" el borrado.