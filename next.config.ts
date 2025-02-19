import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    "name": "Penywaan Alat",
    "short_name": "rental alat",
    "start_url": "/login",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#000000",
    "icons": [
      {
        "src": "/ELEKTRONIK.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/ELEKTRONIK.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ]
  
};

export default nextConfig;
