import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "فروشگاه نون و نمک",
    short_name: "نون و نمک",
    description: "فروشگاه محصولات سالم، سنتی و دست‌ساز",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#d32f2f",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
