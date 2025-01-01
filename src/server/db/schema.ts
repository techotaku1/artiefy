import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// Tabla de usuarios (con soporte para Clerk)
export const users = pgTable("users", {
  id: text("id").primaryKey(), // ID del usuario proporcionado por Clerk
  role: text("role").notNull(), // Rol del usuario (estudiante/profesor, etc.)
  name: text("name"), // Nombre opcional del usuario
  email: text("email").notNull(), // Email obligatorio
  createdAt: timestamp("created_at").defaultNow().notNull(), // Fecha de creación
  updatedAt: timestamp("updated_at").defaultNow().notNull(), // Fecha de última actualización
  phone: text("phone"), // Teléfono opcional
  country: text("country"), // País opcional
  city: text("city"), // Ciudad opcional
  address: text("address"), // Dirección opcional
  age: integer("age"), // Edad opcional
  birthDate: date("birth_date"), // Fecha de nacimiento opcional
});

// Tabla de cursos
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(), // ID autoincremental del curso
  title: varchar("title", { length: 255 }).notNull(), // Título del curso
  description: text("description"), // Descripción del curso
  coverImageKey: text("cover_image_key"), // Clave de la imagen en S3
  coverVideoKey: text("cover_video_key"), // Clave del video en S3
  categoriaId: integer("categoria_id")
    .references(() => categories.id)
    .notNull(), // Relación con la tabla categorías
  instructor: text("instructor").notNull(), // Nombre del instructor
  createdAt: timestamp("created_at").defaultNow().notNull(), // Fecha de creación
  updatedAt: timestamp("updated_at").defaultNow().notNull(), // Fecha de última actualización
  creatorId: text("creator_id")
    .references(() => users.id)
    .notNull(), // Referencia al creador del curso (usuario existente)
  rating: real("rating").default(0), // Nuevo campo de rating
  porcentajeCompletado: real("porcentaje_completado").default(0), // Nuevo campo de porcentaje completado
});

//tabla de categorias
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(), // ID autoincremental de la categoría
  name: varchar("name", { length: 255 }).notNull(), // Nombre de la categoría
  description: text("description"), // Descripción de la categoría
});

//tabla de preferencias
export const preferences = pgTable("preferences", {
  id: serial("id").primaryKey(), // ID autoincremental de la preferencia
  name: varchar("name", { length: 255 }).notNull(), // Nombre de la preferencia
  areaConocimiento: text("area_conocimiento"), // Área de conocimiento
  userId: text("user_id")
    .references(() => users.id)
    .notNull(), // Relación con usuarios
  categoryId: integer("category_id")
    .references(() => categories.id)
    .notNull(), // Relación con categorías
});

//tabla de cursos tomados
export const coursesTaken = pgTable("courses_taken", {
  id: serial("id").primaryKey(), // ID autoincremental del curso tomado
  userId: text("user_id")
    .references(() => users.id)
    .notNull(), // Relación con usuarios
  courseId: integer("course_id")
    .references(() => courses.id)
    .notNull(), // Relación con cursos
});

// Tabla de lecciones
export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(), // ID autoincremental de la lección
  title: varchar("title", { length: 255 }).notNull(), // Título de la lección
  duration: real("duration").notNull(), // Duración de la lección en horas
  description: text("description"), // Descripción de la lección
  imageKey: text("image_key"), // Clave de la imagen en S3
  videoKey: text("video_key"), // Clave del video en S3
  order: integer("order").notNull(), // Orden de la lección en el curso
  courseId: integer("course_id")
    .references(() => courses.id)
    .notNull(), // Relación con la tabla cursos
  createdAt: timestamp("created_at").defaultNow().notNull(), // Fecha de creación
  updatedAt: timestamp("updated_at").defaultNow().notNull(), // Fecha de última actualización
  porcentajeCompletado: real("porcentaje_completado").default(0), // Nuevo campo de porcentaje completado
});

//tabla de puntajes
export const scores = pgTable("scores", {
  id: serial("id").primaryKey(), // ID autoincremental del puntaje
  score: real("score").notNull(), // Puntaje del usuario
  userId: text("user_id")
    .references(() => users.id)
    .notNull(), // Relación con usuarios
  categoriaId: integer("categoria_id")
    .references(() => categories.id)
    .notNull(), // Relación con categorías
});

