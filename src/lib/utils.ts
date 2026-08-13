import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSecureImageUrl(url?: string): string {
  if (!url) return '';
  return url.replace(/^http:\/\//i, 'https://');
}
