import { Button } from "../shadcn/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../shadcn/tooltip";
import { LoaderCircle } from "lucide-react";

/**
 * Botón de acción para disparar la generación de contenido mediante IA.
 * 
 * Este componente muestra un botón con ícono decorativo y tooltip.
 * Mientras el proceso de generación está en curso (loading = true), el botón muestra un spinner y se deshabilita.
 * 
 * Recomendado para integraciones con editores de texto o herramientas donde se pueda generar contenido automático.
 * 
 * @param loading Indica si la IA está generando contenido actualmente. Deshabilita el botón y muestra un spinner.
 * @param onClick Función a ejecutar cuando se hace click en el botón.
 */
export const AIGenerateButton = ({ 
  loading, 
  onClick 
}: {
  loading: boolean;
  onClick: () => void;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onClick}
        className="h-8 w-8 p-0 hover:bg-gray-200/80 dark:hover:bg-gray-800 cursor-pointer"
        disabled={loading}
        aria-label="Generar contenido con IA"
      >
        {!loading ? (
          // Ícono decorativo estilo "estrella IA"
          <div className="bg-clip-text bg-gradient-to-r from-yellow-500 to-purple-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              <path d="M5 3v4" />
              <path d="M19 17v4" />
              <path d="M3 5h4" />
              <path d="M17 19h4" />
            </svg>
          </div>
        ) : (
          // Spinner de carga mientras se genera contenido
          <LoaderCircle className="h-4 w-4 animate-spin" />
        )}
      </Button>
    </TooltipTrigger>
    
    {/* Tooltip dinámico según el estado */}
    <TooltipContent>
      {loading ? "Generando contenido..." : "Generar contenido con IA"}
    </TooltipContent>
  </Tooltip>
);

export default AIGenerateButton;
