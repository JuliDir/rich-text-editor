"use client"

import { useState, useCallback } from 'react';
import { getAIResponse } from '@/service/openai';

/**
 * Hook `useOpenAI`
 * 
 * Hook personalizado que facilita la interacción con un servicio de generación de texto basado en IA (OpenAI u otro backend similar).
 * Maneja automáticamente el estado de carga, errores y resultado.
 * 
 * Ideal para integraciones simples donde se necesita obtener contenido generado por IA a partir de un prompt.
 * 
 * @returns Un objeto con:
 * - `loading`: booleano que indica si la solicitud está en curso.
 * - `error`: error producido en la solicitud, si existe.
 * - `data`: respuesta generada por IA, si existe.
 * - `generate`: función para disparar la generación de contenido.
 */
export function useOpenAI() {

    /** Indica si la solicitud a la IA está en curso */
    const [loading, setLoading] = useState(false);

    /** Contiene el error de la solicitud, si ocurre */
    const [error, setError] = useState<Error | null>(null);

    /** Contiene la respuesta generada por IA, si existe */
    const [data, setData] = useState<string | null>(null);

    /**
     * Dispara la solicitud al backend de IA para generar contenido a partir de un prompt.
     * 
     * @param prompt Texto o instrucción a enviar al servicio de IA.
     * @returns La respuesta generada como `string`.
     * @throws Lanza un error si ocurre un fallo en la solicitud.
     */
    const generate = useCallback(async (prompt: string) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await getAIResponse(prompt);

            if (typeof response === 'string') {
                setData(response);
                return response;
            }

            throw new Error(response.error || 'Error desconocido al obtener la respuesta de OpenAI');
        } catch (err) {
            const error = err instanceof Error 
                ? err 
                : new Error('Error inesperado');
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    return { 
        loading, 
        error, 
        data,
        generate 
    };
}
