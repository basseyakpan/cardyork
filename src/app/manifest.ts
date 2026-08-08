import type { MetadataRoute } from "next";

// Manifest is intentionally disabled. Exporting a minimal stub so
// Next.js doesn't crash due to a missing default export.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "",
    short_name: "",
    icons: [],
  };
}
