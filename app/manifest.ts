import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "سامانه حمل و نقل ناوا",
    short_name: "ناوا",
    description: "سامانه هوشمند و ایمن مدیریت بار و پرداخت حقوق رانندگان",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#FF69B4",
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
