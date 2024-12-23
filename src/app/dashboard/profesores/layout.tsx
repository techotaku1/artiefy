/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/app/layout.tsx
import { esMX } from "@clerk/localizations"; // Importa la localización en español
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";

import "~/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      localization={esMX}
      appearance={{
        signIn: { baseTheme: neobrutalism },
        signUp: { baseTheme: neobrutalism },
      }}
    >
      <html
        lang="es"
      >
        <body>
          {/* Coloca el componente aquí para ejecutar el hook */}
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
