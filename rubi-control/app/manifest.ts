import type { MetadataRoute } from "next";

// PWA instalável. Next gera /manifest.webmanifest automaticamente.
// Ícones: colocar os PNGs em /public/icons (ver PLANO.md > PWA).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Studio Rubi",
    short_name: "Rubi",
    description: "Gestão e portal do paciente — Studio Rubi",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f7f4ee",
    theme_color: "#681d31",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
