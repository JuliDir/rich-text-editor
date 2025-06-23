import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleFetchError(error: unknown) {
    if (error instanceof Error) {
        if (error.message === "fetch failed") {
            return {
                error: "Error al conectar con el servidor",
            };
        } else {
            return {
                error: error.message,
            };
        }
    }

    return {
        error: "Ocurrió un error desconocido",
    };
}