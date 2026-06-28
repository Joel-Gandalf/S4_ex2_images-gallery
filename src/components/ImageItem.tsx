import type { Image } from "../types/image";

interface ImageItemProps {
    image: Image;
    isFeatured: boolean;
}

// export const ImageItem = (props: ImageItemProps) => {
//     return (
//         <img id={props.image.id} src={props.image.src} alt={props.image.alt} className={props.isFeatured ? 'featured' : ''}/>
//     )
// }


// React sigue pasando el objeto props internamente.
// JavaScript desestructura el objeto props automáticamente en el parámetro. El objeto sigue existiendo, simplemente no se ve.
export const ImageItem = ({image, isFeatured}: ImageItemProps) => {
    return (
        <img id={image.id} src={image.src} alt={image.alt} className={isFeatured ? 'featured' : ''}/>
    )
}