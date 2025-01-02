"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState, type ChangeEvent } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import CategoryDropdown from "~/components/layout/CategoryDropdown";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Progress } from "~/components/ui/progress";

interface CourseFormProps {
  onSubmitAction: (
    title: string,
    description: string,
    file: File | null,
    category: number,
    rating: number,
  ) => Promise<void>;
  uploading: boolean;
  editingCourseId: number | null;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  category: number;
  setCategory: (category: number) => void;
  rating: number;
  setRating: (rating: number) => void;
  coverImageKey: string;
  setCoverImageKey: (coverImageKey: string) => void;
  isOpen: boolean;
  onCloseAction: () => void;
}

export default function CourseForm({
  onSubmitAction,
  uploading,
  editingCourseId,
  isOpen,
  onCloseAction,
}: CourseFormProps) {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(0);
  const [rating, setRating] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    category: false,
    rating: false,
    file: false,
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      setFile(files[0]);
      setFileName(files[0].name);
      setFileSize(files[0].size);
      setErrors((prev) => ({ ...prev, file: false }));
    } else {
      setFile(null);
      setFileName(null);
      setFileSize(null);
      setErrors((prev) => ({ ...prev, file: true }));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files?.[0]) {
      setFile(files[0]);
      setFileName(files[0].name);
      setFileSize(files[0].size);
      setErrors((prev) => ({ ...prev, file: false }));
    } else {
      setFile(null);
      setFileName(null);
      setFileSize(null);
      setErrors((prev) => ({ ...prev, file: true }));
    }
  };

  const handleSubmit = async () => {
    const newErrors = {
      title: !title,
      description: !description,
      category: !category,
      rating: !rating,
      file: !file,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setIsEditing(true);
    try {
      await onSubmitAction(title, description, file, category, rating);
      console.log("Datos enviados:", {
        title,
        description,
        file,
        categoryid: category,
        rating,
      });
    } catch (error) {
      console.error("Error al enviar:", error);
    }
  };

  useEffect(() => {
    if (uploading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 50); // Ajusta el intervalo según sea necesario

      return () => clearInterval(interval);
    }
  }, [uploading]);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setProgress(0);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [progress]);

  useEffect(() => {
    if (!uploading && isEditing) {
      setIsEditing(false);
    }
  }, [uploading, isEditing]);

  return (
    <Dialog open={isOpen} onOpenChange={onCloseAction}>
      <DialogContent className="max-w-5/6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mt-4">
          <DialogTitle className="text-4xl">
            {editingCourseId ? "Editar Curso" : "Crear Curso"}
          </DialogTitle>
          <DialogDescription className="text-xl text-white">
            {editingCourseId
              ? "Edita los detalles del curso"
              : "Llena los detalles para crear un nuevo curso"}
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-lg bg-background px-6 text-black shadow-md">
          <label htmlFor="title" className="text-lg font-medium text-primary">
            Título
          </label>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prev) => ({ ...prev, title: !e.target.value }));
            }}
            className={`mb-4 w-full rounded border p-2 text-black outline-none ${errors.title ? "border-red-500" : "border-primary"}`}
          />
          {errors.title && (
            <p className="text-sm text-red-500">Este campo es obligatorio.</p>
          )}
          <label
            htmlFor="description"
            className="text-lg font-medium text-primary"
          >
            Descripción
          </label>
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors((prev) => ({ ...prev, description: !e.target.value }));
            }}
            className={`mb-3 w-full rounded border p-2 text-black outline-none ${errors.description ? "border-red-500" : "border-primary"}`}
          />
          {errors.description && (
            <p className="text-sm text-red-500">Este campo es obligatorio.</p>
          )}
          <CategoryDropdown
            category={category}
            setCategory={setCategory}
            errors={errors}
          />
          {errors.category && (
            <p className="text-sm text-red-500">Este campo es obligatorio.</p>
          )}
          <label htmlFor="instructor" className="text-lg font-medium text-primary">
            Instructor
          </label>
          <div className="mb-4 w-full rounded border border-primary p-2">
            <h3 className="text-lg font-medium text-primary">
              Instructor: {user?.fullName}
            </h3>
          </div>
          <label htmlFor="rating" className="text-lg font-medium text-primary">
            Calificación
          </label>
          <input
            type="number"
            placeholder="Calificación"
            value={rating}
            onChange={(e) => {
              setRating(Number(e.target.value));
              setErrors((prev) => ({ ...prev, rating: !e.target.value }));
            }}
            className={`mb-4 w-full rounded border p-2 text-black outline-none ${errors.rating ? "border-red-500" : "border-primary"}`}
          />
          {errors.rating && (
            <p className="text-sm text-red-500">Este campo es obligatorio.</p>
          )}
          <label htmlFor="file" className="text-lg font-medium text-primary">
            Imagen de portada
          </label>
          <div
            className={`mx-auto w-1/2 rounded-lg border-2 border-dashed border-primary p-8 ${isDragging ? "border-blue-500 bg-blue-50" : errors.file ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50"} transition-all duration-300 ease-in-out`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <FiUploadCloud className="mx-auto h-12 w-12 text-primary" />
              <h2 className="mt-4 text-xl font-medium text-gray-700">
                Arrastra y suelta tu imagen aquí
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                o haz clic para seleccionar un archivo desde tu computadora
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Supports: JPG, PNG, GIF (Max size: 5MB)
              </p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                id="file-upload"
              />

              <label
                htmlFor="file-upload"
                className="mt-4 inline-flex cursor-pointer items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Seleccionar Archivo
              </label>
            </div>
          </div>
          {fileName && (
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-medium text-primary">
                Vista previa de la imagen
              </h3>
              <div className="group relative overflow-hidden rounded-lg bg-gray-100">
                {file && (
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    width={500}
                    height={200}
                    className="h-48 w-full object-cover"
                  />
                )}
                <button
                  onClick={() => {
                    setFile(null);
                    setFileName(null);
                    setFileSize(null);
                    setErrors((prev) => ({ ...prev, file: true }));
                  }}
                  className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                  <MdClose className="h-5 w-5" />
                </button>
                <div className="flex justify-between p-2">
                  <p className="truncate text-sm text-gray-500">{fileName}</p>
                  <p className="text-sm text-gray-500">
                    {((fileSize ?? 0) / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
            </div>
          )}
          {errors.file && (
            <p className="text-sm text-red-500">Este campo es obligatorio.</p>
          )}
          {uploading && <Progress value={progress} className="my-4 w-full" />}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} variant="save" disabled={uploading}>
            {uploading
              ? "Subiendo..."
              : editingCourseId
                ? isEditing
                  ? "Editando..."
                  : "Editar"
                : "Subir Curso"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
