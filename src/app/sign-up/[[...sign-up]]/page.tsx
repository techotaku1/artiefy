import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center mt-5 py-5">
      <SignUp appearance={{
            layout: {
              logoPlacement: "inside", // Ubicación del logo: 'inside' o 'outside'
              privacyPageUrl: "https://clerk.com/legal/privacy", // URL de tu política de privacidad
              animations: true, // Activa/desactiva las animaciones
              logoImageUrl: "/logo-artiefy.webp", // URL de tu logo personalizado
              logoLinkUrl: "/", // URL al hacer clic en el logo
              socialButtonsPlacement: "bottom",
              socialButtonsVariant: "iconButton",
              termsPageUrl: "https://clerk.com/terms",
              unsafe_disableDevelopmentModeWarnings: true
            },
          }}
        />
    </div>
  );
}
