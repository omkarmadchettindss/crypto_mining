import { clsx, type ClassValue } from "clsx";

// Simplified cn function for React Native
// In React Native, we don't use Tailwind classes, but we keep this for compatibility
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
