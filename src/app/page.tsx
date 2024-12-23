<<<<<<< HEAD
import { db } from "~/server/db";

const mockUrls = [
  "https://utfs.io/f/cuMzG0ZrGHoQcFlCmDtZrGHoQTPaB096RdklNDhJeIS851AZ",
  "https://utfs.io/f/cuMzG0ZrGHoQEFnc2ndsRnABDXmVQqNY8uaKg3CWo2d1vtfb",
  "https://utfs.io/f/cuMzG0ZrGHoQcoKxC6ZrGHoQTPaB096RdklNDhJeIS851AZ4",
  "https://utfs.io/f/cuMzG0ZrGHoQtbOhSdc0QHXWJg9qdZOD6CN3bPiLB1RUrKey",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log(posts);
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
          <div key={`${image.id}-${index}`} className="w-48">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
    </main>
=======
"use client";
import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Header } from "~/components/layout/Header";
import { Button } from "~/components/ui/button";

export default function Home() {
  const { user } = useUser();

  // Determinar la ruta del dashboard según el rol del usuario
  const dashboardRoute =
    user?.publicMetadata?.role === "admin"
      ? "/dashboard/admin"
      : user?.publicMetadata?.role === "profesor"
      ? "/dashboard/profesores"
      : "/dashboard/estudiantes"; // Ruta predeterminada para usuarios sin rol o estudiantes

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-grow items-center justify-center">
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="mb-7 text-5xl font-bold">
            Únete a nosotros y transforma tus ideas en
            <br /> realidades con el poder del conocimiento
          </h1>
          <p className="mb-7 text-xl">
            Bienvenido a Artiefy, tu plataforma digital educativa dedicada a
            impulsar <br /> tus proyectos con conocimientos de tecnología e
            innovación
          </p>
          <div>
            <SignedOut>
              <SignInButton>
                <Button className="p-7 text-2xl font-semibold active:scale-95">
                  COMIENZA YA
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button
                asChild
                className="p-7 text-2xl font-semibold active:scale-95"
              >
                <Link href={dashboardRoute}>DASHBOARD</Link>
              </Button>
            </SignedIn>
          </div>
        </section>
      </main>
    </div>
>>>>>>> origin/main
  );
}