//tabla de actividades
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(), // ID autoincremental de la actividad
  name: varchar("name", { length: 255 }).notNull(), // Nombre de la actividad
  description: text("description"), // Descripción de la actividad
  tipo: varchar("tipo", { length: 255 }).notNull(), // Tipo de actividad
  lessonsId: integer("lessons_id")
    .references(() => lessons.id)
    .notNull(), // Relación con lecciones
});

// Tabla de inscripciones (relación muchos a muchos entre usuarios y cursos)
export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(), // ID autoincremental de la inscripción
  userId: text("user_id")
    .references(() => users.id)
    .notNull(), // Relación con usuarios
  courseId: integer("course_id")
    .references(() => courses.id)
    .notNull(), // Relación con cursos
  enrolledAt: timestamp("enrolled_at").defaultNow().notNull(), // Fecha de inscripción
  completed: boolean("completed").default(false), // Estado de completado
});

// Relaciones
export const usersRelations = relations(users, ({ many }) => ({
  enrollments: many(enrollments), // Relación con inscripciones
  createdCourses: many(courses), // Relación con cursos creados
}));

export const coursesRelations = relations(courses, ({ many, one }) => ({
  lessons: many(lessons), // Relación con lecciones
  enrollments: many(enrollments), // Relación con inscripciones
  creator: one(users, {
    fields: [courses.creatorId], // Campo que referencia al creador
    references: [users.id], // ID del creador en usuarios
  }),
}));

export const lessonsRelations = relations(lessons, ({ one }) => ({
  course: one(courses, {
    fields: [lessons.courseId], // Campo que referencia al curso
    references: [courses.id], // ID del curso
  }),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(users, {
    fields: [enrollments.userId], // Campo que referencia al usuario
    references: [users.id], // ID del usuario
  }),
  course: one(courses, {
    fields: [enrollments.courseId], // Campo que referencia al curso
    references: [courses.id], // ID del curso
  }),
}));

export const activitiesRelations = relations(activities, ({ one }) => ({
  lesson: one(lessons, {
    fields: [activities.lessonsId], // Campo que referencia a las lecciones
    references: [lessons.id], // ID de las lecciones
  }),
}));

export const scoresRelations = relations(scores, ({ one }) => ({
  user: one(users, {
    fields: [scores.userId], // Campo que referencia al usuario
    references: [users.id], // ID del usuario
  }),
}));

export const preferencesRelations = relations(preferences, ({ one }) => ({
  user: one(users, {
    fields: [preferences.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [preferences.categoryId],
    references: [categories.id],
  }),
}));

export const coursesTakenRelations = relations(coursesTaken, ({ one }) => ({
  user: one(users, {
    fields: [coursesTaken.userId], // Campo que referencia al usuario
    references: [users.id], // ID del usuario
  }),
}));

// export const progressRelations = relations(progress, ({ one }) => ({
//   user: one(users, {
//     fields: [progress.userId], // Campo que referencia al usuario
//     references: [users.id], // ID del usuario
//   }),
//   lesson: one(lessons, {
//     fields: [progress.lessonId], // Campo que referencia a la lección
//     references: [lessons.id], // ID de la lección
//   }),
// }));

// export const certificatesRelations = relations(certificates, ({ one }) => ({
//   user: one(users, {
//     fields: [certificates.userId], // Campo que referencia al usuario
//     references: [users.id], // ID del usuario
//   }),
//   course: one(courses, {
//     fields: [certificates.courseId], // Campo que referencia al curso
//     references: [courses.id], // ID del curso
//   }),
// }));

// export const commentsRelations = relations(comments, ({ one }) => ({
//   user: one(users, {
//     fields: [comments.userId], // Campo que referencia al usuario
//     references: [users.id], // ID del usuario
//   }),
//   lesson: one(lessons, {
//     fields: [comments.lessonId], // Campo que referencia a la lección
//     references: [lessons.id], // ID de la lección
//   }),
// }));

export const categoriesRelations = relations(categories, ({ many }) => ({
  preferences: many(preferences), // Relación con preferencias
}));
