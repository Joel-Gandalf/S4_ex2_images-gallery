import type { Image } from "../types/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ImageItemProps {
    image: Image;
    isFeatured: boolean;
    onDelete: (id: string) => void;
}

const buttonDeleteStyles = "absolute top-2 right-2 bg-white/60 text-red-800 border-none hover:bg-destructive/70 hover:text-white hover:shadow-[0_0_0_3px_rgba(220,38,38,0.25)] hover:cursor-pointer"

// export const ImageItem = (props: ImageItemProps) => {
//     return (
//         <img id={props.image.id} src={props.image.src} alt={props.image.alt} className={props.isFeatured ? 'featured' : ''}/>
//     )
// }

// React sigue pasando el objeto props internamente.
// JavaScript desestructura el objeto props automáticamente en el parámetro. El objeto sigue existiendo, simplemente no se ve.
export const ImageItem = ({ image, isFeatured, onDelete }: ImageItemProps) => {

    return (
        <figure className={`relative ${isFeatured ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
            <img id={image.id} src={image.src} alt={isFeatured ? `Imagen destacada: ${image.alt}` : image.alt} className='w-full h-full' />
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


// stopPropagation() — detiene que el evento se propague hacia elementos padre (bubbling). Evita que un click en el botón también dispare un listener en el <div> contenedor.
// preventDefault() — evita el comportamiento por defecto del navegador para ese elemento/evento. Por ejemplo: en un <a href="..."> evita la navegación, en un <form> evita el envío y recarga de página.
// En tu caso concreto, un <button> dentro de un <div> no tiene ningún comportamiento por defecto que prevenir — no navega, no envía nada. Así que preventDefault() no te hace falta aquí.
// Sí sería necesario si en el futuro tu botón estuviera dentro de un <form>, donde por defecto el click en un botón puede disparar el submit.


// Lifting state upGestión de estado inmutable
// Significa que cuando actualizas el estado, nunca modificas el array u objeto original directamente — siempre creas uno nuevo. Es lo que ya estás haciendo con filter:
// tsxsetImages(images.filter(img => img.id !== id))
// filter no modifica images, crea un array nuevo. La alternativa incorrecta sería algo como images.splice(...), que muta el array original — React no detectaría el cambio correctamente y podría no re-renderizar.

// Lifting state up
// Es el patrón que ya has aplicado sin saber el nombre — cuando varios componentes necesitan compartir o reaccionar al mismo estado, ese estado se "eleva" al componente padre común más cercano.
// En tu caso: images podría haber vivido dentro de ImageItem, pero como Gallery necesita gestionar la lista completa (eliminar, reordenar...), el estado se "elevó" a Gallery, que es el padre. ImageItem recibe los datos por props en vez de tener su propio estado.
// Es exactamente lo que hiciste al poner useState en Gallery en vez de en ImageItem.