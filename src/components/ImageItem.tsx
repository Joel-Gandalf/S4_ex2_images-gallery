import type { Image } from "../types/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";
import { pointerIntersection } from "@dnd-kit/collision";

interface ImageItemProps {
    image: Image;
    isFeatured: boolean;
    onDelete: (id: string) => void;
    index: number;
    isSelected: boolean;
    onToggleSelect: (id: string) => void;
}

const buttonDeleteStyles = "absolute top-2 right-2 bg-white/60 text-red-800 border-none hover:bg-destructive/70 hover:text-white hover:shadow-[0_0_0_3px_rgba(220,38,38,0.25)] hover:cursor-pointer"

export const ImageItem = ({ image, isFeatured, onDelete, index, isSelected, onToggleSelect }: ImageItemProps) => {

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
                onToggleSelect(image.id);
            }}
            onKeyDown= {(event) => {
                if (event.key === ' ' || event.key === 'Enter') {
                    event.preventDefault();
                    onToggleSelect(image.id);
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
                    onDelete(image.id);
                }}><Trash2 /></Button>
        </figure>
    )
}