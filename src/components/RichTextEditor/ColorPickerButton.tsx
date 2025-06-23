import { useState } from "react";
import { Button } from "../shadcn/button";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";
import { cn } from "@/lib/utils";

/**
 * Botón selector de color para un editor de texto enriquecido.
 * 
 * Permite al usuario aplicar un color a la selección actual del editor, ya sea de texto o de fondo.
 * El botón muestra un ícono configurable y se resalta con el color seleccionado, si hay uno activo.
 * 
 * Al hacer click en el botón, se abre un popover con una paleta de colores. 
 * Al seleccionar un color:
 * - Si el color ya estaba seleccionado, se deselecciona y elimina el formato.
 * - Si se elige un nuevo color, se aplica el formato con ese color.
 * 
 * @param command Comando de formato a aplicar (ej: "foreColor" o "backColor").
 * @param icon Ícono que se muestra dentro del botón.
 * @param label Texto descriptivo para accesibilidad y tooltip.
 * @param colors Array de colores disponibles en formato CSS válido (ej: `#ff0000`, `red`).
 * @param onFormat Función que se ejecuta al seleccionar o deseleccionar un color. Recibe el comando y el color (o `undefined` si se elimina el formato).
 */
export const ColorPickerButton = ({
  command,
  icon,
  label,
  colors,
  onFormat,
}: {
  command: string;
  icon: React.ReactNode;
  label: string;
  colors: string[];
  onFormat: (command: string, value: string | undefined) => void;
}) => {
  
  /** Color actualmente seleccionado, o null si no hay ninguno activo */
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  /**
   * Maneja la selección o deselección de un color.
   * Si el color ya estaba seleccionado, lo deselecciona y elimina el formato.
   * Si es un nuevo color, lo selecciona y aplica el formato.
   * 
   * @param color Color seleccionado.
   */
  const handleColorClick = (color: string) => {
    if (color === selectedColor) {
      setSelectedColor(null);
      onFormat(command, undefined);
    } else {
      setSelectedColor(color);
      onFormat(command, color);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0 hover:bg-gray-200/80 dark:hover:bg-gray-800 cursor-pointer border",
            selectedColor ? "border-[3px]" : "border-transparent"
          )}
          style={{
            borderColor: selectedColor || undefined,
          }}
          aria-label={label}
        >
          {icon}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-64 z-[1000]">
        <div className="grid grid-cols-6 gap-1">
          {colors.map((color) => (
            <button
              key={color}
              className={cn(
                "w-8 h-8 rounded border transition-transform cursor-pointer hover:scale-110",
                color === selectedColor ? "ring-2 ring-offset-1 ring-black" : "border-gray-300"
              )}
              style={{ backgroundColor: color }}
              onClick={() => handleColorClick(color)}
              aria-label={`Color ${color}`}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
