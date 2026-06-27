import type { Image } from "../types/image";

interface ImageItemProps {
    image: Image;
    isFeatured: boolean;
}

export const ImageItem = (props: ImageItemProps) => {
    return (
        <img id={props.image.id} src={props.image.src} alt={props.image.alt} />
    )
}