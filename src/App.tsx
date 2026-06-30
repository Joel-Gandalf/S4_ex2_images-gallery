import { Gallery } from './components/Gallery';
// import './App.css'

export const App = () => {

  return (
    <>
      <header className='py-3 md:py-4 lg:py-5 flex justify-center items-center'>
        <h1 className=' text-red-950 font-bold text-xl md:text-2xl lg:text-3xl'>Galería de imágenes</h1>
      </header>
      <main>
        <Gallery></Gallery>
      </main>
    </>
  )
}
