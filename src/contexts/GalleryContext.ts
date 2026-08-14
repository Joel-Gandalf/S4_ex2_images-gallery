import { createContext } from "react";

interface GalleryContextType {
    handleDelete: (id: string) => void;
    handleToggleSelect: (id: string) => void;
}

export const GalleryContext = createContext<GalleryContextType | undefined>(undefined);