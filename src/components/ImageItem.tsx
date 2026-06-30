import type { Image } from "../types/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ImageItemProps {
    image: Image;
    isFeatured: boolean;
    onDelete: (id: string) => void;
}

// export const ImageItem = (props: ImageItemProps) => {
//     return (
//         <img id={props.image.id} src={props.image.src} alt={props.image.alt} className={props.isFeatured ? 'featured' : ''}/>
//     )
// }


// React sigue pasando el objeto props internamente.
// JavaScript desestructura el objeto props automáticamente en el parámetro. El objeto sigue existiendo, simplemente no se ve.
export const ImageItem = ({image, isFeatured, onDelete}: ImageItemProps) => {
    return (
        <div className= {`relative ${isFeatured ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
            <img id={image.id} src={image.src} alt={isFeatured ? `Imagen destacada: ${image.alt}` : image.alt} className={'w-full h-full'}/>
            <Button
                className="absolute top-2 right-2 bg-white/50 text-red-800 hover:bg-destructive/45 hover:text-white hover:shadow-[0_0_0_3px_rgba(220,38,38,0.3)] hover:border-none hover:cursor-pointer"
                variant="destructive"
                size="icon"
                aria-label="Eliminar imagen"
                onClick={(event) => {
                    event.stopPropagation();
                    onDelete(image.id);
            }}><Trash2 /></Button>
        </div>
    )
}


// stopPropagation() — detiene que el evento se propague hacia elementos padre (bubbling). Evita que un click en el botón también dispare un listener en el <div> contenedor.
// preventDefault() — evita el comportamiento por defecto del navegador para ese elemento/evento. Por ejemplo: en un <a href="..."> evita la navegación, en un <form> evita el envío y recarga de página.
// En tu caso concreto, un <button> dentro de un <div> no tiene ningún comportamiento por defecto que prevenir — no navega, no envía nada. Así que preventDefault() no te hace falta aquí.
// Sí sería necesario si en el futuro tu botón estuviera dentro de un <form>, donde por defecto el click en un botón puede disparar el submit.