import type { Image } from "../types/image";

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
        <div className= {`w-full h-full ${isFeatured ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
            <img id={image.id} src={image.src} alt={isFeatured ? `Imagen destacada: ${image.alt}` : image.alt} />
            <button onClick={(event) => {
                event.stopPropagation;
                onDelete(image.id);
            }}>Eliminar</button>
        </div>
    )
}