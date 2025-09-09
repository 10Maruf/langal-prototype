import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to get asset paths that work both locally and on GitHub Pages
export function getAssetPath(path: string) {
  const basePath = import.meta.env.PROD ? "/langal-prototype" : "";
  return `${basePath}${path}`;
}
