import React, { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  description: string;
}

interface CategoryDropdownProps {
  category: number;
  setCategory: (categoryId: number) => void;
  errors: {
    category: boolean;
  };
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  category,
  setCategory,
  errors,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Error al obtener las categorías: ${errorData}`);
        }

        const data = await response.json();
        console.log("Datos de la respuesta:", data);
        setCategories(data);
      } catch (error) {
        console.error("Error detallado:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedId = Number(event.target.value);
    setCategory(selectedId);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="category-select" className="text-primary text-lg font-medium">
        Selecciona una categoría:
      </label>
      {isLoading ? (
        <p className="text-primary">Cargando categorías...</p>
      ) : (
        <select
          id="category-select"
          value={category || ""}
          onChange={(e) => {
            const selectedId = Number(e.target.value);
            setCategory(selectedId);
            console.log("Categoría seleccionada:", selectedId);
          }}
          className={`mb-5 w-60 rounded border p-2 outline-none ${
            errors.category ? "border-red-500" : "border-primary"
          }`}
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CategoryDropdown;
