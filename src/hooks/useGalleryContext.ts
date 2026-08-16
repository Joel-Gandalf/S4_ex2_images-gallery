import { useContext } from "react";
import { GalleryContext } from "@/contexts/GalleryContext";

export const useGalleryContext = () => {
    const context = useContext(GalleryContext);

    if (context === undefined) {
        throw new Error("useGalleryContext debe usarse dentro de un GalleryContext.Provider ");
    }

    return context;
}