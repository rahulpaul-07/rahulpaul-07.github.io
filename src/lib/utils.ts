import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Standard shadcn helper. Components copied from 21st.dev import this.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Prefixes a public/ asset path with the deploy base path.
export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
