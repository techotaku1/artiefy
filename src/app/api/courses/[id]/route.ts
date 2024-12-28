import { type NextRequest, NextResponse } from "next/server";
import { getCourseById } from "~/models/courseModels";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  console.log("ID del curso:", id); // Registro del ID del curso

  try {
    const course = await getCourseById(Number(id));
    console.log("Curso encontrado:", course); // Registro del curso encontrado
    if (!course) {
      return NextResponse.json(
        { error: "Curso no encontrado" },
        { status: 404 },
      );
    }
    return NextResponse.json(course);
  } catch (error) {
    console.error("Error al obtener el curso:", error);
    return NextResponse.json(
      { error: "Error al obtener el curso" },
      { status: 500 },
    );
  }
}