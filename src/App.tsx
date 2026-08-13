import { GalleryContainer } from "./components/GalleryContainer";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "react-error-boundary";
import type { FallbackProps } from "react-error-boundary"

const ErrorFallback = ({ error }: FallbackProps ) => (
  <div role="alert" className="text-center p-8">
    <p className="text-red-800 font-semibold">Ha ocurrido un error al cargar la galería.</p>
    <pre className="text-sm text-gray-500 mt-2">{error instanceof Error ? error.message : String(error)}</pre>
  </div>
);

export const App = () => {

  return (
    <>
      <header className='py-3 md:py-4 lg:py-5 flex justify-center items-center'>
        <h1 className=' text-red-950 font-bold text-xl md:text-2xl lg:text-3xl'>Galería de imágenes</h1>
      </header>
      <Toaster position='bottom-center'></Toaster>
      <main>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <GalleryContainer></GalleryContainer>
        </ErrorBoundary>
      </main>
    </>
  )
}
