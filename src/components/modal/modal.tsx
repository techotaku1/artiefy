import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export function Modal({ isOpen, closeModal }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="w-9/12 h-auto relative rounded bg-white p-8 shadow-lg z-50">
        <Cross1Icon className="absolute right-0 mr-6 size-8 cursor-pointer" onClick={closeModal}/>
        <h2 className="text-2xl font-bold mb-6">Crear curso</h2>
        <div>
        <label htmlFor="email">Titulo del curso</label>
          <Input className="w-5/6"/>
        </div>
        <div className="flex text-black">
          <div className="flex flex-col gap- mx-12">
              <label htmlFor="categoria">Categoría del curso</label>
              <div>
                <input type="radio" id="ingenieria" name="categoria" value="ingenieria"/>
                <label htmlFor="ingenieria">Ingeniería</label>
              </div>
              <div>
                <input type="radio" id="matematicas" name="categoria" value="matematicas"/>
                <label htmlFor="matematicas">Matemáticas</label>
              </div>
              <div>
                <input type="radio" id="economia" name="categoria" value="economia"/>
                <label htmlFor="economia">Economía</label>
              </div>
            </div>
            <div className="flex flex-col gap-4 mx-12">
              <label htmlFor="dificultad">Nivel de dificultad</label>
              <div>
                <input type="radio" id="introduccion" name="dificultad" value="introduccion"/>
                <label htmlFor="introduccion">Introducción</label>
              </div>
              <div>
                <input type="radio" id="intermedio" name="dificultad" value="intermedio"/>
                <label htmlFor="intermedio">Intermedio</label>
              </div>
              <div>
                <input type="radio" id="avanzado" name="dificultad" value="avanzado"/>
                <label htmlFor="avanzado">Avanzado</label>
              </div>
          </div>
        </div>
        <div className="text-black w-11/12">
          <label>Descripcion</label>
          <textarea className="w-5/6 rounded-sm border border-primary" placeholder="Escriba aqui la descripcion que llevara el curso"/>
        </div>
        
        <div className="flex justify-center">
        <Button 
          className={buttonVariants()}
        >
          Crear curso
        </Button>
        </div>
      </div>
    </div>
  );
}
